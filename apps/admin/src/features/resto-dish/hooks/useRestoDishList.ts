import { useQuery } from '@tanstack/react-query';
import { restaurantAdminDishApi } from '@foodtrip/api';

interface DishListParams {
  page?: number;
  limit?: number;
}

export function useRestoDishList(restoID: string, params?: DishListParams) {
  const { page = 1, limit = 10 } = params || {};
  return useQuery({
    queryKey: ['admin', 'dish', 'list', restoID, { page, limit }],
    queryFn: async () => {
      try {
        const result = await restaurantAdminDishApi.list(restoID, page, limit);

        return result;
      } catch (error) {
        console.error('useRestoDishList - API error:', error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
  });
}
