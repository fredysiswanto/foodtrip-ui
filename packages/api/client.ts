import { LoginResponse, LoginResponseSchema } from '@foodtrip/types';

const API_URL =
  import.meta.env.VITE_API_URL || 'https://foodtrip-api.panduanqa.blog/api/v1';

interface FetchOptions extends Record<string, unknown> {
  method?: string;
  headers?: Record<string, string>;
  body?: string | FormData;
  credentials?: 'omit' | 'same-origin' | 'include';
  signal?: AbortSignal;
}

class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public details?: unknown
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
  }

  headers.set('Content-Type', 'application/json');

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        response.status,
        data.code || 'UNKNOWN_ERROR',
        data.message || 'An error occurred',
        data.details
      );
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
      throw new ApiError(500, 'PARSE_ERROR', 'Failed to parse response');
    }

    throw new ApiError(500, 'NETWORK_ERROR', 'Network request failed', error);
  }
}

// Auth endpoints
export const authApi = {
  login: async (email_address: string, password: string) => {
    return apiFetch<LoginResponse>('/home/login', {
      method: 'POST',
      body: JSON.stringify({ email_address, password }),
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
    return apiFetch('/home/me', {
      method: 'GET',
    });
  },
};

export { ApiError, apiFetch };
