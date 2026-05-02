'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { DataTable } from '@/components/ui/DataTable';
import { AddStaffModal } from '@/components/staff/AddStaffModal';
import { EditRoleModal } from '@/components/staff/EditRoleModal';
import { useAuth } from '@/hooks/useAuth';
import { mockStaff } from '@/lib/mock-data';
import { ROLE_LABELS, ROLE_COLORS } from '@/lib/constants';
import { formatDate, formatRelativeTime } from '@/lib/format';
import type { StaffUser, ColumnDef } from '@/lib/types';

type StaffRow = StaffUser & Record<string, unknown>;

export default function StaffPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<StaffUser | null>(null);

  useEffect(() => {
    if (user && user.role !== 'ceo') {
      router.replace('/unauthorized');
    }
  }, [user, router]);

  if (!user || user.role !== 'ceo') return null;

  const columns: ColumnDef<StaffRow>[] = [
    {
      key: 'fullName',
      header: 'Name',
      accessor: (row) => (
        <span className="font-medium text-text-primary">{row.fullName}</span>
      ),
      sortable: true,
    },
    {
      key: 'email',
      header: 'Email',
      accessor: (row) => row.email,
    },
    {
      key: 'role',
      header: 'Role',
      accessor: (row) => (
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${ROLE_COLORS[row.role]}`}
        >
          {ROLE_LABELS[row.role]}
        </span>
      ),
    },
    {
      key: 'isActive',
      header: 'Status',
      accessor: (row) => (
        <Badge
          label={row.isActive ? 'Active' : 'Inactive'}
          variant={row.isActive ? 'success' : 'neutral'}
        />
      ),
    },
    {
      key: 'lastActiveAt',
      header: 'Last Active',
      accessor: (row) => formatRelativeTime(row.lastActiveAt),
    },
    {
      key: 'createdAt',
      header: 'Joined',
      accessor: (row) => formatDate(row.createdAt),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Staff Management"
        description="Manage staff accounts and roles"
        actions={
          <Button onClick={() => setShowAddStaff(true)}>
            <Plus className="w-4 h-4" />
            Add Staff
          </Button>
        }
      />

      <DataTable<StaffRow>
        columns={columns}
        data={mockStaff as unknown as StaffRow[]}
        searchable
        searchPlaceholder="Search staff..."
        searchKeys={['fullName', 'email']}
        onRowClick={(row) => setSelectedStaff(row as unknown as StaffUser)}
        emptyMessage="No staff members found"
      />

      <AddStaffModal
        open={showAddStaff}
        onClose={() => setShowAddStaff(false)}
        onSubmit={(data) => {
          console.log('Add staff:', data);
        }}
      />

      <EditRoleModal
        open={!!selectedStaff}
        onClose={() => setSelectedStaff(null)}
        staff={selectedStaff}
        onSubmit={(staffId, newRole) => {
          console.log('Update role:', staffId, newRole);
        }}
      />
    </div>
  );
}
