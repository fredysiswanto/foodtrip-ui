/**
 * System Admin - Dashboard Hooks
 * Provides aggregated data for admin dashboard (overview of all restaurants, users, orders)
 */

import { useQuery } from '@tanstack/react-query';
import { adminRestaurantApi, adminDishApi, adminUserApi } from '@foodtrip/api';

/**
 * Fetch all restaurants for admin overview
 */
export function useAdminRestaurantsList(page = 1, limit = 10) {
  return useQuery({
    queryKey: ['admin', 'restaurants', 'list', page, limit],
    queryFn: () => adminRestaurantApi.list(page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
}

/**
 * Fetch all dishes for admin overview
 */
export function useAdminDishesList(page = 1, limit = 10) {
  return useQuery({
    queryKey: ['admin', 'dishes', 'list', page, limit],
    queryFn: () => adminDishApi.list(page, limit),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
  });
}

/**
 * Fetch all resto admins for admin management
 */
export function useAdminRestoAdminsList(page = 1, limit = 10) {
  return useQuery({
    queryKey: ['admin', 'users', 'resto-admin', 'list', page, limit],
    queryFn: () => adminUserApi.listRestoAdmins(page, limit),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
  });
}

/**
 * Fetch all customers for admin management
 */
export function useAdminCustomersList(page = 1, limit = 10) {
  return useQuery({
    queryKey: ['admin', 'users', 'customer', 'list', page, limit],
    queryFn: () => adminUserApi.listCustomers(page, limit),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
  });
}

/**
 * Fetch all admins for admin management
 */
export function useAdminAdminsList(page = 1, limit = 10) {
  return useQuery({
    queryKey: ['admin', 'users', 'admin', 'list', page, limit],
    queryFn: () => adminUserApi.listAdmins(page, limit),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
  });
}

/**
 * Fetch single restaurant detail for admin
 */
export function useAdminRestaurantDetail(restaurantId: string) {
  return useQuery({
    queryKey: ['admin', 'restaurant', 'detail', restaurantId],
    queryFn: () => adminRestaurantApi.getById(restaurantId),
    enabled: !!restaurantId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

/**
 * Fetch single user detail for admin
 */
export function useAdminRestoAdminDetail(restoAdminId: string) {
  return useQuery({
    queryKey: ['admin', 'user', 'resto-admin', 'detail', restoAdminId],
    queryFn: () => adminUserApi.getRestoAdminById(restoAdminId),
    enabled: !!restoAdminId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

export function useAdminCustomerDetail(customerId: string) {
  return useQuery({
    queryKey: ['admin', 'user', 'customer', 'detail', customerId],
    queryFn: () => adminUserApi.getCustomerById(customerId),
    enabled: !!customerId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

export function useAdminAdminDetail(adminId: string) {
  return useQuery({
    queryKey: ['admin', 'user', 'admin', 'detail', adminId],
    queryFn: () => adminUserApi.getAdminById(adminId),
    enabled: !!adminId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
