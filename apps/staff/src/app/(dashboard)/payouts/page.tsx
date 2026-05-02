'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Zap } from 'lucide-react';
import type { Payout, ColumnDef, PayoutStatus } from '@/lib/types';
import { mockPayouts } from '@/lib/mock-data';
import { formatNaira, formatDate } from '@/lib/format';
import { usePermission } from '@/hooks/usePermission';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { DataTable } from '@/components/ui/DataTable';
import { Tabs } from '@/components/ui/Tabs';
import { PayoutStatusBadge } from '@/components/payouts/PayoutStatusBadge';
import { TriggerPayoutModal } from '@/components/payouts/TriggerPayoutModal';

type PayoutRow = Payout & Record<string, unknown>;

const columns: ColumnDef<PayoutRow>[] = [
  {
    key: 'propertyName',
    header: 'Property',
    sortable: true,
    accessor: (row) => <span className="font-medium">{row.propertyName}</span>,
  },
  {
    key: 'quarter',
    header: 'Quarter',
    accessor: (row) => row.quarter,
  },
  {
    key: 'totalRentReceived',
    header: 'Rent Received',
    accessor: (row) => formatNaira(row.totalRentReceived as number),
  },
  {
    key: 'distributableAmount',
    header: 'Distributable',
    accessor: (row) => formatNaira(row.distributableAmount as number),
  },
  {
    key: 'investorPayouts',
    header: 'Investors',
    accessor: (row) => (row.investorPayouts as unknown[]).length,
  },
  {
    key: 'status',
    header: 'Status',
    accessor: (row) => <PayoutStatusBadge status={row.status as PayoutStatus} />,
  },
  {
    key: 'createdAt',
    header: 'Created',
    accessor: (row) => formatDate(row.createdAt as string),
  },
];

export default function PayoutsPage() {
  const router = useRouter();
  const { hasPermission } = usePermission();
  const [activeTab, setActiveTab] = useState('all');
  const [triggerModalOpen, setTriggerModalOpen] = useState(false);

  const canTrigger = hasPermission('payouts.full') || hasPermission('payouts.prepare');

  const pendingCount = mockPayouts.filter((p) => p.status === 'pending_approval').length;

  const filteredData = useMemo(() => {
    const data = mockPayouts as unknown as PayoutRow[];
    switch (activeTab) {
      case 'pending_approval':
        return data.filter((p) => p.status === 'pending_approval');
      case 'processing':
        return data.filter((p) => p.status === 'processing');
      case 'completed':
        return data.filter((p) => p.status === 'completed');
      default:
        return data;
    }
  }, [activeTab]);

  const tabs = [
    { key: 'all', label: 'All' },
    { key: 'pending_approval', label: 'Pending Approval', count: pendingCount },
    { key: 'processing', label: 'Processing' },
    { key: 'completed', label: 'Completed' },
  ];

  return (
    <div>
      <PageHeader
        title="Payouts"
        description="Manage investor payout distributions"
        actions={
          canTrigger ? (
            <Button onClick={() => setTriggerModalOpen(true)}>
              <Zap className="w-4 h-4" />
              Trigger Payout
            </Button>
          ) : undefined
        }
      />

      <div className="mb-6">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      <DataTable<PayoutRow>
        columns={columns}
        data={filteredData}
        searchable
        searchPlaceholder="Search by property name..."
        searchKeys={['propertyName', 'quarter']}
        onRowClick={(row) => router.push(`/payouts/${row.id}`)}
        emptyMessage="No payouts found"
      />

      <TriggerPayoutModal
        open={triggerModalOpen}
        onClose={() => setTriggerModalOpen(false)}
      />
    </div>
  );
}
