'use client';

import { Flag as FlagIcon } from 'lucide-react';
import type { P2PTrade, ColumnDef } from '@/lib/types';
import { formatNaira } from '@/lib/format';
import { DataTable } from '@/components/ui/DataTable';
import { Badge } from '@/components/ui/Badge';

type TradeRow = P2PTrade & Record<string, unknown>;

const statusVariant: Record<string, 'success' | 'warning' | 'error' | 'info' | 'neutral'> = {
  active: 'info',
  sold: 'success',
  cancelled: 'neutral',
};

const columns: ColumnDef<TradeRow>[] = [
  {
    key: 'sellerName',
    header: 'Seller',
    sortable: true,
    accessor: (row) => <span className="font-medium">{row.sellerName}</span>,
  },
  {
    key: 'buyerName',
    header: 'Buyer',
    accessor: (row) => (row.buyerName as string) || <span className="text-text-tertiary">—</span>,
  },
  {
    key: 'propertyName',
    header: 'Property',
    accessor: (row) => row.propertyName,
  },
  {
    key: 'units',
    header: 'Units',
    accessor: (row) => row.units,
  },
  {
    key: 'pricePerUnit',
    header: 'Price/Unit',
    accessor: (row) => formatNaira(row.pricePerUnit as number),
  },
  {
    key: 'totalAmount',
    header: 'Total',
    accessor: (row) => formatNaira(row.totalAmount as number),
  },
  {
    key: 'status',
    header: 'Status',
    accessor: (row) => {
      const status = row.status as string;
      return (
        <Badge
          label={status.charAt(0).toUpperCase() + status.slice(1)}
          variant={statusVariant[status] ?? 'neutral'}
        />
      );
    },
  },
  {
    key: 'isFlagged',
    header: 'Flagged',
    width: '80px',
    accessor: (row) =>
      row.isFlagged ? (
        <FlagIcon className="w-4 h-4 text-error" />
      ) : null,
  },
];

interface TradesListProps {
  trades: P2PTrade[];
  onRowClick?: (trade: P2PTrade) => void;
}

export function TradesList({ trades, onRowClick }: TradesListProps) {
  return (
    <DataTable<TradeRow>
      columns={columns}
      data={trades as unknown as TradeRow[]}
      searchable
      searchPlaceholder="Search by seller, buyer, or property..."
      searchKeys={['sellerName', 'buyerName', 'propertyName']}
      onRowClick={onRowClick ? (row) => onRowClick(row as unknown as P2PTrade) : undefined}
      emptyMessage="No trades found"
    />
  );
}
