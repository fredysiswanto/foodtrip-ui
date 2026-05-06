import { HTMLAttributes, ReactNode } from 'react';

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps extends HTMLAttributes<HTMLDivElement> {
  items: BreadcrumbItem[];
  separator?: ReactNode;
}

export function Breadcrumb({
  items,
  separator = '/',
  className = '',
  ...props
}: BreadcrumbProps) {
  return (
    <nav
      className={`flex items-center gap-2 ${className}`.trim()}
      aria-label="Breadcrumb"
      {...props}
    >
      <ol className="flex items-center gap-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {item.href ? (
              <a
                href={item.href}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                {item.label}
              </a>
            ) : item.onClick ? (
              <button
                onClick={item.onClick}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                {item.label}
              </button>
            ) : (
              <span className="text-gray-700">{item.label}</span>
            )}
            {index < items.length - 1 && (
              <span className="text-gray-400">{separator}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
