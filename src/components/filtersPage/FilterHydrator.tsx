'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import { RootState } from '@/state/store';
import { saveFiltersToStorage } from '@/state/filterSlice/filterSlice';

export default function FilterHydrator() {
    const filterState = useSelector((state: RootState) => state.filter);
    const pathname = usePathname();
    const categoryName = pathname?.split('/').pop() || null;
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        // Mark as hydrated after initial render
        setIsHydrated(true);
    }, []);

    useEffect(() => {
        // Only save to localStorage after initial hydration and if we're on a filter page
        if (isHydrated && categoryName && pathname?.includes('/product/filters/')) {
            // Check stored category to prevent saving old filters with new category
            let storedCategory = null;
            if (typeof window !== 'undefined') {
                try {
                    const saved = localStorage.getItem('filters');
                    if (saved) {
                        const parsed = JSON.parse(saved);
                        storedCategory = parsed.category || null;
                    }
                } catch (error) {
                    console.error('Error reading localStorage:', error);
                }
            }

            // If stored category doesn't match current category, clear localStorage first
            // This prevents saving old filters when category changes
            if (storedCategory !== null && storedCategory !== categoryName) {
                localStorage.removeItem('filters');
                storedCategory = null;
                // Don't save anything if category mismatch - filters are being reset
                return;
            }

            // Check if there are any selected filters before saving
            const hasSelectedFilters = 
                filterState.selectedManufacturers.length > 0 ||
                filterState.selectedBeerTypes.length > 0 ||
                filterState.selectedSeasonTags.length > 0 ||
                filterState.selectedPackagings.length > 0 ||
                filterState.selectedWaterTypes.length > 0 ||
                filterState.selectedCarbonationLevels.length > 0 ||
                filterState.selectedSoftDrinkTypes.length > 0 ||
                filterState.selectedWineColors.length > 0 ||
                filterState.selectedWineSweetness.length > 0 ||
                (filterState.selectedAlcoholStrength.min !== 0 || filterState.selectedAlcoholStrength.max !== 0) ||
                (filterState.selectedIBU.min !== 0 || filterState.selectedIBU.max !== 0);

            // Only save if there are actually selected filters AND stored category matches (or is null)
            if (hasSelectedFilters && (storedCategory === categoryName || storedCategory === null)) {
                saveFiltersToStorage({
                    selectedManufacturers: filterState.selectedManufacturers,
                    selectedBeerTypes: filterState.selectedBeerTypes,
                    selectedSeasonTags: filterState.selectedSeasonTags,
                    selectedPackagings: filterState.selectedPackagings,
                    selectedWaterTypes: filterState.selectedWaterTypes,
                    selectedCarbonationLevels: filterState.selectedCarbonationLevels,
                    selectedSoftDrinkTypes: filterState.selectedSoftDrinkTypes,
                    selectedWineColors: filterState.selectedWineColors,
                    selectedWineSweetness: filterState.selectedWineSweetness,
                    selectedAlcoholStrength: filterState.selectedAlcoholStrength,
                    selectedIBU: filterState.selectedIBU,
                }, categoryName);
            } else if (!hasSelectedFilters && storedCategory === categoryName) {
                // If no filters are selected and we had filters for this category, clear localStorage
                localStorage.removeItem('filters');
            }
        }
    }, [
        isHydrated,
        categoryName,
        pathname,
        filterState.selectedManufacturers,
        filterState.selectedBeerTypes,
        filterState.selectedSeasonTags,
        filterState.selectedPackagings,
        filterState.selectedWaterTypes,
        filterState.selectedCarbonationLevels,
        filterState.selectedSoftDrinkTypes,
        filterState.selectedWineColors,
        filterState.selectedWineSweetness,
        filterState.selectedAlcoholStrength,
        filterState.selectedIBU,
    ]);

    return null;
}
