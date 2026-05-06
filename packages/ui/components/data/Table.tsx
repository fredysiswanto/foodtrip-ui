import { HTMLAttributes, ReactNode } from 'react';

export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  //  eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (value: any, row: T) => ReactNode;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export interface TableProps<T> extends HTMLAttributes<HTMLTableElement> {
  columns: TableColumn<T>[];
  data: T[];
  rowKey: keyof T | string;
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  sortKey?: string;
  sortDirection?: 'asc' | 'desc';
  striped?: boolean;
  hoverable?: boolean;
  compact?: boolean;
  stickyHeader?: boolean;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
  containerClassName?: string;
}
//  eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Table<T extends Record<string, any>>({
  columns,
  data,
  rowKey,
  onSort,
  sortKey,
  sortDirection,
  striped = true,
  hoverable = true,
  compact = false,
  stickyHeader = false,
  onRowClick,
  emptyMessage = 'No data available',
  className = '',
  containerClassName = '',
  ...props
}: TableProps<T>) {
  const rowPadding = compact
    ? 'px-3 py-2 sm:px-4 sm:py-2'
    : 'px-4 py-2 sm:px-6 sm:py-3';
  const hoverClass = hoverable ? 'hover:bg-gray-50 transition-colors' : '';
  const stripeClass = striped ? 'odd:bg-white even:bg-gray-50' : '';
  const stickyClass = stickyHeader ? 'sticky top-0 z-10' : '';

  const getAlignClass = (align?: 'left' | 'center' | 'right') => {
    switch (align) {
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      default:
        return 'text-left';
    }
  };

  const handleSort = (key: string, isSortable: boolean) => {
    if (!isSortable || !onSort) return;

    const direction =
      sortKey === key && sortDirection === 'asc' ? 'desc' : 'asc';
    onSort(key, direction);
  };

  const finalClassName =
    `w-full border-collapse border border-gray-200 rounded-lg overflow-hidden shadow-sm text-sm sm:text-base ${className}`.trim();

  const wrapperClassName =
    `overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 ${containerClassName}`.trim();

  return (
    <div className={wrapperClassName}>
      <table className={finalClassName} {...props}>
        <thead
          className={`bg-gray-100 border-b border-gray-200 ${stickyClass}`}
        >
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className={`${getAlignClass(column.align)} text-xs sm:text-sm font-semibold text-gray-900 ${rowPadding} whitespace-nowrap ${
                  column.sortable && onSort
                    ? 'cursor-pointer hover:bg-gray-200 select-none'
                    : ''
                } ${column.className || ''}`}
                onClick={() =>
                  handleSort(String(column.key), column.sortable || false)
                }
              >
                <div className="flex items-center gap-1 sm:gap-2">
                  <span>{column.label}</span>
                  {column.sortable &&
                    onSort &&
                    sortKey === String(column.key) && (
                      <span className="inline-block text-xs">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className={`text-center text-gray-400 font-medium py-8 sm:py-12 ${rowPadding}`}
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="text-2xl sm:text-3xl">📋</span>
                  <span>{emptyMessage}</span>
                </div>
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={String(row[rowKey as keyof T])}
                className={`border-b border-gray-200 ${stripeClass} ${hoverClass} ${
                  onRowClick ? 'cursor-pointer' : ''
                }`}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((column) => (
                  <td
                    key={`${String(row[rowKey as keyof T])}-${String(column.key)}`}
                    className={`text-xs sm:text-sm text-gray-700 ${rowPadding} ${getAlignClass(column.align)} ${
                      column.className || ''
                    }`}
                  >
                    {column.render
                      ? column.render(row[column.key as keyof T], row)
                      : String(row[column.key as keyof T])}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
