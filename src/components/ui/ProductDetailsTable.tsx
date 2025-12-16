import { ProductDetailsTableProps } from '@/types/componentTypes';

const ProductDetailsTable = ({ product }: ProductDetailsTableProps) => {
    return (
        <div className='*:flex *:justify-between w-full'>
            {
                product.ibu !== null && (
                    <div className=''>
                        <span>IBU:</span>
                        <span className='ml-5'>{product.ibu}</span>
                    </div>
                )
            }
            {
                product.alcoholStrength !== null && (
                    <div className=''>
                        <span>ALCOHOL:</span>
                        <span className='ml-5'>{product.alcoholStrength}%</span>
                    </div>
                )
            }
            {
                product.beerType && (
                    <div className=''>
                        <span>BEER TYPE:</span>
                        <span className='ml-5'>{product.beerType.name}</span>
                    </div>
                )
            }
            {
                product.carbonationLevel && (
                    <div className=''>
                        <span>CARBONATION LEVEL:</span>
                        <span className='ml-5'>{product.carbonationLevel.name}</span>
                    </div>
                )
            }
            {
                product.waterType && (
                    <div className=''>
                        <span>WATER TYPE:</span>
                        <span className='ml-5'>{product.waterType.name}</span>
                    </div>
                )
            }
            {
                product.softDrinkType && (
                    <div className=''>
                        <span>SOFT DRINK TYPE:</span>
                        <span className='ml-5'>{product.softDrinkType.name}</span>
                    </div>
                )
            }
            {
                product.wineColor && (
                    <div className=''>
                        <span>WINE COLOR:</span>
                        <span className='ml-5'>{product.wineColor.name}</span>
                    </div>
                )
            }
            {
                product.wineSweetness && (
                    <div className=''>
                        <span>WINE SWEETNESS:</span>
                        <span className='ml-5'>{product.wineSweetness.name}</span>
                    </div>
                )
            }
            {
                product.isSparking && (
                    <div className=''>
                        <span>SPARKING:</span>
                        <span className='ml-5'>{product.isSparking}</span>
                    </div>
                )
            }
            {
                product.protein !== null && (
                    <div className=''>
                        <span>PROTEIN:</span>
                        <span className='ml-5'>{product.protein} g (г)</span>
                    </div>
                )
            }
            {
                product.fat !== null && (
                    <div className=''>
                        <span>FAT:</span>
                        <span className='ml-5'>{product.fat} g (г)</span>
                    </div>
                )
            }
            {
                product.carbohydrate !== null && (
                    <div className=''>
                        <span>CARBOHYDRATE:</span>
                        <span className='ml-5'>{product.carbohydrate} g (г)</span>
                    </div>
                )
            }
            {
                product.sugar !== null && (
                    <div className=''>
                        <span>SUGAR:</span>
                        <span className='ml-5'>{product.sugar} g (г)</span>
                    </div>
                )
            }
        </div>
    );
};

export default ProductDetailsTable;
