'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import type { DeveloperPartner } from '@/lib/types';

interface OnboardDeveloperModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<DeveloperPartner>) => void;
}

export function OnboardDeveloperModal({
  open,
  onClose,
  onSubmit,
}: OnboardDeveloperModalProps) {
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [bankName, setBankName] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [bankAccountName, setBankAccountName] = useState('');

  function handleSubmit() {
    onSubmit({
      companyName,
      contactName,
      email,
      phone,
      bio,
      bankName,
      bankAccountNumber,
      bankAccountName,
    });
    resetForm();
    onClose();
  }

  function resetForm() {
    setCompanyName('');
    setContactName('');
    setEmail('');
    setPhone('');
    setBio('');
    setBankName('');
    setBankAccountNumber('');
    setBankAccountName('');
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Onboard Developer Partner"
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!companyName || !contactName || !email}>
            Onboard Developer
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <Input
          label="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Enter company name"
        />
        <Input
          label="Contact Person"
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
          placeholder="Enter contact person name"
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="company@example.com"
          />
          <Input
            label="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+234..."
          />
        </div>
        <Textarea
          label="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Brief description of the developer company..."
          rows={3}
        />
        <div className="border-t border-border-default pt-4">
          <p className="text-sm font-medium text-text-primary mb-3">Bank Details</p>
          <div className="space-y-4">
            <Input
              label="Bank Name"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="e.g. Zenith Bank"
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Account Number"
                value={bankAccountNumber}
                onChange={(e) => setBankAccountNumber(e.target.value)}
                placeholder="10-digit account number"
              />
              <Input
                label="Account Name"
                value={bankAccountName}
                onChange={(e) => setBankAccountName(e.target.value)}
                placeholder="Account holder name"
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
