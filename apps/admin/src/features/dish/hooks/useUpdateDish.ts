import { useMutation, useQueryClient } from '@tanstack/react-query';
import { restaurantApi } from '@foodtrip/api';
import { UpdateDishInputType } from '../types';

interface UpdateDishParams {
  id: string;
  data: UpdateDishInputType;
}

export function useUpdateDish() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateDishParams) =>
      restaurantApi.update(id, data),
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
