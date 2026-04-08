import React from 'react';
import RandomGeneratorForm from '../components/forms/RandomGeneratorForm';
import { useRandomGenerator } from '../hooks/useRandomGenerator';

const RandomGeneratorPage: React.FC = () => {
  const { generated, loading, error } = useRandomGenerator();

  const copy = async () => {
    if (!generated) return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(generated));
    } catch {
      // ignore
    }
  };

  return (
    <div>
      <h1>Random Generator</h1>
      <RandomGeneratorForm />
      {loading && <div>Loading...</div>}
      {error && <div role="alert">{String(error)}</div>}
      {generated && (
        <div>
          <h2>Generated</h2>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(generated, null, 2)}</pre>
          <button onClick={copy}>Copy</button>
        </div>
      )}
    </div>
  );
};

export default RandomGeneratorPage;
