/**
 * Restaurant Admin API Endpoints
 * Scoped to a single restaurant (retrieved from auth context)
 */

import {
  RestaurantSchema,
  RestaurantType,
  DishSchema,
  DishType,
  DishCategorySchema,
  DishCategoryType,
} from '@foodtrip/types';
import { apiFetch } from './client';

// Restaurant Management (Resto Admin - Own restaurant only)
export const restaurantAdminRestaurantApi = {
  getOwn: async (restoID: string) => {
    return apiFetch<RestaurantType>(`/resto-admin/restaurant/${restoID}`, {
      method: 'GET',
      validateWith: (data: unknown): RestaurantType => {
        if (data && typeof data === 'object' && 'data' in data) {
          const wrapper = data as Record<string, unknown>;
          return RestaurantSchema.parse(wrapper.data);
        }
        return RestaurantSchema.parse(data);
      },
    });
  },

  updateOwn: async (restoID: string, input: Record<string, unknown>) => {
    const formData = new FormData();
    Object.entries(input).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value as string | Blob);
      }
    });

    return apiFetch<RestaurantType>(`/resto-admin/restaurant/${restoID}`, {
      method: 'PUT',
      body: formData,
      validateWith: (data: unknown): RestaurantType => {
        if (data && typeof data === 'object' && 'data' in data) {
          const wrapper = data as Record<string, unknown>;
          return RestaurantSchema.parse(wrapper.data);
        }
        return RestaurantSchema.parse(data);
      },
    });
  },
};

// Dish Management (Resto Admin - Own restaurant dishes)
export const restaurantAdminDishApi = {
  list: async (restoID: string, page = 1, limit = 10) => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });
    return apiFetch<DishType[]>(`/resto-admin/dishes/${restoID}?${params}`, {
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

  getById: async (dishID: string) => {
    return apiFetch<DishType>(`/resto-admin/dish/${dishID}`, {
      method: 'GET',
      validateWith: (data: unknown): DishType => {
        if (data && typeof data === 'object' && 'data' in data) {
          const wrapper = data as Record<string, unknown>;
          return DishSchema.parse(wrapper.data);
        }
        return DishSchema.parse(data);
      },
    });
  },

  create: async (input: Record<string, unknown>) => {
    const formData = new FormData();
    Object.entries(input).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value as string | Blob);
      }
    });

    return apiFetch<DishType>('/resto-admin/dish', {
      method: 'POST',
      body: formData,
      validateWith: (data: unknown): DishType => {
        if (data && typeof data === 'object' && 'data' in data) {
          const wrapper = data as Record<string, unknown>;
          return DishSchema.parse(wrapper.data);
        }
        return DishSchema.parse(data);
      },
    });
  },

  update: async (dishID: string, input: Record<string, unknown>) => {
    const formData = new FormData();
    console.log(formData, 'form data');

    Object.entries(input).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value as string | Blob);
      }
    });

    return apiFetch<DishType>(`/resto-admin/dish/${dishID}`, {
      method: 'PUT',
      body: formData,
      validateWith: (data: unknown): DishType => {
        console.log(data, 'API response data');

        if (data && typeof data === 'object' && 'data' in data) {
          const wrapper = data as Record<string, unknown>;
          return DishSchema.parse(wrapper.data);
        }
        return DishSchema.parse(data);
      },
    });
  },

  delete: async (dishID: string) => {
    return apiFetch<void>(`/resto-admin/dish/${dishID}`, {
      method: 'DELETE',
    });
  },
};

// Dish Category (Resto Admin - Browse categories)
export const restaurantAdminDishCategoryApi = {
  list: async () => {
    return apiFetch<DishCategoryType[]>('/resto-admin/dish-cat/', {
      method: 'GET',
      validateWith: (data: unknown) => {
        if (Array.isArray(data)) {
          return data.map((item) => DishCategorySchema.parse(item));
        }
        if (data && typeof data === 'object' && 'data' in data) {
          const obj = data as Record<string, unknown>;
          if (Array.isArray(obj.data)) {
            return obj.data.map((item) => DishCategorySchema.parse(item));
          }
        }
        return [];
      },
    });
  },

  getById: async (dishCatID: string) => {
    return apiFetch<DishCategoryType>(`/resto-admin/dish-cat/${dishCatID}`, {
      method: 'GET',
      validateWith: (data: unknown): DishCategoryType => {
        if (data && typeof data === 'object' && 'data' in data) {
          const wrapper = data as Record<string, unknown>;
          return DishCategorySchema.parse(wrapper.data);
        }
        return DishCategorySchema.parse(data);
      },
    });
  },
};

