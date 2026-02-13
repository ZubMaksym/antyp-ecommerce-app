import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './filterSlice/filterSlice';
import cartReducer from './cartState/cartSlice';
import dropdownReducer from './dropdownState/dropdownState';
import manufacturersReducer from './manufacturersSlice/manufacturersSlice';
import packagingsReducer from './packagingsSlice/packagingsSlice';
import adminFiltersReducer from './adminFiltersSlice/adminFiltersSlice';
import productsReducer from './productsSlice/productsSlice';
import photosReducer from './photosSlice/photosSlice';

export const store = configureStore({
    reducer: {
        filter: filterReducer,
        cart: cartReducer,
        dropdown: dropdownReducer,
        manufacturers: manufacturersReducer,
        packagings: packagingsReducer,
        adminFilters: adminFiltersReducer,
        products: productsReducer,
        photos: photosReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;