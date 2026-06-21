import { LoginResponse, LoginResponseSchema } from '@foodtrip/types';

const API_URL =
  (import.meta as ImportMeta & { env?: { VITE_API_URL?: string } }).env
    ?.VITE_API_URL || 'http://localhost:3003/api';

interface FetchOptions extends Record<string, unknown> {
  method?: string;
  headers?: Record<string, string>;
  body?: string | FormData;
  credentials?: 'omit' | 'same-origin' | 'include';
  signal?: AbortSignal;
}

class ApiError extends Error {
  constructor(
    public success: boolean,
    public statusCode: number,
    public data: null,
    message: string,
    public error?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function apiFetch<T>(
  endpoint: string,
  options?: FetchOptions & { validateWith?: (data: unknown) => T }
): Promise<T> {
  const { validateWith, ...fetchOptions } = options || {};
  const url = `${API_URL}${endpoint}`;
  const headers = new Headers(fetchOptions.headers || {});

  // Add authorization header if token exists
  const token = localStorage.getItem('auth_token');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  } else {
    console.warn('apiFetch - No auth token found in localStorage');
  }

  headers.set('Content-Type', 'application/json');

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      const error = new ApiError(
        false,
        response.status,
        null,
        data?.message || 'API request failed',
        data?.error || null
      );
      console.error('apiFetch - API error:', error);
      throw error;
    }

    // Validate response if validator provided
    if (validateWith) {
      return validateWith(data) as T;
    }

    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof SyntaxError) {
      console.error('apiFetch - Parse error:', error);
      throw new ApiError(
        true,
        400,
        null,
        'Failed to parse API response',
        error
      );
    }

    throw new ApiError(true, 500, null, 'Network request failed', error);
  }
}

// Auth endpoints
export const authApi = {
  login: async (email: string, password: string) => {
    return apiFetch<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      validateWith: (data) => LoginResponseSchema.parse(data),
    });
  },

  logout: async () => {
    // Assuming logout endpoint exists, adjust if needed
    const token = localStorage.getItem('auth_token');
    if (token) {
      localStorage.removeItem('auth_token');
    }
  },

  getCurrentUser: async () => {
    // This would be called to validate/refresh user data
    // Adjust endpoint based on your backend
    return apiFetch('/me', {
      method: 'GET',
    });
  },
};

export { ApiError, apiFetch };
