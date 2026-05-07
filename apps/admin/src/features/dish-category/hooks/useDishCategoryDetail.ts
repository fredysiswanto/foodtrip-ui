import { useQuery } from '@tanstack/react-query';
import { dishCategoryApi } from '@foodtrip/api';

export function useDishCategoryDetail(id?: string) {
  return useQuery({
    queryKey: ['admin', 'dish-category', 'detail', id],
    queryFn: async () => {
      if (!id) throw new Error('Category ID is required');
      try {
        const result = await dishCategoryApi.getById(id);
        return result;
      } catch (error) {
        console.error('useDishCategoryDetail - API error:', error);
        throw error;
      }
    },
    enabled: !!id,
  });
}
