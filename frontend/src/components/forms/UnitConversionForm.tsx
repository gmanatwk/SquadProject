import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useUnitConversion } from '../../hooks/useUnitConversion';
import Select from '../common/Select';
import Input from '../common/Input';
import Button from '../common/Button';
import { getSupportedUnits } from '../../services/unitConversionApi';

type FormValues = { fromValue: number; fromUnit: string; toUnit: string };

export const UnitConversionForm: React.FC = () => {
  const { register, handleSubmit, watch, setValue, control, formState: { errors } } = useForm<FormValues>({ defaultValues: { fromValue: 1, fromUnit: '', toUnit: '' } });
  const { result, loading, error, convert } = useUnitConversion();
  const [units, setUnits] = React.useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    const ac = new AbortController();
    getSupportedUnits(ac.signal)
      .then((u) => {
        const mapped = u.map((x) => ({ value: x.id, label: x.name }));
        setUnits(mapped);
        if (mapped.length > 0) {
          setValue('fromUnit', mapped[0].value);
          setValue('toUnit', mapped.length > 1 ? mapped[1].value : mapped[0].value);
        }
      })
      .catch(() => {})
      .finally(() => ac.abort());

    return () => ac.abort();
  }, []);

  const onSubmit = (data: FormValues) => {
    const from = data.fromUnit || units[0]?.value || 'm';
    const to = data.toUnit || (units.length > 1 ? units[1].value : units[0]?.value) || 'km';
    if (!from || !to || from === to) return;
    const value = data.fromValue ?? 1;
    convert(value, from, to);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="fromValue"
        control={control}
        rules={{ valueAsNumber: true, min: { value: 0.000001, message: 'Must be greater than 0' } }}
        render={({ field }) => (
          <Input name={field.name} type="number" placeholder="Value" value={field.value as any} onChange={field.onChange as any} ref={field.ref as any} error={errors.fromValue?.message as any} />
        )}
      />
      <Select id="fromUnit" label="From unit" options={units} value={watch('fromUnit')} onChange={(v) => setValue('fromUnit', v)} />
      <Select id="toUnit" label="To unit" options={units} value={watch('toUnit')} onChange={(v) => setValue('toUnit', v)} />
      <Button type="submit" disabled={loading}>{loading ? 'Converting...' : 'Convert'}</Button>
      {error && <div role="alert" style={{ color: 'red' }}>{String(error)}</div>}
      {result && <div>Result: {result.result}</div>}
    </form>
  );
};

export default UnitConversionForm;
