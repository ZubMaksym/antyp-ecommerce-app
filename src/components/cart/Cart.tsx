import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import Image from 'next/image';
import closeIcon from '@/public/icons/shared/close.svg';
import { removeItem } from '@/state/cartState/cartSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/state/store';


const Cart = () => {
    const { items, totalQuantity } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch<AppDispatch>();

    if (items.length === 0) return (
        <div className='w-full flex justify-center'>
            <div className='text-[#4d6d7e] text-[18px]'>Your cart is currently empty</div>
        </div>
    );

    return (
        <div className='*:first:mt-0 *:mt-5'>
            {
                items.map((item) => (
                    <div className='flex' key={item.id}>
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
                            <div className='flex justify-center items-center bg-white w-[130px] h-[130px] '>
                                <Image
                                    className='lg:w-[110px] lg:h-[110px]'
                                    src={item.mainPhotoUrl}
                                    width={250}
                                    height={250}
                                    alt={`${item.shortName} photo`}
                                />
                            </div>
                            <div className='ml-5'>
                                <div className='text-[#4d6d7e] font-black text-[21px]'>
                                    {item.shortName}
                                </div>
                                <div className='text-[#4d6d7e] font-extrabold text-[16px]'>
                                    Quantity: {item.quantity}
                                </div>
                                {/* <div className='text-[#4d6d7e] font-extrabold text-[16px]'>
                                    Total quantity: {totalQuantity}
                                </div> */}
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Cart;
