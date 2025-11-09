'use client';
import ProductCard from '@/components/ui/ProductCard';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import type { AppDispatch, RootState } from '@/state/store';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFilters } from '@/state/filterSlice/filterSlice';
import { fetchProducts } from '@/state/filterSlice/filterSlice';
import FiltersButton from '@/components/ui/FiltersButton';
import classNames from 'classnames';
import DesktopFilters from '@/components/filtersPage/DesktopFilters';
import MobileFilters from '@/components/filtersPage/MobileFilters';
import { resetProducts, resetFilters } from '@/state/filterSlice/filterSlice';


const CategoryPage = () => {
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const categoryName: any = usePathname().split('/').pop();
    const router = useRouter();
    const {
        products,
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

    useEffect(() => {
        dispatch(resetFilters());
        dispatch(resetProducts());
    }, [categoryName, dispatch]);


    useEffect(() => {
        if (!loading) {
            dispatch(fetchProducts({
                categoryName,
                manufacturers: selectedManufacturers,
                beerTypes: selectedBeerTypes,
                seasonTags: selectedSeasonTags,
                packagings: selectedPackagings,
                waterTypes: selectedWaterTypes,
                carbonationLevels: selectedCarbonationLevels,
                softDrinkTypes: selectedSoftDrinkTypes,
                wineColors: selectedWineColors,
                wineSweetness: selectedWineSweetness
            }));
        }
    }, [
        loading,
        categoryName,
        selectedManufacturers,
        selectedBeerTypes,
        selectedSeasonTags,
        selectedPackagings,
        selectedWaterTypes,
        selectedCarbonationLevels,
        selectedSoftDrinkTypes,
        selectedWineColors,
        selectedWineSweetness,
        dispatch
    ]);

    return (
        <section className='mb-[40px] mt-[55px] flex flex-col lg:flex-row justify-center'>
            <div className='hidden lg:block'>
                <DesktopFilters />
            </div>
            <MobileFilters isOpen={isFiltersOpen} setIsOpen={setIsFiltersOpen}>
                <DesktopFilters />
            </MobileFilters>
            <div className='mx-[30px] my-[15px] flex flex-col sm:flex-row justify-between sm:items-center'>
                <FiltersButton setIsOpen={setIsFiltersOpen} />
                <span className='block lg:hidden text-[24px] font-extrabold text-[#4d6d7e] my-[10px] sm:my-0'>Found Products: {products?.length}</span>
            </div>
            <div className={classNames(
                'w-full gap-5 max-w-[1320px] min-h-[500px] px-[10px] h-auto',
                {
                    'grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1': products?.length !== 0,
                    'flex justify-center items-center': products?.length === 0
                }
            )}>
                {!products
                    ? <p>Loading...</p>
                    : products.length === 0 && !loading
                        ? <p className='text-[24px] font-black text-[#4d6d7e]'>Nothing found by selected filters. Try Changing them</p>
                        : (
                            <>
                                {products.map((product) => (
                                    <ProductCard
                                        name={product.shortName}
                                        shortName={product.name}
                                        key={product.id}
                                        mainPhotoUrl={product.mainPhotoUrl}
                                        onCardClick={() => router.push(`/product/${product.slug}`)}
                                    />
                                ))}
                            </>
                        )}
            </div>
        </section >
    );
};

export default CategoryPage;
