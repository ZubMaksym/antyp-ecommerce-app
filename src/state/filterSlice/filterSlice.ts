import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { ApiResponse, Result, ApiResponseProduct, ProductItem, AlcoholStrength, IBU } from '@/types/reducerTypes';

export interface FilterSlice {
    filters: Result | null;
    loading: boolean;
    error: string | null;
    products: ProductItem[] | null;
    productsLoading: boolean;
    productsLoadedOnce: boolean;
    productsError: string | null;
    selectedManufacturers: Array<string>;
    selectedBeerTypes: Array<string>;
    selectedSeasonTags: Array<string>;
    selectedPackagings: Array<string>;
    selectedWaterTypes: Array<string>;
    selectedCarbonationLevels: Array<string>;
    selectedSoftDrinkTypes: Array<string>;
    selectedWineColors: Array<string>;
    selectedWineSweetness: Array<string>;
    selectedAlcoholStrength: AlcoholStrength;
    selectedIBU: IBU;
    minMaxAlcohol: AlcoholStrength;
    minMaxIbu: IBU;
    totalCount: number;
}

const initialState: FilterSlice = {
    filters: null,
    loading: false,
    error: null,
    products: null,
    productsLoading: false,
    productsLoadedOnce: false,
    productsError: null,
    selectedManufacturers: [],
    selectedBeerTypes: [],
    selectedSeasonTags: [],
    selectedPackagings: [],
    selectedWaterTypes: [],
    selectedCarbonationLevels: [],
    selectedSoftDrinkTypes: [],
    selectedWineColors: [],
    selectedWineSweetness: [],
    selectedAlcoholStrength: { min: 0, max: 0 },
    selectedIBU: { min: 0, max: 0 },
    minMaxAlcohol: { min: 0, max: 0 },
    minMaxIbu: { min: 0, max: 0 },
    totalCount: 0
};

export const fetchFilters = createAsyncThunk<
    Result,
    {
        category: string;
        manufacturers: string[];
        beerTypes: string[];
        seasonTags: string[];
        packagings: string[];
        waterTypes: string[];
        carbonationLevels: string[];
        softDrinkTypes: string[];
        wineColors: string[];
        wineSweetness: string[];
    }
>(
    'filter/fetchFilters',
    async (filters) => {
        const { category, ...rest } = filters;
        let url = `http://62.171.154.171:5000/product/filters-metadata?ProductType=${category}`;

        Object.entries(rest).forEach(([key, arr]) => {
            if (arr.length > 0) {
                const params = new URLSearchParams();
                (arr as string[]).forEach((v) => params.append(key[0] + key.slice(1), v));
                url += `&${params.toString()}`;
            }
        });

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`API Error ${response.status} ${response.statusText}`);
        }
        const data: ApiResponse = await response.json();
        return data.result;
    }
);

export const fetchInitialProducts = createAsyncThunk<ProductItem[], { category: string }>(
    'filter/fetchInitialProducts',
    async ({ category }) => {
        const response = await fetch(`http://62.171.154.171:5000/product?ProductType=${category}`);
        if (!response.ok) {
            throw new Error(`API error ${response.status} ${response.statusText}`);
        }
        const data: ApiResponseProduct = await response.json();
        return data.result.items;
    }
);

export const fetchProducts = createAsyncThunk<
    { items: ProductItem[], totalCount: number },
    {
        categoryName: string;
        manufacturers: string[];
        beerTypes: string[];
        seasonTags: string[];
        packagings: string[];
        waterTypes: string[];
        carbonationLevels: string[];
        softDrinkTypes: string[];
        wineColors: string[];
        wineSweetness: string[];
        alcoholStrength: AlcoholStrength;
        ibu: IBU;
        currentPage: number;
        productPerPage: number
    }
