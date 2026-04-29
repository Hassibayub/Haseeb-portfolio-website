# codewithhaseeb.com — Complete Rebuild Spec

> **Author:** prepared for Muhammad Haseeb, built by Haseeb + team
> **Stack:** Next.js 15 + Tailwind 4 + shadcn/ui + MagicUI
> **Inspiration:** finns.framer.website (aesthetic reference only)
> **Goal:** Replace the current portfolio site with a conversion-focused sales site for an AI engineering agency targeting funded startups ($500K–$5M raised) and SMBs needing AI automation.
> **Timeline:** 7 working days of focused build time.
> **This document contains:** tech stack, design tokens, every page, every section, every line of copy, every CTA. You should not need to ask design or copy questions after reading this.

---

## TABLE OF CONTENTS

1. [Strategic Context](#1-strategic-context)
2. [Brand + Design System](#2-brand--design-system)
3. [Tech Stack + Setup](#3-tech-stack--setup)
4. [Site Architecture](#4-site-architecture)
5. [Home Page — Full Copy + Sections](#5-home-page--full-copy--sections)
6. [Work / Case Studies Page](#6-work--case-studies-page)
7. [Individual Case Study Template](#7-individual-case-study-template)
8. [Services Page](#8-services-page)
9. [About Page](#9-about-page)
10. [Contact Page](#10-contact-page)
11. [Blog Page (Scaffold)](#11-blog-page-scaffold)
12. [Global — Navigation + Footer](#12-global--navigation--footer)
13. [Components Inventory](#13-components-inventory)
14. [SEO + Metadata Spec](#14-seo--metadata-spec)
15. [Analytics + Tracking](#15-analytics--tracking)
16. [Performance Budget](#16-performance-budget)
17. [7-Day Build Sprint Plan](#17-7-day-build-sprint-plan)
18. [Launch Checklist](#18-launch-checklist)

---

## 1. Strategic Context

### Who the site is for (in order of priority)

1. **Primary ICP:** Seed-to-Series-A funded AI/SaaS startup founders ($500K–$5M raised, US/UK/EU) who need an AI product shipped to production. Example: people who would've hired Haseeb to build Aphra, Tula, KCNL.
2. **Secondary ICP:** SMBs ($2M–$20M revenue) with manual workflows ripe for AI automation. Example: Capwell Comm, FCS.
3. **Tertiary:** Enterprise clients with AI integration needs. Example: Sony PlayStation type work.

### What the site must do

| Goal | Measured as |
|---|---|
| Convert Upwork visitors who Google us | WhatsApp click, email click, book-a-call click (track all three) |
| Give LinkedIn content something to link to | Sharable blog posts + case study URLs |
| Let cold outbound reference real work | Deep-linkable case study pages |
| Look like something a YC founder would trust | Visual quality matching a real SaaS company's site |
| Rank for buyer-intent keywords | "AI engineering agency", "langchain agent developer", "hire AI team" |

### What the site must NOT be

- ❌ A resume or portfolio (it's a sales page for an agency)
- ❌ A single scrolling page (needs linkable URLs for case studies)
- ❌ Flashy animations that slow it down
- ❌ Finance-industry themed (Finns is a reference, not a template)
- ❌ Overpromising ("$10M raised" type claims we can't back)

### Positioning statement (internal use)

> We are a 5-person senior engineering team that ships production AI systems — not demos. We take funded startups from idea to live AI product in 6–10 weeks, and we take SMBs from manual drudgery to AI agents that run themselves. We're priced like a senior agency, deliver like a product team, and push back on bad ideas because bad scoping is why most AI projects fail.

This positioning line is the guardrail for every piece of copy below. If a line doesn't align with it, cut the line.

---

## 2. Brand + Design System

### 2.1 Color Palette

**Primary palette (light mode):**

| Token | Hex | Use |
|---|---|---|
| `background` | `#F3F2F1` | Page background — warm off-white / beige |
| `background-subtle` | `#F7F7F7` | Subtle section backgrounds |
| `background-card` | `#FFFFFF` | Card fills, elevated surfaces |
| `foreground` | `#2B2D2D` | Primary text, near-black |
| `foreground-muted` | `#666666` | Secondary text |
| `foreground-subtle` | `#8C8C8C` | Captions, labels |
| `border` | `#E6E6E6` | Dividers, card borders |
| `border-subtle` | `#F2F2F2` | Inner dividers |
| `accent` | `#7C3AED` | Deep purple — primary brand accent |
| `accent-foreground` | `#FFFFFF` | Text on accent backgrounds |
| `accent-subtle` | `#F3EEFF` | Very pale purple for backgrounds |

**Dark mode palette:**

| Token | Hex | Use |
|---|---|---|
| `background` | `#1A1A1B` | Page background, warm black |
| `background-subtle` | `#242527` | Section backgrounds |
| `background-card` | `#2B2D2D` | Card fills |
| `foreground` | `#FFFFFF` | Primary text |
| `foreground-muted` | `#B8B8B8` | Secondary text |
| `foreground-subtle` | `#888888` | Captions |
| `border` | `#333333` | Dividers |
| `accent` | `#A78BFA` | Lighter purple for dark mode contrast |

**Rules:**
- Default to **light mode only for v1**. Dark mode is a future enhancement (don't build it week 1).
- Use `accent` (#7C3AED) sparingly — only for: primary CTA buttons, key highlights, brand moments. Not for body text or large backgrounds.
- Maintain warm neutrals. Do not use cool grays (#F5F5F5, #E5E5E5). The warmth is the differentiator.

### 2.2 Typography

**Fonts (both free via Google Fonts):**

```css
--font-display: 'Instrument Serif', 'Playfair Display', serif;  /* Headlines */
--font-body: 'Inter', system-ui, sans-serif;                     /* Everything else */
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;           /* Code, stats */
```

**Why Instrument Serif:** This is the secret to Finns' "premium editorial" feel. It's a free Google Font used by Instrument.com, many YC-backed SaaS companies, and premium brands. Pair with Inter body = 70% of the visual sophistication you liked in Finns.

**Type scale:**

| Token | Size (desktop) | Size (mobile) | Weight | Tracking | Use |
|---|---|---|---|---|---|
| `display-xl` | 84px | 52px | 400 (regular) | -0.03em | Hero headline only |
| `display-lg` | 64px | 42px | 400 | -0.02em | Page heroes |
| `display-md` | 48px | 34px | 400 | -0.02em | Section titles |
| `display-sm` | 36px | 28px | 400 | -0.01em | Subsection titles |
| `heading-lg` | 28px | 24px | 500 (medium) | -0.01em | Card titles |
| `heading-md` | 22px | 20px | 500 | 0 | Subheadings |
| `heading-sm` | 18px | 18px | 500 | 0 | Small headings |
| `body-lg` | 18px | 16px | 400 | 0 | Hero subheadlines, lead paragraphs |
| `body-md` | 16px | 16px | 400 | 0 | Body text |
| `body-sm` | 14px | 14px | 400 | 0 | Small text, captions |
| `label` | 12px | 12px | 500 | 0.08em (uppercase) | Tags, labels, eyebrow text |

**Rules:**
- Display sizes use **Instrument Serif at weight 400**. Never bold a serif display; it looks wrong.
- Body sizes use **Inter**. Default weight 400, bold weight 500 or 600.
- Line height: 1.1 for display, 1.4 for body, 1.2 for headings.
- Maximum line length for body: **65 characters** (use `max-w-prose` in Tailwind).

### 2.3 Spacing System

Use Tailwind's default scale but restrict to this subset:

```
0, 1 (4px), 2 (8px), 3 (12px), 4 (16px), 6 (24px), 8 (32px),
12 (48px), 16 (64px), 20 (80px), 24 (96px), 32 (128px)
```

**Section spacing:**
- Between major sections: `py-24` (96px) on desktop, `py-16` (64px) on mobile
- Between subsections inside a section: `py-8 → py-12`
- Card internal padding: `p-6 → p-8`
- Button internal padding: `px-6 py-3`

### 2.4 Border Radius

Match Finns' soft, modern feel:

```
sm  → 8px    (inputs, small buttons)
md  → 12px   (cards, buttons)
lg  → 16px   (large cards, images)
xl  → 24px   (hero surfaces, feature cards)
pill → 9999px (nav, badges, pill CTAs)
```

Default: use `rounded-xl` (16px) for anything "card"-shaped. Use `rounded-full` for pill buttons.

### 2.5 Shadows

Keep it subtle. Heavy shadows = amateur template feel.

```css
--shadow-xs:  0 1px 2px 0 rgb(0 0 0 / 0.03);
--shadow-sm:  0 2px 4px -1px rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.04);
--shadow-md:  0 4px 8px -2px rgb(0 0 0 / 0.06), 0 2px 4px -2px rgb(0 0 0 / 0.04);
--shadow-lg:  0 12px 24px -8px rgb(0 0 0 / 0.08), 0 4px 8px -4px rgb(0 0 0 / 0.04);
```

**Rule:** Prefer borders (`border border-border`) over shadows. Use shadows only on elevated surfaces (hero visuals, pricing cards).

### 2.6 Motion

- Page transitions: none (static, fast).
- Hover states: 150ms ease-in-out.
- Entrance animations: Framer Motion `useInView` — fade + slight Y translate (24px). Duration 600ms.
- Number tickers: MagicUI NumberTicker, 2s duration.
- Marquee (logo bar): MagicUI Marquee, 40s per loop, pause on hover.

**Rule:** No parallax, no scroll-jacking, no cursor effects, no flying letters. Motion exists to draw attention to specific moments (numbers animating in, CTA highlights). Everything else is static.

### 2.7 Grid System

- Max container width: `max-w-[1280px]` (matches Finns)
- Gutter: `px-6` mobile, `px-8` tablet, `px-12` desktop
- Columns: 12-column grid mental model, implemented with Tailwind grid/flex

---

## 3. Tech Stack + Setup

### 3.1 Stack

```
Framework:      Next.js 15 (App Router, React 19)
Language:       TypeScript strict mode
Styling:        Tailwind CSS 4
Components:     shadcn/ui (copy-paste, not a library)
Animations:     Framer Motion + MagicUI components
Icons:          Lucide React (tree-shakeable)
Forms:          React Hook Form + Zod validation
Content:        MDX for blog + case studies (via @next/mdx)
Analytics:      Vercel Analytics + GA4 + Microsoft Clarity
Email:          Resend (for contact form → your inbox)
Hosting:        Vercel (free tier handles this easily)
Domain:         codewithhaseeb.com (existing)
```

**Monthly cost: $0.**

### 3.2 Initial setup commands

```bash
# 1. Create the Next.js project
npx create-next-app@latest codewithhaseeb \
  --typescript --tailwind --app --src-dir \
  --import-alias "@/*" --eslint

cd codewithhaseeb

# 2. Install shadcn/ui
npx shadcn@latest init
# When prompted:
#  - Style: New York
#  - Base color: Neutral
#  - CSS variables: Yes

# 3. Add core shadcn components
npx shadcn@latest add button card badge accordion dialog \
  navigation-menu separator input textarea label sonner

# 4. Add MagicUI components
npx shadcn@latest add "https://magicui.design/r/marquee.json"
npx shadcn@latest add "https://magicui.design/r/number-ticker.json"
npx shadcn@latest add "https://magicui.design/r/animated-beam.json"
npx shadcn@latest add "https://magicui.design/r/border-beam.json"
npx shadcn@latest add "https://magicui.design/r/magic-card.json"
npx shadcn@latest add "https://magicui.design/r/animated-shiny-text.json"
npx shadcn@latest add "https://magicui.design/r/blur-fade.json"

# 5. Supporting packages
npm install framer-motion lucide-react
npm install @vercel/analytics @vercel/speed-insights
npm install react-hook-form zod @hookform/resolvers
npm install resend
npm install @next/mdx @mdx-js/loader @mdx-js/react
npm install rehype-highlight rehype-slug
npm install next-themes

# 6. Dev dependencies
npm install -D @types/node prettier prettier-plugin-tailwindcss
```

### 3.3 Folder structure

```
/src
├── /app
│   ├── layout.tsx              # Root layout with nav + footer
│   ├── page.tsx                # Home
│   ├── /services
│   │   └── page.tsx
│   ├── /work
│   │   ├── page.tsx            # Work grid
│   │   ├── /aphra/page.tsx     # or /[slug]/page.tsx with MDX
│   │   ├── /capwell/page.tsx
│   │   ├── /kcnl/page.tsx
│   │   ├── /tula/page.tsx
│   │   └── /medmatch/page.tsx
│   ├── /about/page.tsx
│   ├── /contact/page.tsx
│   ├── /blog
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── /api
│   │   └── contact/route.ts    # Form handler via Resend
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── opengraph-image.tsx     # Dynamic OG image
│   └── not-found.tsx           # 404
│
├── /components
│   ├── /ui                     # shadcn components
│   ├── /magicui                # MagicUI components
│   ├── /sections               # Page sections (Hero, LogoBar, etc)
│   │   ├── Hero.tsx
│   │   ├── LogoBar.tsx
│   │   ├── NumbersTicker.tsx
│   │   ├── ServicesGrid.tsx
│   │   ├── FeaturedWork.tsx
│   │   ├── ForFoundersEnterprise.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Process.tsx
│   │   └── FinalCTA.tsx
│   ├── /layout
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── /shared
│       ├── CaseStudyCard.tsx
│       ├── ServiceCard.tsx
│       └── TestimonialCard.tsx
│
├── /content
│   ├── /case-studies           # MDX files
│   └── /blog                   # MDX files
│
├── /lib
│   ├── siteConfig.ts           # Single source of truth for site metadata
│   ├── analytics.ts            # GA4 + Clarity helpers
│   └── utils.ts                # cn() etc
│
└── /public
    ├── /images
    │   ├── /work               # Case study covers
    │   ├── /team               # Team photos
    │   └── /og                 # Open Graph images
    └── /logos                  # Client logos (if you have SVGs)
```

### 3.4 Environment variables

Create `.env.local`:

```bash
# Analytics
NEXT_PUBLIC_GA_ID=G-2EH689YWQK              # existing
NEXT_PUBLIC_CLARITY_ID=                      # get from clarity.microsoft.com

# Email forwarding
RESEND_API_KEY=                              # get from resend.com
CONTACT_FORM_TO_EMAIL=miltech.haseeb@gmail.com
CONTACT_FORM_FROM_EMAIL=contact@codewithhaseeb.com

# Calendly
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/miltech-haseeb/30min  # set this up
```

---

## 4. Site Architecture

### 4.1 Routes

```
/                       Home
/services               Services overview
/work                   Case studies grid
/work/aphra             Individual case study
/work/capwell           Individual case study
/work/kcnl              Individual case study
/work/tula              Individual case study
/work/medmatch          Individual case study
/about                  About + team
/contact                Contact form + Calendly
/blog                   Blog index (scaffold only for v1)
/blog/[slug]            Blog post (scaffold)
/privacy                Privacy policy (minimal, boilerplate)
```

### 4.2 Navigation

**Primary nav (desktop):** Work, Services, About, Blog, Contact, [Book a Call]
**Mobile:** Hamburger → same items.

Book a Call button is always visible (desktop) and is the primary CTA.

### 4.3 URL conventions

- Trailing slashes: **off** (Next.js default).
- Canonical URLs: `https://codewithhaseeb.com/...`
- 301 redirects from old site paths (e.g., `/#scroll_contact` → `/contact`).

---

## 5. Home Page — Full Copy + Sections

### 5.1 Page metadata

```ts
export const metadata = {
  title: "AI Engineering Team for Funded Startups | codewithhaseeb",
  description: "We ship production AI systems — not demos that break. A 5-person senior engineering team building for YC-backed founders. Aphra (17K users). Capwell. Tula. Sony PlayStation.",
  openGraph: {
    images: ['/og/home.png'],
  },
}
```

### 5.2 Section-by-section

---

#### **SECTION 1: Floating pill navigation (fixed top)**

**Visual spec:**
- Pill-shaped (border-radius: 999px), dark fill (`#2B2D2D`), white text
- Floats 16px from top of viewport
- Centered horizontally
- Width: auto, around 600–800px on desktop
- Mobile: full-width pill with hamburger icon
- Contents left-to-right: Logo → nav items → CTA button
- On scroll: subtle backdrop blur appears behind it

**Contents:**

```
[C] codewithhaseeb   Work    Services    About    Blog    Contact    [Book a Call →]
```

- Logo: simple text mark "codewithhaseeb" in Inter Medium, or a monogram "CH" in a circle
- Nav items: Inter 14px, `#FFFFFF`, hover opacity 80%
- CTA: small pill button, accent purple (`#7C3AED`) fill, white text, `Book a Call →`

---

#### **SECTION 2: Hero**

**Visual spec:**
- Full-width section
- Background: `#F3F2F1` (warm off-white)
- Content max-width: 1280px, center aligned
- Padding: `pt-32 pb-24` (account for fixed nav)
- Two-column on desktop (55/45 split): text left, visual right
- Single column on mobile: text, then visual

**Left column content:**

```
Eyebrow (small label, above headline):
AI ENGINEERING · FOR FUNDED STARTUPS

Headline (Instrument Serif, 84px desktop / 52px mobile):
AI that runs in production —
not demos that break under load.

Subheadline (Inter, 18px, max-w-prose):
We build real AI systems for real users. A 5-person senior engineering team
shipping production AI for funded startups and SMBs.

17,000+ active users on Aphra. 500,000+ records managed at Capwell.
YC-backed Tula, $1.2M raised.

CTA group (2 buttons side by side):
[Book a free 30-min call →]  (primary, purple fill)
[See our work]               (secondary, ghost)

Trust strip below buttons (small row):
🟢 Taking on 1 new project this month  ·  Reply within 24h
```

**Right column content (the visual):**

Use MagicUI's `AnimatedBeam` to create a simple schematic:

```
  [Client]           [Your LLM]           [Output]
     |                    |                   |
     └──── AI Agent ───────────────────────────┘
              (animated beam flowing between)
```

With 3 node cards connected by animated beams. Labels inside each card:
- Left card: "CRM / WhatsApp / Call" (source)
- Middle card: "LangChain Agent" (with a subtle glow)
- Right card: "Closed Deal / Invoice / Task done" (outcome)

This visually tells the story of what you do. No stock photos.

Fallback for mobile: static illustration or skip the visual entirely (text works alone).

**Code notes for Haseeb:**
- Use `framer-motion` to stagger the headline words animating in (100ms between words)
- Trust strip green dot: animated pulse
- Buttons use shadcn `Button` with custom accent color

---

#### **SECTION 3: Logo bar / Social proof**

**Visual spec:**
- Sits directly below hero, no gap (flows naturally)
- Background: `#F7F7F7` (slightly darker than hero bg for subtle layering)
- Padding: `py-12`
- Single row, MagicUI Marquee component, slow scroll

**Content:**

Label above:
```
TRUSTED BY TEAMS AT
```
(Inter 12px, uppercase, tracked-wider, `#8C8C8C`)

Marquee row (client names as styled text, since most don't have usable logos):

```
Sony PlayStation  ·  Aphra.me  ·  Tula Transformation  ·  Capwell Comm  ·
KCNL.eu  ·  Bestinform.eu  ·  Medmatch  ·  FCS  ·  RGR Learning  ·  eXelerete
```

Style: Inter Medium 22px, `#666666`, with each name separated by a dot divider.

**Rules:**
- If you have any actual logos (Sony, etc.) use them at 24px height, desaturated, grayscale
- Otherwise styled text is fine — looks editorial, not cheap
- Marquee speed: 40s per full loop
- Pause on hover: yes

---

#### **SECTION 4: Numbers ticker**

**Visual spec:**
- Full-width
- Background: `#F3F2F1`
- Padding: `py-24`
- 4-column grid on desktop, 2×2 on mobile
- Each stat: number on top (huge), label below (small)

**Content:**

```
[17,000+]          [$4.2M+]         [120×]            [500K+]
Active users        Raised by        Faster data       Records managed
on Aphra.me         clients on       at Sony           at Capwell
                    our AI builds    PlayStation       (LangChain agent)
```

**Typography:**
- Numbers: Instrument Serif 72px, accent purple (`#7C3AED`)
- Labels: Inter 14px, `#666666`, max-w-[200px]
- Use MagicUI `NumberTicker` component for entrance animation (counts up when in view)

---

#### **SECTION 5: Services grid**

**Visual spec:**
- Full-width
- Background: `#F7F7F7`
- Padding: `py-24`
- Max content width: 1280px
- Section header + 3-column grid (1 column mobile)

**Section header:**

```
Eyebrow: WHAT WE BUILD

Headline (Instrument Serif, 48px):
Six things we do well — and the rest we politely decline.

Subhead (Inter 18px, muted):
We're specialists, not generalists. If it's not AI, automation, or senior
engineering, we'll refer you to someone better suited.
```

**Grid content (6 cards, 3×2 on desktop, 1 column mobile):**

Each card has:
- Small icon (Lucide React) in accent purple
- Title (Inter 20px, medium)
- Description (Inter 16px, muted)
- Hover effect: `MagicCard` spotlight follow-cursor

**Card 1: AI Product MVPs**
Icon: `Rocket`
```
Title: AI SaaS MVPs
Description: From Figma to live product in 6–10 weeks. We've shipped MVPs
now serving 17,000+ users. Full-stack: backend, frontend, AI, deployment.
```

**Card 2: AI Agents**
Icon: `Bot`
```
Title: AI Agents & Multi-Agent Systems
Description: LangChain, LangGraph, CrewAI. Autonomous agents that run for
hours. Our Capwell agent cut a 6-month manual job to 3 weeks.
```

**Card 3: Voice AI**
Icon: `Mic`
```
Title: Voice AI & Conversational Agents
Description: HIPAA-compliant, sub-second latency, sounds human enough to
close calls. Real-time STT/TTS pipelines in production.
```

**Card 4: LLM Cost Optimization**
Icon: `TrendingDown`
```
Title: LLM Cost Optimization
Description: Replaced a client's $100K/month LLM bill with a hybrid
open-source stack running at $1.5K/month. GDPR compliant, full audit trail.
```

**Card 5: AI Automation**
Icon: `Workflow`
```
Title: AI Workflow Automation
Description: GoHighLevel, HubSpot, WhatsApp Business, CRM integrations.
FCS runs an autonomous AI pipeline for 2,000+ active users and 68,000 leads.
```

**Card 6: Senior Full-Stack**
Icon: `Code2`
```
Title: Senior Full-Stack Engineering
Description: NextJS, Python, Node, Go. When you need a senior team that
can also ship the web app, not just the AI part. Sony PlayStation scale.
```

---

#### **SECTION 6: Featured work**

**Visual spec:**
- Full-width
- Background: `#F3F2F1`
- Padding: `py-24`
- Max content width: 1280px
- Section header + 3 featured cards (1 big, 2 small — or 3 equal)

**Section header:**

```
Eyebrow: FEATURED WORK

Headline:
Built for real users at real scale.

Subhead:
A few of the AI systems we've shipped that are running in production today.
```

Link on right side: `View all case studies →` → /work

**Featured cards (3, linking to /work/[slug]):**

Each card:
- Cover image (16:9 aspect ratio, rounded-xl)
- Client name (small label above title)
- Title (Instrument Serif 28px)
- 1-line description
- 3 stat pills at bottom
- On hover: subtle lift + image zoom 1.02×

**Card 1: Aphra.me**
```
Client: APHRA.ME
Title: Real-time AI video avatar serving 17,000+ users
Description: Built the entire AI backend, agents, and live voice pipeline.
Stats: [17K+ users] [<1s latency] [NextJS + Python]
```

**Card 2: Capwell Comm**
```
Client: CAPWELL COMMUNICATIONS
Title: Autonomous multi-agent system managing 500,000 records
Description: Replaced a 6-month manual process with an AI agent orchestrator.
Stats: [500K records] [6mo → 3wks] [LangChain]
```

**Card 3: KCNL.eu**
```
Client: KCNL.EU
Title: B2B invoice AI that saved a client $98.5K/month on LLM bills
Description: Hybrid open-source + fine-tuned models. GDPR compliant, audit trail.
Stats: [10K companies] [$100K→$1.5K/mo] [100K invoices/mo]
```

---

#### **SECTION 7: For Founders / For Enterprises split**

**Visual spec:**
- Full-width
- Background: `#F7F7F7`
- Padding: `py-24`
- Two-column (1:1), stacked on mobile
- Each column is a large card with its own visual

**Section header (above the split):**

```
Eyebrow: HOW WE WORK WITH YOU

Headline (Instrument Serif 48px):
Different buyers, different paths.
Same bar for what ships.
```

**Left column card: FOR FOUNDERS**

```
Label: FOR FUNDED STARTUPS
Headline: Your MVP, in production, in 6 weeks.

Body:
You've raised your round. Your AI product idea is validated. You need a
senior team that can ship real code fast — not a cheap freelancer who'll
waste 3 months on a broken demo.

Our founder track:
→ Week 1: Scoping, architecture, tech decisions
→ Week 2–5: Sprints with a working demo every Friday
→ Week 6: Launch-ready, deployed, monitored
→ 30 days of bug-fix support included

Typical engagement: $15K–$50K fixed-price, 6–10 weeks.

CTA: [See a founder case study →]   (links to /work/aphra or /work/tula)
```

Visual: small screenshot mockup of an AI chat interface on a device frame (use a gradient mockup, nothing too specific)

**Right column card: FOR SMBs**

```
Label: FOR SMB OPERATIONS
Headline: Replace weeks of manual work with AI that runs itself.

Body:
You have a manual process eating your team's time. Invoice processing.
Lead follow-up. Data aggregation. We build autonomous AI agents that
handle it end-to-end — with audit trails, cost controls, and compliance
built in from day one.

Our SMB track:
→ Audit your existing workflow in week 1
→ Build the agent in weeks 2–4
→ Shadow-mode rollout in week 5 (runs alongside human to verify)
→ Full cutover in week 6, ongoing support

Typical engagement: $8K–$25K fixed-price, 4–6 weeks.

CTA: [See an SMB case study →]   (links to /work/capwell)
```

Visual: a simple workflow diagram (before/after) showing manual process compressed to automated.

---

#### **SECTION 8: Testimonials**

**Visual spec:**
- Full-width
- Background: `#F3F2F1`
- Padding: `py-24`
- Section header + 3-card grid (1 column mobile)

**Section header:**

```
Eyebrow: WHAT CLIENTS SAY

Headline (Instrument Serif 48px):
Words from people who actually paid us.
```

**3 testimonial cards:**

Each card:
- Background: white (`#FFFFFF`)
- Border: 1px `#E6E6E6`
- Rounded: `rounded-xl`
- Padding: `p-8`
- Content: quote, attribution, small metadata

**Card 1:**
```
"Truly a genius! Would definitely work again."

— Voice AI healthcare client
  Jan 2026 · Real-time voice agent
```

**Card 2:**
```
"Muhammad is an absolute expert in his field. Humble and thoughtful —
an absolute pleasure to work with and his suggestions are spot-on!"

— AI Project Assistance client
  Jul 2024 · AI advisory
```

**Card 3:**
```
"He did an excellent job on our WhatsApp Flow project and delivered
results even better than what we originally had in mind."

— FGC Perfume Kuwait
  Feb 2026 · WhatsApp Business AI
```

Below the 3 cards, small line:
```
Based on 100% Job Success rate across 49 completed projects on Upwork.
[See all reviews →]  (links to Upwork profile)
```

---

#### **SECTION 9: Process**

**Visual spec:**
- Full-width
- Background: `#F7F7F7`
- Padding: `py-24`
- Section header + 5 numbered steps in horizontal row (vertical on mobile)

**Section header:**

```
Eyebrow: HOW WE WORK

Headline: A process that respects your time and budget.

Subhead: No scope-creep games. No surprise invoices. No ghosting.
```

**5 steps (numbered 01 through 05, connected by a horizontal line):**

```
01. FREE SCOPING CALL
30 minutes. We push back if we think the scope is wrong.
That's a feature, not a bug.

02. FIXED-MILESTONE PROPOSAL
Clear deliverables, realistic timelines, honest cost.
Nothing ambiguous in writing.

03. WEEKLY SPRINTS
Working demo every Friday. You approve before we move on.
You're never surprised.

04. DAILY UPDATES
Slack, Loom, or email — your call. We don't ghost.
You always know what's being built.

05. 30-DAY SUPPORT
Post-launch bug-fix window included on every project.
No extra invoice.
```

**Styling:**
- Each step number: Instrument Serif 48px, accent purple
- Step title: Inter Medium 14px, uppercase, tracked-wider
- Step body: Inter 16px, muted

---

#### **SECTION 10: Final CTA**

**Visual spec:**
- Full-width
- Background: `#2B2D2D` (dark, inverts the page for dramatic moment)
- Padding: `py-32`
- Center aligned
- Max content width: 800px

**Content:**

```
Eyebrow (accent purple): READY TO BUILD?

Headline (Instrument Serif 72px, white):
Let's see if we're a fit.

Subhead (Inter 18px, light gray):
30 minutes, free, zero pressure. We'll tell you honestly if we're the
right team — and if we're not, we'll tell you who is.

[Book a free scoping call →]    (large primary CTA, accent purple fill)

Below button, small row:
Reply within 24h · Taking on 1 new project this month · Remote (UTC+5)
```

---

#### **SECTION 11: Footer**

**Visual spec:**
- Full-width
- Background: `#1A1A1B` (slightly darker than section 10)
- Padding: `py-16`
- 4-column grid on desktop, stacked on mobile

**Content:**

**Column 1: Brand**
```
codewithhaseeb

Production AI for funded startups
and SMB operations.

Remote, UTC+5
Islamabad, Pakistan
```

**Column 2: Site**
```
SITE
→ Home
→ Work
→ Services
→ About
→ Contact
→ Blog
```

**Column 3: Work (highlighted case studies)**
```
FEATURED WORK
→ Aphra.me
→ Capwell Comm
→ KCNL.eu
→ Tula Transformation
→ All case studies
```

**Column 4: Elsewhere**
```
ELSEWHERE
→ LinkedIn
→ Upwork (100% JSS)
→ GitHub
→ Email
```

**Bottom bar (full width, above copyright):**

```
© 2026 codewithhaseeb. All rights reserved. · Privacy
```

---

## 6. Work / Case Studies Page

**URL:** `/work`
**Purpose:** Grid of all case studies.

### 6.1 Page metadata

```ts
export const metadata = {
  title: "Our Work — AI Systems in Production | codewithhaseeb",
  description: "Case studies from AI systems we've shipped: Aphra (17K users), Capwell (500K records), KCNL ($98.5K/mo saved), Tula ($1.2M raised), and more.",
}
```

### 6.2 Sections

**Hero** (short, `py-20`):
```
Eyebrow: OUR WORK

Headline (Instrument Serif 64px):
Every system on this page runs in production today.

Subhead:
No concept demos. No marketing mockups. Real clients, real users, real money.
```

**Grid of case studies** (6 cards, 2 columns desktop, 1 column mobile):

Card structure same as Home section 6 "Featured work" but showing all 6+ case studies:

1. Aphra.me
2. Capwell Comm
3. KCNL.eu
4. Tula Transformation
5. Medmatch
6. Sony PlayStation (if you want to feature it)
7. FCS / Full Credit Sweep
8. Bestinform.eu

**Bottom CTA block:**
```
Don't see your industry represented?
We've worked across fintech, healthcare, gaming, ed-tech, ecommerce, and
real estate. If you have a scoping question, we have 30 minutes for you.

[Book a free call →]
```

---

## 7. Individual Case Study Template

**URL:** `/work/[slug]` (e.g., `/work/aphra`, `/work/capwell`)
**Purpose:** Deep-linkable case studies you can share on LinkedIn, paste into proposals, rank in SEO.

### 7.1 Template structure

Each case study uses the same template. Content comes from MDX files.

### 7.2 Sections

**1. Hero** (`py-20`, full-width)
```
Eyebrow: APHRA.ME · AI PRODUCT  
[Or] Eyebrow: CAPWELL COMMUNICATIONS · AUTONOMOUS AGENT

Headline (Instrument Serif 64px):
[Project-specific headline — see per-project copy below]

Subhead:
[One sentence outcome]

Metadata row below:
Year: 2024–2025  ·  Industry: AI Consumer  ·  Stack: NextJS, Python, GCP
```

**2. Hero image** (16:9 full-width, `rounded-xl`)

Placeholder: a screenshot of the product, or a custom illustration.

**3. 4-column stat row**
```
[17,000+]  [Sub-second]   [Python + Next.js]   [Still running]
Active users  Latency       Stack                2026
```

**4. Overview section** (2-column: "The Client" | "The Challenge")
Max-width prose. Editorial feel.

**5. "What we built"** (full-width)
Describes the system. Use screenshots, diagrams, or embedded video.

**6. "Results"** (3-column pill cards)
Each card is a specific metric with a short explanation.

**7. Tech stack block** (detailed breakdown)
List out: frontend, backend, AI/ML, data, infra.

**8. Reflection / Lessons** (editorial paragraph)
1–2 paragraphs. What made this project interesting, hard, or unique.

**9. Client quote** (if available, else omit)

**10. Next case study** (CTA to related work)
```
Next case study →
[Capwell Comm: 500K records, autonomously]
```

**11. Final CTA** (same dark CTA as home)
```
Need something like this?
[Book a free call →]
```

### 7.3 Per-case-study copy

Full copy for each case study is in **`02-CASE-STUDIES.md`** (separate document — too long to include here).

---

## 8. Services Page

**URL:** `/services`

### 8.1 Page metadata
```ts
export const metadata = {
  title: "Services — AI Engineering | codewithhaseeb",
  description: "AI SaaS MVPs, custom AI agents, voice AI, LLM cost optimization, AI workflow automation, senior full-stack engineering. Fixed-price, 4–10 week engagements.",
}
```

### 8.2 Sections

**Hero:**
```
Eyebrow: SERVICES

Headline: Six things we do well — and nothing we don't.

Subhead: We price by outcome, not by hour. Scope is fixed before we start.
No surprise invoices.
```

**Detailed service cards** (one per service, each `py-16`):

For each of the 6 services listed on the home page, expand to a full section:

Example — **AI SaaS MVPs:**
```
Label: AI PRODUCT MVPs

Headline: From Figma to live product in 6–10 weeks.

Body (2 paragraphs):
You've raised your round. Your product is validated. Now you need a team
that can actually ship — not a contractor who'll burn 3 months on a demo
that doesn't work in production.

We take founders from design mockups to a live AI product. Backend, frontend,
AI integrations, deployment, observability — one accountable technical lead
and a 5-person senior team.

What's included:
→ Scoping call + technical architecture
→ Full-stack build with weekly demos
→ AI integration (LLM, agents, voice, RAG)
→ Deployment on AWS / GCP with CI/CD
→ 30 days of bug-fix support post-launch

Typical engagement:
$15,000 – $50,000 fixed-price · 6–10 weeks

Case studies:
→ Aphra.me — 17K users
→ Tula Transformation — $1.2M raised
→ KCNL.eu — 10K companies

[Start scoping this →]   (link to contact)
```

Repeat this pattern for: AI Agents, Voice AI, LLM Cost Optimization, AI Automation, Senior Full-Stack.

**Pricing anchor block** (between sections 4 and 5):
```
A note on pricing:

We don't do hourly for fixed-scope work. We price by outcome. You know the
cost, the deliverables, and the timeline before you send a dollar.

If you need ongoing AI engineering, we also offer retainer arrangements
($8K–$15K/month for a dedicated senior engineer on your team).
```

---

## 9. About Page

**URL:** `/about`

### 9.1 Page metadata
```ts
export const metadata = {
  title: "About — The codewithhaseeb Team",
  description: "A 5-person senior engineering team building production AI. Led by Muhammad Haseeb. Remote, UTC+5, trusted by YC-backed founders and enterprise clients.",
}
```

### 9.2 Sections

**Hero:**
```
Eyebrow: ABOUT

Headline (Instrument Serif 64px):
We're a 5-person team that treats "production-grade" as the default.

Subhead:
Led by Muhammad Haseeb. Based in Islamabad. Remote-first. UTC+5.
```

**Story section** (editorial, 2-column or centered prose):
```
Headline: How we got here.

Body:

We started as a solo engineering shop in 2020. Today we're five senior
engineers who've worked with Sony PlayStation, shipped an AI avatar platform
to 17,000 active users, built the AI behind a YC-backed therapy app, and
replaced a client's $100,000/month LLM bill with a stack that costs $1,500.

What connects the work isn't a tech stack. It's a philosophy: ship real
systems for real people, not demos that fall apart under load.

We take fewer clients than we could. We push back on bad ideas. We price by
outcome, not hours. And we've kept a 100% Job Success rate on Upwork across
49 completed projects — not because it's easy, but because we don't work
with clients we can't make successful.

If that's what you're looking for, let's talk.
```

**Team section** (if you want to include other team members — otherwise skip):

If you include it, 5 cards:
- Photo
- Name
- Role
- 1-line bio

Start with just Haseeb's card. Add team members later if comfortable.

**Principles section** (full-width, `py-24`, dark background):
```
Eyebrow: HOW WE WORK

Headline: Five principles we don't compromise on.

1. Ship in production or don't ship at all
Demos don't count. If it doesn't run under real load, it's not done.

2. Fixed scope, fixed price, fixed timeline
We commit to outcomes in writing before you pay. No scope-creep games.

3. Honest scoping, even when it loses us the deal
If your problem doesn't need AI, we'll tell you. If another team is a
better fit, we'll say that too.

4. Push back on bad ideas
The worst AI projects aren't technical failures — they're scoping failures.
We'd rather argue for 30 minutes than build the wrong thing for 8 weeks.

5. One accountable lead
You don't get shuffled between junior devs. One senior engineer owns your
project from scoping through launch, with the team behind them.
```

**Final CTA** (same dark CTA as home).

---

## 10. Contact Page

**URL:** `/contact`

### 10.1 Page metadata
```ts
export const metadata = {
  title: "Book a Call — codewithhaseeb",
  description: "Free 30-minute scoping call. Tell us what you're building, we'll tell you honestly if we're the right team.",
}
```

### 10.2 Sections

**Hero + two-column layout below:**

```
Headline (Instrument Serif 64px):
30 minutes, free, zero pressure.

Subhead:
Tell us what you're building. We'll tell you honestly if we're a fit —
and if we're not, we'll tell you who is.
```

**Left column: Calendly embed**

Embed your Calendly page (set up `calendly.com/miltech-haseeb/30min`):

```html
<div class="calendly-inline-widget" 
     data-url="https://calendly.com/miltech-haseeb/30min?hide_event_type_details=1"
     style="min-width:320px;height:700px;">
</div>
```

**Right column: "Or send a message"**

Simple form (React Hook Form + Zod):
```
Name:       [input]
Email:      [input]
Company:    [input (optional)]
What are you building?: [textarea]

[Send message →]
```

On submit: POST to `/api/contact` → Resend sends to your email → success toast.

Below form:
```
Prefer email? miltech.haseeb@gmail.com
Prefer LinkedIn? linkedin.com/in/haseeb-ai
Prefer WhatsApp? +92 314 3543 422
```

**FAQ section below (common objections):**

```
Eyebrow: COMMON QUESTIONS

Headline: Before you book, a few things to know.
```

Accordion with 6 items:

1. **How quickly can you start?**
   Usually 1–3 weeks out. We take on one new project per month to keep quality high.

2. **Do you work with clients outside US hours?**
   Yes — we're UTC+5 (Islamabad). We have 3–5 hours of US East Coast overlap
   and typical 24-hour turnaround on async work.

3. **What's your minimum project size?**
   Typically $5,000. Smaller one-off consultations available at $150–$300 per
   30-minute call.

4. **Can we see more case studies?**
   Yes — `/work` has all eight. Some work is under NDA and we can share
   sanitized details on a call.

5. **Do you sign NDAs?**
   Yes, standard practice. We'll sign yours or use our template.

6. **How do you price?**
   Fixed-price for fixed-scope work. Hourly ($70–$85/hr via Upwork) for
   ongoing work or advisory. Retainers ($8K–$15K/mo) for dedicated resources.

---

## 11. Blog Page (Scaffold)

**URL:** `/blog`
**Purpose:** Empty for v1. Just scaffold the page so it exists.

### 11.1 Hero
```
Eyebrow: NOTES

Headline: Thoughts on building production AI.

Subhead: Mostly about agents, cost, and the gap between demos and real systems.
```

### 11.2 State for v1

```
"Writing a few first pieces. Come back soon — or subscribe to know when
we post."

[email input] [Subscribe]
```

(Email subscription: skip for v1. Can add later via Beehiiv or ConvertKit.)

---

## 12. Global — Navigation + Footer

Already specified in Section 5.1 (nav) and Section 5.11 (footer). Consistent across all pages.

---

## 13. Components Inventory

Components to build (in order of dependency):

### Core UI (shadcn, already installed)
- Button
- Card
- Badge
- Input, Textarea, Label
- Accordion
- Dialog
- NavigationMenu

### Layout
- `Navbar.tsx` — the floating pill nav
- `Footer.tsx` — 4-column footer
- `Container.tsx` — `max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12`
- `Section.tsx` — handles consistent py spacing + bg color variants

### Sections (per page)
- `Hero.tsx`
- `LogoBar.tsx` (uses Marquee)
- `NumbersTicker.tsx` (uses NumberTicker)
- `ServicesGrid.tsx`
- `FeaturedWork.tsx`
- `ForFoundersEnterprise.tsx`
- `Testimonials.tsx`
- `Process.tsx`
- `FinalCTA.tsx`

### Shared
- `CaseStudyCard.tsx`
- `ServiceCard.tsx` (uses MagicCard)
- `TestimonialCard.tsx`
- `StatPill.tsx`

### Page-specific
- `CaseStudyTemplate.tsx` (for /work/[slug] pages)
- `ContactForm.tsx`
- `CalendlyEmbed.tsx`

---

## 14. SEO + Metadata Spec

### 14.1 Per-page metadata

Every page must have:
- `<title>` — unique, under 60 chars, includes primary keyword
- `<meta name="description">` — under 160 chars, includes CTA
- `<meta property="og:title">` — same as title
- `<meta property="og:description">` — same as description
- `<meta property="og:image">` — unique per page (use Next.js `opengraph-image.tsx`)
- `<link rel="canonical">` — absolute URL

### 14.2 Structured data (JSON-LD)

Add to root layout:

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "codewithhaseeb",
  "description": "AI engineering team for funded startups",
  "url": "https://codewithhaseeb.com",
  "founder": {
    "@type": "Person",
    "name": "Muhammad Haseeb"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Islamabad",
    "addressCountry": "PK"
  }
}
```

### 14.3 Sitemap

Generate `/sitemap.xml` via Next.js `sitemap.ts`. Include all static routes.

### 14.4 robots.txt

```
User-agent: *
Allow: /
Sitemap: https://codewithhaseeb.com/sitemap.xml
```

### 14.5 Target keywords (for content optimization)

Primary:
- "AI engineering agency"
- "hire AI developer"
- "langchain agent developer"
- "AI product development"

Secondary:
- "LLM cost optimization"
- "voice AI developer"
- "AI SaaS MVP development"
- "production AI engineer"

---

## 15. Analytics + Tracking

### 15.1 What to track

Events to fire in GA4:

| Event name | Trigger |
|---|---|
| `book_call_click` | Any "Book a Call" button click |
| `contact_form_submit` | Contact form submission |
| `whatsapp_click` | WhatsApp link click |
| `email_click` | Email link click |
| `case_study_view` | Any /work/[slug] page view |
| `case_study_outbound` | Click on live URL inside case study |
| `upwork_profile_click` | Upwork link in footer |
| `linkedin_profile_click` | LinkedIn link |
| `scroll_50` | User scrolls 50% of page |
| `scroll_90` | User scrolls 90% of page |

### 15.2 Implementation

```ts
// lib/analytics.ts
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  // GA4
  (window as any).gtag?.('event', name, params ?? {});
  // Clarity
  (window as any).clarity?.('event', name);
}
```

Wire up all CTAs with `onClick={() => trackEvent('book_call_click', { location: 'hero' })}` etc.

### 15.3 Microsoft Clarity

1. Create free account at `clarity.microsoft.com`
2. Add the project, get the Clarity ID
3. Drop the script in root layout (or via Next.js `<Script>`)

### 15.4 Vercel Analytics + Speed Insights

```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

Free, zero-config. Gives you real-user metrics.

---

## 16. Performance Budget

| Metric | Target | Tool |
|---|---|---|
| Lighthouse Performance | ≥ 95 | Chrome DevTools |
| Lighthouse Accessibility | ≥ 95 | Chrome DevTools |
| Lighthouse SEO | = 100 | Chrome DevTools |
| LCP (Largest Contentful Paint) | < 1.8s | Vercel Speed Insights |
| CLS (Cumulative Layout Shift) | < 0.05 | Vercel Speed Insights |
| FID / INP | < 100ms | Vercel Speed Insights |
| Initial JS bundle | < 150KB gzip | Next.js build output |
| Total page weight | < 500KB (home) | Browser DevTools Network tab |

**Rules:**
- Use `next/image` for all images, always with `priority` on hero image and `loading="lazy"` elsewhere
- Use `next/font` for font loading — no external font requests
- Dynamic import MagicUI animated components so they don't block first paint
- No third-party JS except: GA4, Clarity, Vercel Analytics (all small)

---

## 17. 7-Day Build Sprint Plan

### Day 1 — Foundation
- [ ] Create Next.js project with setup commands from section 3.2
- [ ] Configure Tailwind with color/font tokens from section 2
- [ ] Install Inter + Instrument Serif via `next/font/google`
- [ ] Build Navbar + Footer components
- [ ] Set up root layout with Analytics
- [ ] Deploy blank site to Vercel, point codewithhaseeb.com to it

### Day 2 — Home page (above fold)
- [ ] Hero section with copy + AnimatedBeam visual
- [ ] LogoBar with Marquee
- [ ] NumbersTicker section
- [ ] Responsive test on mobile / tablet / desktop

### Day 3 — Home page (below fold)
- [ ] ServicesGrid (6 cards with MagicCard hover)
- [ ] FeaturedWork (3 case study cards)
- [ ] ForFoundersEnterprise split section

### Day 4 — Home page + Work grid
- [ ] Testimonials section
- [ ] Process section (5 steps)
- [ ] FinalCTA (dark)
- [ ] /work page with grid of case study cards

### Day 5 — Individual case study pages
- [ ] Build CaseStudyTemplate component
- [ ] Write all 6 case study MDX files (or use content from `02-CASE-STUDIES.md`)
- [ ] Configure MDX pipeline
- [ ] Test a few case studies render correctly

### Day 6 — Remaining pages
- [ ] /services page
- [ ] /about page
- [ ] /contact page with Calendly embed + form
- [ ] /blog scaffold
- [ ] /privacy (boilerplate)

### Day 7 — Launch prep
- [ ] Wire up all GA4 events (section 15.1)
- [ ] Install Microsoft Clarity
- [ ] Generate OG images
- [ ] Write sitemap.ts + robots.ts
- [ ] Lighthouse audit — fix anything under 95
- [ ] Mobile QA pass
- [ ] Point DNS to Vercel deployment
- [ ] Test every CTA end-to-end
- [ ] Announce launch (LinkedIn post, update Upwork bio, email existing clients)

---

## 18. Launch Checklist

Before switching DNS:

- [ ] Every page has unique `<title>` and meta description
- [ ] Every page has Open Graph image
- [ ] Every CTA button fires a GA4 event
- [ ] Contact form successfully sends email via Resend (test it)
- [ ] Calendly embed loads and booking flow works end-to-end
- [ ] 404 page exists (`app/not-found.tsx`)
- [ ] Sitemap at /sitemap.xml returns valid XML
- [ ] robots.txt allows indexing
- [ ] No console errors on any page
- [ ] Images all use `next/image` with proper alt text
- [ ] All case study outbound links work (Aphra.me, etc.)
- [ ] Privacy page exists
- [ ] Mobile passes Lighthouse 90+ on all categories
- [ ] Desktop passes Lighthouse 95+ on all categories
- [ ] Dark mode: skipped for v1 (documented)
- [ ] Redirects from old URLs set up (`/#scroll_contact` → `/contact`, etc.)

After launching:

- [ ] Verify GA4 events firing in Realtime view
- [ ] Verify Microsoft Clarity recording sessions
- [ ] Submit sitemap to Google Search Console
- [ ] Update LinkedIn profile with new URL
- [ ] Update Upwork bio with new URL
- [ ] Post on LinkedIn about the launch (case study of the launch itself)
- [ ] Email past 10 clients with the new site link
- [ ] Screenshot old site for the "before" archive

---

## End of Build Spec

**Related documents in this folder:**
- `02-CASE-STUDIES.md` — full copy for each individual case study page
- `03-COMPONENTS-CODE.md` — actual React/TSX component code for you to paste
- `04-ASSETS-NEEDED.md` — list of images, logos, screenshots, and team photos required

If you hit a decision that isn't covered here, default to:
1. Match Finns' aesthetic (warm bg, serif display, soft radius)
2. Keep it fast (no JS that blocks first paint)
3. Write like a senior engineer (no marketing fluff, no emoji, no buzzwords)
4. Keep the voice close to the Upwork profile voice (direct, specific, verifiable)

— End —
