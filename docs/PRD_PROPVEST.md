# PropVest — Product Requirements Document (PRD)

> The complete blueprint for building PropVest. Every screen, every feature, every API endpoint. Organized by platform and tagged by build phase.

---

## 1. PRODUCT OVERVIEW

### 1.1 Vision

Make real estate investment accessible to every Nigerian by letting trusted developers fractionally sell their properties to their own followers.

### 1.2 Mission

Build the invisible infrastructure that lets property developers raise capital from their followers, while handling all the boring stuff — payments, KYC, payouts, legal, and marketplace. Developers set their own unit prices, fee structures, and return models. PropVest provides the platform; developers control their properties.

### 1.3 Target Users

| User Type | Who They Are | What They Want |
|-----------|-------------|----------------|
| **Investors** | Nigerian workers, diaspora, anyone looking to invest in real estate | Own a piece of verified property, earn rent or profit, grow wealth |
| **Developer Partners** | Established property developers with social media following (Dan Mama, Saleem Goje, etc.) | Raise capital faster from their audience without bank loans. Full control over property pricing, unit structure, fees, and return model |
| **Platform Admins** | PropVest staff (CEO, COO, Operations, Finance, Legal, Support) | Manage the platform, investors, properties, payouts, compliance |

### 1.4 Platform Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     PROPVEST PLATFORM                        │
├──────────────┬───────────────┬───────────────┬──────────────┤
│  Investor    │  Developer    │  Admin        │  Product     │
│  App         │  Portal       │  Portal       │  Website     │
│  (Expo)      │  (Next.js)    │  (Next.js)    │  (Next.js)   │
│  iOS/And/Web │  Web          │  Web          │  Web         │
├──────────────┴───────────────┴───────────────┴──────────────┤
│                      REST API (Node.js / Express)            │
├──────────────┬───────────────┬───────────────┬──────────────┤
│  MongoDB     │  Paystack     │  Cloudinary   │  Expo Push   │
│  Atlas       │  DVA/Transfer │  (images)     │  (notifs)    │
├──────────────┼───────────────┼───────────────┼──────────────┤
│  Resend      │  Termii       │  Dojah        │  PostHog     │
│  (email)     │  (SMS/OTP)    │  (KYC Phase2) │  (analytics) │
└──────────────┴───────────────┴───────────────┴──────────────┘
```

### 1.5 Tech Stack

| Layer | Technology |
|-------|-----------|
| Investor App | React Native + Expo (iOS, Android, Web) |
| Developer Portal | Next.js 15 + TypeScript + Tailwind CSS |
| Admin Portal | Next.js 15 + TypeScript + Tailwind CSS |
| Product Website | Next.js 15 + TypeScript + Tailwind CSS |
| Backend API | Node.js + Express (or Next.js API routes) |
| Database | MongoDB Atlas |
| Auth (web) | NextAuth.js with JWT |
| Auth (mobile) | Custom JWT + secure storage |
| Payments In | Paystack DVA (Dedicated Virtual Accounts) |
| Payment Split | Paystack Sub-accounts (auto-split per developer-defined ratio) |
| Payments Out | Paystack Transfers (Bulk) |
| KYC Tier 1 | Paystack Resolve Account (free) |
| KYC Tier 2 | Paystack BVN Resolve (N10/call) |
| KYC Tier 3 | Dojah NIN + facial (Phase 2) |
| Email | Resend |
| SMS / OTP | Termii |
| Push Notifications | Expo Push Notifications |
| Image Storage | Cloudinary |
| Document Storage | Cloudinary (signed URLs for private docs) |
| Analytics | PostHog (self-hosted or cloud) |
| Hosting (web) | Vercel |
| Hosting (mobile) | EAS Build + EAS Submit |

### 1.6 Design System

Full visual design specification is in **DESIGN_SYSTEM.md** — covers color palette, typography (Inter + JetBrains Mono), spacing system, component library, animations, dark mode, screen layouts with ASCII mockups, accessibility standards, and platform-specific guidelines. Every component, every color, every animation is documented.

---

## 2. INVESTOR APP (React Native + Expo)

> iOS + Android + Web. This is what investors use to browse, invest, track, and earn.

---

### 2.1 Authentication

| Screen | Features | Phase |
|--------|----------|-------|
| **Welcome / Onboarding** | 3-slide intro (what is PropVest, how it works, get started). Skip button. | MVP |
| **Sign Up** | Full name, email, phone number, password, confirm password. Terms checkbox. | MVP |
| **OTP Verification** | 6-digit OTP sent via SMS (Termii). Auto-read on Android. Resend button with 60s cooldown. | MVP |
| **Login** | Email/phone + password. "Forgot password" link. Biometric login toggle (after first login). | MVP |
| **Forgot Password** | Enter email → receive reset link → set new password. | MVP |
| **Biometric Login** | Fingerprint / Face ID. Enable in settings after first successful login. | Phase 1 |

### 2.2 KYC Onboarding (Tiered)

| Tier | What User Provides | API Used | Cost | Limit | Phase |
|------|-------------------|----------|------|-------|-------|
| **Tier 1** | Bank account number + bank name | Paystack Resolve Account | Free | Invest up to N500,000 | MVP |
| **Tier 2** | BVN (11 digits) | Paystack BVN Resolve | N10 | Invest up to N5,000,000 | Phase 1 |
| **Tier 3** | NIN + selfie photo | Dojah NIN + Liveness | ~N150 | Unlimited | Phase 2 |

**KYC Flow:**
```
After signup → "Verify your identity to start investing"
→ Enter bank name (dropdown) + account number
→ Backend calls Paystack Resolve → returns name
→ Match name with signup name
→ If match → Tier 1 verified → can browse and invest
→ If mismatch → show error, ask to retry or contact support

When investor tries to exceed N500,000 total:
→ "Upgrade your verification to invest more"
→ Enter BVN → backend verifies → Tier 2 unlocked

