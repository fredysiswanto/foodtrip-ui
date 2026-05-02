import { createContext, useState, useCallback, useEffect } from 'react';
import { Toast, ToastContextType } from './types';

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [timeouts, setTimeouts] = useState<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
    // Clear timeout if exists
    setTimeouts((prev) => {
      const newMap = new Map(prev);
      const timeout = newMap.get(id);
      if (timeout) clearTimeout(timeout);
      newMap.delete(id);
      return newMap;
    });
  }, []);

  const addToast = useCallback(
    (toast: Omit<Toast, 'id'>): string => {
      const id = `toast-${Date.now()}-${Math.random()}`;
      const newToast: Toast = { ...toast, id };

      setToasts((prev) => [...prev, newToast]);

      // Auto-remove if duration is set (default 5s)
      const duration = toast.duration ?? 5000;
      if (duration > 0) {
        const timeout = setTimeout(() => {
          removeToast(id);
        }, duration);

        setTimeouts((prev) => {
          const newMap = new Map(prev);
          newMap.set(id, timeout);
          return newMap;
        });
      }

      return id;
    },
    [removeToast]
  );

  const clearAll = useCallback(() => {
    // Clear all timeouts
    timeouts.forEach((timeout) => clearTimeout(timeout));
    setTimeouts(new Map());
    setToasts([]);
  }, [timeouts]);

  // Helper methods
  const success = useCallback(
    (title: string, message?: string): string =>
      addToast({ type: 'success', title, message }),
    [addToast]
  );

  const error = useCallback(
    (title: string, message?: string): string =>
      addToast({ type: 'error', title, message, duration: 7000 }),
    [addToast]
  );

  const warning = useCallback(
    (title: string, message?: string): string =>
      addToast({ type: 'warning', title, message }),
    [addToast]
  );

  const info = useCallback(
    (title: string, message?: string): string =>
      addToast({ type: 'info', title, message }),
    [addToast]
  );

  const value: ToastContextType = {
    toasts,
    addToast,
    removeToast,
    clearAll,
    success,
    error,
    warning,
    info,
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [timeouts]);

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}
