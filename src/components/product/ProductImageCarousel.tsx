import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Image from 'next/image';
import { ProductImageCarouselProps } from '@/types/componentTypes';
import useForbidBodyScroll from '@/hooks/useForbidBodyScroll';
import { ChevronRight, ChevronLeft } from 'lucide-react';


const ProductImageCarousel = ({ images, isFullscreen, setIsFullscreen, initalSlide, setMainImage }: ProductImageCarouselProps) => {

    useForbidBodyScroll(isFullscreen, 20000);

    return (
        <div
            className='fixed inset-0 z-[9999] bg-[#f6efe7] flex items-center justify-center'
            onClick={() => setIsFullscreen(false)}
        >
            <button
                className='absolute top-6 right-6 text-3xl cursor-pointer z-10 text-[#4d6d7e]'
                onClick={(e) => {
                    e.stopPropagation();
                    setIsFullscreen(false);
                }}
            >
                ✕
            </button>
            <div
                className='w-full lg:w-2/3 h-full'
                onClick={(e) => e.stopPropagation()}
            >
                <Swiper
                    initialSlide={initalSlide || 0}
                    navigation={{
                        nextEl: '.custom-next',
                        prevEl: '.custom-prev',
                    }}
                    pagination={{ clickable: true }}
                    keyboard
                    modules={[Navigation, Pagination, Keyboard]}
                    className='w-full h-full desktop-swiper'
                    onSlideChange={(swiper) => {
                        const index = swiper.activeIndex;
                        setMainImage(images[index]);
                    }}
                >
                    {images.map((image: string, index: number) => (
                        <SwiperSlide
                            key={index}
                            className='!flex !items-center !justify-center h-full'
                        >
                            <div className='relative w-full h-full bg-white'>
                                <Image
                                    src={image}
                                    alt='product'
                                    fill
                                    className='object-contain px-10 sm:p-20'
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <button className='flex justify-center items-center custom-prev absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 z-10 text-white text-[32px] rounded-[50%] bg-[#4d6d7e] cursor-pointer'>
                    <ChevronLeft size={35}/>
                </button>
                <button className='flex justify-center items-center custom-next absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 z-10 text-white text-[32px] rounded-[50%] bg-[#4d6d7e] cursor-pointer'>
                    <ChevronRight size={35}/>
                </button>
            </div>
        </div>
    );
};

export default ProductImageCarousel;
