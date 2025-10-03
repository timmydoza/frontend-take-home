import { Flex, Text, TextField } from '@radix-ui/themes';
import type React from 'react';
import { useFormContext, useFormState } from 'react-hook-form';

type TextInputProps = {
  name: string;
  placeholder?: string;
  label?: string;
  icon?: React.ReactNode;
  required?: boolean;
};
export const TextInput = ({
  name,
  label,
  placeholder,
  icon,
  required = false,
}: TextInputProps) => {
  const { register } = useFormContext();

  const { errors } = useFormState({ name });

  const error = errors[name];

  return (
    <Flex direction="column">
      {label && (
        <label>
          <Text weight="bold">{label}</Text>
        </label>
      )}
      <TextField.Root
        placeholder={placeholder}
        {...register(name, {
          required: required ? 'This field is required' : undefined,
        })}
        data-1p-ignore // Disables 1password helper
      >
        {icon && <TextField.Slot>{icon}</TextField.Slot>}
      </TextField.Root>

      {error && (
        <Text color="red" size="1">
          {String(error.message)}
        </Text>
      )}
    </Flex>
  );
};
