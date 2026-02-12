import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { ProductFormFields } from '@/schemas/ProductValidationSchema';
import Input from '@/components/ui/Input';

interface ProductFormStep3Props {
    register: UseFormRegister<ProductFormFields>;
    errors: FieldErrors<ProductFormFields>;
}

export default function ProductFormStep3({ register, errors }: ProductFormStep3Props) {
    return (
        <div className='border-b border-[#4d6d7e] pb-4'>
            <h3 className='text-[18px] font-semibold text-[#4d6d7e] mb-3'>Nutritional Information</h3>
            <div className='grid grid-cols-2 gap-3'>
                {/* <label className='flex flex-col gap-1'>
                    <span className='text-[16px] font-medium text-[#4d6d7e]'>Multiplicity *</span>
                    <Input<ProductFormFields>
                        type='number'
                        id='multiplicity'
                        placeholder='0'
                        register={register}
                        errors={errors}
                        errorMessage={errors.multiplicity?.message}
                        className='h-[40px]'
                    />
                </label> */}
                <label className='flex flex-col gap-1'>
                    <span className='text-[16px] font-medium text-[#4d6d7e]'>Protein (g) *</span>
                    <Input<ProductFormFields>
                        type='number'
                        id='protein'
                        placeholder='0'
                        register={register}
                        errors={errors}
                        errorMessage={errors.protein?.message}
                        className='h-[40px]'
                        step='0.1'
                    />
                </label>
                <label className='flex flex-col gap-1'>
                    <span className='text-[16px] font-medium text-[#4d6d7e]'>Fat (g) *</span>
                    <Input<ProductFormFields>
                        type='number'
                        id='fat'
                        placeholder='0'
                        register={register}
                        errors={errors}
                        errorMessage={errors.fat?.message}
                        className='h-[40px]'
                        step='0.1'
                    />
                </label>
                <label className='flex flex-col gap-1'>
                    <span className='text-[16px] font-medium text-[#4d6d7e]'>Carbohydrate (g) *</span>
                    <Input<ProductFormFields>
                        type='number'
                        id='carbohydrate'
                        placeholder='0'
                        register={register}
                        errors={errors}
                        errorMessage={errors.carbohydrate?.message}
                        className='h-[40px]'
                        step='0.1'
                    />
                </label>
                <label className='flex flex-col gap-1'>
                    <span className='text-[16px] font-medium text-[#4d6d7e]'>Sugar (g) *</span>
                    <Input<ProductFormFields>
                        type='number'
                        id='sugar'
                        placeholder='0'
                        register={register}
                        errors={errors}
                        errorMessage={errors.sugar?.message}
                        className='h-[40px]'
                        step='0.1'
                    />
                </label>
            </div>
        </div>
    );
}
