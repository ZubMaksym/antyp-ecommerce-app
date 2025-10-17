'use client';
import ProductCard from '../ui/ProductCard';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CategoryCard from '../ui/CategoryCard';
import { categoriess } from '@/utils/data';
import Link from 'next/link';
import Image from 'next/image';

const Homepage = () => {
    const [bestsellerProducts, setBestsellerProducts] = useState<Array<any> | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchBestsellers = async () => {
            try {
                const response = await fetch('http://138.199.224.156:2007/product');

                if (!response.ok) {
                    throw new Error(`API error ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                setBestsellerProducts(data.result.items);
            } catch (error) {
                console.error(error);
            }
        };

        fetchBestsellers();
    }, []);


    return (
        <section className='mb-[40px] flex flex-col items-center'>
            <div className='w-full h-[350px] px-[20px] py-[45px] md:px-[30px] md:py-[55px]'>
                <h1
                    className='xl:w-[800px] lg:w-[700px] w-full flex text-center text-[36px] md:text-[42px] lg:text-start xl:text-[48px] font-black text-[#4d6d7e]
                    animate-fadeUp'
                >
                    Leading distributor of regional beer in Ukraine
                </h1>
            </div>
            <div className='w-full sm:px-[20px] px-[10px] animate-fadeUp'>
                <h2 className='text-center mb-[40px] text-[32px] text-[#4d6d7e] font-bold'>Browse By Category</h2>
                <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 mx-auto justify-around gap-y-5 max-w-[1720px] *:mx-auto'>
                    {
                        categoriess.map((data, ind) => (
                            <Link href={`/product/filters/${data.route}`} key={ind}>
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
            <div className='w-full grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 max-w-[1720px] px-[30px] min-h-[530px] mt-[55px] h-auto'>
                {!bestsellerProducts ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        {bestsellerProducts.map((product) => (
                            <ProductCard
                                name={product.shortName}
                                shortName={product.name}
                                key={product.id}
                                onCardClick={() => router.push(`/product/${product.slug}`)}
                                mainPhotoUrl={product.mainPhotoUrl}
                            />
                        ))}
                    </>
                )}
            </div>
        </section>
    );
};

export default Homepage;