>(
    'filter/fetchProducts',
    async ({
        categoryName,
        manufacturers,
        beerTypes,
        seasonTags,
        packagings,
        waterTypes,
        carbonationLevels,
        softDrinkTypes,
        wineColors,
        wineSweetness,
        alcoholStrength,
        currentPage,
        productPerPage,
        ibu,
    }) => {
        const params = new URLSearchParams();

        manufacturers.forEach((m) => params.append('Manufacturers', m));
        packagings.forEach((p) => params.append('Packagings', p));

        if (categoryName === 'beer') {
            beerTypes.forEach((b) => params.append('BeerTypes', b));
            seasonTags.forEach((s) => params.append('SeasonTags', s));
            params.append('IbuFrom', ibu.min.toString());
            params.append('IbuTo', ibu.max.toString());
        }

        if (categoryName === 'bottled_water') {
            waterTypes.forEach((w) => params.append('WaterTypes', w));
            carbonationLevels.forEach((c) => params.append('CarbonationLevels', c));
        }

        if (categoryName === 'soft_drink') {
            softDrinkTypes.forEach((s) => params.append('SoftDrinkTypes', s));
        }

        if (categoryName === 'wine') {
            wineColors.forEach((c) => params.append('WineColors', c));
            wineSweetness.forEach((s) => params.append('WineSweetness', s));
        }

        if (categoryName === 'beer' || categoryName === 'cider') {
            params.append('AlcoholStrengthFrom', alcoholStrength.min.toString());
            params.append('AlcoholStrengthTo', alcoholStrength.max.toString());
        }

        const response = await fetch(
            `http://62.171.154.171:5000/product?Page=${currentPage}&PageSize=${productPerPage}&ProductType=${categoryName}&${params.toString()}`
        );

        if (!response.ok) {
            throw new Error(`API Error ${response.status} ${response.statusText}`);
        }

        const data: ApiResponseProduct = await response.json();
        return {
            items: data.result.items,
            totalCount: data.result.totalCount
        };
    }
);

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        toggleManufacturers: (state, action: PayloadAction<string>) => {
            const manufacturer = action.payload;

            if (state.selectedManufacturers.includes(manufacturer)) {
                state.selectedManufacturers = state.selectedManufacturers.filter((m) => m !== manufacturer);
            } else {
                state.selectedManufacturers.push(manufacturer);
            }
        },
        toggleBeerTypes: (state, action: PayloadAction<string>) => {
            const beerType = action.payload;

            if (state.selectedBeerTypes.includes(beerType)) {
                state.selectedBeerTypes = state.selectedBeerTypes.filter((b) => b !== beerType);
            } else {
                state.selectedBeerTypes.push(beerType);
            }
        },
        toggleSeasonTags: (state, action: PayloadAction<string>) => {
            const seasonTag = action.payload;

            if (state.selectedSeasonTags.includes(seasonTag)) {
                state.selectedSeasonTags = state.selectedSeasonTags.filter((s) => s !== seasonTag);
            } else {
                state.selectedSeasonTags.push(seasonTag);
            }
        },
        togglePackagings: (state, action: PayloadAction<string>) => {
            const packaging = action.payload;

            if (state.selectedPackagings.includes(packaging)) {
                state.selectedPackagings = state.selectedPackagings.filter((p) => p !== packaging);
            } else {
                state.selectedPackagings.push(packaging);
            }
        },
        toggleWaterTypes: (state, action: PayloadAction<string>) => {
            const waterType = action.payload;

            if (state.selectedWaterTypes.includes(waterType)) {
                state.selectedWaterTypes = state.selectedWaterTypes.filter((w) => w !== waterType);
            } else {
                state.selectedWaterTypes.push(waterType);
            }
        },
        toggleCarbonationLevels: (state, action: PayloadAction<string>) => {
            const carbonationLevel = action.payload;

            if (state.selectedCarbonationLevels.includes(carbonationLevel)) {
                state.selectedCarbonationLevels = state.selectedCarbonationLevels.filter((c) => c !== carbonationLevel);
            } else {
                state.selectedCarbonationLevels.push(carbonationLevel);
            }
        },
        toggleSoftDrinkTypes: (state, action: PayloadAction<string>) => {
            const softDrinkType = action.payload;

            if (state.selectedSoftDrinkTypes.includes(softDrinkType)) {
                state.selectedSoftDrinkTypes = state.selectedSoftDrinkTypes.filter((s) => s !== softDrinkType);
            } else {
                state.selectedSoftDrinkTypes.push(softDrinkType);
            }
        },
        toggleWineColor: (state, action: PayloadAction<string>) => {
            const wineColor = action.payload;

            if (state.selectedWineColors.includes(wineColor)) {
                state.selectedWineColors = state.selectedWineColors.filter((s) => s !== wineColor);
            } else {
                state.selectedWineColors.push(wineColor);
            }
        },
        toggleWineSweetness: (state, action: PayloadAction<string>) => {
            const wineSweetness = action.payload;

            if (state.selectedWineSweetness.includes(wineSweetness)) {
                state.selectedWineSweetness = state.selectedWineSweetness.filter((s) => s !== wineSweetness);
            } else {
                state.selectedWineSweetness.push(wineSweetness);
            }
        },
        resetFilters: (state) => {
            state.filters = null;
            state.selectedManufacturers = [];
            state.selectedBeerTypes = [];
            state.selectedSeasonTags = [];
            state.selectedPackagings = [];
            state.selectedWaterTypes = [];
            state.selectedCarbonationLevels = [];
            state.selectedSoftDrinkTypes = [];
            state.selectedWineColors = [];
            state.selectedWineSweetness = [];

            if (state.filters) {
                state.selectedAlcoholStrength = {
                    min: 0,
                    max: 0
                };
                state.selectedIBU = {
                    min: 0,
                    max: 0
                };
            }
        },
        resetProducts: (state) => {
            state.products = [];
            state.productsLoadedOnce = false;
        },
        setAlcoholStrengthRange: (state, action: PayloadAction<[number, number]>) => {
            state.selectedAlcoholStrength.min = action.payload[0];
            state.selectedAlcoholStrength.max = action.payload[1];
        },
        setIbuRange: (state, action: PayloadAction<[number, number]>) => {
            state.selectedIBU.min = action.payload[0];
            state.selectedIBU.max = action.payload[1];
        },
        setFiltersFromUrl: (state, action: PayloadAction<any>) => {
            Object.assign(state, action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchInitialProducts.pending, (state) => {
                state.productsLoading = true;
                state.productsError = null;
            })
            .addCase(fetchInitialProducts.fulfilled, (state, action: PayloadAction<any>) => {
                state.productsLoading = false;
                state.products = action.payload;
            })
            .addCase(fetchInitialProducts.rejected, (state, action) => {
                state.productsLoading = false;
                state.productsError = action.error.message || 'Error. Request rejected';
            })


            .addCase(fetchFilters.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFilters.fulfilled, (state, action: PayloadAction<Result>) => {
                state.loading = false;
                state.filters = action.payload;
                state.minMaxIbu = {
                    min: state.filters.ibu.min || 0,
                    max: state.filters.ibu.max || 0,
                };
                state.selectedIBU = {
                    min: state.filters?.ibu.min || 0,
                    max: state.filters?.ibu.max || 0,
                };
                state.minMaxAlcohol = {
                    min: state.filters?.alcoholStrength.min || 0,
                    max: state.filters?.alcoholStrength.max || 0,
                };
                state.selectedAlcoholStrength = {
                    min: state.filters?.alcoholStrength.min || 0,
                    max: state.filters?.alcoholStrength.max || 0,
                };
            })
            .addCase(fetchFilters.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error. Request rejected';
            })


            .addCase(fetchProducts.pending, (state) => {
                state.productsLoading = true;
                state.productsError = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<any>) => {
                state.productsLoading = false;
                state.products = action.payload.items;
                state.totalCount = action.payload.totalCount;
                state.productsLoadedOnce = true;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.productsLoading = false;
                state.productsError = action.error.message || 'Error. Request rejected';
            });
    }
});

export const
    {
        toggleManufacturers,
        toggleBeerTypes,
        toggleSeasonTags,
        togglePackagings,
        toggleWaterTypes,
        toggleCarbonationLevels,
        toggleSoftDrinkTypes,
        toggleWineColor,
        toggleWineSweetness,
        resetFilters,
        resetProducts,
        setAlcoholStrengthRange,
        setIbuRange,
        setFiltersFromUrl
    } = filterSlice.actions;

export default filterSlice.reducer;