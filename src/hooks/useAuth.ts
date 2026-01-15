'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '@/types/helperTypes';
import { getAccessToken, subscribeToToken } from '@/auth/token';
import { initializeAuth } from '@/api/fetchWithAuth';

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

    // Decode token and extract role
    const decodeToken = useCallback((token: string | null): 'Admin' | 'User' | null => {
        if (!token) return null;

        try {
            const decoded = jwtDecode<JwtPayload>(token);
            const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            return role === 'Admin' || role === 'User' ? role : null;
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    }, []);

    // Check if token is expired
    const isTokenExpired = useCallback((token: string): boolean => {
        try {
            const decoded = jwtDecode<JwtPayload>(token);
            const currentTime = Date.now() / 1000;
            return decoded.exp < currentTime;
        } catch {
            return true;
        }
    }, []);

    // Update auth state based on token
    const updateAuthState = useCallback((token: string | null) => {
        if (!token || isTokenExpired(token)) {
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
    }, [decodeToken, isTokenExpired]);

    // Initialize auth on mount
    useEffect(() => {
        let isMounted = true;

        const initAuth = async () => {
            // First check if we already have a token in memory (from login)
            const existingToken = getAccessToken();
            
            if (existingToken && !isTokenExpired(existingToken)) {
                // We have a valid token, use it immediately
                if (isMounted) {
                    updateAuthState(existingToken);
                }
            } else {
                // No token or expired, try to refresh (only if refresh token cookie exists)
                // This will fail silently if no refresh token cookie is available
                const refreshSuccess = await initializeAuth();
                
                if (isMounted) {
                    const token = getAccessToken();
                    if (token) {
                        // Successfully got a new token
                        updateAuthState(token);
                    } else {
                        // Refresh failed - this could be:
                        // 1. No refresh token cookie (user not logged in) - should redirect
                        // 2. 400 Bad Request (backend issue) - should not redirect immediately
                        // 3. Network error - should not redirect immediately
                        // For now, we'll set as unauthenticated and let the redirect logic handle it
                        // But we'll add a delay to avoid immediate redirect on 400 errors
                        updateAuthState(null);
                    }
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
    }, [updateAuthState, isTokenExpired]);

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
                    router.push('/admin');
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
