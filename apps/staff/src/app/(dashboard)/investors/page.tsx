'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import type { Investor, ColumnDef } from '@/lib/types';
import { mockInvestors } from '@/lib/mock-data';
import { formatNaira } from '@/lib/format';
import { PageHeader } from '@/components/layout/PageHeader';
import { DataTable } from '@/components/ui/DataTable';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';

type InvestorRow = Investor & Record<string, unknown>;

const kycTierVariant = { 1: 'neutral', 2: 'info', 3: 'success' } as const;
const kycStatusVariant: Record<string, 'success' | 'warning' | 'error'> = {
  verified: 'success',
  pending: 'warning',
  rejected: 'error',
};

const columns: ColumnDef<InvestorRow>[] = [
  {
    key: 'fullName',
    header: 'Name',
    sortable: true,
    accessor: (row) => <span className="font-medium">{row.fullName}</span>,
  },
  {
    key: 'email',
    header: 'Email',
    accessor: (row) => row.email,
  },
  {
    key: 'phone',
    header: 'Phone',
    accessor: (row) => row.phone,
  },
  {
    key: 'kycTier',
    header: 'KYC Tier',
    accessor: (row) => <Badge label={`Tier ${row.kycTier}`} variant={kycTierVariant[row.kycTier as 1 | 2 | 3]} />,
  },
  {
    key: 'kycStatus',
    header: 'KYC Status',
    accessor: (row) => {
      const status = row.kycStatus as string;
      return (
        <Badge
          label={status.charAt(0).toUpperCase() + status.slice(1)}
          variant={kycStatusVariant[status] ?? 'neutral'}
        />
      );
    },
  },
  {
    key: 'totalInvested',
    header: 'Invested',
    accessor: (row) => formatNaira(row.totalInvested as number),
  },
  {
    key: 'propertiesCount',
    header: 'Properties',
    accessor: (row) => row.propertiesCount,
  },
  {
    key: 'status',
    header: 'Status',
    accessor: (row) => {
      if (row.isFrozen && row.isFlagged) {
        return (
          <div className="flex items-center gap-1">
            <Badge label="Frozen" variant="error" />
            <Badge label="Flagged" variant="warning" />
          </div>
        );
      }
      if (row.isFrozen) return <Badge label="Frozen" variant="error" />;
      if (row.isFlagged) return <Badge label="Flagged" variant="warning" />;
      return <Badge label="Active" variant="success" />;
    },
  },
];

export default function InvestorsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('all');

  const filteredData = useMemo(() => {
    const data = mockInvestors as unknown as InvestorRow[];
    switch (activeTab) {
      case 'verified':
        return data.filter((inv) => inv.kycStatus === 'verified');
      case 'pending':
        return data.filter((inv) => inv.kycStatus === 'pending');
      case 'frozen':
        return data.filter((inv) => inv.isFrozen);
      case 'flagged':
        return data.filter((inv) => inv.isFlagged);
      default:
        return data;
    }
  }, [activeTab]);

  const tabs = [
    { key: 'all', label: 'All', count: mockInvestors.length },
    { key: 'verified', label: 'Verified', count: mockInvestors.filter((i) => i.kycStatus === 'verified').length },
    { key: 'pending', label: 'Pending', count: mockInvestors.filter((i) => i.kycStatus === 'pending').length },
    { key: 'frozen', label: 'Frozen', count: mockInvestors.filter((i) => i.isFrozen).length },
    { key: 'flagged', label: 'Flagged', count: mockInvestors.filter((i) => i.isFlagged).length },
  ];

  return (
    <div>
      <PageHeader
        title="Investors"
        description="Monitor and manage investor accounts"
      />

      <div className="mb-6">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      <DataTable<InvestorRow>
        columns={columns}
        data={filteredData}
        searchable
        searchPlaceholder="Search by name or email..."
        searchKeys={['fullName', 'email']}
        onRowClick={(row) => router.push(`/investors/${row.id}`)}
        emptyMessage="No investors found"
      />
    </div>
  );
}
