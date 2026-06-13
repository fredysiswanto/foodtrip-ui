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
  DishCategoryWithDishesSchema,
  DishCategoryDetailSchema,
  CreateDishCategorySchema,
  UpdateDishCategorySchema,
  DishCategoryWithDishesType,
  UserWithRestaurantType,
  UserListWithRestaurantSchema,
  UpdateUserSchema,
} from '@foodtrip/types';

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

    console.error('apiFetch - Network error:', error);
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
        // Handle direct array response
        if (Array.isArray(data)) {
          return data.map((item) => RestaurantSchema.parse(item));
        }

        // Handle object with 'data' property
        if (data && typeof data === 'object') {
          const obj = data as Record<string, unknown>;

          // Case: { data: [...] }
          if ('data' in obj && Array.isArray(obj.data)) {
            return obj.data.map((item) => RestaurantSchema.parse(item));
          }

          // Case: { items: [...] } or similar
          if ('items' in obj && Array.isArray(obj.items)) {
            return obj.items.map((item) => RestaurantSchema.parse(item));
          }

          // Case: { restaurants: [...] }
          if ('restaurants' in obj && Array.isArray(obj.restaurants)) {
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
          // Handle direct array response
          if (Array.isArray(data)) {
            return data.map((item) =>
              RestaurantCategoryWithRestaurantsSchema.parse(item)
            );
          }

          // Handle object with 'data' property
          if (data && typeof data === 'object') {
            const obj = data as Record<string, unknown>;

            // Case: { data: [...] }
            if ('data' in obj && Array.isArray(obj.data)) {
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
        // Handle direct array response
        if (Array.isArray(data)) {
          return data.map((item) => DishSchema.parse(item));
        }

        // Handle object with 'data' property
        if (data && typeof data === 'object') {
          const obj = data as Record<string, unknown>;

          // Case: { data: [...] }
          if ('data' in obj && Array.isArray(obj.data)) {
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
          return DishDetailSchema.parse(data).data;
        }

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

// Dish Category endpoints
export const dishCategoryApi = {
  list: async (page = 1, limit = 10) => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });
    return apiFetch<DishCategoryWithDishesType[]>(`/admin/dish-cat?${params}`, {
      method: 'GET',
      validateWith: (data: unknown) => {
        // Handle direct array response
        if (Array.isArray(data)) {
          return data.map((item) => DishCategoryWithDishesSchema.parse(item));
        }

        // Handle object with 'data' property
        if (data && typeof data === 'object') {
          const obj = data as Record<string, unknown>;

          // Case: { data: [...] }
          if ('data' in obj && Array.isArray(obj.data)) {
            return obj.data.map((item) =>
              DishCategoryWithDishesSchema.parse(item)
            );
          }
        }

        console.warn(
          'dishCategoryApi.list - data format not recognized, returning empty array'
        );
        return [];
      },
    });
  },

  getById: async (id: string) => {
    return apiFetch<DishCategoryWithDishesType>(`/admin/dish-cat/${id}`, {
      method: 'GET',
      validateWith: (data: unknown) => {
        // Check if data has a 'data' wrapper
        if (data && typeof data === 'object' && 'data' in data) {
          return DishCategoryDetailSchema.parse(data).data;
        }
        return DishCategoryWithDishesSchema.parse(data);
      },
    });
  },

  create: async (input: Record<string, unknown>) => {
    const validated = CreateDishCategorySchema.parse(input);
    return apiFetch<DishCategoryWithDishesType>('/admin/dish-cat', {
      method: 'POST',
      body: JSON.stringify(validated),
      validateWith: (data: unknown) => {
        if (data && typeof data === 'object' && 'data' in data) {
          return DishCategoryDetailSchema.parse(data).data;
        }
        return DishCategoryWithDishesSchema.parse(data);
      },
    });
  },

  update: async (id: string, input: Record<string, unknown>) => {
    const validated = UpdateDishCategorySchema.parse(input);
    return apiFetch<DishCategoryWithDishesType>(`/admin/dish-cat/${id}`, {
      method: 'PUT',
      body: JSON.stringify(validated),
      validateWith: (data: unknown) => {
        if (data && typeof data === 'object' && 'data' in data) {
          return DishCategoryDetailSchema.parse(data).data;
        }
        return DishCategoryWithDishesSchema.parse(data);
      },
    });
  },

  delete: async (id: string) => {
    return apiFetch<void>(`/admin/dish-cat/${id}`, {
      method: 'DELETE',
    });
  },
};

// User endpoints
export const userApi = {
  list: async (
    typeUser: 'admin' | 'resto-admin' | 'customer',
    page = 1,
    limit = 10
  ) => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });
    return apiFetch<UserWithRestaurantType[]>(
      `/admin/user/${typeUser}?${params}`,
      {
        method: 'GET',
        validateWith: (data: unknown) => {
          // Handle direct array response
          if (Array.isArray(data)) {
            return data.map((item) =>
              UserListWithRestaurantSchema.shape.data.element.parse(item)
            );
          }

          // Handle object with 'data' property
          if (data && typeof data === 'object') {
            const obj = data as Record<string, unknown>;

            // Case: { data: [...] }
            if ('data' in obj && Array.isArray(obj.data)) {
              return obj.data.map((item) =>
                UserListWithRestaurantSchema.shape.data.element.parse(item)
              );
            }
          }

          console.warn(
            'userApi.list - data format not recognized, returning empty array'
          );
          return [];
        },
      }
    );
  },

  getById: async (id: string) => {
    return apiFetch<UserWithRestaurantType>(`/admin/user/${id}`, {
      method: 'GET',
      validateWith: (data: unknown) => {
        return UserListWithRestaurantSchema.shape.data.element.parse(data);
      },
    });
  },

  update: async (id: string, input: Record<string, unknown>) => {
    const validated = UpdateUserSchema.parse(input);
    return apiFetch<UserWithRestaurantType>(`/admin/user/${id}`, {
      method: 'PUT',
      body: JSON.stringify(validated),
      validateWith: (data: unknown) => {
        return UserListWithRestaurantSchema.shape.data.element.parse(data);
      },
    });
  },

  delete: async (id: string) => {
    return apiFetch<void>(`/admin/user/${id}`, {
      method: 'DELETE',
    });
  },
};

export { ApiError, apiFetch };
