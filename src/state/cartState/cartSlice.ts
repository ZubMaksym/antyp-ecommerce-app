import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
        incrementItemQuantity(state, action) {
            const item = state.items.find(i => i.id === action.payload);
            if (item && item.quantity < 9999) item.quantity++;
        },
        decrementItemQuantity(state, action) {
            const item = state.items.find(i => i.id === action.payload);
            if (item && item.quantity > 1) item.quantity--;
        },
        changeItemQuantity(state, action) {
            const { id, value } = action.payload;
            const item = state.items.find(i => i.id === id);
            if (!item) return;

            if (value < 1) item.quantity = 1;
            else if (value > 9999) item.quantity = 9999;
            else item.quantity = value;
        },
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

export const { addItem, toggleCart, removeItem, incrementItemQuantity, decrementItemQuantity, changeItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;