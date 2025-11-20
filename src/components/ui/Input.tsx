import React from 'react'
import classNames from 'classnames';
import { InputProps } from '@/types/componentTypes';

const Input = ({type, className, placeholder, id}: InputProps) => {
  return (
    <input
        id={id}
        className={classNames(
            className,
            'focus:outline-offset-1 focus:outline-1 focus:outline-[#4d6d7e80] focus:ring-1 ring-[#4d6d7e] border border-[#4d6d7e] rounded-lg bg-white text-[#4d6d7e] px-3 placeholder:text-[16px] placeholder:text-[#6E8792]'
        )}
        type={type}
        placeholder={placeholder}
    />
  );
};

export default Input
