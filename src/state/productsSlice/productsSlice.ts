import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchWithAuth, ApiResponse } from '@/api/fetchWithAuth';
import { ProductItem } from '@/types/reducerTypes';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type ProductCategory = 'beer' | 'cider' | 'bottled_water' | 'soft_drink' | 'wine';

export interface Product {
    id: string;
    name: string;
    shortName: string;
    manufacturerId: string;
    description?: string | null;
    packagings: Array<{
        packagingId: string;
        multiplicity: number;
    }>;
    ingredientIds?: string[];
    multiplicity: number;
    protein: number;
    fat: number;
    carbohydrate: number;
    sugar: number;
    isBestSeller: boolean;
    bestSellerUntilUtc?: string | null;
    bestSellerRank?: number | null;
    isNew: boolean;
    newUntilUtc?: string | null;
    // Category-specific fields
    nameTranslations?: Array<{
        language: string;
        name: string;
    }>;
    // Wine specific
    wineColorId?: string;
    isSparkling?: boolean;
    wineSweetnessId?: string;
    // Beer specific
    ibu?: number;
    alcoholStrength?: number;
    originalExtract?: number;
    beerTypeId?: string;
    seasonTagIds?: string[];
    // Cider specific
    // alcoholStrength is shared with beer
    // Water specific
    carbonationLevelId?: string;
    waterTypeId?: string;
    // Soft Drink specific
    softDrinkTypeId?: string;
}

export interface ProductsState {
    submitting: boolean;
    error: string | null;
    success: string | null;
}

const initialState: ProductsState = {
    submitting: false,
    error: null,
    success: null,
};

// Base product payload type
type BaseProductPayload = {
    name: string;
    shortName: string;
    manufacturerId: string;
    description?: string | null;
    packagings: Array<{
        packagingId: string;
        multiplicity: number;
    }>;
    ingredientIds?: string[];
    multiplicity: number;
    protein: number;
    fat: number;
    carbohydrate: number;
    sugar: number;
    isBestSeller: boolean;
    bestSellerUntilUtc?: string | null;
    bestSellerRank?: number | null;
    isNew: boolean;
    newUntilUtc?: string | null;
    nameTranslations?: Array<{
        language: string;
        name: string;
    }>;
};

// Wine payload
type WineProductPayload = BaseProductPayload & {
    wineColorId: string;
    isSparkling: boolean;
    wineSweetnessId: string;
};

// Beer payload
type BeerProductPayload = BaseProductPayload & {
    ibu: number;
    alcoholStrength: number;
    originalExtract: number;
    beerTypeId: string;
    seasonTagIds?: string[];
};

// Cider payload
type CiderProductPayload = BaseProductPayload & {
    alcoholStrength: number;
};

// Water payload
type WaterProductPayload = BaseProductPayload & {
    carbonationLevelId: string;
    waterTypeId: string;
};

// Soft Drink payload
type SoftDrinkProductPayload = BaseProductPayload & {
    softDrinkTypeId: string;
};

// Union type for all product payloads
type ProductPayload = BaseProductPayload | WineProductPayload | BeerProductPayload | CiderProductPayload | WaterProductPayload | SoftDrinkProductPayload;

type CreateProductPayload = {
    category: ProductCategory;
    data: ProductPayload;
};

type UpdateProductPayload = {
    category: ProductCategory;
    id: string;
    data: ProductPayload;
};

type DeleteProductPayload = {
    category: ProductCategory;
    id: string;
};

