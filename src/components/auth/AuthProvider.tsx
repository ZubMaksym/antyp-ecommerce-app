'use client';

import { useEffect } from 'react';
import { initializeAuth } from '@/api/fetchWithAuth';

/**
 * AuthProvider component that initializes authentication on app start
 * This should be placed in the root layout to ensure auth is initialized on page load
 * Silently handles cases where user is not logged in (no refresh token cookie)
 */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        // Initialize auth on mount (calls refresh endpoint to get access token)
        // This will fail silently if no refresh token cookie exists (user not logged in)
        initializeAuth().catch(() => {
            // Silently handle - user just needs to log in
        });
    }, []);

    return <>{children}</>;
};
