import type { StaffRole } from './types';

export const ROLE_LABELS: Record<StaffRole, string> = {
  ceo: 'Chief Executive Officer',
  coo: 'Chief Operating Officer',
  ops: 'Operations Associate',
  finance: 'Finance Manager',
  legal: 'Legal Officer',
  devrel: 'Developer Relations',
  support: 'Support Agent',
  compliance: 'Compliance Officer',
};

export const ROLE_SHORT_LABELS: Record<StaffRole, string> = {
  ceo: 'CEO',
  coo: 'COO',
  ops: 'Operations',
  finance: 'Finance',
  legal: 'Legal',
  devrel: 'DevRel',
  support: 'Support',
  compliance: 'Compliance',
};

export const ROLE_COLORS: Record<StaffRole, string> = {
  ceo: 'bg-emerald/15 text-emerald',
  coo: 'bg-royal/15 text-royal',
  ops: 'bg-blue-100 text-blue-700',
  finance: 'bg-amber-100 text-amber-700',
  legal: 'bg-purple-100 text-purple-700',
  devrel: 'bg-pink-100 text-pink-700',
  support: 'bg-cyan-100 text-cyan-700',
  compliance: 'bg-orange-100 text-orange-700',
};

export const ALL_ROLES: StaffRole[] = ['ceo', 'coo', 'ops', 'finance', 'legal', 'devrel', 'support', 'compliance'];

export const PROPERTY_TYPE_LABELS: Record<string, string> = {
  rental: 'Rental',
  build_sell: 'Build & Sell',
  land: 'Land',
};

export const PROPERTY_STATUS_LABELS: Record<string, string> = {
  draft: 'Draft',
  under_review: 'Under Review',
  active: 'Active',
  paused: 'Paused',
  fully_funded: 'Fully Funded',
  completed: 'Completed',
};

export const PROPERTY_PHASE_LABELS: Record<string, string> = {
  funding: 'Funding',
  construction: 'Construction',
  vacant: 'Awaiting Tenant',
  renting: 'Renting',
  selling: 'Selling',
  sold: 'Sold',
  holding: 'Holding',
  completed: 'Completed',
};
