'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Send, RotateCcw } from 'lucide-react';
import type { InvestorPayout, ColumnDef } from '@/lib/types';
import { mockPayouts } from '@/lib/mock-data';
import { formatNaira } from '@/lib/format';
import { usePermission } from '@/hooks/usePermission';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { DataTable } from '@/components/ui/DataTable';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { PayoutBreakdown } from '@/components/payouts/PayoutBreakdown';
import { PayoutStatusBadge } from '@/components/payouts/PayoutStatusBadge';
import { PayoutApproveModal } from '@/components/payouts/PayoutApproveModal';
import { ProcessPayoutModal } from '@/components/payouts/ProcessPayoutModal';

type InvestorPayoutRow = InvestorPayout & Record<string, unknown>;

const payoutStatusVariant: Record<string, 'success' | 'warning' | 'error'> = {
  pending: 'warning',
  sent: 'success',
  failed: 'error',
};

export default function PayoutDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { hasPermission } = usePermission();
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [processModalOpen, setProcessModalOpen] = useState(false);

  const payout = mockPayouts.find((p) => p.id === params.id) ?? null;

  if (!payout) {
    return (
      <div className="text-center py-20">
        <p className="text-text-tertiary">Payout not found</p>
        <Button variant="ghost" onClick={() => router.push('/payouts')} className="mt-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Payouts
        </Button>
      </div>
    );
  }

  const canApprove =
    hasPermission('payouts.approve') && payout.status === 'pending_approval';
  const canProcess =
    hasPermission('payouts.full') && payout.status === 'approved';
  const canRetry =
    hasPermission('payouts.full') && payout.status === 'partial';

  const sentCount = payout.investorPayouts.filter((p) => p.status === 'sent').length;
  const failedCount = payout.investorPayouts.filter((p) => p.status === 'failed').length;
  const pendingCount = payout.investorPayouts.filter((p) => p.status === 'pending').length;
  const totalCount = payout.investorPayouts.length;

  const investorPayoutColumns: ColumnDef<InvestorPayoutRow>[] = [
    {
      key: 'investorName',
      header: 'Investor',
      sortable: true,
      accessor: (row) => <span className="font-medium">{row.investorName}</span>,
    },
    {
      key: 'units',
      header: 'Units',
      accessor: (row) => row.units,
    },
    {
      key: 'share',
      header: 'Share %',
      accessor: (row) => `${row.share}%`,
    },
    {
      key: 'amount',
      header: 'Amount',
      accessor: (row) => (
        <span className="font-mono">{formatNaira(row.amount as number)}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      accessor: (row) => {
        const status = row.status as string;
        return (
          <Badge
            label={status.charAt(0).toUpperCase() + status.slice(1)}
            variant={payoutStatusVariant[status] ?? 'neutral'}
          />
        );
      },
    },
    {
      key: 'bank',
      header: 'Bank',
      accessor: (row) => (
        <span className="text-text-secondary">
          {row.bankName} — <span className="font-mono">{row.accountNumber}</span>
        </span>
      ),
    },
    ...(canRetry
      ? [
          {
            key: 'action',
            header: '',
            width: '80px',
            accessor: (row: InvestorPayoutRow) => {
              if ((row.status as string) === 'failed') {
                return (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      console.log('Retry transfer for:', row.investorName);
                    }}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Retry
                  </Button>
                );
              }
              return null;
            },
          } as ColumnDef<InvestorPayoutRow>,
        ]
      : []),
  ];

  return (
    <div>
      <button
        type="button"
        onClick={() => router.push('/payouts')}
        className="inline-flex items-center gap-1.5 text-sm text-text-tertiary hover:text-text-primary transition-colors mb-4 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Payouts
      </button>

      <PageHeader
        title={`${payout.propertyName} — ${payout.quarter}`}
        description={`Payout distribution for ${totalCount} investors`}
        actions={
          <div className="flex items-center gap-2">
            {canApprove && (
              <Button onClick={() => setApproveModalOpen(true)}>
                Approve Payout
              </Button>
            )}
            {canProcess && (
              <Button onClick={() => setProcessModalOpen(true)}>
                <Send className="w-4 h-4" />
                Process via Paystack
              </Button>
            )}
            {canRetry && (
              <Button variant="danger" onClick={() => setProcessModalOpen(true)}>
                <RotateCcw className="w-4 h-4" />
                Retry Failed ({failedCount})
              </Button>
            )}
          </div>
        }
      />

      <div className="flex items-center gap-2 mb-6">
        <PayoutStatusBadge status={payout.status} />
      </div>

      {/* Processing status tracker */}
      {(payout.status === 'processing' || payout.status === 'partial' || payout.status === 'completed') && (
        <Card className="mb-6">
          <h3 className="text-sm font-semibold text-text-primary mb-3">Disbursement Progress</h3>

          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-4">
            {['Triggered', 'Approved', 'Processing', 'Complete'].map((label, i) => {
              const stepStatus = (() => {
                const statusOrder = ['pending_approval', 'approved', 'processing', 'completed'];
                const currentIdx = statusOrder.indexOf(payout.status === 'partial' ? 'processing' : payout.status);
                if (i <= currentIdx) return 'done';
                if (i === currentIdx + 1) return 'current';
                return 'upcoming';
              })();

              return (
                <div key={label} className="flex items-center gap-2 flex-1">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      stepStatus === 'done'
                        ? 'bg-emerald text-white'
                        : stepStatus === 'current'
                          ? 'bg-emerald/20 text-emerald border-2 border-emerald'
                          : 'bg-bg-tertiary text-text-tertiary'
                    }`}
                  >
                    {i + 1}
                  </div>
                  <span
                    className={`text-xs whitespace-nowrap ${
                      stepStatus === 'done'
                        ? 'text-emerald font-medium'
                        : stepStatus === 'current'
                          ? 'text-text-primary font-medium'
                          : 'text-text-tertiary'
                    }`}
                  >
                    {label}
                  </span>
                  {i < 3 && (
                    <div
                      className={`flex-1 h-0.5 ${
                        stepStatus === 'done' ? 'bg-emerald' : 'bg-border-default'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Transfer stats */}
          <div className="grid grid-cols-4 gap-3 mb-3">
            <div className="bg-bg-secondary rounded-lg p-3 text-center">
              <p className="text-lg font-bold text-text-primary">{totalCount}</p>
              <p className="text-xs text-text-tertiary">Total Transfers</p>
            </div>
            <div className="bg-success-bg rounded-lg p-3 text-center">
              <p className="text-lg font-bold text-emerald">{sentCount}</p>
              <p className="text-xs text-text-tertiary">Sent</p>
            </div>
            <div className="bg-warning-bg rounded-lg p-3 text-center">
              <p className="text-lg font-bold text-amber-700">{pendingCount}</p>
              <p className="text-xs text-text-tertiary">Pending</p>
            </div>
            <div className="bg-error-bg rounded-lg p-3 text-center">
              <p className="text-lg font-bold text-error">{failedCount}</p>
              <p className="text-xs text-text-tertiary">Failed</p>
            </div>
          </div>

          {/* Progress bar */}
          <ProgressBar
            progress={totalCount > 0 ? sentCount / totalCount : 0}
          />
          <p className="text-xs text-text-tertiary mt-1">
            {sentCount} of {totalCount} transfers completed ({totalCount > 0 ? Math.round((sentCount / totalCount) * 100) : 0}%)
          </p>
        </Card>
      )}

      <div className="space-y-6">
        <PayoutBreakdown payout={payout} />

        <div>
          <h3 className="text-sm font-semibold text-text-primary mb-3">Investor Payouts</h3>
          <DataTable<InvestorPayoutRow>
            columns={investorPayoutColumns}
            data={payout.investorPayouts as unknown as InvestorPayoutRow[]}
            emptyMessage="No investor payouts"
          />
        </div>
      </div>

      <PayoutApproveModal
        open={approveModalOpen}
        onClose={() => setApproveModalOpen(false)}
        payout={payout}
        onApprove={() => {
          console.log('Approve payout:', payout.id);
        }}
      />

      <ProcessPayoutModal
        open={processModalOpen}
        onClose={() => setProcessModalOpen(false)}
        payout={payout}
        onProcess={() => {
          console.log('Process payout via Paystack:', payout.id);
        }}
      />
    </div>
  );
}
