import type { DeveloperNotification } from '../types';

export const notifications: DeveloperNotification[] = [
  { id: 'dn-1', type: 'payout_completed', title: 'Payout Completed', body: 'Q1 2026 payout for Gwarinpa Luxury Duplex has been distributed to 432 investors.', read: false, createdAt: '2026-04-03T10:00:00Z', route: '/payouts' },
  { id: 'dn-2', type: 'payout_completed', title: 'Payout Completed', body: 'Q1 2026 payout for Jabi Lake Terraces has been distributed to 540 investors.', read: false, createdAt: '2026-04-02T14:00:00Z', route: '/payouts' },
  { id: 'dn-3', type: 'new_investor', title: 'New Investor', body: 'Suleiman Baba invested ₦1,875,000 (25 units) in Wuse 2 Smart Homes.', read: false, createdAt: '2026-04-01T09:00:00Z', route: '/investors' },
  { id: 'dn-4', type: 'new_investor', title: 'New Investor', body: 'Grace Udo invested ₦900,000 (12 units) in Wuse 2 Smart Homes.', read: true, createdAt: '2026-03-15T11:00:00Z', route: '/investors' },
  { id: 'dn-5', type: 'property_approved', title: 'Property Under Review', body: 'Your property "Asokoro Executive Villa" has been submitted and is under review by the PropVest team.', read: true, createdAt: '2026-04-20T08:00:00Z', route: '/properties' },
  { id: 'dn-6', type: 'property_funded', title: 'Funding Milestone', body: 'Jabi Lake Terraces has reached 90% funding — only 60 units remaining!', read: true, createdAt: '2026-03-28T16:00:00Z', route: '/properties' },
  { id: 'dn-7', type: 'new_investor', title: 'New Investor', body: 'Blessing Okoh invested ₦1,200,000 (8 units) in Gwarinpa Luxury Duplex.', read: true, createdAt: '2025-12-01T10:00:00Z', route: '/investors' },
  { id: 'dn-8', type: 'system', title: 'Welcome to PropVest', body: 'Your developer account has been activated. Start by listing your first property.', read: true, createdAt: '2025-06-15T00:00:00Z' },
];
