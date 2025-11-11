import { FilterDropdownProps } from '@/types/componentTypes';
import { useState } from 'react';
// import caret from '@/public/icons/shared/caretDropdown.svg';
import caret from '@/public/icons/shared/caretDropdownBold.svg';
import Image from 'next/image';
import classNames from 'classnames';


const FilterDropdown = ({ filterName, children, isFirst }: FilterDropdownProps) => {
    const [isFilterOpen, setIsFilterOpen] = useState(isFirst ? true : false);

    return (
        <div
            className='w-full border-b border-[#CBCECD] mt-3'
        >
            <div className='flex justify-between cursor-pointer' onClick={() => setIsFilterOpen(!isFilterOpen)}>
                <h3 className='text-[18px] font-bold text-[#4d6d7e]'>
                    {filterName}
                </h3>
                <Image
                    src={caret}
                    width={25}
                    height={25}
                    alt='caret dropdown'
                    className={classNames(
                        'transition duration-300',
                        {
                            'rotate-180': isFilterOpen,
                            'rotate-0': !isFilterOpen,
                        }
                    )}
                />
            </div>
            <div className='my-3'>
                {
                    isFilterOpen && (
                        <div className=''>
                            {children}
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default FilterDropdown;
