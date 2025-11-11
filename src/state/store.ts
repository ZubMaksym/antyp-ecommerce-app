import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './filterSlice/filterSlice';
import cartSlice from './cartState/cartSlice';

export const store = configureStore({
    reducer: {
        filter: filterReducer,
        cart: cartSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;