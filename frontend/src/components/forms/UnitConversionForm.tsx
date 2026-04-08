import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useUnitConversion } from '../../hooks/useUnitConversion';
import Select from '../common/Select';
import Input from '../common/Input';
import Button from '../common/Button';
import { getSupportedUnits } from '../../services/unitConversionApi';

type FormValues = { fromValue: number; fromUnit: string; toUnit: string };

export const UnitConversionForm: React.FC = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormValues>({ defaultValues: { fromValue: 1, fromUnit: '', toUnit: '' } });
  const { result, loading, error, convert } = useUnitConversion();
  const [units, setUnits] = React.useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    const ac = new AbortController();
    getSupportedUnits(ac.signal).then((u) => setUnits(u.map((x) => ({ value: x.id, label: x.name })))).catch(() => {}).finally(() => ac.abort());
    return () => ac.abort();
  }, []);

  const onSubmit = (data: FormValues) => {
    if (data.fromUnit === data.toUnit) return;
    convert(data.fromValue, data.fromUnit, data.toUnit);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input name="fromValue" type="number" placeholder="Value" {...(register('fromValue', { valueAsNumber: true, min: { value: 0.000001, message: 'Must be greater than 0' } }))} error={errors.fromValue?.message as any} />
      <Select id="fromUnit" label="From unit" options={units} value={watch('fromUnit')} onChange={(v) => setValue('fromUnit', v)} />
      <Select id="toUnit" label="To unit" options={units} value={watch('toUnit')} onChange={(v) => setValue('toUnit', v)} />
      <Button type="submit" disabled={loading}>{loading ? 'Converting...' : 'Convert'}</Button>
      {error && <div role="alert" style={{ color: 'red' }}>{String(error)}</div>}
      {result && <div>Result: {result.result}</div>}
    </form>
  );
};

export default UnitConversionForm;
