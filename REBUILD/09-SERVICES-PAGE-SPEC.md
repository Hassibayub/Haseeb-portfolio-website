# 09. Services Page Specification

**URL:** `/services`
**Status:** v2. Rewritten after live audit showed the first draft was a wall of text.
**Design language:** Finns-reference. Surface alternation (`#F3F2F1` cream + `#1D2020` charcoal). Lime `#D8F9B8` signature. No em dashes. No arrow glyphs. No lucide-in-pastel-squares. Tabler Icons in white chips.

## v2 changes vs. v1 (read this first)

After rendering the v1 spec live, the page was a wall of copy. These three decisions define v2:

1. **Kill the 2-paragraph body in every service block.** Replace with headline + 1-line positioning + 4 bullets + price/duration + proof chips + CTA. Roughly 60% fewer words. Depth lives at `/work/[slug]`, not here.
2. **Kill the fake-terminal trace panel.** It used invented variable names (`engagement_types`, `clients_2024`) that read as junior-dev cosplay. Replace with a single **proof artifact** in the hero: one real transformation, big type, human provenance.
3. **Drop `underscore_case` from labels.** Use real English. Mono font is reserved for actual code, file paths, and version tags. Labels like "Fixed-price projects" > `fixed_price_projects`.

The rest of the page structure (surface alternation, pricing interstitial, capabilities strip, FAQ, final CTA) is unchanged. The FAQ answers get trimmed.

---

## 0. Purpose

The home page's `ServicesGrid` is a 6-card bento teaser: "what do you do?" in 10 seconds.

`/services` answers four questions:

1. What do I get if I hire you for X?
2. How much and how long?
3. What proof exists?
4. How do you price it?

Two visitor types:

- **Founder / exec evaluating fit** after scanning home.
- **Direct-arrival visitor** from a proposal, email, or Upwork reply.

Success = visitor books a call. Secondary = they open ≥1 case study via proof chip.

---

## 1. Scope: what's in vs. cut

Old site (`index.html`, lines 744-902) listed **9 services**. v2 keeps 6 sharp offers, demotes 3 to a quiet capabilities strip, and cuts the rest.

| Old service | Fate |
|---|---|
| AI & Machine Learning | Merge into AI SaaS MVPs + AI Agents |
| Full-Stack Development | Keep as Senior Full-Stack Engineering |
| Computer Vision | Demote to "Also capable of" strip |
| Web Scraping & Automation | Demote to "Also capable of" strip |
| Cloud & DevOps | Demote (it's table stakes, not a product) |
| Data Science & Analytics | Cut |
| AI Chatbots & Voice Assistants | Keep as Voice AI |
| Embedded Systems | Cut |
| Graphics (Hobbyist) | Cut |

### The 6 offers (same order as home bento)

1. **AI SaaS MVPs** (flagship)
2. **AI Agents & Multi-Agent Systems**
3. **Voice AI & Conversational Agents**
4. **LLM Cost Optimization**
5. **AI Workflow Automation**
6. **Senior Full-Stack Engineering**

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
    description: 'Six sharp offers. Fixed-price. 4 to 10 week engagements.',
    images: ['/og/services.png'],
    type: 'website',
  },
  alternates: { canonical: 'https://codewithhaseeb.com/services' },
};
```

OG route: `src/app/services/opengraph-image.tsx`.

---

## 3. Page shell and surface alternation

```tsx
<main>
  <ServicesHero />                    {/* cream */}
  <ServiceBlock service={s[0]} />     {/* white */}
  <ServiceBlock service={s[1]} />     {/* cream */}
  <ServiceBlock service={s[2]} />     {/* white */}
  <PricingPhilosophy />               {/* DARK */}
  <ServiceBlock service={s[3]} />     {/* white */}
  <ServiceBlock service={s[4]} />     {/* cream */}
  <ServiceBlock service={s[5]} />     {/* white */}
  <AlsoCapableOf />                   {/* cream */}
  <ServicesFAQ />                     {/* white */}
  <FinalCTA variant="services" />     {/* DARK */}
