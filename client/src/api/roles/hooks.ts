import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createRole,
  deleteRole,
  fetchAllRoles,
  fetchRoles,
  updateRole,
} from './api';

export const useQueryAllRoles = () =>
  useQuery({
    queryKey: ['roles', 'all'],
    queryFn: fetchAllRoles,
  });

export const useQueryRoles = (page: number, search: string) =>
  useQuery({
    queryKey: ['roles', page, search],
    queryFn: () => fetchRoles(page, search),
  });

export const useCreateRoleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
  });
};

export const useUpdateRoleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
  });
};

export const useDeleteRoleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
  });
};
