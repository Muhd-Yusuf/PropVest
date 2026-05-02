'use client';

import { createContext, useState, useEffect, useCallback } from 'react';
import type { StaffUser, StaffRole } from '@/lib/types';

interface AuthContextType {
  user: StaffUser | null;
  isLoading: boolean;
  login: (email: string, role: StaffRole) => void;
  logout: () => void;
  switchRole: (role: StaffRole) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: () => {},
  logout: () => {},
  switchRole: () => {},
});

const STORAGE_KEY = 'propvest_staff_user';

function createMockUser(email: string, role: StaffRole): StaffUser {
  const names: Record<StaffRole, string> = {
    ceo: 'Muhammad Sada',
    coo: 'Amina Ibrahim',
    ops: 'Chinedu Okafor',
    finance: 'Fatima Bello',
    legal: 'Oluwaseun Adeyemi',
    devrel: 'Hassan Musa',
    support: 'Ngozi Eze',
    compliance: 'Yusuf Abdullahi',
  };

  return {
    id: `staff_${role}`,
    fullName: names[role],
    email,
    role,
    isActive: true,
    lastActiveAt: new Date().toISOString(),
    createdAt: '2026-01-15T00:00:00Z',
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<StaffUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback((email: string, role: StaffRole) => {
    const mockUser = createMockUser(email, role);
    setUser(mockUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const switchRole = useCallback((role: StaffRole) => {
    if (user) {
      const updated = { ...user, role };
      setUser(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}
