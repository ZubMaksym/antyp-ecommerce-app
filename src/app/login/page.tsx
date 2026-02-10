'use client';
import UsernameInput from '@/components/forms/UsernameInput';
import { PasswordInput } from '@/components/forms/PasswordInput';
import Button from '@/components/ui/Button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { LoginFormFields } from '@/types/componentTypes';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginValidationSchema } from '@/schemas/LoginValidationSchema';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '@/types/commonTypes';
import AuthLayout from '@/components/auth/AuthLayout';
import { setAccessToken } from '@/auth/token';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const LoginPage = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormFields>({
        resolver: yupResolver(LoginValidationSchema),
        mode: 'onSubmit',
    });

    const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
        try {
            setError(null);
            setIsLoading(true);

            let res: Response;
            try {
                res = await fetch(`${API_BASE_URL}/api/Auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': '*/*',
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        email: data.email.trim(),
                        password: data.password,
                        twoFactorCode: '',
                    }),
                });
            } catch (fetchError) {
                if (fetchError instanceof TypeError && fetchError.message === 'Failed to fetch') {
                    throw new Error('Unable to connect to server. Please check your internet connection and try again.');
                }
                throw fetchError;
            }

            if (!res.ok) {
                let errorMessage = 'Failed to login';
                try {
                    const errorData = await res.json();
                    errorMessage = errorData.errors?.message || errorData.message || `Login failed (${res.status})`;
                } catch {
                    errorMessage = res.statusText || `Login failed (${res.status})`;
                }
                throw new Error(errorMessage);
            }

            const result = await res.json();
            const accessToken = result.result?.accessToken;

            if (!accessToken) {
                throw new Error('No access token received from server');
            }

            setAccessToken(accessToken);

            const decoded = jwtDecode<JwtPayload>(accessToken);
            const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

            if (role === 'Admin') {
                router.push('/admin');
            } else {
                router.push('/user');
            }
        } catch (error: any) {
            // Only log unexpected errors, not user-facing errors
            if (error.message && !error.message.includes('Unable to connect')) {
                console.error('Login error:', error);
            }
            setError(error.message || 'Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout title='Sign In' type='login'>
            <form
                className='md:w-[610px] px-[20px] md:px-0'
                onSubmit={handleSubmit(onSubmit)}
            >
                <UsernameInput
                    register={register}
                    errors={errors}
                    errorMessage={errors.email?.message}
                />
                <PasswordInput
                    register={register}
                    errors={errors}
                    errorMessage={errors.password?.message}
                    classname='mt-[15px]'
                />
                <Button
                    apearence='primary'
                    classname='w-full h-[36px] mt-[30px]'
                    disabled={isLoading}
                >
                    <span className='font-extrabold'>{isLoading ? 'Signing In...' : 'Sign In'}</span>
                </Button>
                {error && <p className='text-red-500 mt-2 text-sm'>{error}</p>}
            </form>
        </AuthLayout>
    );
};

export default LoginPage;
