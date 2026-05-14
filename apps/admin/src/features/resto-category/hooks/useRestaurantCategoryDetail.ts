import { useQuery } from '@tanstack/react-query';
import { restaurantCategoryApi } from '@foodtrip/api';

export function useRestaurantCategoryDetail(id?: string) {
  return useQuery({
    queryKey: ['admin', 'restaurant-category', 'detail', id],
    queryFn: async () => {
      if (!id) throw new Error('Category ID is required');
      try {
        const result = await restaurantCategoryApi.getById(id);
        return result;
      } catch (error) {
        console.error('useRestaurantCategoryDetail - API error:', error);
        throw error;
      }
    },
    enabled: !!id,
  });
}
