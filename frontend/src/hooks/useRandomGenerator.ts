import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { generateGuid, generatePerson, generateAddress, generateNumbers, clearGenerated, selectGenerated, selectLoading, selectError } from '../store/slices/generatorSlice';

export function useRandomGenerator() {
  const dispatch = useDispatch<AppDispatch>();
  const generated = useSelector((s: RootState) => selectGenerated(s));
  const loading = useSelector((s: RootState) => selectLoading(s));
  const error = useSelector((s: RootState) => selectError(s));

  return {
    generated,
    loading,
    error,
    generateGuid: useCallback(() => dispatch(generateGuid()), [dispatch]),
    generatePerson: useCallback(() => dispatch(generatePerson()), [dispatch]),
    generateAddress: useCallback(() => dispatch(generateAddress()), [dispatch]),
    generateNumbers: useCallback((params: { count: number; min: number; max: number }) => dispatch(generateNumbers(params)), [dispatch]),
    clear: useCallback(() => dispatch(clearGenerated()), [dispatch]),
  } as const;
}
