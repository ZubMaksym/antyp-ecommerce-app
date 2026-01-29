'use client';
import Input from '@/components/ui/Input';
import PhoneNumberInput from '@/components/forms/PhoneNumberInput';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import {useForm, SubmitHandler} from 'react-hook-form';
import { CheckoutFormFields } from '@/types/componentTypes';
import { yupResolver } from '@hookform/resolvers/yup';
import { CheckoutFormValidationSchema } from '@/schemas/CheckoutFormValidationSchema';

const CheckoutPage = () => {
    const { items, totalQuantity } = useSelector((state: RootState) => state.cart);

    const { register, handleSubmit, formState: { errors }, control } = useForm<CheckoutFormFields>({
        resolver: yupResolver(CheckoutFormValidationSchema),
        mode: 'onChange',
    });

    const onSubmit: SubmitHandler<CheckoutFormFields> = (data) => {
        console.log(data);
    };

    return (
        <div className='relative w-full flex flex-col lg:flex-row justify-center items-start sm:items-center lg:items-start gap-10 max-w-[1280px] mx-auto py-3 px-3 mb-20'>
            <div className=''>
                <h1 className='text-[24px] font-black text-[#4d6d7e]'>
                    Оформлення замовлення
                </h1>
                <form 
                    className='md:w-[500px] mt-3'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className='flex gap-5'>
                        <div className=''>
                            <label htmlFor='firstName' className='ml-[1px] text-[#4d6d7e] font-medium'>
                                First Name
                            </label>
                            <Input
                                id='firstName'
                                className='w-full h-[45px]'
                                placeholder={`Ім'я`}
                                type='text'
                                register={register}
                                errors={errors}
                                errorMessage={errors.firstName?.message}
                            />
                        </div>
                        <div className=''>
                            <label htmlFor='lastName' className='ml-[1px] text-[#4d6d7e] font-medium'>
                                Last Name
                            </label>
                            <Input
                                id='lastName'
                                className='w-full h-[45px]'
                                placeholder={`Прізвище`}
                                type='text'
                                register={register}
                                errors={errors}
                                errorMessage={errors.lastName?.message}
                            />
                        </div>
                    </div>
                    <div className='mt-[2px]'>
                        <label htmlFor='company' className='ml-[1px] text-[#4d6d7e] font-medium'>
                            Company
                        </label>
                        <Input
                            id='company'
                            className='w-full h-[45px]'
                            placeholder={`Компанія (опціонально)`}
                            type='text'
                            register={register}
                            errors={errors}
                            errorMessage={errors.company?.message}
                        />
                    </div>
                    <div className='mt-[2px]'>
                        <label htmlFor='phoneNumber' className='ml-[1px] text-[#4d6d7e] font-medium'>
                            Phone Number
                        </label>
                        <PhoneNumberInput
                            control={control}
                            name='phoneNumber'
                            className='w-full h-[45px]'
                            placeholder='+38 (___) ___-__-__'
                            errors={errors}
                            errorMessage={errors.phoneNumber?.message}
                        />
                    </div>
                    <div className='mt-4'>
                        <Button apearence='primary' classname='w-full h-[45px]'>
                            Оформити замовлення
                        </Button>
                    </div>
                </form>
            </div>
            <div className='w-full sm:w-[500px]'>
                <h1 className='text-[24px] font-black text-[#4d6d7e] mb-3'>
                    Обрані товари
                </h1>
                <div className='scrollbar overflow-y-scroll max-h-[calc(100vh-320px)]'>
                    {
                        items.map((item) => (
                            <div className='flex pb-2 w-full' key={item.id}>
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
                                        <div className='flex flex-col gap-3 mt-2 w-fit'>
                                            <div className='flex items-center gap-2 flex-wrap text-[#4d6d7e] text-[18px]'>
                                                <span>Packaging:</span><span className='text-[16px] border border-[#CAD3D8] rounded-xl px-2 font-extrabold text-[16px]'>{item.packaging}</span>
                                            </div>
                                            <div className='text-[#4d6d7e] text-[18px]'>
                                                Quantity: <span className='text-[16px] border border-[#CAD3D8] rounded-xl px-2 font-extrabold text-[16px]'>{item.quantity}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='text-[#4d6d7e] font-extrabold text-[18px] my-3'>
                    Total products: {totalQuantity}
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
