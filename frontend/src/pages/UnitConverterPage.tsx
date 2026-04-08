import React from 'react';
import UnitConversionForm from '../components/forms/UnitConversionForm';
import { useUnitConversion } from '../hooks/useUnitConversion';
import LoadingSpinner from '../components/common/LoadingSpinner';

const UnitConverterPage: React.FC = () => {
  const { result, loading, error, clearResult } = useUnitConversion();

  return (
    <div>
      <h1>Unit Converter</h1>
      <UnitConversionForm />
      {loading && <LoadingSpinner />}
      {error && <div role="alert">{String(error)}</div>}
      {result && (
        <div>
          <h2>Result</h2>
          <div>{result.result}</div>
          <button onClick={clearResult}>Clear</button>
        </div>
      )}
    </div>
  );
};

export default UnitConverterPage;
