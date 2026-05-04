import { HTMLAttributes, ReactNode } from 'react';

export interface FormGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  column?: boolean;
}

export function FormGroup({
  children,
  column = true,
  className = '',
  ...props
}: FormGroupProps) {
  const layoutClass = column ? 'flex flex-col gap-4' : 'flex flex-row gap-4';
  const finalClassName = `${layoutClass} ${className}`.trim();

  return (
    <div className={finalClassName} {...props}>
      {children}
    </div>
  );
}