// Account Management (Resto Admin - Own account)
export const restaurantAdminAccountApi = {
  getInfo: async () => {
    return apiFetch('/resto-admin/account/info', {
      method: 'GET',
    });
  },

  updateInfo: async (input: Record<string, unknown>) => {
    return apiFetch('/resto-admin/account/info', {
      method: 'PUT',
      body: JSON.stringify(input),
    });
  },

  verifyPassword: async (password: string) => {
    return apiFetch('/resto-admin/account/verify-password', {
      method: 'POST',
      body: JSON.stringify({ password }),
    });
  },

  updatePassword: async (oldPassword: string, newPassword: string) => {
    return apiFetch('/resto-admin/account/password', {
      method: 'PUT',
      body: JSON.stringify({ oldPassword, newPassword }),
    });
  },
};

// Order Management (Resto Admin - Own restaurant orders)
export const restaurantAdminOrderApi = {
  list: async (page = 1, limit = 10) => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });
    return apiFetch(`/resto-admin/orders?${params}`, {
      method: 'GET',
      validateWith: (data: unknown) => {
        if (Array.isArray(data)) {
          return data;
        }
        if (data && typeof data === 'object' && 'data' in data) {
          const obj = data as Record<string, unknown>;
          if (Array.isArray(obj.data)) {
            return obj.data;
          }
        }
        return [];
      },
    });
  },

  getById: async (orderID: string) => {
    return apiFetch(`/resto-admin/order/${orderID}`, {
      method: 'GET',
    });
  },

  setInProcess: async (orderID: string) => {
    return apiFetch(`/resto-admin/order/in-process/${orderID}`, {
      method: 'PUT',
    });
  },

  setOnTheWay: async (orderID: string, input?: Record<string, unknown>) => {
    return apiFetch(`/resto-admin/order/otw/${orderID}`, {
      method: 'PUT',
      body: input ? JSON.stringify(input) : undefined,
    });
  },

  setDelivered: async (orderID: string) => {
    return apiFetch(`/resto-admin/order/delivered/${orderID}`, {
      method: 'PUT',
    });
  },

  setRejected: async (orderID: string) => {
    return apiFetch(`/resto-admin/order/rejected/${orderID}`, {
      method: 'PUT',
    });
  },

  setCancelled: async (orderID: string) => {
    return apiFetch(`/resto-admin/order/cancelled/${orderID}`, {
      method: 'PUT',
    });
  },
};

// Courier Management (Resto Admin)
export const restaurantAdminCourierApi = {
  list: async () => {
    return apiFetch('/resto-admin/couriers', {
      method: 'GET',
      validateWith: (data: unknown) => {
        if (Array.isArray(data)) {
          return data;
        }
        if (data && typeof data === 'object' && 'data' in data) {
          const obj = data as Record<string, unknown>;
          if (Array.isArray(obj.data)) {
            return obj.data;
          }
        }
        return [];
      },
    });
  },
};

// Opening Hours Management (Resto Admin)
export const restaurantAdminOpeningHourApi = {
  list: async () => {
    return apiFetch('/resto-admin/restaurant/opening-hour', {
      method: 'GET',
      validateWith: (data: unknown) => {
        if (Array.isArray(data)) {
          return data;
        }
        if (data && typeof data === 'object' && 'data' in data) {
          const obj = data as Record<string, unknown>;
          if (Array.isArray(obj.data)) {
            return obj.data;
          }
        }
        return [];
      },
    });
  },

  getById: async (id: string) => {
    return apiFetch(`/resto-admin/restaurant/opening-hour/${id}`, {
      method: 'GET',
    });
  },

  create: async (input: Record<string, unknown>[]) => {
    return apiFetch('/resto-admin/restaurant/opening-hour', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  },

  update: async (id: string, input: Record<string, unknown>) => {
    return apiFetch(`/api/v1/restaurant/opening-hour/${id}`, {
      method: 'PUT',
      body: JSON.stringify(input),
    });
  },

  delete: async (id: string) => {
    return apiFetch(`/resto-admin/restaurant/opening-hour/${id}`, {
      method: 'DELETE',
    });
  },
};
