import Button from './Button';
import { ProductCardProps } from '@/types/componentTypes';
import beerImage from '@/public/icons/PLP_Kolsch.webp';
import Image from 'next/image';

const ProductCard = ({name, shortName, onCardClick}: ProductCardProps) => {
    return (
        <div 
            tabIndex={0}
            className='md:aspect-[88/100] cursor-pointer'
            onClick={onCardClick}
        >
            <div className='relative md:aspect-[95/100] flex flex-col items-center justify-center bg-white rounded-xl shadow-md overflow-hidden'>
                <Image 
                    loading='lazy'
                    // src={beerImage}
                    width={300}
                    height={300}
                    src="https://ddappsfa.blob.core.windows.net/distributors/4c16269a-c2fd-4325-88bf-751c99d2f52b/products/6fe3dff2-97f5-4a33-a30d-03d262c07631/0c8ac7f3-8051-4d29-ac64-333b65c1cdbe.jpg"
                    alt={name}
                />
                <Button classname='hidden md:block absolute bottom-[1px] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[95%] h-[35px] ' apearence='secondary'>
                    <div className='flex justify-between px-3 font-extrabold'>
                        <span>Add To Cart</span>
                        <span>$13.99</span>
                    </div>
                </Button>
            </div>
            <div className=''>
                <div className='text-[26px] font-black text-[#4d6d7e]'>
                    {name}
                </div>
                <div className='text-[#4d6d7e] text-[18px]'>
                    {shortName}
                </div>
                <Button classname='md:hidden block mx-auto mt-3 w-[95%] h-[35px] ' apearence='secondary'>
                    <div className='flex justify-between px-3 font-extrabold'>
                        <span>Add To Cart</span>
                        <span>$13.99</span>
                    </div>
                </Button>
            </div>
        </div>
    );
};

export default ProductCard;
