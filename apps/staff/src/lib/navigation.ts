import {
  LayoutDashboard, Building2, Users, CheckCircle2,
  Wallet, ArrowRightLeft, Handshake, TrendingUp,
  Shield, UserCog, Settings, ClipboardList, Megaphone,
} from 'lucide-react';

export const sidebarNav = [
  { key: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { key: 'properties', label: 'Properties', href: '/properties', icon: Building2 },
  { key: 'investors', label: 'Investors', href: '/investors', icon: Users },
  { key: 'kyc', label: 'KYC Queue', href: '/kyc', icon: CheckCircle2 },
  { key: 'payouts', label: 'Payouts', href: '/payouts', icon: Wallet },
  { key: 'p2p', label: 'P2P Trades', href: '/p2p', icon: ArrowRightLeft },
  { key: 'developers', label: 'Developers', href: '/developers', icon: Handshake },
  { key: 'finance', label: 'Finance', href: '/finance', icon: TrendingUp },
  { key: 'compliance', label: 'Compliance', href: '/compliance', icon: Shield },
  { key: 'staff', label: 'Staff', href: '/staff', icon: UserCog },
  { key: 'settings', label: 'Settings', href: '/settings', icon: Settings },
  { key: 'audit-log', label: 'Audit Log', href: '/audit-log', icon: ClipboardList },
  { key: 'announcements', label: 'Announcements', href: '/announcements', icon: Megaphone },
];
