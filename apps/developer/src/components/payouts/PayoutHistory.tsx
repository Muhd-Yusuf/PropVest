'use client';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatNaira, formatDate } from '@/lib/format';
import { payouts } from '@/lib/mock-data';

export function PayoutHistory() {
  return (
    <Card>
      {payouts.length === 0 ? (
        <p className="text-sm text-text-tertiary text-center py-8">No payouts yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-default">
                <th className="text-left py-3 px-3 font-medium text-text-tertiary">Property</th>
                <th className="text-left py-3 px-3 font-medium text-text-tertiary">Period</th>
                <th className="text-right py-3 px-3 font-medium text-text-tertiary">Rent Collected</th>
                <th className="text-right py-3 px-3 font-medium text-text-tertiary">Distributed</th>
                <th className="text-center py-3 px-3 font-medium text-text-tertiary">Status</th>
                <th className="text-right py-3 px-3 font-medium text-text-tertiary">Date</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((payout) => (
                <tr key={payout.id} className="border-b border-border-subtle last:border-0 hover:bg-bg-secondary transition-colors">
                  <td className="py-3 px-3">
                    <a href={`/payouts/${payout.id}`} className="font-medium text-text-primary hover:text-emerald transition-colors">
                      {payout.propertyName}
                    </a>
                  </td>
                  <td className="py-3 px-3 text-text-secondary">{payout.period}</td>
                  <td className="py-3 px-3 text-right font-mono text-text-primary">{formatNaira(payout.totalRentReceived)}</td>
                  <td className="py-3 px-3 text-right font-mono text-emerald">{formatNaira(payout.distributableAmount)}</td>
                  <td className="py-3 px-3 text-center">
                    <Badge label={payout.status} variant={payout.status === 'completed' ? 'success' : payout.status === 'processing' ? 'warning' : 'neutral'} />
                  </td>
                  <td className="py-3 px-3 text-right text-text-tertiary">{formatDate(payout.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
