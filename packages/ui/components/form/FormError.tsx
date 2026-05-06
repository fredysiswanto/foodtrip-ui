import { ReactNode } from 'react';

export interface FormErrorProps {
  children: ReactNode;
  className?: string;
}

export function FormError({ children, className = '' }: FormErrorProps) {
  return (
    <p className={`text-sm text-red-600 mt-1 ${className}`.trim()}>
      {children}
    </p>
  );
}
