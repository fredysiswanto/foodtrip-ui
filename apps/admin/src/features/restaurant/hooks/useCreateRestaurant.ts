import { useMutation, useQueryClient } from '@tanstack/react-query';
import { restaurantApi } from '@foodtrip/api';
import { CreateRestaurantInputType } from '@foodtrip/types';

export function useCreateRestaurant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRestaurantInputType) => restaurantApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['admin', 'restaurant', 'list'],
      });
    },
  });
}
