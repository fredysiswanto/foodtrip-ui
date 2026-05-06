import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';

export interface NumberInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  hint?: string;
  label?: ReactNode;
  min?: number | string;
  max?: number | string;
  step?: number | string;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      error,
      hint,
      label,
      className = '',
      disabled,
      min,
      max,
      step = 1,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'w-full px-4 py-2 border rounded-lg font-normal text-gray-900 transition-colors duration-200';
    const borderStyles = error
      ? 'border-red-500 focus:border-red-600 focus:ring-1 focus:ring-red-500'
      : 'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500';
    const disabledStyles = disabled
      ? 'bg-gray-100 cursor-not-allowed opacity-60'
      : 'bg-white';

    const finalClassName =
      `${baseStyles} ${borderStyles} ${disabledStyles} ${className}`.trim();

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type="number"
          min={min}
          max={max}
          step={step}
          className={finalClassName}
          disabled={disabled}
          {...props}
        />
        {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
        {hint && !error && <p className="text-sm text-gray-500 mt-1">{hint}</p>}
      </div>
    );
  }
);

NumberInput.displayName = 'NumberInput';
