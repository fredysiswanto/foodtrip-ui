import { useQuery } from '@tanstack/react-query';
import { adminDishApi } from '@foodtrip/api';

interface DishListParams {
  page?: number;
  limit?: number;
}

export function useDishList(params?: DishListParams) {
  const { page = 1, limit = 10 } = params || {};
  return useQuery({
    queryKey: ['admin', 'dishes', 'list', { page, limit }],
    queryFn: async () => {
      try {
        const result = await adminDishApi.list();

        return result;
      } catch (error) {
        console.error('useDishList - API error:', error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
  });
}
