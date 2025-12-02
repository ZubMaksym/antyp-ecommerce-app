import React from 'react';
import { render, screen } from '@testing-library/react';
import Products from '../Products';
import '@testing-library/jest-dom';

// Mock ProductCard component
jest.mock('@/components/ui/ProductCard', () => {
    return function MockProductCard({ product }: any) {
        return <div data-testid={`product-card-${product.id}`}>{product.shortName}</div>;
    };
});

const mockProducts = [
    {
        id: 1,
        shortName: 'Test Product 1',
        slug: 'test-product-1',
        mainPhotoUrl: '/test1.jpg',
        price: 100,
    },
    {
        id: 2,
        shortName: 'Test Product 2',
        slug: 'test-product-2',
        mainPhotoUrl: '/test2.jpg',
        price: 200,
    },
    {
        id: 3,
        shortName: 'Test Product 3',
        slug: 'test-product-3',
        mainPhotoUrl: '/test3.jpg',
        price: 150,
    },
];

describe('Products Component', () => {
    describe('Loading states', () => {
        it('should display loading skeleton when loading is true', () => {
            const { container } = render(
                <Products products={[]} loading={true} productsLoadedOnce={false} />
            );
            
            const skeletons = container.querySelectorAll('.animate-pulse');
            expect(skeletons.length).toBeGreaterThan(0);
        });

        it('should display multiple loading skeletons', () => {
            const { container } = render(
                <Products products={[]} loading={true} productsLoadedOnce={false} />
            );
            
            const skeletons = container.querySelectorAll('.animate-pulse');
            expect(skeletons.length).toBe(9); // productPerPage default
        });

        it('should not display loading skeleton when loading is false', () => {
            const { container } = render(
                <Products products={mockProducts} loading={false} productsLoadedOnce={true} />
            );
            
            const skeletons = container.querySelectorAll('.animate-pulse');
            expect(skeletons.length).toBe(0);
        });
    });

    describe('Products display', () => {
        it('should render products when available', () => {
            render(
                <Products products={mockProducts} loading={false} productsLoadedOnce={true} />
            );
            
            expect(screen.getByTestId('product-card-1')).toBeInTheDocument();
            expect(screen.getByTestId('product-card-2')).toBeInTheDocument();
            expect(screen.getByTestId('product-card-3')).toBeInTheDocument();
        });

        it('should render correct number of products', () => {
            render(
                <Products products={mockProducts} loading={false} productsLoadedOnce={true} />
            );
            
            const productCards = screen.getAllByTestId(/product-card-/);
            expect(productCards).toHaveLength(3);
        });

        it('should render each product with correct name', () => {
            render(
                <Products products={mockProducts} loading={false} productsLoadedOnce={true} />
            );
            
            expect(screen.getByText('Test Product 1')).toBeInTheDocument();
            expect(screen.getByText('Test Product 2')).toBeInTheDocument();
            expect(screen.getByText('Test Product 3')).toBeInTheDocument();
        });
    });

    describe('Empty states', () => {
        it('should display "No products" message when products array is empty', () => {
            render(
                <Products products={[]} loading={false} productsLoadedOnce={true} />
            );
            
            expect(screen.getByText('На жаль, товарів не знайдено :(')).toBeInTheDocument();
        });

        it('should not display products when array is empty', () => {
            render(
                <Products products={[]} loading={false} productsLoadedOnce={true} />
            );
            
            const productCards = screen.queryAllByTestId(/product-card-/);
            expect(productCards).toHaveLength(0);
        });

        it('should not show loading skeleton for empty results when not loading', () => {
            const { container } = render(
                <Products products={[]} loading={false} productsLoadedOnce={true} />
            );
            
            const skeletons = container.querySelectorAll('.animate-pulse');
            expect(skeletons.length).toBe(0);
        });
    });

    describe('Layout and styling', () => {
        it('should apply grid layout when products exist', () => {
            const { container } = render(
                <Products products={mockProducts} loading={false} productsLoadedOnce={true} />
            );
            
            const gridContainer = container.querySelector('.grid');
            expect(gridContainer).toBeInTheDocument();
        });

        it('should apply flex layout when no products', () => {
            const { container } = render(
                <Products products={[]} loading={false} productsLoadedOnce={true} />
            );
            
            const flexContainer = container.querySelector('.flex.justify-center.items-center');
            expect(flexContainer).toBeInTheDocument();
        });

        it('should have correct max-width constraint', () => {
            const { container } = render(
                <Products products={mockProducts} loading={false} productsLoadedOnce={true} />
            );
            
            const mainContainer = container.querySelector('.max-w-\\[1320px\\]');
            expect(mainContainer).toBeInTheDocument();
        });

        it('should have min-height applied', () => {
            const { container } = render(
                <Products products={mockProducts} loading={false} productsLoadedOnce={true} />
            );
            
            const mainContainer = container.querySelector('.min-h-\\[500px\\]');
            expect(mainContainer).toBeInTheDocument();
        });

        it('should have responsive grid columns', () => {
            const { container } = render(
                <Products products={mockProducts} loading={false} productsLoadedOnce={true} />
            );
            
            const gridContainer = container.querySelector('.xl\\:grid-cols-3');
            expect(gridContainer).toBeInTheDocument();
        });
    });

    describe('Props handling', () => {
        it('should handle productsLoadedOnce flag', () => {
            const { container } = render(
                <Products products={[]} loading={false} productsLoadedOnce={true} />
            );
            
            expect(screen.getByText('На жаль, товарів не знайдено :(')).toBeInTheDocument();
        });

        it('should prioritize loading state over empty products', () => {
            const { container } = render(
                <Products products={[]} loading={true} productsLoadedOnce={false} />
            );
            
            const skeletons = container.querySelectorAll('.animate-pulse');
            expect(skeletons.length).toBeGreaterThan(0);
            expect(screen.queryByText('На жаль, товарів не знайдено :(')).not.toBeInTheDocument();
        });
    });

    describe('Edge cases', () => {
        it('should handle single product', () => {
            render(
                <Products products={[mockProducts[0]]} loading={false} productsLoadedOnce={true} />
            );
            
            expect(screen.getByTestId('product-card-1')).toBeInTheDocument();
            expect(screen.getAllByTestId(/product-card-/)).toHaveLength(1);
        });

        it('should handle large number of products', () => {
            const manyProducts = Array.from({ length: 50 }, (_, i) => ({
                id: i,
                shortName: `Product ${i}`,
                slug: `product-${i}`,
                mainPhotoUrl: `/test${i}.jpg`,
                price: 100 * i,
            }));
            
            render(
                <Products products={manyProducts} loading={false} productsLoadedOnce={true} />
            );
            
            const productCards = screen.getAllByTestId(/product-card-/);
            expect(productCards).toHaveLength(50);
        });

        it('should handle products with special characters in names', () => {
            const specialProducts = [{
                id: 1,
                shortName: "O'Hara's Irish Stout",
                slug: 'oharas-irish-stout',
                mainPhotoUrl: '/test.jpg',
                price: 150,
            }];
            
            render(
                <Products products={specialProducts} loading={false} productsLoadedOnce={true} />
            );
            
            expect(screen.getByText("O'Hara's Irish Stout")).toBeInTheDocument();
        });

        it('should handle null products gracefully', () => {
            render(
                <Products products={null as any} loading={false} productsLoadedOnce={true} />
            );
            
            // Should not crash, component should handle gracefully
            expect(screen.queryByText('На жаль, товарів не знайдено :(')).not.toBeInTheDocument();
        });
    });

    describe('Loading skeleton structure', () => {
        it('should create skeleton cards with proper structure', () => {
            const { container } = render(
                <Products products={[]} loading={true} productsLoadedOnce={false} />
            );
            
            const skeletonCards = container.querySelectorAll('.animate-pulse');
            skeletonCards.forEach(skeleton => {
                expect(skeleton).toHaveClass('bg-white');
                expect(skeleton).toHaveClass('rounded-xl');
            });
        });

        it('should render correct number of skeleton placeholders', () => {
            const { container } = render(
                <Products products={[]} loading={true} productsLoadedOnce={false} />
            );
            
            const skeletons = container.querySelectorAll('.animate-pulse');
            expect(skeletons.length).toBe(9);
        });
    });

    describe('Conditional rendering logic', () => {
        it('should show products when not loading and products exist', () => {
            render(
                <Products products={mockProducts} loading={false} productsLoadedOnce={true} />
            );
            
            expect(screen.getAllByTestId(/product-card-/)).toHaveLength(3);
        });

        it('should show empty message when not loading, loaded once, and no products', () => {
            render(
                <Products products={[]} loading={false} productsLoadedOnce={true} />
            );
            
            expect(screen.getByText('На жаль, товарів не знайдено :(')).toBeInTheDocument();
        });

        it('should show loading when loading is true regardless of other props', () => {
            const { container } = render(
                <Products products={mockProducts} loading={true} productsLoadedOnce={true} />
            );
            
            const skeletons = container.querySelectorAll('.animate-pulse');
            expect(skeletons.length).toBeGreaterThan(0);
        });
    });
});