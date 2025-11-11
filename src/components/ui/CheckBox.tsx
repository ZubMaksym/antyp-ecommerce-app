import classNames from 'classnames';
import { CheckBoxProps } from '@/types/componentTypes';


const CheckBox = ({ label, onClick, checked }: CheckBoxProps) => {
    return (
        <label className='flex items-center gap-2 cursor-pointer relative'>
            <input
                type='checkbox'
                className='peer w-[20px] h-[20px] appearance-none border border-[#4d6d7e] rounded'
                checked={checked || false}
                readOnly
                // onChange={onClick}
            />
            <svg
                className={classNames(
                    'absolute w-[20px] h-[20px] pointer-events-none rounded fill-none peer-checked:bg-[#4d6d7e]',
                    { 'stroke-white': checked }
                )}
                viewBox='0 0 24 24'
                stroke={checked ? 'currentColor' : '#4d6d7e'}
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            >
                <polyline points='20 6 9 17 4 12' />
            </svg>
            {label && <span className='font-semibold text-[#4d6d7e]'>{label}</span>}
        </label>
    );
};

export default CheckBox;