# PropVest — Design System & UI Specification

> The visual identity and component library for every PropVest platform. Designed to feel premium, trustworthy, and effortlessly modern — like the app was designed by a world-class team.

---

## DESIGN PHILOSOPHY

**One sentence:** PropVest should feel like a luxury bank built by a Silicon Valley startup.

**Three pillars:**

1. **Trust** — People are putting their money here. Every pixel must say "your money is safe." No gimmicks, no clutter, no cheap gradients. Clean, confident, professional.

2. **Simplicity** — A teacher in Kano and a developer in Abuja both use this app. If someone's grandmother can't figure it out, it's too complicated. Every screen should have ONE clear action.

3. **Premium** — This is not PiggyVest. This is not a savings app. This is real estate. It should feel like walking into a high-end property showroom — spacious, elegant, intentional.

**Design inspirations:**
- Mercury (banking) — clean, dark mode, spacious
- Linear (product) — micro-animations, attention to detail
- Revolut (fintech) — card-based, smooth transitions
- Stripe (payments) — gradient accents, professional
- Apple (everything) — whitespace is a feature, not a waste

---

## COLOR PALETTE

### Brand Colors

```
Primary:        #0A2540    "Midnight"     — Deep navy. Headers, primary text, nav backgrounds.
                                            Inspired by Stripe's signature dark blue.
                                            Says: "We are serious about your money."

Accent:         #00D4AA    "Emerald"      — Vibrant teal-green. CTAs, success states,
                                            growth indicators, money-related highlights.
                                            Says: "Your money is growing."

Accent Alt:     #635BFF    "Royal"        — Rich purple-blue. Secondary CTAs,
                                            links, interactive elements, charts.
                                            Says: "Premium. Modern. Tech-forward."
```

### Light Theme

```
Background:
  bg-primary:     #FFFFFF                  — Main background (pure white)
  bg-secondary:   #F8FAFC                  — Section backgrounds, alternating rows
  bg-tertiary:    #F1F5F9                  — Card backgrounds, input backgrounds
  bg-elevated:    #FFFFFF                  — Elevated cards (with shadow)

Text:
  text-primary:   #0A2540                  — Headings, primary content
  text-secondary: #425466                  — Body text, descriptions
  text-tertiary:  #8898A9                  — Captions, timestamps, placeholders
  text-inverse:   #FFFFFF                  — Text on dark/accent backgrounds

Borders:
  border-default: #E2E8F0                  — Card borders, dividers
  border-subtle:  #F1F5F9                  — Subtle separators
  border-focus:   #00D4AA                  — Input focus ring

Status:
  success:        #00D4AA                  — Payout received, KYC approved
  success-bg:     #ECFDF5                  — Success background
  warning:        #F59E0B                  — Pending, attention needed
  warning-bg:     #FFFBEB                  — Warning background
  error:          #EF4444                  — Failed, rejected
  error-bg:       #FEF2F2                  — Error background
  info:           #635BFF                  — Information, tips
  info-bg:        #EEF2FF                  — Info background
```

### Dark Theme

```
Background:
  bg-primary:     #0A0E14                  — Main background (near black, NOT pure black)
  bg-secondary:   #111827                  — Section backgrounds
  bg-tertiary:    #1F2937                  — Card backgrounds
  bg-elevated:    #1A2332                  — Elevated cards (with subtle glow)

Text:
  text-primary:   #F9FAFB                  — Headings, primary content
  text-secondary: #9CA3AF                  — Body text
  text-tertiary:  #6B7280                  — Captions, timestamps
  text-inverse:   #0A2540                  — Text on light backgrounds

Borders:
  border-default: #1F2937                  — Card borders
  border-subtle:  #374151                  — Subtle separators
  border-focus:   #00D4AA                  — Input focus ring (same as light)

Status: (same hues, adjusted for dark)
  success:        #00D4AA
  success-bg:     rgba(0, 212, 170, 0.12)
  warning:        #FBBF24
  warning-bg:     rgba(251, 191, 36, 0.12)
  error:          #F87171
  error-bg:       rgba(248, 113, 113, 0.12)
  info:           #818CF8
  info-bg:        rgba(129, 140, 248, 0.12)
```

### Gradients (use sparingly — only for hero sections and premium elements)

```
Gradient Primary:   linear-gradient(135deg, #0A2540 0%, #1A3A5C 100%)     — Nav bars, hero
Gradient Accent:    linear-gradient(135deg, #00D4AA 0%, #00B894 100%)     — Primary CTAs
Gradient Royal:     linear-gradient(135deg, #635BFF 0%, #8B5CF6 100%)     — Premium badges
Gradient Mesh:      radial-gradient(at 20% 80%, #00D4AA15, transparent),  — Subtle bg decoration
                    radial-gradient(at 80% 20%, #635BFF10, transparent)
```

