import { SelectHTMLAttributes, ReactNode } from 'react';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  hint?: string;
  label?: ReactNode;
  options: Array<{ value: string | number; label: string }>;
  placeholder?: string;
}

export function Select({
  error,
  hint,
  label,
  options,
  placeholder,
  className = '',
  disabled,
  ...props
}: SelectProps) {
  const baseStyles = 'w-full px-4 py-2 border rounded-lg font-normal text-gray-900 transition-colors duration-200';
  const borderStyles = error
    ? 'border-red-500 focus:border-red-600 focus:ring-1 focus:ring-red-500'
    : 'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500';
  const disabledStyles = disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'bg-white';

  const finalClassName = `${baseStyles} ${borderStyles} ${disabledStyles} ${className}`.trim();

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <select className={finalClassName} disabled={disabled} {...props}>
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
      {hint && !error && <p className="text-sm text-gray-500 mt-1">{hint}</p>}
    </div>
  );
}
