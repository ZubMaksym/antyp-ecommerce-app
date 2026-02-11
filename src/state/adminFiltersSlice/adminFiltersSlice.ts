import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterItem, FilterTypeId } from '@/types/commonTypes';
import { fetchWithAuth, ApiResponse } from '@/api/fetchWithAuth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface AdminFiltersState {
    items: FilterItem[];
    loading: boolean;
    submitting: boolean;
    error: string | null;
    currentFilterType: FilterTypeId | null;
    success: string | null;
}

const initialState: AdminFiltersState = {
    items: [],
    loading: false,
    submitting: false,
    error: null,
    currentFilterType: null,
    success: null,
};

type CreateFilterPayload = {
    filterType: FilterTypeId;
    name: string;
};

type UpdateFilterPayload = {
    filterType: FilterTypeId;
    id: number;
    name: string;
};

type DeleteFilterPayload = {
    filterType: FilterTypeId;
    id: number;
};

export const fetchFilters = createAsyncThunk<
    FilterItem[],
    FilterTypeId
>(
    'adminFilters/fetchAll',
    async (filterType) => {
        const response = await fetchWithAuth(`${API_BASE_URL}/attributes/${filterType}`);

        if (!response.ok) {
            throw new Error(`API Error ${response.status} ${response.statusText}`);
        }

        const data: ApiResponse<FilterItem[]> = await response.json();
        return data.result || [];
    }
);

export const createFilter = createAsyncThunk<
    FilterItem,
    CreateFilterPayload
>(
    'adminFilters/create',
    async ({ filterType, name }, { rejectWithValue }) => {
        try {
            const response = await fetchWithAuth(`${API_BASE_URL}/api/attributes/${filterType}/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name.trim()
                }),
            });

            if (!response.ok) {
                const errorData = (await response.json().catch(() => ({}))) as ApiResponse | any;
                return rejectWithValue(
                    errorData?.errors?.message ||
                    errorData?.message ||
                    `API Error ${response.status} ${response.statusText}`
                );
            }

            const data: ApiResponse<FilterItem> = await response.json();
            return data.result;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to create filter');
        }
    }
);

export const updateFilter = createAsyncThunk<
    FilterItem,
    UpdateFilterPayload
>(
    'adminFilters/update',
    async ({ filterType, id, name }, { rejectWithValue }) => {
        try {
            const response = await fetchWithAuth(`${API_BASE_URL}/api/attributes/${filterType}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name.trim()
                }),
            });

            if (!response.ok) {
                const errorData = (await response.json().catch(() => ({}))) as ApiResponse | any;
                return rejectWithValue(
                    errorData?.errors?.message ||
                    errorData?.message ||
                    `API Error ${response.status} ${response.statusText}`
                );
            }

            const data: ApiResponse<FilterItem> = await response.json();
            return data.result;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to update filter');
        }
    }
);

export const deleteFilter = createAsyncThunk<
    number,
    DeleteFilterPayload
>(
    'adminFilters/delete',
    async ({ filterType, id }, { rejectWithValue }) => {
        try {
            const response = await fetchWithAuth(`${API_BASE_URL}/api/attributes/${filterType}/${id}`, {
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
            return rejectWithValue(error.message || 'Failed to delete filter');
        }
    }
);

export const adminFiltersSlice = createSlice({
    name: 'adminFilters',
    initialState,
    reducers: {
        setCurrentFilterType: (state, action: PayloadAction<FilterTypeId | null>) => {
            state.currentFilterType = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch all
            .addCase(fetchFilters.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchFilters.fulfilled,
                (state, action: PayloadAction<FilterItem[]>) => {
                    state.loading = false;
                    state.items = action.payload;
                }
            )
            .addCase(fetchFilters.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to load filters';
            })

            // Create
            .addCase(createFilter.pending, (state) => {
                state.submitting = true;
                state.error = null;
                state.success = null;
            })
            .addCase(
                createFilter.fulfilled,
                (state, action: PayloadAction<FilterItem>) => {
                    state.submitting = false;
                    state.items.push(action.payload);
                    state.success = 'Filter created successfully';
                }
            )
            .addCase(createFilter.rejected, (state, action) => {
                state.submitting = false;
                state.error =
                    (action.payload as string) ||
                    action.error.message ||
                    'Failed to create filter';
                state.success = null;
            })

            // Update
            .addCase(updateFilter.pending, (state) => {
                state.submitting = true;
                state.error = null;
                state.success = null;
            })
            .addCase(
                updateFilter.fulfilled,
                (state, action: PayloadAction<FilterItem>) => {
                    state.submitting = false;
                    const index = state.items.findIndex(
                        (item) => item.id === action.payload.id
                    );
                    if (index !== -1) {
                        state.items[index] = action.payload;
                    }
                    state.success = 'Filter updated successfully';
                }
            )
            .addCase(updateFilter.rejected, (state, action) => {
                state.submitting = false;
                state.error =
                    (action.payload as string) ||
                    action.error.message ||
                    'Failed to update filter';
                state.success = null;
            })

            // Delete
            .addCase(deleteFilter.pending, (state) => {
                state.submitting = true;
                state.error = null;
                state.success = null;
            })
            .addCase(deleteFilter.fulfilled, (state, action: PayloadAction<number>) => {
                state.submitting = false;
                state.items = state.items.filter((item) => item.id !== action.payload);
                state.success = 'Filter deleted successfully';
            })
            .addCase(deleteFilter.rejected, (state, action) => {
                state.submitting = false;
                state.error =
                    (action.payload as string) ||
                    action.error.message ||
                    'Failed to delete filter';
                state.success = null;
            });
    },
});

export const { setCurrentFilterType, clearError } = adminFiltersSlice.actions;
export default adminFiltersSlice.reducer;
