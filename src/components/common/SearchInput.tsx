import searchSVG from '@/public/icons/header/search.svg';
import Image from 'next/image';

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

const SearchInput = ({ value, onChange, placeholder = 'Search our store', className = '' }: SearchInputProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className={`relative w-full ${className}`}>
            <div className='absolute translate-y-3/4'>
                <Image
                    src={searchSVG}
                    alt='search icon'
                    width={20}
                    height={20}
                />
            </div>
            <input
                type='text'
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                className='w-full text-[#4d6d7e] font-black h-[50px] border-b border-[#CBCECD] focus:outline-0 px-7 placeholder:text-[16px] placeholder:text-[#6E8792] placeholder:font-black'
            />
        </div>
    );
};

export default SearchInput;
