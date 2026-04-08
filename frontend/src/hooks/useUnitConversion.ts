import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { convertUnits as convertThunk, clearResult as clearResultAction, selectResult, selectLoading, selectError } from '../store/slices/converterSlice';

export function useUnitConversion() {
  const dispatch = useDispatch<AppDispatch>();
  const result = useSelector((s: RootState) => selectResult(s));
  const loading = useSelector((s: RootState) => selectLoading(s));
  const error = useSelector((s: RootState) => selectError(s));

  const convert = useCallback((fromValue: number, fromUnit: string, toUnit: string) => {
    return dispatch(convertThunk({ fromValue, fromUnit, toUnit }));
  }, [dispatch]);

  const clearResult = useCallback(() => dispatch(clearResultAction()), [dispatch]);

  return { result, loading, error, convert, clearResult } as const;
}
