import React from 'react';

export const LoadingSpinner: React.FC<{size?: number}> = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 50 50"
    aria-hidden
    style={{ verticalAlign: 'middle' }}
  >
    <circle
      cx="25"
      cy="25"
      r="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeDasharray="31.4 31.4"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 25 25"
        to="360 25 25"
        dur="1s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);

export default LoadingSpinner;