---

## TYPOGRAPHY

### Font Family

```
Primary:     "Inter"          — All UI text. Clean, modern, excellent readability.
                                Available on Google Fonts. Built for screens.
Monospace:   "JetBrains Mono" — Numbers, account numbers, amounts, codes.
                                Makes financial data feel precise and technical.
```

**Why Inter:** Used by Linear, Vercel, Figma, and every top-tier product. It has tabular numbers (all digits same width — critical for financial data), clear letter spacing, and excellent rendering at every size.

### Type Scale

```
Display:     48px / 56px leading / -0.02em tracking / Inter Bold
             → Hero headlines only. "Own Property From N100,000"

H1:          32px / 40px leading / -0.02em / Inter Bold
             → Page titles. "My Portfolio"

H2:          24px / 32px leading / -0.01em / Inter Semibold
             → Section headers. "Your Holdings"

H3:          20px / 28px leading / -0.01em / Inter Semibold
             → Card titles, sub-sections. "Gwarinpa Duplex"

H4:          16px / 24px leading / Inter Semibold
             → Labels, small headers. "Unit Price"

Body:        16px / 24px leading / Inter Regular
             → Main content text

Body Small:  14px / 20px leading / Inter Regular
             → Secondary text, descriptions

Caption:     12px / 16px leading / Inter Medium
             → Labels, timestamps, badges, helper text

Overline:    11px / 16px leading / Inter Semibold / UPPERCASE / 0.05em tracking
             → Category labels, section overlines. "RENTAL PROPERTY"

Money:       Any size / JetBrains Mono Medium
             → All currency amounts. "N2,450,000"
             → Always use Nigerian Naira format: N followed by number with commas
```

---

## SPACING SYSTEM

Base unit: **4px**

```
xs:    4px      — Tight spacing (icon to text in a badge)
sm:    8px      — Between related items (label to input)
md:    12px     — Between elements in a group
lg:    16px     — Between groups, card padding (mobile)
xl:    20px     — Standard card padding
2xl:   24px     — Between sections
3xl:   32px     — Between major sections
4xl:   48px     — Page section gaps
5xl:   64px     — Hero section padding
```

### Screen Padding
```
Mobile:    16px horizontal
Tablet:    24px horizontal
Desktop:   32px horizontal (max content width: 1280px, centered)
```

---

## BORDER RADIUS

```
none:   0px       — Never used (everything has at least slight rounding)
sm:     6px       — Small elements: badges, chips, tags
md:     8px       — Inputs, small buttons
lg:     12px      — Cards, modals, dropdowns
xl:     16px      — Large cards, bottom sheets
2xl:    20px      — Image containers, hero cards
full:   9999px    — Pill buttons, avatars, circular elements
```

**Rule:** Larger elements get larger radius. A small badge = 6px. A full card = 12px. An avatar = full circle.

---

## SHADOWS & ELEVATION

```
Level 0:   none
           → Flat elements, inline content

Level 1:   0 1px 2px rgba(10, 37, 64, 0.04),
           0 1px 3px rgba(10, 37, 64, 0.06)
           → Cards at rest, inputs

Level 2:   0 4px 6px rgba(10, 37, 64, 0.04),
           0 2px 4px rgba(10, 37, 64, 0.06)
           → Cards on hover, dropdowns

Level 3:   0 10px 15px rgba(10, 37, 64, 0.06),
           0 4px 6px rgba(10, 37, 64, 0.04)
           → Modals, bottom sheets, floating elements

Level 4:   0 20px 25px rgba(10, 37, 64, 0.08),
           0 8px 10px rgba(10, 37, 64, 0.04)
           → Toast notifications, popovers

Dark mode: Replace rgba(10, 37, 64, X) with rgba(0, 0, 0, X*2)
           Add subtle glow: 0 0 0 1px rgba(0, 212, 170, 0.05) on elevated cards
```

---

## COMPONENT LIBRARY

