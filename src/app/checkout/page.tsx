'use client'
import Input from "@/components/ui/Input";
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import Image from 'next/image';
import closeIcon from '@/public/icons/shared/close.svg';
import { removeItem } from '@/state/cartState/cartSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/state/store';
import plus from '@/public/icons/shared/plus.svg';
import minus from '@/public/icons/shared/minus.svg';
import Button from '@/components/ui/Button';
import { incrementItemQuantity, decrementItemQuantity, changeItemQuantity } from '@/state/cartState/cartSlice';
import Link from 'next/link';

const CheckoutPage = () => {
    const { items, totalQuantity } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch<AppDispatch>();

  return (
    <div className='h-[calc(100vh-170px)] flex justify-center gap-10 max-w-[1280px] mx-auto py-3'>
      <div className=''>
        <h1 className='text-[24px] font-black text-[#4d6d7e]'>
          Оформлення замовлення
        </h1>
        <form className='w-[500px] mt-3'>
        <div className='flex gap-5'>
          <div className=''>
            <label htmlFor='firstName' className="ml-[1px] text-[#4d6d7e] font-medium">
              First Name
            </label>
            <Input 
              id='firstName'
              className='w-full h-[45px]' 
              placeholder={`Ім'я`} 
              type='text'
            />
          </div>
          <div className=''>
            <label htmlFor='lastName' className="ml-[1px] text-[#4d6d7e] font-medium">
              Last Name
            </label>
            <Input 
              id='lastName'
              className='w-full h-[45px]' 
              placeholder={`Прізвище`} 
              type='text'
            />
          </div>
        </div>
        <div className='mt-[2px]'>
            <label htmlFor='company' className="ml-[1px] text-[#4d6d7e] font-medium">
              Company
            </label>
            <Input 
                id='company'
                className='w-full h-[45px]' 
                placeholder={`Компанія (опціонально)`} 
                type='text'
            />
        </div>
        <div className='mt-[2px]'>
            <label htmlFor='phoneNumber' className="ml-[1px] text-[#4d6d7e] font-medium">
                Phone Number
            </label>
            <Input 
                id='phoneNumber'
                className='w-full h-[45px]' 
                placeholder={`06612346789`} 
                type='number'
            />
        </div>
      </form>
      </div>
      <div className='scrollbar overflow-y-scroll h-fit *:first:mt-0 *:mt-5'>
            <h1 className='text-[24px] font-black text-[#4d6d7e]'>
                Обрані товари
            </h1>
            {
                items.map((item) => (
                    <div className='flex pb-5 w-[98%]' key={item.id}>
                        <div className='flex items-center'>
                            <div
                                className='cursor-pointer flex justify-center items-center rounded bg-white sm:min-w-[130px] sm:w-[130px] sm:h-[130px] min-w-[100px] w-[100px] h-[100px]'
                            >
                                <Image
                                    className='w-full h-full object-contain'
                                    loading='lazy'
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
                                <div className='flex flex-col sm:flex-row gap-3 mt-2 w-fit'>
                                    <div className='text-[#4d6d7e] flex justify-center border border-[#CAD3D8] rounded-xl px-2 font-extrabold text-[16px]'>
                                        {item.packaging}
                                    </div>
                                    <div className='rounded-xl w-[100px] h-[26px] flex items-center justify-around border border-[#D2DADF]'>
                                        <div
                                            className='text-[#4d6d7e] text-center font-extrabold w-[50px] no-spinner appearance-none outline-none border-none bg-transparent'
                                        >
                                            {item.quantity}
                                        </div>
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
        </div>
    </div>
  );
};

export default CheckoutPage;
