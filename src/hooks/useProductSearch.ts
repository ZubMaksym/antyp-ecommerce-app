import { useState, useEffect } from 'react';
import { ProductItem } from '@/types/reducerTypes';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const useProductSearch = (searchQuery: string, additionalParams: string = '') => {
    const [searchResults, setSearchResults] = useState<ProductItem[] | null>(null);
    const [isSearching, setIsSearching] = useState(false);
    const [searchError, setSearchError] = useState<string | null>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const fetchProductByName = async () => {
                if (!searchQuery.trim()) {
                    setSearchResults(null);
                    setIsSearching(false);
                    setSearchError(null);
                    return;
                }

                setIsSearching(true);
                setSearchError(null);

                try {
                    console.log(`${API_BASE_URL}/product?${additionalParams}Name=${searchQuery}`);
                    const res = await fetch(`${API_BASE_URL}/product?${additionalParams}Name=${searchQuery}`);
                    if (!res.ok) throw new Error('Error searching');
                    const data = await res.json();
                    if (data.result.items.length > 0) {
                        setSearchResults(data.result.items);
                    } else {
                        setSearchResults([]);
                    }
                } catch (error) {
                    setSearchError(error instanceof Error ? error.message : 'Error searching');
                    setSearchResults(null);
                } finally {
                    setIsSearching(false);
                }
            };
            fetchProductByName();
        }, 300);

        return () => clearTimeout(timeout);
    }, [searchQuery]);

    return { searchResults, isSearching, searchError };
};
