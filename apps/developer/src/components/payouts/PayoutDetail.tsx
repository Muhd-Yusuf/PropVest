'use client';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatNaira, formatNairaFull } from '@/lib/format';
import type { Payout } from '@/lib/types';

interface PayoutDetailProps {
  payout: Payout;
}

export function PayoutDetail({ payout }: PayoutDetailProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <p className="text-xs text-text-tertiary uppercase mb-1">Rent Collected</p>
          <p className="text-xl font-bold font-mono text-text-primary">{formatNaira(payout.totalRentReceived)}</p>
        </Card>
        <Card>
          <p className="text-xs text-text-tertiary uppercase mb-1">Management Fee</p>
          <p className="text-xl font-bold font-mono text-warning">{formatNaira(payout.managementFee)}</p>
        </Card>
        <Card>
          <p className="text-xs text-text-tertiary uppercase mb-1">Platform Fee</p>
          <p className="text-xl font-bold font-mono text-text-tertiary">{formatNaira(payout.platformFee)}</p>
        </Card>
        <Card>
          <p className="text-xs text-text-tertiary uppercase mb-1">Distributed</p>
          <p className="text-xl font-bold font-mono text-emerald">{formatNaira(payout.distributableAmount)}</p>
        </Card>
      </div>

      <Card>
        <h3 className="text-sm font-semibold text-text-primary mb-4">Investor Breakdown ({payout.investorPayouts.length})</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-default">
                <th className="text-left py-3 px-3 font-medium text-text-tertiary">Investor</th>
                <th className="text-right py-3 px-3 font-medium text-text-tertiary">Units</th>
                <th className="text-right py-3 px-3 font-medium text-text-tertiary">Amount</th>
                <th className="text-center py-3 px-3 font-medium text-text-tertiary">Status</th>
              </tr>
            </thead>
            <tbody>
              {payout.investorPayouts.map((ip) => (
                <tr key={ip.investorId} className="border-b border-border-subtle last:border-0">
                  <td className="py-3 px-3 font-medium text-text-primary">{ip.investorName}</td>
                  <td className="py-3 px-3 text-right font-mono text-text-primary">{ip.units}</td>
                  <td className="py-3 px-3 text-right font-mono text-text-primary">{formatNairaFull(ip.amount)}</td>
                  <td className="py-3 px-3 text-center">
                    <Badge label={ip.status} variant={ip.status === 'sent' ? 'success' : ip.status === 'failed' ? 'error' : 'warning'} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
