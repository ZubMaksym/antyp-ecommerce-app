'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { hydrateCart } from '@/state/cartState/cartSlice';

export default function CartHydrator() {
    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.cart);

    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('cart');

        if (saved) {
            dispatch(hydrateCart(JSON.parse(saved)));
        }

        setIsHydrated(true);
    }, []);

    useEffect(() => {
        if (isHydrated) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart, isHydrated]);

    return null;
}