# PropVest — Company Structure & Operations Guide

> Everything you need to know about building, running, and scaling PropVest as a Nigerian company. From registration to hiring to daily operations.

---

## PART 1: LEGAL FOUNDATION

> Do these BEFORE you launch. No shortcuts.

---

### 1.1 Company Registration (CAC)

Register a **Private Limited Liability Company (Ltd)** at the Corporate Affairs Commission. Not a business name — a proper limited company. This is non-negotiable because:

- You need to open corporate bank accounts
- You need to sign legal contracts with developers and investors
- Investors and developer partners won't take a business name seriously
- It limits your personal liability — if the company has issues, your personal assets are protected

**What you need:**
- Company name: PropVest Technologies Ltd (or similar — check availability on CAC portal)
- Minimum 2 directors (you + co-founder)
- Minimum 2 shareholders (same people is fine)
- Share capital: N1,000,000 minimum recommended
- Registered office address in Nigeria
- Memorandum and Articles of Association (MEMART)

**Cost:** N100,000 - N200,000 (through a lawyer or accredited CAC agent)
**Timeline:** 2-4 weeks

**What you get:**
- RC Number (Registration Certificate number)
- Certificate of Incorporation
- MEMART (company constitution)
- Share certificates
- Form CAC 1.1 (company details)

### 1.2 Tax Registration (FIRS)

After CAC registration, register with the Federal Inland Revenue Service.

**What you need:**
- Tax Identification Number (TIN) — register at nearest FIRS office or online
- VAT registration — mandatory if your turnover exceeds N25 million/year (you will hit this)

**Taxes you will pay:**
| Tax | Rate | When |
|-----|------|------|
| Company Income Tax (CIT) | 0% first 2 years (small company relief) then 20% | Annual filing |
| VAT | 7.5% on your platform fees | Monthly remittance |
| Withholding Tax (WHT) | 10% on rent (developer handles) | When applicable |
| PAYE | Progressive (7-24%) | Monthly for employees |
| Education Tax | 2% of assessable profit | Annual (when profit exceeds N1M) |

**Important:** Small companies (turnover under N25M) pay 0% CIT for the first 2 years. You likely qualify at launch.

**Cost:** Free to register. Compliance costs N50,000-100,000/year (accountant fees).

### 1.3 SCUML Registration

Special Control Unit against Money Laundering. **Mandatory** for any business dealing with financial transactions in Nigeria. This is under the EFCC/CBN framework.

**What you need:**
- Fill SCUML form at any designated bank
- Provide CAC documents
- Details of directors

**Cost:** Free
**Timeline:** 1-2 weeks

**Why it matters:** Without SCUML, banks may refuse to open accounts for you or freeze your accounts. Don't skip this.

### 1.4 SEC Nigeria Considerations

This is the big one. The Securities and Exchange Commission regulates collective investment schemes in Nigeria. Fractional property investment COULD fall under their jurisdiction.

**The honest situation:**
- There is no specific regulation for fractional real estate in Nigeria yet
- SEC regulates REITs (Real Estate Investment Trusts) but PropVest is not a REIT
- SEC regulates crowdfunding through the "Rules on Crowdfunding" (2021) — this is closest to what PropVest does
- The SEC crowdfunding rules cover "investment crowdfunding" and require registration

**What to do:**
1. Consult a securities lawyer BEFORE launch (budget N200,000-500,000 for this)
2. Consider registering as a Crowdfunding Portal with SEC
3. Alternatively, structure each property investment as a private placement (limited to qualified investors) to potentially avoid SEC registration initially
4. Monitor regulatory developments — Nigeria is actively developing proptech regulations

**Do NOT ignore this.** Many Nigerian fintechs launched without proper licensing and later faced shutdowns. Better to engage SEC early even if it costs money and time.

### 1.5 NDPA Compliance (Data Protection)

The Nigeria Data Protection Act (2023) replaced the old NDPR. Since you're collecting BVN, NIN, bank details, and personal information, you MUST comply.

**Requirements:**
- Appoint a Data Protection Officer (can be you initially)
- Create a Privacy Policy (publish on your app/website)
- Get explicit consent before collecting personal data
- Store data securely (encrypted, access-controlled)
- File an annual Data Protection Audit with NDPC (Nigeria Data Protection Commission)
- Notify NDPC within 72 hours of any data breach

**Cost:** First audit N100,000-300,000 through a licensed Data Protection Compliance Organization (DPCO)

### 1.6 Payment Routing Setup (Per Property)

Instead of creating a separate SPV company for each property (expensive, slow, N100K-200K each), PropVest uses **Paystack Sub-accounts with Split Payments** to route investor money directly to the developer.

**Per property listing you need:**
- Developer provides their verified bank account details
- PropVest creates a Paystack Sub-account for the developer (one-time, via API)
- Configure split ratio: 97% to developer, 3% to PropVest (platform fee)
- Generate a DVA (Dedicated Virtual Account) linked to this sub-account
- Sign a Developer Partnership Agreement (legal contract covering ownership rights, payout obligations, and investor protections)

**How it works:**
- Investor pays N100,000 → DVA for the property
- Paystack auto-splits: N97,000 → developer's bank account, N3,000 → PropVest account
- Developer sees the money in their own bank app immediately
- PropVest never holds developer's money — trust is built in

**Cost per property:** N0 (Paystack sub-account creation is free via API)
**Timeline:** Instant (API call)

**Legal protection without SPV:**
- Investment Agreement between investor and PropVest — defines unit ownership, return rights, and exit mechanisms
- Developer Partnership Agreement — developer's obligation to manage property, report rent, and honour investor payouts
- Property lien or charge registered at land registry (Phase 2) — gives investors legal claim on the asset

> **Note:** SPVs may be introduced in Phase 3 for very large properties (N500M+) or if SEC regulation requires it. For launch and growth, contractual agreements + Paystack split payments provide sufficient legal and financial structure.

