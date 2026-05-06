import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dishApi } from '@foodtrip/api';
import { CreateDishInputType } from '@foodtrip/types';

interface UpdateDishParams {
  id: string;
  data: CreateDishInputType;
}

export function useUpdateDish() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateDishParams) => dishApi.update(id, data),
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
