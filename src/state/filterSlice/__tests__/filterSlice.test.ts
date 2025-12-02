import filterReducer, {
    fetchFilters,
    fetchInitialProducts,
    fetchProducts,
    setActiveManufacturers,
    setActiveVolume,
    setActivePercentage,
    setActivePackaging,
    resetFilters,
    resetProducts,
    setProductsLoadedOnce,
    incrementPage,
    setCurrentPage,
    FilterState,
} from '../filterSlice';
import { configureStore } from '@reduxjs/toolkit';

// Mock fetch globally
global.fetch = jest.fn();

describe('filterSlice', () => {
    let initialState: FilterState;

    beforeEach(() => {
        initialState = {
            filters: {
                manufacturers: [],
                volume: [],
                percentage: [],
                packaging: [],
            },
            activeFilters: {
                activeManufacturers: [],
                activeVolume: [],
                activePercentage: [],
                activePackaging: [],
            },
            products: [],
            totalPages: 0,
            totalProducts: 0,
            currentPage: 1,
            productPerPage: 9,
            filtersLoading: false,
            filtersError: null,
            productsLoading: false,
            productsError: null,
            productsLoadedOnce: false,
        };
        jest.clearAllMocks();
    });

    describe('Initial state', () => {
        it('should return the initial state', () => {
            expect(filterReducer(undefined, { type: 'unknown' })).toEqual(initialState);
        });

        it('should have empty filters by default', () => {
            const state = filterReducer(undefined, { type: 'unknown' });
            expect(state.filters.manufacturers).toEqual([]);
            expect(state.filters.volume).toEqual([]);
            expect(state.filters.percentage).toEqual([]);
            expect(state.filters.packaging).toEqual([]);
        });

        it('should have empty active filters by default', () => {
            const state = filterReducer(undefined, { type: 'unknown' });
            expect(state.activeFilters.activeManufacturers).toEqual([]);
            expect(state.activeFilters.activeVolume).toEqual([]);
            expect(state.activeFilters.activePercentage).toEqual([]);
            expect(state.activeFilters.activePackaging).toEqual([]);
        });

        it('should start with currentPage at 1', () => {
            const state = filterReducer(undefined, { type: 'unknown' });
            expect(state.currentPage).toBe(1);
        });

        it('should have productsLoadedOnce as false initially', () => {
            const state = filterReducer(undefined, { type: 'unknown' });
            expect(state.productsLoadedOnce).toBe(false);
        });
    });

    describe('Synchronous actions', () => {
        describe('setActiveManufacturers', () => {
            it('should set active manufacturers', () => {
                const manufacturers = [1, 2, 3];
                const state = filterReducer(initialState, setActiveManufacturers(manufacturers));
                expect(state.activeFilters.activeManufacturers).toEqual(manufacturers);
            });

            it('should replace existing active manufacturers', () => {
                const stateWithManufacturers = {
                    ...initialState,
                    activeFilters: {
                        ...initialState.activeFilters,
                        activeManufacturers: [1, 2],
                    },
                };
                const state = filterReducer(stateWithManufacturers, setActiveManufacturers([3, 4]));
                expect(state.activeFilters.activeManufacturers).toEqual([3, 4]);
            });

            it('should handle empty array', () => {
                const state = filterReducer(initialState, setActiveManufacturers([]));
                expect(state.activeFilters.activeManufacturers).toEqual([]);
            });
        });

        describe('setActiveVolume', () => {
            it('should set active volume filters', () => {
                const volumes = [1, 2];
                const state = filterReducer(initialState, setActiveVolume(volumes));
                expect(state.activeFilters.activeVolume).toEqual(volumes);
            });

            it('should replace existing active volumes', () => {
                const stateWithVolumes = {
                    ...initialState,
                    activeFilters: {
                        ...initialState.activeFilters,
                        activeVolume: [1],
                    },
                };
                const state = filterReducer(stateWithVolumes, setActiveVolume([2, 3]));
                expect(state.activeFilters.activeVolume).toEqual([2, 3]);
            });
        });

        describe('setActivePercentage', () => {
            it('should set active percentage filters', () => {
                const percentages = [1, 2, 3];
                const state = filterReducer(initialState, setActivePercentage(percentages));
                expect(state.activeFilters.activePercentage).toEqual(percentages);
            });

            it('should handle single percentage', () => {
                const state = filterReducer(initialState, setActivePercentage([1]));
                expect(state.activeFilters.activePercentage).toEqual([1]);
            });
        });

        describe('setActivePackaging', () => {
            it('should set active packaging filters', () => {
                const packaging = [1, 2];
                const state = filterReducer(initialState, setActivePackaging(packaging));
                expect(state.activeFilters.activePackaging).toEqual(packaging);
            });

            it('should clear previous packaging filters', () => {
                const stateWithPackaging = {
                    ...initialState,
                    activeFilters: {
                        ...initialState.activeFilters,
                        activePackaging: [5, 6, 7],
                    },
                };
                const state = filterReducer(stateWithPackaging, setActivePackaging([1]));
                expect(state.activeFilters.activePackaging).toEqual([1]);
            });
        });

        describe('resetFilters', () => {
            it('should reset all active filters to empty arrays', () => {
                const stateWithFilters = {
                    ...initialState,
                    activeFilters: {
                        activeManufacturers: [1, 2, 3],
                        activeVolume: [1, 2],
                        activePercentage: [1],
                        activePackaging: [1, 2],
                    },
                };
                const state = filterReducer(stateWithFilters, resetFilters());
                expect(state.activeFilters).toEqual({
                    activeManufacturers: [],
                    activeVolume: [],
                    activePercentage: [],
                    activePackaging: [],
                });
            });

            it('should not affect filter options', () => {
                const stateWithData = {
                    ...initialState,
                    filters: {
                        manufacturers: [{ id: 1, name: 'Test' }],
                        volume: [{ id: 1, name: '500ml' }],
                        percentage: [{ id: 1, name: '5%' }],
                        packaging: [{ id: 1, name: 'Bottle' }],
                    },
                    activeFilters: {
                        activeManufacturers: [1],
                        activeVolume: [1],
                        activePercentage: [1],
                        activePackaging: [1],
                    },
                };
                const state = filterReducer(stateWithData, resetFilters());
                expect(state.filters).toEqual(stateWithData.filters);
            });
        });

        describe('resetProducts', () => {
            it('should reset products to empty array', () => {
                const stateWithProducts = {
                    ...initialState,
                    products: [{ id: 1 }, { id: 2 }] as any,
                };
                const state = filterReducer(stateWithProducts, resetProducts());
                expect(state.products).toEqual([]);
            });

            it('should reset pagination data', () => {
                const stateWithData = {
                    ...initialState,
                    products: [{ id: 1 }] as any,
                    totalPages: 5,
                    totalProducts: 45,
                    currentPage: 3,
                };
                const state = filterReducer(stateWithData, resetProducts());
                expect(state.totalPages).toBe(0);
                expect(state.totalProducts).toBe(0);
                expect(state.currentPage).toBe(1);
            });
        });

        describe('setProductsLoadedOnce', () => {
            it('should set productsLoadedOnce to true', () => {
                const state = filterReducer(initialState, setProductsLoadedOnce(true));
                expect(state.productsLoadedOnce).toBe(true);
            });

            it('should set productsLoadedOnce to false', () => {
                const stateLoaded = { ...initialState, productsLoadedOnce: true };
                const state = filterReducer(stateLoaded, setProductsLoadedOnce(false));
                expect(state.productsLoadedOnce).toBe(false);
            });
        });

        describe('incrementPage', () => {
            it('should increment currentPage by 1', () => {
                const state = filterReducer(initialState, incrementPage());
                expect(state.currentPage).toBe(2);
            });

            it('should increment from any page number', () => {
                const stateAtPage5 = { ...initialState, currentPage: 5 };
                const state = filterReducer(stateAtPage5, incrementPage());
                expect(state.currentPage).toBe(6);
            });
        });

        describe('setCurrentPage', () => {
            it('should set currentPage to specified value', () => {
                const state = filterReducer(initialState, setCurrentPage(5));
                expect(state.currentPage).toBe(5);
            });

            it('should allow setting to page 1', () => {
                const stateAtPage5 = { ...initialState, currentPage: 5 };
                const state = filterReducer(stateAtPage5, setCurrentPage(1));
                expect(state.currentPage).toBe(1);
            });

            it('should handle large page numbers', () => {
                const state = filterReducer(initialState, setCurrentPage(999));
                expect(state.currentPage).toBe(999);
            });
        });
    });

    describe('fetchFilters async thunk', () => {
        it('should set loading state to true on pending', () => {
            const action = { type: fetchFilters.pending.type };
            const state = filterReducer(initialState, action);
            expect(state.filtersLoading).toBe(true);
            expect(state.filtersError).toBeNull();
        });

        it('should update filters on fulfilled', () => {
            const mockFilters = {
                manufacturers: [{ id: 1, name: 'Brewery A' }],
                volume: [{ id: 1, name: '500ml' }],
                percentage: [{ id: 1, name: '5%' }],
                packaging: [{ id: 1, name: 'Bottle' }],
            };
            const action = {
                type: fetchFilters.fulfilled.type,
                payload: mockFilters,
            };
            const state = filterReducer(initialState, action);
            expect(state.filtersLoading).toBe(false);
            expect(state.filters).toEqual(mockFilters);
            expect(state.filtersError).toBeNull();
        });

        it('should handle error on rejected', () => {
            const action = {
                type: fetchFilters.rejected.type,
                error: { message: 'Failed to fetch filters' },
            };
            const state = filterReducer(initialState, action);
            expect(state.filtersLoading).toBe(false);
            expect(state.filtersError).toBe('Failed to fetch filters');
        });

        it('should handle rejected without error message', () => {
            const action = {
                type: fetchFilters.rejected.type,
                error: {},
            };
            const state = filterReducer(initialState, action);
            expect(state.filtersError).toBe('Error. Request rejected');
        });
    });

    describe('fetchInitialProducts async thunk', () => {
        it('should set loading state on pending', () => {
            const action = { type: fetchInitialProducts.pending.type };
            const state = filterReducer(initialState, action);
            expect(state.productsLoading).toBe(true);
            expect(state.productsError).toBeNull();
        });

        it('should update products and pagination on fulfilled', () => {
            const mockResponse = {
                items: [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }],
                totalPages: 5,
                totalCount: 45,
            };
            const action = {
                type: fetchInitialProducts.fulfilled.type,
                payload: mockResponse.items,
                meta: {
                    arg: { category: 'beer' },
                    requestId: '123',
                    requestStatus: 'fulfilled' as const,
                },
            };
            
            // Need to simulate the extra reducer logic
            const stateAfterPending = filterReducer(initialState, { type: fetchInitialProducts.pending.type });
            const state = filterReducer(stateAfterPending, action);
            
            expect(state.productsLoading).toBe(false);
            expect(state.products).toEqual(mockResponse.items);
        });

        it('should handle error on rejected', () => {
            const action = {
                type: fetchInitialProducts.rejected.type,
                error: { message: 'Network error' },
            };
            const state = filterReducer(initialState, action);
            expect(state.productsLoading).toBe(false);
            expect(state.productsError).toBe('Network error');
        });
    });

    describe('fetchProducts async thunk', () => {
        it('should set loading state on pending', () => {
            const action = { type: fetchProducts.pending.type };
            const state = filterReducer(initialState, action);
            expect(state.productsLoading).toBe(true);
            expect(state.productsError).toBeNull();
        });

        it('should update products on fulfilled', () => {
            const mockProducts = [
                { id: 1, name: 'Beer 1' },
                { id: 2, name: 'Beer 2' },
            ];
            const action = {
                type: fetchProducts.fulfilled.type,
                payload: { items: mockProducts, totalPages: 3, totalCount: 27 },
            };
            const state = filterReducer(initialState, action);
            expect(state.productsLoading).toBe(false);
            expect(state.products).toEqual(mockProducts);
            expect(state.totalPages).toBe(3);
            expect(state.totalProducts).toBe(27);
            expect(state.productsLoadedOnce).toBe(true);
        });

        it('should handle empty products response', () => {
            const action = {
                type: fetchProducts.fulfilled.type,
                payload: { items: [], totalPages: 0, totalCount: 0 },
            };
            const state = filterReducer(initialState, action);
            expect(state.products).toEqual([]);
            expect(state.totalPages).toBe(0);
            expect(state.totalProducts).toBe(0);
        });

        it('should handle error on rejected', () => {
            const action = {
                type: fetchProducts.rejected.type,
                error: { message: 'API Error' },
            };
            const state = filterReducer(initialState, action);
            expect(state.productsLoading).toBe(false);
            expect(state.productsError).toBe('API Error');
        });
    });

    describe('Complex state transitions', () => {
        it('should handle multiple filter updates', () => {
            let state = initialState;
            state = filterReducer(state, setActiveManufacturers([1, 2]));
            state = filterReducer(state, setActiveVolume([1]));
            state = filterReducer(state, setActivePercentage([2, 3]));
            state = filterReducer(state, setActivePackaging([1]));

            expect(state.activeFilters).toEqual({
                activeManufacturers: [1, 2],
                activeVolume: [1],
                activePercentage: [2, 3],
                activePackaging: [1],
            });
        });

        it('should handle filter update then reset', () => {
            let state = initialState;
            state = filterReducer(state, setActiveManufacturers([1, 2, 3]));
            state = filterReducer(state, setActiveVolume([1, 2]));
            state = filterReducer(state, resetFilters());

            expect(state.activeFilters).toEqual({
                activeManufacturers: [],
                activeVolume: [],
                activePercentage: [],
                activePackaging: [],
            });
        });

        it('should handle page increment and then reset products', () => {
            let state = initialState;
            state = filterReducer(state, incrementPage());
            state = filterReducer(state, incrementPage());
            expect(state.currentPage).toBe(3);
            
            state = filterReducer(state, resetProducts());
            expect(state.currentPage).toBe(1);
        });
    });

    describe('Edge cases', () => {
        it('should handle setting filters with duplicate values', () => {
            const state = filterReducer(initialState, setActiveManufacturers([1, 1, 2, 2, 3]));
            expect(state.activeFilters.activeManufacturers).toEqual([1, 1, 2, 2, 3]);
        });

        it('should handle very large arrays of filters', () => {
            const largeArray = Array.from({ length: 1000 }, (_, i) => i);
            const state = filterReducer(initialState, setActiveManufacturers(largeArray));
            expect(state.activeFilters.activeManufacturers).toHaveLength(1000);
        });

        it('should maintain other state when updating one filter type', () => {
            let state = {
                ...initialState,
                activeFilters: {
                    activeManufacturers: [1, 2],
                    activeVolume: [1],
                    activePercentage: [2],
                    activePackaging: [3],
                },
            };
            
            state = filterReducer(state, setActiveManufacturers([5, 6]));
            
            expect(state.activeFilters.activeVolume).toEqual([1]);
            expect(state.activeFilters.activePercentage).toEqual([2]);
            expect(state.activeFilters.activePackaging).toEqual([3]);
        });
    });
});