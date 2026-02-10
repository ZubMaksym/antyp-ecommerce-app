import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Packaging } from '@/types/commonTypes';
import { fetchWithAuth, ApiResponse } from '@/api/fetchWithAuth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface PackagingsState {
    items: Packaging[];
    loading: boolean;
    submitting: boolean;
    error: string | null;
}

const initialState: PackagingsState = {
    items: [],
    loading: false,
    submitting: false,
    error: null,
};

type UpsertPayload = {
    name: string;
    shortName: string | null;
};

export const fetchPackagings = createAsyncThunk<Packaging[]>(
    'packagings/fetchAll',
    async () => {
        const response = await fetchWithAuth(`${API_BASE_URL}/packagings`);

        if (!response.ok) {
            throw new Error(`API Error ${response.status} ${response.statusText}`);
        }

        const data: ApiResponse<Packaging[]> = await response.json();
        return data.result || [];
    }
);

export const createPackaging = createAsyncThunk<Packaging, UpsertPayload>(
    'packagings/create',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await fetchWithAuth(`${API_BASE_URL}/api/Packaging/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = (await response.json().catch(() => ({}))) as ApiResponse | any;
                return rejectWithValue(
                    errorData?.errors?.message ||
                    errorData?.message ||
                    `API Error ${response.status} ${response.statusText}`
                );
            }

            const data: ApiResponse<Packaging> = await response.json();
            return data.result;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to create packaging');
        }
    }
);

export const updatePackaging = createAsyncThunk<
    Packaging,
    UpsertPayload & { id: string }
>(
    'packagings/update',
    async ({ id, ...payload }, { rejectWithValue }) => {
        try {
            const response = await fetchWithAuth(`${API_BASE_URL}/api/Packaging/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = (await response.json().catch(() => ({}))) as ApiResponse | any;
                return rejectWithValue(
                    errorData?.errors?.message ||
                    errorData?.message ||
                    `API Error ${response.status} ${response.statusText}`
                );
            }

            const data: ApiResponse<Packaging> = await response.json();
            return data.result;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to update packaging');
        }
    }
);

export const deletePackaging = createAsyncThunk<string, string>(
    'packagings/delete',
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetchWithAuth(`${API_BASE_URL}/api/Packaging/${id}`, {
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
            return rejectWithValue(error.message || 'Failed to delete packaging');
        }
    }
);

export const packagingsSlice = createSlice({
    name: 'packagings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch all
            .addCase(fetchPackagings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchPackagings.fulfilled,
                (state, action: PayloadAction<Packaging[]>
                ) => {
                    state.loading = false;
                    state.items = action.payload;
                }
            )
            .addCase(fetchPackagings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to load packagings';
            })

            // Create
            .addCase(createPackaging.pending, (state) => {
                state.submitting = true;
                state.error = null;
            })
            .addCase(
                createPackaging.fulfilled,
                (state, action: PayloadAction<Packaging>
                ) => {
                    state.submitting = false;
                    state.items.push(action.payload);
                }
            )
            .addCase(createPackaging.rejected, (state, action) => {
                state.submitting = false;
                state.error =
                    (action.payload as string) ||
                    action.error.message ||
                    'Failed to create packaging';
            })

            // Update
            .addCase(updatePackaging.pending, (state) => {
                state.submitting = true;
                state.error = null;
            })
            .addCase(
                updatePackaging.fulfilled,
                (state, action: PayloadAction<Packaging>
                ) => {
                    state.submitting = false;
                    const index = state.items.findIndex(
                        (item) => item.name === action.payload.name
                    );
                    if (index !== -1) {
                        state.items[index] = action.payload;
                    }
                }
            )
            .addCase(updatePackaging.rejected, (state, action) => {
                state.submitting = false;
                state.error =
                    (action.payload as string) ||
                    action.error.message ||
                    'Failed to update packaging';
            })

            // Delete
            .addCase(deletePackaging.pending, (state) => {
                state.submitting = true;
                state.error = null;
            })
            .addCase(deletePackaging.fulfilled, (state, action: PayloadAction<string>) => {
                state.submitting = false;
                state.items = state.items.filter((item) => item.name !== action.payload);
            })
            .addCase(deletePackaging.rejected, (state, action) => {
                state.submitting = false;
                state.error =
                    (action.payload as string) ||
                    action.error.message ||
                    'Failed to delete packaging';
            });
    },
});

export default packagingsSlice.reducer;
