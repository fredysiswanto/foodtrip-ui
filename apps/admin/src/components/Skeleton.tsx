// Skeleton components for loading states
export function SkeletonText() {
  return (
    <div className="h-4 bg-slate-200 rounded animate-pulse" />
  );
}

export function SkeletonLine({ className }: { className?: string } = {}) {
  return (
    <div className={`h-3 bg-slate-200 rounded animate-pulse ${className || ''}`} />
  );
}

export function SkeletonCircle({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };
  return (
    <div className={`${sizes[size]} bg-slate-200 rounded-full animate-pulse`} />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
      <SkeletonLine />
      <SkeletonLine />
      <SkeletonLine className="w-3/4" />
      <div className="flex gap-3 pt-2">
        <div className="h-8 bg-slate-200 rounded w-24 animate-pulse" />
        <div className="h-8 bg-slate-200 rounded w-24 animate-pulse" />
      </div>
    </div>
  );
}

export function SkeletonTableRow() {
  return (
    <tr className="border-b border-slate-200">
      <td className="p-4">
        <SkeletonText />
      </td>
      <td className="p-4">
        <SkeletonText />
      </td>
      <td className="p-4">
        <SkeletonText />
      </td>
      <td className="p-4">
        <div className="flex gap-2">
          <div className="h-8 bg-slate-200 rounded w-16 animate-pulse" />
          <div className="h-8 bg-slate-200 rounded w-16 animate-pulse" />
        </div>
      </td>
    </tr>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="p-4 text-left">
              <SkeletonText />
            </th>
            <th className="p-4 text-left">
              <SkeletonText />
            </th>
            <th className="p-4 text-left">
              <SkeletonText />
            </th>
            <th className="p-4 text-left">
              <SkeletonText />
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <SkeletonTableRow key={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SkeletonFormField() {
  return (
    <div className="space-y-2">
      <SkeletonText />
      <div className="h-10 bg-slate-200 rounded animate-pulse" />
    </div>
  );
}

export function SkeletonForm() {
  return (
    <div className="space-y-6">
      <SkeletonFormField />
      <SkeletonFormField />
      <SkeletonFormField />
      <div className="flex gap-3 pt-4">
        <div className="h-10 bg-slate-200 rounded w-24 animate-pulse" />
        <div className="h-10 bg-slate-200 rounded w-24 animate-pulse" />
      </div>
    </div>
  );
}
