/**
 * In-memory access token management
 * Tokens are stored in memory only - NOT in localStorage, sessionStorage, or Redux
 * This provides better security against XSS attacks
 */

let accessToken: string | null = null;
const tokenListeners: Set<(token: string | null) => void> = new Set();

/**
 * Set the access token in memory
 */
export const setAccessToken = (token: string | null): void => {
    accessToken = token;
    // Notify all listeners of token change
    tokenListeners.forEach((listener) => listener(token));
};

/**
 * Get the current access token from memory
 */
export const getAccessToken = (): string | null => {
    return accessToken;
};

/**
 * Clear the access token from memory
 */
export const clearAccessToken = (): void => {
    accessToken = null;
    tokenListeners.forEach((listener) => listener(null));
};

/**
 * Subscribe to token changes
 * Returns an unsubscribe function
 */
export const subscribeToToken = (listener: (token: string | null) => void): (() => void) => {
    tokenListeners.add(listener);
    // Return unsubscribe function
    return () => {
        tokenListeners.delete(listener);
    };
};

/**
 * Check if a token exists in memory
 */
export const hasAccessToken = (): boolean => {
    return accessToken !== null;
};
