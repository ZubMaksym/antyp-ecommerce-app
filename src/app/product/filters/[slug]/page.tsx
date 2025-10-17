'use client';
import ProductCard from '@/components/ui/ProductCard';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import CheckBox from '@/components/ui/CheckBox';
import FilterDropdown from '@/components/ui/FilterDropdown';

const CategoryPage = () => {
    const [products, setProducts] = useState<Array<any> | null>(null);
    const categoryName = usePathname().split('/').pop();
    const router = useRouter();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`http://138.199.224.156:2007/product?ProductType=${categoryName}`);

                if (!response.ok) {
                    throw new Error(`API error ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                setProducts(data.result.items);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts();
    }, []);


    return (
        <section className='mb-[40px] flex justify-center mt-[55px]'>
            <div className='w-[300px] mx-[30px] px-[5px]'>
                <h2 className='text-[22px] font-black text-[#4d6d7e]'>Filters</h2>
                <FilterDropdown filterName='Manufacturer'>
                    <div className='flex'>
                        <CheckBox />
                        <span className='font-semibold ml-1 text-[#4d6d7e]'>Jhon Gaspar</span>
                    </div>
                    <div className='flex'>
                        <CheckBox />
                        <span className='font-semibold ml-1 text-[#4d6d7e]'>Jhon Gaspar</span>
                    </div>
                    <div className='flex'>
                        <CheckBox />
                        <span className='font-semibold ml-1 text-[#4d6d7e]'>Jhon Gaspar</span>
                    </div>
                    <div className='flex'>
                        <CheckBox />
                        <span className='font-semibold ml-1 text-[#4d6d7e]'>Jhon Gaspar</span>
                    </div>
                    <div className='flex'>
                        <CheckBox />
                        <span className='font-semibold ml-1 text-[#4d6d7e]'>Jhon Gaspar</span>
                    </div>
                </FilterDropdown>
                <FilterDropdown filterName='Product'>
                    <div className='flex'>
                        <CheckBox />
                        <span className='font-semibold ml-1 text-[#4d6d7e]'>FSCola</span>
                    </div>
                    <div className='flex'>
                        <CheckBox />
                        <span className='font-semibold ml-1 text-[#4d6d7e]'>FSCola</span>
                    </div>
                    <div className='flex'>
                        <CheckBox />
                        <span className='font-semibold ml-1 text-[#4d6d7e]'>FSCola</span>
                    </div>
                    <div className='flex'>
                        <CheckBox />
                        <span className='font-semibold ml-1 text-[#4d6d7e]'>FSCola</span>
                    </div>
                    <div className='flex'>
                        <CheckBox />
                        <span className='font-semibold ml-1 text-[#4d6d7e]'>FSCola</span>
                    </div>
                </FilterDropdown>
                <FilterDropdown filterName='Packagings'>
                    <div className='flex'>
                        <CheckBox />
                        <span className='font-semibold ml-1 text-[#4d6d7e]'>Aluminium can 0.33 L</span>
                    </div>
                    <div className='flex'>
                        <CheckBox />
                        <span className='font-semibold ml-1 text-[#4d6d7e]'>Glass bottle 0.5 L</span>
                    </div>
                </FilterDropdown>
                <FilterDropdown filterName='Alcohol percentage'>
                    <div className='flex'>
                        <CheckBox />
                        <span className='font-semibold ml-1 text-[#4d6d7e]'>4.1%</span>
                    </div>
                    <div className='flex'>
                        <CheckBox />
                        <span className='font-semibold ml-1 text-[#4d6d7e]'>5%</span>
                    </div>
                    <div className='flex'>
                        <CheckBox />
                        <span className='font-semibold ml-1 text-[#4d6d7e]'>7%</span>
                    </div>
                </FilterDropdown>
            </div>
            <div className='w-full grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-5 max-w-[1320px] px-[30px] min-h-[530px] h-auto'>
                {!products ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        {products.map((product) => (
                            <ProductCard
                                name={product.shortName}
                                shortName={product.name}
                                key={product.id}
                                mainPhotoUrl={product.mainPhotoUrl}
                                onCardClick={() => router.push(`/product/${product.slug}`)}
                            />
                        ))}
                    </>
                )}
            </div>
        </section>
    );
};

export default CategoryPage;
