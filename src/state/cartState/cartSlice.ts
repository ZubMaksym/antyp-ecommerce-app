import { createSlice } from '@reduxjs/toolkit';
import { ProductItem } from '@/types/reducerTypes';

export interface CartSlice {
    items: Array<ProductItem>;
    totalQuantity: number;
}

const initialState: CartSlice = {
    items: [],
    totalQuantity: 0
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const item = action.payload;
            const existingItem = state.items.find((i) => i.id === item.id);
            if (!existingItem) {
                state.items.push(item);
                state.totalQuantity += 1;
            }
        }
    }
});

export const { addItem } = cartSlice.actions;
export default cartSlice.reducer;