When investor tries to exceed N5,000,000:
→ "Complete full verification"
→ Enter NIN + take selfie → Dojah verifies → Tier 3 unlocked
```

### 2.3 Home Dashboard

| Element | Description | Phase |
|---------|-------------|-------|
| **Portfolio summary card** | Total invested, current value, total returns earned, unrealized gains (%). Tap to go to portfolio. | MVP |
| **Recent payouts** | Last 3 payouts with amount and date. "See all" link. | MVP |
| **Trending properties** | Top 3 properties by investor count or % funded. Horizontal scroll cards. | MVP |
| **AI recommended** | "Recommended for you" section — 3 properties based on behavior. | Phase 2 |
| **New from followed developers** | Properties from developers you follow. Only shows if you follow someone. | Phase 1 |
| **Quick actions** | Buttons: "Invest", "My Portfolio", "Marketplace", "Payouts" | MVP |
| **Weekly summary banner** | "Your portfolio is up X% this week" — dismissable. | Phase 2 |
| **Announcements** | Admin-pushed announcements (maintenance, new features, etc.) | Phase 1 |

### 2.4 Property Browsing

| Element | Description | Phase |
|---------|-------------|-------|
| **Tabs** | "All", "Rental", "Build & Sell", "Land" | MVP |
| **Search** | Search by property name, location, developer name | MVP |
| **Filters** | Location, price range (unit price range), property type, developer, % funded, sort by (newest, most popular, highest yield) | MVP |
| **Property card** | Image, name, developer name, location, unit price, % funded progress bar, property type badge (Rental / Build & Sell / Land), estimated return | MVP |
| **Sold out badge** | Grey overlay "Fully Funded" on properties with no units left | MVP |
| **Wishlist icon** | Heart icon on each card — save to wishlist | Phase 1 |

### 2.5 Property Detail

| Section | Content | Phase |
|---------|---------|-------|
| **Image gallery** | Swipeable property photos. Tap to fullscreen. | MVP |
| **Header** | Property name, developer name (tappable → developer profile), location, property type badge | MVP |
| **Funding progress** | Progress bar, "X of Y units sold", "Z% funded", units remaining | MVP |
| **Key numbers** | Unit price (set by developer), total property value, estimated return (%), payout frequency (set by developer — quarterly, on sale, or custom) | MVP |
| **About** | Property description written by developer. Construction details for build & sell. | MVP |
| **Financials tab** | For rental: annual rent, payout per unit (per developer-set frequency), rent yield %. For build & sell: build cost, estimated sale price, estimated profit %, timeline. For land: price per sqm, total area, estimated appreciation. All financial terms are set by the developer. | MVP |
| **Documents tab** | C of O, Governor's Consent, building plans, inspection report. View / download. | MVP |
| **Developer updates tab** | Timeline of updates posted by developer (construction photos, milestones). | Phase 1 |
| **Investor count** | "X investors have invested in this property" (social proof) | MVP |
| **Invest CTA** | Sticky bottom button: "Invest Now" → goes to investment flow | MVP |
| **Share button** | Share property via WhatsApp, copy link, Instagram story | Phase 1 |
| **Wishlist button** | Save / unsave from wishlist | Phase 1 |

### 2.6 Investment Flow

```
Step 1: SELECT UNITS
  - Property summary (name, unit price, remaining units)
  - Unit quantity input (+ / - buttons, or type number)
  - Total amount auto-calculated
  - "Continue" button (disabled if quantity is 0 or exceeds KYC limit)

Step 2: REVIEW & CONFIRM
  - Summary: property name, X units at N[unit price] each = N[total]
  - Platform fee: [developer-configured %] = N[amount]
  - Total to pay: N[total + fee]
  - Checkbox: "I understand this is an investment with risks"
  - "Confirm & Pay" button

Step 3: PAYMENT
  - Show Paystack DVA bank account details:
    Bank: Wema Bank (or Titan)
    Account Number: 7821093456
    Account Name: PropVest/[Property Name]
    Amount: N[total]
    Reference: INV-XXXXXX
  - "I have made the transfer" button
  - Or: countdown timer (DVA account expires in 30 min)
  - Waiting state: "We're confirming your payment..."

  PAYMENT ROUTING (behind the scenes):
  - Paystack Sub-account is pre-configured per property
  - On payment received, Paystack auto-splits based on developer-defined ratio:
    → Developer's share (e.g. 97%) settles to developer's bank account
    → Platform share (e.g. 3%) settles to PropVest's bank account
  - Split ratio is set by the developer during property creation
  - Developer sees money arrive in their own bank account directly
  - PropVest never holds developer's money

Step 4: CONFIRMATION
  - Success screen with confetti/animation
  - "You now own X units in [property name]!"
  - Summary: units owned, expected returns
  - Buttons: "View Portfolio", "Share with friends", "Invest in more"
