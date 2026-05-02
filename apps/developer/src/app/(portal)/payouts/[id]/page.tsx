'use client';

import { use } from 'react';
import { ArrowLeft } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { PayoutDetail } from '@/components/payouts/PayoutDetail';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { payouts } from '@/lib/mock-data';

export default function PayoutDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const payout = payouts.find((p) => p.id === id);

  if (!payout) {
    return <EmptyState title="Payout not found" description="This payout does not exist." />;
  }

  return (
    <>
      <div className="mb-4">
        <a href="/payouts" className="inline-flex items-center gap-1.5 text-sm text-text-tertiary hover:text-text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Payouts
        </a>
      </div>
      <PageHeader
        title={`${payout.propertyName} — ${payout.period}`}
        actions={
          <Badge label={payout.status} variant={payout.status === 'completed' ? 'success' : 'warning'} />
        }
      />
      <PayoutDetail payout={payout} />
    </>
  );
}
