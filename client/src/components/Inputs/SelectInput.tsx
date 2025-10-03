import { Flex, Select, Text } from '@radix-ui/themes';
import { useEffect } from 'react';

import { useFormContext, useFormState, useWatch } from 'react-hook-form';

type Option = { label: string; value: string };

export type SelectInputProps = {
  name: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
  options: Option[];
};
export const SelectInput = ({
  name,
  label,
  placeholder,
  required = false,
  options,
}: SelectInputProps) => {
  const { register, setValue } = useFormContext();
  const value = useWatch({ name });

  const { errors } = useFormState({ name });

  const error = errors[name];

  useEffect(() => {
    register(name, {
      required: required ? 'This field is required' : undefined,
    });
  }, [register, name, required]);

  return (
    <Flex direction="column">
      {label && <label>{label}</label>}
      <Select.Root
        defaultValue={value}
        value={value}
        onValueChange={(value) =>
          setValue(name, value, { shouldValidate: true })
        }
      >
        <Select.Trigger placeholder={placeholder} />
        <Select.Content>
          {options.map((option) => (
            <Select.Item
              key={String(option.value)}
              value={String(option.value)}
            >
              {option.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>

      {error && <Text color="red">{String(error.message)}</Text>}
    </Flex>
  );
};
