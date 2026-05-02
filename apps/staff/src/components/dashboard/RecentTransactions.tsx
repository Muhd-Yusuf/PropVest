'use client';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatNaira, formatRelativeTime } from '@/lib/format';
import { mockTransactions } from '@/lib/mock-data/index';
import type { TransactionType, TransactionStatus } from '@/lib/types';

const typeBadgeVariant: Record<TransactionType, 'info' | 'success' | 'neutral' | 'warning'> = {
  investment: 'info',
  payout: 'success',
  p2p_buy: 'neutral',
  p2p_sell: 'warning',
  fee: 'neutral',
};

const typeLabels: Record<TransactionType, string> = {
  investment: 'Investment',
  payout: 'Payout',
  p2p_buy: 'P2P Buy',
  p2p_sell: 'P2P Sell',
  fee: 'Fee',
};

const statusBadgeVariant: Record<TransactionStatus, 'success' | 'warning' | 'error'> = {
  success: 'success',
  pending: 'warning',
  failed: 'error',
};

const statusLabels: Record<TransactionStatus, string> = {
  success: 'Success',
  pending: 'Pending',
  failed: 'Failed',
};

export function RecentTransactions() {
  const recentTxns = [...mockTransactions]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 8);

  return (
    <Card>
      <h3 className="text-base font-semibold text-text-primary mb-4">Recent Transactions</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-default">
              <th className="py-2 px-3 text-left text-xs font-medium text-text-tertiary uppercase tracking-wider">
                User
              </th>
              <th className="py-2 px-3 text-left text-xs font-medium text-text-tertiary uppercase tracking-wider">
                Type
              </th>
              <th className="py-2 px-3 text-left text-xs font-medium text-text-tertiary uppercase tracking-wider">
                Amount
              </th>
              <th className="py-2 px-3 text-left text-xs font-medium text-text-tertiary uppercase tracking-wider">
                Status
              </th>
              <th className="py-2 px-3 text-left text-xs font-medium text-text-tertiary uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {recentTxns.map((txn) => (
              <tr key={txn.id} className="hover:bg-bg-tertiary transition-colors duration-100">
                <td className="py-2.5 px-3 text-sm text-text-primary">{txn.userName}</td>
                <td className="py-2.5 px-3">
                  <Badge
                    label={typeLabels[txn.type]}
                    variant={typeBadgeVariant[txn.type]}
                  />
                </td>
                <td className="py-2.5 px-3 text-sm font-mono text-text-primary">
                  {formatNaira(txn.amount)}
                </td>
                <td className="py-2.5 px-3">
                  <Badge
                    label={statusLabels[txn.status]}
                    variant={statusBadgeVariant[txn.status]}
                  />
                </td>
                <td className="py-2.5 px-3 text-sm text-text-tertiary">
                  {formatRelativeTime(txn.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
