'use client';

import React from 'react';
import { Controller } from 'react-hook-form';
import { useMask } from '@react-input/mask';
import classNames from 'classnames';
import { PhoneNumberInputProps } from '@/types/componentTypes';

const PhoneNumberInput = ({
  control,
  name,
  className = '',
  placeholder = '+__ (___) ___-__-__',
  errors,
}: PhoneNumberInputProps) => {
  const maskRef = useMask({
    mask: '+__ (___) ___-__-__',
    replacement: { _: /\d/ },
    showMask: true,
  });

  return (
    <>
      <Controller
        control={control}
        name={name}
        defaultValue=""
        render={({ field }) => (
          <input
            {...field}
            ref={(el) => {
              field.ref(el);   // RHF ref
              maskRef.current = el as HTMLInputElement; // маска
            }}
            className={classNames(
              className,
              'rounded-lg bg-white text-[#4d6d7e] px-3 placeholder:text-[16px] placeholder:text-[#6E8792]',
              {
                'border border-red-700 focus:outline-3 focus:outline-red-50': errors?.[name],
                'focus:outline-offset-1 focus:outline-1 focus:outline-[#4d6d7e80] focus:ring-1 ring-[#4d6d7e] border border-[#4d6d7e]': !errors?.[name]
              }
            )}
            onChange={() => {
              if (field.value.startsWith('0')) {
                console.log('replace 0 with +38');
                field.onChange(`+38${field.value}`);
              }
            }}
            placeholder={placeholder}
          />
        )}
      />
      {errors?.[name] && (
        <p className="w-full text-red-500">{errors?.[name]?.message}</p>
      )}
    </>
  );
};

export default PhoneNumberInput;
