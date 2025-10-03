import { MagnifyingGlassIcon, PlusIcon } from '@radix-ui/react-icons';
import { Box, Button, Flex } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { TextInput } from './Inputs/TextInput';
import { UserTable } from './UserTable';
import type { Role } from '../api/models';
import { fetchAllRoles, fetchUsers } from '../api/api';

export const UserTab = () => {
  const usersData = useQuery({
    queryKey: ['users'],
    queryFn: () => fetchUsers(),
  });

  const allRolesData = useQuery({
    queryKey: ['roles', 'all'],
    queryFn: fetchAllRoles,
  });

  const rolesMap = allRolesData.data?.reduce<Record<string, Role>>(
    (acc, role) => {
      acc[role.id] = role;
      return acc;
    },
    {}
  );

  const isLoading = !usersData.data || !allRolesData.data;

  if (usersData.error) throw usersData.error; // Fatal error - to be caught by ErrorBoundary

  const form = useForm();

  return (
    <Box>
      <Flex gap="1rem">
        <Box width="100%">
          <FormProvider {...form}>
            <TextInput
              name="userName"
              icon={<MagnifyingGlassIcon height="16" width="16" />}
            />
          </FormProvider>
        </Box>
        <Button disabled={isLoading}>
          <PlusIcon />
          Add User
        </Button>
      </Flex>
      <Box>
        <UserTable
          users={usersData.data?.data}
          rolesMap={rolesMap}
          isLoading={isLoading}
        />
      </Box>
    </Box>
  );
};
