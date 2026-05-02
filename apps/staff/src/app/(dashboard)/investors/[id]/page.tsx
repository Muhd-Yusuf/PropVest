'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Snowflake, Flag } from 'lucide-react';
import { mockInvestors } from '@/lib/mock-data';
import { usePermission } from '@/hooks/usePermission';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { InvestorDetailTabs } from '@/components/investors/InvestorDetailTabs';
import { FreezeAccountModal } from '@/components/investors/FreezeAccountModal';
import { FlagAccountModal } from '@/components/investors/FlagAccountModal';

export default function InvestorDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { hasPermission } = usePermission();
  const [freezeModalOpen, setFreezeModalOpen] = useState(false);
  const [flagModalOpen, setFlagModalOpen] = useState(false);

  const investor = mockInvestors.find((inv) => inv.id === params.id) ?? null;

  if (!investor) {
    return (
      <div className="text-center py-20">
        <p className="text-text-tertiary">Investor not found</p>
        <Button variant="ghost" onClick={() => router.push('/investors')} className="mt-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Investors
        </Button>
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => router.push('/investors')}
        className="inline-flex items-center gap-1.5 text-sm text-text-tertiary hover:text-text-primary transition-colors mb-4 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Investors
      </button>

      <PageHeader
        title={investor.fullName}
        description={investor.email}
        actions={
          hasPermission('investors.full') ? (
            <>
              <Button
                variant={investor.isFrozen ? 'secondary' : 'danger'}
                size="sm"
                onClick={() => setFreezeModalOpen(true)}
              >
                <Snowflake className="w-4 h-4" />
                {investor.isFrozen ? 'Unfreeze' : 'Freeze'}
              </Button>
              <Button
                variant={investor.isFlagged ? 'secondary' : 'danger'}
                size="sm"
                onClick={() => setFlagModalOpen(true)}
              >
                <Flag className="w-4 h-4" />
                {investor.isFlagged ? 'Unflag' : 'Flag'}
              </Button>
            </>
          ) : undefined
        }
      />

      <div className="flex items-center gap-2 mb-6">
        {investor.isFrozen && <Badge label="Frozen" variant="error" />}
        {investor.isFlagged && <Badge label="Flagged" variant="warning" />}
        {!investor.isFrozen && !investor.isFlagged && <Badge label="Active" variant="success" />}
      </div>

      <InvestorDetailTabs investor={investor} />

      <FreezeAccountModal
        open={freezeModalOpen}
        onClose={() => setFreezeModalOpen(false)}
        investor={investor}
        onConfirm={(reason) => {
          console.log(`${investor.isFrozen ? 'Unfreeze' : 'Freeze'} investor ${investor.id}:`, reason);
        }}
      />

      <FlagAccountModal
        open={flagModalOpen}
        onClose={() => setFlagModalOpen(false)}
        investor={investor}
        onConfirm={(reason) => {
          console.log(`${investor.isFlagged ? 'Unflag' : 'Flag'} investor ${investor.id}:`, reason);
        }}
      />
    </div>
  );
}
