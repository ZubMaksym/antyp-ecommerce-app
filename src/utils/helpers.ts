import { SetStateAction, ChangeEvent, Dispatch } from 'react';

export const scrollTo = (top: number) => {
    window.scrollTo({
        top: top,
        behavior: 'smooth'
    });
};

export const incrementQuantity = (quantity: number, handleChangeQuantity: Dispatch<SetStateAction<number>>) => {
    if (quantity < 9999) handleChangeQuantity(quantity + 1);
};

export const decrementQuantity = (quantity: number, handleChangeQuantity: Dispatch<SetStateAction<number>>) => {
    if (quantity > 1) handleChangeQuantity(quantity - 1);
};

export const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>, handleChangeQuantity: Dispatch<SetStateAction<number>>) => {
    const val = Number(e.target.value);
    if (val < 1) {
        handleChangeQuantity(1);
    } else if (val > 9999) {
        handleChangeQuantity(9999);
    } else {
        handleChangeQuantity(val);
    }
};