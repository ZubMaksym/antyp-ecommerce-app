const ProductCardSkeleton = () => {
    return (
        <div className="flex flex-col cursor-pointer h-full">
            {/* Image container skeleton */}
            <div className="relative aspect-square flex flex-col animate-pulse bg-gray-300 rounded-xl shadow-md p-4">
                {/* Packaging badges skeleton */}
                <div className="absolute top-3 right-3 flex space-x-1">
                    <div className="animate-pulse w-12 h-6 bg-gray-300 rounded-lg"></div>
                    <div className="animate-pulse w-16 h-6 bg-gray-300 rounded-lg"></div>
                </div>
                {/* Image placeholder skeleton */}
                <div className="flex-1 flex items-center justify-center mt-6">
                    <div className="animate-pulse w-[50%] aspect-square bg-gray-300 rounded-lg"></div>
                </div>
                {/* Desktop Add to Cart button skeleton - hidden on mobile */}
                <div className="hidden md:block w-[95%] mx-auto">
                    <div className="animate-pulse w-full h-[35px] bg-gray-300 rounded-lg"></div>
                </div>
            </div>
            {/* Text section skeleton */}
            <div className="flex flex-col flex-1 justify-between mt-2 md:mt-4">
                <div className="mb-3 md:mb-0">
                    {/* Product name skeleton */}
                    <div className="animate-pulse h-[18px] md:h-[28px] sm:h-[22px] bg-gray-300 rounded mb-2 w-3/4"></div>
                    {/* Short name skeleton */}
                    <div className="animate-pulse h-[14px] md:h-[22px] sm:h-[18px] bg-gray-300 rounded w-1/2"></div>
                </div>
                {/* Mobile Add to Cart button skeleton - visible only on mobile */}
                <div className="mt-auto md:hidden">
                    <div className="animate-pulse w-full h-[35px] bg-gray-300 rounded-lg"></div>
                </div>
            </div>
        </div>
    );
};

export default ProductCardSkeleton;
