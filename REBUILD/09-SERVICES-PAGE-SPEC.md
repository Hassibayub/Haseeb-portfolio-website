# 09. Services Page Specification

**URL:** `/services`
**Status:** Detailed spec. Implement after Tasks 1-6 of the soul fix, as part of Task 7 (missing pages).
**Design language:** Finns-reference. Surface alternation (`#F3F2F1` cream + `#1D2020` charcoal). Lime `#D8F9B8` signature. No em dashes. No arrow glyphs. No lucide-in-pastel-squares. Tabler Icons in white chips.

---

## 0. Purpose of this page

The home page's `ServicesGrid` is a 6-card bento teaser. It answers "what do you do?" in 10 seconds.

`/services` is the **sales deep-dive**. It answers:

1. What exactly do I get if I hire you for X?
2. How much does it cost and how long does it take?
3. What proof exists that you've shipped this before?
4. How do you price it and what's included?

This page exists for two visitor types:

- **Founder / exec evaluating fit** after scanning home. They want detail, not more marketing.
- **Returning visitor pasted a deep link** from an email, proposal, or Upwork reply. They arrive directly on `/services` with intent.

Success = visitor books a call or requests a proposal. Secondary = they read at least 2 service blocks and 1 case study excerpt.

---

## 1. Scope decision: what's in vs. cut

### Keep from the old site (`index.html`, lines 744-902)

The old Bootstrap site listed **9 services**. Most are irrelevant now. Keep only the modern, production-grade positioning:

| Old service | Fate | Why |
|---|---|---|
| AI & Machine Learning | **Merge into AI SaaS MVPs + AI Agents** | Too broad. Fragment into specific offers. |
| Full-Stack Development | **Keep as "Senior Full-Stack Engineering"** | Still a high-value offer, anchored to Sony. |
| Computer Vision | **Cut from services. Move to "Also capable of" strip.** | Not a lead-gen offer anymore. |
| Web Scraping & Automation | **Cut. Move to capabilities strip.** | Commodity on Upwork. Wrong signal. |
| Cloud & DevOps | **Cut as standalone. Fold into every delivery.** | It's table stakes, not a product. |
| Data Science & Analytics | **Cut. Fold into AI SaaS MVPs when relevant.** | Generic. Not differentiated. |
| AI Chatbots & Voice Assistants | **Keep as "Voice AI & Conversational Agents"** | Strong, specific, HIPAA-ready angle. |
| Embedded Systems | **Cut entirely.** | Off-positioning for AI engineering team. |
| Graphics (Hobbyist) | **Cut. Removes an unserious signal.** | Contradicts senior positioning. |

Net: **9 services reduced to 6 sharp offers**, already aligned with `siteConfig.services`.

### The 6 offers (same order as home page bento)

1. **AI SaaS MVPs** (flagship, widest card on home)
2. **AI Agents & Multi-Agent Systems**
3. **Voice AI & Conversational Agents**
4. **LLM Cost Optimization**
5. **AI Workflow Automation** (wide card on home)
6. **Senior Full-Stack Engineering**

### Additional page sections

7. **Pricing philosophy** (dark panel between service 3 and 4)
8. **Also capable of** (quiet capabilities strip, demotes old-site services)
9. **FAQ** (5 questions, accordion)
10. **Closing CTA** (matches `FinalCTA` pattern, lime button)

---

## 2. Page metadata

```ts
// src/app/services/page.tsx
export const metadata = {
  title: 'Services. AI engineering built to ship. | codewithhaseeb',
  description:
    'Six sharp offers: AI SaaS MVPs, AI agents, voice AI, LLM cost optimization, AI automation, and senior full-stack. Fixed-price, 4 to 10 week engagements.',
  openGraph: {
    title: 'Services. AI engineering built to ship.',
    description:
      'Six sharp offers. Fixed-price. 4 to 10 week engagements. Trusted by YC-backed founders.',
    images: ['/og/services.png'],
    type: 'website',
  },
  alternates: { canonical: 'https://codewithhaseeb.com/services' },
};
```

OG image: `src/app/services/opengraph-image.tsx` (Next 13+ route convention, matches home).

---

## 3. Layout system (Finns-aligned)

### Page shell

