import { useState, useEffect } from 'react';
import { UseFormRegister, UseFormSetValue, UseFormWatch, FieldErrors, Path } from 'react-hook-form';
import { ProductFormFields } from '@/schemas/ProductValidationSchema';
import { FilterItem } from '@/types/commonTypes';
import { X, Plus } from 'lucide-react';

interface MultiSelectSelectorProps {
    register: UseFormRegister<ProductFormFields>;
    setValue: UseFormSetValue<ProductFormFields>;
    watch: UseFormWatch<ProductFormFields>;
    errors?: FieldErrors<ProductFormFields>;
    fieldName: Path<ProductFormFields>;
    items: FilterItem[];
    selectedLabel: string;
    availableLabel: string;
    helperText?: string;
}

export default function MultiSelectSelector({
    register,
    setValue,
    watch,
    errors,
    fieldName,
    items,
    selectedLabel,
    availableLabel,
    helperText,
}: MultiSelectSelectorProps) {
    const formValues = watch(fieldName);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [availableItems, setAvailableItems] = useState<FilterItem[]>(items);

    // Sync local state with form state when component mounts or form values change
    useEffect(() => {
        // Normalize form values to strings - ensure it's an array of strings/numbers
        let valuesArray: (string | number)[] = [];
        if (Array.isArray(formValues)) {
            // Filter to only include string or number values (exclude objects like packagings)
            for (const v of formValues) {
                if (typeof v === 'string' || typeof v === 'number') {
                    valuesArray.push(v);
                }
            }
        }
        const currentValues = valuesArray.map((id) => String(id));
        setSelectedItems(currentValues);
        
        // Filter out selected items from the available list
        const available = items.filter(
            (item) => !currentValues.includes(String(item.id))
        );
        setAvailableItems(available);
    }, [formValues, items, fieldName]);

    const handleSelect = (itemId: string) => {
        const normalizedId = String(itemId);
        if (selectedItems.includes(normalizedId)) return;

        const updated = [...selectedItems, normalizedId];
        setSelectedItems(updated);
        setValue(fieldName, updated as any);
        setAvailableItems(availableItems.filter((item) => String(item.id) !== normalizedId));
    };

    const handleRemove = (itemId: string) => {
        const normalizedId = String(itemId);
        const updated = selectedItems.filter((id) => id !== normalizedId);
        setSelectedItems(updated);
        setValue(fieldName, updated as any);
        const item = items.find((i) => String(i.id) === normalizedId);
        if (item) {
            setAvailableItems([...availableItems, item]);
        }
    };

    useEffect(() => {
        register(fieldName);
    }, [register, fieldName]);

    const getItemName = (itemId: string) => {
        return items.find((item) => String(item.id) === itemId)?.name || '';
    };

    // Type-safe error access
    const fieldError = (errors as any)?.[fieldName] as { message?: string } | undefined;

    return (
        <div className='flex gap-4 border-b border-[#4d6d7e] pb-4'>
            <div>
                <h3 className='text-[18px] font-semibold text-[#4d6d7e] mb-3'>{availableLabel}</h3>
                <div className='min-w-[150px] max-w-[150px] min-h-[50px] max-h-[150px] overflow-y-scroll rounded-lg bg-white text-[#4d6d7e] px-3 py-2 border border-[#4d6d7e] scrollbar'>
                    {availableItems.map((item) => (
                        <div key={item.id} className='flex'>
                            <div
                                className='cursor-pointer w-full hover:bg-[#4d6d7e] hover:text-white rounded-lg px-1 py-1'
                                onClick={() => handleSelect(String(item.id))}
                            >
                                <div className='flex justify-between items-center'>
                                    <div>{item.name}</div>
                                    <Plus className='w-5 h-5' />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {helperText && (
                    <p className='text-sm text-[#4d6d7e] w-[150px] mt-1'>{helperText}</p>
                )}
            </div>
            <div>
                <h3 className='text-[18px] font-semibold text-[#4d6d7e] mb-3'>{selectedLabel}</h3>
                <div className='flex gap-2 max-w-[500px] flex-wrap'>
                    {selectedItems.map((itemId) => (
                        <div
                            key={itemId}
                            className='cursor-pointer flex items-center gap-2 border border-[#4d6d7e] rounded-lg px-1 py-1'
                            onClick={() => handleRemove(itemId)}
                        >
                            <p>{getItemName(itemId)}</p>
                            <button
                                type='button'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemove(itemId);
                                }}
                                className='text-red-500 cursor-pointer'
                            >
                                <X />
                            </button>
                        </div>
                    ))}
                </div>
                {fieldError && (
                    <p className='text-red-500 text-sm mt-1'>{fieldError.message}</p>
                )}
            </div>
        </div>
    );
}
