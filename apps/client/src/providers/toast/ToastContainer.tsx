import { useToast } from './useToast';
import { Toast } from './types';

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 space-y-3 max-w-md">
      {toasts.map((toast) => (
        <ToastMessage
          key={toast.id}
          toast={toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}

interface ToastMessageProps {
  toast: Toast;
  onClose: () => void;
}

function ToastMessage({ toast, onClose }: ToastMessageProps) {
  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ⓘ',
  };

  const colors = {
    success: 'bg-green-50 border-green-200 text-green-900',
    error: 'bg-red-50 border-red-200 text-red-900',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-900',
    info: 'bg-blue-50 border-blue-200 text-blue-900',
  };

  const iconColors = {
    success: 'text-green-600',
    error: 'text-red-600',
    warning: 'text-yellow-600',
    info: 'text-blue-600',
  };

  return (
    <div
      className={`border rounded-lg p-4 shadow-lg animate-slide-in ${colors[toast.type]}`}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <span
          className={`text-lg font-bold mt-0.5 shrink-0 ${iconColors[toast.type]}`}
        >
          {icons[toast.type]}
        </span>

        {/* Content */}
        <div className="flex-1">
          <h3 className="font-semibold text-sm mb-0.5">{toast.title}</h3>
          {toast.message && (
            <p className="text-sm opacity-75">{toast.message}</p>
          )}
          {toast.action && (
            <button
              onClick={toast.action.onClick}
              className="text-sm font-medium mt-2 hover:opacity-75 transition-opacity"
            >
              {toast.action.label}
            </button>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="shrink-0 text-lg opacity-50 hover:opacity-100 transition-opacity"
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  );
}
