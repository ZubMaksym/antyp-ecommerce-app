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
  errorMessage,
}: PhoneNumberInputProps) => {
  const maskRef = useMask({
    mask: '+__ (___) ___-__-__',
    replacement: { _: /\d/ },
    showMask: true,
  });

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field }) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const inputValue = e.target.value;
          
          // If user types "0" at the start (before mask processes) or mask formats it as "+0"
          if (inputValue.startsWith('+0')) {
            // Replace "0" or "+0" with "+38 (0"
            const newValue = inputValue.replace('+0_ (_', '+38 (0');
            field.onChange(newValue);
          } else {
            field.onChange(inputValue);
          }
        };

        return (
          <>
            <input
              {...field}
              value={field.value || ''}
              onChange={handleChange}
              ref={(el) => {
                field.ref(el);
                if (el) {
                  maskRef.current = el;
                }
              }}
              type="text"
              autoComplete="tel-country-code"
              placeholder={placeholder}
              className={classNames(
                className,
                'rounded-lg bg-white text-[#4d6d7e] px-3 placeholder:text-[16px] placeholder:text-[#6E8792]',
                {
                  'border border-red-700 focus:outline-3 focus:outline-red-50': errors?.[name],
                  'focus:outline-offset-1 focus:outline-1 focus:outline-[#4d6d7e80] focus:ring-1 ring-[#4d6d7e] border border-[#4d6d7e]': !errors?.[name]
                }
              )}
            />
            {errors?.[name] && (
              <p className="text-red-500">
                {errorMessage || (errors[name]?.message as string)}
              </p>
            )}
          </>
        );
      }}
    />
  );
};

export default PhoneNumberInput;
