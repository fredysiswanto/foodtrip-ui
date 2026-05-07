import {
  LoginResponse,
  LoginResponseSchema,
  RestaurantSchema,
  RestaurantDetailSchema,
  CreateRestaurantSchema,
  UpdateRestaurantSchema,
  RestaurantType,
  RestaurantCategoryWithRestaurantsSchema,
  RestaurantCategoryDetailSchema,
  CreateRestaurantCategorySchema,
  UpdateRestaurantCategorySchema,
  RestaurantCategoryWithRestaurantsType,
  DishSchema,
  CreateDishSchema,
  UpdateDishSchema,
  DishDetailSchema,
} from '@foodtrip/types';

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
  } else {
    console.warn('apiFetch - No auth token found in localStorage');
  }

  headers.set('Content-Type', 'application/json');

  try {
    console.log('apiFetch - Requesting:', url);
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    const data = await response.json();
    console.log('apiFetch - Response status:', response.status, 'data:', data);

    if (!response.ok) {
      const error = new ApiError(
        response.status,
        data.code || 'UNKNOWN_ERROR',
        data.message || 'An error occurred',
        data.details
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
      throw new ApiError(500, 'PARSE_ERROR', 'Failed to parse response');
    }

    console.error('apiFetch - Network error:', error);
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

// Restaurant endpoints
export const restaurantApi = {
  list: async (page = 1, limit = 10) => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });
    return apiFetch<RestaurantType[]>(`/admin/restaurants?${params}`, {
      method: 'GET',
      validateWith: (data: unknown) => {
        console.log('restaurantApi.list - raw data:', data);

        // Handle direct array response
        if (Array.isArray(data)) {
          console.log(
            'restaurantApi.list - data is array, count:',
            data.length
          );
          return data.map((item) => RestaurantSchema.parse(item));
        }

        // Handle object with 'data' property
        if (data && typeof data === 'object') {
          const obj = data as Record<string, unknown>;

          // Case: { data: [...] }
          if ('data' in obj && Array.isArray(obj.data)) {
            console.log(
              'restaurantApi.list - data wrapped in .data, count:',
              obj.data.length
            );
            return obj.data.map((item) => RestaurantSchema.parse(item));
          }

          // Case: { items: [...] } or similar
          if ('items' in obj && Array.isArray(obj.items)) {
            console.log(
              'restaurantApi.list - data wrapped in .items, count:',
              obj.items.length
            );
            return obj.items.map((item) => RestaurantSchema.parse(item));
          }

          // Case: { restaurants: [...] }
          if ('restaurants' in obj && Array.isArray(obj.restaurants)) {
            console.log(
              'restaurantApi.list - data wrapped in .restaurants, count:',
              obj.restaurants.length
            );
            return obj.restaurants.map((item) => RestaurantSchema.parse(item));
          }
        }

        console.warn(
          'restaurantApi.list - data format not recognized, returning empty array'
        );
        return [];
      },
    });
  },

  getById: async (id: string) => {
    return apiFetch<RestaurantType>(`/admin/restaurant/${id}`, {
      method: 'GET',
      validateWith: (data: unknown) => {
        // Check if data has a 'data' wrapper
        if (data && typeof data === 'object' && 'data' in data) {
          return RestaurantDetailSchema.parse(data).data;
        }
        return RestaurantSchema.parse(data);
      },
    });
  },

  create: async (input: Record<string, unknown>) => {
    const validated = CreateRestaurantSchema.parse(input);
    return apiFetch<RestaurantType>('/admin/restaurants', {
      method: 'POST',
      body: JSON.stringify(validated),
      validateWith: (data: unknown) => {
        if (data && typeof data === 'object' && 'data' in data) {
          return RestaurantDetailSchema.parse(data).data;
        }
        return RestaurantSchema.parse(data);
      },
    });
  },

  update: async (id: string, input: Record<string, unknown>) => {
    const validated = UpdateRestaurantSchema.parse(input);
    return apiFetch<RestaurantType>(`/admin/restaurant/${id}`, {
      method: 'PUT',
      body: JSON.stringify(validated),
      validateWith: (data: unknown) => {
        if (data && typeof data === 'object' && 'data' in data) {
          return RestaurantDetailSchema.parse(data).data;
        }
        return RestaurantSchema.parse(data);
      },
    });
  },

  delete: async (id: string) => {
    return apiFetch<void>(`/admin/restaurant/${id}`, {
      method: 'DELETE',
    });
  },
};

