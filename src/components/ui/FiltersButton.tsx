import filterIcon from '@/public/icons/shared/filters.svg';
import Image from 'next/image';


const FiltersButton = () => {
    return (
        <button className='flex justify-around items-center w-[145px] h-[45px] border rounded-lg bg-[#4d6d7e]'>
            <Image 
                src={filterIcon}
                alt='filter icon'
                width={25}
                height={25}
            />
            <div className='text-[22px] text-white font-black'>
                Filters
            </div>
        </button>
    );
};

export default FiltersButton;
