'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, LogOut, Settings } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Avatar } from '@/components/ui/Avatar';

export function UserMenu() {
  const { developer, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  if (!developer) return null;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-bg-tertiary transition-colors cursor-pointer"
      >
        <Avatar name={developer.companyName} size="sm" />
        <div className="hidden sm:block text-left">
          <p className="text-sm font-medium text-text-primary leading-tight">{developer.companyName}</p>
          <p className="text-[11px] text-text-tertiary">{developer.contactName}</p>
        </div>
        <ChevronDown className="w-4 h-4 text-text-tertiary hidden sm:block" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-lg shadow-lg border border-border-default py-1 z-50">
          <a
            href="/settings"
            className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-text-secondary hover:bg-bg-tertiary transition-colors"
          >
            <Settings className="w-4 h-4" />
            Settings
          </a>
          <div className="border-t border-border-default my-1" />
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              logout();
              window.location.href = '/login';
            }}
            className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-error hover:bg-error-bg transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