// Restaurant Category endpoints
export const restaurantCategoryApi = {
  list: async (page = 1, limit = 10) => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });
    return apiFetch<RestaurantCategoryWithRestaurantsType[]>(
      `/admin/resto-cat?${params}`,
      {
        method: 'GET',
        validateWith: (data: unknown) => {
          console.log('restaurantCategoryApi.list - raw data:', data);

          // Handle direct array response
          if (Array.isArray(data)) {
            console.log(
              'restaurantCategoryApi.list - data is array, count:',
              data.length
            );
            return data.map((item) =>
              RestaurantCategoryWithRestaurantsSchema.parse(item)
            );
          }

          // Handle object with 'data' property
          if (data && typeof data === 'object') {
            const obj = data as Record<string, unknown>;

            // Case: { data: [...] }
            if ('data' in obj && Array.isArray(obj.data)) {
              console.log(
                'restaurantCategoryApi.list - data wrapped in .data, count:',
                obj.data.length
              );
              return obj.data.map((item) =>
                RestaurantCategoryWithRestaurantsSchema.parse(item)
              );
            }
          }

          console.warn(
            'restaurantCategoryApi.list - data format not recognized, returning empty array'
          );
          return [];
        },
      }
    );
  },

  getById: async (id: string) => {
    return apiFetch<RestaurantCategoryWithRestaurantsType>(
      `/admin/resto-cat/${id}`,
      {
        method: 'GET',
        validateWith: (data: unknown) => {
          // Check if data has a 'data' wrapper
          if (data && typeof data === 'object' && 'data' in data) {
            return RestaurantCategoryDetailSchema.parse(data).data;
          }
          return RestaurantCategoryWithRestaurantsSchema.parse(data);
        },
      }
    );
  },

  create: async (input: Record<string, unknown>) => {
    const validated = CreateRestaurantCategorySchema.parse(input);
    return apiFetch<RestaurantCategoryWithRestaurantsType>('/admin/resto-cat', {
      method: 'POST',
      body: JSON.stringify(validated),
      validateWith: (data: unknown) => {
        if (data && typeof data === 'object' && 'data' in data) {
          return RestaurantCategoryDetailSchema.parse(data).data;
        }
        return RestaurantCategoryWithRestaurantsSchema.parse(data);
      },
    });
  },

  update: async (id: string, input: Record<string, unknown>) => {
    const validated = UpdateRestaurantCategorySchema.parse(input);
    return apiFetch<RestaurantCategoryWithRestaurantsType>(
      `/admin/resto-cat/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify(validated),
        validateWith: (data: unknown) => {
          if (data && typeof data === 'object' && 'data' in data) {
            return RestaurantCategoryDetailSchema.parse(data).data;
          }
          return RestaurantCategoryWithRestaurantsSchema.parse(data);
        },
      }
    );
  },

  delete: async (id: string) => {
    return apiFetch<void>(`/admin/resto-cat/${id}`, {
      method: 'DELETE',
    });
  },
};

export const dishApi = {
  list: async (page = 1, limit = 10) => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });
    return apiFetch(`/admin/dishes?${params}`, {
      method: 'GET',
      validateWith: (data: unknown) => {
        console.log('dishApi.list - raw data:', data);

        // Handle direct array response
        if (Array.isArray(data)) {
          console.log('dishApi.list - data is array, count:', data.length);
          return data.map((item) => DishSchema.parse(item));
        }

        // Handle object with 'data' property
        if (data && typeof data === 'object') {
          const obj = data as Record<string, unknown>;

          // Case: { data: [...] }
          if ('data' in obj && Array.isArray(obj.data)) {
            console.log(
              'dishApi.list - data wrapped in .data, count:',
              obj.data.length
            );
            return obj.data.map((item) => DishSchema.parse(item));
          }

          // Case: { items: [...] } or similar
          // if ('items' in obj && Array.isArray(obj.items)) {
          //   console.log(
          //     'dishApi.list - data wrapped in .items, count:',
          //     obj.items.length
          //   );
          //   return obj.items.map((item) => DishSchema.parse(item));
          // }

          // Case: { restaurants: [...] }
          // if ('restaurants' in obj && Array.isArray(obj.restaurants)) {
          //   console.log(
          //     'dishApi.list - data wrapped in .restaurants, count:',
          //     obj.restaurants.length
          //   );
          //   return obj.restaurants.map((item) => DishSchema.parse(item));
          // }
        }

        console.warn(
          'dishApi.list - data format not recognized, returning empty array'
        );
        return [];
      },
    });
  },
  getById: async (id: string) => {
    return apiFetch(`/admin/dish/${id}`, {
      method: 'GET',
      validateWith: (data: unknown) => {
        // Check if data has a 'data' wrapper
        if (data && typeof data === 'object' && 'data' in data) {
          return DishDetailSchema.parse(data).data;
        }
        return DishSchema.parse(data);
      },
    });
  },
  update: async (id: string, input: Record<string, unknown>) => {
    const validated = UpdateDishSchema.parse(input);
    return apiFetch(`/admin/dish/${id}`, {
      method: 'PUT',
      body: JSON.stringify(validated),
      validateWith: (data: unknown) => {
        if (data && typeof data === 'object' && 'data' in data) {
          console.log('di dalam');

          return DishDetailSchema.parse(data).data;
        }
        console.log('diluar');

        return DishSchema.parse(data);
      },
    });
  },
  create: async (input: Record<string, unknown>) => {
    const validated = CreateDishSchema.parse(input);
    return apiFetch(`/admin/dish`, {
      method: 'POST',
      body: JSON.stringify(validated),
      validateWith: (data: unknown) => {
        if (data && typeof data === 'object' && 'data' in data) {
          return DishDetailSchema.parse(data).data;
        }
        return DishSchema.parse(data);
      },
    });
  },
  delete: async (id: string) => {
    return apiFetch(`/admin/dish/${id}`, {
      method: 'DELETE',
    });
  },
};

export { ApiError, apiFetch };
