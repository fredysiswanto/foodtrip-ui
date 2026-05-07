import { useQuery } from '@tanstack/react-query';
import { dishCategoryApi } from '@foodtrip/api';

interface DishCategoryListParams {
  page?: number;
  limit?: number;
}

export function useDishCategoryList(params?: DishCategoryListParams) {
  const { page = 1, limit = 10 } = params || {};

  return useQuery({
    queryKey: ['admin', 'dish-category', 'list', { page, limit }],
    queryFn: async () => {
      try {
        const result = await dishCategoryApi.list(page, limit);
        return result;
      } catch (error) {
        console.error('useDishCategoryList - API error:', error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
  });
}
