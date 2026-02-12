import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import Image from 'next/image';
import closeIcon from '@/public/icons/shared/close.svg';
import { removeItem } from '@/state/cartState/cartSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/state/store';
import plus from '@/public/icons/shared/plus.svg';
import minus from '@/public/icons/shared/minus.svg';
import Button from '../ui/Button';
import { incrementItemQuantity, decrementItemQuantity, changeItemQuantity } from '@/state/cartState/cartSlice';
import { useRouter } from 'next/navigation';
import { toggleCart } from '@/state/cartState/cartSlice';
import Link from 'next/link';
import { Packaging } from '@/types/reducerTypes';
import ProductImagePlaceholder from '@/public/product_image_placeholder.webp';

const Cart = () => {
    const { items, totalQuantity } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    if (items.length === 0) return (
        <div className='w-full flex justify-center'>
            <div className='text-[#4d6d7e] text-[18px]'>Your cart is currently empty</div>
        </div>
    );

    const handleProductClick = (productSlug: string) => {
        dispatch(toggleCart());
        router.push(`/product/${productSlug}`);
    };

    return (
        <div className='scrollbar overflow-y-scroll max-h-[calc(100vh-170px)] *:first:mt-0 *:mt-5'>
            {
                items.map((item) => (
                    <div className='flex border-b pb-5 w-[98%] border-[#CAD3D8] gap-1' key={`${item.id}${item.packaging}`}>
                        <button
                            className='h-[20px] cursor-pointer'
                            onClick={() => dispatch(removeItem(item))}
                        >
                            <Image
                                src={closeIcon}
                                className='mr-3'
                                alt='close icon'
                                width={20}
                                height={20}
                            />
                        </button>
                        <div className='flex items-center'>
                            <div
                                className='cursor-pointer flex justify-center items-center rounded bg-white sm:min-w-[130px] sm:w-[130px] sm:h-[130px] min-w-[100px] w-[100px] h-[100px]'
                                onClick={() => handleProductClick(item.slug)}
                            >
                                <Image
                                    className='w-full h-full object-contain'
                                    loading='lazy'
                                    src={item.mainPhotoUrl || ProductImagePlaceholder}
                                    width={250}
                                    height={250}
                                    alt={`${item.shortName} photo`}
                                />
                            </div>
                            <div className='ml-5'>
                                <div className='text-[#4d6d7e] font-black text-[21px]'>
                                    {item.shortName}
                                </div>
                                <div className='flex flex-col sm:flex-row gap-3 mt-2 w-fit'>
                                    <div className='text-[#4d6d7e] flex justify-center border border-[#CAD3D8] rounded-xl px-2 font-extrabold text-[16px]'>
                                        {item.packaging}
                                    </div>
                                    <div className='rounded-xl w-[100px] h-[26px] flex items-center justify-around border border-[#D2DADF]'>
                                        <button
                                            className='ml-3 cursor-pointer'
                                            onClick={() => dispatch(decrementItemQuantity({ id: item.id, packaging: item.packaging, multiplicity: item.packagings.find((pack: Packaging) => pack.name === item.packaging)?.multiplicity || 1}))}>
                                            <Image
                                                src={minus}
                                                alt='minus'
                                                width={20}
                                                height={20}
                                            />
                                        </button>
                                        <input
                                            type='number'
                                            value={item.quantity}
                                            className='text-[#4d6d7e] text-center font-extrabold w-[50px] no-spinner appearance-none outline-none border-none bg-transparent'
                                            onChange={(e) => dispatch(changeItemQuantity({ id: item.id, value: Number(e.target.value), packaging: item.packaging, multiplicity: item.packagings.find((pack: Packaging) => pack.name === item.packaging)?.multiplicity || 1}))}
                                        />
                                        <button
                                            className='mr-3 cursor-pointer'
                                            onClick={() => dispatch(incrementItemQuantity(item))}
                                        >
                                            <Image
                                                src={plus}
                                                alt='plus'
                                                width={20}
                                                height={20}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
            <div className='text-[#4d6d7e] font-extrabold text-[18px]'>
                Total products: {totalQuantity}
            </div>
            <Link href='/checkout'>
                <Button 
                    apearence='primary' 
                    classname='font-bold text-[22px] w-[98%] mt-5 mb-1 h-[52px]'
                    onClick={() => dispatch(toggleCart())}
                >
                    Checkout
                </Button>
            </Link>
        </div>
    );
};

export default Cart;
