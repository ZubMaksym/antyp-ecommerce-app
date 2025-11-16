import Button from './Button';
import { ProductCardProps } from '@/types/componentTypes';
// import beerImage from '@/public/icons/PLP_Kolsch.webp';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addItem } from '@/state/cartState/cartSlice';
import { ProductItemCart } from '@/types/reducerTypes';
import { toggleCart } from '@/state/cartState/cartSlice';
import { AppDispatch } from '@/state/store';

const ProductCard = ({ onCardClick, product }: ProductCardProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleClick = (e: React.MouseEvent, item: ProductItemCart) => {
        e.stopPropagation();
        dispatch(addItem(item));
        dispatch(toggleCart());
    };

    return (
        <div
            tabIndex={0}
            className='md:aspect-[88/100] cursor-pointer'
            onClick={onCardClick}
        >
            <div className='relative md:aspect-[95/100] flex flex-col items-center justify-center bg-white rounded-xl shadow-md py-[30px]'>
                <Image
                    src={product.mainPhotoUrl}
                    alt={product.name}
                    width={450}
                    height={450}
                    className='w-[50%] transition-all duration-500 ease-in-out blur-lg scale-105 opacity-0'
                    onLoadingComplete={(img) => img.classList.remove('blur-lg', 'scale-105', 'opacity-0')}
                />
                <Button
                    classname='hidden md:block absolute bottom-[1px] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[95%] h-[35px]'
                    apearence='secondary'
                    onClick={(e: React.MouseEvent) => handleClick(e, {...product, quantity: 1})}
                >
                    <div className='flex justify-center px-3 font-extrabold'>
                        <span>Add To Cart</span>
                    </div>
                </Button>
            </div>
            <div className=''>
                <div className='text-[22px] font-black text-[#4d6d7e]'>
                    {product.name}
                </div>
                <div className='text-[#4d6d7e] text-[18px]'>
                    {product.shortName}
                </div>
                <Button
                    classname='md:hidden block mx-auto mt-3 w-[100%] h-[35px]'
                    apearence='secondary'
                    onClick={(e: React.MouseEvent) => handleClick(e, {...product, quantity: 1})}
                >
                    <div className='flex justify-center px-3 font-extrabold'>
                        <span>Add To Cart</span>
                    </div>
                </Button>
            </div>
        </div>
    );
};

export default ProductCard;
