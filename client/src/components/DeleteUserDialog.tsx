import { InfoCircledIcon } from '@radix-ui/react-icons';
import {
  AlertDialog,
  Box,
  Button,
  Callout,
  DropdownMenu,
  Flex,
} from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import type { User } from '../api/models';
import { useDeleteUserMutation } from '../api/users/hooks';

type DeleteUserProps = { user: User };
export const DeleteUserDialog = ({ user }: DeleteUserProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    mutate,
    isSuccess,
    reset: resetMutation,
    error,
    isPending,
  } = useDeleteUserMutation();

  useEffect(() => {
    if (isOpen) {
      resetMutation();
    }
  }, [isOpen, resetMutation]);

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
    }
  }, [isSuccess]);

  return (
    <AlertDialog.Root onOpenChange={setIsOpen} open={isOpen}>
      <AlertDialog.Trigger>
        <DropdownMenu.Item onSelect={(e) => e.preventDefault()}>
          Delete
        </DropdownMenu.Item>
      </AlertDialog.Trigger>

      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Delete User</AlertDialog.Title>
        <AlertDialog.Description size="2" mb="4">
          Are you sure? The user "{user.first} {user.last}" will be permanently
          deleted.
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray" disabled={isPending}>
              Cancel
            </Button>
          </AlertDialog.Cancel>

          <Button
            type="submit"
            loading={isPending}
            onClick={() => mutate(user.id)}
            color="red"
          >
            Delete Role
          </Button>
        </Flex>

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
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};
