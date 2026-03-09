import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'info' | 'success' | 'error' | 'warning';
  onDismiss: () => void;
  duration?: number;
}

const typeClass = {
  info: 'toast-info',
  success: 'toast-success',
  error: 'toast-error',
  warning: 'toast-warning',
};

const typeIcon = {
  info: '\u2139',
  success: '\u2713',
  error: '\u2715',
  warning: '\u26A0',
};

export function Toast({ message, type = 'info', onDismiss, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [onDismiss, duration]);

  return (
    <div className={`toast ${typeClass[type]}`}>
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0"
        style={{ background: 'rgba(255, 255, 255, 0.2)' }}
      >
        {typeIcon[type]}
      </div>
      <span>{message}</span>
      <button
        onClick={onDismiss}
        className="ml-auto opacity-70 hover:opacity-100 transition-opacity text-sm"
      >
        &#x2715;
      </button>
    </div>
  );
}
