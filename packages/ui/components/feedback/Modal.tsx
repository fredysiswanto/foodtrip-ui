import { useEffect, useState, ReactNode } from 'react';
import { Button } from '../base/Button';

export interface ModalProps {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  onConfirm?: () => void | Promise<void>;
  confirmText?: string;
  cancelText?: string;
  isDangerous?: boolean;
  isLoading?: boolean;
}

export function Modal({
  isOpen,
  title,
  children,
  onClose,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDangerous = false,
  isLoading = false,
}: ModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300);
  };

  const handleConfirm = async () => {
    if (onConfirm) {
      await onConfirm();
    }
    handleClose();
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${isVisible ? 'opacity-50' : 'opacity-0'}`}
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={`relative bg-white rounded-lg shadow-lg max-w-md w-full mx-4 transition-transform duration-300 ${
          isVisible ? 'scale-100' : 'scale-95'
        }`}
      >
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
          <div className="text-gray-600 mb-6">{children}</div>

          <div className="flex gap-3 justify-end">
            <Button variant="ghost" onClick={handleClose} disabled={isLoading}>
              {cancelText}
            </Button>
            {onConfirm && (
              <Button
                variant={isDangerous ? 'danger' : 'primary'}
                onClick={handleConfirm}
                isLoading={isLoading}
              >
                {confirmText}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
