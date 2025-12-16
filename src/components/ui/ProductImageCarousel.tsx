import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Image from 'next/image';
import { ProductImageCarouselProps } from '@/types/componentTypes';

const ProductImageCarousel = ({ images, setIsFullscreen, activeSlide }: ProductImageCarouselProps) => {
    return (
        <div className='fixed inset-0 z-[9999] bg-[#f6efe7] flex items-center justify-center'>
            <button
                className='absolute top-6 right-6 text-3xl cursor-pointer z-10 text-[#4d6d7e]'
                onClick={() => setIsFullscreen(false)}
            >
                ✕
            </button>

            <Swiper
                initialSlide={activeSlide}
                navigation
                pagination={{ clickable: true }}
                keyboard
                modules={[Navigation, Pagination, Keyboard]}
                className='w-full h-full desktop-swiper'
            >
                {images.map((image: string, index: number) => (
                    <SwiperSlide
                        key={index}
                        className='!flex !items-center !justify-center h-full'
                    >
                        <div className='relative w-full lg:w-2/3 h-full bg-white'>
                            <Image
                                src={image}
                                alt='product'
                                fill
                                className='object-contain sm:p-20'
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ProductImageCarousel;
