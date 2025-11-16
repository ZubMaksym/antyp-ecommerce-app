'use client';
import ProductCard from '../ui/ProductCard';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CategoryCard from '../ui/CategoryCard';
import { categoriess } from '@/utils/data';
import Link from 'next/link';
import Image from 'next/image';
import { ClipLoader } from 'react-spinners';
import classNames from 'classnames';
import Pagination from '../ui/Pagination';
import usePagination from '@/hooks/usePagination';
import { useDispatch } from 'react-redux';
import { resetFilters, resetProducts } from '@/state/filterSlice/filterSlice';


const Homepage = () => {
    const [bestsellerProducts, setBestsellerProducts] = useState<Array<any> | null>(null);
    const [bestsellerProductsError, setBestsellerProductsError] = useState<string | null>(null);
    const router = useRouter();
    const { totalPages, setCurrentPage, currentPage, setTotalCount, productPerPage } = usePagination({ productPerPage: 6, totalCount: 0 });
    const dispatch = useDispatch();

    const resetAll = () => {
        dispatch(resetFilters());
        dispatch(resetProducts());
    };

    useEffect(() => {
        const fetchBestsellers = async () => {
            try {
                setBestsellerProductsError(null);
                const response = await fetch(`http://138.199.224.156:2007/product?Page=${currentPage}&PageSize=${productPerPage}`);

                if (!response.ok) {
                    setBestsellerProductsError(`Something went wrong while processing the request. We're woking to solve this problem`);
                    throw new Error(`API error ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                setBestsellerProducts(data.result.items);
                setTotalCount(data.result.totalCount);
            } catch (error: any) {
                setBestsellerProductsError(`Something went wrong while processing the request. We're woking to solve this problem`);
                throw new Error(error.message);
            }
        };

        fetchBestsellers();
    }, [currentPage, productPerPage, setTotalCount]);

    if (bestsellerProductsError) {
        return (
            <p className='px-[20px] flex font-bold text-center text-[24px] text-red-500 justify-center items-center h-[calc(100vh-100px)]'>
                <span className='max-w-[600px]'>{bestsellerProductsError}</span>
            </p>
        );
    }

    return (
        <section className='mb-[40px] flex flex-col items-center'>
            <div className='w-full h-[350px] px-[20px] py-[45px] md:px-[30px] md:py-[55px]'>
                <h1 className='xl:w-[800px] lg:w-[700px] w-full flex text-center text-[36px] md:text-[42px] lg:text-start xl:text-[48px] font-black text-[#4d6d7e] animate-fadeUp'>
                    Leading distributor of regional beer in Ukraine
                </h1>
            </div>
            <div
                className='w-full sm:px-[20px] px-[10px] animate-fadeUp'
            >
                <h2 className='text-center mb-[40px] text-[32px] text-[#4d6d7e] font-bold'>
                    Browse By Category
                </h2>
                <div id='categories' className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 mx-auto justify-around gap-y-5 max-w-[1720px] *:mx-auto'>
                    {
                        categoriess.map((data, ind) => (
                            <Link 
                                href={`/product/filters/${data.route}`} 
                                key={ind}
                                onClick={resetAll}
                            >
                                <CategoryCard subtitle={data.name}>
                                    {/* <span className='text-white xl:text-[28px] lg:text-[24px] md:text-[28px] text-[22px] font-black'>{data.name}</span> */}
                                    <Image
                                        src={data.image}
                                        width={350}
                                        height={350}
                                        className='w-full h-full'
                                        alt={data.name}
                                    />
                                </CategoryCard>
                            </Link>
                        ))
                    }
                </div>
            </div>
            <div className={classNames(
                'w-full max-w-[1720px] px-[30px] mt-[55px]',
                {
                    'grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 h-auto min-h-[430px]': bestsellerProducts,
                    'flex justify-center items-center h-[250px]': !bestsellerProducts
                }
            )}>
                {!bestsellerProducts ? (
                    <div className=''>
                        <ClipLoader
                            aria-label='Loading Spinner'
                            color='#4d6d7e'
                            size={60}
                        />
                    </div>
                ) : (
                    <>
                        {bestsellerProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onCardClick={() => router.push(`/product/${product.slug}`)}
                                
                            />
                        ))}
                    </>
                )}
            </div>
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                scrollTopValue={700}
            />
        </section>
    );
};

export default Homepage;
