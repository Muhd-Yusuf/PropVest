'use client';

import { clsx } from 'clsx';

interface SidebarItemProps {
  href: string;
  label: string;
  icon: React.ElementType;
  isActive: boolean;
}

export function SidebarItem({ href, label, icon: Icon, isActive }: SidebarItemProps) {
  return (
    <a
      href={href}
      className={clsx(
        'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150',
        isActive
          ? 'bg-sidebar-active-bg text-sidebar-active-text border-l-[3px] border-emerald'
          : 'text-white/70 hover:bg-sidebar-hover border-l-[3px] border-transparent',
      )}
    >
      <Icon className="w-[18px] h-[18px] shrink-0" />
      <span>{label}</span>
    </a>
  );
}