```tsx
<main>
  <ServicesHero />                    {/* light cream */}
  <ServiceBlock service={s[0]} />     {/* alternating */}
  <ServiceBlock service={s[1]} />
  <ServiceBlock service={s[2]} />
  <PricingPhilosophy />               {/* dark */}
  <ServiceBlock service={s[3]} />
  <ServiceBlock service={s[4]} />
  <ServiceBlock service={s[5]} />
  <AlsoCapableOf />                   {/* light, subtle */}
  <ServicesFAQ />                     {/* light */}
  <FinalCTA />                        {/* dark, lime CTA */}
</main>
```

### Surface alternation (strict)

| Section | Surface | BG | Text |
|---|---|---|---|
| ServicesHero | light | `#F3F2F1` | `#1D2020` |
| Service 1 (MVPs) | light | `#FFFFFF` | `#1D2020` |
| Service 2 (Agents) | cream | `#F3F2F1` | `#1D2020` |
| Service 3 (Voice) | light | `#FFFFFF` | `#1D2020` |
| PricingPhilosophy | **dark** | `#1D2020` | `#F3F2F1` |
| Service 4 (LLM cost) | light | `#FFFFFF` | `#1D2020` |
| Service 5 (Automation) | cream | `#F3F2F1` | `#1D2020` |
| Service 6 (Full-stack) | light | `#FFFFFF` | `#1D2020` |
| AlsoCapableOf | cream | `#F3F2F1` | `#1D2020` |
| ServicesFAQ | light | `#FFFFFF` | `#1D2020` |
| FinalCTA | **dark** | `#1D2020` | `#F3F2F1` |

Never two identical backgrounds in a row. This is the Finns rhythm.

### Spacing

- Hero: `pt-[160px] pb-[120px]` on desktop, `pt-[96px] pb-[72px]` mobile.
- ServiceBlock: `py-[120px]` desktop, `py-[72px]` mobile.
- PricingPhilosophy: `py-[140px]` desktop, `py-[88px]` mobile (heaviest).
- AlsoCapableOf: `py-[96px]` desktop, `py-[56px]` mobile (quieter).
- ServicesFAQ: `py-[120px]`.
- FinalCTA: `py-[160px]` (page closer).

### Container

Use existing `container-tight` (max-w-[1200px], px-6 md:px-10). Do not introduce a new container width.

---

## 4. Section-by-section specs

### 4.1 ServicesHero

**Surface:** cream `#F3F2F1`.

**Layout:** Single-column, left-aligned. Trace panel on right on desktop (reuses home hero pattern, lighter variant).

**Content:**

```
Eyebrow (IBM Plex Mono, 12px, tracking 0.08em, lowercase, #8C8C8C):
  services / v3.2

Headline (Bricolage Grotesque, clamp(48px, 7vw, 88px), weight 500, tracking -0.02em):
  Six offers. No filler. Fixed price.

Subhead (Bricolage Grotesque, 20px, leading 1.5, #5A5C5C, max-width 640px):
  We price by outcome, not by hour. Scope is locked before we start.
  No surprise invoices. No scope creep dressed up as "discovery."

Primary CTA (lime #D8F9B8 pill, #1D2020 text, 48px height):
  Book a scoping call

Secondary (text link, #6D5EF3):
  See pricing philosophy
```

No em dashes. No arrow glyphs in button copy. The `"` in `"discovery"` is fine.

**Right panel (desktop ≥1024px):** a trace panel mirroring the home hero but with services-specific stats:

```
[cs_02 / services.codewithhaseeb.com]
● live

engagement_types   6
min_price          $8,000
max_price          $50,000
avg_duration       6.5 weeks
clients_2024       14
job_success        100%

[pulse dot, lime]
```

Same component contract as home trace panel. Just different data. Do not duplicate code. Extract `TracePanel` into `src/components/ui/trace-panel.tsx` with a `rows` prop.

### 4.2 ServiceBlock (the repeating unit, 6 instances)

This is the meat of the page. One section per service. Each is a 12-column grid on desktop, stacked on mobile.

**Grid:**

```
Desktop (≥1024px):
[ col 1-5: meta column ][ col 6: gutter ][ col 7-12: body column ]

Tablet (768-1023px):
[ col 1-4: meta ][ col 5-8: body ]  (tighter)

Mobile (<768px):
stacked, meta first, then body
```

**Meta column (left):**