### Buttons

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  PRIMARY (Accent gradient bg, white text)                       │
│  ┌─────────────────────┐                                        │
│  │   ✦ Invest Now       │  h: 48px, px: 24px, radius: 12px     │
│  └─────────────────────┘  font: 16px Inter Semibold             │
│  Hover: scale(1.01), shadow Level 2                             │
│  Press: scale(0.98), darker bg                                  │
│  Disabled: 40% opacity, no interactions                         │
│                                                                 │
│  SECONDARY (border + text only, no fill)                        │
│  ┌─────────────────────┐                                        │
│  │     View Details     │  border: 1.5px solid border-default   │
│  └─────────────────────┘  text: text-primary                    │
│  Hover: bg-tertiary fill                                        │
│                                                                 │
│  GHOST (text only, no border, no fill)                          │
│  ┌─────────────────────┐                                        │
│  │     Cancel           │  text: text-secondary                 │
│  └─────────────────────┘  Hover: bg-tertiary fill               │
│                                                                 │
│  DANGER (red bg, white text)                                    │
│  ┌─────────────────────┐                                        │
│  │   🗑 Delete Account  │  bg: error, text: white               │
│  └─────────────────────┘                                        │
│                                                                 │
│  SIZES:                                                         │
│  Small:  h: 36px, px: 16px, font: 14px                         │
│  Medium: h: 44px, px: 20px, font: 15px                         │
│  Large:  h: 52px, px: 28px, font: 16px (CTAs, hero buttons)    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Cards

```
PROPERTY CARD (browsing list)
┌──────────────────────────────────┐
│  ┌──────────────────────────────┐│
│  │                              ││
│  │     [Property Image]         ││  Image: aspect 16:9
│  │                              ││  radius: 12px top only
│  │              ┌──────────┐    ││
│  │              │ RENTAL   │    ││  Badge: top-right overlay
│  │              └──────────┘    ││
│  └──────────────────────────────┘│
│                                  │
│  Gwarinpa Luxury Duplex          │  H3: 18px semibold
│  by Saleem Goje Properties       │  Caption: 13px, text-tertiary
│                                  │
│  📍 Gwarinpa, Abuja              │  Caption: 13px, text-tertiary
│                                  │
│  ┌────────────────────────────┐  │
│  │████████████████░░░░░░░░░░░░│  │  Progress bar: 6px height
│  └────────────────────────────┘  │  Filled: accent color
│  72% funded · 648 of 900 units   │  Caption below bar
│                                  │
│  ┌──────────┐    ┌──────────┐   │
│  │ N100,000 │    │ 8.5% pa  │   │  Two stat pills
│  │ per unit │    │ est yield│   │
│  └──────────┘    └──────────┘   │
│                                  │
└──────────────────────────────────┘

Card: bg-elevated, shadow Level 1, radius: 16px
Hover (web): shadow Level 2, translateY(-2px), 200ms ease
Tap (mobile): scale(0.98) spring animation
Spacing: 16px padding below image
```

```
PORTFOLIO HOLDING CARD
┌──────────────────────────────────────────────────┐
│                                                  │
│  ┌──────┐  Gwarinpa Luxury Duplex         ▲12%  │
│  │ IMG  │  5 units · Rental                      │
│  │      │                                        │
│  └──────┘  Invested: N500,000                    │
│            Current:  N560,000                    │  Green if positive
│                                                  │
│  ┌──────────────┐ ┌──────────────┐               │
│  │  Next Payout  │ │ Total Earned │               │
│  │   N5,833      │ │  N23,333     │               │
│  │   in 45 days  │ │  all time    │               │
│  └──────────────┘ └──────────────┘               │
│                                                  │
└──────────────────────────────────────────────────┘

Thumbnail: 56x56px, radius: 12px
Value change: green (#00D4AA) for positive, red (#EF4444) for negative
Mini stat cards: bg-tertiary, radius: 8px, padding: 12px
```

```
STAT CARD (Dashboard)
┌───────────────────────┐
│  Total Invested        │  Overline: 11px, text-tertiary
│                        │
│  N2,450,000            │  Money: 28px JetBrains Mono Bold
│                        │
│  ▲ 12.5% this quarter  │  Caption: 13px, success color
└───────────────────────┘

bg: bg-elevated (light) or bg-tertiary (dark)
shadow: Level 1
radius: 16px
padding: 20px
```

### Inputs

```
DEFAULT STATE
┌──────────────────────────────────────┐
│  Email address                       │  Label: 14px, text-secondary, above
│                                      │
│  ┌──────────────────────────────────┐│
│  │  you@example.com                 ││  Input: 16px, text-tertiary (placeholder)
│  └──────────────────────────────────┘│  h: 48px, bg: bg-tertiary
│                                      │  border: 1px border-subtle
│                                      │  radius: 10px, px: 16px
└──────────────────────────────────────┘

FOCUSED STATE
  border: 2px solid accent (#00D4AA)
  bg: bg-primary (white lift)
  Subtle glow: 0 0 0 3px rgba(0, 212, 170, 0.12)

ERROR STATE
  border: 2px solid error
  Helper text below: "Please enter a valid email" in error color
  Shake animation: translateX(-4, 4, -2, 2, 0) over 300ms

FILLED STATE
  border: 1px border-default
  text: text-primary (full opacity)
```

