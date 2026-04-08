import { useForm as rhfUseForm, UseFormReturn } from 'react-hook-form';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';

export const useForm = <T,>(options?: Parameters<typeof rhfUseForm>[0]): UseFormReturn<T> => {
  // Thin wrapper for creating RHF forms with project defaults
  return rhfUseForm<T>(options as any);
};

export const useFormSubmit = () => {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback((fn: (...args: any[]) => void) => {
    return (...args: any[]) => {
      // dispatch common form events or analytics here
      fn(...args);
    };
  }, [dispatch]);
};

export default useForm;
