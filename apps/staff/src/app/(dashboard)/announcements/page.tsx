'use client';

import { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Tabs } from '@/components/ui/Tabs';
import { Button } from '@/components/ui/Button';
import { AnnouncementsList } from '@/components/announcements/AnnouncementsList';
import { CreateAnnouncementModal } from '@/components/announcements/CreateAnnouncementModal';
import { usePermission } from '@/hooks/usePermission';
import { mockAnnouncements } from '@/lib/mock-data';

export default function AnnouncementsPage() {
  const { hasPermission } = usePermission();
  const [activeTab, setActiveTab] = useState('all');
  const [showCreate, setShowCreate] = useState(false);

  const sentAnnouncements = mockAnnouncements.filter((a) => a.status === 'sent');
  const draftAnnouncements = mockAnnouncements.filter((a) => a.status === 'draft');

  const tabs = [
    { key: 'all', label: 'All', count: mockAnnouncements.length },
    { key: 'sent', label: 'Sent', count: sentAnnouncements.length },
    { key: 'drafts', label: 'Drafts', count: draftAnnouncements.length },
  ];

  const filteredAnnouncements = useMemo(() => {
    if (activeTab === 'sent') return sentAnnouncements;
    if (activeTab === 'drafts') return draftAnnouncements;
    return mockAnnouncements;
  }, [activeTab]);

  return (
    <div>
      <PageHeader
        title="Announcements"
        description="Broadcast and targeted notifications"
        actions={
          hasPermission('announcements.full') ? (
            <Button onClick={() => setShowCreate(true)}>
              <Plus className="w-4 h-4" />
              Create Announcement
            </Button>
          ) : undefined
        }
      />

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="mt-6">
        <AnnouncementsList announcements={filteredAnnouncements} />
      </div>

      <CreateAnnouncementModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onSubmit={(data) => {
          console.log('Create announcement:', data);
        }}
      />
    </div>
  );
}