</main>
```

### Spacing (desktop / mobile)

| Section | Desktop | Mobile |
|---|---|---|
| ServicesHero | `pt-[160px] pb-[120px]` | `pt-[96px] pb-[72px]` |
| ServiceBlock | `py-[112px]` | `py-[64px]` |
| PricingPhilosophy | `py-[140px]` | `py-[88px]` |
| AlsoCapableOf | `py-[88px]` | `py-[56px]` |
| ServicesFAQ | `py-[112px]` | `py-[72px]` |
| FinalCTA | `py-[160px]` | `py-[96px]` |

Container: existing `container-tight` (max-w-[1200px], px-6 md:px-10).

---

## 4. Section specs

### 4.1 ServicesHero (redesigned)

**Surface:** cream `#F3F2F1`.

**Layout:** Single column, left-aligned, max-width 960px for headline. No right-side panel. Below the headline/subhead/CTAs, a **single large proof artifact** runs edge-to-container, spanning full width.

**Top block:**

```
Eyebrow (IBM Plex Mono, 12px, tracking 0.08em, lowercase, #8C8C8C):
  services

Headline (Bricolage Grotesque, clamp(48px, 7vw, 88px), weight 500, tracking -0.02em, #1D2020):
  Six offers. No filler. Fixed price.

Subhead (Bricolage, 20px, leading 1.5, #5A5C5C, max-width 640px, mt-6):
  We price by outcome, not by hour. Scope is locked before we start.
  No surprise invoices.

[CTA row, mt-10, flex gap-4]:
  Primary: lime pill "Book a scoping call"  (#D8F9B8, text #1D2020, 48px tall)
  Secondary: text link "See pricing"        (#6D5EF3, underlines on hover)
```

**Proof artifact (below CTAs, mt-20):** this replaces the trace panel entirely.

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  $100,000     →     $1,500                                      │
│                                                                 │
│  Monthly LLM bill, cut 98% without changing the product.        │
│  GDPR compliant. Full audit trail. Delivered in 4 weeks.        │
│                                                                 │
│  ─────────────                                                  │
│  17,000 users     $1.2M raised     68,000 leads handled         │
│  Aphra.me MVP     Tula therapy     FCS automation               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Specs:**

- Container: `#FFFFFF` background, `1px solid #E7E6E4`, `radius: 24px`, `padding: 48px 56px` desktop, `32px 24px` mobile.
- Transformation line: **Bricolage 72px** desktop / 44px mobile, weight 500, `#1D2020`. The `$100,000` is 60% opacity (`#1D2020` at 0.6), the `$1,500` is full opacity. The arrow between is **not** the `→` character — it's a Tabler `IconArrowRight`, 32px, stroke 1.5, `#1D2020`, with `mx-6` spacing. This is the one place we use an arrow icon, as part of a transformation mark.
- Explanation: Bricolage 18px, `#5A5C5C`, leading 1.55, max-width 520px, mt-6.
- Divider: `1px solid #E7E6E4`, width 120px, mt-10.
- Secondary proof row: 3 columns (1 col on mobile), mt-8. Each: headline number Bricolage 32px weight 500 `#1D2020`, label IBM Plex Mono 12px tracking 0.08em lowercase `#8C8C8C`. Examples: `17,000` / `aphra.me mvp`.

No fake terminal. No `cs_02`. No `engagement_types`. One real transformation, three real proof points, attribution.

**Important:** if the $100K→$1.5K figure is a public-safe claim, use it. If not (confidentiality), use a second-best real transformation from an active case study. Do not invent numbers.

### 4.2 ServiceBlock (redesigned, shorter)

**Surface:** alternates per section shell above.

**Layout:** 12-col grid desktop. Meta column 5/12, body column 6/12, 1/12 gutter. Stack on mobile.

**Meta column (left):**

