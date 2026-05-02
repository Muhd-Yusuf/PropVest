'use client';

import { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { ALL_ROLES, ROLE_LABELS } from '@/lib/constants';
import type { StaffUser, StaffRole } from '@/lib/types';

interface EditRoleModalProps {
  open: boolean;
  onClose: () => void;
  staff: StaffUser | null;
  onSubmit: (staffId: string, newRole: StaffRole) => void;
}

export function EditRoleModal({
  open,
  onClose,
  staff,
  onSubmit,
}: EditRoleModalProps) {
  const [role, setRole] = useState<StaffRole>('ops');

  useEffect(() => {
    if (staff) {
      setRole(staff.role);
    }
  }, [staff]);

  const roleOptions = ALL_ROLES.map((r) => ({
    value: r,
    label: ROLE_LABELS[r],
  }));

  function handleSubmit() {
    if (staff) {
      onSubmit(staff.id, role);
      onClose();
    }
  }

  if (!staff) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Edit Staff Role"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Update Role
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <p className="text-xs text-text-tertiary uppercase tracking-wider font-medium">
            Staff Member
          </p>
          <p className="text-sm text-text-primary mt-1 font-medium">
            {staff.fullName}
          </p>
        </div>
        <div>
          <p className="text-xs text-text-tertiary uppercase tracking-wider font-medium">
            Current Role
          </p>
          <p className="text-sm text-text-primary mt-1">
            {ROLE_LABELS[staff.role]}
          </p>
        </div>
        <Select
          label="New Role"
          value={role}
          onChange={(e) => setRole(e.target.value as StaffRole)}
          options={roleOptions}
        />
      </div>
    </Modal>
  );
}
