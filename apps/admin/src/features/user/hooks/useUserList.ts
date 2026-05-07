import { useQuery } from '@tanstack/react-query';
import { userApi } from '@foodtrip/api';

export interface UserListParams {
  typeUser: 'admin' | 'resto-admin' | 'customer';
  page?: number;
  limit?: number;
}

export function useUserList({
  typeUser,
  page = 1,
  limit = 10,
}: UserListParams) {
  return useQuery({
    queryKey: ['admin', 'user', 'list', { typeUser, page, limit }],
    queryFn: () => userApi.list(typeUser, page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
}