---

## PART 2: COMPANY PHASES & ORG STRUCTURE

---

### Phase 0: Pre-Launch (Month 1-3)

> Just you. Building the MVP. No revenue. No team.

```
┌─────────────────────────┐
│   YOU                   │
│   CEO / CTO / Founder   │
│   (Everything)          │
└─────────────────────────┘
```

**What you do:**
- Build the MVP (mobile app + web dashboard)
- Integrate Paystack DVA + Transfers
- Build investor onboarding flow with KYC
- Build property listing system
- Build payout calculation engine
- Build P2P marketplace
- Set up company (CAC, TIN, SCUML)
- Start conversations with developer partners

**Costs:**
| Item | Cost |
|------|------|
| CAC Registration | N100,000 - N200,000 |
| Domain + Hosting | N20,000 - N50,000/year |
| Securities Lawyer Consultation | N200,000 - N500,000 |
| Your living expenses | Your savings |
| **Total** | **N320,000 - N750,000** |

**Revenue:** N0

**Milestone to move to Phase 1:** MVP is built and at least one developer partner has agreed to list a property.

---

### Phase 1: Launch (Month 3-6)

> You + co-founder. First property. First investors.

```
┌──────────────────────┐     ┌──────────────────────┐
│   YOU                │     │   CO-FOUNDER         │
│   CEO / CTO          │     │   COO                │
│                      │     │                      │
│ • Build & maintain   │     │ • Investor support   │
│   platform           │     │ • KYC review         │
│ • Developer partner  │     │ • Payout coordination│
│   pitching           │     │ • Developer follow-up│
│ • Product decisions  │     │ • Document handling  │
│ • Technical ops      │     │ • Dispute resolution │
└──────────────────────┘     └──────────────────────┘
         │                            │
         └───── Both on equity, no salary ─────┘
```

**External (paid per-job):**
- Lawyer: contracts and agreements (N50K-100K per developer partnership)
- Accountant: Quarterly reconciliation (N50K-100K per quarter)

**Costs:**
| Item | Cost/Month |
|------|-----------|
| Hosting + services | N15,000 - N30,000 |
| Paystack fees | Covered by platform fee revenue |
| Lawyer (per developer agreement) | N50,000 - N100,000 one-time |
| Accountant | N50,000 per quarter |
| Misc (transport, data, meetings) | N30,000 - N50,000 |
| **Monthly burn** | **~N50,000 - N100,000** |

**Revenue (from first property, e.g., N90M duplex):**
| Source | Amount |
|--------|--------|
| Platform fee (2% of N90M) | N1,800,000 |
| Management fee (10% of quarterly rent) | N105,000/quarter |
| **Year 1 total** | **~N2,200,000** |

**Milestone to move to Phase 2:** First property fully funded OR 2+ developer partners signed.

---

### Phase 2: First Revenue (Month 6-18)

> First hires. 2-5 properties. 1,000-3,000 investors.

```
┌──────────────────────┐
│        YOU            │
│     CEO / CTO         │
├──────────┬────────────┤
│          │            │
│    CO-FOUNDER    Operations
│      COO         Associate
│                  (1st hire)
│                       │
│    Lawyer ←── External (retainer)
│    Accountant ←── External (retainer)
```

**New hire: Operations Associate**
- Handles daily investor support
- Processes KYC verifications
- Monitors transactions
- Coordinates payouts
- Salary: N150,000 - N250,000/month

**Costs:**
| Item | Cost/Month |
|------|-----------|
| Operations Associate salary | N150,000 - N250,000 |
| Hosting + services | N30,000 - N50,000 |
| Lawyer retainer | N50,000 - N100,000 |
| Accountant retainer | N50,000 - N100,000 |
| Office / co-working (optional) | N50,000 - N100,000 |
| Misc | N50,000 |
| **Monthly burn** | **N380,000 - N650,000** |

**Revenue (5 properties averaging N60M each):**
| Source | Amount |
|--------|--------|
| Platform fees (2% of N300M) | N6,000,000 |
| Management fees (10% of annual rent) | N1,500,000/year |
| P2P trading fees | N200,000 - N500,000/year |
| **Year total** | **~N8,000,000** |

**Hiring trigger for Phase 3:** Monthly revenue consistently above N1,000,000 for 3+ months.

---

### Phase 3: Growth (Month 18-36)

> Departments forming. 5-20 properties. 3,000-10,000 investors.

```
                    ┌────────────────┐
                    │      YOU       │
                    │   CEO / CTO    │
                    └───────┬────────┘
                            │
          ┌─────────────────┼──────────────────┐
          │                 │                  │
  ┌───────┴──────┐  ┌──────┴───────┐  ┌───────┴──────┐
  │  CO-FOUNDER  │  │   Dev Lead   │  │   Finance    │
  │     COO      │  │  (2nd dev)   │  │   Officer    │
  └──────┬───────┘  └──────────────┘  └──────────────┘
         │
   ┌─────┼──────────┐
   │     │          │
  Ops   Support   DevRel
  Assoc  Agent    Manager
```

**New hires:**
| Role | Salary/Month | Why |
|------|-------------|-----|
| Software Developer | N300,000 - N500,000 | You can't build + run the business alone |
| Finance Officer | N200,000 - N350,000 | Multiple properties, tax filings, reconciliation |
| Customer Support Agent | N100,000 - N180,000 | 3,000+ investors = too many queries |
| Developer Relations Manager | N200,000 - N350,000 | Managing 10+ developer partners |

**Monthly burn:** N1,500,000 - N2,500,000
**Monthly revenue target:** N3,000,000 - N5,000,000

---

### Phase 4: Scale (Month 36+)

> Full company. 20-80+ properties. 10,000+ investors.

