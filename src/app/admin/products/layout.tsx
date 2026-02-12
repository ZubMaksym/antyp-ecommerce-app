'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { fetchInitialProducts } from '@/state/filterSlice/filterSlice';
import { AppDispatch } from '@/state/store';
import { useDispatch } from 'react-redux';
import AdminProductsList from '@/components/admin/AdminProductsList';
import AdminActionButton from '@/components/admin/AdminActionButton';
import SearchInput from '@/components/common/SearchInput';
import { useProductSearch } from '@/hooks/useProductSearch';
import { PRODUCT_TYPES } from '@/utils/data';
import AdminModal from '@/components/admin/AdminModal';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProductFormFields } from '@/schemas/ProductValidationSchema';
import { ProductValidationSchema } from '@/schemas/ProductValidationSchema';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ProductForm from '@/components/admin/product/ProductForm';
import {
    fetchManufacturers
} from '@/state/manufacturersSlice/manufacturersSlice';
import {
    fetchPackagings
} from '@/state/packagingsSlice/packagingsSlice';
import {
    fetchFilters as fetchAdminFilters
} from '@/state/adminFiltersSlice/adminFiltersSlice';
import {
    createProduct,
    updateProduct,
    deleteProduct,
    fetchProductBySlug,
    ProductCategory
} from '@/state/productsSlice/productsSlice';
import { FilterTypeId } from '@/types/commonTypes';
import { notify } from '@/utils/helpers';
import { ToastContainer } from 'react-toastify';

