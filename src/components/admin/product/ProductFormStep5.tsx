import { FilterItem } from '@/types/commonTypes';
import { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { ProductFormFields } from '@/schemas/ProductValidationSchema';
import Input from '@/components/ui/Input';
import MultiSelectSelector from './MultiSelectSelector';

interface ProductFormStep5Props {
    productTypeId: string;
    register: UseFormRegister<ProductFormFields>;
    errors: FieldErrors<ProductFormFields>;
    setValue: UseFormSetValue<ProductFormFields>;
    watch: UseFormWatch<ProductFormFields>;
    filterOptions: {
        'wine-color': FilterItem[];
        'wine-sweetness': FilterItem[];
        'beer-type': FilterItem[];
        'season-tag': FilterItem[];
        'carbonation-level': FilterItem[];
        'water-type': FilterItem[];
        'soft-drink-type': FilterItem[];
    };
}


export default function ProductFormStep5({ productTypeId, register, errors, setValue, watch, filterOptions }: ProductFormStep5Props) {
    if (productTypeId === 'wine') {
        return (
            <div className='space-y-4'>
                <div className='border-b border-[#4d6d7e] pb-4'>
                    <h3 className='text-[18px] font-semibold text-[#4d6d7e] mb-3'>Wine Specific</h3>
                    <label className='flex flex-col gap-1 mb-3'>
                        <span className='text-[16px] font-medium text-[#4d6d7e]'>Wine Color *</span>
                        <select
                            {...register('wineColorId')}
                            className={`h-[40px] rounded-lg bg-white text-[#4d6d7e] px-3 border ${
                                errors.wineColorId ? 'border-red-700' : 'border-[#4d6d7e]'
                            }`}
                        >
                            <option value=''>Select wine color</option>
                            {filterOptions['wine-color'].map((color) => (
                                <option key={color.id} value={color.id}>
                                    {color.name}
                                </option>
                            ))}
                        </select>
                        {errors.wineColorId && (
                            <p className='text-red-500 text-sm'>{errors.wineColorId.message}</p>
                        )}
                    </label>
                    <label className='flex flex-col gap-1 mb-3'>
                        <span className='text-[16px] font-medium text-[#4d6d7e]'>Wine Sweetness *</span>
                        <select
                            {...register('wineSweetnessId')}
                            className={`h-[40px] rounded-lg bg-white text-[#4d6d7e] px-3 border ${
                                errors.wineSweetnessId ? 'border-red-700' : 'border-[#4d6d7e]'
                            }`}
                        >
                            <option value=''>Select wine sweetness</option>
                            {filterOptions['wine-sweetness'].map((sweetness) => (
                                <option key={sweetness.id} value={sweetness.id}>
                                    {sweetness.name}
                                </option>
                            ))}
                        </select>
                        {errors.wineSweetnessId && (
                            <p className='text-red-500 text-sm'>{errors.wineSweetnessId.message}</p>
                        )}
                    </label>
                    <label className='flex items-center gap-2'>
                        <input
                            type='checkbox'
                            {...register('isSparkling')}
                            className='w-4 h-4'
                        />
                        <span className='text-[16px] font-medium text-[#4d6d7e]'>Is Sparkling</span>
                    </label>
                </div>
            </div>
        );
    }

    if (productTypeId === 'beer') {
        return (
            <div className='space-y-4'>
                <div className='border-b border-[#4d6d7e] pb-4'>
                    <h3 className='text-[18px] font-semibold text-[#4d6d7e] mb-3'>Beer Specific</h3>
                    <div className='grid grid-cols-2 gap-3 mb-3'>
                        <label className='flex flex-col gap-1'>
                            <span className='text-[16px] font-medium text-[#4d6d7e]'>IBU *</span>
                            <Input<ProductFormFields>
                                type='number'
                                id='ibu'
                                placeholder='0'
                                register={register}
                                errors={errors}
                                errorMessage={errors.ibu?.message}
                                className='h-[40px]'
                                step='0.1'
                            />
                        </label>
                        <label className='flex flex-col gap-1'>
                            <span className='text-[16px] font-medium text-[#4d6d7e]'>Alcohol Strength (%) *</span>
                            <Input<ProductFormFields>
                                type='number'
                                id='alcoholStrength'
                                placeholder='0'
                                register={register}
                                errors={errors}
                                errorMessage={errors.alcoholStrength?.message}
                                className='h-[40px]'
                                step='0.1'
                            />
                        </label>
                        <label className='flex flex-col gap-1'>
                            <span className='text-[16px] font-medium text-[#4d6d7e]'>Original Extract *</span>
                            <Input<ProductFormFields>
                                type='number'
                                id='originalExtract'
                                placeholder='0'
                                register={register}
                                errors={errors}
                                errorMessage={errors.originalExtract?.message}
                                className='h-[40px]'
                                step='0.1'
                            />
                        </label>
                    </div>
                    <label className='flex flex-col gap-1 mb-3'>
                        <span className='text-[16px] font-medium text-[#4d6d7e]'>Beer Type *</span>
                        <select
                            {...register('beerTypeId')}
                            className={`h-[40px] rounded-lg bg-white text-[#4d6d7e] px-3 border ${
                                errors.beerTypeId ? 'border-red-700' : 'border-[#4d6d7e]'
                            }`}
                        >
                            <option value=''>Select beer type</option>
                            {filterOptions['beer-type'].map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                        {errors.beerTypeId && (
                            <p className='text-red-500 text-sm'>{errors.beerTypeId.message}</p>
                        )}
                    </label>
                    <MultiSelectSelector
                        register={register}
                        setValue={setValue}
                        watch={watch}
                        errors={errors}
                        fieldName='seasonTagIds'
                        items={filterOptions['season-tag']}
                        selectedLabel='Selected Season Tags'
                        availableLabel='Season Tags'
                        helperText='Select season tags to add'
                    />
                </div>
            </div>
        );
    }

    if (productTypeId === 'cider') {
        return (
            <div className='space-y-4'>
                <div className='border-b border-[#4d6d7e] pb-4'>
                    <h3 className='text-[18px] font-semibold text-[#4d6d7e] mb-3'>Cider Specific</h3>
                    <label className='flex flex-col gap-1'>
                        <span className='text-[16px] font-medium text-[#4d6d7e]'>Alcohol Strength (%) *</span>
                        <Input<ProductFormFields>
                            type='number'
                            id='alcoholStrength'
                            placeholder='0'
                            register={register}
                            errors={errors}
                            errorMessage={errors.alcoholStrength?.message}
                            className='h-[40px]'
                            step='0.1'
                        />
                    </label>
                </div>
            </div>
        );
    }

    if (productTypeId === 'bottled_water') {
        return (
            <div className='space-y-4'>
                <div className='border-b border-[#4d6d7e] pb-4'>
                    <h3 className='text-[18px] font-semibold text-[#4d6d7e] mb-3'>Water Specific</h3>
                    <label className='flex flex-col gap-1 mb-3'>
                        <span className='text-[16px] font-medium text-[#4d6d7e]'>Carbonation Level *</span>
                        <select
                            {...register('carbonationLevelId')}
                            className={`h-[40px] rounded-lg bg-white text-[#4d6d7e] px-3 border ${
                                errors.carbonationLevelId ? 'border-red-700' : 'border-[#4d6d7e]'
                            }`}
                        >
                            <option value=''>Select carbonation level</option>
                            {filterOptions['carbonation-level'].map((level) => (
                                <option key={level.id} value={level.id}>
                                    {level.name}
                                </option>
                            ))}
                        </select>
                        {errors.carbonationLevelId && (
                            <p className='text-red-500 text-sm'>{errors.carbonationLevelId.message}</p>
                        )}
                    </label>
                    <label className='flex flex-col gap-1'>
                        <span className='text-[16px] font-medium text-[#4d6d7e]'>Water Type *</span>
                        <select
                            {...register('waterTypeId')}
                            className={`h-[40px] rounded-lg bg-white text-[#4d6d7e] px-3 border ${
                                errors.waterTypeId ? 'border-red-700' : 'border-[#4d6d7e]'
                            }`}
                        >
                            <option value=''>Select water type</option>
                            {filterOptions['water-type'].map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                        {errors.waterTypeId && (
                            <p className='text-red-500 text-sm'>{errors.waterTypeId.message}</p>
                        )}
                    </label>
                </div>
            </div>
        );
    }

    if (productTypeId === 'soft_drink') {
        return (
            <div className='space-y-4'>
                <div className='border-b border-[#4d6d7e] pb-4'>
                    <h3 className='text-[18px] font-semibold text-[#4d6d7e] mb-3'>Soft Drink Specific</h3>
                    <label className='flex flex-col gap-1'>
                        <span className='text-[16px] font-medium text-[#4d6d7e]'>Soft Drink Type *</span>
                        <select
                            {...register('softDrinkTypeId')}
                            className={`h-[40px] rounded-lg bg-white text-[#4d6d7e] px-3 border ${
                                errors.softDrinkTypeId ? 'border-red-700' : 'border-[#4d6d7e]'
                            }`}
                        >
                            <option value=''>Select soft drink type</option>
                            {filterOptions['soft-drink-type'].map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                        {errors.softDrinkTypeId && (
                            <p className='text-red-500 text-sm'>{errors.softDrinkTypeId.message}</p>
                        )}
                    </label>
                </div>
            </div>
        );
    }

    return null;
}
