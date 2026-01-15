'use client';
import { Provider } from 'react-redux';
import { store } from '@/state/store';
import CartHydrator from '../cart/CartHydrator';
import FilterHydrator from '../filtersPage/FilterHydrator';

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