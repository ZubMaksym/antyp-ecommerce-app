import filterIcon from '@/public/icons/shared/filters.svg';
import Image from 'next/image';
import { FiltersButtonProps } from '@/types/componentTypes';

const FiltersButton = ({ setIsOpen }: FiltersButtonProps) => {
    return (
        <button
            className='block lg:hidden flex justify-around items-center w-[45px] h-[40px] rounded-lg bg-[#4d6d7e]'
            onClick={() => setIsOpen(true)}
        >
            <Image
                src={filterIcon}
                alt='filter icon'
                width={25}
                height={25}
            />
            {/* <div className='text-[22px] text-white font-black'>
                Filters
            </div> */}
        </button>
    );
};

export default FiltersButton;
