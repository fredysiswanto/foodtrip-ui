import { useQuery } from '@tanstack/react-query';
import { restaurantApi } from '@foodtrip/api';

interface RestaurantListParams {
  page?: number;
  limit?: number;
}

export function useRestaurantList(params?: RestaurantListParams) {
  const { page = 1, limit = 10 } = params || {};
  return useQuery({
    queryKey: ['admin', 'restaurant', 'list', { page, limit }],
    queryFn: async () => {
      try {
        const result = await restaurantApi.list(page, limit);

        return result;
      } catch (error) {
        console.error('useRestaurantList - API error:', error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
  });
}
