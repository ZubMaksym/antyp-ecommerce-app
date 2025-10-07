import { ButtonProps } from '@/types/componentTypes';
import classNames from 'classnames';


const Button = ({classname, apearence, children}: ButtonProps) => {
  return (
    <button className={classNames(
        'rounded-lg cursor-pointer',
        classname,
        {
            'bg-[#4d6d7e] text-white': apearence === 'primary',
            'border border-[#4d6d7e] text-[#4d6d7e] transition duration-300 ease-in-out hover:text-white hover:bg-[#4d6d7e]': apearence === 'secondary'
        }
    )}>
        {children}
    </button>
  );
};

export default Button;
