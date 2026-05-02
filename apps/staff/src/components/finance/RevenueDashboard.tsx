'use client';

import { useMemo } from 'react';
import { DollarSign, TrendingUp, Landmark } from 'lucide-react';
import { StatCard } from '@/components/ui/StatCard';
import { Card } from '@/components/ui/Card';
import { mockTransactions } from '@/lib/mock-data';
import { formatNaira } from '@/lib/format';

export function RevenueDashboard() {
  const stats = useMemo(() => {
    const feeTransactions = mockTransactions.filter(
      (t) => t.type === 'fee' && t.status === 'success',
    );
    const totalRevenue = feeTransactions.reduce((sum, t) => sum + t.amount, 0);

    const investmentFees = mockTransactions
      .filter((t) => t.type === 'investment' && t.status === 'success')
      .reduce((sum, t) => sum + t.fee, 0);

    const p2pFees = mockTransactions
      .filter(
        (t) =>
          (t.type === 'p2p_buy' || t.type === 'p2p_sell') && t.status === 'success',
      )
      .reduce((sum, t) => sum + t.fee, 0);

    const payoutFees = mockTransactions
      .filter((t) => t.type === 'payout' && t.status === 'success')
      .reduce((sum, t) => sum + t.fee, 0);

    const platformFees = totalRevenue + investmentFees + p2pFees + payoutFees;

    const successfulInvestments = mockTransactions
      .filter((t) => t.type === 'investment' && t.status === 'success')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalRevenue: platformFees,
      platformFees: totalRevenue,
      totalAUM: successfulInvestments,
      investmentFees,
      payoutFees,
      p2pFees,
    };
  }, []);

  const maxFee = Math.max(stats.investmentFees, stats.payoutFees, stats.p2pFees, 1);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          label="Total Revenue"
          value={formatNaira(stats.totalRevenue)}
          icon={DollarSign}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatCard
          label="Platform Fees"
          value={formatNaira(stats.platformFees)}
          icon={TrendingUp}
          trend={{ value: 8.3, isPositive: true }}
        />
        <StatCard
          label="Total AUM"
          value={formatNaira(stats.totalAUM)}
          icon={Landmark}
          trend={{ value: 15.2, isPositive: true }}
        />
      </div>

      <Card>
        <h3 className="text-sm font-semibold text-text-primary mb-4">
          Revenue by Type
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-text-secondary">Investment Fees</span>
              <span className="text-sm font-medium text-text-primary">
                {formatNaira(stats.investmentFees)}
              </span>
            </div>
            <div className="h-3 bg-bg-tertiary rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald rounded-full transition-all duration-500"
                style={{
                  width: `${(stats.investmentFees / maxFee) * 100}%`,
                }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-text-secondary">Payout Fees</span>
              <span className="text-sm font-medium text-text-primary">
                {formatNaira(stats.payoutFees)}
              </span>
            </div>
            <div className="h-3 bg-bg-tertiary rounded-full overflow-hidden">
              <div
                className="h-full bg-royal rounded-full transition-all duration-500"
                style={{
                  width: `${(stats.payoutFees / maxFee) * 100}%`,
                }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-text-secondary">P2P Trading Fees</span>
              <span className="text-sm font-medium text-text-primary">
                {formatNaira(stats.p2pFees)}
              </span>
            </div>
            <div className="h-3 bg-bg-tertiary rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-500"
                style={{
                  width: `${(stats.p2pFees / maxFee) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
