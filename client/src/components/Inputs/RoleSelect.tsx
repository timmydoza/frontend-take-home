import { SelectInput, type SelectInputProps } from './SelectInput';
import { Skeleton } from '@radix-ui/themes';
import { useMemo } from 'react';
import { useAllRolesQuery } from '../../api/roles/hooks';

type RoleSelectProps = Omit<SelectInputProps, 'options'>;
export const RoleSelect = (props: RoleSelectProps) => {
  const allRolesData = useAllRolesQuery();

  const options = useMemo(
    () =>
      allRolesData.data?.map((role) => ({
        label: role.name,
        value: role.id,
      })) ?? [],
    [allRolesData.data]
  );

  if (!allRolesData.data) return <Skeleton />;

  return <SelectInput {...props} options={options} />;
};
