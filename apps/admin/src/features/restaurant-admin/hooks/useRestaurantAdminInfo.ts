/**
 * Restaurant Admin - Restaurant Info & Account Management Hooks
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  restaurantAdminRestaurantApi,
  restaurantAdminAccountApi,
} from '@foodtrip/api';
import { useAuth } from '../../auth/hooks/useAuth';

/**
 * Fetch restaurant admin's own restaurant info
 */
export function useRestaurantAdminOwnRestaurant() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['restaurant-admin', 'restaurant', 'own', user?.resto_id],
    queryFn: () => {
      if (!user?.resto_id) throw new Error('Restaurant ID not found');
      return restaurantAdminRestaurantApi.getOwn(user.resto_id);
    },
    enabled: !!user?.resto_id,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 20 * 60 * 1000,
    retry: 2,
  });
}

/**
 * Update restaurant admin's own restaurant info
 */
export function useRestaurantAdminUpdateRestaurant() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: (input: Record<string, unknown>) => {
      if (!user?.resto_id) throw new Error('Restaurant ID not found');
      return restaurantAdminRestaurantApi.updateOwn(user.resto_id, input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['restaurant-admin', 'restaurant', 'own'],
      });
    },
  });
}

/**
 * Fetch restaurant admin's account info
 */
export function useRestaurantAdminAccountInfo() {
  return useQuery({
    queryKey: ['restaurant-admin', 'account', 'info'],
    queryFn: () => restaurantAdminAccountApi.getInfo(),
    staleTime: 10 * 60 * 1000,
    gcTime: 20 * 60 * 1000,
    retry: 2,
  });
}

/**
 * Update restaurant admin's account info
 */
export function useRestaurantAdminUpdateAccountInfo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: Record<string, unknown>) =>
      restaurantAdminAccountApi.updateInfo(input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['restaurant-admin', 'account'],
      });
    },
  });
}

/**
 * Verify restaurant admin's password
 */
export function useRestaurantAdminVerifyPassword() {
  return useMutation({
    mutationFn: (password: string) =>
      restaurantAdminAccountApi.verifyPassword(password),
  });
}

/**
 * Update restaurant admin's password
 */
export function useRestaurantAdminUpdatePassword() {
  return useMutation({
    mutationFn: (params: { oldPassword: string; newPassword: string }) =>
      restaurantAdminAccountApi.updatePassword(
        params.oldPassword,
        params.newPassword
      ),
  });
}
