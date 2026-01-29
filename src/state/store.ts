import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './filterSlice/filterSlice';
import cartReducer from './cartState/cartSlice';
import dropdownReducer from './dropdownState/dropdownState';

export const store = configureStore({
    reducer: {
        filter: filterReducer,
        cart: cartReducer,
        dropdown: dropdownReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;