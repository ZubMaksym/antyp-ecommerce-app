'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';


const ProductPage = () => {
    const [product, setProduct] = useState<any | null>(null);
    const slug = usePathname().split('/').pop();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://138.199.224.156:2007/product/${slug}`);

                if (!response.ok) {
                    throw new Error(`API Error ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                setProduct(data.result);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProduct();
    }, [slug]);


    return (
        <>
            {
                product && (
                    <div className='w-full max-w-[1720px] mx-auto px-6 mt-[55px] flex flex-col lg:flex-row gap-10'>
                        <div className='flex sm:gap-10 lg:gap-4 flex-1'>
                            <div className='scrollbar flex-1 hidden sm:flex flex-col gap-4 max-w-[150px] max-h-[650px] overflow-auto'>
                                {Array(6).fill(0).map((_, i) => (
                                    <div key={i} className='aspect-square bg-white rounded-lg shadow-md max-w-[130px]'></div>
                                ))}
                            </div>
                            <div className='flex-1 flex flex-col gap-4 min-w-0'>
                                <div className='aspect-square flex justify-center items-center bg-white rounded-lg overflow-hidden shadow-md max-w-[650px] max-h-[650px]'>
                                    <Image
                                        src={product.mainPhotoUrl}
                                        alt={product.name}
                                        width={500}
                                        height={500}
                                        className='w-[70%] transition-all duration-200 ease-in-out blur-lg scale-105 opacity-0'
                                        onLoadingComplete={(img) => img.classList.remove('blur-lg', 'scale-105', 'opacity-0')}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='flex-1 flex flex-col gap-4 min-w-0'>

                            <h1 className='text-[36px] font-black text-[#4d6d7e]'>
                                {product.shortName}
                            </h1>
                            <h2 className='text-[18px] text-[#4d6d7e]'>
                                {product.name}
                            </h2>
                            <div className='grid grid-cols-4 gap-x-3 gap-y-6'>
                                {Array(9).fill(0).map((_, i) => (
                                    <div key={i}
                                        className='flex justify-center items-center aspect-square bg-white rounded-lg overflow-hidden shadow-md max-w-[190px] max-h-[190px] cursor-pointer hover:ring-1 hover:ring-[#4d6d7e]'>
                                        <Image
                                            loading='lazy'
                                            width={150}
                                            height={150}
                                            src={product.mainPhotoUrl}
                                            alt='product image'
                                            className={classNames(
                                                'transition duration-500 w-[70%] ease-in-out',
                                                {
                                                    'hover:rotate-10': i % 2 === 0,
                                                    'hover:-rotate-10': i % 2 !== 0,
                                                }
                                            )}
                                        />
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                )
            }
        </>
    );
};

export default ProductPage;
