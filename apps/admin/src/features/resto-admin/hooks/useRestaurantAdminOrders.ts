/**
 * Restaurant Admin - Order Management Hooks
 * For managing orders and their statuses
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { restaurantAdminOrderApi } from '@foodtrip/api';

/**
 * Fetch all orders for restaurant admin's restaurant
 */
export function useRestaurantAdminOrdersList(page = 1, limit = 10) {
  return useQuery({
    queryKey: ['restaurant-admin', 'orders', 'list', page, limit],
    queryFn: () => restaurantAdminOrderApi.list(page, limit),
    staleTime: 2 * 60 * 1000, // 2 minutes (orders change frequently)
    gcTime: 10 * 60 * 1000,
    retry: 2,
  });
}

/**
 * Fetch single order detail
 */
export function useRestaurantAdminOrderDetail(orderId: string) {
  return useQuery({
    queryKey: ['restaurant-admin', 'order', 'detail', orderId],
    queryFn: () => restaurantAdminOrderApi.getById(orderId),
    enabled: !!orderId,
    staleTime: 1 * 60 * 1000, // 1 minute
    gcTime: 10 * 60 * 1000,
  });
}

/**
 * Set order status to "In Process"
 */
export function useRestaurantAdminSetOrderInProcess() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: string) =>
      restaurantAdminOrderApi.setInProcess(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['restaurant-admin', 'orders'],
      });
    },
  });
}

/**
 * Set order status to "On The Way"
 */
export function useRestaurantAdminSetOrderOnTheWay() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { orderId: string; data?: Record<string, unknown> }) =>
      restaurantAdminOrderApi.setOnTheWay(params.orderId, params.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['restaurant-admin', 'orders'],
      });
    },
  });
}

/**
 * Set order status to "Delivered"
 */
export function useRestaurantAdminSetOrderDelivered() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: string) =>
      restaurantAdminOrderApi.setDelivered(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['restaurant-admin', 'orders'],
      });
    },
  });
}

/**
 * Set order status to "Rejected"
 */
export function useRestaurantAdminSetOrderRejected() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: string) =>
      restaurantAdminOrderApi.setRejected(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['restaurant-admin', 'orders'],
      });
    },
  });
}

/**
 * Set order status to "Cancelled"
 */
export function useRestaurantAdminSetOrderCancelled() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: string) =>
      restaurantAdminOrderApi.setCancelled(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['restaurant-admin', 'orders'],
      });
    },
  });
}
