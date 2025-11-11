'use client';
import ProductCard from '@/components/ui/ProductCard';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import type { AppDispatch, RootState } from '@/state/store';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '@/state/filterSlice/filterSlice';
import FiltersButton from '@/components/ui/FiltersButton';
import classNames from 'classnames';
import DesktopFilters from '@/components/filtersPage/DesktopFilters';
import MobileFilters from '@/components/filtersPage/MobileFilters';
import { resetProducts, resetFilters } from '@/state/filterSlice/filterSlice';
import { fetchFilters } from '@/state/filterSlice/filterSlice';
import usePagination from '@/hooks/usePagination';
import Pagination from '@/components/ui/Pagination';


const CategoryPage = () => {
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const categoryName: any = usePathname().split('/').pop();
    const router = useRouter();
    const {
        filters,
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
        selectedWineSweetness,
        selectedAlcoholStrength,
        totalCount,
    } = useSelector((state: RootState) => state.filter);
    const dispatch = useDispatch<AppDispatch>();
    const { totalPages, setCurrentPage, currentPage, setTotalCount, productPerPage } = usePagination({ productPerPage: 6, totalCount: 0 });
    const [categoryChanged, setCategoryChanges] = useState(false);

    useEffect(() => {
        dispatch(resetFilters());
        dispatch(resetProducts());
        setCategoryChanges(true);
    }, [categoryName, dispatch]);

    useEffect(() => {
        if (!categoryChanged) return;
        setCurrentPage(1);
        dispatch(fetchFilters(
            {
                category: categoryName,
                manufacturers: selectedManufacturers,
                beerTypes: selectedBeerTypes,
                seasonTags: selectedSeasonTags,
                packagings: selectedPackagings,
                waterTypes: selectedWaterTypes,
                carbonationLevels: selectedCarbonationLevels,
                softDrinkTypes: selectedSoftDrinkTypes,
                wineColors: selectedWineColors,
                wineSweetness: selectedWineSweetness,
            }
        ));
    }, [
        categoryName,
        dispatch,
        selectedBeerTypes,
        selectedManufacturers,
        selectedSeasonTags,
        selectedPackagings,
        selectedWaterTypes,
        selectedCarbonationLevels,
        selectedSoftDrinkTypes,
        selectedWineColors,
        selectedWineSweetness,
        setCurrentPage,
        categoryChanged
    ]);

    useEffect(() => {
        if (!loading && filters) {
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
                wineSweetness: selectedWineSweetness,
                alcoholStrength: selectedAlcoholStrength,
                currentPage: currentPage,
                productPerPage: productPerPage
            }));
            setTotalCount(totalCount);
        }
    }, [
        loading,
        filters,
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
        dispatch,
        selectedAlcoholStrength,
        currentPage,
        productPerPage,
        setTotalCount,
        totalCount,
    ]);

    return (
        <section className='mb-[40px] mt-[55px] flex flex-col lg:flex-row justify-center'>
            <div className='hidden lg:block'>
                <DesktopFilters isOpen={isFiltersOpen} setIsOpen={setIsFiltersOpen} />
            </div>
            <MobileFilters isOpen={isFiltersOpen} setIsOpen={setIsFiltersOpen} />
            <div className='mx-[15px] my-[15px] flex flex-col sm:flex-row justify-between sm:items-center'>
                <FiltersButton setIsOpen={setIsFiltersOpen} />
                <span className='block lg:hidden text-[24px] font-extrabold text-[#4d6d7e] my-[10px] sm:my-0'>Found Products: {products?.length}</span>
            </div>
            <div className='flex flex-col w-full max-w-[1320px]'>
                <div className={classNames(
                    'relative w-full gap-5 max-w-[1320px] min-h-[500px] px-[15px] h-auto',
                    {
                        'grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1': products?.length !== 0,
                        'flex justify-center items-center': products?.length === 0
                    }
                )}>
                    {!products
                        ? <p className='absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-[24px] font-black text-[#4d6d7e]'>Loading...</p>
                        // : products.length === 0 && !loading
                        //     ? <p className='text-[24px] font-black text-[#4d6d7e]'>Nothing found by selected filters. Try Changing them</p>
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
                <div className='self-center place-self-end'>
                    <Pagination
                        scrollTopValue={0}
                        totalPages={totalPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>
        </section >
    );
};

export default CategoryPage;
