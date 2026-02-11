import Image from 'next/image';
import LoadingSpinner from '../ui/LoadingSpinner';
import { AdminProductsListProps } from '@/types/componentTypes';
import AdminActionButton from './AdminActionButton';
import classNames from 'classnames';

const AdminProductsList = ({ products, productsLoading, productsError, modalMode, setModalMode }: AdminProductsListProps) => {
    
    if (productsLoading) {
        return (
            <div className='w-full flex justify-center items-center border border-gray-300 rounded-md p-4 *:first:mt-0 *:mt-3 h-[550px] overflow-y-scroll scrollbar mt-5'>
                <LoadingSpinner message='Loading products...' />
            </div>
        );
    }

    if (productsError) {
        return (
            <div className='w-full flex justify-center items-center border border-gray-300 rounded-md p-4 *:first:mt-0 *:mt-3 h-[550px] overflow-y-scroll scrollbar mt-5'>
                <div className='text-red-500 text-[18px] font-bold'>
                    {productsError}
                </div>
            </div>
        );
    }

    return (
        <div className={classNames(
            'flex flex-col w-full border border-gray-300 rounded-md p-4 *:first:mt-0 *:mt-3 h-[550px] overflow-y-scroll scrollbar mt-5',
            {
                'justify-center': products !== null && products.length === 0,
            }
        )}>
            {
                products && products.length > 0 ? (
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
                                <AdminActionButton action='edit' onClick={() => setModalMode('edit')} />
                                <AdminActionButton action='delete' onClick={() => setModalMode('delete')} />
                            </div>
                        </div>
                    ))
                ) : products !== null && products.length === 0 ? (
                    <div className='text-[#4d6d7e] self-center justify-self-center text-[18px] font-bold'>No products found</div>
                ) : null
            }
        </div>
    );
};

export default AdminProductsList;