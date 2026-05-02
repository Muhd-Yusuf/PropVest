'use client';

import { useState, useMemo } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Select } from '@/components/ui/Select';
import { DataTable } from '@/components/ui/DataTable';
import { mockAuditLogs } from '@/lib/mock-data';
import { ALL_ROLES, ROLE_LABELS, ROLE_COLORS } from '@/lib/constants';
import { formatDateTime } from '@/lib/format';
import type { AuditLogEntry, ColumnDef } from '@/lib/types';

type AuditLogRow = AuditLogEntry & Record<string, unknown>;

export default function AuditLogPage() {
  const [roleFilter, setRoleFilter] = useState<string>('all');

  const roleOptions = [
    { value: 'all', label: 'All Roles' },
    ...ALL_ROLES.map((r) => ({
      value: r,
      label: ROLE_LABELS[r],
    })),
  ];

  const filteredLogs = useMemo(() => {
    const logs = mockAuditLogs as unknown as AuditLogRow[];
    if (roleFilter === 'all') return logs;
    return logs.filter((log) => log.userRole === roleFilter);
  }, [roleFilter]);

  const columns: ColumnDef<AuditLogRow>[] = [
    {
      key: 'userName',
      header: 'Staff',
      accessor: (row) => (
        <span className="font-medium text-text-primary">{row.userName}</span>
      ),
      sortable: true,
    },
    {
      key: 'userRole',
      header: 'Role',
      accessor: (row) => (
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${ROLE_COLORS[row.userRole]}`}
        >
          {ROLE_LABELS[row.userRole]}
        </span>
      ),
    },
    {
      key: 'action',
      header: 'Action',
      accessor: (row) => (
        <span className="font-mono text-xs text-text-primary">{row.action}</span>
      ),
    },
    {
      key: 'resource',
      header: 'Resource',
      accessor: (row) => row.resource,
    },
    {
      key: 'details',
      header: 'Details',
      accessor: (row) => (
        <span className="text-xs text-text-secondary line-clamp-1 max-w-[200px]" title={row.details}>
          {row.details}
        </span>
      ),
    },
    {
      key: 'ipAddress',
      header: 'IP Address',
      accessor: (row) => (
        <span className="font-mono text-xs text-text-tertiary">{row.ipAddress}</span>
      ),
    },
    {
      key: 'createdAt',
      header: 'Timestamp',
      accessor: (row) => formatDateTime(row.createdAt),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Audit Log"
        description="Track all staff actions on the platform"
      />

      <div className="mb-4 max-w-xs">
        <Select
          label="Filter by Role"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          options={roleOptions}
        />
      </div>

      <DataTable<AuditLogRow>
        columns={columns}
        data={filteredLogs}
        searchable
        searchPlaceholder="Search audit logs..."
        searchKeys={['userName', 'action', 'resource', 'details']}
        pageSize={15}
        emptyMessage="No audit log entries found"
      />
    </div>
  );
}