1. Icon chip. 64px × 64px. `#FFFFFF` bg. `1px solid #E7E6E4`. 16px radius. Tabler icon 32px, stroke 1.5, `#1D2020`. This is 2x the home card icon chip (home is 40px) to match the larger scale.
2. Eyebrow: `{service.slug.toUpperCase().replace('-', ' ')}` in IBM Plex Mono 12px, tracking 0.08em, `#8C8C8C`. Example: `AI SAAS MVPS`.
3. Headline (Bricolage 48-56px, weight 500, tracking -0.02em, `#1D2020`): from spec below.
4. Short positioning line (Bricolage 18px, `#5A5C5C`, max 420px): one sentence.

**Body column (right):**

1. Two-paragraph intro (16px, leading 1.65, `#1D2020`).
2. **What's included** list (see below).
3. **Typical engagement** stat block (mono, 3 data points).
4. **Proof** strip (1 to 3 case study chips, link to `/work/[slug]`).
5. CTA pair: primary "Start scoping this" (lime) + secondary "See related work" (text link).

**"What's included" list pattern** (replaces old site's arrow-bullet style):

```tsx
<ul className="space-y-4">
  {items.map((item) => (
    <li key={item} className="flex gap-4">
      <span
        aria-hidden
        className="mt-[9px] shrink-0"
        style={{
          width: 6,
          height: 6,
          borderRadius: 999,
          backgroundColor: '#D8F9B8',
        }}
      />
      <span className="text-[16px] leading-[1.65]" style={{ color: '#1D2020' }}>
        {item}
      </span>
    </li>
  ))}
</ul>
```

Lime dot bullet. No `→`. No bullet glyph. No emoji.

**"Typical engagement" block:**

```tsx
<div
  className="mt-8 inline-flex flex-col gap-1 px-5 py-4"
  style={{
    backgroundColor: '#F3F2F1',
    border: '1px solid #E7E6E4',
    borderRadius: 12,
  }}
>
  <span className="text-label" style={{ color: '#8C8C8C' }}>
    typical_engagement
  </span>
  <span className="font-mono text-[15px]" style={{ color: '#1D2020' }}>
    $15,000 to $50,000 fixed · 6 to 10 weeks
  </span>
</div>
```

Uses "to" not "-". The `·` separator is fine (not an em dash).

**"Proof" strip:** 1-3 `<ProofChip>` linked to `/work/{slug}`.

```tsx
<div className="mt-6 flex flex-wrap gap-2">
  <Link href="/work/aphra"
    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
    style={{ backgroundColor: '#FFFFFF', border: '1px solid #E7E6E4' }}>
    <span className="text-[12px] font-mono" style={{ color: '#5A5C5C' }}>
      aphra.me
    </span>
    <span className="text-[12px]" style={{ color: '#1D2020' }}>
      17K users
    </span>
  </Link>
  {/* repeat */}
</div>
```

### 4.3 The 6 service block contents

#### Service 1. AI SaaS MVPs

- Icon: `IconRocket` (Tabler).
- Eyebrow: `AI SAAS MVPS`
- Headline: **Figma to live product in 6 to 10 weeks.**
- Positioning line: For founders who've raised and need to ship, not demo.
- Body:

  > You've closed your round. Your product is validated. What you need now is a team that actually ships to production. Not a contractor who burns three months on a demo that falls apart under load.
  >
  > We take founders from design mockups to a live AI product: backend, frontend, AI integrations, deployment, observability. One accountable technical lead. A five-person senior team. Working demo every Friday.

- What's included:
  - Architecture call and technical scoping document
  - Full-stack build (Next.js, Python, Node)
  - AI integration (LLM, agents, voice, RAG)
  - Production deployment on AWS or GCP with CI/CD
  - Observability, logs, error tracking
  - 30 days of bug-fix support post-launch

- Typical engagement: `$15,000 to $50,000 fixed · 6 to 10 weeks`
- Proof chips: `aphra.me · 17K users`, `tula · $1.2M raised`, `kcnl · 10K companies`

#### Service 2. AI Agents & Multi-Agent Systems

- Icon: `IconRobot`.
- Eyebrow: `AI AGENTS`
- Headline: **Agents that run for hours, not demos that run for minutes.**
- Positioning line: LangChain, LangGraph, CrewAI. Production orchestration, not toy loops.
- Body:

  > Most "AI agent" projects fail because they're demos dressed up as systems. Three prompts, a vector store, a screenshot for the pitch deck. Nothing that survives first contact with real data or real users.
  >
  > We build agents that run autonomously for hours, tolerate failure, and report back with receipts. Structured tool use. Retry and fallback logic. Observability. Clear stop conditions. The Capwell agent replaced a six-month manual research job with a three-week autonomous run.

- What's included:
  - Agent architecture (single or multi-agent) with explicit stop conditions
  - Tool integration (search, DB, APIs, code execution)
  - Structured output (JSON schema, guardrails)
  - Observability (LangSmith, tracing, cost tracking)
  - Failure modes and retry strategy, documented
  - Integration into your existing product or pipeline

- Typical engagement: `$12,000 to $35,000 fixed · 4 to 8 weeks`
- Proof chips: `capwell · 6mo to 3wk`, `kcnl · 10K companies crawled`

#### Service 3. Voice AI & Conversational Agents

- Icon: `IconMicrophone`.
- Eyebrow: `VOICE AI`
- Headline: **Voice agents that close calls, not end them.**
- Positioning line: HIPAA-compliant. Sub-second latency. Sounds human enough to work.
- Body:

  > Most voice bots fail because latency kills the illusion. A 2.5 second pause after the user speaks and they know. Once they know, they're done.
  >
  > We build real-time speech pipelines that hold sub-second turn latency end to end. STT, LLM, TTS, telephony. HIPAA-compliant deployments for healthcare. Observability on every call. We've shipped voice agents that qualify leads, book appointments, and handle tier-1 support without escalation.

- What's included:
  - Low-latency STT to LLM to TTS pipeline (Deepgram, ElevenLabs, OpenAI)
  - Telephony integration (Twilio, Vonage) or web SDK
  - HIPAA-ready deployment if required
  - Conversation state, interruption handling, barge-in
  - Call logs, transcripts, analytics
  - QA harness and voice quality testing

- Typical engagement: `$10,000 to $30,000 fixed · 4 to 8 weeks`
- Proof chips: `tula · 2.4K calls`, `fcs · 68K leads handled`

---

### 4.4 PricingPhilosophy (dark interstitial)

**Surface:** dark `#1D2020`, cream text.

**Layout:** Centered, max-width 860px, generous vertical padding `py-[140px]`.

**Content:**

```
Eyebrow (IBM Plex Mono 12px, tracking 0.08em, #A6A6A6):
  note on pricing

Headline (Bricolage 56px, weight 500, #F3F2F1, tracking -0.02em):
  We don't do hourly for fixed-scope work.

Body (Bricolage 20px, leading 1.5, #C4C4C4):
  You know the cost, the deliverables, and the timeline before you send
  a dollar. Milestones are written, invoiced, and paid on delivery.

  Scope creep is a planning failure, not a billing event. If scope genuinely
  changes, we write a change order. Everything stays on one page you can
  read in two minutes.

  If you need ongoing AI engineering, we also offer retainer arrangements
  from $8,000 to $15,000 per month for a dedicated senior engineer
  embedded in your team.

[Inline stat row, 3 cols, mono 14px, 1px #3A3A3A border, rounded 12, padded]:
  [ fixed_price_projects ]  [ 93% ]
  [ scope_disputes_2024 ]   [ 0 ]
  [ avg_overrun ]           [ 0 weeks ]
```

No arrow. No em dash. The `%` and `$` are fine.

### 4.5 Service 4. LLM Cost Optimization

- Surface: light `#FFFFFF`.
- Icon: `IconBolt`.
- Eyebrow: `LLM COST OPTIMIZATION`
- Headline: **We cut a $100K per month LLM bill to $1,500.**
- Positioning line: Hybrid stacks. Open-source models where they win. Audit trail for every token.
- Body:

  > LLM bills balloon because teams default to the most expensive model for every task. A $0.06 per request call when a $0.0004 call would do. Multiply by a million requests per month and the bill runs the company.
  >
  > We audit your stack, build a hybrid pipeline (frontier model for hard tasks, open-source for the 80% that don't need it), and route traffic by task. One GDPR-compliant client went from $100K per month to $1.5K per month with full audit trail and improved latency.

- What's included:
  - Full stack audit and per-request cost breakdown
  - Task classification and routing layer (hard vs. easy requests)
  - Open-source model deployment (Llama, Qwen, or Mistral) on your infra
  - Caching, prompt compression, and streaming optimization
  - GDPR, SOC 2, or HIPAA compliance review if required
  - Before and after cost dashboard

- Typical engagement: `$8,000 to $25,000 fixed · 3 to 6 weeks`
- Proof chips: `client_redacted · $100K → $1.5K`, `kcnl · 70% latency cut`

### 4.6 Service 5. AI Workflow Automation

- Surface: cream `#F3F2F1`.
- Icon: `IconChartDots3` (reuse from home).
- Eyebrow: `AI WORKFLOW AUTOMATION`
- Headline: **Pipelines that run your business while you sleep.**
- Positioning line: GoHighLevel, HubSpot, WhatsApp, CRM integrations. End-to-end, not Zapier-fragile.
- Body:

  > Most automation breaks the first time a field changes upstream. Zapier chains fall over. Teams go back to doing the work by hand and pretend the automation still works.
  >
  > We build automation that's audited, versioned, monitored, and maintained. Lead enrichment, qualification, CRM writes, customer messaging, internal ops. FCS runs an autonomous pipeline handling 2,000+ users and 68,000 leads with no human in the loop.

- What's included:
  - Workflow design (swim-lane diagram, failure modes mapped)
  - Integration layer (CRM, messaging, storage, internal APIs)
  - AI components (classification, extraction, generation)
  - Error handling, alerting, and retry logic
  - Admin dashboard and audit logs
  - Handoff doc and team training

- Typical engagement: `$10,000 to $30,000 fixed · 4 to 8 weeks`
- Proof chips: `fcs · 68K leads`, `client_redacted · 2K users automated`

### 4.7 Service 6. Senior Full-Stack Engineering

- Surface: light `#FFFFFF`.
- Icon: `IconCode` (reuse from home).
- Eyebrow: `SENIOR FULL-STACK`
- Headline: **The senior team you hire when the AI part isn't the whole job.**
- Positioning line: Next.js, Python, Node, Go. PlayStation-scale experience. The app around the AI, done right.
- Body:

  > AI features don't ship by themselves. They live inside a product with auth, billing, dashboards, roles, notifications, and reliability SLAs. That product has to be built and maintained by people who've done it before.
  >
  > We've shipped web at PlayStation scale and SaaS products to 17,000 active users. When your AI work needs a senior team around it (or when you just need senior engineering without the AI label) we're a fit.

- What's included:
  - Product architecture and tech selection
  - Next.js, Python, Node, or Go implementation
  - Auth, billing, RBAC, multi-tenancy
  - Admin, dashboards, analytics, webhooks
  - CI/CD, infra, monitoring, on-call runbook
  - Documentation and team handoff

- Typical engagement: `$15,000 to $50,000 fixed · 6 to 12 weeks` or retainer
- Proof chips: `aphra · 17K users`, `sony · enterprise scale`, `kcnl · 10K companies`

---

### 4.8 AlsoCapableOf (quiet capabilities strip)

**Surface:** cream `#F3F2F1`, `py-[96px]`.

**Purpose:** capture intent from visitors searching for the old-site services (scraping, computer vision, data) without cluttering the 6 offers. Signals depth without promising a product.

**Layout:** Single row of chips, labeled, muted styling.

```
Eyebrow (IBM Plex Mono 12px, #8C8C8C):
  also capable of

Headline (Bricolage 32px, #1D2020, max-width 720px):
  If you need one of these for a project we're already scoping, say so.
  Standalone engagements in these areas go through a referral partner.

[Chips row, 12px font, #1D2020 text, #FFFFFF bg, 1px #E7E6E4 border, 8px radius, px-3 py-1.5]:

  Computer vision (YOLO, segmentation)
  Web scraping (Scrapy, Playwright, anti-bot)
  Data engineering (ETL, dashboards, BI)
  Cloud and DevOps (AWS, GCP, Kubernetes)
  API design (REST, GraphQL, gRPC)
```

This section is explicitly demoted. Small type. No CTA. Just a signal: "we're not narrow, but these aren't our lead offers."

### 4.9 ServicesFAQ

**Surface:** light `#FFFFFF`, `py-[120px]`.

**Layout:** Two-column on desktop (left: heading + intro, right: accordion). Single-column on mobile.

**Heading (left column):**

```
Eyebrow: frequently asked

Headline (Bricolage 48px, weight 500):
  Five things founders ask before they sign.

Body (18px, #5A5C5C):
  If you have a question that isn't here, email
  haseeb@codewithhaseeb.com. A human replies within a business day.
```

**Accordion (right column):** use shadcn `Accordion` component. 5 items.

1. **What does "fixed price" actually cover?**
   > Everything scoped in the proposal. Scope is written down, signed, and invoiced against milestones. If the brief changes, we write a change order, price it, and both sides sign before anyone starts building. You never see a "revised invoice" in your inbox.

2. **What's the smallest engagement you'll take?**
   > $8,000. Below that, the overhead of scoping, contracting, and senior engineering time doesn't make sense for either side. We'll refer you to a contractor we trust.

3. **Do you work with non-technical founders?**
   > Yes. About half our clients are non-technical. We translate between engineering and product. Weekly demos are for you, not for us. If you don't understand something, that's our failure, not yours.

4. **Who actually does the work?**
   > A 5-person senior team. Muhammad Haseeb is the technical lead on every engagement. Team members are hand-picked per project. No juniors on billable code. No outsourced subcontractors you don't know about.

5. **Where are you based and what hours do you work?**
   > Remote-first. Islamabad (UTC+5). We overlap 3-4 hours daily with US Eastern and 5+ hours with Europe. Weekly sync happens on your clock, not ours.

**Accordion styling:**

- Border between items: `1px solid #E7E6E4`.
- Chevron: Tabler `IconChevronDown`, 18px, `#5A5C5C`. Rotates 180° open.
- Open item: body text `#1D2020`, 16px, leading 1.65.
- Closed item: question only, 20px, weight 500, `#1D2020`.

### 4.10 FinalCTA

Reuse existing `FinalCTA` component from home. Dark background, lime pill CTA. Copy variant for services page:

```
Headline: Scope your project in a 30-minute call.
Subhead: We push back if the scope is wrong. That's a feature.
CTA: Book a scoping call   (lime pill)
Secondary: Email haseeb@codewithhaseeb.com  (text link, #D8F9B8)
```

---

## 5. Components to build or extract

| Component | Path | Notes |
|---|---|---|
| `ServicesHero` | `src/components/sections/services/ServicesHero.tsx` | New, page-specific. |
| `ServiceBlock` | `src/components/sections/services/ServiceBlock.tsx` | Takes a `service` prop + `index` for surface alternation. |
| `PricingPhilosophy` | `src/components/sections/services/PricingPhilosophy.tsx` | Dark interstitial. |
| `AlsoCapableOf` | `src/components/sections/services/AlsoCapableOf.tsx` | Chip strip. |
| `ServicesFAQ` | `src/components/sections/services/ServicesFAQ.tsx` | Uses shadcn Accordion. |
| `TracePanel` | `src/components/ui/trace-panel.tsx` | **Extract from Hero** so services can reuse with different rows. |
| `ProofChip` | `src/components/ui/proof-chip.tsx` | Reusable on services + future work index. |
| `IncludedList` | `src/components/ui/included-list.tsx` | Lime-dot bulleted list. |

Folder structure:

```
src/components/sections/services/
  ServicesHero.tsx
  ServiceBlock.tsx
  PricingPhilosophy.tsx
  AlsoCapableOf.tsx
  ServicesFAQ.tsx
  index.ts
```

---

## 6. Data model

Extend `siteConfig.services` with the new fields needed for the deep page. Home bento keeps using `title` + `description` + `slug`. Services page uses the extended fields.

```ts
// src/lib/siteConfig.ts

export type Service = {
  slug: string;
  icon: string;                   // Tabler icon name
  title: string;                  // home bento title
  description: string;            // home bento description
  // --- fields below used only on /services ---
  headline: string;               // deep-page H2
  positioningLine: string;        // single-line qualifier under eyebrow
  body: [string, string];         // 2 paragraphs
  included: string[];             // 4 to 6 bullets
  typicalEngagement: {
    priceRange: string;           // "$15,000 to $50,000 fixed"
    duration: string;             // "6 to 10 weeks"
  };
  proofChips: {
    slug: string;                 // links to /work/{slug}
    label: string;                // "aphra.me"
    metric: string;               // "17K users"
  }[];
};
```

All 6 services get populated with the copy in section 4. Place the extended copy in `src/lib/services-detail.ts` if `siteConfig.ts` gets crowded.

---

## 7. SEO

### JSON-LD

Emit a `Service` schema per offer + an aggregate `ProfessionalService` at page level.

```ts
// src/app/services/page.tsx (at top of file)
const servicesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'codewithhaseeb',
  url: 'https://codewithhaseeb.com/services',
  description: '...',
  areaServed: 'Worldwide',
  serviceType: [
    'AI SaaS MVP development',
    'AI agent development',
    'Voice AI development',
    'LLM cost optimization',
    'AI workflow automation',
    'Senior full-stack engineering',
  ],
  priceRange: '$8,000 to $50,000',
  provider: { '@type': 'Organization', name: 'codewithhaseeb' },
};
```

Plus one `FAQPage` schema for the 5 FAQ items.

### Internal links

- From home `ServicesGrid` cards: each card links to `#service-{slug}` anchor on `/services`.
- From each service block: outbound links to `/work/{slug}` via proof chips.
- From each service block CTA: link to `/contact?service={slug}`.
- From `/services` hero "See pricing philosophy" link: `#pricing-philosophy` anchor.
- From footer: `/services` link already in siteConfig nav.

Each `ServiceBlock` wraps in `<section id={`service-${service.slug}`}>` so anchors work from home.

### Canonical

`<link rel="canonical" href="https://codewithhaseeb.com/services" />` via metadata.alternates.

### OG image

`src/app/services/opengraph-image.tsx`. Matches home OG treatment. Headline: "Six offers. No filler. Fixed price."

---

## 8. Accessibility

- All section headings use proper hierarchy: page h1 in hero, each service block h2, "What's included" is h3, FAQ questions are h3.
- Accordion uses shadcn Radix primitive (keyboard + screen reader compliant by default).
- Lime-dot bullets marked `aria-hidden` (they're decorative).
- Icon chips: `aria-hidden` on the Tabler icon, service title provides accessible label.
- Proof chips are `<Link>`, never `<div onClick>`.
- FAQ accordion: first item open by default for SEO and quick-read affordance.
- Color contrast: every light-surface body hits WCAG AA on `#1D2020` over `#FFFFFF` and `#F3F2F1`. Dark surface (`PricingPhilosophy`, `FinalCTA`) uses `#F3F2F1` text on `#1D2020`, AA pass.
- Motion: respect `prefers-reduced-motion`. Accordion animation disabled when reduced.

---

## 9. Motion and interaction (Framer Motion, minimal)

- **Hero trace panel pulse dot**: same as home, 1.2s opacity loop.
- **Service block entry**: fade-up on viewport enter, `opacity: 0 → 1`, `translateY: 16 → 0`, 320ms, `ease-out`. Stagger 40ms between `.meta-column` and `.body-column`.
- **Proof chip hover**: `scale: 1 → 1.02`, 160ms. Shadow lift: 0 → `0 4px 12px rgba(0,0,0,0.06)`.
- **CTA hover**: lime pill gets `box-shadow: 0 0 0 4px rgba(216, 249, 184, 0.35)` ring on hover, 200ms.
- **Accordion open/close**: 280ms, `ease-[cubic-bezier(0.4,0,0.2,1)]`. Chevron rotate 180°.
- **No scroll-jacking.** No parallax. No 3D. No scroll-triggered counters (except possibly the pricing-philosophy stat row, one time, 400ms stagger).

All animations skipped under `@media (prefers-reduced-motion: reduce)`.

---

## 10. Analytics events

Fire via existing `analytics.ts` wrapper (GA4 + Clarity).

| Event | Trigger | Params |
|---|---|---|
| `services_view` | page mount | none |
| `services_block_view` | service block enters viewport (50% visible) | `{ service_slug }` |
| `services_cta_click` | any "Start scoping this" or hero primary CTA | `{ service_slug, location }` |
| `services_proof_click` | proof chip click | `{ service_slug, target_slug }` |
| `services_faq_open` | FAQ item expands | `{ question_index }` |
| `services_also_capable_view` | capabilities strip enters viewport | none |

Use IntersectionObserver for viewport events, 50% threshold, fire once per session.

---

## 11. Responsive breakpoints

| Breakpoint | Behavior |
|---|---|
| `<640px` (mobile) | Single column. Meta and body stack. Icon chip 48px. Headlines 36px. `py-[72px]`. Trace panel hidden in hero. |
| `640-767px` | Same as above, slightly larger type. |
| `768-1023px` (tablet) | Service block goes to 2-col (5/7 split). Trace panel shows but narrower. |
| `≥1024px` (desktop) | Full 12-col grid. Trace panel 420px wide. `py-[120px]`. |
| `≥1440px` | Container caps at 1200px. No more growth. |

---

## 12. Implementation order (when Task 7 begins)

1. **Extract `TracePanel`** from `Hero.tsx` into `src/components/ui/trace-panel.tsx`. Refactor home hero to use it. Verify home still renders.
2. **Build `IncludedList`, `ProofChip`** primitives.
3. **Extend `siteConfig.services`** with deep-page fields. Populate all 6.
4. **Build `ServicesHero`**, verify with Playwright screenshot.
5. **Build `ServiceBlock`** as a single component taking `service` + `surface` prop. Render service 1. Verify.
6. **Render services 2-6.** Verify surface alternation visually.
7. **Build `PricingPhilosophy`**. Verify dark treatment and stat row.
8. **Build `AlsoCapableOf`**. Verify chips render correctly and strip is quiet, not loud.
9. **Build `ServicesFAQ`**. Test keyboard accessibility on accordion.
10. **Wire `FinalCTA`** with services-specific copy variant (or add `variant` prop).
11. **Emit JSON-LD**. Validate with Google's Rich Results test.
12. **Add OG image route**. Verify with OpenGraph.xyz.
13. **Wire analytics events**. Verify in GA4 DebugView.
14. **Playwright full-page screenshot** at 1440px and 390px. Check for:
    - No em dashes in rendered text (grep the DOM).
    - No `→` glyphs.
    - Surface alternation correct.
    - All proof chips link to valid `/work/{slug}` routes.
    - FAQ accordion keyboard nav works.

---

## 13. Acceptance checklist

Before shipping `/services`:

- [ ] Metadata title, description, canonical, OG set and validated.
- [ ] `opengraph-image.tsx` renders correctly (check `/services/opengraph-image`).
- [ ] All 6 service blocks present, in order matching home bento.
- [ ] Each block: icon chip, eyebrow, headline, positioning line, 2-paragraph body, included list, typical engagement, proof chips, CTA.
- [ ] Surface alternation holds across all 11 sections.
- [ ] `PricingPhilosophy` sits between service 3 and service 4 (dark break).
- [ ] `AlsoCapableOf` strip includes 5 demoted capabilities.
- [ ] `ServicesFAQ` has 5 questions, accordion works, first item open by default.
- [ ] `FinalCTA` closes the page on dark surface with lime pill.
- [ ] Zero em dashes in rendered DOM.
- [ ] Zero `→` or `←` glyph characters in buttons or links.
- [ ] Zero lucide-in-pastel-squares.
- [ ] Zero `whitespace-nowrap` issues on CTAs.
- [ ] All proof chips resolve to existing `/work/{slug}` routes (do not link to unbuilt case studies).
- [ ] Home `ServicesGrid` cards deep-link to `/services#service-{slug}` anchors that scroll correctly.
- [ ] JSON-LD validates on Google Rich Results test (both `ProfessionalService` and `FAQPage`).
- [ ] Lighthouse: Performance ≥90, Accessibility 100, Best Practices ≥95, SEO 100.
- [ ] Playwright 1440px and 390px screenshots reviewed and approved.

---

## 14. Out of scope for this page

Explicitly **not** on `/services`:

- Long-form case studies (live at `/work/[slug]`, proof chips link there).
- Founder bio or team members (live at `/about`).
- Blog content or thought leadership (future `/blog`).
- Upwork reviews carousel (the home `Testimonials` section handles that).
- Pricing calculator or configurator (not the right page for it).
- Live chat or intercom-style widgets (Calendly handles booking).

If a visitor needs any of those, an internal link takes them there. `/services` stays focused on: **what we do, how much, how long, proof, book a call.**

---

**End of 09-SERVICES-PAGE-SPEC.md**
