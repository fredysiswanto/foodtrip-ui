import { useQuery } from '@tanstack/react-query';
import { restaurantApi } from '@foodtrip/api';
import { Restaurant } from '@foodtrip/types';

export function useRestaurantDetail(id: string) {
  return useQuery({
    queryKey: ['admin', 'restaurant', 'detail', id],
    queryFn: () => restaurantApi.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
