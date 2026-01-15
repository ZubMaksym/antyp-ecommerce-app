import { ButtonProps } from '@/types/componentTypes';
import classNames from 'classnames';


const Button = ({classname, apearence, children, onClick, disabled}: ButtonProps) => {
  return (
    <button 
        onClick={onClick} 
        disabled={disabled}
        className={classNames(
            disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
            classname,
            {
                'rounded-lg transition duration-300 ease-in-out bg-[#4d6d7e] hover:bg-[#3E5865] text-white': apearence === 'primary',
                'rounded-lg border border-[#4d6d7e] text-[#4d6d7e] transition duration-300 ease-in-out hover:text-white hover:bg-[#4d6d7e]': apearence === 'secondary'
            }
        )}
    >
        {children}
    </button>
  );
};

export default Button;
