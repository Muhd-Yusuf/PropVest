'use client';

import { Card } from '@/components/ui/Card';
import { formatNaira } from '@/lib/format';
import { payouts } from '@/lib/mock-data';

export function RevenueOverview() {
  const completedPayouts = payouts.filter((p) => p.status === 'completed');
  const totalRent = completedPayouts.reduce((sum, p) => sum + p.totalRentReceived, 0);
  const totalMgmtFee = completedPayouts.reduce((sum, p) => sum + p.managementFee, 0);
  const totalPlatformFee = completedPayouts.reduce((sum, p) => sum + p.platformFee, 0);
  const totalDistributed = completedPayouts.reduce((sum, p) => sum + p.distributableAmount, 0);

  const rows = [
    { label: 'Total Rent Collected', value: totalRent, color: 'text-emerald' },
    { label: 'Management Fees', value: totalMgmtFee, color: 'text-warning' },
    { label: 'Platform Fees', value: totalPlatformFee, color: 'text-text-tertiary' },
    { label: 'Distributed to Investors', value: totalDistributed, color: 'text-royal' },
  ];

  return (
    <Card>
      <h3 className="text-sm font-semibold text-text-primary mb-4">Revenue Overview</h3>
      <div className="space-y-3">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">{row.label}</span>
            <span className={`text-sm font-mono font-semibold ${row.color}`}>
              {formatNaira(row.value)}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border-subtle">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-text-primary">Net Developer Revenue</span>
          <span className="text-sm font-mono font-bold text-emerald">
            {formatNaira(totalMgmtFee)}
          </span>
        </div>
        <p className="text-xs text-text-tertiary mt-1">
          Management fees are your revenue from property operations
        </p>
      </div>
    </Card>
  );
}
