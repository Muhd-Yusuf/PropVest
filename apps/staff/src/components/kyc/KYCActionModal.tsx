'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';

interface KYCActionModalProps {
  open: boolean;
  onClose: () => void;
  action: 'approve' | 'reject';
  recordId: string;
  onConfirm: (id: string, notes: string) => void;
}

export function KYCActionModal({ open, onClose, action, recordId, onConfirm }: KYCActionModalProps) {
  const [notes, setNotes] = useState('');

  const isApprove = action === 'approve';
  const title = isApprove ? 'Approve KYC Verification' : 'Reject KYC Verification';

  function handleConfirm() {
    onConfirm(recordId, notes);
    setNotes('');
    onClose();
  }

  function handleClose() {
    setNotes('');
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
            variant={isApprove ? 'primary' : 'danger'}
            onClick={handleConfirm}
          >
            {isApprove ? 'Approve' : 'Reject'}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <p className="text-sm text-text-secondary">
          {isApprove
            ? 'Add any review notes before approving this KYC submission.'
            : 'Please provide a reason for rejecting this KYC submission.'}
        </p>
        <Textarea
          label="Review Notes"
          placeholder={isApprove ? 'Optional notes...' : 'Reason for rejection...'}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
    </Modal>
  );
}
