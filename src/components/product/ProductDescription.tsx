'use client';
import ProductDetailsTable from './ProductDetailsTable';
import { ProductItem } from '@/types/reducerTypes';

interface ProductDescriptionProps {
    product: ProductItem;
    color: string | null;
}

const ProductDescription = ({ product, color }: ProductDescriptionProps) => {
    return (
        <div
            className='w-full mt-10 text-white px-6 py-[60px] flex flex-col lg:flex-row justify-around items-center gap-20'
            style={{ backgroundColor: color ?? '#4d6d7e' }}
        >
            <div className='flex h-full flex-col max-w-[925px]'>
                <h3 className='stroke h-auto text-[50px] font-black'>
                    {product.shortName}
                </h3>
                <p className='text-[18px] font-medium mt-5 mb-8'>
                    {product.description || 'No description available for this product.'}
                </p>
                <div className='text-[18px] font-bold'>
                    <div className=''>
                        {product.ingredients.length} Natural Ingredients:
                        <ul className=''>
                            {product.ingredients.map((ingredient: { id: string; name: string }) => (
                                <li className='' key={ingredient.id}>
                                    {ingredient.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className='text-[18px] font-bold '>
                <div className='text-[18px] font-bold'>
                    Product Details per 100 g (г)
                </div>
                <div className='flex h-[3px] bg-white'></div>
                <div className='flex'>
                    <ProductDetailsTable product={product} />
                </div>
            </div>
        </div>
    );
};

export default ProductDescription;
