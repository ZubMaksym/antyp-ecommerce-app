import { UseFormReturn, UseFieldArrayReturn } from 'react-hook-form';
import { ProductFormFields } from '@/schemas/ProductValidationSchema';
import { Manufacturer, Packaging, FilterItem } from '@/types/commonTypes';
import ProductFormProgress from './ProductFormProgress';
import ProductFormNavigation from './ProductFormNavigation';
import ProductFormStep1 from './ProductFormStep1';
import ProductFormStep2 from './ProductFormStep2';
import ProductFormStep3 from './ProductFormStep3';
import ProductFormStep4 from './ProductFormStep4';
import ProductFormStep5 from './ProductFormStep5';

interface ProductFormProps {
    form: UseFormReturn<ProductFormFields>;
    packagingFields: UseFieldArrayReturn<ProductFormFields, 'packagings', 'id'>;
    currentStep: number;
    totalSteps: number;
    submitting: boolean;
    modalMode: 'create' | 'edit';
    productTypeId: string | undefined;
    manufacturers: Manufacturer[];
    packagings: Packaging[];
    filterOptions: {
        'wine-color': FilterItem[];
        'wine-sweetness': FilterItem[];
        'beer-type': FilterItem[];
        'season-tag': FilterItem[];
        'ingredient': FilterItem[];
        'carbonation-level': FilterItem[];
        'water-type': FilterItem[];
        'soft-drink-type': FilterItem[];
    };
    onNext: () => void;
    onPrevious: () => void;
    onCancel: () => void;
    onSubmit: (data: ProductFormFields) => Promise<void>;
}

export default function ProductForm({
    form,
    packagingFields,
    currentStep,
    totalSteps,
    submitting,
    modalMode,
    productTypeId,
    manufacturers,
    packagings,
    filterOptions,
    onNext,
    onPrevious,
    onCancel,
    onSubmit,
}: ProductFormProps) {
    const { register, handleSubmit, watch, setValue, formState: { errors } } = form;
    const isBestSeller = watch('isBestSeller');
    const isNew = watch('isNew');

    // Only allow form submission on the final step
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Only submit if we're on the final step
        if (currentStep === totalSteps) {
            handleSubmit(onSubmit as any)(e);
        }
    };

    // Prevent Enter key from submitting form when not on final step
    const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter' && currentStep < totalSteps) {
            e.preventDefault();
        }
    };

    return (
        <form
            className='flex flex-col gap-4 max-h-[70vh] overflow-y-auto pr-2 scrollbar'
            onSubmit={handleFormSubmit}
            onKeyDown={handleKeyDown}
        >
            <ProductFormProgress currentStep={currentStep} totalSteps={totalSteps} />

            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
                <ProductFormStep1
                    register={register}
                    errors={errors}
                    manufacturers={manufacturers}
                />
            )}

            {/* Step 2: Packagings & Ingredients */}
            {currentStep === 2 && (
                <ProductFormStep2
                    register={register}
                    errors={errors}
                    packagings={packagings}
                    ingredients={filterOptions['ingredient']}
                    packagingFields={packagingFields}
                    setValue={setValue}
                    watch={watch}
                />
            )}

            {/* Step 3: Nutritional Information */}
            {currentStep === 3 && (
                <ProductFormStep3
                    register={register}
                    errors={errors}
                />
            )}

            {/* Step 4: Best Seller & New Product */}
            {currentStep === 4 && (
                <ProductFormStep4
                    register={register}
                    errors={errors}
                    isBestSeller={isBestSeller}
                    isNew={isNew}
                />
            )}

            {/* Step 5: Category-specific fields */}
            {currentStep === 5 && productTypeId && (
                <ProductFormStep5
                    productTypeId={productTypeId}
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    watch={watch}
                    filterOptions={filterOptions}
                />
            )}

            <ProductFormNavigation
                currentStep={currentStep}
                totalSteps={totalSteps}
                submitting={submitting}
                modalMode={modalMode}
                onPrevious={onPrevious}
                onCancel={onCancel}
                onSubmit={onNext}
            />
        </form>
    );
}