```
[Icon chip: 64×64, #FFFFFF, 1px #E7E6E4, radius 16px, Tabler icon 32px stroke 1.5]

[Eyebrow mt-8, IBM Plex Mono 12px, tracking 0.08em, lowercase, #8C8C8C]
  Service category (e.g. "ai saas mvps")

[Headline mt-4, Bricolage 48px desktop / 32px mobile, weight 500, tracking -0.02em, #1D2020]
  The claim.

[Positioning line mt-5, Bricolage 18px, #5A5C5C, max-width 400px]
  One sentence qualifier. That's it.
```

**No body paragraphs.** Headline + 1 sentence does the narrative work.

**Body column (right):**

```
[What you get, label IBM Plex Mono 12px tracking 0.08em lowercase #8C8C8C]
  What you get

[Bullet list, mt-4, 4 items max]
  • 6px lime dot · 16px text #1D2020 · leading 1.65

[Typical engagement block, mt-8]
  Inline stat card (see below)

[Proof chips row, mt-6, flex-wrap gap-2]

[CTA row, mt-8]
  Primary lime pill "Start scoping"  +  Secondary text link "See related work"
```

**Bullets** (lime dot, no arrow glyph):

```tsx
<ul className="mt-4 space-y-3">
  {included.map((item) => (
    <li key={item} className="flex gap-4 text-[16px] leading-[1.65]"
        style={{ color: '#1D2020' }}>
      <span aria-hidden className="mt-[9px] shrink-0 h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: '#D8F9B8' }} />
      <span>{item}</span>
    </li>
  ))}
</ul>
```

**Typical engagement block** (English labels, no underscores):

```tsx
<div className="mt-8 inline-flex flex-col gap-1 px-5 py-4"
     style={{ backgroundColor: '#F3F2F1', border: '1px solid #E7E6E4', borderRadius: 12 }}>
  <span className="text-[11px] font-sans uppercase tracking-[0.12em]"
        style={{ color: '#8C8C8C' }}>
    Typical engagement
  </span>
  <span className="text-[15px] font-sans" style={{ color: '#1D2020' }}>
    $15,000 to $50,000 fixed · 6 to 10 weeks
  </span>
</div>
```

The label is sans-serif small-caps with 0.12em tracking. Cleaner than mono. Reserves mono for actual code.

**Proof chips** (links to `/work/[slug]`):

```tsx
<div className="mt-6 flex flex-wrap gap-2">
  <Link href="/work/aphra"
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full transition-all hover:-translate-y-0.5"
        style={{ backgroundColor: '#FFFFFF', border: '1px solid #E7E6E4' }}>
    <span className="text-[13px] font-medium" style={{ color: '#1D2020' }}>
      Aphra.me
    </span>
    <span className="text-[13px]" style={{ color: '#5A5C5C' }}>
      17K users
    </span>
  </Link>
</div>
```

