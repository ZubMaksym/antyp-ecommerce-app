'use client';
import { useEffect, useState, useRef } from 'react';
import type { AppDispatch, RootState } from '@/state/store';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '@/state/filterSlice/filterSlice';
import FiltersButton from '@/components/filters/FiltersButton';
import DesktopFilters from '@/components/filters/DesktopFilters';
import MobileFilters from '@/components/filters/MobileFilters';
import { resetProducts, resetFilters, hydrateFilters, loadFiltersFromStorage, clearFiltersFromStorage } from '@/state/filterSlice/filterSlice';
import { fetchFilters } from '@/state/filterSlice/filterSlice';
import usePagination from '@/hooks/usePagination';
import Pagination from '@/components/common/Pagination';
import Products from '@/components/filters/Products';
import Link from 'next/link';
import GoUpButton from '@/components/common/GoUpButton';
import { categoriess } from '@/utils/data';
import { IPrevNext } from '@/types/helperTypes';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';

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
        productsLoadedOnce,
        productsLoading
    } = useSelector((state: RootState) => state.filter);
    const dispatch = useDispatch<AppDispatch>();
    const { totalPages, setCurrentPage, currentPage, setTotalCount, productPerPage } = usePagination({ productPerPage: 6, totalCount: 0 });
    const [categoryChanged, setCategoryChanges] = useState(false);
    const [prodReq, setProdReq] = useState(false);
    const [prevNextCategory, setPrevNextCategory] = useState<IPrevNext>();
    const [prevCategory, setPrevCategory] = useState<string | null>(null);

    useEffect(() => {
        // Get previous category from sessionStorage (persists across remounts)
        let actualPrevCategory = prevCategory;
        if (typeof window !== 'undefined') {
            const stored = sessionStorage.getItem('prevCategory');
            if (stored) {
                actualPrevCategory = stored;
            }
        }
        
        // Check if category actually changed
        if (actualPrevCategory !== null && actualPrevCategory !== categoryName) {
            // Category changed - clear localStorage FIRST, then reset filters
            // This prevents FilterHydrator from saving old filters with new category
            console.log('pass 1 - category changed from', actualPrevCategory, 'to', categoryName);
            clearFiltersFromStorage();
            dispatch(resetFilters());
            dispatch(resetProducts());
            setCategoryChanges(true);
        } else if (prevCategory === null) {
            // Initial load or page refresh - try to load from localStorage for this category
            // prevCategory === null means component just mounted (refresh or first visit)
            console.log('pass 2 - initial load or page refresh');
            const savedFilters = loadFiltersFromStorage(categoryName);
            if (savedFilters && Object.keys(savedFilters).length > 0) {
                console.log('pass 3 - found saved filters');
                // Found saved filters for this category - restore them
                dispatch(hydrateFilters(savedFilters));
            }
            dispatch(resetProducts());
            setCategoryChanges(true);
        } else {
            // Same category navigation (not a refresh) - filters should persist
            // prevCategory !== null means we're navigating within the same session
            console.log('same category - filters persist');
            setCategoryChanges(true);
        }
        
        // Update both state and sessionStorage
        setPrevCategory(categoryName);
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('prevCategory', categoryName);
        }
    }, [categoryName, prevCategory, dispatch]);

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
        categoryChanged,
    ]);

    useEffect(() => {
        if (!categoryChanged) return;
        if (!loading && filters) {
            console.log('fetch!!!!!!!!!!');
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
            setProdReq(true);
        }
    }, [
        dispatch,
        filters,
        selectedAlcoholStrength,
        selectedIBU,
        currentPage,
        productPerPage,
        setTotalCount,
        totalCount,
    ]);

    return (
        <section className=''>
            <div className='flex flex-wrap max-w-[1660px] justify-around h-[100px] mx-auto'>
                {
                    categoriess.map((data) => (
                        <Link
                            className={classNames(
                                `lg:mt-[30px] lg:mb-[30px] flex items-center`,
                                {
                                    'pointer-events-none': data.route === categoryName
                                }

                            )}
                            href={`/product/filters/${data.route}`}
                            key={data.name}
                            aria-disabled={data.route === categoryName}
                            tabIndex={data.route === categoryName ? -1 : undefined}
                        >
                            <span className={classNames(
                                `mx-5 flex items-center w-fit text-[#4d6d7e] font-bold 
                                text-[22px] relative transition-all duration-300 hover:text-[#737373] after:absolute after:bottom-0 after:h-[2px] after:bg-[#737373]
                                after:w-0 hover:after:w-full after:transition-all after:duration-300`,
                                {
                                    'text-[#737373]': data.route === categoryName,
                                    'pointer-events-none after:absolute after:bottom-0 after:h-[2px] after:bg-[#737373] after:w-0 after:w-full': data.route === categoryName
                                }
                            )}>{data.name}</span>
                        </Link>
                    ))
                }
            </div>
            <div className='mb-[40px] flex flex-col lg:flex-row justify-center'>
                <div className=''>
                    <div className='lg:sticky top-25 hidden lg:block'>
                        <DesktopFilters isOpen={isFiltersOpen} setIsOpen={setIsFiltersOpen} />
                    </div>
                </div>
                <MobileFilters isOpen={isFiltersOpen} setIsOpen={setIsFiltersOpen} />
                <div className='mx-[15px] my-[5px] flex flex-row justify-between items-center'>
                    <span className='block lg:hidden text-[20px] font-extrabold text-[#4d6d7e] my-[10px] sm:my-0'>
                        Found Products: {products?.length}
                    </span>
                    <FiltersButton setIsOpen={setIsFiltersOpen} />
                </div>
                <div className='flex flex-col w-full justify-between max-w-[1320px]'>
                    <Products products={products} loading={productsLoading} productsLoadedOnce={productsLoadedOnce} />
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
                <GoUpButton />
            </div>
        </section>
    );
};

export default CategoryPage;