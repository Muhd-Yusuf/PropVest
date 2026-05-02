'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, LogOut, UserCog } from 'lucide-react';
import { clsx } from 'clsx';
import { useAuth } from '@/hooks/useAuth';
import { ALL_ROLES, ROLE_SHORT_LABELS, ROLE_COLORS } from '@/lib/constants';
import { Avatar } from '@/components/ui/Avatar';

export function UserMenu() {
  const { user, switchRole, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [showRoles, setShowRoles] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setShowRoles(false);
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  if (!user) return null;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => {
          setOpen(!open);
          setShowRoles(false);
        }}
        className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-bg-tertiary transition-colors cursor-pointer"
      >
        <Avatar name={user.fullName} size="sm" />
        <div className="hidden sm:block text-left">
          <p className="text-sm font-medium text-text-primary leading-tight">{user.fullName}</p>
          <span
            className={clsx(
              'inline-block text-[10px] font-medium px-1.5 py-0.5 rounded',
              ROLE_COLORS[user.role],
            )}
          >
            {ROLE_SHORT_LABELS[user.role]}
          </span>
        </div>
        <ChevronDown className="w-4 h-4 text-text-tertiary hidden sm:block" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-lg shadow-lg border border-border-default py-1 z-50">
          {!showRoles ? (
            <>
              {user.role === 'ceo' && (
                <>
                  <button
                    type="button"
                    onClick={() => setShowRoles(true)}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-text-secondary hover:bg-bg-tertiary transition-colors cursor-pointer"
                  >
                    <UserCog className="w-4 h-4" />
                    Switch Role
                  </button>
                  <div className="border-t border-border-default my-1" />
                </>
              )}
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
            </>
          ) : (
            <>
              <div className="px-4 py-2 text-xs font-medium text-text-tertiary uppercase tracking-wider">
                Switch Role
              </div>
              {ALL_ROLES.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => {
                    switchRole(role);
                    setOpen(false);
                    setShowRoles(false);
                  }}
                  className={clsx(
                    'w-full flex items-center gap-2.5 px-4 py-2 text-sm transition-colors cursor-pointer',
                    user.role === role
                      ? 'bg-emerald/10 text-emerald font-medium'
                      : 'text-text-secondary hover:bg-bg-tertiary',
                  )}
                >
                  <span
                    className={clsx(
                      'inline-block text-[10px] font-medium px-1.5 py-0.5 rounded',
                      ROLE_COLORS[role],
                    )}
                  >
                    {ROLE_SHORT_LABELS[role]}
                  </span>
                  {ROLE_SHORT_LABELS[role]}
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
