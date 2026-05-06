import { ReactNode } from 'react';

export interface ToastProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function Toast({
  type = 'info',
  title,
  message,
  action,
  className = '',
}: ToastProps) {
  const typeStyles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  const iconStyles = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  return (
    <div
      className={`flex gap-3 p-4 rounded-lg border ${typeStyles[type]} ${className}`.trim()}
      role="alert"
    >
      <span className="text-xl flex-shrink-0">{iconStyles[type]}</span>
      <div className="flex-1 min-w-0">
        {title && <p className="font-semibold">{title}</p>}
        <p className="text-sm">{message}</p>
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className="text-sm font-medium underline hover:opacity-80 flex-shrink-0"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
