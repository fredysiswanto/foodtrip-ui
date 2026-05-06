import { InputHTMLAttributes, ReactNode } from 'react';

export interface RadioOption {
  value: string | number;
  label: ReactNode;
}

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  options: RadioOption[];
  label?: ReactNode;
  error?: string;
  column?: boolean;
}

export function Radio({
  options,
  label,
  error,
  column = false,
  name,
  ...props
}: RadioProps) {
  const containerClass = column ? 'flex flex-col gap-3' : 'flex flex-row gap-4 flex-wrap';

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className={containerClass}>
        {options.map((opt) => (
          <div key={opt.value} className="flex items-center gap-2">
            <input
              type="radio"
              id={`${name}-${opt.value}`}
              name={name}
              value={opt.value}
              className="w-4 h-4 cursor-pointer accent-blue-600"
              {...props}
            />
            <label htmlFor={`${name}-${opt.value}`} className="text-sm text-gray-700 cursor-pointer">
              {opt.label}
            </label>
          </div>
        ))}
      </div>
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
}
