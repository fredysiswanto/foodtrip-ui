import { HTMLAttributes, ReactNode } from 'react';

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
}

const gapStyles = {
  xs: 'gap-2',
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
};

const alignStyles = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

const justifyStyles = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
};

export interface VStackProps extends StackProps {}

export function VStack({
  children,
  gap = 'md',
  align = 'start',
  justify = 'start',
  className = '',
  ...props
}: VStackProps) {
  const finalClassName = `flex flex-col ${gapStyles[gap]} ${alignStyles[align]} ${justifyStyles[justify]} ${className}`.trim();

  return (
    <div className={finalClassName} {...props}>
      {children}
    </div>
  );
}

export interface HStackProps extends StackProps {}

export function HStack({
  children,
  gap = 'md',
  align = 'center',
  justify = 'start',
  className = '',
  ...props
}: HStackProps) {
  const finalClassName = `flex flex-row ${gapStyles[gap]} ${alignStyles[align]} ${justifyStyles[justify]} ${className}`.trim();

  return (
    <div className={finalClassName} {...props}>
      {children}
    </div>
  );
}
