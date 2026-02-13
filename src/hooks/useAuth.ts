'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '@/types/commonTypes';
import { getAccessToken, subscribeToToken } from '@/auth/token';
import { initializeAuth } from '@/api/fetchWithAuth';
import { clearAccessToken } from '@/auth/token';

export interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    role: 'Admin' | 'User' | null;
    isLoading: boolean;
}

/**
 * Custom hook for authentication and route guards
 * @param requiredRole - Optional role requirement ('Admin' | 'User')
 * @returns Auth state and helper functions
 */
export const useAuth = (requiredRole?: 'Admin' | 'User') => {
    const router = useRouter();
    const [authState, setAuthState] = useState<AuthState>({
        isAuthenticated: false,
        token: null,
        role: null,
        isLoading: true,
    });

    // const logout = () => {
    //     clearAccessToken();
    //     // setAuthState({
    //     //     isAuthenticated: false,
    //     //     token: null,
    //     //     role: null,
    //     //     isLoading: false,
    //     // });
    // }

    // Decode token and extract role
    const decodeToken = useCallback((token: string | null): 'Admin' | 'User' | null => {
        if (!token) return null;

        try {
            const decoded = jwtDecode<JwtPayload>(token);
            const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            return role === 'Admin' || role === 'User' ? role : null;
        } catch {
            return null;
        }
    }, []);

    // Update auth state based on token
    const updateAuthState = useCallback((token: string | null) => {
        if (!token) {
            setAuthState({
                isAuthenticated: false,
                token: null,
                role: null,
                isLoading: false,
            });
            return;
        }

        const role = decodeToken(token);
        setAuthState({
            isAuthenticated: true,
            token,
            role,
            isLoading: false,
        });
    }, [decodeToken]);

    // Initialize auth on mount
    useEffect(() => {
        let isMounted = true;

        const initAuth = async () => {
            // First check if we already have a token in memory (from login)
            const existingToken = getAccessToken();

            if (existingToken) {
                // We already have a token from a previous login in this tab
                if (isMounted) {
                    updateAuthState(existingToken);
                }
            } else {
                // No token in memory, try to get a new one using the refresh token cookie.
                // This follows the classic JWT + refresh token flow:
                // https://stackoverflow.com/questions/27726066/jwt-refresh-token-flow
                await initializeAuth();

                if (isMounted) {
                    const token = getAccessToken();
                    updateAuthState(token);
                }
            }
        };

        initAuth();

        // Subscribe to token changes
        const unsubscribe = subscribeToToken((token) => {
            if (isMounted) {
                updateAuthState(token);
            }
        });

        return () => {
            isMounted = false;
            unsubscribe();
        };
    }, [updateAuthState]);

    // Check role requirement and redirect if needed
    useEffect(() => {
        if (authState.isLoading) return;

        if (requiredRole) {
            // Only redirect if we're sure the user is not authenticated
            // Add a longer delay to avoid redirecting on temporary 400 errors
            if (!authState.isAuthenticated) {
                // Delay to allow refresh attempt to complete and handle 400 errors gracefully
                // 400 errors might be temporary backend issues, so we wait a bit longer
                router.push('/login');
                return;
            }

            if (authState.role !== requiredRole) {
                // Redirect to appropriate panel or login
                if (authState.role === 'Admin') {
                    router.push('/admin/products/beer');
                } else if (authState.role === 'User') {
                    router.push('/user');
                } else {
                    router.push('/login');
                }
            }
        }
    }, [authState, requiredRole, router]);

    return {
        ...authState,
        // Helper to check if user has specific role
        hasRole: (role: 'Admin' | 'User') => authState.role === role,
        // Helper to check if user can access route
        canAccess: requiredRole ? authState.role === requiredRole : authState.isAuthenticated,
    };
};
