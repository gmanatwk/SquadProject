import React from 'react';

export type FormButtonProps = {
  isLoading?: boolean;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
};

export const FormButton: React.FC<FormButtonProps> = ({ isLoading = false, children, type = 'submit' }) => {
  return (
    <button type={type} disabled={isLoading} aria-busy={isLoading}>
      {isLoading ? 'Loading...' : children}
    </button>
  );
};

export default FormButton;
