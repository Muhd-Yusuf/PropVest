'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DataTable } from '@/components/ui/DataTable';
import { PropertyFilters } from '@/components/properties/PropertyFilters';
import { usePermission } from '@/hooks/usePermission';
import { mockProperties } from '@/lib/mock-data/index';
import { formatNaira, formatDate, formatNumber } from '@/lib/format';
import { PROPERTY_TYPE_LABELS } from '@/lib/constants';
import type { Property, PropertyStatus, ColumnDef } from '@/lib/types';

type PropertyRow = Property & Record<string, unknown>;

const statusBadgeVariant: Record<PropertyStatus, 'neutral' | 'warning' | 'success' | 'info'> = {
  draft: 'neutral',
  under_review: 'warning',
  active: 'success',
  paused: 'info',
  fully_funded: 'success',
  completed: 'neutral',
};

const statusLabels: Record<PropertyStatus, string> = {
  draft: 'Draft',
  under_review: 'Under Review',
  active: 'Active',
  paused: 'Paused',
  fully_funded: 'Fully Funded',
  completed: 'Completed',
};

const columns: ColumnDef<PropertyRow>[] = [
  {
    key: 'name',
    header: 'Name',
    accessor: (row) => row.name,
    sortable: true,
  },
  {
    key: 'type',
    header: 'Type',
    accessor: (row) => PROPERTY_TYPE_LABELS[row.type] || row.type,
  },
  {
    key: 'location',
    header: 'Location',
    accessor: (row) => `${row.location.area}, ${row.location.city}`,
  },
  {
    key: 'status',
    header: 'Status',
    accessor: (row) => (
      <Badge
        label={statusLabels[row.status]}
        variant={statusBadgeVariant[row.status]}
      />
    ),
  },
  {
    key: 'unitPrice',
    header: 'Price/Unit',
    accessor: (row) => formatNaira(row.unitPrice),
  },
  {
    key: 'unitsSold',
    header: 'Units Sold',
    accessor: (row) => `${formatNumber(row.unitsSold)}/${formatNumber(row.totalUnits)}`,
  },
  {
    key: 'totalValue',
    header: 'Total Value',
    accessor: (row) => formatNaira(row.totalValue),
  },
  {
    key: 'createdAt',
    header: 'Created',
    accessor: (row) => formatDate(row.createdAt),
  },
];

export default function PropertiesPage() {
  const router = useRouter();
  const { hasPermission } = usePermission();
  const [filters, setFilters] = useState({ search: '', type: '', status: '' });

  const filteredProperties = useMemo(() => {
    return mockProperties.filter((p) => {
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesLocation =
          p.location.area.toLowerCase().includes(query) ||
          p.location.city.toLowerCase().includes(query) ||
          p.location.state.toLowerCase().includes(query);
        const matchesDeveloper = p.developerName.toLowerCase().includes(query);
        if (!matchesName && !matchesLocation && !matchesDeveloper) return false;
      }
      if (filters.type && p.type !== filters.type) return false;
      if (filters.status && p.status !== filters.status) return false;
      return true;
    });
  }, [filters]);

  return (
    <div>
      <PageHeader
        title="Properties"
        description="Manage platform properties"
        actions={
          hasPermission('properties.crud') ? (
            <Button>
              <Plus className="w-4 h-4" />
              Add Property
            </Button>
          ) : undefined
        }
      />

      <div className="space-y-4">
        <PropertyFilters filters={filters} onChange={setFilters} />

        <DataTable<PropertyRow>
          columns={columns}
          data={filteredProperties as PropertyRow[]}
          onRowClick={(row) => router.push(`/properties/${row.id}`)}
          emptyMessage="No properties found"
          pageSize={10}
        />
      </div>
    </div>
  );
}
