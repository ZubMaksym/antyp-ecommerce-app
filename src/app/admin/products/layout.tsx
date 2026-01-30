'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { fetchInitialProducts } from '@/state/filterSlice/filterSlice';
import { AppDispatch } from '@/state/store';
import { useDispatch } from 'react-redux';
import AdminProductsList from '@/components/admin/AdminProductsList';
import AdminActionButton from '@/components/admin/AdminActionButton';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const ProductsLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const category = pathname.split('/').pop();

    const dispatch = useDispatch<AppDispatch>();
    const { products, productsLoading, productsError } = useSelector((state: RootState) => state.filter);

    useEffect(() => {
        if (category) {
            dispatch(fetchInitialProducts({ category }));
        }
    }, [category, dispatch]);


    return (
        <section className='flex px-5 py-5 flex flex-col'>
            <div className='flex items-center justify-between'>
                <h1 className='text-[42px] font-bold text-[#4d6d7e]'>
                    {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Products'}
                </h1>
                <AdminActionButton action='create' />
            </div>
            <AdminProductsList products={products} productsLoading={productsLoading} productsError={productsError} />
        </section>
    )
}

export default ProductsLayout;