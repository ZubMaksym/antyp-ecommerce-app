import Button from './Button';
import { ProductCardProps } from '@/types/componentTypes';
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
            className='md:aspect-[88/100] flex flex-col justify-between cursor-pointer'
            onClick={onCardClick}
        >
            <div className="relative md:aspect-[95/100] flex flex-col justify-end bg-white rounded-xl shadow-md py-[15px]">
                <div className="absolute top-3 right-3">
                    <div className="flex *:first:ml-0 *:ml-1">
                    {product.packagings.map(packaging => (
                        <div
                        key={packaging.id}
                        className="rounded-lg text-[12px] sm:text-[16px] font-bold border-[#4d6d7e] text-[#4d6d7e] border px-2 py-1"
                        >
                        {packaging.name}
                        </div>
                    ))}
                    </div>
                </div>
                <div className="flex-1 flex items-center justify-center mt-6">
                    <Image
                        src={product.mainPhotoUrl}
                        alt={product.name}
                        width={450}
                        height={450}
                        className="w-[50%] transition-all duration-500 ease-in-out blur-lg scale-105 opacity-0"
                        onLoadingComplete={(img) =>
                            img.classList.remove('blur-lg', 'scale-105', 'opacity-0')
                        }
                    />
                </div>
                <div className="relative group hidden md:block w-[95%] mx-auto">
                    <div className="
                        absolute bottom-full left-0 w-full
                        bg-white border rounded-lg shadow-lg
                        opacity-0 translate-y-4
                        group-hover:opacity-100 group-hover:translate-y-0
                        transition-all duration-300 ease-out
                        pointer-events-none group-hover:pointer-events-auto"
                    >
                        <div className="p-3 flex flex-col gap-2">
                            {product.packagings.map(p => (
                            <button
                                key={p.name}
                                className="hover:bg-gray-100 px-3 py-2 rounded"
                                onClick={(e) =>
                                handleClick(e, { ...product, quantity: 1, packaging: p.name })
                                }
                            >
                                {p.name}
                            </button>
                            ))}
                        </div>
                    </div>
                    <Button classname="w-full h-[35px]" apearence="secondary">
                        <div className='flex justify-center px-3 font-extrabold'>
                            <span>Add To Cart</span>
                        </div>
                    </Button>
                </div>
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
                    onClick={(e: React.MouseEvent) => handleClick(e, {...product, quantity: 1, packaging: product.packagings[0].name})}
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
