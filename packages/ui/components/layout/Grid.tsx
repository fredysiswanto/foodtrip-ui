import { HTMLAttributes, ReactNode } from 'react';

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  columns?: 1 | 2 | 3 | 4 | 6;
  gap?: 'sm' | 'md' | 'lg';
}

export function Grid({
  children,
  columns = 3,
  gap = 'md',
  className = '',
  ...props
}: GridProps) {
  const columnStyles = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
  };

  const gapStyles = {
    sm: 'gap-3',
    md: 'gap-4',
    lg: 'gap-6',
  };

  const finalClassName = `grid ${columnStyles[columns]} ${gapStyles[gap]} ${className}`.trim();

  return (
    <div className={finalClassName} {...props}>
      {children}
    </div>
  );
}
