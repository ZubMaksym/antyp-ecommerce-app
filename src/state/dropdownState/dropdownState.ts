import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DropdownState {
    dropdowns: Record<string, boolean>;
}

// Load initial state from localStorage if available
const loadInitialState = (): DropdownState => {
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('adminDropdownState');
        if (stored) {
            try {
                return { dropdowns: JSON.parse(stored) };
            } catch {
                // Failed to parse, return default state
            }
        }
    }
    return { dropdowns: {} };
};

const initialState: DropdownState = loadInitialState();

const dropdownSlice = createSlice({
    name: 'dropdown',
    initialState,
    reducers: {
        toggleDropdown: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            state.dropdowns[id] = !state.dropdowns[id];

            // Persist to localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem('adminDropdownState', JSON.stringify(state.dropdowns));
            }
        },
        setDropdown: (state, action: PayloadAction<{ id: string; isOpen: boolean }>) => {
            const { id, isOpen } = action.payload;
            state.dropdowns[id] = isOpen;

            // Persist to localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem('adminDropdownState', JSON.stringify(state.dropdowns));
            }
        }
    }
});

export const { toggleDropdown, setDropdown } = dropdownSlice.actions;
export default dropdownSlice.reducer;