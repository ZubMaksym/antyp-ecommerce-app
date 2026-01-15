import React, { ChangeEvent } from 'react';
import classNames from 'classnames';
import { InputProps } from '@/types/componentTypes';
import { useMask } from '@react-input/mask';

const Input = ({type, className, placeholder, id, register, errors, errorMessage}: InputProps) => {
  const inputRef = useMask({
    mask: '+__ (___) ___-__-__',
    replacement: { _: /\d/ },
    showMask: true,
  });

  const {
    ref: rhfRef,
    ...restRegister
  } = register!(id);

  return (
    <>
      <input
        {...restRegister}
        id={id}
        ref={(el) => {
          rhfRef(el);
          if (id === 'phoneNumber') {
            inputRef.current = el as HTMLInputElement;
          }
        }}
        className={classNames(
            className,
            'rounded-lg bg-white text-[#4d6d7e] px-3 placeholder:text-[16px] placeholder:text-[#6E8792]',
            {
              'border border-red-700 focus:outline-3 focus:outline-red-50' :errors?.[id],
              'focus:outline-offset-1 focus:outline-1 focus:outline-[#4d6d7e80] focus:ring-1 ring-[#4d6d7e] border border-[#4d6d7e]': !errors?.[id]
            }
        )}
        type={type}
        autoComplete={id === 'phoneNumber' ? 'tel-country-code' : 'on'}
        placeholder={placeholder}
        onPaste={() => console.log('paste')}
        onInput={(e: ChangeEvent<HTMLInputElement>) => {
          if (e.target.value.startsWith('+0') && id === 'phoneNumber') {
            console.log('onInput');
            // e.target.value = e.target.value.replace('+0_ (_', '+38 (0_');
          }
        }}
        onChange={(e) => {
          if (e.target.value.startsWith('+0') && id === 'phoneNumber') {
            console.log('onChange');
            e.target.value = e.target.value.replace('+0_ (_', '+38 (0_');
          }
          // restRegister.onChange(e);
        }}
    />
      {
        errors?.[id] && <p className='text-red-500'>{errorMessage}</p>
      }
    </>
  );
};

export default Input;
