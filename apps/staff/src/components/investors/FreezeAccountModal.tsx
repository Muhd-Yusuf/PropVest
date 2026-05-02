'use client';

import { useState } from 'react';
import type { Investor } from '@/lib/types';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Badge } from '@/components/ui/Badge';

interface FreezeAccountModalProps {
  open: boolean;
  onClose: () => void;
  investor: Investor | null;
  onConfirm: (reason: string) => void;
}

export function FreezeAccountModal({ open, onClose, investor, onConfirm }: FreezeAccountModalProps) {
  const [reason, setReason] = useState('');

  if (!investor) return null;

  const isFrozen = investor.isFrozen;
  const title = isFrozen ? 'Unfreeze Account' : 'Freeze Account';

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
            variant={isFrozen ? 'primary' : 'danger'}
            onClick={handleConfirm}
            disabled={!reason.trim()}
          >
            {isFrozen ? 'Unfreeze Account' : 'Freeze Account'}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <p className="text-sm text-text-secondary">
            {isFrozen
              ? `You are about to unfreeze the account for:`
              : `You are about to freeze the account for:`}
          </p>
          <p className="text-sm font-medium text-text-primary mt-1">{investor.fullName}</p>
          <div className="mt-2">
            <Badge
              label={isFrozen ? 'Currently Frozen' : 'Currently Active'}
              variant={isFrozen ? 'error' : 'success'}
            />
          </div>
        </div>

        <Textarea
          label="Reason"
          placeholder={isFrozen ? 'Why are you unfreezing this account?' : 'Why are you freezing this account?'}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </div>
    </Modal>
  );
}
