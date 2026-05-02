'use client';

import { Menu, Search } from 'lucide-react';
import { UserMenu } from './UserMenu';
import { NotificationDropdown } from '@/components/notifications/NotificationDropdown';

interface HeaderProps {
  onMenuToggle: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  return (
    <header className="fixed top-0 right-0 left-0 lg:left-60 h-16 bg-white border-b border-border-default flex items-center justify-between px-4 sm:px-6 z-30">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuToggle}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-text-secondary hover:bg-bg-tertiary transition-colors cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search placeholder */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-bg-secondary text-text-tertiary text-sm w-64 cursor-not-allowed">
          <Search className="w-4 h-4" />
          <span>Search...</span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <NotificationDropdown />

        <UserMenu />
      </div>
    </header>
  );
}
