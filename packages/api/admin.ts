/**
 * System Admin API Endpoints
 * Global access to all restaurants, dishes, users, and orders
 */

import {
  CreateDishSchema,
  CreateRestaurantSchema,
  DishCategoryWithDishesSchema,
  DishCategoryWithDishesType,
  DishDetailSchema,
  DishSchema,
  DishType,
  RestaurantCategoryWithRestaurantsSchema,
  RestaurantCategoryWithRestaurantsType,
  RestaurantDetailSchema,
  RestaurantSchema,
  RestaurantType,
  UpdateDishSchema,
  UpdateRestaurantSchema,
  UserListWithRestaurantSchema,
  UserWithRestaurantSchema,
  UserWithRestaurantType,
} from '@foodtrip/types';

import { apiFetch } from './api-request';

// Restaurant Management (System Admin - All restaurants)
export const adminRestaurantApi = {
  listAll: async (page = 1, limit = 10) => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });
    return apiFetch<RestaurantType[]>(`/admin/restaurants?${params}`, {
      method: 'GET',
      validateWith: (data: unknown) => {
        if (Array.isArray(data)) {
          return data.map((item) => RestaurantSchema.parse(item));
        }
        if (data && typeof data === 'object' && 'data' in data) {
          const obj = data as Record<string, unknown>;
          if (Array.isArray(obj.data)) {
            return obj.data.map((item) => RestaurantSchema.parse(item));
          }
        }
        return [];
      },
    });
  },
  list: async (page = 1, limit = 10) => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });
    return apiFetch<RestaurantType[]>(`/admin/restaurants/my?${params}`, {
      method: 'GET',
      validateWith: (data: unknown) => {
        if (Array.isArray(data)) {
          return data.map((item) => RestaurantSchema.parse(item));
        }
        if (data && typeof data === 'object' && 'data' in data) {
          const obj = data as Record<string, unknown>;
          if (Array.isArray(obj.data)) {
            return obj.data.map((item) => RestaurantSchema.parse(item));
          }
        }
        return [];
      },
    });
  },
  getById: async (id: string) => {
    return apiFetch<RestaurantType>(`/admin/restaurants/${id}`, {
      method: 'GET',
      validateWith: (data: unknown) => {
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

// Dish Management (System Admin - All dishes)
export const adminDishApi = {
  listAll: async (page = 1, limit = 10) => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });
    return apiFetch<DishType[]>(`/admin/dishes?${params}`, {
      method: 'GET',
      validateWith: (data: unknown) => {
        if (Array.isArray(data)) {
          return data.map((item) => DishSchema.parse(item));
        }
        if (data && typeof data === 'object' && 'data' in data) {
          const obj = data as Record<string, unknown>;
          if (Array.isArray(obj.data)) {
            return obj.data.map((item) => DishSchema.parse(item));
          }
        }
        return [];
      },
    });
  },

  list: async () => {
    return apiFetch<DishType[]>(`/admin/dishes/restaurants`, {
      method: 'GET',
      validateWith: (data: unknown) => {
        if (Array.isArray(data)) {
          return data.map((item) => DishSchema.parse(item));
        }
        if (data && typeof data === 'object' && 'data' in data) {
          const obj = data as Record<string, unknown>;
          if (Array.isArray(obj.data)) {
            return obj.data.map((item) => DishSchema.parse(item));
          }
        }
        return [];
      },
    });
  },
  getById: async (id: string) => {
    return apiFetch<DishType>(`/admin/dishes/${id}`, {
      method: 'GET',
      validateWith: (data: unknown) => {
        if (data && typeof data === 'object' && 'data' in data) {
          const wrapper = data as Record<string, unknown>;
          return DishSchema.parse(wrapper.data);
        }
        return DishSchema.parse(data);
      },
    });
  },
  create: async (input: Record<string, unknown>) => {
    const validated = CreateDishSchema.parse(input);
    return apiFetch(`/admin/dishes`, {
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
  update: async (id: string, input: Record<string, unknown>) => {
    const validated = UpdateDishSchema.parse(input);
    return apiFetch(`/admin/dishes/${id}`, {
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
  delete: async (id: string) => {
    return apiFetch(`/admin/dishes/${id}`, {
      method: 'DELETE',
    });
  },
};

// Dish Category Management (System Admin)
export const adminDishCategoryApi = {
  list: async (page = 1, limit = 10) => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });
    return apiFetch<DishCategoryWithDishesType[]>(
      `/admin/categories?${params}`,
      {
        method: 'GET',
        validateWith: (data: unknown) => {
          if (Array.isArray(data)) {
            return data.map((item) => DishCategoryWithDishesSchema.parse(item));
          }
          if (data && typeof data === 'object' && 'data' in data) {
            const obj = data as Record<string, unknown>;
            if (Array.isArray(obj.data)) {
              return obj.data.map((item) =>
                DishCategoryWithDishesSchema.parse(item)
              );
            }
          }
          return [];
        },
      }
    );
  },

  getById: async (id: string) => {
    return apiFetch<DishCategoryWithDishesType>(`/admin/dish-cat/${id}`, {
      method: 'GET',
      validateWith: (data: unknown) => {
        if (data && typeof data === 'object' && 'data' in data) {
          const wrapper = data as Record<string, unknown>;
          return DishCategoryWithDishesSchema.parse(wrapper.data);
        }
        return DishCategoryWithDishesSchema.parse(data);
      },
    });
  },
};

// Restaurant Category Management (System Admin)
export const adminRestaurantCategoryApi = {
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
          if (Array.isArray(data)) {
            return data.map((item) =>
              RestaurantCategoryWithRestaurantsSchema.parse(item)
            );
          }
          if (data && typeof data === 'object' && 'data' in data) {
            const obj = data as Record<string, unknown>;
            if (Array.isArray(obj.data)) {
              return obj.data.map((item) =>
                RestaurantCategoryWithRestaurantsSchema.parse(item)
              );
            }
          }
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
          if (data && typeof data === 'object' && 'data' in data) {
            const wrapper = data as Record<string, unknown>;
            return RestaurantCategoryWithRestaurantsSchema.parse(wrapper.data);
          }
          return RestaurantCategoryWithRestaurantsSchema.parse(data);
        },
      }
    );
  },
};

