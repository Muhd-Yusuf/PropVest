'use client';

import { useMemo } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { DataTable } from '@/components/ui/DataTable';
import { mockTransactions } from '@/lib/mock-data';
import { formatNaira, formatDateTime } from '@/lib/format';
import type { Transaction, ColumnDef } from '@/lib/types';

type TransactionRow = Transaction & Record<string, unknown>;

const statusVariant: Record<string, 'success' | 'warning' | 'error' | 'info' | 'neutral'> = {
  success: 'success',
  pending: 'warning',
  failed: 'error',
};

const typeLabels: Record<string, string> = {
  investment: 'Investment',
  payout: 'Payout',
  p2p_buy: 'P2P Buy',
  p2p_sell: 'P2P Sell',
  fee: 'Fee',
};

export function TransactionMonitor() {
  const flaggedTransactions = useMemo(() => {
    const largeAmount = mockTransactions.filter((t) => t.amount > 5000000);
    const failed = mockTransactions.filter((t) => t.status === 'failed');

    // Same-day multiple transactions by same user
    const userDayMap = new Map<string, Transaction[]>();
    mockTransactions.forEach((t) => {
      const dateKey = `${t.userId}-${t.createdAt.split('T')[0]}`;
      const list = userDayMap.get(dateKey) || [];
      list.push(t);
      userDayMap.set(dateKey, list);
    });

    const sameDayMultiple: Transaction[] = [];
    userDayMap.forEach((txns) => {
      if (txns.length > 1) {
        sameDayMultiple.push(...txns);
      }
    });

    // Deduplicate
    const seen = new Set<string>();
    const all: Transaction[] = [];
    [...largeAmount, ...failed, ...sameDayMultiple].forEach((t) => {
      if (!seen.has(t.id)) {
        seen.add(t.id);
        all.push(t);
      }
    });

    return (all.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    ) as unknown) as TransactionRow[];
  }, []);

  const columns: ColumnDef<TransactionRow>[] = [
    {
      key: 'userName',
      header: 'User',
      accessor: (row) => (
        <span className="font-medium text-text-primary">{row.userName}</span>
      ),
      sortable: true,
    },
    {
      key: 'type',
      header: 'Type',
      accessor: (row) => typeLabels[row.type] || row.type,
    },
    {
      key: 'amount',
      header: 'Amount',
      accessor: (row) => formatNaira(row.amount),
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
      key: 'reference',
      header: 'Reference',
      accessor: (row) => (
        <span className="font-mono text-xs text-text-secondary">{row.reference}</span>
      ),
    },
    {
      key: 'createdAt',
      header: 'Date',
      accessor: (row) => formatDateTime(row.createdAt),
    },
  ];

  return (
    <Card>
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-4 h-4 text-amber-500" />
        <h3 className="text-sm font-semibold text-text-primary">
          Flagged Transactions
        </h3>
        <Badge
          label={`${flaggedTransactions.length} flagged`}
          variant="warning"
        />
      </div>
      <p className="text-xs text-text-tertiary mb-4">
        Transactions flagged for: large amounts (&gt;N5M), failed status, or same-day
        multiple transactions by the same user.
      </p>
      <DataTable<TransactionRow>
        columns={columns}
        data={flaggedTransactions}
        emptyMessage="No flagged transactions"
      />
    </Card>
  );
}
