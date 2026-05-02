import { clsx } from 'clsx';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  trend?: { value: number; isPositive: boolean };
  icon?: React.ElementType;
}

export function StatCard({ label, value, trend, icon: Icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-border-default p-5 relative overflow-hidden">
      {Icon && (
        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-emerald/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-emerald" />
        </div>
      )}
      <p className="text-xs text-text-tertiary uppercase tracking-wider font-medium">
        {label}
      </p>
      <p className="text-2xl font-mono font-bold text-text-primary mt-1">
        {value}
      </p>
      {trend && (
        <div className="flex items-center gap-1 mt-2">
          {trend.isPositive ? (
            <TrendingUp className="w-3.5 h-3.5 text-emerald" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5 text-error" />
          )}
          <span
            className={clsx(
              'text-xs font-medium',
              trend.isPositive ? 'text-emerald' : 'text-error',
            )}
          >
            {trend.isPositive ? '+' : ''}
            {trend.value}%
          </span>
        </div>
      )}
    </div>
  );
}