### Bottom Navigation (Investor App — Mobile)

```
┌────────────────────────────────────────────────────┐
│                                                    │
│  ┌────┐   ┌────┐   ┌────┐   ┌────┐   ┌────┐     │
│  │ 🏠 │   │ 🔍 │   │ 💼 │   │ 📊 │   │ 👤 │     │
│  │Home │   │Find │   │Port│   │Pay │   │ Me │     │
│  └────┘   └────┘   └────┘   └────┘   └────┘     │
│                                                    │
│  Active: accent color icon + text, filled icon     │
│  Inactive: text-tertiary, outlined icon            │
│                                                    │
│  Height: 64px (iPhone safe area adds below)        │
│  Background: bg-primary with top border            │
│  Light: subtle frosted glass blur                  │
│  Active indicator: small dot below icon (accent)   │
│                                                    │
└────────────────────────────────────────────────────┘

Tabs: Home, Explore, Portfolio, Payouts, Profile
Icons: Lucide React Native (consistent, clean line icons)
Tap: spring animation (scale 0.85 → 1.0, 300ms spring)
```

### Property Type Badges

```
  ┌──────────┐   ┌─────────────┐   ┌──────────┐
  │  RENTAL  │   │ BUILD & SELL │   │   LAND   │
  └──────────┘   └─────────────┘   └──────────┘

  Rental:      bg: #ECFDF5, text: #047857, border: #A7F3D0
  Build&Sell:  bg: #EEF2FF, text: #4338CA, border: #C7D2FE
  Land:        bg: #FFF7ED, text: #C2410C, border: #FED7AA

  Size: px: 10px, py: 4px, font: 11px Inter Semibold, UPPERCASE
  Radius: 6px
```

### Progress Bar

```
  ┌────────────────────────────────────────┐
  │████████████████████████░░░░░░░░░░░░░░░░│
  └────────────────────────────────────────┘

  Track: bg-tertiary, height: 6px, radius: full
  Fill: accent gradient (left to right), radius: full

  Animation: width animates on mount (0% → actual, 800ms ease-out)

  Milestones (optional): small dots at 25%, 50%, 75%
  Nearly full (>90%): fill pulses subtly (glow animation)
```

### Toast / Snackbar Notifications

```
  SUCCESS
  ┌──────────────────────────────────────────────────┐
  │  ✓  Payment confirmed. 5 units allocated.        │
  └──────────────────────────────────────────────────┘
  bg: #0A2540, text: white, left accent: 3px success

  ERROR
  ┌──────────────────────────────────────────────────┐
  │  ✕  Payment failed. Please try again.            │
  └──────────────────────────────────────────────────┘
  bg: #0A2540, text: white, left accent: 3px error

  Position: top of screen (mobile), top-right (web)
  Animation: slide down + fade in, auto-dismiss 4s
  Radius: 12px, shadow: Level 4
  Swipe to dismiss (mobile)
```

### Modal / Bottom Sheet (Mobile)

```
  ┌──────────────────────────────────────────┐
  │                                          │
  │              ┌────────┐                  │  Handle: 36x4px, bg-tertiary
  │              └────────┘                  │  radius: full
  │                                          │
  │   Confirm Investment                     │  H2
  │                                          │
  │   You are about to invest in:            │  Body
  │                                          │
  │   Gwarinpa Luxury Duplex                 │  H3
  │   5 units × N100,000 = N500,000          │  Money font
  │   Platform fee (2%) = N10,000            │
  │   ──────────────────────────             │
  │   Total: N510,000                        │  H2, accent color
  │                                          │
  │   ┌──────────────────────────────────┐   │
  │   │         Confirm & Pay            │   │  Primary button, full width
  │   └──────────────────────────────────┘   │
  │                                          │
  │            Cancel                        │  Ghost button
  │                                          │
  └──────────────────────────────────────────┘

  Background overlay: rgba(10, 37, 64, 0.5), blur(4px)
  Sheet: bg-primary, radius: 20px top corners
  Animation: slide up with spring physics
  Drag to dismiss with velocity detection
```

---

## SCREEN LAYOUTS

### Investor App — Home Dashboard

