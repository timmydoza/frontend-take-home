import { Box, Skeleton, Table } from '@radix-ui/themes';

const rowsArray = new Array(8).fill('');

type TableSkeletonRows = { columns: number };
export const TableSkeletonRows = ({ columns }: TableSkeletonRows) => {
  const columnsArray = new Array(columns).fill('');

  return (
    <>
      {rowsArray.map(() => (
        <Table.Row>
          {columnsArray.map(() => (
            <Table.Cell>
              <Box py="0.8rem">
                <Skeleton />
              </Box>
            </Table.Cell>
          ))}
        </Table.Row>
      ))}
    </>
  );
};
