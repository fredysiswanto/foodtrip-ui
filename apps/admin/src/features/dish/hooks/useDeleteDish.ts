import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dishApi } from '@foodtrip/api';

export function useDeleteDish() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => dishApi.delete(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ['admin', 'dish', 'list'],
      });
      queryClient.invalidateQueries({
        queryKey: ['admin', 'dish', 'detail', id],
      });
    },
  });
}