```

**Phase:** MVP (all steps)

### 2.7 Portfolio

| Tab | Content | Phase |
|-----|---------|-------|
| **Holdings** | List of all properties you own units in. Per property: name, units owned, current value, return %, property type badge. Tap → property detail. | MVP |
| **Performance** | Total portfolio value over time (line chart). Total returns earned (bar chart by quarter). | Phase 1 |
| **Activity** | Timeline of all investment activity: purchases, payouts received, units sold, units bought. | MVP |

**Per holding detail (tap on a holding):**
- Units owned, purchase price, current value, gain/loss
- Payout history for this property
- "Sell Units" button → goes to marketplace listing flow
- Developer updates for this property

### 2.8 Payouts

| Element | Description | Phase |
|---------|-------------|-------|
| **Upcoming payouts** | Next expected payout: property name, estimated amount, estimated date | MVP |
| **Payout history** | List of all payouts received: date, property, amount, status (sent / pending / failed) | MVP |
| **Total earned** | Lifetime total payouts received | MVP |
| **Bank accounts** | List of linked bank accounts. Add / remove. One marked as "primary" for payouts. | MVP |
| **Payout breakdown** | Per payout: which property, how many units, rent amount, management fee deducted, your share | Phase 1 |

### 2.9 Secondary Market (P2P)

| Screen | Content | Phase |
|--------|---------|-------|
| **Browse listings** | All units for sale. Filter by property, price range, developer. Show: property name, seller's asking price, original price, gain/loss %, units available. | MVP |
| **Buy flow** | Tap "Buy" → review (units, price, trading fee) → pay via DVA → units transferred. Same payment flow as investment. | MVP |
| **Sell flow** | From portfolio → "Sell Units" → set price per unit, select how many units → list on marketplace. Can cancel listing anytime. | MVP |
| **My listings** | View your active sell listings. Edit price, cancel listing. | MVP |
| **Price alerts** | Get notified when units in a property you own are listed below your purchase price | Phase 2 |
| **Trade history** | All completed P2P trades (bought and sold) | MVP |

### 2.10 Developer Profiles

| Element | Description | Phase |
|---------|-------------|-------|
| **Developer page** | Developer name, logo, bio/description, follower count, properties listed, total raised, investor count | Phase 1 |
| **Follow button** | Follow / unfollow. Get notified of new listings. | Phase 1 |
| **Properties tab** | All properties by this developer (active, fully funded, completed) | Phase 1 |
| **Track record** | Completed properties, average returns delivered, payout history | Phase 2 |
| **Updates tab** | All updates posted by this developer across all properties | Phase 1 |

### 2.11 Notifications

**Notification center (bell icon on home screen):**
- List of all notifications, newest first
- Read/unread indicator (blue dot)
- Tap to navigate to relevant screen
- "Mark all as read"
- Filter: All, Payouts, Properties, Marketplace, System

**Notification types (detailed in plan section 2a):**

| Category | Notifications | Delivery | Phase |
|----------|--------------|----------|-------|
| **Transactional** | Payment confirmed, payout sent, P2P completed, KYC status | Push + In-app + Email | MVP |
| **Property Updates** | New listing from followed dev, funding progress, value update, construction milestone, rent collected, property sold | Push + In-app | Phase 1 |
| **Engagement** | New property in your area, appreciation stats, inactivity nudge, portfolio summary, urgency ("X units left"), milestone celebration | Push | Phase 2 |
| **AI Recommendations** | Similar properties, "investors like you", pattern matching, track record alerts, marketplace price alerts | Push + In-app | Phase 2 |

**Notification preferences (in settings):**
- Toggle each category on/off
- Toggle push / email / SMS separately
- Quiet hours (no push between 10pm - 7am)

**Phase:** MVP (transactional only), Phase 1 (property updates), Phase 2 (engagement + AI)

### 2.12 Profile & Settings

| Section | Content | Phase |
|---------|---------|-------|
| **Personal info** | Name, email, phone (read-only after KYC) | MVP |
| **KYC status** | Current tier, upgrade prompt, verification history | MVP |
| **Bank accounts** | Add / remove / set primary. Verified via Paystack. | MVP |
| **Security** | Change password, enable biometric login, active sessions | MVP |
| **Notification preferences** | Toggle notifications by category | Phase 1 |
| **Referral** | Your referral code, share link, referral history, rewards earned | Phase 2 |
| **Document vault** | Investment certificates, investment receipts, tax documents | Phase 2 |
| **Investment calculator** | Input amount → see projected returns (rental yield, build & sell profit, land appreciation) | Phase 1 |
| **Help & support** | FAQ, in-app chat, email support, WhatsApp link | MVP |
| **Legal** | Terms of Service, Privacy Policy, Investment Risks | MVP |
| **App settings** | Dark mode toggle, language (English), currency (NGN) | Phase 1 |
| **Delete account** | Request account deletion (NDPA requirement) | MVP |

### 2.13 Additional Features

| Feature | Description | Phase |
|---------|-------------|-------|
| **Wishlist** | Save properties to invest later. Accessible from profile. | Phase 1 |
| **Share property** | Share via WhatsApp, copy link, Instagram story, Twitter | Phase 1 |
| **Investment calculator** | Slider: amount → projected quarterly rent, annual return, 5-year projection | Phase 1 |
| **In-app support chat** | Real-time chat with support team | Phase 2 |
| **Dark mode** | System-default or manual toggle | Phase 1 |
| **Biometric login** | Fingerprint / Face ID | Phase 1 |
| **Referral system** | Invite friends → earn bonus on their first investment | Phase 2 |
| **Offline mode** | View portfolio and holdings offline (cached data) | Phase 2 |

---

## 3. DEVELOPER PORTAL (Next.js)

> Web application for developer partners. This is where Saleem Goje or Dan Mama manages their properties and investors.

---

### 3.1 Authentication

| Feature | Description | Phase |
|---------|-------------|-------|
| **Invite-only signup** | Admin sends invite link → developer creates account | MVP |
| **Login** | Email + password | MVP |
| **2FA** | OTP via SMS on login (for security — they manage money) | Phase 1 |

### 3.2 Dashboard

| Element | Description | Phase |
|---------|-------------|-------|
| **Stats cards** | Properties listed, total raised, active investors, total followers on platform, pending payouts | MVP |
| **Revenue summary** | Your total earnings (from retained units), rent/sale income received, your management fee share | MVP |
| **Properties overview** | Quick list of all properties with funding status, units sold, next payout date | MVP |
| **Recent activity** | Latest investments, new followers, recent payouts | Phase 1 |
| **Notifications** | Pending actions: rent due, payout approval needed, new investor messages | MVP |

### 3.3 Property Management

> **Core Principle:** The developer has FULL control over their property. They set the unit price, fee structure, return model, timeline, and all financial parameters. PropVest does NOT impose any default pricing, minimum investment, or fee structure — the developer decides everything about their property. The platform provides the infrastructure; the developer provides the product.

**Property list:**
- All properties with status: Draft, Under Review, Active, Fully Funded, Completed
- Filter by status, type (rental, build & sell, land)

**Per property detail page:**

| Section | Content | Phase |
|---------|---------|-------|
| **Overview** | Property details, funding progress, investor count, unit price (developer-set) | MVP |
| **Investors** | List of all investors in this property: name, units, amount invested, date. Export to CSV. | MVP |
| **Funding progress** | Visual progress bar, units sold over time chart | MVP |
| **Payouts** | All payouts for this property: date, total distributed, developer's share, status | MVP |
| **Documents** | Uploaded documents (C of O, plans, photos). Add / replace. | MVP |
| **Updates** | Post updates to investors (text + photos). Shows on investor app. | Phase 1 |
| **Valuation** | Current property value. Update value (with justification). Requires admin approval. | Phase 1 |
| **Sales reporting** | For build & sell: report houses sold, upload proof, trigger profit distribution | MVP |
| **Rent reporting** | For rental: report rent collected, upload proof, trigger payout preparation | MVP |
| **Edit property** | Developer can edit any field they set (unit price, description, fees, etc.) while in Draft status. After approval, only certain fields can be edited (description, images, construction progress). | MVP |

### 3.4 Add New Property

> **Developer Autonomy:** Every financial field is set by the developer. PropVest does NOT define unit prices, fees, or return structures. In the UI, show placeholder text as examples to guide developers (e.g., "e.g. 150,000") but never pre-fill or enforce any amount. The developer's property, the developer's terms.

```
Step 1: BASIC INFO
  - Property name
  - Property type: Rental / Build & Sell / Land / Other
    Note: "Other" allows developers who don't fit the 3 standard models
    (e.g., fund a project without rental income or sale — just capital appreciation)
  - Location (state, city, area)
  - Description (rich text)
  - Upload photos (min 3, max 20)

Step 2: FINANCIAL DETAILS (all fields developer-defined)
  Common to all types:
    - Total property value (placeholder: "e.g. 90,000,000")
    - Unit price — what each investor pays per unit (placeholder: "e.g. 150,000")
      Note: There is NO platform-imposed minimum. Developer decides.
    - Total units — auto-calculated from value/price OR manual override
    - Developer retained units — how many the developer keeps for themselves (default: 0)
    - Platform fee % — PropVest's cut from investments (placeholder: "e.g. 3")
    - Management fee % — developer's management fee from returns (placeholder: "e.g. 10")
    - Split ratio — how investment payments are split: Developer % / Platform %
      (placeholder: "e.g. 97/3")

  For Rental:
    - Expected annual rent (placeholder: "e.g. 4,200,000")
    - Payout frequency: Quarterly / Monthly / Bi-annually / Custom
    - Expected rental yield % (auto-calculated or manual)

  For Build & Sell:
    - Total build cost
    - Estimated sale price (placeholder: "e.g. 350,000,000")
    - Estimated profit % (auto-calculated from build cost vs sale price)
    - Estimated timeline in months (placeholder: "e.g. 18")

  For Land:
    - Total area (hectares / sqm)
    - Current price per sqm
    - Expected appreciation rate (placeholder: "e.g. 15% per annum")
    - Hold period estimate (placeholder: "e.g. 24 months")

  For Other/Custom:
    - Return model description (free text — developer explains how investors earn)
    - Estimated return % (placeholder: "e.g. 20")
    - Estimated timeline (placeholder: "e.g. 12 months")

Step 3: DOCUMENTS
  - Upload C of O / Governor's Consent
  - Upload building plans / survey plans
  - Upload any inspection reports
  - Upload proof of ownership
  - Upload any other supporting documents

