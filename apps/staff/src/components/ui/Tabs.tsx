'use client';

import { clsx } from 'clsx';

interface Tab {
  key: string;
  label: string;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (key: string) => void;
}

export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="flex border-b border-border-default overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onChange(tab.key)}
          className={clsx(
            'relative px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors duration-150 cursor-pointer',
            activeTab === tab.key
              ? 'text-emerald'
              : 'text-text-tertiary hover:text-text-primary',
          )}
        >
          <span className="flex items-center gap-1.5">
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={clsx(
                  'inline-flex items-center justify-center rounded-full px-1.5 py-0.5 text-xs',
                  activeTab === tab.key
                    ? 'bg-emerald/15 text-emerald'
                    : 'bg-bg-tertiary text-text-tertiary',
                )}
              >
                {tab.count}
              </span>
            )}
          </span>
          {activeTab === tab.key && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald rounded-t" />
          )}
        </button>
      ))}
    </div>
  );
}
