'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Badge } from '@/components/ui/Badge';
import { PROPERTY_STATUS_LABELS } from '@/lib/constants';
import type { Property, PropertyStatus } from '@/lib/types';

interface ApproveRejectModalProps {
  open: boolean;
  onClose: () => void;
  property: Property | null;
  onApprove: (notes: string) => void;
  onReject: (notes: string) => void;
}

const statusBadgeVariant: Record<PropertyStatus, 'neutral' | 'warning' | 'success' | 'info'> = {
  draft: 'neutral',
  under_review: 'warning',
  active: 'success',
  paused: 'info',
  fully_funded: 'success',
  completed: 'neutral',
};

export function ApproveRejectModal({
  open,
  onClose,
  property,
  onApprove,
  onReject,
}: ApproveRejectModalProps) {
  const [notes, setNotes] = useState('');

  function handleClose() {
    setNotes('');
    onClose();
  }

  function handleApprove() {
    onApprove(notes);
    setNotes('');
  }

  function handleReject() {
    onReject(notes);
    setNotes('');
  }

  if (!property) return null;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Review Property"
      size="md"
      footer={
        <>
          <Button variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleReject}>
            Reject
          </Button>
          <Button variant="primary" onClick={handleApprove}>
            Approve
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <p className="text-sm text-text-tertiary">Property</p>
          <p className="text-base font-semibold text-text-primary">{property.name}</p>
        </div>
        <div>
          <p className="text-sm text-text-tertiary">Current Status</p>
          <Badge
            label={PROPERTY_STATUS_LABELS[property.status] || property.status}
            variant={statusBadgeVariant[property.status]}
            className="mt-1"
          />
        </div>
        <Textarea
          label="Review Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add notes about your decision..."
          rows={4}
        />
      </div>
    </Modal>
  );
}
