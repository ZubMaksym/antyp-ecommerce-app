import FilterDropdown from '../ui/FilterDropdown';
import type { AppDispatch, RootState } from '@/state/store';
import { useSelector, useDispatch } from 'react-redux';
import CheckBox from '../ui/CheckBox';
import { FilterName } from '@/types/reducerTypes';
import { toggleManufacturers, toggleWaterTypes, toggleBeerTypes, toggleSeasonTags, togglePackagings, toggleCarbonationLevels, toggleSoftDrinkTypes, toggleWineColor, toggleWineSweetness } from '@/state/filterSlice/filterSlice';
import { usePathname } from 'next/navigation';

const DesktopFilters = () => {
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
        selectedWineSweetness
    } = useSelector((state: RootState) => state.filter);
    const dispatch = useDispatch<AppDispatch>();

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

    return (
        <div className='w-full lg:w-[300px] mx-[15px]'>
            <h2 className='text-[22px] font-black text-[#4d6d7e]'>Filters</h2>
            <FilterDropdown filterName='Manufacturer' isFirst={true}>
                <div className='flex flex-col'>
                    {
                        loading
                            ? <p></p>
                            : (
                                filters?.manufacturers.map((manufacturer) => (
                                    <div key={manufacturer.id} className='flex'>
                                        <CheckBox
                                            checked={selectedManufacturers.includes(manufacturer.id)}
                                            onClick={() => getProductsByManufacturer(manufacturer)}
                                        />
                                        <span className='font-semibold ml-1 text-[#4d6d7e]'>
                                            {manufacturer.name}
                                        </span>
                                    </div>
                                ))
                            )
                    }
                </div>
            </FilterDropdown>
            {
                categoryName === 'beer' &&
                <FilterDropdown filterName='Beer Types'>
                    <div className='flex flex-col'>
                        {
                            loading
                                ? <p></p>
                                : (
                                    filters?.beerTypes.map((beerType) => (
                                        <div key={beerType.id} className='flex'>
                                            <CheckBox
                                                checked={selectedBeerTypes.includes(beerType.id)}
                                                onClick={() => getProductsByBeerType(beerType)}
                                            />
                                            <span className='font-semibold ml-1 text-[#4d6d7e]'>
                                                {beerType.name}
                                            </span>
                                        </div>
                                    ))
                                )
                        }
                    </div>
                </FilterDropdown>
            }
            {
                categoryName === 'beer' &&
                <FilterDropdown filterName='Season Tags'>
                    <div className='flex flex-col'>
                        {
                            loading
                                ? <p></p>
                                : (
                                    filters?.seasonTags.map((seasonTag) => (
                                        <div key={seasonTag.id} className='flex'>
                                            <CheckBox
                                                checked={selectedSeasonTags.includes(seasonTag.id)}
                                                onClick={() => getProductsBySeasonTag(seasonTag)}
                                            />
                                            <span className='font-semibold ml-1 text-[#4d6d7e]'>
                                                {seasonTag.name}
                                            </span>
                                        </div>
                                    ))
                                )
                        }
                    </div>
                </FilterDropdown>
            }
            {
                categoryName === 'bottled_water' &&
                <FilterDropdown filterName='Water Types'>
                    <div className='flex flex-col'>
                        {
                            loading
                                ? <p></p>
                                : (
                                    filters?.waterTypes.map((waterType) => (
                                        <div key={waterType.id} className='flex'>
                                            <CheckBox
                                                checked={selectedWaterTypes.includes(waterType.id)}
                                                onClick={() => getProductsByWaterType(waterType)}
                                            />
                                            <span className='font-semibold ml-1 text-[#4d6d7e]'>
                                                {waterType.name}
                                            </span>
                                        </div>
                                    ))
                                )
                        }
                    </div>
                </FilterDropdown>
            }
            {
                categoryName === 'bottled_water' &&
                <FilterDropdown filterName='Carbonation Levels'>
                    <div className='flex flex-col'>
                        {
                            loading
                                ? <p></p>
                                : (
                                    filters?.carbonationLevels.map((carbonationLevel) => (
                                        <div key={carbonationLevel.id} className='flex'>
                                            <CheckBox
                                                checked={selectedCarbonationLevels.includes(carbonationLevel.id)}
                                                onClick={() => getProductsByCarbonationLevel(carbonationLevel)}
                                            />
                                            <span className='font-semibold ml-1 text-[#4d6d7e]'>
                                                {carbonationLevel.name}
                                            </span>
                                        </div>
                                    ))
                                )
                        }
                    </div>
                </FilterDropdown>
            }
            {
                categoryName === 'soft_drink' &&
                <FilterDropdown filterName='Soft Drink Types'>
                    <div className='flex flex-col'>
                        {
                            loading
                                ? <p></p>
                                : (
                                    filters?.softDrinkTypes.map((softDrinkType) => (
                                        <div key={softDrinkType.id} className='flex'>
                                            <CheckBox
                                                checked={selectedSoftDrinkTypes.includes(softDrinkType.id)}
                                                onClick={() => getProductsBySoftDrinkType(softDrinkType)}
                                            />
                                            <span className='font-semibold ml-1 text-[#4d6d7e]'>
                                                {softDrinkType.name}
                                            </span>
                                        </div>
                                    ))
                                )
                        }
                    </div>
                </FilterDropdown>
            }
            {
                categoryName === 'wine' &&
                <FilterDropdown filterName='Wine Colors'>
                    <div className='flex flex-col'>
                        {
                            loading
                                ? <p>Loading...</p>
                                : (
                                    filters?.wineColors.map((wineColor) => (
                                        <div key={wineColor.id} className='flex'>
                                            <CheckBox
                                                checked={selectedWineColors.includes(wineColor.id)}
                                                onClick={() => getProductsByWineColor(wineColor)}
                                            />
                                            <span className='font-semibold ml-1 text-[#4d6d7e]'>
                                                {wineColor.name}
                                            </span>
                                        </div>
                                    ))
                                )
                        }
                    </div>
                </FilterDropdown>
            }
            {
                categoryName === 'wine' &&
                <FilterDropdown filterName='Wine Sweetness'>
                    <div className='flex flex-col'>
                        {
                            loading
                                ? <p>Loading...</p>
                                : (
                                    filters?.wineSweetness.map((wineSweetness) => (
                                        <div key={wineSweetness.id} className='flex'>
                                            <CheckBox
                                                checked={selectedWineSweetness.includes(wineSweetness.id)}
                                                onClick={() => getProductsByWineSweetness(wineSweetness)}
                                            />
                                            <span className='font-semibold ml-1 text-[#4d6d7e]'>
                                                {wineSweetness.name}
                                            </span>
                                        </div>
                                    ))
                                )
                        }
                    </div>
                </FilterDropdown>
            }
            <FilterDropdown filterName='Packagings'>
                <div className='flex flex-col'>
                    {
                        loading
                            ? <p></p>
                            : (
                                filters?.packagings.map((packaging) => (
                                    <div key={packaging.id} className='flex'>
                                        <CheckBox
                                            onClick={() => getProductsByPackaging(packaging)}
                                            checked={selectedPackagings.includes(packaging.id)}
                                        />
                                        <span className='font-semibold ml-1 text-[#4d6d7e]'>
                                            {packaging.name}
                                        </span>
                                    </div>
                                ))
                            )
                    }
                </div>
            </FilterDropdown>
        </div>
    );
};

export default DesktopFilters;
