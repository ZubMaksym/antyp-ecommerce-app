import { FilterDropdownProps } from '@/types/componentTypes';
import { useState } from 'react';
import caret from '@/public/icons/shared/caretDropdownBold.svg';
import Image from 'next/image';
import classNames from 'classnames';
import { FilterName } from '@/types/reducerTypes';


const FilterDropdown = ({ filterName, children, isFirst, filterOptions }: FilterDropdownProps) => {
    const [isFilterOpen, setIsFilterOpen] = useState(isFirst ? true : false);
    // const [optionCount, setOptionCount] = useState(0);

    // const availableOptions = filterOptions?.map((option: FilterName) => {
    //     if (option.count !== 0){
    //         return option;
    //     }
    // });

    // if (availableOptions && availableOptions[0] === undefined){
    //     return;
    // }

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
                        <div>
                            {children}
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default FilterDropdown;
