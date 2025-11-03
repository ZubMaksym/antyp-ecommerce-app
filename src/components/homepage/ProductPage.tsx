'use client';
import { usePathname } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import Button from '../ui/Button';
import plus from '@/public/icons/shared/plus.svg';
import minus from '@/public/icons/shared/minus.svg';


const ProductPage = () => {
    const [product, setProduct] = useState<any | null>(null);
    const slug = usePathname().split('/').pop();
    const [quantity, setQuantity] = useState(1);

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

    const incrementQuantity = () => {
        if (quantity < 9999) setQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
        const val = Number(e.target.value);
        if (val < 1) {
            setQuantity(1);
        } else if (val > 9999) {
            setQuantity(9999);
        } else {
            setQuantity(val);
        }
    };


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
                            <div className='flex justify-between'>
                                <div className='rounded-xl bg-white w-[145px] h-[50px] flex items-center justify-around border border-[#D2DADF]'>
                                    <button className='ml-3 cursor-pointer' onClick={decrementQuantity}>
                                        <Image
                                            src={minus}
                                            alt='minus'
                                            width={20}
                                            height={20}
                                        />
                                    </button>
                                    <input
                                        type='number'
                                        value={quantity}
                                        className='text-[#4d6d7e] text-center font-extrabold w-[40px] no-spinner appearance-none outline-none border-none bg-transparent'
                                        onChange={handleQuantityChange}

                                    />
                                    <button className='mr-3 cursor-pointer' onClick={incrementQuantity}>
                                        <Image
                                            src={plus}
                                            alt='plus'
                                            width={20}
                                            height={20}
                                        />
                                    </button>
                                </div>
                                <select className='text-[#4d6d7e] font-extrabold *:text-[#4d6d7e] *:font-extrabold rounded-xl ml-3 bg-white h-[50px] flex items-center justify-around border border-[#D2DADF] w-full *:text-center'>
                                    <option value='1-Pack'>1-Pack</option>
                                    <option value='6-pack'>6-Pack</option>
                                    <option value='12-pack'>12-Pack</option>
                                </select>
                            </div>
                            <Button apearence='primary' classname='h-[45px] mb-3'>
                                <span className='flex justify-center px-3 font-extrabold'>Add to cart</span>
                            </Button>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default ProductPage;
