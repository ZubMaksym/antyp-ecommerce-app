import { SetStateAction, ChangeEvent, Dispatch } from 'react';

export const scrollTo = (top: number) => {
    window.scrollTo({
        top: top,
        behavior: 'smooth'
    });
};

export const incrementQuantity = (quantity: number, handleChangeQuantity: (quantity: number) => void) => {
    if (quantity < 9999) handleChangeQuantity(quantity + 1);
};

export const decrementQuantity = (quantity: number, handleChangeQuantity: (quantity: number) => void, multiplicity: number) => {
    if (quantity > multiplicity) handleChangeQuantity(quantity - 1);
};

export const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>, handleChangeQuantity: (quantity: number) => void, multiplicity: number) => {
    const val = Number(e.target.value);
    if (val < multiplicity) {
        handleChangeQuantity(multiplicity);
    } else if (val > 9999) {
        handleChangeQuantity(9999);
    } else {
        handleChangeQuantity(val);
    }
};