Step 4: REVIEW & SUBMIT
  - Review all entered information
  - Submit for admin review
  - Status: "Under Review"
  - Admin reviews and approves/rejects (see Admin Portal 4.3)
```

**Phase:** MVP

### 3.5 Marketing Toolkit

| Feature | Description | Phase |
|---------|-------------|-------|
| **Branded link** | Unique URL for each property: propvest.ng/invest/[developer-slug]/[property-slug] | MVP |
| **QR code** | Downloadable QR code linking to property page | Phase 1 |
| **Social media graphics** | Auto-generated Instagram post/story templates with property photo, price, and CTA | Phase 2 |
| **Embed widget** | Code snippet to embed investment CTA on developer's own website | Phase 2 |
| **Share analytics** | Track how many clicks from shared links, which social platform, conversion rate | Phase 2 |

### 3.6 Investor Analytics

| Metric | Description | Phase |
|--------|-------------|-------|
| **Total investors** | Across all properties | MVP |
| **Average investment size** | Helps developer understand their audience | Phase 1 |
| **Investor demographics** | Location breakdown (state), investment frequency | Phase 2 |
| **Follower growth** | Chart of followers over time on PropVest | Phase 1 |
| **Conversion rate** | Followers → investors (how many followers actually invest) | Phase 2 |

---

## 4. ADMIN PORTAL (Next.js) — Role-Based Access

> Web application for PropVest staff. Every feature is access-controlled based on role.

---

### 4.1 Role-Based Access Control (RBAC)

| Feature / Page | CEO | COO | Ops Associate | Finance | Legal | DevRel | Support | Compliance |
|---------------|-----|-----|---------------|---------|-------|--------|---------|------------|
| Dashboard | Full | Full | Limited | Financial | Legal | DevRel | Support | Compliance |
| Properties | CRUD | CRUD | Read | Read | Read+Docs | CRUD | Read | Read |
| Approve listing | Yes | Yes | No | No | Yes (docs) | Recommend | No | No |
| Investors | Full | Full | Read+KYC | Read | Read | Read | Read | Full |
| KYC Queue | Full | Full | Process | No | No | No | View | Audit |
| Payouts | Full | Approve | View | Full | No | No | No | Audit |
| Trigger payout | Yes | Yes | No | Prepare | No | No | No | No |
| P2P Trades | Full | Full | Monitor | Read | No | No | Disputes | Monitor |
| Developer Partners | Full | Full | Read | Read | Contracts | Full | Read | Read |
| Financial Reports | Full | Full | No | Full | No | No | No | Read |
| Compliance | Full | Read | No | No | Full | No | No | Full |
| Staff Management | Full | No | No | No | No | No | No | No |
| System Settings | Full | Limited | No | No | No | No | No | No |
| Audit Log | Full | Full | No | No | Full | No | No | Full |
| Announcements | Full | Full | No | No | No | No | Draft | No |

### 4.2 Admin Dashboard

| Element | Description | Phase |
|---------|-------------|-------|
| **Key metrics** | Total investors, total properties, total assets managed, platform revenue (MTD, YTD), total payouts distributed | MVP |
| **Pending actions** | KYC approvals pending, properties awaiting review, payouts to process, support tickets open | MVP |
| **Revenue chart** | Platform fee + management fee + trading fee over time | Phase 1 |
| **Recent transactions** | Last 20 transactions across all properties | MVP |
| **Alerts** | Failed payouts, flagged transactions, developer rent overdue, KYC issues | MVP |
| **Quick actions** | "Review KYC", "Process Payouts", "View Properties" | MVP |

### 4.3 Properties Management

> **Admin's role:** Admin reviews and approves properties submitted by developers, but does NOT dictate financial terms. The developer sets unit price, fees, split ratio, return model, and all financial parameters. Admin verifies documents, checks legitimacy, and sets up payment routing based on what the developer specified.

| Feature | Description | Phase |
|---------|-------------|-------|
| **List all properties** | Table: name, developer, type, status, % funded, investors, total raised. Search + filters. | MVP |
| **Property detail** | All info: financials (developer-set), investors, payouts, documents, updates, payment routing details | MVP |
| **Approve/reject listing** | Review submitted property. Verify documents and developer credentials. Approve or reject with reason. Does NOT change developer's financial terms — only verifies legitimacy. | MVP |
| **Payment routing setup** | Create Paystack sub-account for property using developer-specified split ratio, link developer's bank account, generate DVA | MVP |
| **Edit property** | Admin can change status (active → paused → completed) and add internal notes. Cannot override developer's unit price, fees, or return model without developer consent. | MVP |
| **Property health** | Flag: rent overdue, construction delayed, investor complaints | Phase 1 |

### 4.4 Investor Management

| Feature | Description | Phase |
|---------|-------------|-------|
| **List all investors** | Table: name, email, phone, KYC tier, total invested, properties count, join date. Search + filters. | MVP |
| **Investor detail** | Profile, KYC info, all investments, payout history, support tickets, activity log | MVP |
| **Freeze account** | Temporarily freeze investor account (suspected fraud, compliance issue) | MVP |
| **Flag account** | Flag for review (doesn't freeze, just marks for attention) | MVP |
| **Export** | Export investor list to CSV (for compliance reporting) | Phase 1 |
| **Send notification** | Send push/email to specific investor | Phase 1 |

### 4.5 KYC Queue

| Feature | Description | Phase |
|---------|-------------|-------|
| **Pending queue** | List of investors awaiting KYC review (mainly Tier 2-3 or flagged Tier 1) | MVP |
| **Review screen** | Show investor's submitted info vs API-returned info. Match/mismatch highlights. | MVP |
| **Approve / Reject / Request more info** | Actions with reason field | MVP |
| **Auto-approve** | Tier 1 (bank account match) auto-approves. Only mismatches go to queue. | MVP |
| **KYC stats** | Approved today, rejected today, pending, average processing time | Phase 1 |

### 4.6 Payout Management

| Feature | Description | Phase |
|---------|-------------|-------|
| **Upcoming payouts** | Calendar/list of upcoming payouts per property (frequency set by developer: quarterly, monthly, etc.) | MVP |
| **Prepare payout** | Select property → system calculates each investor's share based on developer-defined fee structure → review breakdown | MVP |
| **Approve payout** | CEO or COO approves → Finance triggers Paystack Bulk Transfer | MVP |
| **Monitor payout** | Real-time status of all transfers (sent, pending, failed) | MVP |
| **Retry failed** | Retry individual failed transfers (wrong bank details, etc.) | MVP |
| **Payout history** | All past payouts: date, property, total distributed, fees, status | MVP |
| **Reconciliation** | Compare: rent received from developer vs total distributed to investors vs fees collected. Flag discrepancies. | Phase 1 |
| **Payout reports** | Downloadable PDF/CSV per payout cycle | Phase 1 |

### 4.7 P2P Trade Monitoring

| Feature | Description | Phase |
|---------|-------------|-------|
| **Active listings** | All units currently listed for sale | MVP |
| **Completed trades** | All completed P2P transactions with fee collected | MVP |
| **Flagged trades** | Auto-flagged: same buyer/seller, unusual price, high frequency | Phase 1 |
| **Dispute queue** | Investor-reported disputes. Investigate, resolve, or escalate. | MVP |
| **Trading stats** | Volume, average markup, most traded properties | Phase 1 |

### 4.8 Developer Partner Management

| Feature | Description | Phase |
|---------|-------------|-------|
| **List all developers** | Table: name, properties, total raised, investors, follower count, status | MVP |
| **Developer detail** | Profile, all properties, payout history, documents, notes | MVP |
| **Onboard new developer** | Create account, send invite, upload partnership agreement | MVP |
| **Performance dashboard** | Per developer: funding speed, rent collection timeliness, investor satisfaction | Phase 1 |
| **Rent tracking** | Track expected rent dates. Auto-flag if rent is X days overdue. | Phase 1 |
| **Communication log** | Notes from interactions with developer (calls, meetings, issues) | Phase 1 |

### 4.9 Financial Reports

| Report | Description | Phase |
|--------|-------------|-------|
| **Revenue dashboard** | Platform fees, management fees, trading fees — by month, by property | MVP |
| **Expense tracking** | Paystack fees, KYC costs, other operational costs | Phase 1 |
| **Per-property P&L** | Revenue vs costs per property | Phase 1 |
| **Per-property financial report** | Total collected via Paystack, developer's share, platform fees earned, payouts distributed, current status | MVP |
| **Tax report** | VAT collected, WHT applicable, CIT calculation helper | Phase 2 |
| **Investor report** | Total invested, total returned, platform growth metrics | Phase 1 |

### 4.10 Compliance

| Feature | Description | Phase |
|---------|-------------|-------|
| **Transaction monitoring** | Flag large transactions (above threshold), unusual patterns | Phase 1 |
| **STR filing** | Suspicious Transaction Report form (for NFIU submission) | Phase 2 |
| **KYC audit** | Review KYC decisions, spot checks, compliance statistics | Phase 1 |
| **AML dashboard** | Risk scores for investors based on transaction patterns | Phase 2 |
| **Regulatory documents** | Store SEC filings, SCUML certificate, NDPA audit reports | Phase 1 |

### 4.11 Staff Management

| Feature | Description | Phase |
|---------|-------------|-------|
| **List staff** | All admin users: name, email, role, last active, status | MVP |
| **Add staff** | Create new admin account with role assignment | MVP |
| **Edit role** | Change staff member's role (changes their access immediately) | MVP |
| **Deactivate** | Disable staff account without deleting (preserves audit trail) | MVP |
| **Activity log** | Per staff member: what they accessed, what they changed | Phase 1 |

### 4.12 System Settings

> **Note:** Platform fee, management fee, and split ratio are suggestions shown to developers during property creation. Developers can override ALL of these. The settings below are default placeholders, not enforced values.

| Setting | Description | Phase |
|---------|-------------|-------|
| **Suggested platform fee %** | Suggested platform fee shown to developers when creating a property (developer can change) | MVP |
| **Suggested management fee %** | Suggested management fee shown to developers (developer can change) | MVP |
| **Trading fee %** | P2P marketplace fee (platform-controlled, not developer-set) | MVP |
| **KYC tier limits** | Max investment per KYC tier | MVP |
| **Default payout schedule** | Default payout frequency suggestion (developer chooses their own) | MVP |
| **Maintenance mode** | Toggle platform into maintenance mode (shows message to all users) | MVP |
| **Feature flags** | Enable/disable features (marketplace, referrals, etc.) | Phase 1 |

### 4.13 Audit Log

Every action by every user is logged:
- Who (user ID, name, role)
- What (action: create, update, delete, approve, reject, login, etc.)
- When (timestamp)
- Where (which page/feature)
- Details (what changed, old value → new value)
- IP address

Searchable, filterable, exportable. Cannot be deleted or modified.

**Phase:** MVP

### 4.14 Announcements & Notifications

| Feature | Description | Phase |
|---------|-------------|-------|
| **Broadcast alert** | Send push notification + in-app banner to ALL users instantly. For urgent things: payment gateway down, scheduled maintenance, security alerts. Simple text input + send. | MVP |
| **Send announcement** | Push notification to all investors or filtered group (by property, by location, etc.) | Phase 1 |
| **Schedule announcement** | Send at a specific date/time | Phase 2 |
| **Email blast** | Send email to all investors or filtered group | Phase 1 |
| **Notification templates** | Pre-written templates for common notifications (payout sent, new property, etc.) | Phase 1 |

---

## 5. PRODUCT WEBSITE (Next.js)

> Marketing website at propvest.ng. Explains the platform, attracts investors and developers.

---

| Page | Content | Phase |
|------|---------|-------|
| **Landing page** | Hero with CTA ("Start Investing" / "List Your Property"), how it works (3 steps), key stats, featured properties, testimonials, developer section, FAQ preview, footer | MVP |
| **For Investors** | How investing works, property types explained, returns explained, risk disclosure, "Download the App" CTA | MVP |
| **For Developers** | How partnership works, benefits, onboarding process, "Apply to List" CTA | MVP |
| **About** | Company story, team, mission, values | Phase 1 |
| **FAQ** | Expandable FAQ sections for investors and developers | MVP |
| **Contact** | Contact form, email, WhatsApp link, office address | MVP |
| **Blog** | SEO articles about real estate investment in Nigeria | Phase 2 |
| **Developer application** | Form: company name, CAC number, website/Instagram, properties built, why they want to partner | MVP |
| **Terms of Service** | Legal terms | MVP |
| **Privacy Policy** | NDPA-compliant privacy policy | MVP |
| **Investment Risks** | Clear risk disclosure document | MVP |

---

## 6. DATABASE SCHEMA (MongoDB)

---

### 6.1 Collections

**users**
```
{
  _id, email, phone, passwordHash,
  role: "investor" | "developer" | "admin",
  fullName, profileImage,
  kycTier: 1 | 2 | 3,
  kycStatus: "pending" | "verified" | "rejected",
  bankAccounts: [{ bankName, accountNumber, accountName, isPrimary }],
  adminRole: "ceo" | "coo" | "ops" | "finance" | "legal" | "devrel" | "support" | "compliance",  // only for admins
  isActive, isFrozen, isFlagged,
  referralCode, referredBy,
  pushToken,  // Expo push token
  notificationPreferences: { payouts, properties, engagement, recommendations },
  biometricEnabled,
  createdAt, updatedAt, lastLoginAt
}
```

**properties**
```
{
  _id, developerId (ref: users),
  name, slug, description, location: { state, city, area, coordinates },
  type: "rental" | "build_sell" | "land" | "other",
  phase: "funding" | "construction" | "vacant" | "renting" | "selling" | "sold" | "holding" | "completed",
  status: "draft" | "under_review" | "active" | "paused" | "fully_funded" | "completed",
  images: [url], documents: [{ name, url, type }],

  // Financials — ALL set by developer, no platform defaults enforced
  totalValue,               // Developer sets (e.g. 90,000,000 or 250,000,000)
  totalUnits,               // Developer sets (or auto-calc from totalValue / unitPrice)
  unitPrice,                // Developer sets — NO platform minimum
  unitsSold,
  developerRetainedUnits,

  // Fee structure — developer-defined per property
  platformFeePercent,       // Developer sets (e.g. 2, 3, 5 — whatever they agree to)
  managementFeePercent,     // Developer sets (e.g. 0, 5, 10 — their choice)
  splitRatio: { developer, platform },  // Developer sets (e.g. 97/3 or 95/5)

  // Rental specific (only if type === "rental")
  annualRent,               // Developer sets expected annual rent
  rentYield,                // Auto-calc or developer sets
  payoutFrequency,          // Developer chooses: "quarterly" | "monthly" | "biannually" | "custom"

  // Build & Sell specific (only if type === "build_sell")
  buildCost, estimatedSalePrice, estimatedProfit, timelineMonths,
  constructionProgress,     // 0-100
  expectedCompletionDate,
  housesTotal, housesSold,

  // Land specific (only if type === "land")
  totalAreaSqm, pricePerSqm,
  estimatedAppreciationRate, // Developer sets (e.g. 15 for 15% per annum)
  holdPeriodMonths,         // Developer sets

  // Other/Custom (only if type === "other")
  returnModelDescription,   // Free text: developer explains how investors earn
  estimatedReturn,          // Developer sets estimated return %
  estimatedTimeline,        // Developer sets timeline

  // Payment Routing (Paystack Split — configured per developer's terms)
  paystackSubaccountCode,
  developerBankName,
  developerBankAccountNumber,
  developerBankAccountName,
  dvaAccountNumber,         // Virtual account for this property
  dvaBank,                  // e.g. "Wema Bank"

  // Meta
  currentValuation,         // updated over time (requires admin approval to change)
  investorCount,
  firstRentDate,            // rental only: when first tenant started paying
  createdAt, updatedAt, approvedAt, approvedBy
}
```

**investments**
```
{
  _id, investorId (ref: users), propertyId (ref: properties),
  units, unitPrice, totalAmount,
  platformFee, amountAfterFee,
  transactionRef,  // Paystack reference
  status: "pending" | "confirmed" | "failed",
  createdAt
}
```

**transactions**
```
{
  _id,
  type: "investment" | "payout" | "p2p_buy" | "p2p_sell" | "fee",
  userId (ref: users),
  propertyId (ref: properties),
  amount, fee, netAmount,
  paystackRef, paystackStatus,
  status: "pending" | "success" | "failed",
  metadata: {},  // flexible extra data
  createdAt
}
```

**paymentRouting**
```
{
  _id, propertyId (ref: properties), developerId (ref: users),
  paystackSubaccountCode,    // Paystack sub-account code
  developerBankName,
  developerBankAccountNumber,
  developerBankAccountName,
  splitConfig: {
    developer,               // % to developer (developer-defined, e.g. 97)
    platform                 // % to PropVest (developer-defined, e.g. 3)
  },
  dvaAccountNumber,          // Virtual account for this property
  dvaBank,                   // e.g. "Wema Bank"
  status: "active" | "paused",
  totalCollected,            // running total of all payments received
  totalPlatformFee,          // running total of PropVest's share
  createdAt
}
```

**payouts**
```
{
  _id, propertyId (ref: properties),
  quarter,  // "2026-Q2"
  totalRentReceived,
  managementFee, platformShare,
  distributableAmount,
  investorPayouts: [{
    investorId, units, share, amount,
    paystackTransferRef, status: "pending" | "sent" | "failed",
    bankName, accountNumber
  }],
  status: "calculating" | "pending_approval" | "approved" | "processing" | "completed" | "partial",
  approvedBy, approvedAt,
  triggeredBy, triggeredAt,
  createdAt
}
```

**marketplaceListings**
```
{
  _id, sellerId (ref: users), propertyId (ref: properties),
  units, pricePerUnit,
  status: "active" | "sold" | "cancelled",
  buyerId (ref: users),  // filled on sale
  tradingFee,
  createdAt, soldAt, cancelledAt
}
```

**notifications**
```
{
  _id, userId (ref: users),
  type: "transactional" | "property_update" | "engagement" | "recommendation" | "system",
  title, body,
  data: { propertyId, payoutId, etc },  // for deep linking
  channels: { push: bool, email: bool, sms: bool },
  pushSent, emailSent, smsSent,
  read: false,
  createdAt
}
```

**follows**
```
{
  _id, investorId (ref: users), developerId (ref: users),
  createdAt
}
```

**propertyUpdates**
```
{
  _id, propertyId (ref: properties), developerId (ref: users),
  title, body, images: [url],
  type: "general" | "construction" | "milestone" | "valuation",
  createdAt
}
```

**kycRecords**
```
{
  _id, userId (ref: users),
  tier, method: "bank_account" | "bvn" | "nin",
  submittedData: { bankName, accountNumber, bvn, nin },
  apiResponse: {},  // raw API response
  matchResult: "match" | "mismatch" | "partial",
  status: "pending" | "approved" | "rejected",
  reviewedBy, reviewedAt, reviewNotes,
  createdAt
}
```

**referrals**
```
{
  _id, referrerId (ref: users), referredId (ref: users),
  referralCode,
  status: "signed_up" | "invested" | "bonus_paid",
  bonusAmount, bonusPaidAt,
  createdAt
}
```

**supportTickets**
```
{
  _id, userId (ref: users),
  subject, status: "open" | "in_progress" | "resolved" | "closed",
  assignedTo (ref: users),  // admin user
  messages: [{ senderId, body, createdAt }],
  priority: "low" | "medium" | "high",
  createdAt, resolvedAt
}
```

**auditLogs**
```
{
  _id, userId (ref: users),
  action,  // "approve_kyc", "trigger_payout", "freeze_account", etc.
  resource,  // "investor", "property", "payout", etc.
  resourceId,
  details: {},  // old value, new value
  ipAddress, userAgent,
  createdAt
}
```

**wishlists**
```
{
  _id, userId (ref: users), propertyId (ref: properties),
  createdAt
}
```

### 6.2 Indexes

| Collection | Index | Purpose |
|-----------|-------|---------|
| users | email (unique) | Login lookup |
| users | phone (unique) | OTP and search |
| users | referralCode (unique) | Referral system |
| properties | slug (unique) | URL routing |
| properties | developerId + status | Developer portal queries |
| properties | status + type | Browse/filter |
| investments | investorId + propertyId | Portfolio queries |
| investments | propertyId | Per-property investor list |
| transactions | userId | Transaction history |
| transactions | paystackRef (unique) | Webhook matching |
| payouts | propertyId + quarter | Payout lookup |
| marketplaceListings | propertyId + status | Browse marketplace |
| follows | investorId | "Following" list |
| follows | developerId | Follower count |
| notifications | userId + read | Notification center |
| auditLogs | userId + createdAt | Admin activity |
| auditLogs | resource + resourceId | Resource history |
| paymentRouting | propertyId (unique) | Property payment config |
| paymentRouting | paystackSubaccountCode (unique) | Webhook matching |

---

## 7. API ARCHITECTURE

---

### 7.1 Authentication Endpoints

```
POST   /api/auth/signup          Sign up with email, phone, password
POST   /api/auth/verify-otp      Verify phone OTP
POST   /api/auth/login           Login (returns JWT)
POST   /api/auth/refresh         Refresh JWT token
POST   /api/auth/forgot-password Send reset link
POST   /api/auth/reset-password  Reset password with token
POST   /api/auth/biometric       Biometric login (validate token)
```

### 7.2 KYC Endpoints

```
POST   /api/kyc/verify-bank      Tier 1: bank account resolve
POST   /api/kyc/verify-bvn       Tier 2: BVN verification
POST   /api/kyc/verify-nin       Tier 3: NIN + selfie
GET    /api/kyc/status            Current KYC status
```

### 7.3 Property Endpoints

```
GET    /api/properties                     List all (with filters, pagination)
GET    /api/properties/:id                 Property detail
GET    /api/properties/:id/investors       Investors in property (admin/developer)
GET    /api/properties/:id/updates         Developer updates
GET    /api/properties/:id/documents       Property documents
POST   /api/properties                     Create new property (developer)
PUT    /api/properties/:id                 Update property (developer/admin)
POST   /api/properties/:id/approve         Approve listing (admin)
POST   /api/properties/:id/reject          Reject listing (admin)
POST   /api/properties/:id/updates         Post update (developer)
PUT    /api/properties/:id/valuation       Update valuation (developer, needs admin approval)
```

### 7.4 Investment Endpoints

```
POST   /api/investments                    Create investment (initiate payment)
GET    /api/investments/my                 My investments (portfolio)
GET    /api/investments/:id                Investment detail
POST   /api/webhooks/paystack              Paystack webhook handler
```

### 7.5 Payout Endpoints

```
GET    /api/payouts                        List payouts (admin)
GET    /api/payouts/my                     My payout history (investor)
POST   /api/payouts/calculate/:propertyId  Calculate payout (admin)
POST   /api/payouts/:id/approve            Approve payout (admin)
POST   /api/payouts/:id/trigger            Trigger Paystack transfers (admin)
POST   /api/payouts/:id/retry/:investorId  Retry failed transfer (admin)
```

### 7.6 Marketplace Endpoints

```
GET    /api/marketplace                    Browse listings
POST   /api/marketplace                    Create listing (sell units)
PUT    /api/marketplace/:id                Update listing (change price)
DELETE /api/marketplace/:id                Cancel listing
POST   /api/marketplace/:id/buy            Buy listed units (initiate payment)
GET    /api/marketplace/my-listings        My active listings
GET    /api/marketplace/my-trades          My trade history
```

### 7.7 Developer Endpoints

```
GET    /api/developers/:id                 Developer profile (public)
GET    /api/developers/:id/properties      Developer's properties
POST   /api/developers/:id/follow          Follow developer
DELETE /api/developers/:id/follow          Unfollow developer
GET    /api/developers/following            My followed developers
```

### 7.8 Notification Endpoints

```
GET    /api/notifications                  My notifications
PUT    /api/notifications/:id/read         Mark as read
PUT    /api/notifications/read-all         Mark all as read
PUT    /api/notifications/preferences      Update notification preferences
POST   /api/notifications/register-push    Register push token
```

### 7.9 User Endpoints

```
GET    /api/users/me                       My profile
PUT    /api/users/me                       Update profile
POST   /api/users/bank-accounts            Add bank account
DELETE /api/users/bank-accounts/:id        Remove bank account
PUT    /api/users/bank-accounts/:id/primary Set primary bank account
GET    /api/users/referral                 My referral info
POST   /api/users/delete-account           Request account deletion
```

### 7.10 Admin Endpoints

```
GET    /api/admin/dashboard                Dashboard stats
GET    /api/admin/investors                List all investors
GET    /api/admin/investors/:id            Investor detail
POST   /api/admin/investors/:id/freeze     Freeze account
POST   /api/admin/investors/:id/unfreeze   Unfreeze account
GET    /api/admin/kyc-queue                Pending KYC reviews
POST   /api/admin/kyc/:id/approve          Approve KYC
POST   /api/admin/kyc/:id/reject           Reject KYC
GET    /api/admin/developers               List developer partners
POST   /api/admin/developers/invite        Invite new developer
GET    /api/admin/transactions              All transactions
GET    /api/admin/financial-reports          Revenue, expenses, per-property
GET    /api/admin/audit-log                 Audit log
GET    /api/admin/staff                     List staff
POST   /api/admin/staff                     Add staff member
PUT    /api/admin/staff/:id                 Update staff role
DELETE /api/admin/staff/:id                 Deactivate staff
GET    /api/admin/settings                  Platform settings
PUT    /api/admin/settings                  Update settings
POST   /api/admin/announcements             Send announcement
```

### 7.11 Webhook Endpoints

```
POST   /api/webhooks/paystack              Handle all Paystack events:
                                            - charge.success (DVA payment received + auto-split to developer)
                                            - subaccount.credit (developer sub-account credited)
                                            - transfer.success (payout sent to investor)
                                            - transfer.failed (payout failed)
                                            - transfer.reversed (payout reversed)
