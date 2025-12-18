import { UsernameInputProps } from '@/types/componentTypes';

const UsernameInput = ({ register, errors, errorMessage }: UsernameInputProps) => {
  return (
    <>
      <input
        {...register?.('username')}
        type='text'
        placeholder='Username'
        className='block w-full text-[#4d6d7e] font-black h-[50px] border-b border-[#CBCECD] focus:outline-0 placeholder:text-[16px] placeholder:text-[#6E8792] placeholder:font-bold'
      />
      {
        errors?.['username'] && <p className='w-full text-red-500'>{errorMessage}</p>
      }
    </>
  );
};

export default UsernameInput;
