'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import type { Payout } from '@/lib/types';
import { formatNairaFull } from '@/lib/format';
import { Send, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';

interface ProcessPayoutModalProps {
  open: boolean;
  onClose: () => void;
  payout: Payout | null;
  onProcess: () => void;
}

type ProcessingState = 'confirm' | 'processing' | 'complete';

export function ProcessPayoutModal({ open, onClose, payout, onProcess }: ProcessPayoutModalProps) {
  const [state, setState] = useState<ProcessingState>('confirm');
  const [progress, setProgress] = useState(0);

  if (!payout) return null;

  const totalInvestors = payout.investorPayouts.length;
  const sentCount = payout.investorPayouts.filter((p) => p.status === 'sent').length;
  const failedCount = payout.investorPayouts.filter((p) => p.status === 'failed').length;
  const pendingCount = payout.investorPayouts.filter((p) => p.status === 'pending').length;

  function handleProcess() {
    setState('processing');
    // Simulate batch processing
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 15) + 5;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setState('complete');
        onProcess();
      }
      setProgress(current);
    }, 400);
  }

  function handleClose() {
    setState('confirm');
    setProgress(0);
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={state === 'processing' ? () => {} : handleClose}
      title={
        state === 'confirm'
          ? 'Process Payout via Paystack'
          : state === 'processing'
            ? 'Processing Disbursement...'
            : 'Disbursement Complete'
      }
      size="md"
      footer={
        state === 'confirm' ? (
          <>
            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
            <Button onClick={handleProcess}>
              <Send className="w-4 h-4" />
              Start Disbursement
            </Button>
          </>
        ) : state === 'complete' ? (
          <Button onClick={handleClose}>Done</Button>
        ) : undefined
      }
    >
      {state === 'confirm' && (
        <div className="space-y-4">
          <p className="text-sm text-text-secondary">
            This will initiate a <strong>Paystack Bulk Transfer</strong> to disburse funds to {totalInvestors} investors for:
          </p>

          <div className="bg-bg-secondary rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Property</span>
              <span className="font-medium">{payout.propertyName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Quarter</span>
              <span className="font-medium">{payout.quarter}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Total Amount</span>
              <span className="font-mono font-bold text-emerald">{formatNairaFull(payout.distributableAmount)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Recipients</span>
              <span className="font-medium">{totalInvestors} investors</span>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="flex gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-800">
                <p className="font-semibold mb-1">Before proceeding, ensure:</p>
                <ul className="list-disc list-inside space-y-0.5">
                  <li>Platform wallet has sufficient balance ({formatNairaFull(payout.distributableAmount)})</li>
                  <li>All investor bank details are verified</li>
                  <li>Transfer recipients are created on Paystack</li>
                </ul>
              </div>
            </div>
          </div>

          <p className="text-xs text-text-tertiary">
            Each transfer will be processed individually via Paystack. Status updates will arrive via webhooks. Failed transfers can be retried.
          </p>
        </div>
      )}

      {state === 'processing' && (
        <div className="space-y-6 py-4">
          <div className="flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-emerald animate-spin" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-text-secondary">Sending to Paystack...</span>
              <span className="text-sm font-mono font-medium">{progress}%</span>
            </div>
            <ProgressBar progress={progress / 100} />
          </div>

          <p className="text-xs text-text-tertiary text-center">
            Creating transfer recipients and initiating bulk transfer. Do not close this window.
          </p>
        </div>
      )}

      {state === 'complete' && (
        <div className="space-y-4 py-2">
          <div className="flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-emerald" />
          </div>

          <p className="text-sm text-text-secondary text-center">
            Bulk transfer has been submitted to Paystack. Individual transfer statuses will update as webhooks arrive.
          </p>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-bg-secondary rounded-lg p-3 text-center">
              <p className="text-lg font-bold text-text-primary">{totalInvestors}</p>
              <p className="text-xs text-text-tertiary">Total</p>
            </div>
            <div className="bg-success-bg rounded-lg p-3 text-center">
              <p className="text-lg font-bold text-emerald">{sentCount || totalInvestors}</p>
              <p className="text-xs text-text-tertiary">Queued</p>
            </div>
            <div className="bg-error-bg rounded-lg p-3 text-center">
              <p className="text-lg font-bold text-error">{failedCount}</p>
              <p className="text-xs text-text-tertiary">Failed</p>
            </div>
          </div>

          <p className="text-xs text-text-tertiary text-center">
            Monitor transfer statuses on this page. Failed transfers can be retried individually.
          </p>
        </div>
      )}
    </Modal>
  );
}
