import { DropdownMenu, Flex, IconButton, Table } from '@radix-ui/themes';
import type { Role } from '../api/models';
import { TableSkeletonRows } from './TableSkeletonRows';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { UpdateRoleDialog } from './UpdateRoleDialog';
import { DeleteRoleDialog } from './DeleteRoleDialog';

type RoleTableProps = {
  roles: Role[] | undefined;
  isLoading: boolean;
  pagination: React.ReactNode;
};
export const RolesTable = ({
  roles,
  pagination,
  isLoading,
}: RoleTableProps) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Is&nbsp;Default</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Created Date</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {isLoading && <TableSkeletonRows columns={5} />}
        {!isLoading &&
          roles?.map((role) => {
            const dateJoined = new Date(role.createdAt).toLocaleString(
              'en-US',
              {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              }
            );

            return (
              <Table.Row key={role.id}>
                <Table.RowHeaderCell>{role.name}</Table.RowHeaderCell>
                <Table.Cell>{String(role.isDefault).toUpperCase()}</Table.Cell>
                <Table.Cell>{role.description}</Table.Cell>
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
                        <UpdateRoleDialog role={role} />
                        <DeleteRoleDialog role={role} />
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
