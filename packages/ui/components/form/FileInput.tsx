import { InputHTMLAttributes, useState, ReactNode } from 'react';

export interface FileInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  label?: ReactNode;
  error?: string;
  hint?: string;
  accept?: string;
  multiple?: boolean;
}

export function FileInput({
  label,
  error,
  hint,
  accept = '*',
  multiple = false,
  className = '',
  ...props
}: FileInputProps) {
  const [preview, setPreview] = useState<string | null>(null);

  // eslint-disable-next-line no-undef
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    props.onChange?.(e);
  };

  const baseStyles =
    'w-full px-4 py-2 border-2 border-dashed rounded-lg font-normal text-gray-500 transition-colors duration-200 cursor-pointer';
  const borderStyles = error
    ? 'border-red-500'
    : 'border-gray-300 hover:border-gray-400 focus:border-blue-500';
  const finalClassName = `${baseStyles} ${borderStyles} ${className}`.trim();

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        className={finalClassName}
        onChange={handleChange}
        {...props}
      />
      {preview && (
        <div className="mt-4">
          <img src={preview} alt="Preview" className="max-w-xs rounded-lg" />
        </div>
      )}
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
      {hint && !error && <p className="text-sm text-gray-500 mt-1">{hint}</p>}
    </div>
  );
}
