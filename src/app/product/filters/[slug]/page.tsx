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
import Link from 'next/link';
// import Image from 'next/image';
// import carret from '@/public/icons/shared/caretDropdownBold.svg';
import GoUpButton from '@/components/ui/GoUpButton';
import { getPrevNextCategory } from '@/utils/helpers';
import { categoriess } from '@/utils/data';
import { IPrevNext } from '@/types/helperTypes';

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

    useEffect(() => {
        const prevNext = getPrevNextCategory(categoriess, categoryName);
        setPrevNextCategory(prevNext);
    }, []);

    return (
        <section className=''>
            <div className='flex max-w-[1660px] justify-between h-[100px] mx-auto'>
                <Link
                    prefetch={true}
                    href={prevNextCategory?.prevCategory === null ? '/' : '/product/filters/' + prevNextCategory?.prevCategory.route}
                    className='flex items-center w-fit text-[#4d6d7e] font-bold ml-[15px] mt-[10px] lg:ml-[25px] lg:mt-[30px] lg:mb-[30px] text-[22px] relative transition-all duration-300
                    hover:text-[#737373] after:absolute after:left-[5px] after:bottom-0 after:h-[2px] after:bg-[#737373]
                    after:w-0 hover:after:w-full after:transition-all after:duration-300'
                >
                    <span className='text-[30px] mb-1'>&#8678;</span>
                    <div className='ml-1'>
                        {
                            prevNextCategory?.prevCategory === null
                                ? 'Homepage'
                                : prevNextCategory?.prevCategory.name

                        }
                    </div>
                </Link>
                <Link
                    prefetch={true}
                    href={prevNextCategory?.nextCategory === null ? '/' : '/product/filters/' + prevNextCategory?.nextCategory.route}
                    className='flex items-center w-fit text-[#4d6d7e] font-bold mr-[15px] mt-[10px] lg:ml-[25px] lg:mt-[30px] lg:mb-[30px] text-[22px] relative transition-all duration-300
                    hover:text-[#737373] after:absolute after:left-[5px] after:bottom-0 after:h-[2px] after:bg-[#737373]
                    after:w-0 hover:after:w-full after:transition-all after:duration-300'
                >
                    <div className='mr-1'>
                        {
                            prevNextCategory?.nextCategory === null
                                ? 'Homepage'
                                : prevNextCategory?.nextCategory.name

                        }
                    </div>
                    <span className='text-[30px] mt-[15px] rotate-180'>&#8678;</span>
                </Link>
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
