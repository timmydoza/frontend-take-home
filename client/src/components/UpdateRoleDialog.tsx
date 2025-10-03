import { InfoCircledIcon } from '@radix-ui/react-icons';
import {
  Box,
  Button,
  Callout,
  Dialog,
  DropdownMenu,
  Flex,
} from '@radix-ui/themes';
import { TextInput } from './Inputs/TextInput';
import { FormProvider, useForm } from 'react-hook-form';
import type { NewRole, Role } from '../api/models';
import { useEffect, useState } from 'react';
import { useUpdateRoleMutation } from '../api/roles/hooks';
import { SelectInput } from './Inputs/SelectInput';

type FormData = {
  name: string;
  description: string;
  isDefault: string;
};

const mapRoleToForm = (role: Role) => ({
  ...role,
  isDefault: String(role.isDefault),
});

const mapFormToRole = (role: FormData): NewRole => ({
  ...role,
  isDefault: role.isDefault === 'true',
});

type UpdateRoleProps = { role: Role };
export const UpdateRoleDialog = ({ role }: UpdateRoleProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<FormData>({ defaultValues: mapRoleToForm(role) });

  const {
    mutate,
    isSuccess,
    reset: resetMutation,
    error,
    isPending,
  } = useUpdateRoleMutation();

  useEffect(() => {
    if (isOpen) {
      form.reset(mapRoleToForm(role));
      resetMutation();
    }
  }, [form, isOpen, resetMutation, role]);

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
    }
  }, [isSuccess]);

  return (
    <Dialog.Root onOpenChange={setIsOpen} open={isOpen}>
      <Dialog.Trigger>
        <DropdownMenu.Item onSelect={(e) => e.preventDefault()}>
          Edit
        </DropdownMenu.Item>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit((formData) =>
              mutate({ roleId: role.id, role: mapFormToRole(formData) })
            )}
          >
            <Dialog.Title>Update Role</Dialog.Title>
            <Dialog.Description size="2" mb="4">
              Update an existing role.
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
