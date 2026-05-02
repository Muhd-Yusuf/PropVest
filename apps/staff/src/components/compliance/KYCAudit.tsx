'use client';

import { useMemo } from 'react';
import { ShieldCheck } from 'lucide-react';
import { StatCard } from '@/components/ui/StatCard';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { DataTable } from '@/components/ui/DataTable';
import { mockKYCRecords } from '@/lib/mock-data';
import { formatDate } from '@/lib/format';
import type { KYCRecord, ColumnDef } from '@/lib/types';

type KYCRow = KYCRecord & Record<string, unknown>;

const matchVariant: Record<string, 'success' | 'warning' | 'error' | 'info' | 'neutral'> = {
  match: 'success',
  partial: 'warning',
  mismatch: 'error',
};

const statusVariant: Record<string, 'success' | 'warning' | 'error' | 'info' | 'neutral'> = {
  approved: 'success',
  pending: 'warning',
  rejected: 'error',
};

const methodLabels: Record<string, string> = {
  bank_account: 'Bank Account',
  bvn: 'BVN',
  nin: 'NIN',
};

export function KYCAudit() {
  const stats = useMemo(() => {
    const total = mockKYCRecords.length;
    const matches = mockKYCRecords.filter((r) => r.matchResult === 'match').length;
    const mismatches = mockKYCRecords.filter((r) => r.matchResult === 'mismatch').length;
    const matchRate = total > 0 ? (matches / total) * 100 : 0;

    return { total, matchRate, mismatches };
  }, []);

  const mismatchRecords = (mockKYCRecords.filter(
    (r) => r.matchResult === 'mismatch' || r.matchResult === 'partial',
  ) as unknown) as KYCRow[];

  const columns: ColumnDef<KYCRow>[] = [
    {
      key: 'investorName',
      header: 'Investor',
      accessor: (row) => (
        <span className="font-medium text-text-primary">{row.investorName}</span>
      ),
      sortable: true,
    },
    {
      key: 'tier',
      header: 'Tier',
      accessor: (row) => (
        <Badge label={`Tier ${row.tier}`} variant="info" />
      ),
    },
    {
      key: 'method',
      header: 'Method',
      accessor: (row) => methodLabels[row.method] || row.method,
    },
    {
      key: 'matchResult',
      header: 'Match Result',
      accessor: (row) => (
        <Badge
          label={row.matchResult.charAt(0).toUpperCase() + row.matchResult.slice(1)}
          variant={matchVariant[row.matchResult] || 'neutral'}
        />
      ),
    },
    {
      key: 'status',
      header: 'Status',
      accessor: (row) => (
        <Badge
          label={row.status.charAt(0).toUpperCase() + row.status.slice(1)}
          variant={statusVariant[row.status] || 'neutral'}
        />
      ),
    },
    {
      key: 'createdAt',
      header: 'Date',
      accessor: (row) => formatDate(row.createdAt),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          label="Total Verifications"
          value={stats.total.toString()}
          icon={ShieldCheck}
        />
        <StatCard
          label="Match Rate"
          value={`${stats.matchRate.toFixed(1)}%`}
          trend={{ value: 2.1, isPositive: true }}
        />
        <StatCard
          label="Mismatches"
          value={stats.mismatches.toString()}
          trend={{ value: stats.mismatches, isPositive: false }}
        />
      </div>

      <Card>
        <h3 className="text-sm font-semibold text-text-primary mb-4">
          Records with Mismatches / Partial Matches
        </h3>
        <DataTable<KYCRow>
          columns={columns}
          data={mismatchRecords}
          emptyMessage="No mismatched records"
        />
      </Card>
    </div>
  );
}
