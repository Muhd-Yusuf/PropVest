'use client';

import { Card } from '@/components/ui/Card';
import { StatCard } from '@/components/ui/StatCard';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { formatNaira, formatPercent } from '@/lib/format';
import { analyticsSummary } from '@/lib/mock-data';
import { Users, TrendingUp, Home, BarChart3 } from 'lucide-react';

export function InvestorAnalytics() {
  const { totalInvestors, totalRaised, totalPayoutsDistributed, propertiesListed, averageOccupancy, investorGrowth, investmentTrend } = analyticsSummary;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Investors" value={totalInvestors.toLocaleString()} icon={Users} />
        <StatCard label="Total Raised" value={formatNaira(totalRaised)} icon={TrendingUp} />
        <StatCard label="Payouts Distributed" value={formatNaira(totalPayoutsDistributed)} icon={BarChart3} />
        <StatCard label="Avg. Occupancy" value={formatPercent(averageOccupancy)} icon={Home} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-sm font-semibold text-text-primary mb-4">Investor Growth</h3>
          <div className="space-y-3">
            {investorGrowth.map((item) => (
              <div key={item.month}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-text-tertiary">{item.month}</span>
                  <span className="font-mono font-medium text-text-primary">{item.count.toLocaleString()}</span>
                </div>
                <ProgressBar value={Math.round((item.count / totalInvestors) * 100)} />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-semibold text-text-primary mb-4">Investment Trend</h3>
          <div className="space-y-3">
            {investmentTrend.map((item) => (
              <div key={item.month}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-text-tertiary">{item.month}</span>
                  <span className="font-mono font-medium text-text-primary">{formatNaira(item.amount)}</span>
                </div>
                <ProgressBar value={Math.round((item.amount / totalRaised) * 100)} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
