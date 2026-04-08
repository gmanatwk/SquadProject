import React from 'react';

export const ErrorToast: React.FC<{message?: string; onClose?: () => void}> = ({ message, onClose }) => {
  if (!message) return null;
  return (
    <div role="alert" aria-live="assertive" style={{ background: '#fee', color: '#900', padding: 12, borderRadius: 4 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>{message}</div>
        <button onClick={onClose} aria-label="Close error">X</button>
      </div>
    </div>
  );
};

export default ErrorToast;
