import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminRestaurantApi } from '@foodtrip/api';
import { CreateRestaurantInputType } from '@foodtrip/types';

export function useCreateRestaurant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRestaurantInputType) =>
      adminRestaurantApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['admin', 'restaurant', 'list'],
      });
    },
  });
}