```
┌──────────────────────────────────────────┐
│  ┌──────────────────────────────────────┐│
│  │  PropVest          🔔  (2)           ││  Header: minimal
│  └──────────────────────────────────────┘│
│                                          │
│  Good morning, Aisha 👋                  │  Greeting: H3
│                                          │
│  ┌──────────────────────────────────────┐│
│  │  ┌────────────────────────────────┐  ││
│  │  │  TOTAL PORTFOLIO VALUE         │  ││  Overline
│  │  │                                │  ││
│  │  │  N2,450,000                    │  ││  Display: 36px mono
│  │  │  ▲ N245,000 (12.5%)           │  ││  Caption: success
│  │  │                                │  ││
│  │  │  ┌─────────┐ ┌─────────────┐  │  ││
│  │  │  │Invested │ │ Earned      │  │  ││  Two mini stats
│  │  │  │N2.2M    │ │ N250K       │  │  ││
│  │  │  └─────────┘ └─────────────┘  │  ││
│  │  └────────────────────────────────┘  ││
│  └──────────────────────────────────────┘│  Hero card: gradient bg
│                                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│  │  Invest  │ │Portfolio │ │ Market   │ │  Quick action pills
│  └──────────┘ └──────────┘ └──────────┘ │  Horizontal scroll
│                                          │
│  TRENDING PROPERTIES                     │  Overline
│  ┌──────────────────────────────────────┐│
│  │ ┌────────────┐ ┌────────────┐  →    ││  Horizontal scroll
│  │ │ Property 1 │ │ Property 2 │       ││  cards
│  │ │            │ │            │       ││
│  │ └────────────┘ └────────────┘       ││
│  └──────────────────────────────────────┘│
│                                          │
│  RECENT PAYOUTS                          │  Overline
│  ┌──────────────────────────────────────┐│
│  │  Gwarinpa Duplex    +N5,833  Apr 1  ││  Payout rows
│  │  Kuje Estate        +N3,200  Apr 1  ││
│  │  See all →                          ││
│  └──────────────────────────────────────┘│
│                                          │
│  ┌────┐  ┌────┐  ┌────┐  ┌────┐ ┌────┐ │
│  │Home│  │Find│  │Port│  │Pay │ │ Me │ │  Bottom nav
│  └────┘  └────┘  └────┘  └────┘ └────┘ │
└──────────────────────────────────────────┘
```

### Investor App — Property Detail

```
┌──────────────────────────────────────────┐
│  ← Back                    ♡    ⤴ Share │
│                                          │
│  ┌──────────────────────────────────────┐│
│  │                                      ││
│  │                                      ││
│  │        [Property Image Gallery]      ││  Full width, swipeable
│  │                                      ││  Aspect: 4:3
│  │                                      ││
│  │                      ● ○ ○ ○ ○       ││  Dots indicator
│  └──────────────────────────────────────┘│
│                                          │
│  ┌──────────┐                            │
│  │ RENTAL   │                            │  Type badge
│  └──────────┘                            │
│  Gwarinpa Luxury Duplex                  │  H1
│                                          │
│  ┌──────┐                                │
│  │ LOGO │  Saleem Goje Properties  →     │  Developer link
│  └──────┘  📍 Gwarinpa, Abuja            │
│                                          │
│  ┌──────────────────────────────────────┐│
│  │████████████████████████░░░░░░░░░░░░░░││  Progress bar
│  │72% funded · 252 units remaining      ││
│  └──────────────────────────────────────┘│
│                                          │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │ N100K   │ │ 8.5%    │ │ 648     │   │  Stat cards row
│  │per unit │ │ yield   │ │investors│   │
│  └─────────┘ └─────────┘ └─────────┘   │
│                                          │
│  ┌────────┬─────────┬──────────┐        │
│  │ About  │Financial│Documents │        │  Tab bar
│  └────────┴─────────┴──────────┘        │
│                                          │
│  This stunning 4-bedroom duplex in       │
│  Gwarinpa features modern finishes,      │  Body text
│  24-hour power supply, and is in one     │
│  of Abuja's most sought-after areas...   │
│                                          │
│                                          │
│  ┌──────────────────────────────────────┐│
│  │           Invest Now                 ││  Sticky bottom CTA
│  │        N100,000 per unit             ││  Primary button
│  └──────────────────────────────────────┘│
└──────────────────────────────────────────┘
```

### Investor App — Investment Success

