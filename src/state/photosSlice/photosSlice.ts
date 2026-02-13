import { createAsyncThunk, createSlice, isRejectedWithValue, PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse, fetchWithAuth } from "@/api/fetchWithAuth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface PhotosSlice {
    photos: Array<string>;
    // loading: boolean;
    uploadLoading: boolean;
    deleteLoading: boolean;
    loading: boolean;
    error: string | null;
    success: string | null;
    imageCacheVersion: number;
}

const initialState: PhotosSlice = {
    photos: [],
    uploadLoading: false,   
    deleteLoading: false,
    loading: false,
    error: null,
    success: null,
    imageCacheVersion: 0,
}

export const uploadPhotos = createAsyncThunk<
  string[],
  { id: string; files: File[] }
>(
  'photos/uploadPhotos',
  async ({ id, files }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      files.forEach(file => {
        formData.append('Files', file); // 👈 саме Files!
      });

      const response = await fetchWithAuth(
        `${API_BASE_URL}/api/Products/${id}/photos`,
        {
          method: 'POST',
          body: formData, // 👈 НЕ JSON
        }
      );

      if (!response.ok) {
        return rejectWithValue('Failed to upload photos');
      }

      const data: ApiResponse = await response.json();
      return data.result;

    } catch (error) {
      return rejectWithValue('Failed to upload photos');
    }
  }
);

export const deletePhotos = createAsyncThunk<void, { id: string }>(
    'photos/deletePhotos',
    async ({id}, {rejectWithValue}) => {
        try {
            const response = await fetchWithAuth(
                `${API_BASE_URL}/api/Products/${id}/photo`,
                {
                    method: 'DELETE',
                    headers: {
                        'accept': '*/*',
                    }
                }
            )

            if (!response.ok) {
                return rejectWithValue('Failed to delete photos');
            }

            return;
        } catch (error) {
            console.error('Error deleting photos:', error);
            return rejectWithValue('Failed to delete photos');
        }
    }
)

export const photosSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(uploadPhotos.pending, (state: PhotosSlice) => {
                state.loading = true;
                state.uploadLoading = true;
                state.error = null;
                state.success = null;
            })
            .addCase(uploadPhotos.fulfilled, (state: PhotosSlice, action: PayloadAction<Array<string>>) => {
                state.loading = false;
                state.photos = action.payload;
                state.uploadLoading = false;
                state.success = 'Photos uploaded successfully';
                state.imageCacheVersion = Date.now(); // Update cache version to bust image cache
            })
            .addCase(uploadPhotos.rejected, (state: PhotosSlice, action) => {
                state.loading = false;
                state.error = (action.payload as string) || 'Failed to upload photos';
                state.uploadLoading = false;
                state.success = null;
            })

            .addCase(deletePhotos.pending, (state: PhotosSlice) => {
                state.loading = true;
                state.deleteLoading = true;
                state.error = null;
                state.success = null;
            })
            .addCase(deletePhotos.fulfilled, (state: PhotosSlice) => {
                state.loading = false;
                state.photos = [];
                state.deleteLoading = false;
                state.success = 'Photos deleted successfully';
                state.imageCacheVersion = Date.now(); // Update cache version to bust image cache
            })
            .addCase(deletePhotos.rejected, (state: PhotosSlice, action) => {
                state.loading = false;
                state.deleteLoading = false;
                state.error = (action.payload as string) || 'Failed to delete photos';
                state.success = null;
            })
    },
});

export default photosSlice.reducer;