'use client';

import { useState } from 'react';
import { clsx } from 'clsx';
import type { KYCRecord } from '@/lib/types';
import { formatDate } from '@/lib/format';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { KYCActionModal } from './KYCActionModal';

const tierVariant = { 1: 'neutral', 2: 'info', 3: 'success' } as const;
const matchVariant: Record<string, 'success' | 'warning' | 'error'> = {
  match: 'success',
  partial: 'warning',
  mismatch: 'error',
};
const statusVariant: Record<string, 'success' | 'warning' | 'error'> = {
  approved: 'success',
  pending: 'warning',
  rejected: 'error',
};
const methodLabels: Record<string, string> = {
  bank_account: 'Bank Account',
  bvn: 'BVN',
  nin: 'NIN',
};

interface KYCReviewCardProps {
  record: KYCRecord;
  onApprove: (id: string, notes: string) => void;
  onReject: (id: string, notes: string) => void;
}

export function KYCReviewCard({ record, onApprove, onReject }: KYCReviewCardProps) {
  const [actionModal, setActionModal] = useState<{ open: boolean; action: 'approve' | 'reject' }>({
    open: false,
    action: 'approve',
  });

  const allKeys = Array.from(
    new Set([...Object.keys(record.submittedData), ...Object.keys(record.apiData)]),
  );

  function getFieldStatus(key: string) {
    const submitted = record.submittedData[key];
    const api = record.apiData[key];
    if (!submitted || !api) return 'missing';
    if (submitted === api) return 'match';
    return 'mismatch';
  }

  return (
    <>
      <Card>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">{record.investorName}</h3>
            <p className="text-sm text-text-secondary">{record.investorEmail}</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge label={`Tier ${record.tier}`} variant={tierVariant[record.tier]} />
            <Badge label={methodLabels[record.method] ?? record.method} variant="info" />
            <Badge
              label={record.matchResult.charAt(0).toUpperCase() + record.matchResult.slice(1)}
              variant={matchVariant[record.matchResult] ?? 'neutral'}
            />
            <Badge
              label={record.status.charAt(0).toUpperCase() + record.status.slice(1)}
              variant={statusVariant[record.status] ?? 'neutral'}
            />
          </div>
        </div>

        {/* Side-by-side comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="text-xs text-text-tertiary uppercase tracking-wider font-medium mb-3">Submitted Data</h4>
            <div className="space-y-2">
              {allKeys.map((key) => {
                const status = getFieldStatus(key);
                return (
                  <div
                    key={key}
                    className={clsx(
                      'flex items-center justify-between rounded-lg px-3 py-2 text-sm',
                      status === 'match' && 'bg-success-bg',
                      status === 'mismatch' && 'bg-error-bg',
                      status === 'missing' && 'bg-bg-tertiary',
                    )}
                  >
                    <span className="text-text-tertiary font-medium capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="text-text-primary font-mono text-xs">
                      {record.submittedData[key] ?? '—'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="text-xs text-text-tertiary uppercase tracking-wider font-medium mb-3">API Data</h4>
            <div className="space-y-2">
              {allKeys.map((key) => {
                const status = getFieldStatus(key);
                return (
                  <div
                    key={key}
                    className={clsx(
                      'flex items-center justify-between rounded-lg px-3 py-2 text-sm',
                      status === 'match' && 'bg-success-bg',
                      status === 'mismatch' && 'bg-error-bg',
                      status === 'missing' && 'bg-bg-tertiary',
                    )}
                  >
                    <span className="text-text-tertiary font-medium capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="text-text-primary font-mono text-xs">
                      {record.apiData[key] ?? '—'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Review info (if already reviewed) */}
        {record.reviewedBy && (
          <div className="border-t border-border-default pt-4 mb-4">
            <p className="text-xs text-text-tertiary">
              Reviewed by <span className="font-medium text-text-secondary">{record.reviewedBy}</span> on{' '}
              {formatDate(record.reviewedAt!)}
            </p>
            {record.reviewNotes && (
              <p className="text-sm text-text-secondary mt-1">{record.reviewNotes}</p>
            )}
          </div>
        )}

        {/* Actions */}
        {record.status === 'pending' && (
          <div className="flex items-center gap-3 border-t border-border-default pt-4">
            <Button
              variant="primary"
              onClick={() => setActionModal({ open: true, action: 'approve' })}
            >
              Approve
            </Button>
            <Button
              variant="danger"
              onClick={() => setActionModal({ open: true, action: 'reject' })}
            >
              Reject
            </Button>
          </div>
        )}
      </Card>

      <KYCActionModal
        open={actionModal.open}
        onClose={() => setActionModal({ ...actionModal, open: false })}
        action={actionModal.action}
        recordId={record.id}
        onConfirm={actionModal.action === 'approve' ? onApprove : onReject}
      />
    </>
  );
}