// children prop is required by Next.js layout type but not rendered in this layout
const ProductsLayout = ({ children: _children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const productType = PRODUCT_TYPES.find((type) => type.id === pathname.split('/').pop());
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

    const dispatch = useDispatch<AppDispatch>();
    const { products, productsLoading, productsError } = useSelector((state: RootState) => state.filter);
    const { searchResults, isSearching, searchError } = useProductSearch(searchQuery, `ProductType=${productType?.id}&`);
    const [modalMode, setModalMode] = useState<'create' | 'edit' | 'delete' | null>(null);
    const [currentStep, setCurrentStep] = useState(1);

    // Redux state
    const { items: manufacturers } = useSelector((state: RootState) => state.manufacturers);
    const { items: packagings } = useSelector((state: RootState) => state.packagings);
    const { items: filterItems } = useSelector((state: RootState) => state.adminFilters);
    const { submitting, error, success } = useSelector((state: RootState) => state.products);

    const formMethods = useForm<ProductFormFields>({
        resolver: yupResolver(ProductValidationSchema) as any,
        mode: 'onSubmit',
        defaultValues: {
            name: '',
            shortName: '',
            manufacturer: '',
            description: '',
            packagings: [{ packagingId: '', multiplicity: 0 }],
            ingredients: [],
            multiplicity: 0,
            protein: 0,
            fat: 0,
            carbohydrate: 0,
            sugar: 0,
            isBestSeller: false,
            bestSellerUntilUtc: null,
            bestSellerRank: 0,
            isNew: false,
            newUntilUtc: null,
            // Wine-specific fields
            wineColorId: null,
            wineSweetnessId: null,
            isSparkling: false,
            // Beer-specific fields
            ibu: null,
            alcoholStrength: null,
            originalExtract: null,
            beerTypeId: null,
            seasonTagIds: [],
            // Water-specific fields
            carbonationLevelId: null,
            waterTypeId: null,
            // Soft Drink-specific fields
            softDrinkTypeId: null,
        },
    });

    const { reset, trigger, control, watch } = formMethods;

    const { fields: packagingFields, append: appendPackaging, remove: removePackaging } = useFieldArray({
        control,
        name: 'packagings',
    });


    // Fetch initial data
    useEffect(() => {
        if (productType?.id) {
            dispatch(fetchInitialProducts({ category: productType.id }));
        }
        dispatch(fetchManufacturers());
        dispatch(fetchPackagings());
    }, [productType?.id, dispatch]);

    // Fetch filter options based on category
    useEffect(() => {
        if (!productType?.id) return;

        const filterTypes: FilterTypeId[] = [];
        if (productType.id === 'wine') {
            filterTypes.push('wine-color', 'wine-sweetness');
        } else if (productType.id === 'beer') {
            filterTypes.push('beer-type', 'season-tag');
        }
        filterTypes.push('ingredient');

        filterTypes.forEach((filterType) => {
            dispatch(fetchAdminFilters(filterType));
        });
    }, [productType?.id, dispatch]);

    const displayProducts = searchQuery.trim() ? searchResults : products;
    const displayLoading = searchQuery.trim() ? isSearching : productsLoading;
    const displayError = searchQuery.trim() ? searchError : productsError;

    const closeModal = useCallback(() => {
        setModalMode(null);
        setSelectedProductId(null);
        reset({
            name: '',
            shortName: '',
            manufacturer: '',
            description: '',
            packagings: [{ packagingId: '', multiplicity: 0 }],
            ingredients: [],
            multiplicity: 0,
            protein: 0,
            fat: 0,
            carbohydrate: 0,
            sugar: 0,
            isBestSeller: false,
            bestSellerUntilUtc: null,
            bestSellerRank: 0,
            isNew: false,
            newUntilUtc: null,
            // Wine-specific fields
            wineColorId: null,
            wineSweetnessId: null,
            isSparkling: false,
            // Beer-specific fields
            ibu: null,
            alcoholStrength: null,
            originalExtract: null,
            beerTypeId: null,
            seasonTagIds: [],
            // Water-specific fields
            carbonationLevelId: null,
            waterTypeId: null,
            // Soft Drink-specific fields
            softDrinkTypeId: null,
        });
    }, [reset]);

    // Calculate total steps based on category
    const getTotalSteps = () => {
        if (productType?.id === 'wine' || productType?.id === 'beer' || productType?.id === 'cider' || productType?.id === 'bottled_water' || productType?.id === 'soft_drink') {
            return 5; // Basic, Packagings, Nutritional, Flags, Category-specific
        }
        return 4; // Basic, Packagings, Nutritional, Flags
    };

    const totalSteps = getTotalSteps();

    // Validate current step before proceeding
    const validateStep = async (step: number): Promise<boolean> => {
        const fieldsToValidate: (keyof ProductFormFields)[] = [];

        switch (step) {
            case 1: // Basic Information
                fieldsToValidate.push('name', 'shortName', 'manufacturer');
                break;
            case 2: // Packagings
                fieldsToValidate.push('packagings');
                break;
            case 3: // Nutritional
                fieldsToValidate.push('multiplicity', 'protein', 'fat', 'carbohydrate', 'sugar');
                break;
            case 4: // Flags
                // Conditionally validate based on checkbox states
                const isBestSeller = watch('isBestSeller');
                const isNew = watch('isNew');
                
                if (isBestSeller) {
                    fieldsToValidate.push('bestSellerUntilUtc', 'bestSellerRank');
                }
                if (isNew) {
                    fieldsToValidate.push('newUntilUtc');
                }
                
                // If no checkboxes are checked, allow proceeding
                if (!isBestSeller && !isNew) {
                    return true;
                }
                break;
            case 5: // Category-specific
                // Validate category-specific fields based on product type
                if (productType?.id === 'wine') {
                    fieldsToValidate.push('wineColorId', 'wineSweetnessId');
                } else if (productType?.id === 'beer') {
                    fieldsToValidate.push('beerTypeId');
                } else if (productType?.id === 'bottled-water') {
                    fieldsToValidate.push('carbonationLevelId', 'waterTypeId');
                } else if (productType?.id === 'soft_drink') {
                    fieldsToValidate.push('softDrinkTypeId');
                }
                // Cider doesn't have select fields, only alcoholStrength (number input)
                break;
        }

        // Trigger validation for the fields
        const isValid = await trigger(fieldsToValidate as any);
        return isValid;
    };

    const handleNext = async () => {
        const isValid = await validateStep(currentStep);
        if (isValid && currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    // Reset step when modal opens/closes
    useEffect(() => {
        if (modalMode === null) {
            setCurrentStep(1);
        }
    }, [modalMode]);

    // Fetch product data when edit mode is activated
    useEffect(() => {
        const loadProductForEdit = async () => {
            if (modalMode === 'edit' && selectedProductId && productType?.id) {
                try {
                    // Find the product in the list to get its slug
                    const productFromList = displayProducts?.find((p) => p.id === selectedProductId);
                    if (!productFromList?.slug) {
                        notify('Product slug not found', 'error');
                        return;
                    }

                    const product = await dispatch(fetchProductBySlug({
                        slug: productFromList.slug,
                    })).unwrap();

                    // Map product data to form fields
                    const formData: Partial<ProductFormFields> = {
                        name: product.name || '',
                        shortName: product.shortName || '',
                        manufacturer: (product as any).manufacturer?.id || '',
                        description: product.description || '',
                        packagings: product.packagings && product.packagings.length > 0
                            ? product.packagings.map((p: any) => ({
                                packagingId: p.id || p.packagingId || '',
                                multiplicity: p.multiplicity || 0,
                            }))
                            : [{ packagingId: '', multiplicity: 0 }],
                        ingredients: product.ingredients?.map((ing: any) => ing.id || ing) || [],
                        multiplicity: (product as any).multiplicity || 0,
                        protein: product.protein || 0,
                        fat: product.fat || 0,
                        carbohydrate: product.carbohydrate || 0,
                        sugar: product.sugar || 0,
                        isBestSeller: product.isBestSeller || false,
                        bestSellerUntilUtc: (product as any).bestSellerUntilUtc 
                            ? (() => {
                                const date = new Date((product as any).bestSellerUntilUtc);
                                // Convert to local time for datetime-local input
                                const year = date.getFullYear();
                                const month = String(date.getMonth() + 1).padStart(2, '0');
                                const day = String(date.getDate()).padStart(2, '0');
                                const hours = String(date.getHours()).padStart(2, '0');
                                const minutes = String(date.getMinutes()).padStart(2, '0');
                                return `${year}-${month}-${day}T${hours}:${minutes}`;
                            })()
                            : null,
                        bestSellerRank: (product as any).bestSellerRank || 0,
                        isNew: product.isNew || false,
                        newUntilUtc: (product as any).newUntilUtc
                            ? (() => {
                                const date = new Date((product as any).newUntilUtc);
                                // Convert to local time for datetime-local input
                                const year = date.getFullYear();
                                const month = String(date.getMonth() + 1).padStart(2, '0');
                                const day = String(date.getDate()).padStart(2, '0');
                                const hours = String(date.getHours()).padStart(2, '0');
                                const minutes = String(date.getMinutes()).padStart(2, '0');
                                return `${year}-${month}-${day}T${hours}:${minutes}`;
                            })()
                            : null,
                        // Wine-specific
                        wineColorId: product.wineColor?.id || null,
                        wineSweetnessId: product.wineSweetness?.id || null,
                        isSparkling: product.isSparking || false,
                        // Beer-specific
                        ibu: product.ibu || null,
                        alcoholStrength: product.alcoholStrength || null,
                        originalExtract: (product as any).originalExtract || null,
                        beerTypeId: product.beerType?.id || null,
                        seasonTagIds: (product as any).seasonTags?.map((tag: any) => tag.id || tag) || [],
                        // Water-specific
                        carbonationLevelId: product.carbonationLevel?.id || null,
                        waterTypeId: product.waterType?.id || null,
                        // Soft Drink-specific
                        softDrinkTypeId: product.softDrinkType?.id || null,
                    };

                    reset(formData);
                    setCurrentStep(1);
                } catch (error) {
                    console.error('Failed to load product for edit:', error);
                    notify('Failed to load product data', 'error');
                }
            }
        };

        loadProductForEdit();
    }, [modalMode, selectedProductId, productType?.id, dispatch, reset, displayProducts]);

    // Handle success/error messages
    useEffect(() => {
        if (error) {
            notify(error, 'error');
        }
        if (!error && success) {
            notify(success, 'success');
        }
    }, [error, success]);

    const onSubmit = async (data: ProductFormFields) => {
        console.log(data);
        console.log(productType?.id);
        if (!modalMode || !productType?.id) return;

        // Transform form data to API format
        const basePayload: any = {
            name: data.name.trim(),
            shortName: data.shortName.trim(),
            manufacturerId: data.manufacturer, // UUID extracted from select
            description: data.description?.trim() || null,
            packagings: data.packagings.map((p) => ({
                packagingId: p.packagingId,
                multiplicity: p.multiplicity,
            })),
            ingredientIds: data.ingredients || [],
            multiplicity: 1,
            protein: data.protein,
            fat: data.fat,
            carbohydrate: data.carbohydrate,
            sugar: data.sugar,
            isBestSeller: data.isBestSeller,
            bestSellerUntilUtc: data.isBestSeller && data.bestSellerUntilUtc
                ? new Date(data.bestSellerUntilUtc).toISOString()
                : null,
            bestSellerRank: data.isBestSeller 
                ? (data.bestSellerRank !== null && data.bestSellerRank !== undefined ? data.bestSellerRank : 0)
                : 0,
            isNew: data.isNew,
            newUntilUtc: data.isNew && data.newUntilUtc
                ? new Date(data.newUntilUtc).toISOString()
                : null,
            // nameTranslations is not in the form, so we'll send an empty array
            // If the API requires it, it should be added to the form
            nameTranslations: [{
                language: 'en',
                name: data.name.trim(),
            }],
        };

        // Add category-specific fields from form data
        if (productType.id === 'wine') {
            if (data.wineColorId) basePayload.wineColorId = data.wineColorId;
            if (data.wineSweetnessId) basePayload.wineSweetnessId = data.wineSweetnessId;
            basePayload.isSparkling = data.isSparkling || false;
        } else if (productType.id === 'beer') {
            basePayload.ibu = data.ibu !== null && data.ibu !== undefined ? data.ibu : 0;
            basePayload.alcoholStrength = data.alcoholStrength !== null && data.alcoholStrength !== undefined ? data.alcoholStrength : 0;
            basePayload.originalExtract = data.originalExtract !== null && data.originalExtract !== undefined ? data.originalExtract : 0;
            // beerTypeId is required for beer, validation ensures it's not empty
            if (data.beerTypeId && data.beerTypeId.trim() !== '') {
                basePayload.beerTypeId = data.beerTypeId;
            }
            basePayload.seasonTagIds = data.seasonTagIds || [];
        } else if (productType.id === 'cider') {
            basePayload.alcoholStrength = data.alcoholStrength !== null && data.alcoholStrength !== undefined ? data.alcoholStrength : 0;
        } else if (productType.id === 'bottled_water') {
            if (data.carbonationLevelId) basePayload.carbonationLevelId = data.carbonationLevelId;
            if (data.waterTypeId) basePayload.waterTypeId = data.waterTypeId;
        } else if (productType.id === 'soft_drink') {
            if (data.softDrinkTypeId) basePayload.softDrinkTypeId = data.softDrinkTypeId;
        }

        // Log payload for debugging
        console.log('Payload being sent:', JSON.stringify(basePayload, null, 2));

        try {
            if (modalMode === 'create') {
                await dispatch(createProduct({
                    category: productType.id as ProductCategory,
                    data: basePayload,
                })).unwrap();
                closeModal();
                dispatch(fetchInitialProducts({ category: productType.id }));
            } else if (modalMode === 'edit' && selectedProductId) {
                await dispatch(updateProduct({
                    category: productType.id as ProductCategory,
                    id: selectedProductId,
                    data: basePayload,
                })).unwrap();
                closeModal();
                dispatch(fetchInitialProducts({ category: productType.id }));
            }
        } catch {
            // Error is handled by Redux and shown via toast
        }
    };

    const handleDelete = async (productId: string) => {
        if (!productId || !productType?.id) return;
        console.log(productId);
        // console.log(productType.id);
        try {
            await dispatch(deleteProduct({
                category: productType.id as ProductCategory,
                id: productId,
            })).unwrap();
            closeModal();
            dispatch(fetchInitialProducts({ category: productType.id }));
        } catch {
            // Error is handled by Redux and shown via toast
        }
    };

    // Store filter options by type
    const [filterOptions, setFilterOptions] = useState<Record<FilterTypeId, any[]>>({
        'wine-color': [],
        'wine-sweetness': [],
        'beer-type': [],
        'season-tag': [],
        'ingredient': [],
        'carbonation-level': [],
        'water-type': [],
        'soft-drink-type': [],
    });

    // Update filter options when filterItems change
    useEffect(() => {
        // This is a simplified approach - in a real app you'd want to track which items belong to which type
        // For now, we'll fetch them on demand when the modal opens
    }, [filterItems]);

    // Fetch specific filter type when needed
    const fetchFilterType = async (filterType: FilterTypeId) => {
        try {
            const result = await dispatch(fetchAdminFilters(filterType)).unwrap();
            setFilterOptions((prev) => ({
                ...prev,
                [filterType]: result,
            }));
        } catch {
            // Error handled silently - filters will just be empty
        }
    };

    // Fetch filters when modal opens
    useEffect(() => {
        if (modalMode && productType?.id) {
            if (productType.id === 'wine') {
                fetchFilterType('wine-color');
                fetchFilterType('wine-sweetness');
                fetchFilterType('ingredient');
            } else if (productType.id === 'beer') {
                fetchFilterType('beer-type');
                fetchFilterType('season-tag');
                fetchFilterType('ingredient');
            } else if (productType.id === 'cider') {
                fetchFilterType('ingredient');
            } else if (productType.id === 'bottled_water') {
                fetchFilterType('carbonation-level');
                fetchFilterType('water-type');
                fetchFilterType('ingredient');
            } else if (productType.id === 'soft_drink') {
                fetchFilterType('soft-drink-type');
                fetchFilterType('ingredient');
            } else {
                fetchFilterType('ingredient');
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalMode, productType?.id]);

    const selectedProduct = products?.find((product) => product.id === selectedProductId)?.name || 'Product';

    return (
        <>
            <section className='flex px-5 py-5 flex flex-col'>
                <h1 className='text-[42px] font-bold text-[#4d6d7e]'>
                    {productType?.label || 'Products'}
                </h1>
                <div className='mt-5 flex items-end *:first:ml-0 *:ml-4'>
                    <SearchInput
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder='Search products by name...'
                    />
                    <AdminActionButton action='create' onClick={() => setModalMode('create')} />
                </div>
                <AdminProductsList
                    products={displayProducts}
                    productsLoading={displayLoading}
                    productsError={displayError}
                    modalMode={modalMode}
                    setModalMode={setModalMode}
                    setSelectedProductId={setSelectedProductId}
                />
            </section>
            <AdminModal
                modalMode={modalMode}
                setModalMode={setModalMode}
            >
                {modalMode === 'delete' ? (
                    <>
                        <h2 className='text-[24px] font-bold text-[#4d6d7e] mb-4'>
                            Delete {productType?.label}
                        </h2>
                        <p className='text-[#4d6d7e] mb-4'>
                            Are you sure you want to delete 
                            <span className='font-bold'>{`${selectedProduct}? `}</span>
                            This action cannot be undone.
                        </p>
                        {error && <div className='text-red-600 text-sm mb-4'>{error}</div>}
                        <div className='flex justify-end gap-3'>
                            <Button
                                apearence='secondary'
                                classname='px-4 h-[36px]'
                                onClick={closeModal}
                                disabled={submitting}
                            >
                                Cancel
                            </Button>
                            <Button
                                apearence='primary'
                                classname='px-4 h-[36px]'
                                onClick={() => handleDelete(selectedProductId || '')}
                                disabled={submitting}
                            >
                                {submitting ? 'Deleting...' : 'Delete'}
                            </Button>
                        </div>
                    </>
                ) : modalMode ? (
                    <>
                        <h2 className='text-[24px] font-bold text-[#4d6d7e] mb-4'>
                            {modalMode === 'create' ? 'Create' : 'Edit'} {productType?.label}
                        </h2>
                        {error && <div className='text-red-600 text-sm mb-4'>{error}</div>}
                        <ProductForm
                            form={formMethods}
                            packagingFields={{
                                fields: packagingFields,
                                append: appendPackaging,
                                remove: removePackaging,
                            } as any}
                            currentStep={currentStep}
                            totalSteps={totalSteps}
                            submitting={submitting}
                            modalMode={modalMode}
                            productTypeId={productType?.id}
                            manufacturers={manufacturers}
                            packagings={packagings}
                            filterOptions={filterOptions}
                            onNext={handleNext}
                            onPrevious={handlePrevious}
                            onCancel={closeModal}
                            onSubmit={onSubmit}
                        />
                    </>
                ) : null}
            </AdminModal>
            <ToastContainer />
        </>
    );
};

export default ProductsLayout;
