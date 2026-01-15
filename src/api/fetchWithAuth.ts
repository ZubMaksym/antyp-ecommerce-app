import { getAccessToken, setAccessToken, clearAccessToken } from '@/auth/token';

const API_BASE_URL = 'http://62.171.154.171:21000';
const REFRESH_ENDPOINT = `${API_BASE_URL}/api/Auth/refresh`;

export interface ApiResponse<T = any> {
    result: T;
    errors: any | null;
    isError: boolean;
    timeGenerated: string;
}

/**
 * Check if cookies are enabled and supported in the browser
 * Note: We cannot directly check httpOnly cookies, but we can verify cookie support
 */
const areCookiesEnabled = (): boolean => {
    if (typeof document === 'undefined') return false;
    
    // Check if cookies are enabled
    if (!navigator.cookieEnabled) {
        return false;
    }
    
    // Try to set a test cookie (will fail if cookies are disabled)
    try {
        document.cookie = 'test_cookie=1; path=/';
        const cookieExists = document.cookie.indexOf('test_cookie=') !== -1;
        // Clean up test cookie
        document.cookie = 'test_cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        return cookieExists;
    } catch {
        return false;
    }
};

/**
 * Refresh the access token using the refresh endpoint
 * The refresh token is stored in httpOnly cookie set by the backend
 * IMPORTANT: This does NOT clear existing tokens on failure - only returns null
 */
const refreshToken = async (): Promise<string | null> => {
    // Validate that cookies are enabled before attempting refresh
    if (!areCookiesEnabled()) {
        console.error('Cookies are disabled in browser - cannot refresh token');
        return null;
    }
    
    try {
        const response = await fetch(REFRESH_ENDPOINT, {
            method: 'POST',
            headers: {
                'accept': '*/*',
            },
            credentials: 'include', // Include httpOnly cookie with refresh token
            // No body required - refresh token is sent via httpOnly cookie
        });

        if (!response.ok) {
            // Try to get error details for debugging
            let errorDetails = null;
            try {
                const text = await response.text();
                if (text) {
                    try {
                        errorDetails = JSON.parse(text);
                    } catch {
                        errorDetails = text;
                    }
                }
            } catch {
                // Ignore errors parsing response
            }

            // 401/403 means no valid refresh token - this is expected if user isn't logged in
            if (response.status === 401 || response.status === 403) {
                console.warn('Token refresh: Unauthorized (401/403) - no valid refresh token cookie');
                return null;
            }
            
            // 400 Bad Request - this is a backend issue, not necessarily auth failure
            // The refresh token cookie might be missing, expired, or the endpoint has issues
            if (response.status === 400) {
                console.error('Token refresh returned 400 Bad Request:', errorDetails || 'No error details');
                
                // Check if error message indicates missing cookie
                const errorMessage = errorDetails?.message || errorDetails?.errors?.message || '';
                const isMissingCookie = 
                    typeof errorMessage === 'string' && 
                    (errorMessage.toLowerCase().includes('cookie') || 
                     errorMessage.toLowerCase().includes('refresh token') ||
                     errorMessage.toLowerCase().includes('token not found'));
                
                if (isMissingCookie) {
                    console.error('❌ Refresh token cookie is missing or not sent with request');
                    console.error('This usually means:');
                    console.error('1. Cookie was not set during login (backend issue)');
                    console.error('2. Cookie expired (check Max-Age/Expires in Set-Cookie header)');
                    console.error('3. Cookie domain/path mismatch (cookie not sent to this endpoint)');
                    console.error('4. Cookie SameSite policy blocking cross-site requests');
                } else {
                    console.error('Possible causes:');
                    console.error('1. Refresh token cookie is missing, expired, or invalid');
                    console.error('2. Backend endpoint expects different request format');
                    console.error('3. Cookie domain/path/SameSite settings mismatch');
                    console.error('4. Backend server error');
                }
                
                // Return null but don't clear existing token - might be a temporary issue
                return null;
            }
            
            // Other errors - log but don't clear token
            console.warn(`Token refresh failed with status: ${response.status}`, errorDetails);
            return null;
        }

        const result: ApiResponse<{ accessToken: string }> = await response.json();

        if (result.isError || !result.result?.accessToken) {
            return null;
        }

        const newAccessToken = result.result.accessToken;
        setAccessToken(newAccessToken);
        return newAccessToken;
    } catch (error) {
        // Network errors or fetch failures - this is expected if:
        // 1. User hasn't logged in yet (no refresh token cookie)
        // 2. Network is offline
        // 3. CORS issues
        // Don't clear existing token - it might still be valid
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
            // Network error - likely no refresh token or offline
            // Don't clear existing token, just return null
            return null;
        }
        // Other errors - log but don't clear token
        console.warn('Error refreshing token:', error);
        return null;
    }
};

/**
 * Fetch wrapper with automatic token refresh on 401
 * Automatically adds Authorization header and handles token refresh
 */
export const fetchWithAuth = async (
    url: string,
    options: RequestInit = {}
): Promise<Response> => {
    // Get current access token
    let token = getAccessToken();

    // Prepare headers
    const headers = new Headers(options.headers || {});
    
    // Add Authorization header if token exists
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    // Ensure credentials are included for cookie-based refresh token
    const fetchOptions: RequestInit = {
        ...options,
        headers,
        credentials: options.credentials || 'include',
    };

    // Make the initial request
    let response = await fetch(url, fetchOptions);

    // If we get a 401, try to refresh the token and retry
    if (response.status === 401) {
        const newToken = await refreshToken();

        if (newToken) {
            // Retry the original request with the new token
            headers.set('Authorization', `Bearer ${newToken}`);
            response = await fetch(url, {
                ...fetchOptions,
                headers,
            });
        } else {
            // Refresh failed, redirect to login
            if (typeof window !== 'undefined') {
                window.location.href = '/login';
            }
            throw new Error('Authentication failed');
        }
    }

    return response;
};

/**
 * Initialize auth on app start by calling refresh endpoint
 * This gets a new access token if refresh token cookie exists
 * Fails silently if no refresh token is available (user not logged in)
 */
export const initializeAuth = async (): Promise<boolean> => {
    try {
        const token = await refreshToken();
        return token !== null;
    } catch (error) {
        // Silently fail - this is expected if user hasn't logged in
        // The error is already handled in refreshToken
        return false;
    }
};
