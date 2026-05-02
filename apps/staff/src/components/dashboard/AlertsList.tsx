'use client';

import { AlertTriangle, XCircle, Flag } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import {
  mockInvestors,
  mockTransactions,
  mockP2PTrades,
} from '@/lib/mock-data/index';

export function AlertsList() {
  const frozenAccounts = mockInvestors.filter((inv) => inv.isFrozen).length;
  const flaggedAccounts = mockInvestors.filter((inv) => inv.isFlagged).length;
  const failedTransactions = mockTransactions.filter((t) => t.status === 'failed').length;
  const flaggedTrades = mockP2PTrades.filter((t) => t.isFlagged).length;

  const alerts = [
    {
      icon: XCircle,
      iconColor: 'text-error',
      bgColor: 'bg-error-bg',
      label: `${frozenAccounts} frozen investor account${frozenAccounts !== 1 ? 's' : ''} requiring review`,
      severity: 'error' as const,
    },
    {
      icon: Flag,
      iconColor: 'text-amber-700',
      bgColor: 'bg-warning-bg',
      label: `${flaggedAccounts} flagged account${flaggedAccounts !== 1 ? 's' : ''} pending investigation`,
      severity: 'warning' as const,
    },
    {
      icon: AlertTriangle,
      iconColor: 'text-error',
      bgColor: 'bg-error-bg',
      label: `${failedTransactions} failed transaction${failedTransactions !== 1 ? 's' : ''} need attention`,
      severity: 'error' as const,
    },
    {
      icon: Flag,
      iconColor: 'text-amber-700',
      bgColor: 'bg-warning-bg',
      label: `${flaggedTrades} flagged P2P trade${flaggedTrades !== 1 ? 's' : ''} under review`,
      severity: 'warning' as const,
    },
  ];

  return (
    <Card>
      <h3 className="text-base font-semibold text-text-primary mb-4">Alerts</h3>
      <div className="space-y-3">
        {alerts.map((alert, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 rounded-lg bg-bg-tertiary"
          >
            <div className={`w-8 h-8 rounded-full ${alert.bgColor} flex items-center justify-center shrink-0`}>
              <alert.icon className={`w-4 h-4 ${alert.iconColor}`} />
            </div>
            <span className="text-sm text-text-primary">{alert.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
