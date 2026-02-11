import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { ProductFormFields } from '@/schemas/ProductValidationSchema';
import { Manufacturer } from '@/types/commonTypes';
import Input from '@/components/ui/Input';

interface ProductFormStep1Props {
    register: UseFormRegister<ProductFormFields>;
    errors: FieldErrors<ProductFormFields>;
    manufacturers: Manufacturer[];
}

export default function ProductFormStep1({ register, errors, manufacturers }: ProductFormStep1Props) {
    return (
        <div className='border-b border-[#4d6d7e] pb-4'>
            <h3 className='text-[18px] font-semibold text-[#4d6d7e] mb-3'>Basic Information</h3>

            <label className='flex flex-col gap-1'>
                <span className='text-[16px] font-medium text-[#4d6d7e]'>Name *</span>
                <Input<ProductFormFields>
                    type='text'
                    id='name'
                    placeholder='Enter product name'
                    register={register}
                    errors={errors}
                    errorMessage={errors.name?.message}
                    className='h-[40px]'
                />
            </label>

            <label className='flex flex-col gap-1 mt-3'>
                <span className='text-[16px] font-medium text-[#4d6d7e]'>Short Name *</span>
                <Input<ProductFormFields>
                    type='text'
                    id='shortName'
                    placeholder='Enter short name'
                    register={register}
                    errors={errors}
                    errorMessage={errors.shortName?.message}
                    className='h-[40px]'
                />
            </label>

            <label className='flex flex-col gap-1 mt-3'>
                <span className='text-[16px] font-medium text-[#4d6d7e]'>Manufacturer *</span>
                <select
                    {...register('manufacturer')}
                    className={`h-[40px] rounded-lg bg-white text-[#4d6d7e] px-3 border ${
                        errors.manufacturer ? 'border-red-700' : 'border-[#4d6d7e]'
                    }`}
                >
                    <option value=''>Select manufacturer</option>
                    {manufacturers.map((m) => (
                        <option key={m.id} value={m.id}>
                            {m.name}
                        </option>
                    ))}
                </select>
                {errors.manufacturer && (
                    <p className='text-red-500'>{errors.manufacturer.message}</p>
                )}
            </label>

            <label className='flex flex-col gap-1 mt-3'>
                <span className='text-[16px] font-medium text-[#4d6d7e]'>Description</span>
                <textarea
                    {...register('description')}
                    placeholder='Enter product description'
                    className={`min-h-[100px] rounded-lg bg-white text-[#4d6d7e] px-3 py-2 border ${
                        errors.description ? 'border-red-700' : 'border-[#4d6d7e]'
                    }`}
                />
            </label>
        </div>
    );
}