// User Management (System Admin - All users)
export const adminUserApi = {
  listRestoAdmins: async (page = 1, limit = 10) => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });
    return apiFetch<UserWithRestaurantType[]>(
      `/admin/user/resto-admin?${params}`,
      {
        method: 'GET',
        validateWith: (data: unknown): UserWithRestaurantType[] => {
          const response = UserListWithRestaurantSchema.parse(data);
          return response.data;
        },
      }
    );
  },

  getRestoAdminById: async (id: string) => {
    return apiFetch<UserWithRestaurantType>(`/admin/user/resto-admin/${id}`, {
      method: 'GET',
      validateWith: (data: unknown): UserWithRestaurantType => {
        // Handle data wrapper response
        if (data && typeof data === 'object' && 'data' in data) {
          const wrapper = data as Record<string, unknown>;
          return UserWithRestaurantSchema.parse(wrapper.data);
        }
        return UserWithRestaurantSchema.parse(data);
      },
    });
  },

  listCustomers: async (page = 1, limit = 10) => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });
    return apiFetch<UserWithRestaurantType[]>(
      `/admin/user/customer?${params}`,
      {
        method: 'GET',
        validateWith: (data: unknown): UserWithRestaurantType[] => {
          const response = UserListWithRestaurantSchema.parse(data);
          return response.data;
        },
      }
    );
  },

  getCustomerById: async (id: string) => {
    return apiFetch<UserWithRestaurantType>(`/admin/user/customer/${id}`, {
      method: 'GET',
      validateWith: (data: unknown): UserWithRestaurantType => {
        // Handle data wrapper response
        if (data && typeof data === 'object' && 'data' in data) {
          const wrapper = data as Record<string, unknown>;
          return UserWithRestaurantSchema.parse(wrapper.data);
        }
        return UserWithRestaurantSchema.parse(data);
      },
    });
  },

  listAdmins: async (page = 1, limit = 10) => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });
    return apiFetch<UserWithRestaurantType[]>(`/admin/user/admin?${params}`, {
      method: 'GET',
      validateWith: (data: unknown): UserWithRestaurantType[] => {
        const response = UserListWithRestaurantSchema.parse(data);
        return response.data;
      },
    });
  },

  getAdminById: async (id: string) => {
    return apiFetch<UserWithRestaurantType>(`/admin/user/admin/${id}`, {
      method: 'GET',
      validateWith: (data: unknown): UserWithRestaurantType => {
        // Handle data wrapper response
        if (data && typeof data === 'object' && 'data' in data) {
          const wrapper = data as Record<string, unknown>;
          return UserWithRestaurantSchema.parse(wrapper.data);
        }
        return UserWithRestaurantSchema.parse(data);
      },
    });
  },
};
