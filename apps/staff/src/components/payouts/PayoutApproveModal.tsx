'use client';

import type { Payout } from '@/lib/types';
import { formatNairaFull } from '@/lib/format';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

interface PayoutApproveModalProps {
  open: boolean;
  onClose: () => void;
  payout: Payout | null;
  onApprove: () => void;
}

export function PayoutApproveModal({ open, onClose, payout, onApprove }: PayoutApproveModalProps) {
  if (!payout) return null;

  function handleApprove() {
    onApprove();
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Approve Payout"
      size="sm"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleApprove}>
            Approve Payout
          </Button>
        </>
      }
    >
      <div className="space-y-3">
        <p className="text-sm text-text-secondary">
          You are about to approve the following payout for distribution:
        </p>
        <div className="bg-bg-secondary rounded-lg p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-tertiary">Property</span>
            <span className="text-sm font-medium text-text-primary">{payout.propertyName}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-tertiary">Quarter</span>
            <span className="text-sm font-medium text-text-primary">{payout.quarter}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-tertiary">Distributable Amount</span>
            <span className="text-sm font-mono font-bold text-emerald">
              {formatNairaFull(payout.distributableAmount)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-tertiary">Investors</span>
            <span className="text-sm font-medium text-text-primary">{payout.investorPayouts.length}</span>
          </div>
        </div>
        <p className="text-xs text-text-tertiary">
          Once approved, the payout will be queued for processing and investors will be notified.
        </p>
      </div>
    </Modal>
  );
}
