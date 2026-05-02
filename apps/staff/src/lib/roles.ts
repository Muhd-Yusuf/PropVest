import type { StaffRole } from './types';

export type Permission =
  | 'dashboard.view'
  | 'properties.read' | 'properties.crud' | 'properties.approve'
  | 'investors.read' | 'investors.full' | 'investors.kyc'
  | 'kyc.process' | 'kyc.view' | 'kyc.audit'
  | 'payouts.view' | 'payouts.full' | 'payouts.approve' | 'payouts.prepare'
  | 'p2p.full' | 'p2p.monitor' | 'p2p.read' | 'p2p.disputes'
  | 'developers.read' | 'developers.full' | 'developers.contracts'
  | 'finance.read' | 'finance.full'
  | 'compliance.read' | 'compliance.full'
  | 'staff.full'
  | 'settings.full' | 'settings.limited'
  | 'audit.full'
  | 'announcements.full' | 'announcements.draft';

const ALL_PERMISSIONS: Permission[] = [
  'dashboard.view',
  'properties.read', 'properties.crud', 'properties.approve',
  'investors.read', 'investors.full', 'investors.kyc',
  'kyc.process', 'kyc.view', 'kyc.audit',
  'payouts.view', 'payouts.full', 'payouts.approve', 'payouts.prepare',
  'p2p.full', 'p2p.monitor', 'p2p.read', 'p2p.disputes',
  'developers.read', 'developers.full', 'developers.contracts',
  'finance.read', 'finance.full',
  'compliance.read', 'compliance.full',
  'staff.full',
  'settings.full', 'settings.limited',
  'audit.full',
  'announcements.full', 'announcements.draft',
];

export const rolePermissions: Record<StaffRole, Permission[]> = {
  ceo: ALL_PERMISSIONS,
  coo: ALL_PERMISSIONS.filter(p => p !== 'staff.full'),
  ops: ['dashboard.view', 'properties.read', 'investors.read', 'investors.kyc', 'kyc.process', 'kyc.view', 'p2p.monitor', 'p2p.read', 'developers.read'],
  finance: ['dashboard.view', 'properties.read', 'investors.read', 'payouts.full', 'payouts.prepare', 'payouts.view', 'finance.full', 'finance.read', 'p2p.read', 'developers.read'],
  legal: ['dashboard.view', 'properties.read', 'investors.read', 'developers.read', 'developers.contracts', 'compliance.full', 'compliance.read', 'audit.full'],
  devrel: ['dashboard.view', 'properties.read', 'properties.crud', 'investors.read', 'developers.full', 'developers.read', 'p2p.read'],
  support: ['dashboard.view', 'properties.read', 'investors.read', 'kyc.view', 'p2p.disputes', 'p2p.read', 'developers.read', 'announcements.draft'],
  compliance: ['dashboard.view', 'properties.read', 'investors.full', 'investors.read', 'kyc.audit', 'kyc.view', 'payouts.view', 'p2p.monitor', 'p2p.read', 'developers.read', 'compliance.full', 'compliance.read', 'audit.full'],
};

export function hasPermission(role: StaffRole, permission: Permission): boolean {
  return rolePermissions[role].includes(permission);
}

export const navAccess: Record<string, StaffRole[]> = {
  dashboard: ['ceo', 'coo', 'ops', 'finance', 'legal', 'devrel', 'support', 'compliance'],
  properties: ['ceo', 'coo', 'ops', 'finance', 'legal', 'devrel', 'support', 'compliance'],
  investors: ['ceo', 'coo', 'ops', 'finance', 'legal', 'devrel', 'support', 'compliance'],
  kyc: ['ceo', 'coo', 'ops', 'support', 'compliance'],
  payouts: ['ceo', 'coo', 'ops', 'finance', 'compliance'],
  p2p: ['ceo', 'coo', 'ops', 'finance', 'support', 'compliance'],
  developers: ['ceo', 'coo', 'ops', 'finance', 'legal', 'devrel', 'support', 'compliance'],
  finance: ['ceo', 'coo', 'finance', 'compliance'],
  compliance: ['ceo', 'coo', 'legal', 'compliance'],
  staff: ['ceo'],
  settings: ['ceo', 'coo'],
  'audit-log': ['ceo', 'coo', 'legal', 'compliance'],
  announcements: ['ceo', 'coo', 'support'],
};
