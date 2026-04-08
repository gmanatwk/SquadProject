import React from 'react';

export interface InputProps {
  name: string;
  value?: string | number;
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: string;
  error?: string | null;
}

export const Input: React.FC<InputProps> = ({
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
  error,
}) => {
  return (
    <div>
      <input
        id={name}
        name={name}
        value={value as any ?? ''}
        onChange={(e) => onChange?.(e.target.value)}
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
};

export default Input;