No mono inside chips. Readable type. The `Aphra.me` is sentence case (it's a name), `17K users` is the metric.

### 4.3 The 6 ServiceBlock contents (short version)

#### Service 1. AI SaaS MVPs

- Icon: `IconRocket`
- Eyebrow: `ai saas mvps`
- Headline: **Figma to live product in 6 to 10 weeks.**
- Positioning: For founders who've raised and need to ship, not demo.
- What you get:
  - Architecture call and scoping document
  - Full build: Next.js, Python, AI, deployment
  - Weekly demo on Friday. You approve before we continue.
  - 30 days of post-launch bug support
- Typical engagement: `$15,000 to $50,000 fixed · 6 to 10 weeks`
- Proof chips: `Aphra.me · 17K users` / `Tula · $1.2M raised` / `KCNL · 10K companies`

#### Service 2. AI Agents & Multi-Agent Systems

- Icon: `IconRobot`
- Eyebrow: `ai agents`
- Headline: **Agents that run for hours, not demos that run for minutes.**
- Positioning: LangChain, LangGraph, CrewAI. Production orchestration, not toy loops.
- What you get:
  - Agent architecture with explicit stop conditions
  - Tool integration (search, DB, APIs, code execution)
  - Observability, retries, failure modes documented
  - Integration into your existing product or pipeline
- Typical engagement: `$12,000 to $35,000 fixed · 4 to 8 weeks`
- Proof chips: `Capwell · 6mo to 3wk` / `KCNL · 10K companies`

#### Service 3. Voice AI & Conversational Agents

- Icon: `IconMicrophone`
- Eyebrow: `voice ai`
- Headline: **Voice agents that close calls, not end them.**
- Positioning: HIPAA-compliant. Sub-second latency. Sounds human enough to work.
- What you get:
  - Low-latency STT → LLM → TTS pipeline (Deepgram, ElevenLabs, OpenAI)
  - Telephony (Twilio, Vonage) or web SDK
  - HIPAA-ready deployment if required
  - Call logs, transcripts, QA harness
- Typical engagement: `$10,000 to $30,000 fixed · 4 to 8 weeks`
- Proof chips: `Tula · 2.4K calls` / `FCS · 68K leads handled`

#### Service 4. LLM Cost Optimization

- Icon: `IconBolt`
- Eyebrow: `llm cost optimization`
- Headline: **We cut a $100K per month LLM bill to $1,500.**
- Positioning: Hybrid stacks. Open-source where it wins. Audit trail on every token.
- What you get:
  - Stack audit and per-request cost breakdown
  - Task routing layer (frontier vs. open-source)
  - Open-source deployment (Llama, Qwen, Mistral) on your infra
  - Before-and-after cost dashboard
- Typical engagement: `$8,000 to $25,000 fixed · 3 to 6 weeks`
- Proof chips: `Enterprise client · $100K to $1.5K/mo` / `KCNL · 70% latency cut`

#### Service 5. AI Workflow Automation

- Icon: `IconChartDots3`
- Eyebrow: `ai workflow automation`
- Headline: **Pipelines that run your business while you sleep.**
- Positioning: GoHighLevel, HubSpot, WhatsApp, CRM integrations. End-to-end, not Zapier-fragile.
- What you get:
  - Workflow design with failure modes mapped
  - Integration layer (CRM, messaging, storage, internal APIs)
  - AI components (classification, extraction, generation)
  - Admin dashboard, alerting, audit logs
- Typical engagement: `$10,000 to $30,000 fixed · 4 to 8 weeks`
- Proof chips: `FCS · 68K leads` / `Enterprise · 2K users automated`

#### Service 6. Senior Full-Stack Engineering

- Icon: `IconCode`
- Eyebrow: `senior full-stack`
- Headline: **When the AI part isn't the whole job.**
- Positioning: Next.js, Python, Node, Go. The app around the AI, done right.
- What you get:
  - Product architecture and tech selection
  - Next.js, Python, Node, or Go implementation
  - Auth, billing, RBAC, multi-tenancy, admin
  - CI/CD, infra, monitoring, on-call runbook
- Typical engagement: `$15,000 to $50,000 fixed · 6 to 12 weeks, or retainer`
- Proof chips: `Aphra · 17K users` / `Sony · enterprise scale` / `KCNL · 10K companies`

**Total words per service block: ~70.** Was ~180 in v1.

### 4.4 PricingPhilosophy (trimmed)

**Surface:** dark `#1D2020`, cream text.

**Layout:** Centered, max-width 720px, `py-[140px]`.

**Content:**

```
Eyebrow (IBM Plex Mono 12px tracking 0.08em lowercase, #A6A6A6):
  note on pricing

Headline (Bricolage 56px weight 500 tracking -0.02em, #F3F2F1):
  We don't do hourly for fixed-scope work.

Body (Bricolage 20px leading 1.5, #C4C4C4, mt-8):
  You know the cost, the deliverables, and the timeline before you send
  a dollar. Milestones are written, invoiced, and paid on delivery.
  Scope creep is a planning failure, not a billing event.

  If you need ongoing work, retainers run $8,000 to $15,000 per month
  for a dedicated senior engineer embedded in your team.
```

**Stat row (mt-16):** 3 stats, horizontal, dark-surface styling:

```tsx
<div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
  {[
    { value: '93%', label: 'Projects delivered at fixed price' },
    { value: '0',   label: 'Scope disputes in 2024' },
    { value: '0',   label: 'Projects that ran over on time' },
  ].map((stat) => (
    <div key={stat.label} className="px-6 py-5"
         style={{ border: '1px solid #3A3A3A', borderRadius: 12 }}>
      <div className="text-[40px] font-sans" style={{ color: '#D8F9B8' }}>
        {stat.value}
      </div>
      <div className="mt-2 text-[14px] leading-[1.45]" style={{ color: '#A6A6A6' }}>
        {stat.label}
      </div>
    </div>
  ))}
</div>
```

English labels. Lime numbers. No underscores. No mono.

### 4.5 AlsoCapableOf (unchanged from v1)

**Surface:** cream `#F3F2F1`, `py-[88px]`.

```
Eyebrow: also capable of

Headline (Bricolage 28px, #1D2020, max-width 640px):
  If you need one of these as part of a larger engagement, say so.
  Standalone work in these areas goes to a referral partner.

[Chips row]:
  Computer vision (YOLO, segmentation)
  Web scraping (Scrapy, Playwright, anti-bot)
  Data engineering (ETL, dashboards, BI)
  Cloud and DevOps (AWS, GCP, Kubernetes)
  API design (REST, GraphQL, gRPC)
```

Chip styling: 12px font, `#1D2020` text, `#FFFFFF` bg, `1px solid #E7E6E4`, `radius: 8`, `px-3 py-1.5`.

### 4.6 ServicesFAQ (answers trimmed)

**Surface:** light `#FFFFFF`, `py-[112px]`.

**Layout:** Left column heading + intro, right column accordion.

**Heading:**

```
Eyebrow: frequently asked

Headline (Bricolage 48px weight 500):
  Five things founders ask before they sign.

Body (18px, #5A5C5C):
  Not here? Email haseeb@codewithhaseeb.com.
  A human replies within a business day.
```

**Accordion (shadcn `Accordion`):** 5 items. Answers trimmed ~40% vs. v1.

1. **What does "fixed price" actually cover?**
   > Everything in the signed proposal. Scope changes get a written change order before work continues. You never see a revised invoice in your inbox.

2. **What's the smallest engagement you'll take?**
   > $8,000. Below that, the overhead of scoping and senior engineering time doesn't work for either side. We'll refer you to a contractor we trust.

3. **Do you work with non-technical founders?**
   > Yes. About half our clients are non-technical. Weekly demos are for you, not for us.

4. **Who actually does the work?**
   > A 5-person senior team. Muhammad Haseeb is the technical lead on every engagement. No juniors on billable code. No subcontractors you don't know about.

5. **Where are you based?**
   > Islamabad, UTC+5. We overlap 3-4 hours daily with US Eastern, 5+ hours with Europe. Weekly sync runs on your clock.

**First item open by default.**

### 4.7 FinalCTA

Reuse home `FinalCTA` with `variant="services"`:

```
Headline: Scope your project in a 30-minute call.
Subhead: We push back if the scope is wrong. That's a feature.
CTA: Book a scoping call  (lime pill)
Secondary: Email haseeb@codewithhaseeb.com  (text link, #D8F9B8)
```

---

## 5. Components

| Component | Path | Notes |
|---|---|---|
| `ServicesHero` | `sections/services/ServicesHero.tsx` | New. Headline + subhead + CTAs + proof artifact. |
| `ProofArtifact` | `ui/proof-artifact.tsx` | Large transformation display. Reusable on about/home later. |
| `ServiceBlock` | `sections/services/ServiceBlock.tsx` | Meta + body two-column. No body paragraphs. |
| `IncludedList` | `ui/included-list.tsx` | Lime-dot bullet list. |
| `EngagementCard` | `ui/engagement-card.tsx` | Inline stat card for price/duration. |
| `ProofChip` | `ui/proof-chip.tsx` | Link chip to `/work/[slug]`. |
| `PricingPhilosophy` | `sections/services/PricingPhilosophy.tsx` | Dark interstitial with 3 stat row. |
| `AlsoCapableOf` | `sections/services/AlsoCapableOf.tsx` | Chip strip. |
| `ServicesFAQ` | `sections/services/ServicesFAQ.tsx` | shadcn Accordion, 5 items. |

**Do not extract `TracePanel`**. v2 doesn't use it here. Home keeps its own.

---

## 6. Data model

```ts
// src/lib/siteConfig.ts

export type Service = {
  slug: string;
  icon: string;                   // Tabler icon name
  title: string;                  // home bento title
  description: string;            // home bento description
  // --- /services deep-page fields ---
  headline: string;               // deep-page H2
  positioningLine: string;        // 1 sentence
  included: string[];             // 4 bullets, hard max
  typicalEngagement: {
    priceRange: string;           // "$15,000 to $50,000 fixed"
    duration: string;             // "6 to 10 weeks"
  };
  proofChips: {
    slug: string;
    label: string;                // "Aphra.me"
    metric: string;               // "17K users"
  }[];
};
```

No `body` field. We intentionally cut it. If we ever need narrative, it lives in `/work/[slug]`.

Extended copy can sit in `src/lib/services-detail.ts` to keep `siteConfig.ts` lean.

---

## 7. Typography and mono-font policy

After v2, mono font (`IBM Plex Mono`) is used **only** for:

1. Eyebrow labels (lowercase, tracking 0.08em, 12px, `#8C8C8C`).
2. Actual code snippets, file paths, URL fragments.
3. Version tags (e.g. `v3.2`).
4. Terminal-style artifacts on the home hero, nowhere else.

**Do not use mono for:**

- Stat labels (use sans small-caps with tracking).
- Metric numbers (use Bricolage).
- Button labels or CTAs.
- Body copy.
- Nav items.

No `underscore_case` in any user-facing label on `/services` or beyond.

---

## 8. SEO

### JSON-LD

Two schemas on `/services`:

```ts
const professionalService = {
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

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
};
```

### Internal links

- Home `ServicesGrid` card → `/services#service-{slug}`
- `ServiceBlock` proof chips → `/work/{slug}`
- `ServiceBlock` CTA → `/contact?service={slug}`
- Hero secondary link "See pricing" → `#pricing-philosophy`

Each `ServiceBlock` wraps in `<section id={`service-${slug}`}>`.

### Canonical

Set via `metadata.alternates.canonical`.

### OG image

`src/app/services/opengraph-image.tsx`. Headline: "Six offers. No filler. Fixed price."

---

## 9. Accessibility

- Semantic heading hierarchy: page `<h1>` in hero, each `<ServiceBlock>` uses `<h2>`, "What you get" and "Typical engagement" use `<h3>`.
- FAQ: shadcn Radix Accordion (keyboard-compliant by default). First item `defaultOpen`.
- Bullets: lime dots marked `aria-hidden`.
- Icon chips: Tabler icon `aria-hidden`, accessible label via chip context or `sr-only` text.
- Proof chips: `<Link>`, never `<div onClick>`.
- Contrast: all AA on cream and white. Dark interstitial `#F3F2F1` on `#1D2020` passes AA for 18px+.
- Motion: every transition respects `prefers-reduced-motion`.

---

## 10. Motion

- **Service block entry:** fade-up 16px, 320ms ease-out, IntersectionObserver-triggered, stagger 40ms meta-then-body.
- **Proof chip hover:** translateY -2px, 160ms, shadow `0 4px 12px rgba(0,0,0,0.06)`.
- **Engagement card hover:** none (static).
- **CTA hover:** ring `0 0 0 4px rgba(216,249,184,0.35)`, 200ms.
- **Accordion:** 280ms cubic-bezier(0.4,0,0.2,1). Chevron rotates 180°.
- **ProofArtifact:** none. It's static by design. No counter animations. No shimmer.

All disabled under `prefers-reduced-motion: reduce`.

---

## 11. Analytics events

GA4 + Clarity via existing wrapper.

| Event | Trigger | Params |
|---|---|---|
| `services_view` | page mount | none |
| `services_block_view` | block enters viewport (50% visible, once per session) | `{ service_slug }` |
| `services_cta_click` | any "Start scoping" or hero primary CTA | `{ service_slug, location }` |
| `services_proof_click` | proof chip click | `{ service_slug, target_slug }` |
| `services_faq_open` | FAQ item expands | `{ question_index }` |
| `services_also_capable_view` | capabilities strip 50% visible | none |

---

## 12. Responsive

| Breakpoint | Behavior |
|---|---|
| `<640px` | Single col. Icon chip 48px. Headlines 32px. Proof artifact transformation line 44px. `py-[64px]`. |
| `640-1023px` | Same stacked, slightly larger type. |
| `≥1024px` | ServiceBlock becomes 5+6 col split. Proof artifact centers at 72px. `py-[112px]`. |
| `≥1440px` | Container caps at 1200px. |

---

## 13. Implementation order

1. **Build `ProofArtifact` primitive.** Verify with screenshot.
2. **Rewrite `ServicesHero`** using `ProofArtifact`. Verify.
3. **Build `ServiceBlock`** (no body prop). Render service 1. Verify.
4. **Populate remaining 5 services.** Verify surface alternation.
5. **Trim `PricingPhilosophy` copy.** Replace underscore stat labels with English. Verify dark treatment.
6. **Build `AlsoCapableOf`** (unchanged from v1 draft).
7. **Build `ServicesFAQ`** with trimmed answers.
8. **Add `FinalCTA variant="services"`** (or clone home FinalCTA).
9. **Emit JSON-LD** (ProfessionalService + FAQPage).
10. **Add `opengraph-image.tsx`**.
11. **Wire analytics events.**
12. **Playwright full-page screenshot** at 1440 and 390. Check: no em dashes, no `→` glyphs (except the deliberate one in ProofArtifact which is an SVG icon, not a character), no `underscore_case`, no orphaned blocks of text >3 sentences.

---

## 14. Acceptance checklist

Before shipping v2:

- [ ] No 2-paragraph body copy in any ServiceBlock. Only headline + 1-sentence positioning.
- [ ] Each block has exactly 4 bullets in `What you get`.
- [ ] Every bullet has a lime dot, not an arrow glyph.
- [ ] Engagement cards use English labels ("Typical engagement"), not `typical_engagement`.
- [ ] Hero shows one ProofArtifact with real numbers, not a fake terminal trace.
- [ ] Surface alternation holds across 11 sections.
- [ ] PricingPhilosophy body fits under 80 words.
- [ ] FAQ answers average <40 words.
- [ ] Zero em dashes in rendered DOM.
- [ ] Zero `→`, `←`, `↑`, `↓` glyph characters anywhere.
- [ ] Zero `underscore_case` visible to end users.
- [ ] Mono font appears only on eyebrows, code, file paths, version tags.
- [ ] All proof chips resolve to existing `/work/[slug]` routes.
- [ ] Home `ServicesGrid` cards deep-link to `/services#service-{slug}` anchors and scroll correctly.
- [ ] JSON-LD validates (Rich Results test, both schemas).
- [ ] Lighthouse: Performance ≥90, Accessibility 100, SEO 100.
- [ ] Playwright screenshots at 1440 and 390 reviewed.

---

## 15. Out of scope

Not on `/services`:

- Full case studies (live at `/work/[slug]`).
- Founder bio or team (at `/about`).
- Blog (future `/blog`).
- Upwork reviews (home `Testimonials` handles).
- Pricing calculator.

Internal links handle redirection for those intents. `/services` answers one thing: **what, how much, how long, proof, book.**

**End of 09-SERVICES-PAGE-SPEC.md (v2)**