```
                        ┌─────────────┐
                        │  Board of   │
                        │  Directors  │
                        └──────┬──────┘
                               │
                        ┌──────┴──────┐
                        │     CEO     │
                        │    (You)    │
                        └──────┬──────┘
                               │
        ┌──────────┬───────────┼───────────┬──────────┐
        │          │           │           │          │
   ┌────┴────┐ ┌───┴───┐ ┌────┴────┐ ┌────┴───┐ ┌───┴────┐
   │   COO   │ │  CTO  │ │   CFO   │ │ Legal  │ │ Growth │
   │(Co-fdr) │ │(hired)│ │ (hired) │ │Counsel │ │  Lead  │
   └────┬────┘ └───┬───┘ └────┬────┘ └────┬───┘ └───┬────┘
        │          │          │           │         │
   Operations  Engineering  Finance    Compliance  Marketing
   - Ops Mgr   - 2-3 devs  - Acctnt   - Comp.    - Content
   - Support   - QA         - Audit     Officer   - Social
     (2-3)     - DevOps                           - Partnerships
   - DevRel
```

**Total team:** 15-25 people
**Monthly burn:** N5,000,000 - N12,000,000
**Monthly revenue:** N15,000,000 - N30,000,000+

---

## PART 3: ROLES & RESPONSIBILITIES (DETAILED)

---

### 3.1 CEO / Technical Co-Founder (You)

**Title:** Chief Executive Officer / Co-Founder
**Reports to:** Board of Directors
**Phase:** From Day 0

**Responsibilities:**
- Set company vision, strategy, and direction
- Build and maintain the platform (Phase 0-2), then oversee tech team
- Pitch to and sign developer partners
- Pitch to investors (if raising external funding)
- Make final product decisions (features, roadmap, UX)
- Manage Paystack integration, API architecture, database
- Approve quarterly payouts before they're triggered
- Represent the company publicly
- Manage company finances (Phase 0-1), then oversee CFO
- Set hiring priorities and make final hiring decisions
- Approve new property listings on the platform

**Skills:** Full-stack development, business development, leadership, financial literacy

**Compensation:**
- Phase 0-1: N0 salary (equity only)
- Phase 2: N200,000 - N400,000/month (when revenue allows)
- Phase 3+: N500,000 - N1,000,000/month
- Equity: 60% (vesting over 4 years)

---

### 3.2 COO / Operations Co-Founder

**Title:** Chief Operating Officer / Co-Founder
**Reports to:** CEO
**Phase:** From Phase 1 (Launch)

**Responsibilities:**
- Run day-to-day operations of the company
- Investor support — answer questions, resolve issues (WhatsApp, email, calls)
- Review and approve KYC verifications (flagged accounts)
- Coordinate with developer partners: chase rent payments, collect documents, maintain relationships
- Coordinate with lawyer on contracts and agreements
- Payout coordination — verify rent received, confirm calculations, authorize disbursement
- Manage operations team as it grows
- Create and maintain operations processes and SOPs (Standard Operating Procedures)
- Handle disputes between investors, or between investors and developers
- Monitor platform transactions for unusual activity
- Manage relationships with external partners (Paystack, lawyer, accountant)
- Oversee customer support team (Phase 3+)

**Skills:** Organization, communication, patience, attention to detail, basic finance, people management

**Compensation:**
- Phase 1: N0 salary (equity only)
- Phase 2: N150,000 - N300,000/month (when revenue allows)
- Phase 3+: N400,000 - N800,000/month
- Equity: 40% (vesting over 4 years with 6-month cliff)

---

### 3.3 Operations Associate

**Title:** Operations Associate
**Reports to:** COO
**Phase:** First hire — Phase 2

**Responsibilities:**
- Handle Tier 1 investor support (common questions, how-to, status updates)
- Process daily KYC verifications — review bank account matches
- Monitor incoming investments — verify payments matched to correct units
- Update investor records and property records
- Prepare quarterly payout data for COO review
- Follow up with developer partners on rent collection dates
- Maintain FAQ document and support templates
- Flag unusual transactions or issues to COO
- Manage investor WhatsApp groups/communities

**Skills:** Customer service, basic computer skills, organized, patient, good communicator

**Salary:** N150,000 - N250,000/month
**When to hire:** When you have 500+ investors or 2+ properties and investor queries take more than 3 hours/day

---

### 3.4 Finance & Accounts Officer

**Title:** Finance & Accounts Officer
**Reports to:** CEO (Phase 2-3), then CFO (Phase 4)
**Phase:** Phase 3

**Responsibilities:**
- Maintain books for PropVest Ltd and all property accounts
- Monthly reconciliation of all Paystack sub-accounts and platform revenue
- Calculate quarterly payouts and prepare payout reports
- Prepare monthly financial statements (P&L, balance sheet, cash flow)
- Handle tax filings — CIT, VAT, WHT returns
- Process payroll for employees
- Track revenue by property, by month
- Prepare financial reports for CEO and Board
- Coordinate with external auditors (annual audit)
- Monitor Paystack settlements and reconcile with bank records
- Budget tracking and expense management

**Skills:** Accounting (OND/HND/BSc in Accounting minimum), knowledge of Nigerian tax law, Excel proficiency, experience with accounting software

**Salary:** N200,000 - N350,000/month
**When to hire:** When you have 5+ properties or managing more than N500M in assets

---

### 3.5 Legal Officer / Company Secretary

**Title:** Legal Officer & Company Secretary
**Reports to:** CEO
**Phase:** Phase 3-4 (use external lawyer before this)

