import { useState } from 'react';
import classNames from 'classnames';

const CheckBox = () => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <div className='relative w-4 flex gap-2'>
            <input
                className='peer relative cursor-pointer appearance-none shrink-0 w-4 h-4 mt-1'
                type='checkbox'
                checked={isChecked || false}
                onChange={() => setIsChecked(!isChecked)}
            />
            <svg
                className={classNames(
                    'absolute w-4 h-4 pointer-events-none border border-[#4d6d7e] rounded fill-none peer-checked:bg-[#4d6d7e] mt-1',
                    {
                        'stroke-white': isChecked
                    }
                )}
                width='24'
                height='24'
                viewBox='0 0 24 24'
                stroke={isChecked ? 'currentColor' : '#4d6d7e'}
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            >
                <polyline points='20 6 9 17 4 12' />
            </svg>
        </div>
    );
};

export default CheckBox;
