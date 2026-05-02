'use client';

import { usePathname } from 'next/navigation';
import { LogOut, X } from 'lucide-react';
import { clsx } from 'clsx';
import { useAuth } from '@/hooks/useAuth';
import { navAccess } from '@/lib/roles';
import { sidebarNav } from '@/lib/navigation';
import { ROLE_SHORT_LABELS, ROLE_COLORS } from '@/lib/constants';
import { SidebarItem } from './SidebarItem';
import { Avatar } from '@/components/ui/Avatar';

interface SidebarProps {
  sidebarOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ sidebarOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const filteredNav = sidebarNav.filter((item) => {
    if (!user) return false;
    const allowedRoles = navAccess[item.key];
    return allowedRoles?.includes(user.role);
  });

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-midnight/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed top-0 left-0 h-full w-60 bg-sidebar-bg flex flex-col z-50 transition-transform duration-300',
          'lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              <span className="text-white">Prop</span>
              <span className="text-emerald">Vest</span>
            </h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium mt-0.5">
              Staff Portal
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg text-white/50 hover:bg-sidebar-hover transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5">
          {filteredNav.map((item) => (
            <SidebarItem
              key={item.key}
              href={item.href}
              label={item.label}
              icon={item.icon}
              isActive={pathname === item.href || pathname.startsWith(item.href + '/')}
            />
          ))}
        </nav>

        {/* User section */}
        {user && (
          <div className="border-t border-white/10 px-4 py-4">
            <div className="flex items-center gap-3">
              <Avatar name={user.fullName} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user.fullName}</p>
                <span
                  className={clsx(
                    'inline-block text-[10px] font-medium px-1.5 py-0.5 rounded mt-0.5',
                    ROLE_COLORS[user.role],
                  )}
                >
                  {ROLE_SHORT_LABELS[user.role]}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  logout();
                  window.location.href = '/login';
                }}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:text-white hover:bg-sidebar-hover transition-colors cursor-pointer"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
