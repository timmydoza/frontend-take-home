import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addUser, fetchUsers } from './api';

export const useQueryUsers = (page: number, search: string) =>
  useQuery({
    queryKey: ['users', page, search],
    queryFn: () => fetchUsers(page, search),
  });

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
