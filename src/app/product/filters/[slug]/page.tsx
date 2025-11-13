'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import type { AppDispatch, RootState } from '@/state/store';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '@/state/filterSlice/filterSlice';
import FiltersButton from '@/components/ui/FiltersButton';
import DesktopFilters from '@/components/filtersPage/DesktopFilters';
import MobileFilters from '@/components/filtersPage/MobileFilters';
import { resetProducts, resetFilters } from '@/state/filterSlice/filterSlice';
import { fetchFilters } from '@/state/filterSlice/filterSlice';
import usePagination from '@/hooks/usePagination';
import Pagination from '@/components/ui/Pagination';
import Products from '@/components/filtersPage/Products';


const CategoryPage = () => {
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const categoryName: any = usePathname().split('/').pop();
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
        selectedIBU,
        totalCount,
        productsLoadedOnce
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
        setCurrentPage(1);
    }, [selectedAlcoholStrength, selectedIBU]);

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
        categoryChanged,
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
                ibu: selectedIBU,
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
        selectedIBU,
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
            <div className='flex flex-col w-full justify-between max-w-[1320px]'>
                <Products products={products} loading={loading} productsLoadedOnce={productsLoadedOnce} />
                {
                    products && (
                        <div className='self-center'>
                            <Pagination
                                scrollTopValue={0}
                                totalPages={totalPages}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                            />
                        </div>
                    )
                }
            </div>
        </section >
    );
};

export default CategoryPage;
