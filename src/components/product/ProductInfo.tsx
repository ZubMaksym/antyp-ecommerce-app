'use client';
import Image from 'next/image';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ProductItem } from '@/types/reducerTypes';

interface ProductInfoProps {
    product: ProductItem;
    relatedProducts?: ProductItem[];
}

const ProductInfo = ({ product, relatedProducts }: ProductInfoProps) => {
    const router = useRouter();

    return (
        <>
            <motion.h1
                key={product.id + '-title'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className='text-[36px] font-black text-[#4d6d7e]'
            >
                {product.shortName}
            </motion.h1>
            <h2 className='text-[18px] text-[#4d6d7e]'>
                {product.name}
            </h2>
            <h3 className='text-[20px] text-[#4d6d7e] font-medium mt-5'>Товари цього виробника:</h3>
            <div className='grid grid-cols-4 gap-x-3 gap-y-6 mt-3'>
                {relatedProducts?.map((relatedProduct: ProductItem, i: number) => (
                    <div
                        key={relatedProduct.id}
                        className={classNames(
                            'flex justify-center items-center aspect-square bg-white rounded-lg overflow-hidden shadow-md max-w-[190px] max-h-[190px] cursor-pointer hover:ring-1 hover:ring-[#4d6d7e]',
                            {
                                'hover:*:rotate-10': i % 2 === 0,
                                'hover:*:-rotate-10': i % 2 !== 0,
                            }
                        )}
                        onClick={() => router.push(`/product/${relatedProduct.slug}`)}
                    >
                        <Image
                            loading='lazy'
                            width={150}
                            height={150}
                            src={relatedProduct.mainPhotoUrl}
                            alt='product image'
                            className='w-[70%] transition duration-500 ease-in-out'
                        />
                    </div>
                ))}
            </div>
        </>
    );
};

export default ProductInfo;
