import React from 'react';

export interface InputProps {
  name: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  error?: string | null;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ name, value, onChange, placeholder, type = 'text', error }, ref) => {
    return (
      <div>
        <input
          id={name}
          name={name}
          ref={ref}
          value={value === undefined ? undefined : (value as any)}
          onChange={(e) => onChange?.(e)}
          placeholder={placeholder}
          type={type}
          aria-invalid={!!error}
          style={error ? { borderColor: 'red' } : undefined}
        />
        {error ? (
          <div role="alert" style={{ color: 'red' }}>
            {error}
          </div>
        ) : null}
      </div>
    );
  }
);

export default Input;
