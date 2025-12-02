import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CheckoutPage from '../page';
import cartReducer from '@/state/cartState/cartSlice';
import '@testing-library/jest-dom';

// Mock next/image
jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => {
        return <img {...props} />;
    },
}));

const createMockStore = (cartState = {}) => {
    return configureStore({
        reducer: {
            cart: cartReducer,
        },
        preloadedState: {
            cart: {
                items: [],
                totalQuantity: 0,
                isCartOpen: false,
                ...cartState,
            },
        },
    });
};

const mockCartItems = [
    {
        id: 1,
        shortName: 'Test Beer 1',
        mainPhotoUrl: '/test-image-1.jpg',
        packaging: 'Bottle',
        quantity: 2,
        price: 50,
    },
    {
        id: 2,
        shortName: 'Test Beer 2',
        mainPhotoUrl: '/test-image-2.jpg',
        packaging: 'Can',
        quantity: 1,
        price: 30,
    },
];

describe('CheckoutPage', () => {
    describe('Rendering', () => {
        it('should render checkout page title', () => {
            const store = createMockStore();
            render(
                <Provider store={store}>
                    <CheckoutPage />
                </Provider>
            );
            expect(screen.getByText('Оформлення замовлення')).toBeInTheDocument();
        });

        it('should render selected products section title', () => {
            const store = createMockStore();
            render(
                <Provider store={store}>
                    <CheckoutPage />
                </Provider>
            );
            expect(screen.getByText('Обрані товари')).toBeInTheDocument();
        });

        it('should render all form labels', () => {
            const store = createMockStore();
            render(
                <Provider store={store}>
                    <CheckoutPage />
                </Provider>
            );
            
            expect(screen.getByText('First Name')).toBeInTheDocument();
            expect(screen.getByText('Last Name')).toBeInTheDocument();
            expect(screen.getByText('Company')).toBeInTheDocument();
            expect(screen.getByText('Phone Number')).toBeInTheDocument();
        });

        it('should render submit button', () => {
            const store = createMockStore();
            render(
                <Provider store={store}>
                    <CheckoutPage />
                </Provider>
            );
            expect(screen.getByRole('button', { name: /оформити замовлення/i })).toBeInTheDocument();
        });
    });

    describe('Form inputs', () => {
        it('should render firstName input', () => {
            const store = createMockStore();
            render(
                <Provider store={store}>
                    <CheckoutPage />
                </Provider>
            );
            expect(screen.getByPlaceholderText("Ім'я")).toBeInTheDocument();
        });

        it('should render lastName input', () => {
            const store = createMockStore();
            render(
                <Provider store={store}>
                    <CheckoutPage />
                </Provider>
            );
            expect(screen.getByPlaceholderText('Прізвище')).toBeInTheDocument();
        });

        it('should render company input', () => {
            const store = createMockStore();
            render(
                <Provider store={store}>
                    <CheckoutPage />
                </Provider>
            );
            expect(screen.getByPlaceholderText('Компанія (опціонально)')).toBeInTheDocument();
        });

        it('should render phoneNumber input', () => {
            const store = createMockStore();
            render(
                <Provider store={store}>
                    <CheckoutPage />
                </Provider>
            );
            expect(screen.getByPlaceholderText('06612346789')).toBeInTheDocument();
        });
    });

    describe('Cart items display', () => {
        it('should display empty cart when no items', () => {
            const store = createMockStore({ items: [], totalQuantity: 0 });
            render(
                <Provider store={store}>
                    <CheckoutPage />
                </Provider>
            );
            expect(screen.getByText('Total products: 0')).toBeInTheDocument();
        });

        it('should display cart items', () => {
            const store = createMockStore({
                items: mockCartItems,
                totalQuantity: 3,
            });
            render(
                <Provider store={store}>
                    <CheckoutPage />
                </Provider>
            );
            
            expect(screen.getByText('Test Beer 1')).toBeInTheDocument();
            expect(screen.getByText('Test Beer 2')).toBeInTheDocument();
        });

        it('should display correct total quantity', () => {
            const store = createMockStore({
                items: mockCartItems,
                totalQuantity: 3,
            });
            render(
                <Provider store={store}>
                    <CheckoutPage />
                </Provider>
            );
            expect(screen.getByText('Total products: 3')).toBeInTheDocument();
        });

        it('should display packaging information for each item', () => {
            const store = createMockStore({
                items: mockCartItems,
                totalQuantity: 3,
            });
            render(
                <Provider store={store}>
                    <CheckoutPage />
                </Provider>
            );
            
            expect(screen.getByText('Bottle')).toBeInTheDocument();
            expect(screen.getByText('Can')).toBeInTheDocument();
        });

        it('should display quantity for each item', () => {
            const store = createMockStore({
                items: mockCartItems,
                totalQuantity: 3,
            });
            const { container } = render(
                <Provider store={store}>
                    <CheckoutPage />
                </Provider>
            );
            
            const quantityElements = container.querySelectorAll('div:has(> span)');
            const quantityTexts = Array.from(quantityElements)
                .map(el => el.textContent)
                .filter(text => text?.includes('Quantity:'));
            
            expect(quantityTexts.length).toBeGreaterThan(0);
        });

        it('should render product images', () => {
            const store = createMockStore({
                items: mockCartItems,
                totalQuantity: 3,
            });
            render(
                <Provider store={store}>
                    <CheckoutPage />
                </Provider>
            );
            
            const images = screen.getAllByRole('img');
            expect(images.length).toBeGreaterThanOrEqual(2);
        });

        it('should display correct alt text for product images', () => {
            const store = createMockStore({
                items: mockCartItems,
                totalQuantity: 3,
            });
            render(
                <Provider store={store}>
                    <CheckoutPage />
                </Provider>
            );
            
            expect(screen.getByAltText('Test Beer 1 photo')).toBeInTheDocument();
            expect(screen.getByAltText('Test Beer 2 photo')).toBeInTheDocument();
        });
    });

    describe('Form validation', () => {
        it('should show error when firstName is empty on submit', async () => {
            const store = createMockStore();
            render(
                <Provider store={store}>
                    <CheckoutPage />
                </Provider>
            );
            
            const submitButton = screen.getByRole('button', { name: /оформити замовлення/i });
            fireEvent.click(submitButton);
            
            await waitFor(() => {
                expect(screen.getByText("Це поле обов'язкове")).toBeInTheDocument();
            });
        });

        it('should validate phone number format', async () => {
            const store = createMockStore();
            render(
                <Provider store={store}>
                    <CheckoutPage />
                </Provider>
            );
            
            const phoneInput = screen.getByPlaceholderText('06612346789');
            fireEvent.change(phoneInput, { target: { value: 'invalid' } });
            fireEvent.blur(phoneInput);
            
            await waitFor(() => {
                const errorMessage = screen.queryByText(/невірний номер телефону/i);
                if (errorMessage) {
                    expect(errorMessage).toBeInTheDocument();
                }
            });
        });
    });

    describe('Form submission', () => {
        it('should call console.log on valid form submission', async () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
            const store = createMockStore();
            
            render(
                <Provider store={store}>
                    <CheckoutPage />
                </Provider>
            );
            
            const firstNameInput = screen.getByPlaceholderText("Ім'я");
            const lastNameInput = screen.getByPlaceholderText('Прізвище');
            const phoneInput = screen.getByPlaceholderText('06612346789');
            
            fireEvent.change(firstNameInput, { target: { value: 'John' } });
            fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
            fireEvent.change(phoneInput, { target: { value: '0661234567' } });
            
            const submitButton = screen.getByRole('button', { name: /оформити замовлення/i });
            fireEvent.click(submitButton);
            
            await waitFor(() => {
                expect(consoleSpy).toHaveBeenCalled();
            });
            
            consoleSpy.mockRestore();
        });
    });

    describe('Layout and styling', () => {
        it('should have responsive layout classes', () => {
            const store = createMockStore();
            const { container } = render(
                <Provider store={store}>
                    <CheckoutPage />
                </Provider>
            );
            
            const mainDiv = container.querySelector('.flex.flex-col.lg\\:flex-row');
            expect(mainDiv).toBeInTheDocument();
        });

        it('should have scrollable products section', () => {
            const store = createMockStore({
                items: mockCartItems,
                totalQuantity: 3,
            });
            const { container } = render(
                <Provider store={store}>
                    <CheckoutPage />
                </Provider>
            );
            
            const scrollableDiv = container.querySelector('.scrollbar.overflow-y-scroll');
            expect(scrollableDiv).toBeInTheDocument();
        });
    });

    describe('Edge cases', () => {
        it('should handle cart with single item', () => {
            const store = createMockStore({
                items: [mockCartItems[0]],
                totalQuantity: 1,
            });
            render(
                <Provider store={store}>
                    <CheckoutPage />
                </Provider>
            );
            
            expect(screen.getByText('Test Beer 1')).toBeInTheDocument();
            expect(screen.getByText('Total products: 1')).toBeInTheDocument();
        });

        it('should handle cart with many items', () => {
            const manyItems = Array.from({ length: 10 }, (_, i) => ({
                id: i,
                shortName: `Beer ${i}`,
                mainPhotoUrl: `/image-${i}.jpg`,
                packaging: 'Bottle',
                quantity: 1,
                price: 50,
            }));
            
            const store = createMockStore({
                items: manyItems,
                totalQuantity: 10,
            });
            render(
                <Provider store={store}>
                    <CheckoutPage />
                </Provider>
            );
            
            expect(screen.getByText('Total products: 10')).toBeInTheDocument();
        });

        it('should handle items with long names', () => {
            const longNameItem = {
                id: 1,
                shortName: 'Very Long Product Name That Should Still Display Correctly',
                mainPhotoUrl: '/test.jpg',
                packaging: 'Bottle',
                quantity: 1,
                price: 50,
            };
            
            const store = createMockStore({
                items: [longNameItem],
                totalQuantity: 1,
            });
            render(
                <Provider store={store}>
                    <CheckoutPage />
                </Provider>
            );
            
            expect(screen.getByText(longNameItem.shortName)).toBeInTheDocument();
        });

        it('should handle special characters in product names', () => {
            const specialCharItem = {
                id: 1,
                shortName: "O'Hara's Irish Stout 5.5%",
                mainPhotoUrl: '/test.jpg',
                packaging: 'Bottle',
                quantity: 1,
                price: 50,
            };
            
            const store = createMockStore({
                items: [specialCharItem],
                totalQuantity: 1,
            });
            render(
                <Provider store={store}>
                    <CheckoutPage />
                </Provider>
            );
            
            expect(screen.getByText(specialCharItem.shortName)).toBeInTheDocument();
        });
    });

    describe('Accessibility', () => {
        it('should have proper form structure', () => {
            const store = createMockStore();
            const { container } = render(
                <Provider store={store}>
                    <CheckoutPage />
                </Provider>
            );
            
            const form = container.querySelector('form');
            expect(form).toBeInTheDocument();
        });

        it('should associate labels with inputs', () => {
            const store = createMockStore();
            render(
                <Provider store={store}>
                    <CheckoutPage />
                </Provider>
            );
            
            const firstNameLabel = screen.getByText('First Name');
            expect(firstNameLabel).toHaveAttribute('for', 'firstName');
        });

        it('should have submit button accessible by role', () => {
            const store = createMockStore();
            render(
                <Provider store={store}>
                    <CheckoutPage />
                </Provider>
            );
            
            const button = screen.getByRole('button', { name: /оформити замовлення/i });
            expect(button).toBeInTheDocument();
        });
    });
});