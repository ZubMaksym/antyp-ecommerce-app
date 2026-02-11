'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { fetchInitialProducts } from '@/state/filterSlice/filterSlice';
import { AppDispatch } from '@/state/store';
import { useDispatch } from 'react-redux';
import AdminProductsList from '@/components/admin/AdminProductsList';
import AdminActionButton from '@/components/admin/AdminActionButton';
import SearchInput from '@/components/common/SearchInput';
import { useProductSearch } from '@/hooks/useProductSearch';
import { PRODUCT_TYPES } from '@/utils/data';

// children prop is required by Next.js layout type but not rendered in this layout
const ProductsLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const productType = PRODUCT_TYPES.find((type) => type.id === pathname.split('/').pop());
    const [searchQuery, setSearchQuery] = useState('');

    const dispatch = useDispatch<AppDispatch>();
    const { products, productsLoading, productsError } = useSelector((state: RootState) => state.filter);
    const { searchResults, isSearching, searchError } = useProductSearch(searchQuery, `ProductType=${productType?.id}&`);

    useEffect(() => {
        if (productType?.id) {
            dispatch(fetchInitialProducts({ category: productType.id }));
        }
    }, [productType?.id, dispatch]);

    // Determine which products to display
    const displayProducts = searchQuery.trim() ? searchResults : products;
    const displayLoading = searchQuery.trim() ? isSearching : productsLoading;
    const displayError = searchQuery.trim() ? searchError : productsError;

    return (
        <section className='flex px-5 py-5 flex flex-col'>
            <h1 className='text-[42px] font-bold text-[#4d6d7e]'>
                {productType?.label || 'Products'}
            </h1>
            <div className='mt-5 flex items-end *:first:ml-0 *:ml-4'>
                <SearchInput
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder='Search products by name...'
                />
                <AdminActionButton action='create' />
            </div>
            <AdminProductsList
                products={displayProducts}
                productsLoading={displayLoading}
                productsError={displayError}
            />
        </section>
    );
};

export default ProductsLayout;