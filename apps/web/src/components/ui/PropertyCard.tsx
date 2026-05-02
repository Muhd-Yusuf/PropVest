import { Building2, Users, TrendingUp } from 'lucide-react';
import { Badge } from './Badge';
import { ProgressBar } from './ProgressBar';
import { formatNairaFull } from '@/lib/format';
import type { Property } from '@/lib/types';

export function PropertyCard({ property }: { property: Property }) {
  const funded = property.unitsSold / property.totalUnits;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-border-default overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group">
      {/* Image Placeholder */}
      <div className="h-36 sm:h-44 bg-bg-tertiary flex items-center justify-center relative">
        <Building2 className="w-12 h-12 text-text-tertiary" strokeWidth={1} />
        <div className="absolute top-3 right-3">
          <Badge type={property.type} />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <h3 className="font-semibold text-sm sm:text-[15px] text-text-primary truncate">
          {property.name}
        </h3>
        <p className="text-xs text-text-tertiary mt-1">
          {property.location} · {property.developer}
        </p>

        {/* Progress */}
        <div className="mt-4">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="font-semibold text-text-primary">
              {Math.round(funded * 100)}% Funded
            </span>
            <span className="text-text-tertiary">
              {(property.totalUnits - property.unitsSold).toLocaleString()} units left
            </span>
          </div>
          <ProgressBar progress={funded} />
        </div>

        {/* Stats */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-border-subtle">
          <div>
            <p className="text-[10px] text-text-tertiary uppercase tracking-wider">Per Unit</p>
            <p className="font-mono font-bold text-sm text-text-primary mt-0.5">
              {formatNairaFull(property.unitPrice)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-text-tertiary uppercase tracking-wider">Yield</p>
            <p className="font-mono font-bold text-sm text-emerald mt-0.5">
              {property.yield}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-text-tertiary uppercase tracking-wider">Investors</p>
            <p className="font-semibold text-sm text-text-primary mt-0.5 flex items-center gap-1">
              <Users className="w-3 h-3" />
              {property.investorCount.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
