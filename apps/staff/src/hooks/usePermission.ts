'use client';

import { useAuth } from './useAuth';
import { hasPermission as checkPermission, type Permission } from '@/lib/roles';

export function usePermission() {
  const { user } = useAuth();

  function hasPermission(permission: Permission): boolean {
    if (!user) return false;
    return checkPermission(user.role, permission);
  }

  function hasAnyPermission(...permissions: Permission[]): boolean {
    return permissions.some(p => hasPermission(p));
  }

  return { hasPermission, hasAnyPermission };
}