```
┌──────────────────────────────────────────┐
│                                          │
│                                          │
│                                          │
│               ✓                          │  Large circle: accent bg
│                                          │  Check icon: white, animated
│           (confetti)                     │  Confetti: multicolor particles
│                                          │
│                                          │
│    You're now a property investor! 🎉    │  H1, center
│                                          │
│    You own 5 units in                    │  Body, center
│    Gwarinpa Luxury Duplex               │  H3, accent color
│                                          │
│  ┌──────────────────────────────────────┐│
│  │                                      ││
│  │   Invested         N500,000          ││
│  │   Platform fee     N10,000           ││  Summary card
│  │   ─────────────────────────          ││
│  │   Total paid       N510,000          ││
│  │                                      ││
│  │   Est. quarterly   N5,833            ││  Accent color
│  │   Est. annual      N23,333           ││
│  │                                      ││
│  └──────────────────────────────────────┘│
│                                          │
│  ┌──────────────────────────────────────┐│
│  │          View Portfolio              ││  Primary button
│  └──────────────────────────────────────┘│
│                                          │
│  ┌──────────────────────────────────────┐│
│  │       Share with friends             ││  Secondary button
│  └──────────────────────────────────────┘│
│                                          │
│            Invest in more →              │  Ghost link
│                                          │
└──────────────────────────────────────────┘
```

### Admin Portal — Dashboard (Desktop)

```
┌──────────────────────────────────────────────────────────────────────┐
│  ┌────────────┐                                                      │
│  │  PropVest  │  Dashboard                          🔔  Admin Name ▾│
│  │   ADMIN    │                                                      │
│  ├────────────┤  ┌──────────────────────────────────────────────────┐│
│  │            │  │                                                  ││
│  │  📊 Dash   │  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────┐│
│  │  🏠 Props  │  │  │ Total    │ │ Active   │ │ Revenue  │ │Payout││
│  │  👥 Users  │  │  │ Investors│ │Properties│ │  (MTD)   │ │ Due  ││
│  │  ✓  KYC    │  │  │ 1,247    │ │ 12       │ │ N2.4M    │ │ 3    ││
│  │  💰 Pays   │  │  │ ▲ 23%    │ │ ▲ 2 new  │ │ ▲ 18%    │ │      ││
│  │  🔄 P2P    │  │  └──────────┘ └──────────┘ └──────────┘ └──────┘│
│  │  🤝 Devs   │  │                                                  ││
│  │  📈 Finance│  │  PENDING ACTIONS                                 ││
│  │  🛡 Comply │  │  ┌───────────────────────────────────────────┐   ││
│  │  👔 Staff  │  │  │  ⚠ 5 KYC reviews pending                │   ││
│  │  ⚙ Settings│  │  │  ⚠ 2 properties awaiting approval       │   ││
│  │  📋 Audit  │  │  │  ⚠ 1 payout ready to process            │   ││
│  │  📢 Alerts │  │  └───────────────────────────────────────────┘   ││
│  │            │  │                                                  ││
│  │            │  │  RECENT TRANSACTIONS          REVENUE TREND      ││
│  │            │  │  ┌──────────────────┐  ┌─────────────────────┐  ││
│  │            │  │  │ Aisha M. +5 units│  │     ╱──╲            │  ││
│  │            │  │  │ Musa K.  -3 units│  │   ╱    ╲    ╱──    │  ││
│  │            │  │  │ Fatima.. +2 units│  │  ╱      ╲──╱       │  ││
│  │            │  │  │ Ibrahim  Payout  │  │ ╱                   │  ││
│  │            │  │  │ See all →        │  │ Jan Feb Mar Apr     │  ││
│  │            │  │  └──────────────────┘  └─────────────────────┘  ││
│  │            │  │                                                  ││
│  └────────────┘  └──────────────────────────────────────────────────┘│
└──────────────────────────────────────────────────────────────────────┘

Sidebar: bg-primary (#0A2540), width: 240px, fixed
Content: bg-secondary, scrollable
Stat cards: bg-elevated, shadow Level 1
Active nav item: accent bg with 12% opacity, accent text, left 3px accent border
```

### Product Website — Hero Section

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────────┐│
│  │  PropVest        For Investors    For Developers    FAQ    Login ││
│  └──────────────────────────────────────────────────────────────────┘│
│                                                                      │
│                                                                      │
│     Own Nigerian Property                                            │  Display: 48px
│     From ₦100,000                                                    │  Accent colored amount
│                                                                      │
│     Invest in verified properties by trusted developers.             │  Body: 18px
│     Earn quarterly rent. Sell anytime.                               │
│                                                                      │
│     ┌─────────────────┐  ┌─────────────────┐                        │
│     │  Start Investing │  │  List Property  │                        │  Primary + Secondary
│     └─────────────────┘  └─────────────────┘                        │
│                                                                      │
│     ┌──────────┐ ┌──────────┐ ┌──────────┐                          │
│     │ N450M+   │ │ 1,200+   │ │ 8-12%    │                          │  Social proof stats
│     │ managed  │ │ investors│ │ avg yield │                          │
│     └──────────┘ └──────────┘ └──────────┘                          │
│                                                                      │
│                                                                      │
│     ┌──────────────────────────────────────────┐                    │
│     │                                          │                    │
│     │        [App Screenshot Mockup]           │                    │  Floating phone mockup
│     │        showing the investor app          │                    │  with subtle shadow
│     │        home screen                       │                    │  slight rotation (2deg)
│     │                                          │                    │
│     └──────────────────────────────────────────┘                    │
│                                                                      │
│  Background: Gradient mesh (very subtle accent + royal blobs)        │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## ANIMATIONS & MICRO-INTERACTIONS

