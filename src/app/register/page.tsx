'use client';
import AuthLayout from '@/components/ui/AuthLayout';
import UsernameInput from '@/components/ui/UsernameInput';
import { PasswordInput } from '@/components/ui/PasswordInput';
import Button from '@/components/ui/Button';
import { useForm, SubmitHandler, UseFormRegister } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterValidationSchema } from '@/schemas/RegisterValidationSchema';
import { LoginFormFields, RegisterFormFields } from '@/types/componentTypes';
import { ConfirmPasswordInput } from '@/components/ui/ConfirmPasswordInput';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '@/types/helperTypes';
import { setAccessToken } from '@/auth/token';

const API_BASE_URL = 'http://62.171.154.171:21000';

const RegisterPage = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormFields>({
        resolver: yupResolver(RegisterValidationSchema),
        mode: 'onSubmit',
    });

    const onSubmit: SubmitHandler<RegisterFormFields> = async (data) => {
        try {
            setError(null);
            setIsLoading(true);

            let res: Response;
            try {
                res = await fetch(`${API_BASE_URL}/api/Auth/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': '*/*',
                    },
                    credentials: 'include', // Include cookies for httpOnly refresh token
                    body: JSON.stringify({
                        email: data.email.trim(),
                        password: data.password,
                        confirmPassword: data.confirmPassword,
                    }),
                });
            } catch (fetchError) {
                // Handle network errors (CORS, offline, etc.)
                if (fetchError instanceof TypeError && fetchError.message === 'Failed to fetch') {
                    throw new Error('Unable to connect to server. Please check your internet connection and try again.');
                }
                throw fetchError;
            }

            if (!res.ok) {
                let errorMessage = 'Registration failed';
                try {
                    const errorData = await res.json();
                    errorMessage = errorData.errors?.message || errorData.message || `Registration failed (${res.status})`;
                } catch {
                    // If response is not JSON, use status text
                    errorMessage = res.statusText || `Registration failed (${res.status})`;
                }
                throw new Error(errorMessage);
            }

            const result = await res.json();
            const accessToken = result.result?.accessToken;

            if (!accessToken) {
                throw new Error('No access token received from server');
            }

            // Store access token in memory (refresh token is in httpOnly cookie)
            setAccessToken(accessToken);

            // Decode token to get user role
            const decoded = jwtDecode<JwtPayload>(accessToken);
            const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

            // Redirect based on role
            if (role === 'Admin') {
                router.push('/admin');
            } else {
                router.push('/user');
            }
        } catch (error: any) {
            // Only log unexpected errors, not user-facing errors
            if (error.message && !error.message.includes('Unable to connect')) {
                console.error('Registration error:', error);
            }
            setError(error.message || 'Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
  return (
    <AuthLayout title='Sign Up' type='register'>
        <form
            className='md:w-[610px] px-[20px] md:px-0'
            onSubmit={handleSubmit(onSubmit)}
        >
            <UsernameInput
                register={register as UseFormRegister<RegisterFormFields | LoginFormFields>}
                errors={errors}
                errorMessage={errors.email?.message}
            />
            <PasswordInput
                register={register as UseFormRegister<RegisterFormFields | LoginFormFields>}
                errors={errors}
                errorMessage={errors.password?.message}
                classname='mt-[15px]'
            />
            <ConfirmPasswordInput
                register={register}
                errors={errors}
                errorMessage={errors.confirmPassword?.message}
                classname='mt-[15px]'   
            />
            <Button 
                apearence='primary' 
                classname='w-full h-[36px] mt-[30px]'
                disabled={isLoading}
            >
                <span className='font-extrabold'>{isLoading ? 'Signing Up...' : 'Sign Up'}</span>
            </Button>
            {error && <p className='text-red-500 mt-2 text-sm'>{error}</p>}
        </form>
</AuthLayout>
  )
}

export default RegisterPage;