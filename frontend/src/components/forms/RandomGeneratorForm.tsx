import React from 'react';
import { useForm } from 'react-hook-form';
import Select from '../common/Select';
import Input from '../common/Input';
import Button from '../common/Button';
import { useRandomGenerator } from '../../hooks/useRandomGenerator';

type FormValues = { type: 'guid' | 'person' | 'address' | 'numbers'; count?: number; min?: number; max?: number };

export const RandomGeneratorForm: React.FC = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormValues>({ defaultValues: { type: 'guid', count: 1, min: 0, max: 100 } });
  const { generateGuid, generatePerson, generateAddress, generateNumbers, generated, loading, error, clear } = useRandomGenerator();
  const type = watch('type');

  const onSubmit = (data: FormValues) => {
    clear();
    if (data.type === 'guid') generateGuid();
    else if (data.type === 'person') generatePerson();
    else if (data.type === 'address') generateAddress();
    else if (data.type === 'numbers') generateNumbers({ count: data.count || 1, min: data.min ?? 0, max: data.max ?? 100 });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Select id="type" label="Generator Type" options={[{ value: 'guid', label: 'GUID' }, { value: 'person', label: 'Person' }, { value: 'address', label: 'Address' }, { value: 'numbers', label: 'Numbers' }]} value={type} onChange={(v) => setValue('type', v as any)} />
      {type === 'numbers' && (
        <div>
          <Input name="count" type="number" placeholder="Count" {...register('count', { valueAsNumber: true, min: 1 })} />
          <Input name="min" type="number" placeholder="Min" {...register('min', { valueAsNumber: true })} />
          <Input name="max" type="number" placeholder="Max" {...register('max', { valueAsNumber: true })} />
        </div>
      )}
      <Button type="submit" disabled={loading}>{loading ? 'Generating...' : 'Generate'}</Button>
      {error && <div role="alert" style={{ color: 'red' }}>{String(error)}</div>}
      {generated && <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(generated, null, 2)}</pre>}
    </form>
  );
};

export default RandomGeneratorForm;
