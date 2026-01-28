import { AuthLayoutProps } from '@/types/componentTypes';
import Link from 'next/link';
import Button from './Button';


const AuthLayout = ({ children, title, type }: AuthLayoutProps) => {
  return (
    <section className='mt-[30px] mb-[40px] flex justify-center h-[700px]'>
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-[38px] font-black text-center text-[#4d6d7e]'>
                {title}
            </h1>
            {children}
            <div className='my-[20px] text-[#4d6d7e] text-[14px] font-black'>
                Or...
            </div>
            <div className='flex flex-col justify-around items-center w-[300px] h-[100px] rounded-xl px-[10px] bg-white border border-[#4d6d7e]'>
                <div className='text-[16px] text-[#4d6d7e] font-black mt-[10px]'>
                    {type === 'login' ? 'Need an Account?' : 'Already have an Account?'}
                </div>
                <Link href={type === 'login' ? '/register' : '/login'} className='w-full'>
                    <Button apearence='primary' classname='w-full h-[36px]'>
                        <span className='text-[15px] font-extrabold'>{type === 'login' ? 'Create an Account' : 'Sign In'}</span>
                    </Button>
                </Link>
            </div>
        </div>
    </section>
  );
};

export default AuthLayout;