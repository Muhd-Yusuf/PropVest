'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { mockKYCRecords } from '@/lib/mock-data';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { KYCReviewCard } from '@/components/kyc/KYCReviewCard';

export default function KYCDetailPage() {
  const params = useParams();
  const router = useRouter();

  const record = mockKYCRecords.find((r) => r.id === params.id) ?? null;

  if (!record) {
    return (
      <div className="text-center py-20">
        <p className="text-text-tertiary">KYC record not found</p>
        <Button variant="ghost" onClick={() => router.push('/kyc')} className="mt-4">
          <ArrowLeft className="w-4 h-4" />
          Back to KYC Queue
        </Button>
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => router.push('/kyc')}
        className="inline-flex items-center gap-1.5 text-sm text-text-tertiary hover:text-text-primary transition-colors mb-4 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to KYC Queue
      </button>

      <PageHeader
        title={`KYC Review — ${record.investorName}`}
        description={`${record.method === 'bank_account' ? 'Bank Account' : record.method.toUpperCase()} verification for Tier ${record.tier}`}
      />

      <KYCReviewCard
        record={record}
        onApprove={(id, notes) => {
          console.log('Approve KYC:', id, notes);
        }}
        onReject={(id, notes) => {
          console.log('Reject KYC:', id, notes);
        }}
      />
    </div>
  );
}
