'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { ALL_ROLES, ROLE_LABELS } from '@/lib/constants';
import type { StaffRole } from '@/lib/types';

interface AddStaffModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { fullName: string; email: string; role: StaffRole }) => void;
}

export function AddStaffModal({ open, onClose, onSubmit }: AddStaffModalProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<StaffRole>('ops');

  const roleOptions = ALL_ROLES.map((r) => ({
    value: r,
    label: ROLE_LABELS[r],
  }));

  function handleSubmit() {
    onSubmit({ fullName, email, role });
    setFullName('');
    setEmail('');
    setRole('ops');
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Staff Member"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!fullName || !email}>
            Add Staff
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <Input
          label="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Enter full name"
        />
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@propvest.ng"
        />
        <Select
          label="Role"
          value={role}
          onChange={(e) => setRole(e.target.value as StaffRole)}
          options={roleOptions}
        />
      </div>
    </Modal>
  );
}