export const createProduct = createAsyncThunk<Product, CreateProductPayload>(
    'products/create',
    async ({ category, data }, { rejectWithValue }) => {
        try {
            let validCategory: string = category;
            if (category !== 'bottled_water') {
                validCategory = category + 's';
            }
            if (validCategory.includes('_')) {
                validCategory = validCategory.replace('_', '-');
            }

            console.log('create product url', `${API_BASE_URL}/api/Products/${validCategory}/create`)

            const response = await fetchWithAuth(`${API_BASE_URL}/api/Products/${validCategory}/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = (await response.json().catch(() => ({}))) as ApiResponse | any;
                console.error('Create Product API Error Response:', errorData);
                console.error('Request URL:', `${API_BASE_URL}/api/Products/${validCategory}/create`);
                console.error('Request Payload:', JSON.stringify(data, null, 2));
                return rejectWithValue(
                    errorData?.errors?.message ||
                    errorData?.message ||
                    errorData?.title ||
                    `API Error ${response.status} ${response.statusText}`
                );
            }

            const result: ApiResponse<Product> = await response.json();
            return result.result;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to create product');
        }
    }
);

export const updateProduct = createAsyncThunk<Product, UpdateProductPayload>(
    'products/update',
    async ({ category, id, data }, { rejectWithValue }) => {
        try {
            let validCategory: string = category;
            if (category !== 'bottled_water') {
                validCategory = category + 's';
            }
            if (validCategory.includes('_')) {
                validCategory = validCategory.replace('_', '-');
            }

            const response = await fetchWithAuth(`${API_BASE_URL}/api/Products/${validCategory}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = (await response.json().catch(() => ({}))) as ApiResponse | any;
                return rejectWithValue(
                    errorData?.errors?.message ||
                    errorData?.message ||
                    `API Error ${response.status} ${response.statusText}`
                );
            }

            const result: ApiResponse<Product> = await response.json();
            return result.result;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to update product');
        }
    }
);

export const fetchProductBySlug = createAsyncThunk<ProductItem, { slug: string }>(
    'products/fetchBySlug',
    async ({ slug }, { rejectWithValue }) => {
        try {
            // Fetch product by slug as per API endpoint
            const response = await fetchWithAuth(`${API_BASE_URL}/product/${slug}`);
            
            if (!response.ok) {
                const errorData = (await response.json().catch(() => ({}))) as ApiResponse | any;
                return rejectWithValue(
                    errorData?.errors?.message ||
                    errorData?.message ||
                    `API Error ${response.status} ${response.statusText}`
                );
            }

            const result: ApiResponse<ProductItem> = await response.json();
            return result.result;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch product');
        }
    }
);

export const deleteProduct = createAsyncThunk<string, DeleteProductPayload>(
    'products/delete',
    async ({ category, id }, { rejectWithValue }) => {
        try {
            let validCategory: string = category;
            if (category !== 'bottled_water') {
                validCategory = category + 's';
            }
            if (validCategory.includes('_')) {
                validCategory = validCategory.replace('_', '-');
            }

            console.log(`${API_BASE_URL}/api/Products/${validCategory}/${id}`);

            const response = await fetchWithAuth(`${API_BASE_URL}/api/Products/${validCategory}/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = (await response.json().catch(() => ({}))) as ApiResponse | any;
                return rejectWithValue(
                    errorData?.errors?.message ||
                    errorData?.message ||
                    `API Error ${response.status} ${response.statusText}`
                );
            }

            return id;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to delete product');
        }
    }
);

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearSuccess: (state) => {
            state.success = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Create
            .addCase(createProduct.pending, (state) => {
                state.submitting = true;
                state.error = null;
                state.success = null;
            })
            .addCase(createProduct.fulfilled, (state) => {
                state.submitting = false;
                state.success = 'Product created successfully';
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.submitting = false;
                state.error =
                    (action.payload as string) ||
                    action.error.message ||
                    'Failed to create product';
                state.success = null;
            })

            // Update
            .addCase(updateProduct.pending, (state) => {
                state.submitting = true;
                state.error = null;
                state.success = null;
            })
            .addCase(updateProduct.fulfilled, (state) => {
                state.submitting = false;
                state.success = 'Product updated successfully';
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.submitting = false;
                state.error =
                    (action.payload as string) ||
                    action.error.message ||
                    'Failed to update product';
                state.success = null;
            })

            // Delete
            .addCase(deleteProduct.pending, (state) => {
                state.submitting = true;
                state.error = null;
                state.success = null;
            })
            .addCase(deleteProduct.fulfilled, (state) => {
                state.submitting = false;
                state.success = 'Product deleted successfully';
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.submitting = false;
                state.error =
                    (action.payload as string) ||
                    action.error.message ||
                    'Failed to delete product';
                state.success = null;
            });
    },
});

export const { clearError, clearSuccess } = productsSlice.actions;
export default productsSlice.reducer;
