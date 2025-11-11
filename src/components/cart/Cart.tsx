import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import Image from 'next/image';

const Cart = () => {
    const { items, totalQuantity } = useSelector((state: RootState) => state.cart);

    if (items.length === 0) return (
        <div className='w-full flex justify-center'>
            <div className='text-[#4d6d7e] text-[18px]'>Your cart is currently empty</div>
        </div>
    );

    return (
        <div className='*:first:mt-0 *:mt-5'>
            {
                items.map((item) => (
                    <div key={item.id} className='flex items-center'>
                        <div className='flex justify-center items-center bg-white w-[130px] h-[130px] '>
                            <Image
                                className='lg:w-[110px] lg:h-[110px]'
                                src={item.mainPhotoUrl}
                                width={250}
                                height={250}
                                alt={`${item.shortName} photo`}
                            >
                            </Image>
                        </div>
                        <div className='ml-5'>
                            <div className='text-[#4d6d7e] font-black text-[21px]'>
                                {item.shortName}
                            </div>
                            {/* <div className='text-[#4d6d7e] font-extrabold text-[16px]'>
                                Quantity: {totalQuantity}
                            </div> */}
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Cart;
