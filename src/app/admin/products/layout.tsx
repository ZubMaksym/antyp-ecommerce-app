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

    const {
        register,
        handleSubmit,
        reset,
        control,
        watch,
        trigger,
        formState: { errors },
    } = useForm<ProductFormFields>({
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
        },
    });

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
        });
    }, [reset]);

    // Calculate total steps based on category
    const getTotalSteps = () => {
        if (productType?.id === 'wine' || productType?.id === 'beer') {
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
                // Optional validation - can proceed even if not filled
                return true;
            case 5: // Category-specific
                // Will be validated on submit
                return true;
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

    // Handle success/error messages
    useEffect(() => {
        if (success) {
            notify(success, 'success');
            if (modalMode === 'create' || modalMode === 'edit') {
                closeModal();
                dispatch(fetchInitialProducts({ category: productType?.id || '' }));
            }
        }
        if (error) {
            notify(error, 'error');
        }
    }, [success, error, modalMode, productType?.id, dispatch, closeModal]);

    const onSubmit = async (data: ProductFormFields) => {
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
            multiplicity: data.multiplicity,
            protein: data.protein,
            fat: data.fat,
            carbohydrate: data.carbohydrate,
            sugar: data.sugar,
            isBestSeller: data.isBestSeller,
            bestSellerUntilUtc: data.isBestSeller && data.bestSellerUntilUtc
                ? new Date(data.bestSellerUntilUtc).toISOString()
                : null,
            bestSellerRank: data.isBestSeller ? (data.bestSellerRank || 0) : null,
            isNew: data.isNew,
            newUntilUtc: data.isNew && data.newUntilUtc
                ? new Date(data.newUntilUtc).toISOString()
                : null,
        };

        // Add category-specific fields
        if (productType.id === 'wine') {
            const wineColorId = (document.getElementById('wineColorId') as HTMLSelectElement)?.value;
            const wineSweetnessId = (document.getElementById('wineSweetnessId') as HTMLSelectElement)?.value;
            const isSparkling = (document.getElementById('isSparkling') as HTMLInputElement)?.checked;

            if (wineColorId) basePayload.wineColorId = wineColorId;
            if (wineSweetnessId) basePayload.wineSweetnessId = wineSweetnessId;
            basePayload.isSparkling = isSparkling || false;
        } else if (productType.id === 'beer') {
            const ibu = parseFloat((document.getElementById('ibu') as HTMLInputElement)?.value || '0');
            const alcoholStrength = parseFloat((document.getElementById('alcoholStrength') as HTMLInputElement)?.value || '0');
            const originalExtract = parseFloat((document.getElementById('originalExtract') as HTMLInputElement)?.value || '0');
            const beerTypeId = (document.getElementById('beerTypeId') as HTMLSelectElement)?.value;
            const seasonTagIds = Array.from((document.getElementById('seasonTagIds') as HTMLSelectElement)?.selectedOptions || [])
                .map((option) => option.value);

            basePayload.ibu = ibu;
            basePayload.alcoholStrength = alcoholStrength;
            basePayload.originalExtract = originalExtract;
            if (beerTypeId) basePayload.beerTypeId = beerTypeId;
            if (seasonTagIds.length > 0) basePayload.seasonTagIds = seasonTagIds;
        }

        try {
            if (modalMode === 'create') {
                await dispatch(createProduct({
                    category: productType.id as ProductCategory,
                    data: basePayload,
                })).unwrap();
            } else if (modalMode === 'edit' && selectedProductId) {
                await dispatch(updateProduct({
                    category: productType.id as ProductCategory,
                    id: selectedProductId,
                    data: basePayload,
                })).unwrap();
            }
        } catch {
            // Error is handled by Redux and shown via toast
        }
    };

    const handleDelete = async () => {
        if (!selectedProductId || !productType?.id) return;
        try {
            await dispatch(deleteProduct({
                category: productType.id as ProductCategory,
                id: selectedProductId,
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
            } else {
                fetchFilterType('ingredient');
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalMode, productType?.id]);

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
                            Are you sure you want to delete this product? This action cannot be undone.
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
                                onClick={handleDelete}
                                disabled={submitting}
                            >
                                {submitting ? <LoadingSpinner /> : 'Delete'}
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
                            form={{
                                register,
                                handleSubmit,
                                reset,
                                control,
                                watch,
                                trigger,
                                formState: { errors },
                            } as any}
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
