import { HTMLAttributes, ReactNode } from 'react';

export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  render?: (value: any, row: T) => ReactNode;
  sortable?: boolean;
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
}

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
  className = '',
  ...props
}: TableProps<T>) {
  const rowPadding = compact ? 'px-4 py-2' : 'px-6 py-3';
  const hoverClass = hoverable ? 'hover:bg-gray-50' : '';
  const stripeClass = striped ? 'odd:bg-white even:bg-gray-50' : '';

  const handleSort = (key: string, isSortable: boolean) => {
    if (!isSortable || !onSort) return;
    
    const direction = sortKey === key && sortDirection === 'asc' ? 'desc' : 'asc';
    onSort(key, direction);
  };

  const finalClassName = `w-full border-collapse border border-gray-200 rounded-lg overflow-hidden shadow-sm ${className}`.trim();

  return (
    <table className={finalClassName} {...props}>
      <thead className="bg-gray-100 border-b border-gray-200">
        <tr>
          {columns.map((column) => (
            <th
              key={String(column.key)}
              className={`text-left text-sm font-semibold text-gray-900 ${rowPadding} ${
                column.sortable && onSort ? 'cursor-pointer hover:bg-gray-200' : ''
              }`}
              onClick={() => handleSort(String(column.key), column.sortable || false)}
            >
              <div className="flex items-center gap-2">
                {column.label}
                {column.sortable && onSort && sortKey === String(column.key) && (
                  <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className={`text-center text-gray-500 ${rowPadding}`}>
              No data available
            </td>
          </tr>
        ) : (
          data.map((row) => (
            <tr
              key={String(row[rowKey as keyof T])}
              className={`border-b border-gray-200 transition-colors ${stripeClass} ${hoverClass}`}
            >
              {columns.map((column) => (
                <td
                  key={`${String(row[rowKey as keyof T])}-${String(column.key)}`}
                  className={`text-sm text-gray-700 ${rowPadding}`}
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
  );
}
