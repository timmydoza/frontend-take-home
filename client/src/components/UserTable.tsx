import {
  Avatar,
  DropdownMenu,
  Flex,
  IconButton,
  Table,
} from '@radix-ui/themes';
import type { Role, User } from '../api/models';
import { TableSkeletonRows } from './TableSkeletonRows';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { UpdateUserDialog } from './UpdateUserDialog';
import { DeleteUserDialog } from './DeleteUserDialog';

type UserTableProps = {
  users: User[] | undefined;
  isLoading: boolean;
  rolesMap: Record<string, Role> | undefined;
  pagination: React.ReactNode;
};
export const UserTable = ({
  users,
  rolesMap,
  pagination,
  isLoading,
}: UserTableProps) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>User</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Joined</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {isLoading && <TableSkeletonRows columns={4} />}
        {!isLoading &&
          users?.map((user) => {
            const name = `${user.first} ${user.last}`;
            const role = rolesMap?.[user.roleId];
            const roleName = role?.name;
            const dateJoined = new Date(user.createdAt).toLocaleString(
              'en-US',
              {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              }
            );

            return (
              <Table.Row key={user.id}>
                <Table.RowHeaderCell>
                  <Flex direction="row" gap="1rem">
                    <Avatar
                      size="1"
                      src={user.photo}
                      radius="full"
                      fallback={user.first[0]} // First letter of name
                    />
                    {name}
                  </Flex>
                </Table.RowHeaderCell>
                <Table.Cell>{roleName}</Table.Cell>
                <Table.Cell>{dateJoined}</Table.Cell>
                <Table.Cell>
                  <Flex justify="end">
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger>
                        <IconButton variant="soft">
                          <DotsVerticalIcon />
                        </IconButton>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Content>
                        <UpdateUserDialog user={user} />
                        <DeleteUserDialog user={user} />
                      </DropdownMenu.Content>
                    </DropdownMenu.Root>
                  </Flex>
                </Table.Cell>
              </Table.Row>
            );
          })}

        <Table.Row>
          <Table.Cell />
          <Table.Cell />
          <Table.Cell />
          <Table.Cell>{pagination}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  );
};
