import { useQuery } from '@tanstack/react-query';
import { restaurantCategoryApi } from '@foodtrip/api';

interface RestaurantCategoryListParams {
  page?: number;
  limit?: number;
}

export function useRestaurantCategoryList(
  params?: RestaurantCategoryListParams
) {
  const { page = 1, limit = 10 } = params || {};

  return useQuery({
    queryKey: ['admin', 'restaurant-category', 'list', { page, limit }],
    queryFn: async () => {
      try {
        const result = await restaurantCategoryApi.list(page, limit);
        return result;
      } catch (error) {
        console.error('useRestaurantCategoryList - API error:', error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
  });
}