### Principles
- Every animation has a purpose (feedback, direction, delight)
- Duration: 150-300ms for UI feedback, 400-600ms for transitions, 800ms+ for celebratory
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)` for most, spring physics for playful elements
- Never block the user — they should always be able to interact during animations

### Specific Animations

```
SCREEN TRANSITIONS (React Navigation)
  Push: slide from right, 300ms
  Modal: slide from bottom, 350ms spring
  Tab switch: cross-fade, 200ms

BUTTON PRESS
  Scale: 1.0 → 0.97 → 1.0 (spring, 200ms)
  Haptic: light impact on press (iOS), light vibration (Android)

PULL TO REFRESH
  Custom: PropVest logo spins while loading
  Spring back when released

INVESTMENT SUCCESS
  1. Circle draws in (stroke animation, 600ms)
  2. Checkmark draws inside circle (300ms, delayed 400ms)
  3. Confetti burst from center (800ms, 40 particles)
  4. Text fades up (300ms, delayed 800ms)
  5. Cards slide up one by one (200ms each, staggered 100ms)

NUMBER COUNTING
  Portfolio value, payout amounts: count up animation
  N0 → N2,450,000 over 800ms, ease-out
  Use JetBrains Mono so digits don't shift width

PROGRESS BAR FILL
  On mount: 0% → actual% over 800ms, ease-out
  Color shifts from accent to accent-bright as it fills

SKELETON LOADING
  Shimmer effect: gradient sweep left-to-right, 1.5s loop
  bg-tertiary base with lighter sweep
  Shapes match actual content layout

CARD HOVER (Web only)
  translateY: 0 → -2px, 200ms ease
  Shadow: Level 1 → Level 2
  Subtle border color shift to accent at 20% opacity

NOTIFICATION BADGE
  Number appears with scale spring (0 → 1.2 → 1.0)
  Red dot pulses gently when new (opacity 0.7 → 1.0 loop)

LIST ITEMS
  Staggered fade-up on mount: each item delayed 50ms
  Swipe to delete: item slides right, height collapses

TAB INDICATOR
  Slides smoothly between tabs (spring physics, 300ms)
  Active tab text: color transition 200ms
