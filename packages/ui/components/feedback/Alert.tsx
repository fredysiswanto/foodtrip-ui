import { useState, ReactNode } from 'react';

export interface AlertProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  children: ReactNode;
  onClose?: () => void;
  closeable?: boolean;
  className?: string;
}

export function Alert({
  type = 'info',
  title,
  children,
  onClose,
  closeable = true,
  className = '',
}: AlertProps) {
  const [isClosed, setIsClosed] = useState(false);

  if (isClosed) return null;

  const typeStyles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  const handleClose = () => {
    setIsClosed(true);
    onClose?.();
  };

  return (
    <div
      className={`flex gap-3 p-4 rounded-lg border ${typeStyles[type]} ${className}`.trim()}
      role="alert"
    >
      <div className="flex-1 min-w-0">
        {title && <p className="font-semibold">{title}</p>}
        <p className="text-sm">{children}</p>
      </div>
      {closeable && (
        <button
          onClick={handleClose}
          className="text-lg flex-shrink-0 hover:opacity-70"
          aria-label="Close alert"
        >
          ✕
        </button>
      )}
    </div>
  );
}
