'use client';

import { useState } from 'react';
import { Tabs } from '@/components/ui/Tabs';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { DataTable } from '@/components/ui/DataTable';
import { mockProperties } from '@/lib/mock-data';
import { formatNaira, formatDate } from '@/lib/format';
import { PROPERTY_TYPE_LABELS, PROPERTY_STATUS_LABELS } from '@/lib/constants';
import type { DeveloperPartner, Property, ColumnDef } from '@/lib/types';

type PropertyRow = Property & Record<string, unknown>;

const statusVariant: Record<string, 'success' | 'warning' | 'error' | 'info' | 'neutral'> = {
  active: 'success',
  pending: 'warning',
  inactive: 'neutral',
};

const propertyStatusVariant: Record<string, 'success' | 'warning' | 'error' | 'info' | 'neutral'> = {
  draft: 'neutral',
  under_review: 'warning',
  active: 'success',
  paused: 'error',
  fully_funded: 'info',
  completed: 'success',
};

interface DeveloperDetailTabsProps {
  developer: DeveloperPartner;
}

export function DeveloperDetailTabs({ developer }: DeveloperDetailTabsProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const developerProperties = (mockProperties as unknown as PropertyRow[]).filter(
    (p) => p.developerId === developer.id,
  );

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'properties', label: 'Properties', count: developerProperties.length },
    { key: 'financial', label: 'Financial' },
  ];

  const propertyColumns: ColumnDef<PropertyRow>[] = [
    {
      key: 'name',
      header: 'Property Name',
      accessor: (row) => row.name,
      sortable: true,
    },
    {
      key: 'type',
      header: 'Type',
      accessor: (row) => PROPERTY_TYPE_LABELS[row.type] || row.type,
    },
    {
      key: 'status',
      header: 'Status',
      accessor: (row) => (
        <Badge
          label={PROPERTY_STATUS_LABELS[row.status] || row.status}
          variant={propertyStatusVariant[row.status] || 'neutral'}
        />
      ),
    },
    {
      key: 'totalValue',
      header: 'Value',
      accessor: (row) => formatNaira(row.totalValue),
    },
  ];

  return (
    <div>
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="mt-6">
        {activeTab === 'overview' && (
          <Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-text-tertiary uppercase tracking-wider font-medium">
                    Company Name
                  </p>
                  <p className="text-sm text-text-primary mt-1">
                    {developer.companyName}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-text-tertiary uppercase tracking-wider font-medium">
                    Contact Person
                  </p>
                  <p className="text-sm text-text-primary mt-1">
                    {developer.contactName}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-text-tertiary uppercase tracking-wider font-medium">
                    Email
                  </p>
                  <p className="text-sm text-text-primary mt-1">
                    {developer.email}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-text-tertiary uppercase tracking-wider font-medium">
                    Phone
                  </p>
                  <p className="text-sm text-text-primary mt-1">
                    {developer.phone}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-text-tertiary uppercase tracking-wider font-medium">
                    Status
                  </p>
                  <div className="mt-1">
                    <Badge
                      label={developer.status.charAt(0).toUpperCase() + developer.status.slice(1)}
                      variant={statusVariant[developer.status] || 'neutral'}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-xs text-text-tertiary uppercase tracking-wider font-medium">
                    Joined
                  </p>
                  <p className="text-sm text-text-primary mt-1">
                    {formatDate(developer.createdAt)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-text-tertiary uppercase tracking-wider font-medium">
                    Bio
                  </p>
                  <p className="text-sm text-text-primary mt-1 leading-relaxed">
                    {developer.bio}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )}

        {activeTab === 'properties' && (
          <Card>
            <DataTable<PropertyRow>
              columns={propertyColumns}
              data={developerProperties}
              emptyMessage="No properties listed by this developer"
            />
          </Card>
        )}

        {activeTab === 'financial' && (
          <Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-text-tertiary uppercase tracking-wider font-medium">
                    Total Raised
                  </p>
                  <p className="text-2xl font-mono font-bold text-text-primary mt-1">
                    {formatNaira(developer.totalRaised)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-text-tertiary uppercase tracking-wider font-medium">
                    Total Investors
                  </p>
                  <p className="text-2xl font-mono font-bold text-text-primary mt-1">
                    {developer.totalInvestors.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-text-tertiary uppercase tracking-wider font-medium">
                    Bank Name
                  </p>
                  <p className="text-sm text-text-primary mt-1">
                    {developer.bankName}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-text-tertiary uppercase tracking-wider font-medium">
                    Account Number
                  </p>
                  <p className="text-sm font-mono text-text-primary mt-1">
                    {developer.bankAccountNumber}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-text-tertiary uppercase tracking-wider font-medium">
                    Account Name
                  </p>
                  <p className="text-sm text-text-primary mt-1">
                    {developer.bankAccountName}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
