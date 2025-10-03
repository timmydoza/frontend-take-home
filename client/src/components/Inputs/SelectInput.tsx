import { Flex, Select, Text } from '@radix-ui/themes';
import { useEffect, useId } from 'react';
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

  const reactId = useId();
  const selectId = `${reactId}-${name}`;
  const errorId = `${selectId}-error`;

  useEffect(() => {
    register(name, {
      required: required ? 'This field is required' : undefined,
    });
  }, [register, name, required]);

  return (
    <Flex direction="column">
      {label && (
        <label htmlFor={selectId}>
          <Text weight="bold">{label}</Text>
        </label>
      )}
      <Select.Root
        value={value}
        onValueChange={(value) =>
          setValue(name, value, { shouldValidate: true })
        }
      >
        <Select.Trigger
          id={selectId}
          placeholder={placeholder}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
        />
        <Select.Content>
          {options.map((option) => (
            <Select.Item key={option.value} value={option.value}>
              {option.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>

      {error && (
        <Text id={errorId} color="red" size="1">
          {String(error.message)}
        </Text>
      )}
    </Flex>
  );
};
