interface SummaryCardProps {
  title: string;
  value: string;
  icon: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function SummaryCard({ title, value, icon, trend }: SummaryCardProps) {
  return (
    <div className="card bg-white rounded-lg border border-slate-200">
      <div className="card-body">
        <div className="flex items-start justify-between">
          <div className="px-4 py-2">
            <p className="text-sm font-medium text-slate-600">{title}</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-2">{value}</h3>
            {trend && (
              <p
                className={`text-xs font-medium mt-2 ${
                  trend.isPositive ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {trend.isPositive ? '↑' : '↓'} {trend.value}% from last month
              </p>
            )}
          </div>
          <div className="text-4xl">{icon}</div>
        </div>
      </div>
    </div>
  );
}
