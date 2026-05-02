'use client';

import { useState } from 'react';
import type { Investor } from '@/lib/types';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Badge } from '@/components/ui/Badge';

interface FlagAccountModalProps {
  open: boolean;
  onClose: () => void;
  investor: Investor | null;
  onConfirm: (reason: string) => void;
}

export function FlagAccountModal({ open, onClose, investor, onConfirm }: FlagAccountModalProps) {
  const [reason, setReason] = useState('');

  if (!investor) return null;

  const isFlagged = investor.isFlagged;
  const title = isFlagged ? 'Unflag Account' : 'Flag Account';

  function handleConfirm() {
    onConfirm(reason);
    setReason('');
    onClose();
  }

  function handleClose() {
    setReason('');
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={title}
      size="sm"
      footer={
        <>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant={isFlagged ? 'primary' : 'danger'}
            onClick={handleConfirm}
            disabled={!reason.trim()}
          >
            {isFlagged ? 'Unflag Account' : 'Flag Account'}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <p className="text-sm text-text-secondary">
            {isFlagged
              ? `You are about to remove the flag from:`
              : `You are about to flag the account for:`}
          </p>
          <p className="text-sm font-medium text-text-primary mt-1">{investor.fullName}</p>
          <div className="mt-2">
            <Badge
              label={isFlagged ? 'Currently Flagged' : 'Not Flagged'}
              variant={isFlagged ? 'warning' : 'neutral'}
            />
          </div>
        </div>

        <Textarea
          label="Reason"
          placeholder={isFlagged ? 'Why are you removing the flag?' : 'Why are you flagging this account?'}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </div>
    </Modal>
  );
}
