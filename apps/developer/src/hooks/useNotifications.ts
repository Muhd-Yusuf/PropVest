'use client';

import { useState, useEffect, useCallback } from 'react';
import { notifications as mockNotifications } from '@/lib/mock-data';
import type { DeveloperNotification } from '@/lib/types';

const STORAGE_KEY = 'propvest_dev_notifications';

export function useNotifications() {
  const [notifications, setNotifications] = useState<DeveloperNotification[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setNotifications(JSON.parse(stored));
      } catch {
        setNotifications(mockNotifications);
      }
    } else {
      setNotifications(mockNotifications);
    }
  }, []);

  useEffect(() => {
    if (notifications.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
    }
  }, [notifications]);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const markOneRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return { notifications, unreadCount, markAllRead, markOneRead };
}
