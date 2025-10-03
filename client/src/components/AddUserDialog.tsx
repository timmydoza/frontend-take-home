import { PlusIcon } from '@radix-ui/react-icons';
import { Button, Dialog, Flex } from '@radix-ui/themes';
import { TextInput } from './Inputs/TextInput';
import { FormProvider, useForm } from 'react-hook-form';
import type { NewUser } from '../api/models';
import { useEffect, useState } from 'react';
import { RoleSelect } from './Inputs/RoleSelect';
import { useCreateUserMutation } from '../api/users/hooks';

const defaultValues: NewUser = { first: '', last: '', roleId: '' };

export const AddUserDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<NewUser>({ defaultValues });

  const {
    mutate,
    reset: mutationReset,
    isSuccess,
    isPending,
  } = useCreateUserMutation();

  // Can't use whole mutation obj as a dep here since its reference changes on
  // reset - causing an infinite loop here. Need to destructure mutationReset
  useEffect(() => {
    if (isOpen) {
      form.reset(defaultValues);
      mutationReset();
    }
  }, [form, isOpen, mutationReset]);

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
    }
  }, [isSuccess, setIsOpen]);

  return (
    <Dialog.Root onOpenChange={setIsOpen} open={isOpen}>
      <Dialog.Trigger>
        <Button>
          <PlusIcon />
          Add User
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit((user) => mutate(user))}>
            <Dialog.Title>Add User</Dialog.Title>
            <Dialog.Description size="2" mb="4">
              Add a new user.
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
      </Dialog.Content>
    </Dialog.Root>
  );
};
