import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Box, Button, Flex } from '@radix-ui/themes';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { TextInput } from './Inputs/TextInput';
import { UserTable } from './UserTable';
import type { Role } from '../api/models';
import { useEffect, useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { AddUserDialog } from './AddUserDialog';
import { useUsersQuery } from '../api/users/hooks';
import { useAllRolesQuery } from '../api/roles/hooks';

export const UserTab = () => {
  const form = useForm();
  const [page, setPage] = useState(1);
  const search = useWatch({ control: form.control, name: 'userName' });
  const debouncedSearch = useDebounce(search, 1000);

  const usersData = useUsersQuery(page, debouncedSearch);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const allRolesData = useAllRolesQuery();

  const rolesMap = allRolesData.data?.reduce<Record<string, Role>>(
    (acc, role) => {
      acc[role.id] = role;
      return acc;
    },
    {}
  );

  const isLoading = usersData.isLoading || allRolesData.isLoading;

  const error = usersData.error || allRolesData.error;
  if (error) throw error; // Fatal error - to be caught by ErrorBoundary

  return (
    <Box>
      <Flex gap="1rem" py="1rem">
        <Box width="100%">
          <FormProvider {...form}>
            <TextInput
              name="userName"
              placeholder="Search by name..."
              icon={<MagnifyingGlassIcon height="16" width="16" />}
            />
          </FormProvider>
        </Box>
        <AddUserDialog />
      </Flex>
      <Box pt="1rem">
        <UserTable
          users={usersData.data?.data}
          rolesMap={rolesMap}
          isLoading={isLoading}
          pagination={
            <Flex justify="end" gap="1rem">
              <Button
                disabled={isLoading || page === 1}
                onClick={() => setPage((prev) => prev - 1)}
              >
                Previous
              </Button>
              <Button
                disabled={isLoading || page === usersData.data?.pages}
                onClick={() => setPage((prev) => prev + 1)}
              >
                Next
              </Button>
            </Flex>
          }
        />
      </Box>
    </Box>
  );
};
