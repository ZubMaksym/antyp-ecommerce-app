import { ProductCardProps } from '@/types/componentTypes';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addItem } from '@/state/cartState/cartSlice';
import { ProductItemCart } from '@/types/reducerTypes';
import { toggleCart } from '@/state/cartState/cartSlice';
import { AppDispatch } from '@/state/store';
import AddToCartButton from './AddToCartButton';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const ProductCard = ({ onCardClick, product }: ProductCardProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const [isPackagingOpen, setIsPackagingOpen] = useState(false);
    const packagingRef = useRef<HTMLDivElement>(null);

    const handleClick = (e: React.MouseEvent, item: ProductItemCart) => {
        e.stopPropagation();
        dispatch(addItem(item));
        dispatch(toggleCart());
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (packagingRef.current && !packagingRef.current.contains(event.target as Node)) {
                setIsPackagingOpen(false);
            }
        };

        if (isPackagingOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isPackagingOpen]);

    return (
        <div
            tabIndex={0}
            className='flex flex-col cursor-pointer h-full'
            onClick={onCardClick}
        >
        <div className='relative aspect-square flex flex-col bg-white rounded-xl shadow-md p-4'>
            <div className='absolute top-3 right-3 flex space-x-1' ref={packagingRef}>
                {product.packagings.length === 1 ? (
                    <div className='rounded-md sm:rounded-lg sm:text-[16px] text-[12px] font-bold border border-[#4d6d7e] text-[#4d6d7e] px-[3px] py-[1px] sm:px-2 sm:py-1'>
                        {product.packagings[0].name}
                    </div>
                ) : (
                    <div className='relative inline-block'>
                        <button
                            type='button'
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsPackagingOpen(!isPackagingOpen);
                            }}
                            className='rounded-md sm:rounded-lg sm:text-[16px] text-[12px] font-bold border border-[#4d6d7e] text-[#4d6d7e] px-[3px] py-[1px] sm:px-2 sm:py-1 flex items-center gap-1 hover:bg-[#4d6d7e] hover:text-white transition-colors'
                        >
                            <span>Packaging</span>
                            <ChevronDown 
                                size={14} 
                                className={`transition-transform duration-200 ${isPackagingOpen ? 'rotate-180' : ''}`}
                            />
                        </button>
                        {isPackagingOpen && (
                            <div 
                                className='absolute right-0 top-full mt-1 bg-white border border-[#4d6d7e] rounded-md shadow-lg z-10 max-h-[200px] overflow-y-auto w-full'
                                onClick={(e) => e.stopPropagation()}
                            >
                                {product.packagings.map((packaging) => (
                                    <div
                                        key={packaging.id}
                                        className='px-3 py-2 text-[12px] sm:text-[14px] font-bold text-[#4d6d7e] hover:bg-gray-100 cursor-pointer border-b border-gray-200 last:border-b-0'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsPackagingOpen(false);
                                        }}
                                    >
                                        {packaging.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className='flex-1 flex items-center justify-center mt-6'>
                <Image
                    src={product.mainPhotoUrl}
                    alt={product.name}
                    width={450}
                    height={450}
                    className='aspect-square sm:aspect-auto sm:w-[50%] transition-all duration-500 ease-in-out blur-lg scale-105 opacity-0'
                    onLoadingComplete={(img) =>
                    img.classList.remove('blur-lg', 'scale-105', 'opacity-0')
                    }
                />
            </div>
            <AddToCartButton
                product={product}
                handleClick={handleClick}
                isMobile={false}
            />
        </div>
        <div className='flex flex-col flex-1 justify-between mt-2 md:mt-4'>
            <div className='mb-3 md:mb-0'>
                <div className='font-black text-[#4d6d7e] md:text-[22px] sm:text-[18px] text-[14px]'>
                    {product.name}
                </div>
                <div className='text-[#4d6d7e] md:text-[18px] sm:text-[14px] text-[12px]'>
                    {product.shortName}
                </div>
            </div>
            <div className='mt-auto'>
                <AddToCartButton
                    product={product}
                    handleClick={handleClick}
                    isMobile={true}
                />
            </div>
        </div>
        </div>
    );
};

export default ProductCard;
