import React from "react";
import { TextField as UITextField } from '@hiiretail/synergy-ui';
import { Controller, useFormContext } from "react-hook-form";

type TextFieldProps = {
  name: string,
  label: string,
} & Record<string, unknown>

export const TextField: React.FC<TextFieldProps> = ({ name, label, ...otherProps }) => {
  const { formState: { errors }, control } = useFormContext();

  return (
    <Controller
      render={({ field }) =>
        <UITextField
          label={label}
          error={errors?.[name]?.message || (errors?.[name] && `The ${name} value is invalid!`)}
          fullWidth
          {...otherProps}
          {...field}
        />
      }
      name={name}
      control={control}
    />
  );
}
