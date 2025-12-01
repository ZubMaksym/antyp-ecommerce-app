'use client';
import { Provider } from 'react-redux';
import { store } from '@/state/store';
import CartHydrator from '../cart/CartHydrator';

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <CartHydrator />
            {children}
        </Provider>
    );
};

export default Providers;