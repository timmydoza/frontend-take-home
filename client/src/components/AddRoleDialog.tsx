import { InfoCircledIcon, PlusIcon } from '@radix-ui/react-icons';
import { Box, Button, Callout, Dialog, Flex } from '@radix-ui/themes';
import { TextInput } from './Inputs/TextInput';
import { FormProvider, useForm } from 'react-hook-form';
import type { NewRole } from '../api/models';
import { useEffect, useState } from 'react';
import { useCreateRoleMutation } from '../api/roles/hooks';
import { SelectInput } from './Inputs/SelectInput';

type FormData = {
  name: string;
  description: string;
  isDefault: string;
};
const defaultValues: FormData = {
  name: '',
  description: '',
  isDefault: 'false',
};

const mapFormToRole = (role: FormData): NewRole => ({
  ...role,
  isDefault: role.isDefault === 'true',
});

export const AddRoleDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<FormData>({ defaultValues });

  const {
    mutate,
    isSuccess,
    reset: resetMutation,
    error,
    isPending,
  } = useCreateRoleMutation();

  useEffect(() => {
    if (isOpen) {
      form.reset(defaultValues);
      resetMutation();
    }
  }, [form, isOpen, resetMutation]);

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
    }
  }, [isSuccess]);

  return (
    <Dialog.Root onOpenChange={setIsOpen} open={isOpen}>
      <Dialog.Trigger>
        <Button>
          <PlusIcon />
          Add Role
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit((role) => mutate(mapFormToRole(role)))}
          >
            <Dialog.Title>Add Role</Dialog.Title>
            <Dialog.Description size="2" mb="4">
              Add a new role.
            </Dialog.Description>

            <Flex direction="column" gap="3">
              <TextInput name="name" label="Name" required />
              <TextInput name="description" label="Description" required />
              <SelectInput
                name="isDefault"
                label="Is Default?"
                options={[
                  { label: 'Yes', value: 'true' },
                  { label: 'No', value: 'false' },
                ]}
                required
              />
            </Flex>

            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close>
                <Button variant="soft" color="gray" disabled={isPending}>
                  Cancel
                </Button>
              </Dialog.Close>

              <Button type="submit" loading={isPending}>
                Save
              </Button>
            </Flex>
          </form>
        </FormProvider>
        {error && (
          <Box pt="1rem">
            <Callout.Root color="red">
              <Callout.Icon>
                <InfoCircledIcon />
              </Callout.Icon>
              <Callout.Text>{error?.message}</Callout.Text>
            </Callout.Root>
          </Box>
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
};
