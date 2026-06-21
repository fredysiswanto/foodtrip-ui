import { useQuery } from '@tanstack/react-query';
import { adminRestaurantApi } from '@foodtrip/api';

export function useRestaurantDetail(id: string) {
  return useQuery({
    queryKey: ['admin', 'restaurant', 'detail', id],
    queryFn: () => adminRestaurantApi.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
