'use client';

import { Building2, Users, Wallet, TrendingUp } from 'lucide-react';
import { StatCard } from '@/components/ui/StatCard';
import { formatNaira } from '@/lib/format';
import { properties, investors, payouts } from '@/lib/mock-data';

export function DeveloperStats() {
  const totalRaised = properties.reduce((sum, p) => sum + p.unitsSold * p.unitPrice, 0);
  const totalInvestors = new Set(investors.map((i) => i.id)).size;
  const totalPayoutsDistributed = payouts
    .filter((p) => p.status === 'completed')
    .reduce((sum, p) => sum + p.distributableAmount, 0);
  const activeProperties = properties.filter((p) => p.status === 'active').length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        label="Total Raised"
        value={formatNaira(totalRaised)}
        icon={TrendingUp}
        trend={{ value: 12.4, isPositive: true }}
      />
      <StatCard
        label="Total Investors"
        value={totalInvestors.toLocaleString()}
        icon={Users}
        trend={{ value: 8.2, isPositive: true }}
      />
      <StatCard
        label="Payouts Distributed"
        value={formatNaira(totalPayoutsDistributed)}
        icon={Wallet}
      />
      <StatCard
        label="Active Properties"
        value={String(activeProperties)}
        icon={Building2}
      />
    </div>
  );
}
