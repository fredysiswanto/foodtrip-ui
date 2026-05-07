/**
 * Restaurant Admin - Menu Management Hooks
 * For managing dishes in their restaurant
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  restaurantAdminDishApi,
  restaurantAdminDishCategoryApi,
} from '@foodtrip/api';
import { useAuth } from '../../auth/hooks/useAuth';

/**
 * Fetch all dishes for restaurant admin's restaurant
 */
export function useRestaurantAdminMenuList(page = 1, limit = 10) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['restaurant-admin', 'menu', 'list', user?.resto_id, page, limit],
    queryFn: () => {
      if (!user?.resto_id) throw new Error('Restaurant ID not found');
      return restaurantAdminDishApi.list(user.resto_id, page, limit);
    },
    enabled: !!user?.resto_id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
}

/**
 * Fetch all dish categories (for dropdown when creating/editing)
 */
export function useRestaurantAdminDishCategories() {
  return useQuery({
    queryKey: ['restaurant-admin', 'dish-categories'],
    queryFn: () => restaurantAdminDishCategoryApi.list(),
    staleTime: 10 * 60 * 1000, // Categories change rarely
    gcTime: 20 * 60 * 1000,
    retry: 2,
  });
}

/**
 * Fetch single dish detail
 */
export function useRestaurantAdminDishDetail(dishId: string) {
  return useQuery({
    queryKey: ['restaurant-admin', 'dish', 'detail', dishId],
    queryFn: () => restaurantAdminDishApi.getById(dishId),
    enabled: !!dishId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

/**
 * Create a new dish
 */
export function useRestaurantAdminCreateDish() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: Record<string, unknown>) =>
      restaurantAdminDishApi.create(input),
    onSuccess: () => {
      // Invalidate menu list
      queryClient.invalidateQueries({
        queryKey: ['restaurant-admin', 'menu', 'list'],
      });
    },
  });
}

/**
 * Update an existing dish
 */
export function useRestaurantAdminUpdateDish(dishId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: Record<string, unknown>) =>
      restaurantAdminDishApi.update(dishId, input),
    onSuccess: () => {
      // Invalidate both list and detail queries
      queryClient.invalidateQueries({
        queryKey: ['restaurant-admin', 'menu'],
      });
      queryClient.invalidateQueries({
        queryKey: ['restaurant-admin', 'dish'],
      });
    },
  });
}

/**
 * Delete a dish
 */
export function useRestaurantAdminDeleteDish() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dishId: string) => restaurantAdminDishApi.delete(dishId),
    onSuccess: () => {
      // Invalidate menu list
      queryClient.invalidateQueries({
        queryKey: ['restaurant-admin', 'menu', 'list'],
      });
    },
  });
}