```

### 7.12 Middleware

| Middleware | Purpose |
|-----------|---------|
| `auth` | Verify JWT token, attach user to request |
| `requireRole(roles[])` | Check user role (investor, developer, admin) |
| `requireAdminRole(roles[])` | Check admin sub-role (ceo, coo, finance, etc.) |
| `requireKYC(tier)` | Check investor has minimum KYC tier |
| `rateLimit` | Rate limiting per IP/user |
| `auditLog` | Auto-log admin actions |
| `validatePaystackWebhook` | Verify Paystack webhook signature |

---

## 8. PHASE MAPPING

> What to build and when. Every feature tagged.

---

### Phase 0: MVP (Month 1-3) — Launch with one property

**Must have. Without these, you cannot launch.**

| Platform | Features |
|----------|----------|
| **Investor App** | Auth (signup, login, OTP), KYC Tier 1 (bank account), home dashboard, property browsing, property detail, investment flow (DVA payment), portfolio (holdings + activity), payouts (history + bank accounts), secondary market (list, buy, sell), profile (basic), notifications (transactional only) |
| **Developer Portal** | Auth, dashboard, property management, add property, rent/sale reporting, payout history, document management |
| **Admin Portal** | Dashboard, properties (list, approve/reject), investors (list, detail, freeze), KYC queue, payouts (calculate, approve, trigger, retry), P2P monitoring, developer management, staff management, system settings, audit log, broadcast alerts (push + in-app banner to all users) |
| **Website** | Landing page, for investors, for developers, FAQ, contact, developer application form, legal pages |
| **Backend** | All core API endpoints, Paystack DVA + Transfers integration, webhook handling, JWT auth, role middleware |
| **Database** | All core collections and indexes |

### Phase 1: Launch Features (Month 3-6) — Multiple properties, growing users

**Nice to have. Improves experience significantly.**

| Platform | Features |
|----------|----------|
| **Investor App** | KYC Tier 2 (BVN), developer profiles + follow system, property updates tab, wishlist, share property, investment calculator, dark mode, biometric login, notification preferences, payout breakdown, portfolio performance chart, app announcements |
| **Developer Portal** | 2FA, investor analytics (basic), follower growth, QR codes, property valuation updates, marketing toolkit (branded links) |
| **Admin Portal** | Property health flags, rent tracking + overdue alerts, communication log, financial reports (basic), KYC stats, notification templates, announcements + email blasts, staff activity log, feature flags, reconciliation |
| **Website** | About page |

### Phase 2: Growth Features (Month 6-18) — Engagement and intelligence

**Growth accelerators. Builds retention and engagement.**

| Platform | Features |
|----------|----------|
| **Investor App** | KYC Tier 3 (NIN + selfie via Dojah), AI-recommended properties, engagement notifications, weekly portfolio summary, milestone celebrations, referral system, document vault, in-app support chat, marketplace price alerts, offline mode |
| **Developer Portal** | Social media graphics generator, embed widget, share analytics, investor demographics, conversion analytics |
| **Admin Portal** | Compliance dashboard, transaction monitoring, AML risk scores, STR filing, tax reports, scheduled announcements, investor segmentation |
| **Website** | Blog |
| **AI/Smart** | Recommendation engine, smart notification timing, fraud detection, investor segmentation |

### Phase 3: Scale (Month 18+) — Automation and advanced features

| Platform | Features |
|----------|----------|
| **All** | Automated payout processing (remove manual approval for established properties), advanced analytics dashboards, API for third-party integrations, white-label options for large developer partners |
| **Investor App** | Investment goals/targets, auto-invest (recurring investment), property comparison tool |
| **Admin** | Automated compliance reporting, developer scoring system, predictive analytics |

---

## 9. THIRD-PARTY INTEGRATIONS

---

| Service | Provider | Purpose | Phase | Cost |
|---------|----------|---------|-------|------|
| Payment collection | Paystack DVA | Investor payments via bank transfer | MVP | 1% capped N300/tx |
| Payment split | Paystack Sub-accounts | Auto-split per developer-defined ratio (e.g. 97% to developer, 3% to PropVest) | MVP | Included in DVA fee |
| Payouts | Paystack Transfers | Send money to investor bank accounts | MVP | N10-50/tx |
| KYC Tier 1 | Paystack Resolve Account | Verify bank account name | MVP | Free |
| KYC Tier 2 | Paystack BVN Resolve | Verify BVN | Phase 1 | N10/call |
| KYC Tier 3 | Dojah | NIN + facial verification | Phase 2 | ~N80-150/call |
| Email | Resend | Transactional + marketing emails | MVP | Free tier: 3K/month |
| SMS / OTP | Termii | Phone verification, payout alerts | MVP | ~N4/SMS |
| Push notifications | Expo Push | Mobile push notifications | MVP | Free |
| Image storage | Cloudinary | Property photos, documents | MVP | Free tier: 25K transforms |
| Analytics | PostHog | User behavior tracking (for AI recs) | Phase 1 | Free self-hosted |
| Monitoring | Sentry | Error tracking and performance | MVP | Free tier |

---

## 10. AI / SMART FEATURES

---

### 10.1 Property Recommendation Engine (Phase 2)

**Data signals used:**
- Investment history (which property types, locations, developers, price ranges)
- Browsing behavior (properties viewed, time spent, search queries)
- Followed developers
- Wishlist items
- Demographic similarity (investors with similar profiles)

**Algorithm (simple to start):**
1. Content-based: recommend properties similar to ones you've invested in (same type, location, developer, price range)
2. Collaborative: "investors who bought X also bought Y"
3. Popularity: trending properties with high investment velocity
4. New from followed: always surface new listings from followed developers

**Implementation:** Start with simple rule-based matching (Phase 2). Move to ML model if needed (Phase 3+). PostHog event tracking provides the behavioral data.

### 10.2 Smart Notification Timing (Phase 2)

Track when each user typically opens the app → send engagement pushes during that window. Default: 9am-12pm for most Nigerian users.

### 10.3 Fraud Detection (Phase 2)

**Flags:**
- Same bank account on multiple investor accounts
- Rapid buy/sell cycles on marketplace (potential wash trading)
- Investment amount suddenly far above historical pattern
- Multiple failed payment attempts
- Account created and immediately invests maximum amount

**Action:** Auto-flag for compliance review. Don't auto-block — humans decide.

---

## APPENDIX: SCREEN COUNT SUMMARY

| Platform | Screens/Pages | Phase |
|----------|--------------|-------|
| **Investor App** | ~25 screens | MVP: 15, Phase 1: 7, Phase 2: 3 |
| **Developer Portal** | ~12 pages | MVP: 8, Phase 1: 3, Phase 2: 1 |
| **Admin Portal** | ~18 pages | MVP: 12, Phase 1: 4, Phase 2: 2 |
| **Product Website** | ~10 pages | MVP: 7, Phase 1: 1, Phase 2: 2 |
| **Total** | **~65 screens/pages** | |

---

## APPENDIX: MVP CHECKLIST (What to build FIRST)

> Build these and ONLY these before launching with the first property.

- [ ] Investor signup + OTP + login
- [ ] KYC Tier 1 (bank account verification)
- [ ] Property browsing (list + detail)
- [ ] Investment flow (select units → DVA payment → confirmation)
- [ ] Paystack webhook handler (auto-allocate units on payment)
- [ ] Portfolio (my holdings + activity)
- [ ] Payouts page (history + bank account management)
- [ ] Secondary market (list, browse, buy, sell)
- [ ] Basic notifications (transactional: payment confirmed, payout sent)
- [ ] Profile + settings (basic)
- [ ] Developer portal: login, dashboard, add property, manage property, report rent/sale
- [ ] Admin portal: dashboard, properties (approve/reject), investors (list, freeze), KYC queue, payouts (calculate, approve, trigger), P2P monitoring, developer management, staff RBAC, settings, audit log
- [ ] Product website: landing, for investors, for developers, FAQ, contact, legal pages
- [ ] Paystack DVA integration (collections)
- [ ] Paystack Transfers integration (payouts)
- [ ] Paystack Resolve Account integration (KYC)
- [ ] Expo Push Notifications (basic)
- [ ] Resend email integration (transactional)
- [ ] Termii SMS integration (OTP)

**Estimated screens for MVP: ~42 screens/pages across all platforms.**

---

*This PRD should be reviewed and updated as the product evolves. Version: 1.1 — May 2026*

**Changelog:**
- v1.1: Developer Autonomy Update — Developers have full control over unit price, fee structure, split ratio, return model, and payout frequency. No platform-imposed minimums or defaults. Added "Other" property type for custom return models. Added `phase` field to property lifecycle. Updated database schema, investment flow, admin portal, and system settings to reflect developer autonomy.
