'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import type { Announcement } from '@/lib/types';

interface CreateAnnouncementModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Announcement>) => void;
}

export function CreateAnnouncementModal({
  open,
  onClose,
  onSubmit,
}: CreateAnnouncementModalProps) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [type, setType] = useState<'broadcast' | 'targeted'>('broadcast');
  const [targetFilter, setTargetFilter] = useState('');

  const typeOptions = [
    { value: 'broadcast', label: 'Broadcast' },
    { value: 'targeted', label: 'Targeted' },
  ];

  function handleSubmit() {
    onSubmit({
      title,
      body,
      type,
      ...(type === 'targeted' && targetFilter ? { targetFilter } : {}),
    });
    setTitle('');
    setBody('');
    setType('broadcast');
    setTargetFilter('');
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create Announcement"
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!title || !body}>
            Create Announcement
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Announcement title"
        />
        <Textarea
          label="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your announcement message..."
          rows={4}
        />
        <Select
          label="Type"
          value={type}
          onChange={(e) => setType(e.target.value as 'broadcast' | 'targeted')}
          options={typeOptions}
        />
        {type === 'targeted' && (
          <Input
            label="Target Filter"
            value={targetFilter}
            onChange={(e) => setTargetFilter(e.target.value)}
            placeholder="e.g. investors_with_active_rental_properties"
          />
        )}
      </div>
    </Modal>
  );
}
