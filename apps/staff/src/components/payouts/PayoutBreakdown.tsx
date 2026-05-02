'use client';

import type { Payout } from '@/lib/types';
import { formatNairaFull } from '@/lib/format';
import { Card } from '@/components/ui/Card';

interface PayoutBreakdownProps {
  payout: Payout;
}

export function PayoutBreakdown({ payout }: PayoutBreakdownProps) {
  const total = payout.totalRentReceived;
  const mgmtPercent = total > 0 ? (payout.managementFee / total) * 100 : 0;
  const platformPercent = total > 0 ? (payout.platformShare / total) * 100 : 0;
  const distributablePercent = total > 0 ? (payout.distributableAmount / total) * 100 : 0;

  return (
    <Card>
      <h3 className="text-sm font-semibold text-text-primary mb-4">Payout Breakdown</h3>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">Total Rent Received</span>
          <span className="text-sm font-mono font-medium text-text-primary">
            {formatNairaFull(payout.totalRentReceived)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">Management Fee</span>
          <span className="text-sm font-mono text-error">
            -{formatNairaFull(payout.managementFee)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">Platform Share</span>
          <span className="text-sm font-mono text-error">
            -{formatNairaFull(payout.platformShare)}
          </span>
        </div>
        <div className="border-t border-border-default pt-3 flex items-center justify-between">
          <span className="text-sm font-semibold text-text-primary">Distributable Amount</span>
          <span className="text-sm font-mono font-bold text-emerald">
            {formatNairaFull(payout.distributableAmount)}
          </span>
        </div>
      </div>

      {/* Horizontal stacked bar */}
      <div className="mt-5">
        <div className="w-full h-3 rounded-full overflow-hidden flex bg-bg-tertiary">
          <div
            className="bg-red-400 h-full transition-all duration-300"
            style={{ width: `${mgmtPercent}%` }}
            title={`Management Fee: ${mgmtPercent.toFixed(1)}%`}
          />
          <div
            className="bg-amber-400 h-full transition-all duration-300"
            style={{ width: `${platformPercent}%` }}
            title={`Platform Share: ${platformPercent.toFixed(1)}%`}
          />
          <div
            className="bg-emerald h-full transition-all duration-300"
            style={{ width: `${distributablePercent}%` }}
            title={`Distributable: ${distributablePercent.toFixed(1)}%`}
          />
        </div>
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="text-xs text-text-tertiary">Mgmt Fee ({mgmtPercent.toFixed(1)}%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="text-xs text-text-tertiary">Platform ({platformPercent.toFixed(1)}%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald" />
            <span className="text-xs text-text-tertiary">Distributable ({distributablePercent.toFixed(1)}%)</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
