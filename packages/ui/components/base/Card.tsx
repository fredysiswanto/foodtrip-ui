import { HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hoverable?: boolean;
  border?: boolean;
}

export function Card({
  children,
  hoverable = false,
  border = false,
  className = '',
  ...props
}: CardProps) {
  const baseStyles = 'rounded-lg bg-white p-6';
  const borderStyles = border ? 'border border-gray-300' : '';
  const shadowStyles = 'shadow-sm';
  const hoverStyles = hoverable
    ? 'hover:shadow-md transition-shadow duration-200 cursor-pointer'
    : '';

  const finalClassName =
    `${baseStyles} ${borderStyles} ${shadowStyles} ${hoverStyles} ${className}`.trim();

  return (
    <div className={finalClassName} {...props}>
      {children}
    </div>
  );
}
