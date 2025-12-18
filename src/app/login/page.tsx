'use client';
import UsernameInput from '@/components/ui/UsernameInput';
import { PasswordInput } from '@/components/ui/PasswordInput';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form'; // <- Ось тут
import { LoginFormFields } from '@/types/componentTypes';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginValidationSchema } from '@/schemas/LoginValidationSchema';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


const LoginPage = () => {
    const router = useRouter();
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormFields>({
        resolver: yupResolver(LoginValidationSchema),
        mode: 'onChange',
    });

    const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
        try {
            setError(null);

            const res = await fetch('http://62.171.154.171:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: data.username,
                    password: data.password,
                    twoFactorCode: '',
                }),
                credentials: 'include',
            });

            if (!res.ok) {
                throw new Error('Failed to login');
            }

            const result = await res.json();
            setAccessToken(result.accessToken);
            if (result.role === 'ADMIN') router.push('/admin');
        } catch (error: any) {
            console.error(error);
            setError(error.message || 'Something went wrong');
        }
    };

    return (
        <section className='mt-[30px] mb-[40px] flex justify-center'>
            <div className='flex flex-col justify-center items-center'>
                <h1 className='text-[38px] font-black text-center text-[#4d6d7e]'>Sign In</h1>
                <form
                    className='md:w-[610px] px-[20px] md:px-0'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <UsernameInput
                        register={register}
                        errors={errors}
                        errorMessage={errors.username?.message}
                    />
                    <PasswordInput
                        register={register}
                        errors={errors}
                        errorMessage={errors.password?.message}
                        classname='mt-[15px]'
                    />
                    <Button apearence='primary' classname='w-full h-[36px] mt-[30px]'>
                        <span className='font-extrabold'>Sign In</span>
                    </Button>
                    {error && <p className='text-red-500 mt-2'>{error}</p>}
                </form>
                <div className='my-[20px] text-[#4d6d7e] text-[14px] font-black'>
                    Or...
                </div>
                <div className='flex flex-col justify-around items-center w-[300px] h-[100px] rounded-xl px-[10px] bg-white border border-[#4d6d7e]'>
                    <div className='text-[16px] text-[#4d6d7e] font-black mt-[10px]'>
                        Need an Account?
                    </div>
                    <Link href='/register' className='w-full'>
                        <Button apearence='primary' classname='w-full h-[36px]'>
                            <span className='text-[15px] font-extrabold'>Create an Account</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;
