'use client';

import { useMemo } from 'react';
import { ShoppingCart, TrendingUp, Flag, DollarSign } from 'lucide-react';
import { mockP2PTrades } from '@/lib/mock-data';
import { formatNaira } from '@/lib/format';
import { StatCard } from '@/components/ui/StatCard';

export function TradingStats() {
  const stats = useMemo(() => {
    const activeListings = mockP2PTrades.filter((t) => t.status === 'active').length;
    const soldTrades = mockP2PTrades.filter((t) => t.status === 'sold');
    const totalVolume = soldTrades.reduce((sum, t) => sum + t.totalAmount, 0);
    const flaggedTrades = mockP2PTrades.filter((t) => t.isFlagged).length;

    const allTrades = mockP2PTrades;
    const avgPricePerUnit =
      allTrades.length > 0
        ? allTrades.reduce((sum, t) => sum + t.pricePerUnit, 0) / allTrades.length
        : 0;

    return { activeListings, totalVolume, flaggedTrades, avgPricePerUnit };
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        label="Active Listings"
        value={String(stats.activeListings)}
        icon={ShoppingCart}
      />
      <StatCard
        label="Total Volume"
        value={formatNaira(stats.totalVolume)}
        icon={TrendingUp}
      />
      <StatCard
        label="Flagged Trades"
        value={String(stats.flaggedTrades)}
        icon={Flag}
      />
      <StatCard
        label="Avg Price/Unit"
        value={formatNaira(stats.avgPricePerUnit)}
        icon={DollarSign}
      />
    </div>
  );
}
