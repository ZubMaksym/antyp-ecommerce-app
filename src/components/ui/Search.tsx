import searchSVG from '@/public/icons/header/search.svg';
import { ProductItem } from '@/types/reducerTypes';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ModalProps } from '@/types/componentTypes';

const Search = ({ isOpen, setIsOpen }: ModalProps) => {
    const [input, setInput] = useState('');
    const [data, setData] = useState<ProductItem[]>([]);
    const router = useRouter();

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInput(value);
    };

    const handleProductClick = (productSlug: string) => {
        setIsOpen(!isOpen);
        router.push(`/product/${productSlug}`);
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            const fetchProductByName = async () => {
                if (!input) {
                    setData([]);
                    return;
                }
                const res = await fetch(`https://138.199.224.156:444/product?Name=${input}`);
                if (!res.ok) throw new Error('Error searching');
                const data = await res.json();
                setData(data.result.items);
            };
            fetchProductByName();
        }, 300);

        return () => clearTimeout(timeout);
    }, [input]);

    return (
        <div className='relative'>
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
                value={input}
                onChange={onSearch}
                placeholder='Search our store'
                className='w-full text-[#4d6d7e] font-black h-[50px] border-b border-[#CBCECD] focus:outline-0 px-7 placeholder:text-[16px] placeholder:text-[#6E8792] placeholder:font-black'
            />
            <div className='scrollbar overflow-y-scroll max-h-[calc(100vh-220px)] mt-3 *:first:mt-0 *:mt-3'>
                {
                    data
                        ? (
                            data.map((item: ProductItem) => (
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
                            ))
                        )
                        : <div className=''>Nothing found</div>
                }
            </div>
        </div>
    );
};

export default Search;
