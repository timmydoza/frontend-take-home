import { Flex, Table } from '@radix-ui/themes';
import type { Role, User } from '../api/models';
import { TableSkeleton } from './TableSkeleton';

type UserImageProps = {
  url: string;
  name: string;
};
const UserImage = ({ url, name }: UserImageProps) => {
  return (
    <Flex width="1.5rem">
      <img
        src={url}
        alt={`Profile photo for ${name}`}
        style={{ width: '100%', borderRadius: '100%' }}
      />
    </Flex>
  );
};

type UserTableProps = {
  users: User[] | undefined;
  isLoading: boolean;
  rolesMap: Record<string, Role> | undefined;
};
export const UserTable = ({ users, rolesMap }: UserTableProps) => {
  if (!users || !rolesMap) return <TableSkeleton />;

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>User</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Joined</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {users?.map((user) => {
          const name = `${user.first} ${user.last}`;
          const roleName = rolesMap[user.roleId].name;
          const dateJoined = new Date(user.createdAt).toLocaleString();

          return (
            <Table.Row key={user.id}>
              <Table.RowHeaderCell>
                <Flex direction="row" gap="1rem">
                  <UserImage url={user.photo} name={name} />
                  {name}
                </Flex>
              </Table.RowHeaderCell>
              <Table.Cell>{roleName}</Table.Cell>
              <Table.Cell>{dateJoined}</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
};
