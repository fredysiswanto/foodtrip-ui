import { useQuery } from '@tanstack/react-query';
import { dishApi } from '@foodtrip/api';

export function useDishDetail(id: string) {
  return useQuery({
    queryKey: ['admin', 'dish', 'detail', id],
    queryFn: () => dishApi.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
