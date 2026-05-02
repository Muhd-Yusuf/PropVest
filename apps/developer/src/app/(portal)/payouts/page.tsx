'use client';

import { PageHeader } from '@/components/layout/PageHeader';
import { StatCard } from '@/components/ui/StatCard';
import { PayoutHistory } from '@/components/payouts/PayoutHistory';
import { formatNaira } from '@/lib/format';
import { payouts } from '@/lib/mock-data';
import { Wallet, ArrowUpRight, Users } from 'lucide-react';

export default function PayoutsPage() {
  const completed = payouts.filter((p) => p.status === 'completed');
  const totalDistributed = completed.reduce((sum, p) => sum + p.distributableAmount, 0);
  const totalRent = completed.reduce((sum, p) => sum + p.totalRentReceived, 0);
  const totalInvestorsPaid = completed.reduce((sum, p) => sum + p.investorPayouts.length, 0);

  return (
    <>
      <PageHeader title="Payouts" description="Track rent collection and investor distributions." />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard label="Total Rent Collected" value={formatNaira(totalRent)} icon={Wallet} />
        <StatCard label="Total Distributed" value={formatNaira(totalDistributed)} icon={ArrowUpRight} />
        <StatCard label="Investors Paid" value={String(totalInvestorsPaid)} icon={Users} />
      </div>

      <PayoutHistory />
    </>
  );
}
