import classNames from 'classnames';
import ProductCard from '../ui/ProductCard';
import { useRouter } from 'next/navigation';
import { ProductsProps } from '@/types/componentTypes';
import Button from '../ui/Button';
import { useDispatch } from 'react-redux';
import { resetFilters, resetProducts } from '@/state/filterSlice/filterSlice';

const Products = ({ products, loading, productsLoadedOnce }: ProductsProps) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const resetAll = () => {
        dispatch(resetFilters());
        dispatch(resetProducts());
    };

    if (loading) return (
        <div className={classNames(
            'relative w-full gap-5 max-w-[1320px] min-h-[500px] px-[15px] h-auto',
            {
                'grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1': products?.length !== 0,
                'flex justify-center items-center': products?.length === 0
            }
        )}>
            <p className='absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-[24px] font-black text-[#4d6d7e]'>Loading...</p>
        </div>
    );

    if (productsLoadedOnce && (products?.length === 0)) return (
        <div className={classNames(
            'relative w-full gap-5 max-w-[1320px] min-h-[500px] px-[15px] h-auto',
            {
                'grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1': products?.length !== 0,
                'flex justify-center items-center': products?.length === 0
            }
        )}>
            <div className='flex flex-col'>
                <p className='text-[24px] font-black text-[#4d6d7e]'>Nothing found by selected filters. Try Changing them</p>
                <Button
                    apearence='secondary'
                    classname='mt-5 w-full h-[35px] mb-2'
                    onClick={resetAll}
                >
                    Clear filters
                </Button>
            </div>
        </div>
    );

    if (products && !loading) return (
        <div className={classNames(
            'relative w-full gap-5 max-w-[1320px] min-h-[500px] px-[15px] h-auto',
            {
                'grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1': products?.length !== 0,
                'flex justify-center items-center': products?.length === 0
            }
        )}>
            {products.map((product) => (
                <ProductCard
                    name={product.shortName}
                    shortName={product.name}
                    key={product.id}
                    mainPhotoUrl={product.mainPhotoUrl}
                    onCardClick={() => router.push(`/product/${product.slug}`)}
                />
            ))}
        </div>
    );
};

export default Products;
