import { FilterItem } from '@/types/commonTypes';

interface ProductFormStep5Props {
    productTypeId: string;
    filterOptions: {
        'wine-color': FilterItem[];
        'wine-sweetness': FilterItem[];
        'beer-type': FilterItem[];
        'season-tag': FilterItem[];
    };
}

export default function ProductFormStep5({ productTypeId, filterOptions }: ProductFormStep5Props) {
    if (productTypeId === 'wine') {
        return (
            <div className='space-y-4'>
                <div className='border-b border-[#4d6d7e] pb-4'>
                    <h3 className='text-[18px] font-semibold text-[#4d6d7e] mb-3'>Wine Specific</h3>
                    <label className='flex flex-col gap-1 mb-3'>
                        <span className='text-[16px] font-medium text-[#4d6d7e]'>Wine Color *</span>
                        <select
                            id='wineColorId'
                            className='h-[40px] rounded-lg bg-white text-[#4d6d7e] px-3 border border-[#4d6d7e]'
                        >
                            <option value=''>Select wine color</option>
                            {filterOptions['wine-color'].map((color) => (
                                <option key={color.id} value={color.id}>
                                    {color.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className='flex flex-col gap-1 mb-3'>
                        <span className='text-[16px] font-medium text-[#4d6d7e]'>Wine Sweetness *</span>
                        <select
                            id='wineSweetnessId'
                            className='h-[40px] rounded-lg bg-white text-[#4d6d7e] px-3 border border-[#4d6d7e]'
                        >
                            <option value=''>Select wine sweetness</option>
                            {filterOptions['wine-sweetness'].map((sweetness) => (
                                <option key={sweetness.id} value={sweetness.id}>
                                    {sweetness.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className='flex items-center gap-2'>
                        <input
                            type='checkbox'
                            id='isSparkling'
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
                            <input
                                type='number'
                                id='ibu'
                                placeholder='0'
                                className='h-[40px] rounded-lg bg-white text-[#4d6d7e] px-3 border border-[#4d6d7e]'
                            />
                        </label>
                        <label className='flex flex-col gap-1'>
                            <span className='text-[16px] font-medium text-[#4d6d7e]'>Alcohol Strength (%) *</span>
                            <input
                                type='number'
                                id='alcoholStrength'
                                placeholder='0'
                                step='0.1'
                                className='h-[40px] rounded-lg bg-white text-[#4d6d7e] px-3 border border-[#4d6d7e]'
                            />
                        </label>
                        <label className='flex flex-col gap-1'>
                            <span className='text-[16px] font-medium text-[#4d6d7e]'>Original Extract *</span>
                            <input
                                type='number'
                                id='originalExtract'
                                placeholder='0'
                                step='0.1'
                                className='h-[40px] rounded-lg bg-white text-[#4d6d7e] px-3 border border-[#4d6d7e]'
                            />
                        </label>
                    </div>
                    <label className='flex flex-col gap-1 mb-3'>
                        <span className='text-[16px] font-medium text-[#4d6d7e]'>Beer Type *</span>
                        <select
                            id='beerTypeId'
                            className='h-[40px] rounded-lg bg-white text-[#4d6d7e] px-3 border border-[#4d6d7e]'
                        >
                            <option value=''>Select beer type</option>
                            {filterOptions['beer-type'].map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className='flex flex-col gap-1'>
                        <span className='text-[16px] font-medium text-[#4d6d7e]'>Season Tags</span>
                        <select
                            multiple
                            id='seasonTagIds'
                            className='min-h-[100px] rounded-lg bg-white text-[#4d6d7e] px-3 py-2 border border-[#4d6d7e]'
                        >
                            {filterOptions['season-tag'].map((tag) => (
                                <option key={tag.id} value={tag.id}>
                                    {tag.name}
                                </option>
                            ))}
                        </select>
                        <p className='text-sm text-gray-500 mt-1'>Hold Ctrl/Cmd to select multiple</p>
                    </label>
                </div>
            </div>
        );
    }

    return null;
}
