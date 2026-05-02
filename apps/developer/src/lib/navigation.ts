import {
  LayoutDashboard, Building2, Users, Wallet,
  BarChart3, Megaphone, Bell, Settings, HelpCircle,
} from 'lucide-react';

export const sidebarNav = [
  { key: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { key: 'properties', label: 'Properties', href: '/properties', icon: Building2 },
  { key: 'investors', label: 'Investors', href: '/investors', icon: Users },
  { key: 'payouts', label: 'Payouts', href: '/payouts', icon: Wallet },
  { key: 'analytics', label: 'Analytics', href: '/analytics', icon: BarChart3 },
  { key: 'marketing', label: 'Marketing', href: '/marketing', icon: Megaphone },
  { key: 'notifications', label: 'Notifications', href: '/notifications', icon: Bell },
  { key: 'settings', label: 'Settings', href: '/settings', icon: Settings },
  { key: 'support', label: 'Support', href: '/support', icon: HelpCircle },
];
