'use client';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { StaticImageData } from 'next/image';

interface ProductImageGalleryProps {
    images: string[];
    mainImage: string | StaticImageData;
    setMainImage: (image: string) => void;
    productName: string;
    mainImgRef: React.RefObject<HTMLImageElement | null>;
    isFullscreen: boolean;
    setIsFullscreen: (value: boolean) => void;
    setActiveSlide: (index: number) => void;
}

const ProductImageGallery = ({
    images,
    mainImage,
    setMainImage,
    productName,
    mainImgRef,
    isFullscreen,
    setIsFullscreen,
    setActiveSlide,
}: ProductImageGalleryProps) => {
    const mobileSwiperRef = useRef<any>(null);

    useEffect(() => {
        if (!isFullscreen && mobileSwiperRef.current && mainImage) {
            const index = images.indexOf(mainImage as string);
            if (index !== -1) {
                mobileSwiperRef.current.slideTo(index, 0);
            }
        }
    }, [isFullscreen, mainImage, images]);

    return (
        <div className='flex sm:gap-10 lg:gap-4'>
            {/* Desktop Thumbnail Gallery */}
            <div className='scrollbar flex-1 hidden lg:flex flex-col gap-4 max-w-[150px] max-h-[650px] overflow-auto'>
                {images.map((image: string, index: number) => (
                    <div
                        key={index}
                        className={classNames(
                            'aspect-square flex items-center justify-center bg-white rounded-lg shadow-md max-w-[130px] cursor-pointer',
                            {
                                'opacity-70': mainImage !== image,
                                'hover:opacity-100': mainImage === image,
                            }
                        )}
                        onClick={() => setMainImage(images[index])}
                    >
                        <Image
                            src={image}
                            alt={productName}
                            width={500}
                            height={500}
                            className='place-self-center w-[70%] transition-all duration-200 ease-in-out blur-lg scale-105 opacity-0'
                            onLoadingComplete={(img) => img.classList.remove('blur-lg', 'scale-105', 'opacity-0')}
                        />
                    </div>
                ))}
            </div>

            {/* Desktop Main Image */}
            <div className='hidden lg:flex flex-1 flex-col min-w-0'>
                <motion.div
                    key={mainImage as string}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className='aspect-square flex justify-center items-center bg-white rounded-lg overflow-hidden shadow-md
                                max-w-[650px] max-h-[650px] cursor-pointer'
                    onClick={() => {
                        setActiveSlide(0);
                        setIsFullscreen(true);
                    }}
                >
                    <Image
                        src={mainImage as string}
                        alt={productName}
                        width={500}
                        height={500}
                        className='hidden lg:block w-[70%] transition-all duration-200 ease-in-out blur-lg scale-105 opacity-0'
                        onLoadingComplete={(img) =>
                            img.classList.remove('blur-lg', 'scale-105', 'opacity-0')
                        }
                    />
                    <Image ref={mainImgRef} src={images[0]} alt='' className='hidden' width={500} height={500} />
                </motion.div>
            </div>

            {/* Mobile Swiper */}
            <div className='lg:hidden w-full bg-white py-10 rounded-lg flex justify-center'>
                <div className='w-full'>
                    <Swiper
                        initialSlide={mainImage ? images.indexOf(mainImage as string) : 0}
                        pagination={{ clickable: true }}
                        navigation={true}
                        modules={[Keyboard, Pagination, Navigation]}
                        className='mobile-swiper'
                        onSwiper={(swiper) => (mobileSwiperRef.current = swiper)}
                        onSlideChange={(swiper) => {
                            const index = swiper.activeIndex;
                            setMainImage(images[index]);
                        }}
                    >
                        {images.map((image: string, index: number) => (
                            <SwiperSlide key={index}>
                                <Image
                                    src={image}
                                    alt={productName}
                                    width={500}
                                    height={500}
                                    className='w-[50%] mx-auto transition-all duration-200 ease-in-out blur-lg scale-105 opacity-0'
                                    onLoadingComplete={(img) =>
                                        img.classList.remove('blur-lg', 'scale-105', 'opacity-0')
                                    }
                                    onClick={() => {
                                        setActiveSlide(index);
                                        setIsFullscreen(true);
                                    }}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default ProductImageGallery;
