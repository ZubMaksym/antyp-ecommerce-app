'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/state/store';
import { addItem, toggleCart } from '@/state/cartState/cartSlice';
import { ProductItem } from '@/types/reducerTypes';
import ColorThief from 'color-thief-browser';
import ProductImageCarousel from '@/components/product/ProductImageCarousel';
import ProductImageGallery from '@/components/product/ProductImageGallery';
import ProductInfo from '@/components/product/ProductInfo';
import ProductQuantitySelector from '@/components/product/ProductQuantitySelector';
import ProductDescription from '@/components/product/ProductDescription';
import beerTestImage from '@/public/icons/PLP_Kolsch.webp';
import { motion, AnimatePresence } from 'framer-motion';
import useForbidBodyScroll from '@/hooks/useForbidBodyScroll';
import LoadingSpinner from '@/components/ui/LoadingSpinner';


const ProductPage = () => {
    const [productLoading, setPoductLoading] = useState(true);
    const [packaging, setPackaging] = useState<string>('');
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState<any | null>(null);
    const [color, setColor] = useState<string | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<ProductItem[]>();
    const slug = usePathname().split('/').pop();
    const mainImgRef = useRef<HTMLImageElement | null>(null);
    const images = product && [product.mainPhotoUrl, beerTestImage];
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [activeSlide, setActiveSlide] = useState(0);
    const [mainImage, setMainImage] = useState('');
    
    const dispatch = useDispatch<AppDispatch>();

    const addToCart = (item: ProductItem) => {
        dispatch(addItem({ ...item, quantity, packaging: packaging }));
        dispatch(toggleCart());
    };

    useForbidBodyScroll(isFullscreen, 20000);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://62.171.154.171:21000/product/${slug}`);

                if (!response.ok) {
                    throw new Error(`API Error ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                setProduct(data.result);
                setQuantity(data.result.packagings[0].multiplicity || 1);
                setPoductLoading(false);
                setMainImage(data.result.mainPhotoUrl);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProduct();
    }, [slug]);

    useEffect(() => {
        const fetchRelatedProducts = async () => {
            if (product) {
                try {
                    const response = await fetch(`http://62.171.154.171:21000/product?Manufacturers=${product.manufacturer.id}`);

                    if (!response.ok) {
                        throw new Error(`API Error ${response.status} ${response.statusText}`);
                    }

                    const data = await response.json();
                    setRelatedProducts(data.result.items);
                } catch (error) {
                    console.error(error);
                }
            }
        };
        fetchRelatedProducts();
    }, [slug, product]);

    useEffect(() => {
        if (product && product.packagings.length > 0) {
            setPackaging(product.packagings[0].name);
        }
    }, [product]);

    useEffect(() => {
        if (!product) return;
        if (!mainImgRef.current) return;

        const img = mainImgRef.current;
        const thief = new ColorThief();

        const setColorFromMainPhoto = () => {
            const [r, g, b] = thief.getColor(img);
            setColor(`rgb(${r}, ${g}, ${b})`);
        };

        if (img.complete) {
            setColorFromMainPhoto();
        } else {
            img.onload = setColorFromMainPhoto;
        }
    }, [product]);


    if (productLoading) {
        return (
            <div className='h-[calc(100vh-170px)] flex justify-center items-center'>
                <LoadingSpinner message="Loading..." height="auto" />
            </div>
        );
    }

    return (
        <section>
            <div className='flex justify-center'>
                <AnimatePresence mode='wait'>
                    {product && (
                        <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className='w-full max-w-[1720px] mx-auto px-6 mt-[55px] flex flex-col lg:flex-row gap-10'
                            >
                                <div className='flex-1 mb-1'>
                                    <div className='lg:sticky top-28'>
                                        <ProductImageGallery
                                            images={images}
                                            mainImage={mainImage}
                                            setMainImage={setMainImage}
                                            productName={product.name}
                                            mainImgRef={mainImgRef}
                                            isFullscreen={isFullscreen}
                                            setIsFullscreen={setIsFullscreen}
                                            setActiveSlide={setActiveSlide}
                                        />
                                    </div>
                                </div>
                                <div className='flex-1 flex flex-col gap-4 min-w-0'>
                                    <div className='lg:sticky lg:top-28 xl:top-22'>
                                        <ProductInfo product={product} relatedProducts={relatedProducts} />
                                        <ProductQuantitySelector
                                            product={product}
                                            quantity={quantity}
                                            setQuantity={setQuantity}
                                            packaging={packaging}
                                            setPackaging={setPackaging}
                                            onAddToCart={() => addToCart(product)}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <ProductDescription product={product} color={color} />
            {isFullscreen && images && (
                <ProductImageCarousel
                    images={images}
                    isFullscreen={isFullscreen}
                    setIsFullscreen={setIsFullscreen}
                    initalSlide={mainImage ? images.indexOf(mainImage) : 0}
                    setMainImage={setMainImage}
                />
            )}
        </section>
    );
};

export default ProductPage;