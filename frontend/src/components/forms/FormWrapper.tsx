import React from 'react';
import { UseFormReturn } from 'react-hook-form';

export type FormWrapperProps<T> = {
  methods?: UseFormReturn<T>;
  onSubmit?: (data: T) => void;
  children: React.ReactNode;
};

export function FormWrapper<T>({ methods, onSubmit, children }: FormWrapperProps<T>) {
  // This is a small wrapper to provide consistent form layout.
  // If `methods` (react-hook-form) is provided, consumer should call methods.handleSubmit.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire to methods.handleSubmit when provided
    // Example: methods?.handleSubmit(onSubmit as any)(e)
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {children}
    </form>
  );
}

export default FormWrapper;
