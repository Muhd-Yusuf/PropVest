'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import type { KYCRecord, ColumnDef } from '@/lib/types';
import { mockKYCRecords } from '@/lib/mock-data';
import { formatDate } from '@/lib/format';
import { PageHeader } from '@/components/layout/PageHeader';
import { DataTable } from '@/components/ui/DataTable';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';
import { KYCStats } from '@/components/kyc/KYCStats';

type KYCRow = KYCRecord & Record<string, unknown>;

const tierVariant = { 1: 'neutral', 2: 'info', 3: 'success' } as const;
const matchVariant: Record<string, 'success' | 'warning' | 'error'> = {
  match: 'success',
  partial: 'warning',
  mismatch: 'error',
};
const statusVariant: Record<string, 'success' | 'warning' | 'error'> = {
  approved: 'success',
  pending: 'warning',
  rejected: 'error',
};
const methodLabels: Record<string, string> = {
  bank_account: 'Bank Account',
  bvn: 'BVN',
  nin: 'NIN',
};

const columns: ColumnDef<KYCRow>[] = [
  {
    key: 'investorName',
    header: 'Investor',
    sortable: true,
    accessor: (row) => <span className="font-medium">{row.investorName}</span>,
  },
  {
    key: 'investorEmail',
    header: 'Email',
    accessor: (row) => row.investorEmail,
  },
  {
    key: 'tier',
    header: 'Tier',
    accessor: (row) => <Badge label={`Tier ${row.tier}`} variant={tierVariant[row.tier as 1 | 2 | 3]} />,
  },
  {
    key: 'method',
    header: 'Method',
    accessor: (row) => methodLabels[row.method as string] ?? row.method,
  },
  {
    key: 'matchResult',
    header: 'Match Result',
    accessor: (row) => {
      const result = row.matchResult as string;
      return (
        <Badge
          label={result.charAt(0).toUpperCase() + result.slice(1)}
          variant={matchVariant[result] ?? 'neutral'}
        />
      );
    },
  },
  {
    key: 'status',
    header: 'Status',
    accessor: (row) => {
      const status = row.status as string;
      return (
        <Badge
          label={status.charAt(0).toUpperCase() + status.slice(1)}
          variant={statusVariant[status] ?? 'neutral'}
        />
      );
    },
  },
  {
    key: 'createdAt',
    header: 'Date',
    accessor: (row) => formatDate(row.createdAt as string),
  },
];

export default function KYCPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('all');

  const pendingCount = mockKYCRecords.filter((r) => r.status === 'pending').length;

  const filteredData = useMemo(() => {
    const data = mockKYCRecords as unknown as KYCRow[];
    switch (activeTab) {
      case 'pending':
        return data.filter((r) => r.status === 'pending');
      case 'approved':
        return data.filter((r) => r.status === 'approved');
      case 'rejected':
        return data.filter((r) => r.status === 'rejected');
      default:
        return data;
    }
  }, [activeTab]);

  const tabs = [
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Pending', count: pendingCount },
    { key: 'approved', label: 'Approved' },
    { key: 'rejected', label: 'Rejected' },
  ];

  return (
    <div>
      <PageHeader
        title="KYC Queue"
        description="Review and process KYC verification requests"
      />

      <div className="mb-6">
        <KYCStats />
      </div>

      <div className="mb-6">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      <DataTable<KYCRow>
        columns={columns}
        data={filteredData}
        searchable
        searchPlaceholder="Search by investor name or email..."
        searchKeys={['investorName', 'investorEmail']}
        onRowClick={(row) => router.push(`/kyc/${row.id}`)}
        emptyMessage="No KYC records found"
      />
    </div>
  );
}
