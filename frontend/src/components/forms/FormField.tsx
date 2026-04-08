import React from 'react';
import { Controller } from 'react-hook-form';
import Input from '../common/Input';

export type FormFieldProps = {
  name: string;
  label?: string;
  control?: any; // keep generic to avoid coupling here
  rules?: any;
};

export const FormField: React.FC<FormFieldProps> = ({ name, label, control, rules }) => {
  // When control is provided, render a Controller to integrate RHF
  if (!control) {
    return (
      <div>
        {label && <label htmlFor={name}>{label}</label>}
        <Input name={name} />
      </div>
    );
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <div>
          {label && <label htmlFor={name}>{label}</label>}
          <Input {...(field as any)} />
        </div>
      )}
    />
  );
};

export default FormField;
