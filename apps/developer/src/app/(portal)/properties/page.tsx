'use client';

import { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { PropertyFilters } from '@/components/properties/PropertyFilters';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { EmptyState } from '@/components/ui/EmptyState';
import { formatNaira } from '@/lib/format';
import { properties } from '@/lib/mock-data';
import { PROPERTY_TYPE_LABELS, PROPERTY_STATUS_LABELS, PROPERTY_PHASE_LABELS } from '@/lib/constants';

export default function PropertiesPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (typeFilter && p.type !== typeFilter) return false;
      if (statusFilter && p.status !== statusFilter) return false;
      return true;
    });
  }, [search, typeFilter, statusFilter]);

  return (
    <>
      <PageHeader
        title="Properties"
        description="Manage your property listings and track performance."
        actions={
          <a href="/properties/new">
            <Button size="sm">
              <Plus className="w-4 h-4 mr-1.5" />
              Add Property
            </Button>
          </a>
        }
      />

      <PropertyFilters
        search={search}
        onSearchChange={setSearch}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      {filtered.length === 0 ? (
        <EmptyState
          title="No properties found"
          description="Try adjusting your filters or add a new property."
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map((property) => {
            const fundingPercent = Math.round((property.unitsSold / property.totalUnits) * 100);
            return (
              <a key={property.id} href={`/properties/${property.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <p className="text-base font-semibold text-text-primary">{property.name}</p>
                      <p className="text-xs text-text-tertiary mt-0.5">
                        {property.location.area}, {property.location.city}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge label={PROPERTY_STATUS_LABELS[property.status]} variant={property.status === 'active' ? 'success' : property.status === 'under_review' ? 'warning' : 'neutral'} />
                      <span className="text-[10px] text-text-tertiary">{PROPERTY_TYPE_LABELS[property.type]}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-text-tertiary mb-1.5">
                    <span>{PROPERTY_PHASE_LABELS[property.phase]}</span>
                    <span>{fundingPercent}% funded</span>
                  </div>
                  <ProgressBar value={fundingPercent} />

                  <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-border-subtle">
                    <div>
                      <p className="text-[10px] text-text-tertiary uppercase">Unit Price</p>
                      <p className="text-sm font-mono font-medium text-text-primary mt-0.5">{formatNaira(property.unitPrice)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-text-tertiary uppercase">Investors</p>
                      <p className="text-sm font-medium text-text-primary mt-0.5">{property.investorCount}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-text-tertiary uppercase">Raised</p>
                      <p className="text-sm font-mono font-medium text-emerald mt-0.5">{formatNaira(property.unitsSold * property.unitPrice)}</p>
                    </div>
                  </div>
                </Card>
              </a>
            );
          })}
        </div>
      )}
    </>
  );
}
