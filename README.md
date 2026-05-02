# PropVest

Fractional real estate investment platform for Nigeria. Own a piece of premium property starting from N100,000.

## Architecture

PropVest is a monorepo with 4 apps:

```
apps/
  staff/       → Admin dashboard (Next.js)
  developer/   → Developer portal (Next.js)
  investor/    → Investor mobile app (React Native / Expo)
  web/         → Marketing website (Next.js)
docs/          → PRD, pitch deck, design system, pitching script
```

## Apps

### Staff Portal (`apps/staff`)
Internal admin dashboard for the PropVest team. Role-based access (CEO, COO, Finance Manager, Compliance Officer, Support).

- Dashboard with platform metrics and alerts
- KYC review and approval workflow
- Property approval and management
- Payout processing via Paystack bulk transfers
- P2P trade monitoring
- Investor and developer management
- Platform settings (fees, KYC limits, feature flags, referral program)
- Staff management and role assignment
- Finance overview, compliance, audit logs

### Developer Portal (`apps/developer`)
For property developers (e.g., Saleem Goje Properties, Dan Mama Homes) to list and manage properties.

- Property listing wizard (basic info, financials, documents, review)
- Investor tracking across properties
- Payout history and breakdowns
- Analytics and growth metrics
- Marketing tools (branded links, QR codes)
- Company profile and bank details management

### Investor App (`apps/investor`)
React Native mobile app for investors to browse, invest, and trade property units.

- Property browsing with filters and search
- Unit purchase flow with fee breakdown
- Portfolio tracking and holding details
- P2P secondary market (buy, sell, list units)
- Money routing visualization
- KYC verification (BVN/NIN)
- Payout history
- Developer directory
- Notifications and settings

### Marketing Website (`apps/web`)
Public-facing landing page for PropVest.

- Property showcase
- How it works guide
- Returns calculator
- Developer benefits section
- FAQ and testimonials

## Fee Model

| Fee | Rate | Paid By | When |
|-----|------|---------|------|
| Investment Fee | 2% (capped) | Investor | Every unit purchase |
| Platform Fee | 3% (capped) | Deducted from payouts | Rent/sale distributions |
| P2P Trading Fee | 1% (max N5,000) | Both sides | Secondary market trades |
| Management Fee | Set by developer (max 15%) | Deducted from payouts | Developer's compensation |

Paystack transaction fees are absorbed by PropVest.

## Tech Stack

- **Frontend:** Next.js, React Native (Expo), TypeScript, Tailwind CSS
- **Payments:** Paystack (DVA, split payments, bulk transfers)
- **Auth:** Role-based with BVN/NIN verification for investors
- **State:** localStorage config (blueprint for API-based config)

## Getting Started

```bash
# Staff Portal
cd apps/staff && npm install && npm run dev    # localhost:3001

# Developer Portal
cd apps/developer && npm install && npm run dev # localhost:3002

# Investor App
cd apps/investor && npm install && npx expo start

# Marketing Website
cd apps/web && npm install && npm run dev       # localhost:3000
```

## Documentation

- [Product Requirements (PRD)](docs/PRD_PROPVEST.md)
- [Design System](docs/DESIGN_SYSTEM.md)
- [Company Structure](docs/COMPANY_STRUCTURE.md)
- [Pitching Script](docs/PITCHING_SCRIPT.md)
