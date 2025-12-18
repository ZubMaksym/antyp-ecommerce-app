import { PasswordInputProps } from '@/types/componentTypes';
import classNames from 'classnames';

export const PasswordInput = ({ register, errors, errorMessage, classname }: PasswordInputProps) => {
  return (
    <>
      <input
        {...register?.('password')}
        type='password'
        placeholder='Password'
        className={classNames(
          'block w-full text-[#4d6d7e] font-black h-[50px] border-b border-[#CBCECD] focus:outline-0 placeholder:text-[16px] placeholder:text-[#6E8792] placeholder:font-bold',
          classname
        )}
      />
      {
        errors?.['password'] && <p className='w-full text-red-500'>{errorMessage}</p>
      }
    </>
  );
};