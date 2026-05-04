import { InputHTMLAttributes, ReactNode } from 'react';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  error?: string;
}

export function Checkbox({
  label,
  error,
  className = '',
  ...props
}: CheckboxProps) {
  const baseStyles = 'w-4 h-4 cursor-pointer accent-blue-600 rounded border-gray-300';
  const finalClassName = `${baseStyles} ${className}`.trim();

  return (
    <div className="flex items-center gap-2">
      <input type="checkbox" className={finalClassName} {...props} />
      {label && (
        <label className="text-sm text-gray-700 cursor-pointer">
          {label}
        </label>
      )}
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
}
