import Image from 'next/image';
import LoadingSpinner from '../ui/LoadingSpinner';
import { AdminProductsListProps } from '@/types/componentTypes';
import AdminActionButton from './AdminActionButton';
import classNames from 'classnames';
import ProductImagePlaceholder from '@/public/product_image_placeholder.webp';
import Button from '../ui/Button';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { getImageUrlWithCacheBust } from '@/utils/helpers';

const AdminProductsList = ({ products, productsLoading, productsError, modalMode, setModalMode, setSelectedProductId }: AdminProductsListProps) => {
    const router = useRouter();
    const imageCacheVersion = useSelector((state: RootState) => state.photos.imageCacheVersion);

    const onUploadPhotos = (selectedProductSlug: string) => {
        localStorage.setItem('selectedProductSlug', selectedProductSlug);
        router.push('/admin/photos');
    }
    
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
                                    key={`${product.id}-${imageCacheVersion}`}
                                    src={product.mainPhotoUrl ? getImageUrlWithCacheBust(product.mainPhotoUrl, imageCacheVersion) : ProductImagePlaceholder}
                                    alt={product.name}
                                    width={110}
                                    height={110}
                                    className='bg-white rounded-md p-2'
                                />
                                <h2 className='ml-5 text-[#4d6d7e] font-medium text-[18px]'>
                                    {product.name}
                                </h2>
                            </div>
                            <div className='*:first:ml-0 *:ml-2 flex items-center gap-2'>
                                <Button 
                                    classname='px-4 h-[32px]' 
                                    apearence='secondary'
                                    onClick={() => onUploadPhotos(product.slug)}
                                >
                                    Upload photos
                                </Button>
                                <AdminActionButton action='edit' onClick={() => {
                                    setSelectedProductId(product.id);
                                    setModalMode('edit');
                                }} />
                                <AdminActionButton action='delete' onClick={() => {
                                    setSelectedProductId(product.id);
                                    setModalMode('delete');
                                }} />
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