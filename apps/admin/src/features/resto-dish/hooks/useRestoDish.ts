import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { restaurantAdminDishApi } from '@foodtrip/api';
import { CreateDishInputType } from '@foodtrip/types';

interface DishListParams {
  page?: number;
  limit?: number;
}

interface UpdateDishParams {
  id: string;
  data: CreateDishInputType;
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

export function useRestoDishDetail(dishID: string) {
  return useQuery({
    queryKey: ['admin', 'dish', 'detail', dishID],
    queryFn: async () => {
      try {
        const result = await restaurantAdminDishApi.getById(dishID);

        return result;
      } catch (error) {
        console.error('useRestoDishDetail - API error:', error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
  });
}

export function useDeleteDish() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dishID: string) => {
      try {
        await restaurantAdminDishApi.delete(dishID);
      } catch (error) {
        console.error('useDeleteDish - API error:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'dish', 'list'] });
    },
  });
}

export function useRestoUpdateDish() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateDishParams) =>
      restaurantAdminDishApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: ['admin', 'dish', 'list'],
      });
      queryClient.invalidateQueries({
        queryKey: ['admin', 'dish', 'detail', id],
      });
    },
  });
}
