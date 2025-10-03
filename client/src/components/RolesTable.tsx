import { Table } from '@radix-ui/themes';
import type { Role } from '../api/models';
import { TableSkeleton } from './TableSkeleton';

type RoleTableProps = {
  roles: Role[] | undefined;
  isLoading: boolean;
};
export const RolesTable = ({ roles }: RoleTableProps) => {
  if (!roles) return <TableSkeleton />;

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Is Default</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Created Date</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {roles.map((role) => {
          const dateJoined = new Date(role.createdAt).toLocaleString();

          return (
            <Table.Row key={role.id}>
              <Table.RowHeaderCell>{role.name}</Table.RowHeaderCell>
              <Table.Cell>{String(role.isDefault).toUpperCase()}</Table.Cell>
              <Table.Cell>{dateJoined}</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
};
