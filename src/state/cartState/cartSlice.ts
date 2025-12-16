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
            const item = state.items.find(i => (i.id === action.payload.id && i.packaging === action.payload.packaging));
            if (item && item.quantity < 9999) item.quantity++;
        },
        decrementItemQuantity(state, action) {
            const { id, packaging, multiplicity } = action.payload;
            const item = state.items.find(i => (i.id === id && i.packaging === packaging));
            if (item && item.quantity > (multiplicity || 1)) item.quantity--;
        },
        changeItemQuantity(state, action) {
            const { id, value, packaging, multiplicity } = action.payload;
            const item = state.items.find(i => (i.id === id && i.packaging === packaging));
            if (!item) return;

            if (value < (multiplicity || 1)) item.quantity = (multiplicity || 1);
            else if (value > 9999) item.quantity = 9999;
            else item.quantity = value;
        },
        toggleCart: (state) => {
            state.isCartOpen = !state.isCartOpen;
        },
        addItem: (state, action: PayloadAction<ProductItemCart>) => {
            const item = action.payload;
            const existingItem = state.items.find((i) => (i.id === item.id && i.packaging === item.packaging));
            if (!existingItem) {
                state.items.push(item);
                state.totalQuantity += 1;
            } else{ 
                if (existingItem.quantity + item.quantity <= 9999) {
                    existingItem.quantity += item.quantity;
                } else {
                    existingItem.quantity = 9999;
                }
            }
        },
        removeItem: (state, action) => {
            const { id, packaging } = action.payload;

            state.items = state.items.filter(
                (i) => !(i.id === id && i.packaging === packaging)
            );

            state.totalQuantity -= 1;
        },
        hydrateCart(state, action) {
            return action.payload;
        }
    }
});

export const { hydrateCart, addItem, toggleCart, removeItem, incrementItemQuantity, decrementItemQuantity, changeItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;