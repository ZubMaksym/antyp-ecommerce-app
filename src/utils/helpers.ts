import { ChangeEvent } from 'react';
import { toast } from 'react-toastify';

export const scrollTo = (top: number) => {
    window.scrollTo({
        top: top,
        behavior: 'smooth'
    });
};

export const incrementQuantity = (quantity: number, handleChangeQuantity: (quantity: number) => void) => {
    if (quantity < 9999) handleChangeQuantity(quantity + 1);
};

export const decrementQuantity = (quantity: number, handleChangeQuantity: (quantity: number) => void, multiplicity: number) => {
    if (quantity > multiplicity) handleChangeQuantity(quantity - 1);
};

export const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>, handleChangeQuantity: (quantity: number) => void, multiplicity: number) => {
    const val = Number(e.target.value);
    if (val < multiplicity) {
        handleChangeQuantity(multiplicity);
    } else if (val > 9999) {
        handleChangeQuantity(9999);
    } else {
        handleChangeQuantity(val);
    }
};

export const notify = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    toast[type](message, {
        position: 'bottom-right',
    });
};

/**
 * Adds cache-busting query parameter to image URL
 * @param imageUrl - The image URL to add cache-busting to
 * @param cacheVersion - The cache version number (timestamp)
 * @returns The image URL with cache-busting parameter
 */
export const getImageUrlWithCacheBust = (imageUrl: string | null | undefined, cacheVersion: number): string => {
    if (!imageUrl) return '';
    try {
        // If URL is already absolute, use it directly
        if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
            const url = new URL(imageUrl);
            url.searchParams.set('v', cacheVersion.toString());
            return url.toString();
        }
        // For relative URLs, construct full URL
        const url = new URL(imageUrl, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
        url.searchParams.set('v', cacheVersion.toString());
        return url.toString();
    } catch (error) {
        // Fallback: append query parameter manually
        const separator = imageUrl.includes('?') ? '&' : '?';
        return `${imageUrl}${separator}v=${cacheVersion}`;
    }
};