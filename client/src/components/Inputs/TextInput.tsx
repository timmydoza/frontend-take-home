import { Flex, Text, TextField } from '@radix-ui/themes';
import React, { useId } from 'react';
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
  const reactId = useId();
  const inputId = `${reactId}-${name}`;
  const errorId = `${inputId}-error`;

  return (
    <Flex direction="column">
      {label && (
        <label htmlFor={inputId}>
          <Text weight="bold" size="2">
            {label}
          </Text>
        </label>
      )}
      <TextField.Root
        id={inputId}
        placeholder={placeholder}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        {...register(name, {
          required: required ? 'This field is required' : undefined,
        })}
        data-1p-ignore // Disables 1password helper
      >
        {icon && <TextField.Slot aria-hidden="true">{icon}</TextField.Slot>}
      </TextField.Root>

      {error && (
        <Text id={errorId} color="red" size="1">
          {String(error.message)}
        </Text>
      )}
    </Flex>
  );
};