```

---

## ICONOGRAPHY

**Library:** Lucide Icons (React Native + Web)
- Consistent 24x24 base size
- Stroke width: 1.75px (slightly thinner than default for elegance)
- Corner radius: round caps and joins
- Colors follow text color hierarchy

**Key icons:**
```
Home:        Home (house)
Explore:     Search (magnifying glass)
Portfolio:   Briefcase
Payouts:     Wallet
Profile:     User
Invest:      TrendingUp
Sell:        ArrowRightLeft
Notify:      Bell
Settings:    Settings (gear)
Property:    Building2
Developer:   UserCheck
Admin:       Shield
Success:     CheckCircle2
Error:       XCircle
Warning:     AlertTriangle
Info:        Info
Share:       Share2
Heart:       Heart (wishlist)
Filter:      SlidersHorizontal
Sort:        ArrowUpDown
```

---

## RESPONSIVE BREAKPOINTS

```
Mobile:      0 - 767px       Single column, bottom nav, full-width cards
Tablet:      768px - 1023px  Two columns, sidebar nav (collapsible)
Desktop:     1024px - 1439px Three columns, persistent sidebar
Large:       1440px+         Max content width 1280px, centered
```

### Investor App (Expo Web)
- Designed mobile-first
- Web version mirrors mobile layout up to 767px
- Above 768px: adds sidebar, multi-column property grid

### Admin & Developer Portals
- Desktop-first (admins use computers)
- Sidebar always visible on desktop
- Hamburger menu on mobile/tablet
- Tables become card lists on mobile

### Product Website
- Responsive with all breakpoints
- Hero section adjusts: text + image side-by-side (desktop) → stacked (mobile)
- Navigation: horizontal (desktop) → hamburger (mobile)

---

## DARK MODE IMPLEMENTATION

### Rules
1. Never use pure black (#000000) as background — use #0A0E14 (warmer)
2. Reduce white text to #F9FAFB (not pure white — less eye strain)
3. Shadows become subtle glows in dark mode
4. Images get a subtle dark overlay (5%) to blend with dark UI
5. Charts/graphs use slightly brighter accent colors for visibility
6. Status colors stay the same hue but adjust brightness
7. Cards get 1px border (border-default) instead of relying on shadow

### Detection
- Default: follow system preference
- User can override in settings (Light / Dark / System)
- Persist choice in AsyncStorage (mobile) / localStorage (web)

---

## PLATFORM-SPECIFIC GUIDELINES

### iOS (via Expo)
- Use SF Pro for system text where Inter is not loaded
- Respect safe areas (notch, home indicator)
- Use native haptic feedback patterns
- Bottom sheet uses iOS-style handle
- Blur effect on nav bar (UIBlurEffect style)

### Android (via Expo)
- Material You dynamic color support (optional, Phase 2)
- Edge-to-edge display with transparent status bar
- Ripple effect on touch (default React Native behavior)
- Bottom nav follows Material 3 guidelines

### Web (Next.js portals + Expo Web)
- Focus indicators visible for keyboard navigation (accessibility)
- Hover states on all interactive elements
- Cursor: pointer on clickable elements
- Smooth scroll behavior
- Tooltip on hover for icon-only buttons

---

## ACCESSIBILITY

```
Contrast:     All text meets WCAG AA (4.5:1 for body, 3:1 for large text)
Touch:        Minimum tap target 44x44px (iOS) / 48x48dp (Android)
Font:         Supports system font scaling (up to 200%)
Screen reader: All images have alt text, all buttons have labels
Motion:       Respect "Reduce Motion" system setting — disable animations
Color:        Never use color ALONE to convey meaning (always pair with icon/text)
```

---

## FILE ORGANIZATION (React Native + Expo)

```
src/
├── app/                    # Expo Router screens
├── components/
│   ├── ui/                 # Primitive components (Button, Card, Input, Badge, etc.)
│   ├── property/           # Property-specific (PropertyCard, InvestFlow, etc.)
│   ├── portfolio/          # Portfolio-specific
│   ├── layout/             # Header, BottomNav, Screen wrapper
│   └── shared/             # Shared (Avatar, EmptyState, Skeleton, etc.)
├── lib/
│   ├── theme.ts            # Colors, spacing, typography tokens
│   ├── animations.ts       # Shared animation configs
│   └── constants.ts        # App-wide constants
├── hooks/                  # Custom hooks
├── services/               # API calls
├── stores/                 # State management
└── assets/                 # Images, fonts
```

---

## BRAND ASSETS

### Logo
```
Full:       "PropVest" wordmark
            Font: Inter Bold, tracking: -0.02em
            The "V" has a subtle upward arrow incorporated (growth)
            Primary color on light bg, white on dark bg

Icon:       "PV" monogram in a rounded square
            bg: gradient (midnight → accent)
            text: white
            Used for app icon, favicon, small spaces

App Icon:   1024x1024 base
            Rounded square (iOS auto-masks, Android adaptive icon)
            Gradient background, white PV monogram
            No text below — icon only
```

### App Store Assets
```
Screenshots:  6.7" (iPhone 15 Pro Max), 6.1" (iPhone 15)
              Show real app screens with device frame
              Top text overlay: feature callout (Inter Bold, 24px)
              5 screenshots: Home, Property, Invest, Portfolio, Payouts

Feature graphic (Play Store): 1024x500
              Gradient bg, phone mockup, "Own Property From N100,000"
```

---

## SUMMARY: WHAT MAKES IT WORLD-CLASS

1. **Color palette is intentional** — midnight navy for trust, emerald for growth, purple for premium. Not random.

2. **Typography is precise** — Inter for readability, JetBrains Mono for money. Tabular numbers so columns align.

3. **Spacing is mathematical** — 4px base grid. Everything aligns. Nothing is "eyeballed."

4. **Animations have purpose** — button press = feedback, confetti = celebration, shimmer = loading. No animation without reason.

5. **Dark mode is designed, not inverted** — warm near-black, reduced contrast, subtle glows. Not just "swap white for black."

6. **Components are consistent** — every card, every button, every input follows the same rules everywhere. No one-offs.

7. **Whitespace is intentional** — less clutter = more trust. If a screen feels empty, that's good. Let the content breathe.

8. **Money always looks precise** — monospace font, proper formatting (N2,450,000), right-aligned numbers.

9. **Motion is subtle** — springs not linear, 200-300ms not 500ms, always interruptible. Fast but smooth.

10. **Accessibility is built in** — not an afterthought. Contrast ratios, touch targets, screen reader support from day one.

---
