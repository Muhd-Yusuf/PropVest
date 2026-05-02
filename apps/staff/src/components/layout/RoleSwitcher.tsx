'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';
import { useAuth } from '@/hooks/useAuth';
import { ALL_ROLES, ROLE_SHORT_LABELS } from '@/lib/constants';

export function RoleSwitcher() {
  const { user, switchRole } = useAuth();
  const [open, setOpen] = useState(false);

  if (!user || user.role !== 'ceo') return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-midnight text-white text-xs font-medium rounded-full shadow-lg hover:bg-midnight-light transition-colors cursor-pointer"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald" />
          Role: {ROLE_SHORT_LABELS[user.role]}
          <ChevronDown className={clsx('w-3 h-3 transition-transform', open && 'rotate-180')} />
        </button>

        {open && (
          <div className="absolute bottom-full right-0 mb-2 w-48 bg-white rounded-lg shadow-lg border border-border-default py-1">
            {ALL_ROLES.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => {
                  switchRole(role);
                  setOpen(false);
                }}
                className={clsx(
                  'w-full text-left px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer',
                  user.role === role
                    ? 'bg-emerald/10 text-emerald'
                    : 'text-text-secondary hover:bg-bg-tertiary',
                )}
              >
                {ROLE_SHORT_LABELS[role]}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
