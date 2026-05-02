'use client';

import { Building2, Users, Shield, Wallet, TrendingUp } from 'lucide-react';
import { StatCard } from '@/components/ui/StatCard';
import { formatNaira, formatNumber } from '@/lib/format';
import {
  mockProperties,
  mockInvestors,
  mockKYCRecords,
  mockTransactions,
} from '@/lib/mock-data/index';

export function MetricsGrid() {
  const totalProperties = mockProperties.length;
  const activeInvestors = mockInvestors.length;
  const pendingKYC = mockKYCRecords.filter((k) => k.status === 'pending').length;
  const totalAUM = mockInvestors.reduce((sum, inv) => sum + inv.totalInvested, 0);
  const revenue = mockTransactions
    .filter((t) => t.type === 'fee')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      <StatCard
        label="Total Properties"
        value={formatNumber(totalProperties)}
        trend={{ value: 12.5, isPositive: true }}
        icon={Building2}
      />
      <StatCard
        label="Active Investors"
        value={formatNumber(activeInvestors)}
        trend={{ value: 8.3, isPositive: true }}
        icon={Users}
      />
      <StatCard
        label="Pending KYC"
        value={formatNumber(pendingKYC)}
        trend={{ value: 2.1, isPositive: false }}
        icon={Shield}
      />
      <StatCard
        label="Total AUM"
        value={formatNaira(totalAUM)}
        trend={{ value: 15.7, isPositive: true }}
        icon={Wallet}
      />
      <StatCard
        label="Revenue"
        value={formatNaira(revenue)}
        trend={{ value: 4.2, isPositive: true }}
        icon={TrendingUp}
      />
    </div>
  );
}
