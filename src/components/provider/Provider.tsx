'use client';
import { Provider } from 'react-redux';
import { store } from '@/state/store';
import CartHydrator from '@/components/cart/CartHydrator';
import FilterHydrator from '@/components/filters/FilterHydrator';

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <CartHydrator />
            <FilterHydrator />
            {children}
        </Provider>
    );
};

export default Providers;