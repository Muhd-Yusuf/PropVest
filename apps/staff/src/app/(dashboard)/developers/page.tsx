'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Tabs } from '@/components/ui/Tabs';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { DataTable } from '@/components/ui/DataTable';
import { OnboardDeveloperModal } from '@/components/developers/OnboardDeveloperModal';
import { usePermission } from '@/hooks/usePermission';
import { mockDevelopers } from '@/lib/mock-data';
import { formatNaira } from '@/lib/format';
import type { DeveloperPartner, ColumnDef } from '@/lib/types';

type DeveloperRow = DeveloperPartner & Record<string, unknown>;

const statusVariant: Record<string, 'success' | 'warning' | 'error' | 'info' | 'neutral'> = {
  active: 'success',
  pending: 'warning',
  inactive: 'neutral',
};

export default function DevelopersPage() {
  const router = useRouter();
  const { hasPermission } = usePermission();
  const [activeTab, setActiveTab] = useState('all');
  const [showOnboard, setShowOnboard] = useState(false);

  const allDevelopers = mockDevelopers as unknown as DeveloperRow[];

  const filteredDevelopers = useMemo(() => {
    if (activeTab === 'active') return allDevelopers.filter((d) => d.status === 'active');
    if (activeTab === 'pending') return allDevelopers.filter((d) => d.status === 'pending');
    if (activeTab === 'inactive') return allDevelopers.filter((d) => d.status === 'inactive');
    return allDevelopers;
  }, [activeTab, allDevelopers]);

  const activeDevelopers = mockDevelopers.filter((d) => d.status === 'active');
  const pendingDevelopers = mockDevelopers.filter((d) => d.status === 'pending');
  const inactiveDevelopers = mockDevelopers.filter((d) => d.status === 'inactive');

  const tabs = [
    { key: 'all', label: 'All', count: mockDevelopers.length },
    { key: 'active', label: 'Active', count: activeDevelopers.length },
    { key: 'pending', label: 'Pending', count: pendingDevelopers.length },
    { key: 'inactive', label: 'Inactive', count: inactiveDevelopers.length },
  ];

  const columns: ColumnDef<DeveloperRow>[] = [
    {
      key: 'companyName',
      header: 'Company',
      accessor: (row) => (
        <span className="font-medium text-text-primary">{row.companyName}</span>
      ),
      sortable: true,
    },
    {
      key: 'contactName',
      header: 'Contact',
      accessor: (row) => row.contactName,
    },
    {
      key: 'email',
      header: 'Email',
      accessor: (row) => row.email,
    },
    {
      key: 'propertiesCount',
      header: 'Properties',
      accessor: (row) => row.propertiesCount,
    },
    {
      key: 'totalRaised',
      header: 'Total Raised',
      accessor: (row) => formatNaira(row.totalRaised),
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
  ];

  return (
    <div>
      <PageHeader
        title="Developer Partners"
        description="Manage property developer partnerships"
        actions={
          hasPermission('developers.full') ? (
            <Button onClick={() => setShowOnboard(true)}>
              <Plus className="w-4 h-4" />
              Add Developer
            </Button>
          ) : undefined
        }
      />

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="mt-6">
        <DataTable<DeveloperRow>
          columns={columns}
          data={filteredDevelopers}
          searchable
          searchPlaceholder="Search developers..."
          searchKeys={['companyName', 'contactName']}
          onRowClick={(row) => router.push(`/developers/${row.id}`)}
          emptyMessage="No developers found"
        />
      </div>

      <OnboardDeveloperModal
        open={showOnboard}
        onClose={() => setShowOnboard(false)}
        onSubmit={(data) => {
          console.log('Onboard developer:', data);
        }}
      />
    </div>
  );
}
