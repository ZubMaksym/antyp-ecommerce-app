import { UseFormRegister, FieldErrors, UseFieldArrayReturn, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { ProductFormFields } from '@/schemas/ProductValidationSchema';
import { Packaging } from '@/types/commonTypes';
import { FilterItem } from '@/types/commonTypes';
import MultiSelectSelector from './MultiSelectSelector';

interface ProductFormStep2Props {
    register: UseFormRegister<ProductFormFields>;
    errors: FieldErrors<ProductFormFields>;
    packagings: Packaging[];
    ingredients: FilterItem[];
    packagingFields: UseFieldArrayReturn<ProductFormFields, 'packagings', 'id'>;
    setValue: UseFormSetValue<ProductFormFields>;
    watch: UseFormWatch<ProductFormFields>;
}

export default function ProductFormStep2({
    register,
    errors,
    packagings,
    ingredients,
    packagingFields,
    setValue,
    watch,
}: ProductFormStep2Props) {
    const { fields, append, remove } = packagingFields;

    return (
        <div className='space-y-4'>
            <div className='border-b border-[#4d6d7e] pb-4'>
                <div className='flex justify-between items-center mb-3'>
                    <h3 className='text-[18px] font-semibold text-[#4d6d7e]'>Packagings *</h3>
                    <button
                        type='button'
                        onClick={() => append({ packagingId: '', multiplicity: 0 })}
                        className='px-3 h-[32px] text-sm rounded-lg border border-[#4d6d7e] text-[#4d6d7e] transition duration-300 ease-in-out hover:text-white hover:bg-[#4d6d7e]'
                    >
                        Add Packaging
                    </button>
                </div>
                {fields.map((field, index) => (
                    <div key={field.id} className='flex gap-2 mb-2'>
                        <select
                            {...register(`packagings.${index}.packagingId`)}
                            className={`flex-1 h-[40px] rounded-lg bg-white text-[#4d6d7e] px-3 border ${
                                errors.packagings?.[index]?.packagingId ? 'border-red-700' : 'border-[#4d6d7e]'
                            }`}
                        >
                            <option value=''>Select packaging</option>
                            {packagings.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.name}
                                </option>
                            ))}
                        </select>
                        <div className='flex flex-col gap-1'>
                            <input
                                type='number'
                                {...register(`packagings.${index}.multiplicity` as any)}
                                placeholder='Multiplicity'
                                className={`w-32 h-[40px] rounded-lg bg-white text-[#4d6d7e] px-3 border ${
                                    errors.packagings?.[index]?.multiplicity ? 'border-red-700' : 'border-[#4d6d7e]'
                                }`}
                            />
                            {errors.packagings?.[index]?.multiplicity && (
                                <p className='text-red-500 text-sm max-w-[100px]'>{errors.packagings[index]?.multiplicity?.message}</p>
                            )}
                        </div>
                        {fields.length > 1 && (
                            <button
                                type='button'
                                onClick={() => remove(index)}
                                className='px-3 h-[40px] rounded-lg border border-[#4d6d7e] text-[#4d6d7e] transition duration-300 ease-in-out hover:text-white hover:bg-[#4d6d7e]'
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}
                {errors.packagings && typeof errors.packagings === 'object' && (
                    <p className='text-red-500'>{errors.packagings.message}</p>
                )}
            </div>

            <MultiSelectSelector
                register={register}
                setValue={setValue}
                watch={watch}
                errors={errors}
                fieldName='ingredients'
                items={ingredients}
                selectedLabel='Selected Ingredients'
                availableLabel='Ingredients'
                helperText='Select ingredients to add to the product'
            />
        </div>
    );
}
