import { clsx } from 'clsx';
import type { PropertyType } from '@/lib/types';

const config: Record<PropertyType, { bg: string; text: string; label: string }> = {
  rental: { bg: 'bg-rental-bg', text: 'text-rental-text', label: 'Rental' },
  build_sell: { bg: 'bg-build-sell-bg', text: 'text-build-sell-text', label: 'Build & Sell' },
  land: { bg: 'bg-land-bg', text: 'text-land-text', label: 'Land' },
};

export function Badge({ type, className }: { type: PropertyType; className?: string }) {
  const { bg, text, label } = config[type];
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider',
        bg,
        text,
        className
      )}
    >
      {label}
    </span>
  );
}
