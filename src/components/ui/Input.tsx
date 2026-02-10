import React from 'react';
import classNames from 'classnames';
import { InputProps } from '@/types/componentTypes';
import { Path } from 'react-hook-form';

const Input = <TFormValues extends Record<string, any>>({
  type,
  className,
  placeholder,
  id,
  register,
  errors,
  errorMessage,
}: InputProps<TFormValues>) => {
  return (
    <>
      <input
        {...(register ? register(id as Path<TFormValues>) : {})}
        id={id}
        className={classNames(
          className,
          'rounded-lg bg-white text-[#4d6d7e] px-3 placeholder:text-[16px] placeholder:text-[#6E8792]',
          {
            'border border-red-700 focus:outline-3 focus:outline-red-50': errors?.[id],
            'focus:outline-offset-1 focus:outline-1 focus:outline-[#4d6d7e80] focus:ring-1 ring-[#4d6d7e] border border-[#4d6d7e]': !errors?.[id]
          }
        )}
        type={type}
        autoComplete={
          id === 'firstName' ? 'given-name' :
            id === 'lastName' ? 'family-name' :
              'off'
        }
        placeholder={placeholder}
      />
      {
        errors?.[id] && <p className='text-red-500'>{errorMessage}</p>
      }
    </>
  );
};

export default Input;
