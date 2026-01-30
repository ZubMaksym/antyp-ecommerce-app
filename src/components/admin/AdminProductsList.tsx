import Image from 'next/image';
import LoadingSpinner from '../ui/LoadingSpinner';
import { AdminProductsListProps } from '@/types/componentTypes';
import AdminActionButton from './AdminActionButton';

const AdminProductsList = ({ products, productsLoading, productsError }: AdminProductsListProps) => {
    
    if (productsLoading) {
        return (
            <div className='w-full border border-gray-300 rounded-md p-4 *:first:mt-0 *:mt-3 h-[750px] overflow-y-scroll scrollbar mt-5'>
                <LoadingSpinner message='Loading products...' />
            </div>
        )
    }

    if (productsError) {
        return (
            <div className='w-full border border-gray-300 rounded-md p-4 *:first:mt-0 *:mt-3 h-[750px] overflow-y-scroll scrollbar mt-5'>
                <div className='text-red-500'>
                    {productsError}
                </div>
            </div>
        )
    }

    return (
        <div className='w-full border border-gray-300 rounded-md p-4 *:first:mt-0 *:mt-3 h-[750px] overflow-y-scroll scrollbar mt-5'>
            {
                products ? (
                    products.map((product) => (
                        <div 
                            key={product.id}
                            className='flex items-center justify-between'
                        >
                            <div className='flex items-center'>
                                <Image
                                    src={product.mainPhotoUrl}
                                    alt={product.name}
                                    width={110}
                                    height={110}
                                    className='bg-white rounded-md p-2'
                                />
                                <h2 className='ml-5 text-[#4d6d7e] font-medium text-[18px]'>
                                    {product.name}
                                </h2>
                            </div>
                            <div className='*:first:ml-0 *:ml-2'>
                                <AdminActionButton action='edit' />
                                <AdminActionButton action='delete' />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='text-gray-500'>No products found</div>
                )
            }
        </div>
    )
}

export default AdminProductsList;