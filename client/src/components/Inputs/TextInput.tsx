import { Text, TextField } from '@radix-ui/themes';
import type React from 'react';
import { useFormContext } from 'react-hook-form';

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
  const { register, getFieldState } = useFormContext();

  const { error } = getFieldState(name);

  return (
    <TextField.Root placeholder={placeholder} {...register(name, { required })}>
      {label}
      {icon && <TextField.Slot>{icon}</TextField.Slot>}
      {error && <Text>I'm an error!</Text>}
    </TextField.Root>
  );
};
