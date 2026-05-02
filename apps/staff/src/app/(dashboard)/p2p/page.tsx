'use client';

import { useState, useMemo } from 'react';
import type { P2PTrade } from '@/lib/types';
import { mockP2PTrades } from '@/lib/mock-data';
import { usePermission } from '@/hooks/usePermission';
import { PageHeader } from '@/components/layout/PageHeader';
import { Tabs } from '@/components/ui/Tabs';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { TradingStats } from '@/components/p2p/TradingStats';
import { TradesList } from '@/components/p2p/TradesList';

export default function P2PPage() {
  const { hasPermission } = usePermission();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedTrade, setSelectedTrade] = useState<P2PTrade | null>(null);
  const [unflagModalOpen, setUnflagModalOpen] = useState(false);

  const activeCount = mockP2PTrades.filter((t) => t.status === 'active').length;
  const flaggedCount = mockP2PTrades.filter((t) => t.isFlagged).length;

  const filteredData = useMemo(() => {
    switch (activeTab) {
      case 'active':
        return mockP2PTrades.filter((t) => t.status === 'active');
      case 'completed':
        return mockP2PTrades.filter((t) => t.status === 'sold');
      case 'flagged':
        return mockP2PTrades.filter((t) => t.isFlagged);
      default:
        return mockP2PTrades;
    }
  }, [activeTab]);

  const tabs = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active', count: activeCount },
    { key: 'completed', label: 'Completed' },
    { key: 'flagged', label: 'Flagged', count: flaggedCount },
  ];

  function handleRowClick(trade: P2PTrade) {
    if (trade.isFlagged && hasPermission('p2p.full')) {
      setSelectedTrade(trade);
      setUnflagModalOpen(true);
    }
  }

  return (
    <div>
      <PageHeader
        title="P2P Trades"
        description="Monitor peer-to-peer unit trading"
      />

      <div className="mb-6">
        <TradingStats />
      </div>

      <div className="mb-6">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      <TradesList trades={filteredData} onRowClick={handleRowClick} />

      <ConfirmModal
        open={unflagModalOpen}
        onClose={() => {
          setUnflagModalOpen(false);
          setSelectedTrade(null);
        }}
        title="Unflag Trade"
        description={
          selectedTrade
            ? `Are you sure you want to unflag the trade by ${selectedTrade.sellerName} for ${selectedTrade.units} units of ${selectedTrade.propertyName}?\n\nFlag reason: ${selectedTrade.flagReason ?? 'No reason provided'}`
            : ''
        }
        confirmLabel="Unflag Trade"
        onConfirm={() => {
          console.log('Unflag trade:', selectedTrade?.id);
          setSelectedTrade(null);
        }}
        variant="warning"
      />
    </div>
  );
}
