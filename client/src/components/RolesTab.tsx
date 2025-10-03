import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Box, Button, Flex } from '@radix-ui/themes';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { TextInput } from './Inputs/TextInput';
import { RolesTable } from './RolesTable';
import { useState } from 'react';
import { AddRoleDialog } from './AddRoleDialog';
import { useQueryRoles } from '../api/roles/hooks';

export const RolesTab = () => {
  const form = useForm();
  const [page, setPage] = useState(1);
  const search = useWatch({ control: form.control, name: 'userName' });

  const rolesData = useQueryRoles(page, search);

  const isLoading = !rolesData.data;

  if (rolesData.error) throw rolesData.error; // Fatal error - to be caught by ErrorBoundary

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
        <AddRoleDialog />
      </Flex>
      <Box>
        <RolesTable roles={rolesData.data?.data} isLoading={isLoading} />
        <Button
          disabled={isLoading || page === 1}
          onClick={() => setPage((prev) => Math.min(prev - 1, 0))}
        >
          Previous
        </Button>
        <Button
          disabled={isLoading || page === rolesData.data?.pages}
          onClick={() => setPage((prev) => Math.max(prev + 1, 0))}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};
