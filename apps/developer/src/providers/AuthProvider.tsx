'use client';

import { createContext, useState, useEffect, useCallback } from 'react';
import type { DeveloperUser } from '@/lib/types';

interface AuthContextType {
  developer: DeveloperUser | null;
  isLoading: boolean;
  login: (email: string) => void;
  logout: () => void;
  updateProfile: (updates: Partial<DeveloperUser>) => void;
}

export const AuthContext = createContext<AuthContextType>({
  developer: null,
  isLoading: true,
  login: () => {},
  logout: () => {},
  updateProfile: () => {},
});

const STORAGE_KEY = 'propvest_developer_user';

const MOCK_DEVELOPER: DeveloperUser = {
  id: 'dev-001',
  companyName: 'Saleem Goje Properties',
  contactName: 'Saleem Goje',
  email: 'saleem@saleemgoje.com',
  phone: '+234 803 456 7890',
  bio: 'Award-winning real estate developer in Abuja with over 15 years of experience. Specializing in luxury residential and smart home developments across the FCT.',
  initials: 'SG',
  bankName: 'First Bank',
  bankAccountNumber: '3012345678',
  bankAccountName: 'Saleem Goje Properties Ltd',
  createdAt: '2025-06-15T00:00:00Z',
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [developer, setDeveloper] = useState<DeveloperUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setDeveloper(JSON.parse(stored));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback((email: string) => {
    const user = { ...MOCK_DEVELOPER, email };
    setDeveloper(user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }, []);

  const logout = useCallback(() => {
    setDeveloper(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const updateProfile = useCallback((updates: Partial<DeveloperUser>) => {
    setDeveloper((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ developer, isLoading, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}
