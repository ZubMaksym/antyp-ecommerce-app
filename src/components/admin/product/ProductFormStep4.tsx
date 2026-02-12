import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { ProductFormFields } from '@/schemas/ProductValidationSchema';
import Input from '@/components/ui/Input';

interface ProductFormStep4Props {
    register: UseFormRegister<ProductFormFields>;
    errors: FieldErrors<ProductFormFields>;
    isBestSeller: boolean;
    isNew: boolean;
}

export default function ProductFormStep4({ register, errors, isBestSeller, isNew }: ProductFormStep4Props) {
    // Get current date/time in format for datetime-local input (YYYY-MM-DDTHH:mm)
    const getMinDateTime = () => {
        const now = new Date();
        // Format: YYYY-MM-DDTHH:mm
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    return (
        <div className='space-y-4'>
            <div className='border-b border-[#4d6d7e] pb-4'>
                <h3 className='text-[18px] font-semibold text-[#4d6d7e] mb-3'>Best Seller</h3>
                <label className='flex items-center gap-2 mb-3'>
                    <input
                        type='checkbox'
                        {...register('isBestSeller')}
                        className='w-4 h-4'
                    />
                    <span className='text-[16px] font-medium text-[#4d6d7e]'>Is Best Seller</span>
                </label>
                {isBestSeller && (
                    <>
                        <label className='flex flex-col gap-1 mb-3'>
                            <span className='text-[16px] font-medium text-[#4d6d7e]'>Best Seller Until (UTC) *</span>
                            <input
                                type='datetime-local'
                                {...register('bestSellerUntilUtc')}
                                min={getMinDateTime()}
                                className={`h-[40px] rounded-lg bg-white text-[#4d6d7e] px-3 border ${
                                    errors.bestSellerUntilUtc ? 'border-red-700' : 'border-[#4d6d7e]'
                                }`}
                            />
                            {errors.bestSellerUntilUtc && (
                                <p className='text-red-500 text-sm'>{errors.bestSellerUntilUtc.message}</p>
                            )}
                        </label>
                        <label className='flex flex-col gap-1'>
                            <span className='text-[16px] font-medium text-[#4d6d7e]'>Best Seller Rank *</span>
                            <Input<ProductFormFields>
                                type='number'
                                id='bestSellerRank'
                                placeholder='1'
                                register={register}
                                errors={errors}
                                errorMessage={errors.bestSellerRank?.message}
                                className='h-[40px]'
                            />
                        </label>
                    </>
                )}
            </div>

            <div className='border-b border-[#4d6d7e] pb-4'>
                <h3 className='text-[18px] font-semibold text-[#4d6d7e] mb-3'>New Product</h3>
                <label className='flex items-center gap-2 mb-3'>
                    <input
                        type='checkbox'
                        {...register('isNew')}
                        className='w-4 h-4'
                    />
                    <span className='text-[16px] font-medium text-[#4d6d7e]'>Is New</span>
                </label>
                {isNew && (
                    <label className='flex flex-col gap-1'>
                        <span className='text-[16px] font-medium text-[#4d6d7e]'>New Until (UTC) *</span>
                        <input
                            type='datetime-local'
                            {...register('newUntilUtc')}
                            min={getMinDateTime()}
                            className={`h-[40px] rounded-lg bg-white text-[#4d6d7e] px-3 border ${
                                errors.newUntilUtc ? 'border-red-700' : 'border-[#4d6d7e]'
                            }`}
                        />
                        {errors.newUntilUtc && (
                            <p className='text-red-500 text-sm'>{errors.newUntilUtc.message}</p>
                        )}
                    </label>
                )}
            </div>
        </div>
    );
}
