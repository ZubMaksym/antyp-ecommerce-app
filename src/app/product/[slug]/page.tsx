'use client';
import { usePathname } from 'next/navigation';
import { ChangeEvent, useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import Button from '@/components/ui/Button';
import plus from '@/public/icons/shared/plus.svg';
import minus from '@/public/icons/shared/minus.svg';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/state/store';
import { addItem } from '@/state/cartState/cartSlice';
import { FilterName, ProductItem } from '@/types/reducerTypes';
import { toggleCart } from '@/state/cartState/cartSlice';
import { incrementQuantity, decrementQuantity, handleQuantityChange } from '@/utils/helpers';
import ColorThief from 'color-thief-browser';
import ProductDetailsTable from '@/components/ui/ProductDetailsTable';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';

const ProductPage = () => {
    const [product, setProduct] = useState<any | null>(null);
    const [packaging, setPackaging] = useState<string>('');
    const slug = usePathname().split('/').pop();
    const [quantity, setQuantity] = useState(1);
    const [productLoading, setPoductLoading] = useState(true);
    const imgRef = useRef<HTMLImageElement | null>(null);
    const [color, setColor] = useState<string | null>(null);
    const images = product && [product.mainPhotoUrl, product.mainPhotoUrl, product.mainPhotoUrl, product.mainPhotoUrl, product.mainPhotoUrl];

    const dispatch = useDispatch<AppDispatch>();

    const addToCart = (item: ProductItem) => {
        dispatch(addItem({ ...item, quantity, packaging: packaging }));
        dispatch(toggleCart());
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://138.199.224.156:2007/product/${slug}`);

                if (!response.ok) {
                    throw new Error(`API Error ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                setProduct(data.result);
                setPoductLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProduct();
    }, [slug]);

    useEffect(() => {
        if (product && product.packagings.length > 0) {
            setPackaging(product.packagings[0].name);
        }
    }, [product]);

    useEffect(() => {
        if (!imgRef.current) return;

        const img = imgRef.current;
        const thief = new ColorThief();

        if (img.complete) {
            const [r, g, b] = thief.getColor(img);
            setColor(`rgb(${r}, ${g}, ${b})`);
        } else {
            img.onload = () => {
                const [r, g, b] = thief.getColor(img);
                setColor(`rgb(${r}, ${g}, ${b})`);
            };
        }
    }, [product]);

    if (productLoading) {
        return (
            <div className='h-[calc(100vh-170px)] flex justify-center items-center'>
                <div className='text-[24px] text-[#4d6d7e] font-black'> Loading...</div>
            </div>
        );
    }

    return (
        <section>
            <div className='flex justify-center'>
                {
                    product && (
                        <div className='w-full max-w-[1720px] mx-auto px-6 mt-[55px] flex flex-col lg:flex-row gap-10'>
                            <div className='flex-1 mb-3'>
                                <div className='lg:sticky top-28'>
                                    <div className='flex sm:gap-10 lg:gap-4'>
                                        <div className='scrollbar flex-1 hidden sm:flex flex-col gap-4 max-w-[150px] max-h-[650px] overflow-auto'>
                                            {Array(3).fill(0).map((_, i) => (
                                                <div key={i} className='aspect-square bg-white border rounded-lg shadow-md max-w-[130px]'></div>
                                            ))}
                                        </div>
                                        <div className='flex-1 flex flex-col gap-4 min-w-0'>
                                            <div className='aspect-square flex justify-center items-center bg-white rounded-lg overflow-hidden shadow-md max-w-[650px] max-h-[650px]'>
                                                <Image
                                                    ref={imgRef}
                                                    src={product.mainPhotoUrl}
                                                    alt={product.name}
                                                    width={500}
                                                    height={500}
                                                    className='hidden lg:block w-[70%] transition-all duration-200 ease-in-out blur-lg scale-105 opacity-0'
                                                    onLoadingComplete={(img) => img.classList.remove('blur-lg', 'scale-105', 'opacity-0')}
                                                />
                                                <div className='lg:hidden w-full'>
                                                    <Swiper
                                                        pagination={{ dynamicBullets: true }}
                                                        modules={[Pagination]}
                                                        direction='horizontal'
                                                    >
                                                        {images.map((image: string, index: number) => (
                                                            <SwiperSlide
                                                                key={index}
                                                            >
                                                                <Image
                                                                    src={image}
                                                                    alt={product.name}
                                                                    width={500}
                                                                    height={500}
                                                                    className='place-self-center w-[70%] transition-all duration-200 ease-in-out blur-lg scale-105 opacity-0'
                                                                    onLoadingComplete={(img) => img.classList.remove('blur-lg', 'scale-105', 'opacity-0')}
                                                                />
                                                            </SwiperSlide>
                                                        ))}
                                                    </Swiper>
                                                </div>
                                            </div>
                                        </div>
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
                                        <button className='ml-3 cursor-pointer' onClick={() => decrementQuantity(quantity, setQuantity)}>
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
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleQuantityChange(e, setQuantity)}

                                        />
                                        <button
                                            className='mr-3 cursor-pointer'
                                            onClick={() => incrementQuantity(quantity, setQuantity)}
                                        >
                                            <Image
                                                src={plus}
                                                alt='plus'
                                                width={20}
                                                height={20}
                                            />
                                        </button>
                                    </div>
                                    <select
                                        className='text-[#4d6d7e] font-extrabold *:text-[#4d6d7e] *:font-extrabold rounded-xl ml-3 bg-white h-[50px] flex items-center justify-around border border-[#D2DADF] w-full *:text-center'
                                        onChange={(e) => setPackaging(e.target.value)}
                                    >
                                        {
                                            product.packagings.map((pack: FilterName) => (
                                                <option
                                                    key={pack.id}
                                                    value={pack.name}
                                                >
                                                    {pack.name}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <Button
                                    apearence='primary'
                                    classname='h-[45px] mb-3'
                                    onClick={() => addToCart(product)}
                                >
                                    <span className='flex justify-center px-3 font-extrabold'>Add to cart</span>
                                </Button>
                            </div>
                        </div>
                    )
                }
            </div>
            <div
                className='w-full mt-10 text-white px-6 py-[60px] flex flex-col lg:flex-row justify-around items-center gap-20'
                style={{ backgroundColor: color ?? '#4d6d7e' }}
            >
                {/* <div className='max-w-[1660px] flex items-center justify-between mx-auto'> */}
                <div className='flex h-full flex-col max-w-[925px]'>
                    <h3 className='stroke h-auto text-[50px] font-black'>
                        {product.shortName}
                    </h3>
                    <p className='text-[18px] font-medium mt-5 mb-8'>
                        Best Day’s Dark Diamond is a rich, dark Mexican-style lager with smooth roasted malt character, a touch of cocoa, and a clean, crisp finish. Balanced and drinkable, this lager brings depth without heaviness.
                        This beer is made in partnership with Protect Our Winters (POW), a nonprofit dedicated to protect clean air, clean water, and a healthy environment for everyone. All proceeds from the sale of this beer will support POW’s mission to protect the places we live and the lifestyles we love from climate change. Learn more about the partnership here.
                        The playful artwork on the packaging was created by artist and POW partner, Hannah Eddy.
                        Pairs well with: Snowboarding, Après-ski, Stargazing in the Backcountry
                    </p>
                    <div className='text-[18px] font-bold'>
                        7 Natural Ingredients
                    </div>
                </div>
                <div className='text-[18px] font-bold '>
                    <div className='text-[18px] font-bold'>
                        Product Details
                    </div>
                    <div className='flex h-[3px] bg-white'></div>
                    <div className='flex'>
                        <ProductDetailsTable product={product} />
                        {/* <div className='h-full w-[3px] bg-white'></div> */}
                    </div>
                </div>
                {/* </div> */}
            </div>
        </section>
    );
};

export default ProductPage;
