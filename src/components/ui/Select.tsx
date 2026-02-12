import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames';
import { SelectProps } from '@/types/componentTypes';
import { Path } from 'react-hook-form';

export const Select = <TFormValues extends Record<string, any>>({ className, errors, errorMessage, id, options, register }: SelectProps<TFormValues>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const selectRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Get register props if register function is provided
  const registerProps = register ? register(id as Path<TFormValues>) : null;

  // Filter options based on input value (must start with the input)
  const filteredOptions = inputValue
    ? options.filter((option) => {
        return option.name.toLowerCase().startsWith(inputValue.toLowerCase());
      })
    : options;

  // Check if input value matches any available option
  const isValidOption = inputValue === '' || options.some((option) => option.name.toLowerCase() === inputValue.toLowerCase());

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsOpen(true);
    
    // Update form value
    if (registerProps?.onChange) {
      registerProps.onChange(e);
    }
  };

  // Handle option selection
  const handleOptionSelect = (option: { id: string; name: string }) => {
    setInputValue(option.name);
    setSelectedOptionId(option.id);
    setIsOpen(false);
    
    // Create synthetic event to update form
    if (inputRef.current && registerProps) {
      const syntheticEvent = {
        target: { value: option.name, name: id },
      } as React.ChangeEvent<HTMLInputElement>;
      
      if (registerProps.onChange) {
        registerProps.onChange(syntheticEvent);
      }
    }
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={classNames('relative', className)} aria-label='Select an option' ref={selectRef}>
      <input
        {...(registerProps || {})}
        ref={(e) => {
          inputRef.current = e;
          if (registerProps?.ref) {
            registerProps.ref(e);
          }
        }}
        type='text'
        id={id}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        className={classNames(
          'w-full rounded-lg bg-white text-[#4d6d7e] px-3 placeholder:text-[16px] placeholder:text-[#6E8792] h-[40px]',
          {
            'border border-red-700 focus:outline-3 focus:outline-red-50': errors?.[id] || (!isValidOption && inputValue !== ''),
            'focus:outline-offset-1 focus:outline-1 focus:outline-[#4d6d7e80] focus:ring-1 ring-[#4d6d7e] border border-[#4d6d7e]': !errors?.[id] && (isValidOption || inputValue === '')
          }
        )}
        placeholder='Select an option'
      />
      {
        isOpen && filteredOptions.length > 0 && (
          <div className='absolute top-[45px] left-0 w-full max-h-[150px] overflow-y-auto scrollbar bg-white border border-[#4d6d7e] rounded-lg shadow-lg z-10'>
            <ul className='py-1'>
              {
                filteredOptions.map((option) => (
                  <li
                    key={option.id} 
                    className={classNames(
                      'cursor-pointer px-3 py-2 hover:bg-[#4d6d7e20]',
                      {
                        'bg-[#4d6d7e20]': selectedOptionId === option.id
                      }
                    )}
                    onClick={() => {
                      handleOptionSelect(option);
                    }}
                  >
                    {option.name}
                  </li>
                ))
              }
            </ul>
          </div>
        )
      }
      {
        (errors?.[id] || (!isValidOption && inputValue !== '')) && (
          <p className='text-red-500 text-sm mt-1'>
            {errorMessage || (inputValue && !isValidOption ? 'Please select a valid option' : '')}
          </p>
        )
      }
    </div>
  )
}
