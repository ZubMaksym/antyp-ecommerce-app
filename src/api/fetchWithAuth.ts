import { getAccessToken, setAccessToken } from '@/auth/token';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const REFRESH_ENDPOINT = `${API_BASE_URL}/api/Auth/refresh`;

export interface ApiResponse<T = any> {
    result: T;
    errors: any | null;
    isError: boolean;
    timeGenerated: string;
}

const refreshToken = async (): Promise<string | null> => {
    try {
        const response = await fetch(REFRESH_ENDPOINT, {
            method: 'POST',
            headers: {
                'accept': '*/*',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            return null;
        }

        const data: ApiResponse<{ accessToken: string }> = await response.json();

        if (data.isError || !data.result?.accessToken) {
            return null;
        }

        const newAccessToken = data.result.accessToken;
        setAccessToken(newAccessToken);
        return newAccessToken;
    } catch {
        return null;
    }
};

export const fetchWithAuth = async (
    url: string,
    options: RequestInit = {}
): Promise<Response> => {
    const token = getAccessToken();

    const headers = new Headers(options.headers || {});

    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    const fetchOptions: RequestInit = {
        ...options,
        headers,
        credentials: options.credentials || 'include',
    };

    let response = await fetch(url, fetchOptions);

    if (response.status === 401) {
        const newToken = await refreshToken();

        if (newToken) {
            headers.set('Authorization', `Bearer ${newToken}`);
            response = await fetch(url, {
                ...fetchOptions,
                headers,
            });
        } else {
            if (typeof window !== 'undefined') {
                window.location.href = '/login';
            }
            throw new Error('Authentication failed');
        }
    }

    return response;
};

export const initializeAuth = async (): Promise<boolean> => {
    try {
        const token = await refreshToken();
        return token !== null;
    } catch {
        return false;
    }
};
