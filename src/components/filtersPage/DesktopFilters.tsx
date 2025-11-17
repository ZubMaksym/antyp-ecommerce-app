import FilterDropdown from '../ui/FilterDropdown';
import type { AppDispatch, RootState } from '@/state/store';
import { useSelector, useDispatch } from 'react-redux';
import CheckBox from '../ui/CheckBox';
import { FilterName, Result } from '@/types/reducerTypes';
import Button from '../ui/Button';
import {
    toggleManufacturers,
    toggleWaterTypes,
    toggleBeerTypes,
    toggleSeasonTags,
    togglePackagings,
    toggleCarbonationLevels,
    toggleSoftDrinkTypes,
    toggleWineColor,
    toggleWineSweetness
} from '@/state/filterSlice/filterSlice';
import { usePathname } from 'next/navigation';
import RangeSlider from './RangeSlider';
import { resetFilters, resetProducts } from '@/state/filterSlice/filterSlice';
import { ModalProps } from '@/types/componentTypes';
import { useState, useEffect } from 'react';
import { FilterSkeleton } from '../ui/FilterSkeleton';

const DesktopFilters = ({ isOpen, setIsOpen }: ModalProps) => {
    const categoryName: any = usePathname().split('/').pop();

    const {
        filters,
        loading,
        selectedManufacturers,
        selectedBeerTypes,
        selectedSeasonTags,
        selectedPackagings,
        selectedWaterTypes,
        selectedCarbonationLevels,
        selectedSoftDrinkTypes,
        selectedWineColors,
        selectedWineSweetness,
        minMaxAlcohol,
        minMaxIbu
    } = useSelector((state: RootState) => state.filter);
    const dispatch = useDispatch<AppDispatch>();

    const getVisibleItems = (filter: Result, key: keyof Result) => {
        if (Array.isArray(filter[key])) {
            const visibleItems = filter?.[key].filter(item => item.count > 0) || [];
            return visibleItems;
        }
        return [];
    };
    
    const [prevVisibleLengths, setPrevVisibleLengths] = useState<Record<string, number>>({});

    useEffect(() => {
    if (!loading && filters) {
        const newLengths: Record<string, number> = {};

        const filterKeys: (keyof Result)[] = [
            'manufacturers',
            'beerTypes',
            'seasonTags',
            'packagings',
            'waterTypes',
            'carbonationLevels',
            'softDrinkTypes',
            'wineColors',
            'wineSweetness'
        ];

        filterKeys.forEach(key => {
            const visibleItems = getVisibleItems(filters, key);
            newLengths[key] = visibleItems.length;
        });

        setPrevVisibleLengths(newLengths);
    }
    }, [loading, filters]);

    const getProductsByManufacturer = (manufacturer: FilterName) => {
        dispatch(toggleManufacturers(manufacturer.id));
    };

    const getProductsByBeerType = (beerType: FilterName) => {
        dispatch(toggleBeerTypes(beerType.id));
    };

    const getProductsBySeasonTag = (seasonTag: FilterName) => {
        dispatch(toggleSeasonTags(seasonTag.id));
    };

    const getProductsByPackaging = (packaging: FilterName) => {
        dispatch(togglePackagings(packaging.id));
    };

    const getProductsByWaterType = (waterType: FilterName) => {
        dispatch(toggleWaterTypes(waterType.id));
    };

    const getProductsByCarbonationLevel = (carbonationLevel: FilterName) => {
        dispatch(toggleCarbonationLevels(carbonationLevel.id));
    };

    const getProductsBySoftDrinkType = (softDrinkType: FilterName) => {
        dispatch(toggleSoftDrinkTypes(softDrinkType.id));
    };

    const getProductsByWineColor = (wineColor: FilterName) => {
        dispatch(toggleWineColor(wineColor.id));
    };

    const getProductsByWineSweetness = (wineSweetness: FilterName) => {
        dispatch(toggleWineSweetness(wineSweetness.id));
    };

    const resetAll = () => {
        dispatch(resetFilters());
        dispatch(resetProducts());
    };

    return (                                                                                                                    //h-[60px] lg:h-[105px] xl:h-[85px]
        <div className={`pt-3 lg:pt-0 px-4 scrollbar overflow-y-scroll xl:top-[100px] lg:top-[130px] w-full lg:w-[300px] mx-[15px] max-h-[calc(100vh-170px)]`}>
            <h2 className='text-[22px] font-black text-[#4d6d7e]'>Filters</h2>
            <FilterDropdown filterName='Manufacturer' isFirst={true} allowOverflow={true}>
                <div className='flex flex-col *:mt-2 *:first:mt-0'>
                    {
                        loading 
                            ? <FilterSkeleton record={prevVisibleLengths.manufacturers}/>
                            : (
                                filters?.manufacturers.map((manufacturer) => (
                                    manufacturer.count > 0 && (
                                        <div
                                            key={manufacturer.id}
                                            className='flex w-fit cursor-pointer'
                                            onClick={() => getProductsByManufacturer(manufacturer)}
                                        >
                                            <CheckBox
                                                checked={selectedManufacturers.includes(manufacturer.id)}
                                            />
                                            <span
                                                className='font-semibold text-[17px] ml-1 text-[#4d6d7e]'
                                            >
                                                {manufacturer.name}
                                            </span>
                                        </div>
                                    )
                                ))
                            )
                    }
                </div>
            </FilterDropdown>
            {
                categoryName !== 'bottled_water' && categoryName !== 'wine' && categoryName !== 'soft_drink' && (
                    <FilterDropdown filterName='Alcohol Strength' allowOverflow={false}>
                        <RangeSlider min={minMaxAlcohol.min} max={minMaxAlcohol.max} rangeFor='alcoholStrength' />
                    </FilterDropdown>
                )
            }
            {
                categoryName === 'beer' && (
                    <FilterDropdown filterName='IBU' allowOverflow={false}>
                        <RangeSlider min={minMaxIbu.min} max={minMaxIbu.max} rangeFor='ibu' />
                    </FilterDropdown>
                )
            }
            {
                categoryName === 'beer' &&
                <FilterDropdown filterName='Beer Types' allowOverflow={true}>
                    <div className='flex flex-col *:mt-2 *:first:mt-0'>
                        {
                            loading
                                ? <FilterSkeleton record={prevVisibleLengths.beerTypes}/>
                                : (
                                    filters?.beerTypes.map((beerType) => (
                                        beerType.count > 0 && (
                                            <div
                                                key={beerType.id}
                                                className='flex w-fit cursor-pointer'
                                                onClick={() => getProductsByBeerType(beerType)}
                                            >
                                                <CheckBox
                                                    checked={selectedBeerTypes.includes(beerType.id)}
                                                />
                                                <span className='font-semibold text-[17px] ml-1 text-[#4d6d7e]'>
                                                    {beerType.name}
                                                </span>
                                            </div>
                                        )
                                    ))
                                )
                        }
                    </div>
                </FilterDropdown>
            }
            {
                categoryName === 'beer' &&
                <FilterDropdown filterName='Season Tags' allowOverflow={true}>
                    <div className='flex flex-col *:mt-2 *:first:mt-0'>
                        {
                            loading
                                ? <FilterSkeleton record={prevVisibleLengths.seasonTags}/>
                                : (
                                    filters?.seasonTags.map((seasonTag) => (
                                        seasonTag.count > 0 && (
                                            <div
                                                key={seasonTag.id}
                                                className='flex w-fit cursor-pointer'
                                                onClick={() => getProductsBySeasonTag(seasonTag)}
                                            >
                                                <CheckBox
                                                    checked={selectedSeasonTags.includes(seasonTag.id)}
                                                />
                                                <span className='font-semibold text-[17px] ml-1 text-[#4d6d7e]'>
                                                    {seasonTag.name}
                                                </span>
                                            </div>
                                        )
                                    ))
                                )
                        }
                    </div>
                </FilterDropdown>
            }
            {
                categoryName === 'bottled_water' &&
                <FilterDropdown filterName='Water Types' allowOverflow={true}>
                    <div className='flex flex-col *:mt-2 *:first:mt-0'>
                        {
                            loading
                                ? <FilterSkeleton record={prevVisibleLengths.waterTypes}/>
                                : (
                                    filters?.waterTypes.map((waterType) => (
                                        waterType.count > 0 && (
                                            <div
                                                key={waterType.id}
                                                className='flex w-fit cursor-pointer'
                                                onClick={() => getProductsByWaterType(waterType)}
                                            >
                                                <CheckBox
                                                    checked={selectedWaterTypes.includes(waterType.id)}
                                                />
                                                <span className='font-semibold text-[17px] ml-1 text-[#4d6d7e]'>
                                                    {waterType.name}
                                                </span>
                                            </div>
                                        )
                                    ))
                                )
                        }
                    </div>
                </FilterDropdown>
            }
            {
                categoryName === 'bottled_water' &&
                <FilterDropdown filterName='Carbonation Levels' allowOverflow={true}>
                    <div className='flex flex-col *:mt-2 *:first:mt-0'>
                        {
                            loading
                                ? <FilterSkeleton record={prevVisibleLengths.carbonationLevels}/>
                                : (
                                    filters?.carbonationLevels.map((carbonationLevel) => (
                                        carbonationLevel.count > 0 && (
                                            <div
                                                key={carbonationLevel.id}
                                                className='flex w-fit cursor-pointer'
                                                onClick={() => getProductsByCarbonationLevel(carbonationLevel)}
                                            >
                                                <CheckBox
                                                    checked={selectedCarbonationLevels.includes(carbonationLevel.id)}
                                                />
                                                <span className='font-semibold text-[17px] ml-1 text-[#4d6d7e]'>
                                                    {carbonationLevel.name}
                                                </span>
                                            </div>
                                        )
                                    ))
                                )
                        }
                    </div>
                </FilterDropdown>
            }
            {
                categoryName === 'soft_drink' &&
                <FilterDropdown filterName='Soft Drink Types' allowOverflow={true}>
                    <div className='flex flex-col *:mt-2 *:first:mt-0'>
                        {
                            loading
                                ? <FilterSkeleton record={prevVisibleLengths.softDrinkTypes}/>
                                : (
                                    filters?.softDrinkTypes.map((softDrinkType) => (
                                        softDrinkType.count > 0 && (
                                            <div
                                                key={softDrinkType.id}
                                                className='flex w-fit cursor-pointer'
                                                onClick={() => getProductsBySoftDrinkType(softDrinkType)}
                                            >
                                                <CheckBox
                                                    checked={selectedSoftDrinkTypes.includes(softDrinkType.id)}
                                                />
                                                <span className='font-semibold text-[17px] ml-1 text-[#4d6d7e]'>
                                                    {softDrinkType.name}
                                                </span>
                                            </div>
                                        )
                                    ))
                                )
                        }
                    </div>
                </FilterDropdown>
            }
            {
                categoryName === 'wine' &&
                <FilterDropdown filterName='Wine Colors' allowOverflow={true}>
                    <div className='flex flex-col *:mt-2 *:first:mt-0'>
                        {
                            loading
                                ? <FilterSkeleton record={prevVisibleLengths.wineColors}/>
                                : (
                                    filters?.wineColors.map((wineColor) => (
                                        wineColor.count > 0 && (
                                            <div
                                                key={wineColor.id}
                                                className='flex w-fit cursor-pointer'
                                                onClick={() => getProductsByWineColor(wineColor)}
                                            >
                                                <CheckBox
                                                    checked={selectedWineColors.includes(wineColor.id)}
                                                />
                                                <span className='font-semibold text-[17px] ml-1 text-[#4d6d7e]'>
                                                    {wineColor.name}
                                                </span>
                                            </div>
                                        )
                                    ))
                                )
                        }
                    </div>
                </FilterDropdown>
            }
            {
                categoryName === 'wine' &&
                <FilterDropdown filterName='Wine Sweetness' allowOverflow={true}>
                    <div className='flex flex-col *:mt-2 *:first:mt-0v'>
                        {
                            loading
                                ? <FilterSkeleton record={prevVisibleLengths.wineSweetness}/>
                                : (
                                    filters?.wineSweetness.map((wineSweetness) => (
                                        wineSweetness.count > 0 && (
                                            <div
                                                key={wineSweetness.id}
                                                className='flex w-fit cursor-pointer'
                                                onClick={() => getProductsByWineSweetness(wineSweetness)}
                                            >
                                                <CheckBox
                                                    checked={selectedWineSweetness.includes(wineSweetness.id)}
                                                />
                                                <span className='font-semibold text-[17px] ml-1 text-[#4d6d7e]'>
                                                    {wineSweetness.name}
                                                </span>
                                            </div>
                                        )
                                    ))
                                )
                        }
                    </div>
                </FilterDropdown>
            }
            <FilterDropdown filterName='Packagings' allowOverflow={true}>
                <div className='flex flex-col *:mt-2 *:first:mt-0'>
                    {
                        loading
                            ? <FilterSkeleton record={prevVisibleLengths.packagings}/>
                            : (
                                filters?.packagings.map((packaging) => (
                                    packaging.count > 0 && (
                                        <div
                                            key={packaging.id}
                                            className='flex w-fit cursor-pointer'
                                            onClick={() => getProductsByPackaging(packaging)}
                                        >
                                            <CheckBox
                                                checked={selectedPackagings.includes(packaging.id)}
                                            />
                                            <span className='font-semibold text-[17px] ml-1 text-[#4d6d7e]'>
                                                {packaging.name}
                                            </span>
                                        </div>
                                    )
                                ))
                            )
                    }
                </div>
            </FilterDropdown>
            <Button
                apearence='secondary'
                classname='mt-5 w-full h-[35px] mb-2'
                onClick={resetAll}
            >
                Clear filters
            </Button>
            <Button
                apearence='primary'
                classname='block lg:hidden mt-1 w-full h-[35px] mb-2'
                onClick={() => setIsOpen(!isOpen)}
            >
                Apply Filters
            </Button>
        </div>
    );
};

export default DesktopFilters;