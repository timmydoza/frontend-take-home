import { MagnifyingGlassIcon, PlusIcon } from '@radix-ui/react-icons';
import { Box, Button, Flex } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { TextInput } from './Inputs/TextInput';
import { fetchRoles } from '../api/api';
import { RolesTable } from './RolesTable';

export const RolesTab = () => {
  const rolesData = useQuery({
    queryKey: ['roles'],
    queryFn: () => fetchRoles(),
  });

  const isLoading = !rolesData.data;

  if (rolesData.error) throw rolesData.error; // Fatal error - to be caught by ErrorBoundary

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
          Add Role
        </Button>
      </Flex>
      <Box>
        <RolesTable roles={rolesData.data?.data} isLoading={isLoading} />
      </Box>
    </Box>
  );
};
