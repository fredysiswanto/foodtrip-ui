import { HTMLAttributes } from 'react';

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'white';
}

export function Spinner({
  size = 'md',
  color = 'default',
  className = '',
  ...props
}: SpinnerProps) {
  const sizeStyles = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-4',
    lg: 'h-12 w-12 border-4',
  };

  const colorStyles = {
    default: 'border-gray-300 border-t-blue-600',
    white: 'border-gray-100 border-t-white',
  };

  const finalClassName = `animate-spin rounded-full ${sizeStyles[size]} ${colorStyles[color]} ${className}`.trim();

  return <div className={finalClassName} {...props} />;
}
