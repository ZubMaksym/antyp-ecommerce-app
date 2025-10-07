import Button from './Button';


const ProductCard = () => {
    return (
        <div className='[88/100] md:aspect-[88/100] cursor-pointer'>
            <div className='relative md:aspect-[95/100] aspect-[90/100] flex flex-col bg-white rounded-xl shadow-md overflow-hidden'>
                <Button classname='hidden md:block absolute bottom-[1px] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[95%] h-[35px] ' apearence='secondary'>
                    <div className='flex justify-between px-3 font-extrabold'>
                        <span>Add To Cart</span>
                        <span>$13.99</span>
                    </div>
                </Button>
            </div>
            <div className=''>
                <div className='text-[26px] font-black text-[#4d6d7e]'>
                    Galaxy Ripple
                </div>
                <div className='text-[#4d6d7e] text-[18px]'>
                    Out-of-this world intense hop aromas with full bodied malt sweetness.
                </div>
                <Button classname='md:hidden block mx-auto mt-3 w-[95%] h-[35px] ' apearence='secondary'>
                    <div className='flex justify-between px-3 font-extrabold'>
                        <span>Add To Cart</span>
                        <span>$13.99</span>
                    </div>
                </Button>
            </div>
        </div>
    );
};

export default ProductCard;
