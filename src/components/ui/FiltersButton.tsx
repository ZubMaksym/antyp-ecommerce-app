import filterIcon from '@/public/icons/shared/filters.svg';
import Image from 'next/image';
import { FiltersButtonProps } from '@/types/componentTypes';

const FiltersButton = ({ setIsOpen }: FiltersButtonProps) => {
    return (
        <button
            className='block border lg:hidden flex justify-around items-center w-[40px] h-[35px] rounded-lg bg-[#4d6d7e]'
            onClick={() => setIsOpen(true)}
        >
            <Image
                src={filterIcon}
                alt='filter icon'
                width={22}
                height={22}
                priority
            />
        </button>
    );
};

export default FiltersButton;
