import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: { width: '16px', height: '16px' },
  md: { width: '24px', height: '24px' },
  lg: { width: '32px', height: '32px' },
};

export function Spinner({ size = 'md' }: SpinnerProps) {
  const dim = sizeMap[size];
  return (
    <div
      style={{
        ...dim,
        borderRadius: '50%',
        border: '3px solid #111214',
        borderTopColor: '#14b8a6',
        animation: 'spin 1s linear infinite',
      }}
    />
  );
}
