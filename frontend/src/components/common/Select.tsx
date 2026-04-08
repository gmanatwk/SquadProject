import React from 'react';

export type Option = { value: string; label: string };

export interface SelectProps {
  id: string;
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  options: Option[];
  disabled?: boolean;
  error?: string | null;
}

export const Select: React.FC<SelectProps> = ({ id, label, value, onChange, options, disabled, error }) => {
  return (
    <div style={{ marginBottom: 8 }}>
      {label && (
        <label htmlFor={id} style={{ display: 'block', marginBottom: 4 }}>
          {label}
        </label>
      )}
      <select
        id={id}
        aria-invalid={!!error}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
      >
        <option value="">-- select --</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {error && (
        <div role="alert" style={{ color: 'red', marginTop: 4 }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default Select;
