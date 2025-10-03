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
import type { NewUser, User } from '../api/models';
import { useEffect, useState } from 'react';
import { RoleSelect } from './Inputs/RoleSelect';
import { useUpdateUserMutation } from '../api/users/hooks';

type UpdateUserProps = { user: User };
export const UpdateUserDialog = ({ user }: UpdateUserProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<NewUser>({ defaultValues: user });

  const {
    mutate,
    isSuccess,
    reset: resetMutation,
    error,
    isPending,
  } = useUpdateUserMutation();

  useEffect(() => {
    if (isOpen) {
      form.reset(user);
      resetMutation();
    }
  }, [form, isOpen, resetMutation, user]);

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
              mutate({ userId: user.id, user: formData })
            )}
          >
            <Dialog.Title>Update User</Dialog.Title>
            <Dialog.Description size="2" mb="4">
              Update an existing user.
            </Dialog.Description>

            <Flex direction="column" gap="3">
              <TextInput name="first" label="First Name" required />
              <TextInput name="last" label="Last Name" required />
              <RoleSelect
                name="roleId"
                label="Role"
                placeholder="Select a role"
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
