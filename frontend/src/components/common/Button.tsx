import React from 'react';
import LoadingSpinner from './LoadingSpinner';

export type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  loading = false,
  type = 'button',
}) => {
  const isDisabled = disabled || loading;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      data-variant={variant}
      aria-busy={loading}
      style={{ opacity: isDisabled ? 0.6 : 1, padding: '8px 12px' }}
    >
      {loading ? (
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          <LoadingSpinner size={14} />
          <span style={{ marginLeft: 8 }}>Loading</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
