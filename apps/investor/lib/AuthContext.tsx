import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  hasOnboarded: '@propvest:hasOnboarded',
  authUser: '@propvest:authUser',
};

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  isVerified: boolean;
}

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  hasOnboarded: boolean;
  signUp: (data: { fullName: string; email: string; phone: string; password: string }) => Promise<void>;
  signIn: (data: { emailOrPhone: string; password: string }) => Promise<void>;
  verifyOtp: (code: string) => Promise<boolean>;
  sendPasswordReset: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isLoading: true,
  hasOnboarded: false,
  signUp: async () => {},
  signIn: async () => {},
  verifyOtp: async () => false,
  sendPasswordReset: async () => {},
  signOut: async () => {},
  completeOnboarding: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasOnboarded, setHasOnboarded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [onboarded, savedUser] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.hasOnboarded),
          AsyncStorage.getItem(STORAGE_KEYS.authUser),
        ]);
        if (onboarded === 'true') setHasOnboarded(true);
        if (savedUser) setUser(JSON.parse(savedUser));
      } catch {} finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const signUp = useCallback(async (data: { fullName: string; email: string; phone: string; password: string }) => {
    // Mock: simulate network delay
    await new Promise((r) => setTimeout(r, 800));
    const newUser: User = {
      id: `u_${Date.now()}`,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      isVerified: false,
    };
    setUser(newUser);
    await AsyncStorage.setItem(STORAGE_KEYS.authUser, JSON.stringify(newUser));
  }, []);

  const signIn = useCallback(async (data: { emailOrPhone: string; password: string }) => {
    await new Promise((r) => setTimeout(r, 800));
    const mockUser: User = {
      id: 'u_mock_1',
      fullName: 'Muhammad Sada Yusuf',
      email: data.emailOrPhone.includes('@') ? data.emailOrPhone : 'muhd@propvest.ng',
      phone: !data.emailOrPhone.includes('@') ? data.emailOrPhone : '+2348012345678',
      isVerified: true,
    };
    setUser(mockUser);
    await AsyncStorage.setItem(STORAGE_KEYS.authUser, JSON.stringify(mockUser));
  }, []);

  const verifyOtp = useCallback(async (code: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 600));
    if (code !== '123456') return false;
    if (user) {
      const verified = { ...user, isVerified: true };
      setUser(verified);
      await AsyncStorage.setItem(STORAGE_KEYS.authUser, JSON.stringify(verified));
    }
    return true;
  }, [user]);

  const sendPasswordReset = useCallback(async (_email: string) => {
    await new Promise((r) => setTimeout(r, 800));
  }, []);

  const signOut = useCallback(async () => {
    setUser(null);
    await AsyncStorage.removeItem(STORAGE_KEYS.authUser);
  }, []);

  const completeOnboarding = useCallback(async () => {
    setHasOnboarded(true);
    await AsyncStorage.setItem(STORAGE_KEYS.hasOnboarded, 'true');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        hasOnboarded,
        signUp,
        signIn,
        verifyOtp,
        sendPasswordReset,
        signOut,
        completeOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
