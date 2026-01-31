import { ProductItem } from '@/types/reducerTypes';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ModalProps } from '@/types/componentTypes';
import { useProductSearch } from '@/hooks/useProductSearch';
import SearchInput from './SearchInput';
import LoadingSpinner from '../ui/LoadingSpinner';

const Search = ({ isOpen, setIsOpen }: ModalProps) => {
    const [input, setInput] = useState('');
    const { searchResults, isSearching, searchError } = useProductSearch(input);
    const router = useRouter();

    const handleProductClick = (productSlug: string) => {
        setIsOpen(!isOpen);
        router.push(`/product/${productSlug}`);
    };

    return (
        <div className='relative'>
            <SearchInput value={input} onChange={setInput} />
            <div className=''>
                {searchError && (
                    <div className='flex justify-center text-red-500 text-[18px] font-bold items-center mt-10'>
                        {searchError}
                    </div>
                )}
                {
                    searchResults && searchResults.length > 0 && !isSearching ? (
                        <div className='scrollbar overflow-y-scroll max-h-[calc(100vh-220px)] mt-3 *:first:mt-0 *:mt-3'>
                            {searchResults.map((item: ProductItem) => (
                                <div
                                    key={item.id}
                                    className='flex items-center cursor-pointer'
                                    onClick={() => handleProductClick(item.slug)}
                                >
                                    <div className='flex justify-center items-center rounded bg-white sm:min-w-[130px] sm:w-[130px] sm:h-[130px] min-w-[100px] w-[100px] h-[100px]'>
                                        <Image
                                            className='w-full h-full object-contain rounded'
                                            loading='lazy'
                                            src={item.mainPhotoUrl}
                                            width={250}
                                            height={250}
                                            alt={`${item.shortName} photo`}
                                        />
                                    </div>
                                    <div className='mx-3 text-[#4d6d7e] font-black text-[16px]'>
                                        {item.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : input.trim() && !isSearching && searchResults !== null && searchResults.length === 0 ? (
                        <div className='flex justify-center text-[#4d6d7e] text-[18px] font-bold items-center mt-10'>
                            Nothing found
                        </div>
                    ) : null
                }
            </div>
        </div>
    );
};

export default Search;
