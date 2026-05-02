'use client';

import { useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { DataTable } from '@/components/ui/DataTable';
import { mockProperties, mockTransactions } from '@/lib/mock-data';
import { formatNaira } from '@/lib/format';
import type { ColumnDef } from '@/lib/types';

interface PropertyPnLRow extends Record<string, unknown> {
  id: string;
  propertyName: string;
  totalInvested: number;
  totalPayouts: number;
  platformFees: number;
  netPosition: number;
}

export function PropertyPnL() {
  const pnlData = useMemo<PropertyPnLRow[]>(() => {
    return mockProperties.map((property) => {
      const propertyTxns = mockTransactions.filter(
        (t) => t.propertyId === property.id && t.status === 'success',
      );

      const totalInvested = propertyTxns
        .filter((t) => t.type === 'investment')
        .reduce((sum, t) => sum + t.amount, 0);

      const totalPayouts = propertyTxns
        .filter((t) => t.type === 'payout')
        .reduce((sum, t) => sum + t.amount, 0);

      const platformFees = propertyTxns.reduce((sum, t) => sum + t.fee, 0);

      const netPosition = totalInvested - totalPayouts;

      return {
        id: property.id,
        propertyName: property.name,
        totalInvested,
        totalPayouts,
        platformFees,
        netPosition,
      };
    }).filter((row) => row.totalInvested > 0 || row.totalPayouts > 0);
  }, []);

  const columns: ColumnDef<PropertyPnLRow>[] = [
    {
      key: 'propertyName',
      header: 'Property',
      accessor: (row) => (
        <span className="font-medium text-text-primary">{row.propertyName}</span>
      ),
      sortable: true,
    },
    {
      key: 'totalInvested',
      header: 'Total Invested',
      accessor: (row) => formatNaira(row.totalInvested),
    },
    {
      key: 'totalPayouts',
      header: 'Total Payouts',
      accessor: (row) => formatNaira(row.totalPayouts),
    },
    {
      key: 'platformFees',
      header: 'Platform Fees',
      accessor: (row) => formatNaira(row.platformFees),
    },
    {
      key: 'netPosition',
      header: 'Net Position',
      accessor: (row) => (
        <span className={row.netPosition >= 0 ? 'text-emerald' : 'text-error'}>
          {formatNaira(row.netPosition)}
        </span>
      ),
    },
  ];

  return (
    <Card>
      <h3 className="text-sm font-semibold text-text-primary mb-4">
        Property P&L
      </h3>
      <DataTable<PropertyPnLRow>
        columns={columns}
        data={pnlData}
        emptyMessage="No property financial data available"
      />
    </Card>
  );
}
