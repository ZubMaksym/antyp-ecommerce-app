import { EmailInput } from '@/components/ui/EmailInput';
import { PasswordInput } from '@/components/ui/PasswordInput';

const LoginPage = () => {
  return (
    <section className='h-[calc(100vh-60px)] lg:h-[calc(100vh-105px)] xl:h-[calc(100vh-85px)] border flex justify-center'>
        <div className='flex flex-col'>
            <h1 className='text-[36px] font-black text-center text-[#4d6d7e]'>Sign In</h1>
            <form className='md:w-[650px] *:first:mt-[60px] *:mt-[20px]'>
                <EmailInput />
                <PasswordInput />
            </form>
        </div>
    </section>
  );
};

export default LoginPage;
