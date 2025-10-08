'use client';
import ProductCard from '../ui/ProductCard';
// import { useState, useEffect } from 'react';

const Homepage = () => {
    // const [bestsellerProducts, setBestsellerProducts] = useState<any[] | null>(null);

    // useEffect(() => {
    //     const fetchBestsellers = async () => {
    //         try {
    //             const response = await fetch('http://138.199.224.156:2007/product?isBestSeller=true');

    //             if (!response.ok) {
    //                 throw new Error(`API error ${response.status} ${response.statusText}`);
    //             }

    //             const data = await response.json();
    //             setBestsellerProducts(data); // <-- зберігаємо готові дані
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };

    //     fetchBestsellers();
    // }, []);

    return (
        <section className='flex flex-col items-center'>
            <div className='w-full h-[350px] px-[20px] py-[45px] md:px-[30px] md:py-[55px]'>
                <h1
                    className='xl:w-[800px] lg:w-[700px] w-full flex text-center text-[36px] md:text-[42px] lg:text-start xl:text-[48px] font-black text-[#4d6d7e]
                    animate-fadeUp'
                >
                    Leading distributor of regional beer in Ukraine
                </h1>
            </div>
            <div className='w-full grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 max-w-[1720px] px-[30px] min-h-[530px] mt-[55px] h-auto'>
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
        </section>
    );
};

export default Homepage;
