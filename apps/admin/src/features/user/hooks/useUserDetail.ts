import { useQuery } from '@tanstack/react-query';
import { userApi } from '@foodtrip/api';

export function useUserDetail(id?: string) {
  return useQuery({
    queryKey: ['admin', 'user', 'detail', id],
    queryFn: () => userApi.getById(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
