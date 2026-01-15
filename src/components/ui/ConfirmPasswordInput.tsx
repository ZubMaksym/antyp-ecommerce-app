import { ConfirmPasswordInputProps} from '@/types/componentTypes';
import classNames from 'classnames';
import { Eye, EyeClosed } from 'lucide-react'
import { useState } from 'react';

export const ConfirmPasswordInput = ({ register, errors, errorMessage, classname }: ConfirmPasswordInputProps) => {
    const [isHidden, setIsHidden] = useState(true)

    return (
        <>
            <div className='relative'>
                <button
                    type='button'
                    onClick={() => setIsHidden(!isHidden)} 
                    className='absolute top-1/4 right-3 cursor-pointer'
                >
                    {
                        isHidden 
                            ? <Eye color='#4d6d7e' size={25}/>
                            : <EyeClosed color='#4d6d7e' size={25}/> 
                    }
                </button>
            <input
                {...register?.('confirmPassword')}
                type={isHidden ? 'password' : 'text'}
                placeholder='Confirm password'
                className={classNames(
                'block w-full text-[#4d6d7e] font-black h-[50px] border-b border-[#CBCECD] focus:outline-0 placeholder:text-[16px] placeholder:text-[#6E8792] placeholder:font-bold',
                classname
                )}
            />
            </div>
            {
                errors?.['confirmPassword'] && <p className='w-full text-red-500'>{errorMessage}</p>
            }
        </>
    );
};