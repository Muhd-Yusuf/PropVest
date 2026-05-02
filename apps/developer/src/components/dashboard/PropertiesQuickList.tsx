'use client';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { formatNaira } from '@/lib/format';
import { properties } from '@/lib/mock-data';
import { PROPERTY_STATUS_LABELS, PROPERTY_PHASE_LABELS } from '@/lib/constants';

export function PropertiesQuickList() {
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-text-primary">Your Properties</h3>
        <a href="/properties" className="text-xs font-medium text-emerald hover:text-emerald-dark transition-colors">
          View All
        </a>
      </div>
      <div className="space-y-4">
        {properties.map((property) => {
          const fundingPercent = Math.round((property.unitsSold / property.totalUnits) * 100);
          return (
            <a
              key={property.id}
              href={`/properties/${property.id}`}
              className="block p-3 rounded-lg border border-border-subtle hover:border-border-default hover:bg-bg-secondary transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">{property.name}</p>
                  <p className="text-xs text-text-tertiary mt-0.5">
                    {property.location.area}, {property.location.city}
                  </p>
                </div>
                <Badge
                  label={PROPERTY_STATUS_LABELS[property.status] || property.status}
                  variant={property.status === 'active' ? 'success' : property.status === 'under_review' ? 'warning' : 'neutral'}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-text-tertiary mb-1.5">
                <span>{PROPERTY_PHASE_LABELS[property.phase] || property.phase}</span>
                <span>{fundingPercent}% funded</span>
              </div>
              <ProgressBar value={fundingPercent} />
              <div className="flex items-center justify-between mt-2 text-xs">
                <span className="text-text-tertiary">{property.investorCount} investors</span>
                <span className="font-mono font-medium text-text-primary">
                  {formatNaira(property.unitsSold * property.unitPrice)} raised
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </Card>
  );
}
