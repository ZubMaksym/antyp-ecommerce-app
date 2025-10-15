import EmailInput from '@/components/ui/EmailInput';
import { PasswordInput } from '@/components/ui/PasswordInput';
import Button from '@/components/ui/Button';
import Link from 'next/link';

const LoginPage = () => {
    return (
        <section className='mt-[30px] mb-[40px] flex justify-center'>
            <div className='flex flex-col justify-center items-center'>
                <h1 className='text-[38px] font-black text-center text-[#4d6d7e]'>Sign In</h1>
                <form className='md:w-[610px] px-[20px] md:px-0 *:first:mt-[10px] *:mt-[15px] *:last:mt-[30px]'>
                    <EmailInput />
                    <PasswordInput />
                    <Button apearence='primary' classname='w-full h-[36px]'>
                        <span className='font-extrabold'>Sign In</span>
                    </Button>
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
