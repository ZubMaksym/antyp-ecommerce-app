import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductItem } from '@/types/reducerTypes';
import { ProductItemCart } from '@/types/reducerTypes';

export interface CartSlice {
    items: Array<ProductItemCart>;
    totalQuantity: number;
    isCartOpen?: boolean;
}

const initialState: CartSlice = {
    items: [],
    totalQuantity: 0,
    isCartOpen: false
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        toggleCart: (state) => {
            state.isCartOpen = !state.isCartOpen;
        },
        addItem: (state, action: PayloadAction<ProductItemCart>) => {
            const item = action.payload;
            const existingItem = state.items.find((i) => i.id === item.id);
            if (!existingItem) {
                state.items.push(item);
                state.totalQuantity += 1;
            }
        },
        removeItem: (state, action) => {
            const itemId = action.payload.id;
            const existingItem = state.items.find((i) => i.id === itemId);
            if (existingItem) {
                state.items = state.items.filter((i) => i.id !== itemId);
                state.totalQuantity -= 1;
            }
        }
    }
});

export const { addItem, toggleCart, removeItem } = cartSlice.actions;
export default cartSlice.reducer;