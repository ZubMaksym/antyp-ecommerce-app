'use client';
import { useEffect, useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { fetchProductBySlug } from '@/state/productsSlice/productsSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/state/store';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { ProductItem } from '@/types/reducerTypes';
import ProductImagePlaceholder from '@/public/product_image_placeholder.webp';
import Image from 'next/image';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import AdminActionButton from '@/components/admin/AdminActionButton';
import { Trash2 } from 'lucide-react';

const PhotosPage = () => {
    const [currentFiles, setCurrentFiles] = useState<FileWithPath[]>([]);
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
        },
        maxFiles: 10,
        maxSize: 10 * 1024 * 1024,
        onDrop(files: FileWithPath[]): void {
            setCurrentFiles(prev => [...prev, ...files])
        }
    });

    const dispatch = useDispatch<AppDispatch>();
    const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
    const [isLoadingProduct, setIsLoadingProduct] = useState(true);

    useEffect(() => {
        const selectedProductSlug = localStorage.getItem('selectedProductSlug');
        if (selectedProductSlug) {
            setIsLoadingProduct(true);
            dispatch(fetchProductBySlug({ slug: selectedProductSlug as string }))
                .unwrap()
                .then((product) => {
                    setSelectedProduct(product);
                    setIsLoadingProduct(false);
                })
                .catch((error) => {
                    console.error('error', error);
                    setIsLoadingProduct(false);
                });
        } else {
            setIsLoadingProduct(false);
        }
    }, [dispatch]);

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    return (
        <section className='flex px-5 py-5 flex-col'>
            <h1 className='text-[42px] font-bold text-[#4d6d7e]'>
                Photos
            </h1>
            
            {isLoadingProduct ? (
                <div className='mt-5 flex justify-center items-center border border-gray-300 rounded-md p-4 h-[550px]'>
                    <LoadingSpinner message='Loading product...' height='' />
                </div>
            ) : selectedProduct ? (
                <div className='mt-5 flex flex-col gap-5'>
                    {/* Product Info Card */}
                    <div className='flex items-center justify-between border border-gray-300 rounded-md p-4 bg-[#F6EFE7]'>
                        <div className='flex items-center'>
                            <Image
                                src={selectedProduct.mainPhotoUrl || ProductImagePlaceholder}
                                alt={selectedProduct.name}
                                width={110}
                                height={110}
                                className='bg-white rounded-md p-2 shadow-sm'
                            />
                            <div className='ml-5'>
                                <h2 className='text-[#4d6d7e] font-medium text-[18px] mb-1'>
                                    {selectedProduct.name}
                                </h2>
                                {selectedProduct.shortName && (
                                    <p className='text-[#4d6d7e] text-sm opacity-75'>
                                        {selectedProduct.shortName}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <AdminActionButton 
                                action='delete' 
                                title='Delete photos'
                            />
                        </div>
                    </div>

                    {/* Upload Section */}
                    <div className='flex flex-col gap-5'>
                        <div 
                            {...getRootProps({
                                className: 'dropzone border-2 border-[#EEEEEE] border-dashed bg-[#FAFAFA] w-full min-h-[250px] flex flex-col justify-center items-center hover:border-[#4d6d7e] transition-all duration-300 ease-in-out cursor-pointer rounded-md p-6'
                            })}
                        >
                            <input {...getInputProps()} />
                            <div className='text-center'>
                                <svg 
                                    className='mx-auto w-16 h-16 text-[#4d6d7e] opacity-50 mb-4' 
                                    fill='none' 
                                    stroke='currentColor' 
                                    viewBox='0 0 24 24'
                                >
                                    <path 
                                        strokeLinecap='round' 
                                        strokeLinejoin='round' 
                                        strokeWidth={2} 
                                        d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12' 
                                    />
                                </svg>
                                <p className='text-[#4d6d7e] text-center font-bold text-lg mb-2'>
                                    Drag and drop images here, or click to select files
                                </p>
                                <p className='text-[#4d6d7e] text-center text-sm opacity-75'>
                                    Accepted formats: PNG, JPG, JPEG, WEBP (Max 10MB per file, up to 10 files)
                                </p>
                            </div>
                        </div>

                        {/* Selected Files Preview */}
                        {currentFiles.length > 0 && (
                            <div className='border border-gray-300 rounded-md p-4 bg-white'>
                                <div className='flex items-center justify-between mb-3'>
                                    <h3 className='text-[#4d6d7e] font-semibold text-lg mb-3'>
                                        Selected Files ({currentFiles.length})
                                    </h3>
                                    <AdminActionButton 
                                        action='create' 
                                        title='Upload photos'
                                        disabled={acceptedFiles.length === 0}
                                    />
                                </div>
                                <div className='flex flex-col gap-2 max-h-[300px] overflow-y-auto scrollbar'>
                                    {currentFiles.map((file) => (
                                        <div 
                                            key={file.path}
                                            className='flex items-center justify-between p-3 bg-[#FAFAFA] rounded-md hover:bg-[#E8DFD5] transition-colors'
                                        >
                                            <div className='flex items-center gap-3 flex-1 min-w-0'>
                                                <svg 
                                                    className='w-8 h-8 text-[#4d6d7e] flex-shrink-0' 
                                                    fill='none' 
                                                    stroke='currentColor' 
                                                    viewBox='0 0 24 24'
                                                >
                                                    <path 
                                                        strokeLinecap='round' 
                                                        strokeLinejoin='round' 
                                                        strokeWidth={2} 
                                                        d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' 
                                                    />
                                                </svg>
                                                <div className='flex-1 min-w-0'>
                                                    <p className='text-[#4d6d7e] font-medium text-sm truncate'>
                                                        {file.name}
                                                    </p>
                                                    <p className='text-[#4d6d7e] text-xs opacity-75'>
                                                        {formatFileSize(file.size)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className=''>
                                                <Trash2 
                                                    className='w-6 h-6 text-[#4d6d7e] cursor-pointer' 
                                                    onClick={() => setCurrentFiles(currentFiles.filter((f) => f.path !== file.path))}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className='mt-5 flex justify-center items-center border border-gray-300 rounded-md p-4 h-[550px]'>
                    <div className='text-center'>
                        <p className='text-[#4d6d7e] text-[18px] font-bold mb-2'>
                            No product selected
                        </p>
                        <p className='text-[#4d6d7e] text-sm opacity-75'>
                            Please select a product from the products page to upload photos.
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
}

export default PhotosPage;