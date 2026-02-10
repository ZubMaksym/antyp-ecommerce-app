import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Manufacturer } from '@/types/commonTypes';
import { fetchWithAuth, ApiResponse } from '@/api/fetchWithAuth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface ManufacturersState {
    items: Manufacturer[];
    loading: boolean;
    submitting: boolean;
    error: string | null;
}

const initialState: ManufacturersState = {
    items: [],
    loading: false,
    submitting: false,
    error: null,
};

type UpsertPayload = {
    name: string;
    shortName: string;
    aboutUrl: string | null;
};

export const fetchManufacturers = createAsyncThunk<Manufacturer[]>(
    'manufacturers/fetchAll',
    async () => {
        const response = await fetchWithAuth(`${API_BASE_URL}/manufacturers`);

        if (!response.ok) {
            throw new Error(`API Error ${response.status} ${response.statusText}`);
        }

        const data: ApiResponse<Manufacturer[]> = await response.json();
        return data.result || [];
    }
);

export const createManufacturer = createAsyncThunk<Manufacturer, UpsertPayload>(
    'manufacturers/create',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await fetchWithAuth(`${API_BASE_URL}/api/Manufacturer`, {
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

            const data: ApiResponse<Manufacturer> = await response.json();
            return data.result;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to create manufacturer');
        }
    }
);

export const updateManufacturer = createAsyncThunk<
    Manufacturer,
    UpsertPayload & { id: string }
>(
    'manufacturers/update',
    async ({ id, ...payload }, { rejectWithValue }) => {
        try {
            const response = await fetchWithAuth(`${API_BASE_URL}/api/Manufacturer/${id}`, {
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

            const data: ApiResponse<Manufacturer> = await response.json();
            return data.result;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to update manufacturer');
        }
    }
);

export const deleteManufacturer = createAsyncThunk<string, string>(
    'manufacturers/delete',
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetchWithAuth(`${API_BASE_URL}/api/Manufacturer/${id}`, {
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
            return rejectWithValue(error.message || 'Failed to delete manufacturer');
        }
    }
);

export const manufacturersSlice = createSlice({
    name: 'manufacturers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch all
            .addCase(fetchManufacturers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchManufacturers.fulfilled,
                (state, action: PayloadAction<Manufacturer[]>
                ) => {
                    state.loading = false;
                    state.items = action.payload;
                }
            )
            .addCase(fetchManufacturers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to load manufacturers';
            })

            // Create
            .addCase(createManufacturer.pending, (state) => {
                state.submitting = true;
                state.error = null;
            })
            .addCase(
                createManufacturer.fulfilled,
                (state, action: PayloadAction<Manufacturer>
                ) => {
                    state.submitting = false;
                    state.items.push(action.payload);
                }
            )
            .addCase(createManufacturer.rejected, (state, action) => {
                state.submitting = false;
                state.error =
                    (action.payload as string) ||
                    action.error.message ||
                    'Failed to create manufacturer';
            })

            // Update
            .addCase(updateManufacturer.pending, (state) => {
                state.submitting = true;
                state.error = null;
            })
            .addCase(
                updateManufacturer.fulfilled,
                (state, action: PayloadAction<Manufacturer>
                ) => {
                    state.submitting = false;
                    const index = state.items.findIndex(
                        (item) => item.id === action.payload.id
                    );
                    if (index !== -1) {
                        state.items[index] = action.payload;
                    }
                }
            )
            .addCase(updateManufacturer.rejected, (state, action) => {
                state.submitting = false;
                state.error =
                    (action.payload as string) ||
                    action.error.message ||
                    'Failed to update manufacturer';
            })

            // Delete
            .addCase(deleteManufacturer.pending, (state) => {
                state.submitting = true;
                state.error = null;
            })
            .addCase(deleteManufacturer.fulfilled, (state, action: PayloadAction<string>) => {
                state.submitting = false;
                state.items = state.items.filter((item) => item.id !== action.payload);
            })
            .addCase(deleteManufacturer.rejected, (state, action) => {
                state.submitting = false;
                state.error =
                    (action.payload as string) ||
                    action.error.message ||
                    'Failed to delete manufacturer';
            });
    },
});

export default manufacturersSlice.reducer;