**Responsibilities:**
- Oversee legal documentation for new property listings
- Draft and review all legal agreements (investor terms, developer partnerships, employment contracts)
- Ensure regulatory compliance — SEC, SCUML, NDPA
- Act as Company Secretary — maintain statutory records, file annual returns at CAC
- Handle legal disputes, demand letters, and litigation coordination
- Review property documents (C of O, Governor's Consent) before listing
- Advise CEO on legal risks and regulatory changes
- Coordinate with external law firm on complex matters
- Maintain contract register — track all agreements, expiry dates, renewal dates

**Skills:** Law degree (BL), 3+ years experience, knowledge of Nigerian corporate/property/securities law

**Salary:** N300,000 - N500,000/month
**When to hire:** When legal costs exceed N200,000/month consistently, or when you have 10+ active properties

---

### 3.6 Developer Relations Manager

**Title:** Developer Relations Manager
**Reports to:** COO
**Phase:** Phase 3

**Responsibilities:**
- Manage relationships with all developer partners (Dan Mama, Saleem Goje, etc.)
- Onboard new developer partners — walk them through the process, set up their branded pages
- Monthly check-ins with each developer partner
- Collect property documentation for new listings
- Track rent collection dates and follow up with developers
- Report developer partner feedback to product team (you)
- Coordinate property inspections and valuations
- Resolve issues between developers and the platform
- Identify and pitch new developer partners
- Maintain developer partner database (properties, contacts, history)

**Skills:** Relationship management, real estate knowledge, professional communication, organization

**Salary:** N200,000 - N350,000/month
**When to hire:** When you have 5+ developer partners and relationship management takes more than 2 hours/day

---

### 3.7 Customer Support Agent

**Title:** Customer Support Agent
**Reports to:** COO → Operations Associate
**Phase:** Phase 3

**Responsibilities:**
- Answer investor questions via in-app chat, WhatsApp, email
- Guide new investors through signup and KYC process
- Resolve common issues (payment not reflecting, payout questions, unit transfer help)
- Escalate complex issues to Operations Associate or COO
- Maintain and update FAQs and help documentation
- Track common complaints and report patterns to product team
- Follow up with investors who started KYC but didn't complete

**Skills:** Excellent written communication, patience, empathy, basic tech literacy

**Salary:** N100,000 - N180,000/month
**When to hire:** When support queries exceed 50/day

---

### 3.8 Software Developer (2nd)

**Title:** Software Developer
**Reports to:** CEO (you)
**Phase:** Phase 3

**Responsibilities:**
- Build new features based on product roadmap
- Fix bugs and handle technical issues
- Maintain and optimize backend (APIs, database, payout engine)
- Implement security updates and patches
- Build admin tools and reporting dashboards
- Handle Paystack integration updates
- Write tests and maintain code quality
- On-call for technical emergencies

**Skills:** React Native, Next.js, Node.js, PostgreSQL/MongoDB, REST APIs, Paystack API experience is a bonus

**Salary:** N300,000 - N500,000/month
**When to hire:** When you're spending more time on maintenance/bugs than on business growth, or when feature requests are piling up

---

### 3.9 Marketing & Content Lead

**Title:** Marketing & Content Lead
**Reports to:** CEO
**Phase:** Phase 3-4

**Responsibilities:**
- Create content for PropVest social media (Instagram, Twitter, LinkedIn)
- NOT marketing properties — developers do that. Marketing the PLATFORM to new developers and educating potential investors
- Write blog posts, guides, and educational content about real estate investment
- Manage PropVest's own social media accounts
- Create marketing materials for developer partners (templates, guidelines)
- Run campaigns to attract new developer partners
- PR and media relationships
- Track and report marketing metrics

**Skills:** Content creation, social media management, copywriting, basic graphic design (Canva)

**Salary:** N150,000 - N300,000/month
**When to hire:** Phase 3-4, after product-market fit is proven. Not a priority at launch.

---

### 3.10 Compliance Officer

**Title:** Compliance Officer
**Reports to:** CEO → Legal Officer
**Phase:** Phase 4

**Responsibilities:**
- Monitor all transactions for suspicious activity (AML/CFT compliance)
- File Suspicious Transaction Reports (STRs) with NFIU when required
- Conduct periodic KYC reviews and update investor records
- Ensure ongoing compliance with SEC, NDPA, SCUML regulations
- Conduct internal audits of processes and controls
- Train staff on compliance procedures
- Maintain compliance documentation and records
- Coordinate with regulators during examinations

**Skills:** Compliance/AML certification, knowledge of Nigerian financial regulations, audit experience

**Salary:** N300,000 - N500,000/month
**When to hire:** Phase 4, or when regulatory bodies require you to have one

---

## PART 4: CO-FOUNDER AGREEMENT

> Put this in writing BEFORE you start working together. Non-negotiable.

---

### 4.1 Recommended Equity Split

| Person | Equity | Why |
|--------|--------|-----|
| You (CEO/CTO) | 60% | Brought the idea, building the entire platform, leading business development |
| Co-founder (COO) | 40% | Running operations, equal commitment going forward |

### 4.2 Vesting Schedule

Both founders' equity should vest over **4 years with a 6-month cliff.**

What this means:
- **Month 0-6:** Neither founder has "earned" any equity yet
- **Month 6 (cliff):** Each founder earns 12.5% of their allocation at once
- **Month 7-48:** The remaining equity vests monthly (about 2.1% of allocation per month)

Example for co-founder (40% total):
| Time | Equity Earned | Total Vested |
|------|--------------|--------------|
| Month 0-5 | 0% | 0% |
| Month 6 (cliff) | 5% | 5% |
| Month 12 | 5% | 10% |
| Month 24 | 10% | 20% |
| Month 36 | 10% | 30% |
| Month 48 | 10% | 40% |

**Why vesting matters:** If your co-founder leaves after 3 months, they walk away with 0% (cliff not reached). Without vesting, they'd walk away with 40% of the company for 3 months of work.

### 4.3 Key Terms to Include

**Decision-making authority:**
- Product/technology decisions: CEO has final say
- Operations decisions: COO has final say
- Financial decisions above N500,000: Both must agree
- Hiring/firing: Both must agree
- New property listings: Both must agree
- Equity changes, fundraising, selling the company: Both must agree (these are "reserved matters")

**What happens if one founder leaves:**
- Before cliff (6 months): Departing founder forfeits all unvested equity
- After cliff: Departing founder keeps vested equity, forfeits unvested
- Company has the right to buy back vested shares at fair market value
- 90-day non-compete after departure

**Intellectual property:**
- All code, designs, brand assets, and business processes created for PropVest belong to PropVest Ltd, not to any individual founder
- This is critical — if you split up, the company keeps the platform you built

**Salary:**
- No salary in Phase 0-1 (both working for equity)
- When revenue allows, both founders can draw salary — agreed upon by both
- Salary caps until the company is profitable (e.g., max N300,000/month each until profitability)

**Deadlock resolution:**
- If you disagree and can't resolve it, CEO has the deciding vote on operational matters (since 60% equity holder)
- For reserved matters (fundraising, selling company), deadlock goes to a mutually agreed advisor or mediator

### 4.4 Documents to Sign

Get a lawyer to draft these (budget N100,000 - N200,000):

1. **Co-Founder Agreement** — covers everything above
2. **Share Subscription Agreement** — formalizes equity ownership
3. **IP Assignment Agreement** — any prior work on PropVest (your code, designs, scripts) gets formally assigned to the company
4. **Vesting Agreement** — details the vesting schedule and cliff

---

## PART 5: FINANCIAL MANAGEMENT

---

### 5.1 Bank Accounts You Need

| Account | Purpose | When |
|---------|---------|------|
| PropVest Ltd current account | Company operating expenses, salaries, platform revenue | Day 1 |
| PropVest Ltd savings/investment account | Reserve fund, emergency fund | When revenue allows |
| Paystack settlement account | Where Paystack settles your 3% platform fee (auto-split from every investment) | Linked to PropVest Ltd account |
| PropVest payout float account | Fund this account to run Paystack Transfers for investor payouts | When first payout is due |

**Important:** PropVest never holds investor or developer money. Paystack Split Payments automatically routes 97% to the developer's own bank account and 3% to PropVest's account. Investor money goes straight to the developer. For payouts, the developer sends the distributable rent amount to PropVest's payout account, and PropVest distributes to investors via Paystack Transfers.

**Developer's own bank account** — each developer partner uses their own existing business bank account. PropVest creates a Paystack Sub-account linked to it. No new accounts needed.

### 5.2 Basic Bookkeeping

Even before you hire an accountant, track these:

**Income tracking (per month):**
- Platform fees collected (per property)
- Management fees collected (per property, per quarter)
- P2P trading fees collected
- Total revenue

**Expense tracking (per month):**
- Paystack fees (collections + transfers)
- Hosting and infrastructure
- Legal fees
- Salaries (when applicable)
- KYC verification costs
- Transport, data, misc
- Total expenses

**Per property tracking:**
- Total raised
- Units sold / unsold
- Rent received (date and amount)
- Payouts distributed (date and amount)
- Paystack sub-account balance / total collected
- Platform fee collected
- Management fee collected

Use a simple spreadsheet initially. Move to accounting software (Wave, Zoho Books, or QuickBooks) when you have 3+ properties.

### 5.3 Tax Calendar

| Month | Obligation |
|-------|-----------|
| 21st of every month | VAT return and payment for previous month |
| 10th of every month | PAYE remittance for employees |
| Within 6 months of year-end | Company Income Tax filing |
| Within 18 months of incorporation | First annual return at CAC |
| Every 12 months after | Annual return at CAC (N5,000 - N20,000) |
| Quarterly | WHT remittance (if applicable) |

### 5.4 Revenue Distribution Flow

When money comes in, this is exactly how it should flow:

```
INVESTMENT FLOW (Paystack Split Payment):

Investor pays N100,000 for 1 unit
│
├── Paystack takes N300 (DVA fee, deducted from total)
│
├── Paystack auto-splits the remaining N99,700:
│   │
│   ├── 97% → N96,709 → Developer's own bank account (instant)
│   │   └── Developer sees this in their bank app
│   │
│   └── 3% → N2,991 → PropVest's Paystack settlement account
│       └── This is YOUR revenue (platform fee)
│
└── PropVest backend records: Investor X owns 1 unit in Property Y
    └── No money sits with PropVest. Trust is automatic.


PAYOUT FLOW (Quarterly Rent Distribution):

Developer collects rent from tenant: N4,200,000/year → N1,050,000/quarter
│
├── Developer reports rent on PropVest Developer Portal
│   └── Uploads proof (bank statement, receipt)
│
├── Platform calculates each investor's share
│   └── 900 investors × their units × share per unit
│
├── Management fee (10%): N105,000 → kept by PropVest
│   └── This is YOUR revenue
│
├── Distributable: N945,000
│
├── Developer transfers N945,000 to PropVest's payout float account
│   └── Developer only sends the investor portion, not PropVest's fee
│
├── PropVest triggers Paystack Bulk Transfer: 900 payments
│   └── Paystack transfer fees: ~N45,000 (N50/tx × 900, from PropVest)
│
└── Investors receive rent in their bank accounts
    └── Each investor gets: (their units / total units) × N945,000
```

---

## PART 6: GOVERNANCE & DECISION-MAKING

---

### 6.1 Board of Directors

**At launch (Phase 0-2):**
- Just you and co-founder. You ARE the board.
- Minimum 2 directors required by CAC for a Ltd company.

**Phase 3+:**
- Add 1-2 independent advisors to the board
- They attend quarterly board meetings
- Provide guidance on strategy, legal, finance
- Don't need to be paid much — N50,000 per meeting or advisory shares (0.5-1%)

**If you raise investment:**
- Investor may want a board seat — this is normal
- Keep the board small: 3-5 people maximum
- You should always maintain board majority or at minimum equal representation

### 6.2 Meeting Cadence

| Meeting | Who | Frequency | Purpose |
|---------|-----|-----------|---------|
| Daily standup | You + co-founder | Daily (15 min) | What are you working on today? Any blockers? |
| Weekly review | You + co-founder + team | Weekly (1 hour) | Review metrics, investor queries, property updates, issues |
| Monthly financials | You + co-founder + accountant | Monthly (1 hour) | Revenue, expenses, bank balances, tax obligations |
| Quarterly board | All directors + advisors | Quarterly (2 hours) | Strategy, performance review, major decisions |
| Quarterly payout review | You + co-founder + accountant | Before each payout | Verify calculations, approve disbursement |

### 6.3 Decision-Making Framework

| Decision Type | Who Decides | Examples |
|--------------|------------|---------|
| Day-to-day operations | COO | Investor support issues, scheduling, minor disputes |
| Technical / product | CEO | Features, bug priorities, architecture, integrations |
| New property listing | Both agree | Due diligence must pass, both sign off |
| Hiring | Both agree | Both interview, both approve |
| Spending under N100K | Either founder | Office supplies, software subscriptions, transport |
| Spending N100K - N500K | Both agree | New hire, legal engagement, marketing campaign |
| Spending above N500K | Board approval | Major investment, office lease, equipment |
| Fundraising | Board approval | Any equity sale, loan, or investment round |
| Partnerships | CEO leads, COO approves | Developer partnerships, API partnerships |

---

## PART 7: OPERATIONS MANUAL

---

### 7.1 Investor Onboarding Flow

```
Step 1: Investor downloads app / visits website
Step 2: Signs up with email + phone number
Step 3: OTP sent to phone → verified
Step 4: Investor enters full name + bank account + bank name
Step 5: Backend calls Paystack Resolve Account → matches name
Step 6: If match → Tier 1 verified (can invest up to N500,000)
Step 7: Investor browses properties
Step 8: Investor selects property → selects number of units
Step 9: App shows Paystack DVA account number → investor transfers
Step 10: Webhook received → units allocated → investor notified
Step 11: Investor sees units in portfolio
```

**What operations team does:**
- Monitor daily signups (dashboard)
- Review any KYC flags (name mismatch, suspicious accounts)
- Follow up with investors who started but didn't complete KYC
- Answer questions from new investors

### 7.2 Property Listing Process

```
Step 1: Developer partner approaches PropVest (or you approach them)
Step 2: You meet → discuss which property to list
Step 3: Developer provides:
   - Property documents (C of O, Governor's Consent, building plans)
   - Property photos and description
   - Property valuation (independent or agreed upon)
   - Rental income history (if rental) or projected sale price (if build & sell)
   - Developer's ID and company documents
Step 4: Legal review → lawyer verifies property documents
Step 5: CEO and COO approve the listing → both sign off
Step 6: Developer provides their bank account details
Step 7: PropVest creates Paystack Sub-account for this property (API call, instant)
Step 8: Paystack DVA generated for the property (investors will pay to this account)
Step 9: Developer signs Partnership Agreement (legal contract)
Step 10: Developer branded page built on platform
Step 11: Unit price and total units calculated
Step 12: Property goes live on the platform
Step 13: Developer posts the link on their Instagram/social media
Step 14: Monitor unit sales daily — developer sees money arriving in their own bank account
```

**Timeline:** Steps 3-10 should take 2-4 weeks.

**Checklist for approval:**
- [ ] C of O or Governor's Consent verified
- [ ] Property physically inspected
- [ ] Valuation confirmed (within 10% of market)
- [ ] Developer background check passed (no fraud history, established reputation)
- [ ] Paystack Sub-account created (linked to developer's bank)
- [ ] DVA generated for the property
- [ ] Legal agreements signed (Developer Partnership Agreement, Investment Terms)
- [ ] Property listed on platform and tested
- [ ] Both founders approve

### 7.3 Quarterly Payout Process (Rental Properties)

```
Week 1 of quarter:
Step 1: COO checks if developer has collected rent from tenant
Step 2: If not received → COO contacts developer partner → chase the rent
Step 3: Developer reports rent on Developer Portal and uploads proof

Week 2:
Step 4: System calculates each investor's share automatically
Step 5: Finance officer (or COO in early phase) reviews the calculation
Step 6: Reconciliation: total payouts + management fee = total rent received
Step 7: CEO reviews and approves the payout batch

Week 2-3:
Step 8: Developer transfers distributable amount (rent minus management fee) to PropVest's payout float account
Step 9: PropVest triggers Paystack Bulk Transfer API
Step 10: Monitor transfer status — check for failures
Step 11: Retry any failed transfers (wrong account number, etc.)
Step 12: Send notification to all investors: "Your quarterly payout has been sent"

Week 3-4:
Step 13: Reconcile: PropVest payout account balance should be zero after distribution
Step 14: Archive payout report
Step 15: Management fee already in PropVest Ltd account (deducted before developer transfer)
```

### 7.4 P2P Trade Process

```
Step 1: Seller lists units on marketplace (sets price per unit)
Step 2: Buyer browses marketplace, finds listing
Step 3: Buyer taps "Buy" → system creates pending order
Step 4: Buyer receives Paystack DVA payment details → transfers
Step 5: Webhook confirms payment → system processes:
   - Deducts trading fee (1-2%)
   - Initiates Paystack Transfer to seller's bank account
   - Transfers unit ownership from seller to buyer
Step 6: Both buyer and seller receive confirmation notifications
Step 7: Seller receives funds in bank account
```

**What operations team monitors:**
- Failed payments or transfers
- Disputes (buyer says they paid but units not received)
- Suspicious trading patterns (same person buying and selling repeatedly)

### 7.5 Dispute Resolution Process

```
Level 1: Customer support handles (minor issues)
   - Payment not reflecting → check Paystack dashboard → resolve
   - Wrong unit count → verify and correct
   - App not working → escalate to tech (CEO)

Level 2: COO handles (moderate issues)
   - Investor wants refund but units already allocated
   - Developer hasn't paid rent on time
   - Name mismatch during KYC
   - P2P trade dispute

Level 3: CEO + COO handle together (serious issues)
   - Fraud allegation
   - Developer default (can't pay rent, project failed)
   - Legal threat from investor
   - Regulatory inquiry

Level 4: External lawyer handles
   - Actual legal disputes
   - Court proceedings
   - Regulatory enforcement actions
```

### 7.6 Developer Partner Onboarding

```
Step 1: Initial meeting → explain PropVest, show pitch deck
Step 2: Developer interested → sign Letter of Intent (non-binding)
Step 3: Due diligence period (1-2 weeks):
   - Verify developer's CAC registration
   - Check developer's track record (completed projects, reputation)
   - Verify property documents
   - Property inspection
Step 4: Negotiate terms (which property, how many units, developer's retained stake)
Step 5: Legal agreements signed:
   - Developer Partnership Agreement
   - Property Management Agreement (for rental properties)
Step 6: Create Paystack Sub-account linked to developer's bank account (instant via API)
Step 7: Build developer's branded page on platform
Step 8: Training session — show developer how to use their dashboard
Step 9: Go live — developer posts on social media
Step 10: Weekly check-ins for the first month
Step 11: Monthly check-ins thereafter
```

---

## PART 8: LEGAL & COMPLIANCE CHECKLIST

---

### 8.1 Registrations Needed

| Registration | Body | Cost | When |
|-------------|------|------|------|
| Company incorporation | CAC | N100,000 - N200,000 | Before anything else |
| Tax Identification (TIN) | FIRS | Free | Immediately after CAC |
| VAT registration | FIRS | Free | When turnover approaches N25M |
| SCUML certificate | CBN/EFCC | Free | Before opening bank accounts |
| SEC registration (if required) | SEC | Varies | After legal consultation |
| NDPA registration | NDPC | Varies | Before collecting personal data |
| Per-property SPV (Phase 3, if needed) | CAC | N100,000 - N200,000 each | Only for large properties or regulatory requirement |

### 8.2 Contracts/Agreements Needed

| Document | Between | Purpose |
|----------|---------|---------|
| Co-Founder Agreement | You + Co-founder | Equity, roles, vesting, exit terms |
| Terms of Service | PropVest + Investors | Legal terms for using the platform |
| Privacy Policy | PropVest + Users | How you handle personal data (NDPA requirement) |
| Investment Terms | PropVest + Investors | Risk disclosures, returns are not guaranteed, unit ownership terms |
| Developer Partnership Agreement | PropVest + Developer | Terms of listing properties, responsibilities, revenue sharing |
| Investment Certificate Agreement | PropVest + Investors (per property) | Unit ownership rights, return entitlement, exit mechanisms |
| Property Management Agreement | PropVest + Developer | Developer's obligation to manage property, collect rent, maintain, and transfer payout funds |
| Employment Contract | PropVest + Employees | Terms of employment, NDA, non-compete |
| NDA (Non-Disclosure Agreement) | PropVest + Anyone you share sensitive info with | Protect business secrets |

### 8.3 Ongoing Compliance

| Obligation | Frequency | Responsible |
|-----------|-----------|-------------|
| CAC Annual Return | Yearly | Legal Officer / Company Secretary |
| VAT filing and payment | Monthly (21st) | Finance Officer |
| CIT filing | Annually | Finance Officer + Auditor |
| PAYE remittance | Monthly (10th) | Finance Officer |
| NDPA data audit | Annually | Data Protection Officer |
| Per-property financial reports | Quarterly + Annual | Finance Officer |
| AML transaction monitoring | Ongoing | Compliance Officer / COO |
| Property insurance renewal | Annually | COO |
| Investor communication | Quarterly (minimum) | COO |

---

## PART 9: RISK MANAGEMENT

---

### 9.1 Key Risks and Mitigation

| Risk | Severity | Likelihood | Mitigation |
|------|----------|-----------|------------|
| Developer partner defaults (can't pay rent, project abandoned) | High | Medium | Due diligence before listing. Developer retains stake (skin in the game). Legal agreements with penalties. Diversify across multiple developers. |
| Regulatory shutdown (SEC or CBN orders you to stop) | High | Low-Medium | Engage SEC early. Get legal opinion. Structure properly. Maintain good records. |
| Cybersecurity breach (investor data stolen) | High | Low | Encrypt all data. Use HTTPS. Secure API keys. Regular security audits. Two-factor auth. |
| Paystack service disruption | Medium | Low | Have backup payment processor identified. Keep manual payout process documented. |
| Co-founder dispute | High | Medium | Written co-founder agreement. Vesting schedule. Clear decision-making framework. |
| Property value drops | Medium | Low | Disclose investment risks clearly. Diversify across property types and locations. |
| Tenant default (rent not paid) | Medium | Medium | This is the developer's problem to manage. Disclose risk to investors. Build 1-month rent reserve per property. |
| Slow investor adoption | Medium | Medium | Start with developers who have large, engaged followings. One successful property builds trust. |
| Fraud (fake investors or fake developers) | High | Low | BVN/NIN verification. Developer due diligence. Transaction monitoring. |

### 9.2 Insurance

| Insurance Type | What it Covers | When to Get |
|---------------|----------------|-------------|
| Professional Indemnity Insurance | Claims against PropVest for errors in service | Phase 2 (when managing significant investor funds) |
| Directors & Officers Insurance | Personal liability of directors for company decisions | Phase 3 |
| Cyber Insurance | Data breach costs, ransomware, business interruption | Phase 3 |
| Property Insurance (per property) | Fire, flood, structural damage to listed properties | Per property — developer should already have this |

### 9.3 Emergency Procedures

**If Paystack goes down:**
1. Notify investors via app/SMS that payouts are delayed
2. Contact Paystack support immediately
3. If prolonged (24+ hours), prepare manual bank transfers as backup
4. Resume automated payouts when Paystack is back

**If your server goes down:**
1. Hosting provider handles most outages automatically
2. If prolonged, switch to backup/standby server
3. Database backups should be restorable within 1 hour
4. Communicate to investors via SMS/WhatsApp (since app is down)

**If a developer partner is accused of fraud:**
1. Immediately freeze the property listing (no new investments)
2. Investigate the allegation
3. Communicate transparently with affected investors
4. Engage lawyer
5. If confirmed, work with law enforcement and protect investor interests through legal agreements

**If a data breach occurs:**
1. Identify what data was compromised
2. Secure the vulnerability immediately
3. Notify NDPC within 72 hours (legal requirement)
4. Notify affected investors
5. Engage cybersecurity expert
6. Offer remediation (e.g., monitor affected accounts)

---

## PART 10: GROWTH TRIGGERS

> When to make key decisions based on metrics, not feelings.

---

### 10.1 Hiring Triggers

| Metric | Threshold | Action |
|--------|-----------|--------|
| Investor support queries | 50+ per day | Hire Customer Support Agent |
| Properties listed | 5+ active | Hire Operations Associate (if not already) |
| Developer partners | 5+ active | Hire Developer Relations Manager |
| Monthly revenue | N1,000,000+ for 3 months | Hire Finance Officer |
| Bug reports + feature requests | CEO spending 60%+ time on code | Hire 2nd Developer |
| Regulatory complexity | SEC registration required | Hire Legal Officer |
| Total assets managed | N1 billion+ | Hire Compliance Officer |
| Brand awareness needed | Product-market fit confirmed | Hire Marketing Lead |

### 10.2 Infrastructure Triggers

| Metric | Threshold | Action |
|--------|-----------|--------|
| Concurrent users | 1,000+ | Upgrade hosting, add load balancing |
| Total investors | 5,000+ | Dedicated database server |
| Properties | 20+ | Automated payout system (remove manual approval) |
| P2P trades per day | 100+ | Dedicated marketplace infrastructure |
| Data volume | Growing fast | Implement data archiving strategy |

### 10.3 Business Milestones

| Milestone | What Changes |
|-----------|-------------|
| First property fully funded | Proof of concept. Start signing next developer partners aggressively. |
| First quarterly payout completed | Proof the full cycle works. Use this for marketing/PR. |
| N500M total assets managed | You're a real company now. Consider SEC registration, advisory board, office space. |
| N1B total assets managed | Consider raising external investment for growth. Hire C-level executives. |
| 10,000 investors | You need proper customer support infrastructure, not just WhatsApp. |
| 50 properties | Automated systems must handle most operations. Manual processes won't scale. |
| First year profitable | Pay yourselves proper salaries. Build 6-month operating expense reserve. |

---

## QUICK REFERENCE: YEAR 1 CHECKLIST

> Print this. Tick them off as you go.

**Month 1:**
- [ ] Register PropVest Ltd at CAC
- [ ] Get TIN from FIRS
- [ ] Get SCUML certificate
- [ ] Open corporate bank account
- [ ] Consult securities lawyer about SEC requirements
- [ ] Start building MVP

**Month 2:**
- [ ] Continue building MVP
- [ ] Draft co-founder agreement with lawyer
- [ ] Sign co-founder agreement
- [ ] Start conversations with first developer partner
- [ ] Register domain, set up hosting

**Month 3:**
- [ ] MVP ready for testing
- [ ] First developer partner committed
- [ ] Set up Paystack account (DVA + Transfers)
- [ ] Draft Terms of Service and Privacy Policy
- [ ] Create Paystack Sub-account for first developer partner
- [ ] Generate DVA for first property

**Month 4:**
- [ ] Launch platform with first property
- [ ] Developer posts link on Instagram
- [ ] Monitor first investments coming in
- [ ] Handle first investor KYC verifications
- [ ] Set up investor WhatsApp community

**Month 5-6:**
- [ ] First property approaching full funding
- [ ] Sign second developer partner
- [ ] Set up Paystack Sub-account for second property
- [ ] Start planning first quarterly payout

**Month 7-9:**
- [ ] First quarterly payout distributed successfully
- [ ] Use payout success as proof for PR/marketing
- [ ] 2-3 properties live
- [ ] Consider first hire (Operations Associate)
- [ ] First VAT filing with FIRS

**Month 10-12:**
- [ ] 3-5 properties live
- [ ] 1,000+ investors on platform
- [ ] Monthly revenue covering operating costs
- [ ] Hire Operations Associate
- [ ] Start accountant retainer
- [ ] Prepare first annual financial statements
- [ ] File first CAC annual return
- [ ] Review and update all processes based on Year 1 learnings
- [ ] Plan Year 2 roadmap

---

## FINAL NOTES

**Remember:**
1. Start small. One property. One developer. Prove it works.
2. Don't hire until revenue forces you to. Every naira matters early on.
3. Put everything in writing. Co-founder agreements, developer contracts, investor terms. Everything.
4. Never hold developer or investor money. Paystack split payments handle the routing automatically.
5. Comply with regulations from day one. It's cheaper to do it right than to fix it later.
6. Communicate with investors even when there's nothing to report. Silence breeds distrust.
7. Your developer partners are your lifeblood. Treat them well. Their success is your success.
8. Build systems and processes, not just code. The company is the system, not just the app.
9. Save 6 months of operating expenses before spending on nice-to-haves.
10. You will make mistakes. Document them, learn from them, don't repeat them.

---

*This document should be reviewed and updated every 6 months as the company evolves.*
