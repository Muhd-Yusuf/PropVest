'use client';

import { Card } from '@/components/ui/Card';
import { DataTable } from '@/components/ui/DataTable';
import { mockProperties } from '@/lib/mock-data';
import { formatPercent } from '@/lib/format';
import type { Property, ColumnDef } from '@/lib/types';

type PropertyRow = Property & Record<string, unknown>;

export function FeeBreakdown() {
  const columns: ColumnDef<PropertyRow>[] = [
    {
      key: 'name',
      header: 'Property',
      accessor: (row) => (
        <span className="font-medium text-text-primary">{row.name}</span>
      ),
      sortable: true,
    },
    {
      key: 'platformFeePercent',
      header: 'Platform Fee',
      accessor: (row) => formatPercent(row.platformFeePercent),
    },
    {
      key: 'managementFeePercent',
      header: 'Management Fee',
      accessor: (row) =>
        row.managementFeePercent > 0
          ? formatPercent(row.managementFeePercent)
          : 'N/A',
    },
  ];

  return (
    <Card>
      <h3 className="text-sm font-semibold text-text-primary mb-4">
        Fee Breakdown
      </h3>
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between py-2 border-b border-border-subtle">
          <div>
            <p className="text-sm font-medium text-text-primary">Platform Fee</p>
            <p className="text-xs text-text-tertiary">Applied on all investments</p>
          </div>
          <span className="text-sm font-mono font-semibold text-emerald">3.0%</span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-border-subtle">
          <div>
            <p className="text-sm font-medium text-text-primary">P2P Trading Fee</p>
            <p className="text-xs text-text-tertiary">Applied on secondary market trades</p>
          </div>
          <span className="text-sm font-mono font-semibold text-emerald">1.0%</span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-border-subtle">
          <div>
            <p className="text-sm font-medium text-text-primary">Management Fee</p>
            <p className="text-xs text-text-tertiary">Varies per property (0-10%)</p>
          </div>
          <span className="text-sm font-mono font-semibold text-text-secondary">Varies</span>
        </div>
      </div>

      <DataTable<PropertyRow>
        columns={columns}
        data={mockProperties as unknown as PropertyRow[]}
        emptyMessage="No properties found"
      />
    </Card>
  );
}
