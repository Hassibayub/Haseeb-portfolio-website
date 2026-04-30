# 10. Work Index Page Specification

**URL:** `/work`
**Status:** Spec. Implement as part of Task 7. Depends on 8 MDX case studies from `02-CASE-STUDIES.md` being in `/src/content/work/*.mdx`.
**Design language:** Finns-reference. Bento grid (asymmetric, matches home `ServicesGrid` rhythm). Surface alternation. Lime `#D8F9B8` accents. No em dashes, no `→` glyphs, no underscore_case, no lucide-in-pastel-squares.

---

## 0. Purpose

`/work` answers one question: **"Have you actually shipped stuff like what I need?"**

Success = visitor clicks into 1 case study. Secondary = they return to home or `/contact`.

Two visitor types:

- **Direct arrival** from LinkedIn, a proposal, or a tweet. They want the receipts.
- **Home visitor** who clicked `See all work` from `FeaturedWork`. They've seen 3 cards and want the rest.

---

## 1. Content: 8 case studies (from `02-CASE-STUDIES.md`)

| # | Slug | Title | Category | Tier |
|---|---|---|---|---|
| 1 | `aphra` | Real-time AI video avatar serving 17,000+ users | AI Product | **Flagship** (wide) |
| 2 | `capwell` | Autonomous multi-agent system managing 500,000 records | AI Agents | **Flagship** (wide) |
| 3 | `kcnl` | Cut LLM bill from $100K/month to $1.5K/month | LLM Cost | **Flagship** (wide) |
| 4 | `tula` | The AI therapist platform that raised $1.2M | AI Product | Standard |
| 5 | `medmatch` | HIPAA-compliant AI voice agent that sounds human | Voice AI | Standard |
| 6 | `fcs` | AI pipeline handling 2,000 users and 68,000 leads | Automation | Standard |
| 7 | `bestinform` | International airline ticketing platform | Full-Stack | Short |
| 8 | `sony` | 120× faster survey data pipeline at Sony PlayStation | Full-Stack | Short |

**Tiering rules:**

- **Flagship (3):** biggest, most quoted, most transformative outcomes. Get the wide cards.
- **Standard (3):** strong AI work, good metrics, less brand recognition. Standard cards.
- **Short (2):** older or enterprise work. Serves as breadth signal. Standard cards but shorter copy.

---

## 2. Page metadata

```ts
// src/app/work/page.tsx
export const metadata = {
  title: 'Work. Production AI systems we\'ve shipped. | codewithhaseeb',
  description:
    'Eight case studies. Real metrics. From a $100K LLM bill cut to $1,500, to an AI avatar serving 17,000 users.',
  openGraph: {
    title: 'Work. Production AI systems.',
    description: 'Eight case studies. Real metrics. No demos.',
    images: ['/og/work.png'],
    type: 'website',
  },
  alternates: { canonical: 'https://codewithhaseeb.com/work' },
};
```

OG route: `src/app/work/opengraph-image.tsx`.

---

## 3. Page shell

```tsx
<main>
  <WorkHero />              {/* cream */}
  <WorkFilters />           {/* cream, sticky-ish */}
  <WorkGrid />              {/* cream */}
  <WorkNumbers />           {/* DARK interstitial */}
  <FinalCTA variant="work" />  {/* DARK close */}
</main>
```

Surface alternation: cream → dark → dark. The top half is one continuous cream canvas with the hero, filters, and grid inside. The dark `WorkNumbers` interstitial breaks the rhythm before the closing CTA.

### Spacing

| Section | Desktop | Mobile |
|---|---|---|
| WorkHero | `pt-[160px] pb-[64px]` | `pt-[96px] pb-[40px]` |
| WorkFilters | `py-6` | `py-4` |
| WorkGrid | `pb-[128px]` | `pb-[72px]` |
| WorkNumbers | `py-[140px]` | `py-[88px]` |
| FinalCTA | `py-[160px]` | `py-[96px]` |

Container: `container-tight` (max-w-[1200px]).

---

## 4. Section specs

### 4.1 WorkHero

**Surface:** cream `#F3F2F1`.

**Layout:** Single column, left-aligned. No right panel. Keep focused.

**Content:**

```
Eyebrow (IBM Plex Mono 12px tracking 0.08em lowercase, #8C8C8C):
  work

Headline (Bricolage clamp(48px, 7vw, 88px) weight 500 tracking -0.02em, #1D2020):
  Eight systems. Real metrics.
  No demos.

Subhead (Bricolage 20px leading 1.5, #5A5C5C, max-width 640px, mt-6):
  Everything here is in production or was shipped as part of a paid
  engagement. We picked outcomes over screenshots.

[Stat strip mt-10, flex flex-wrap gap-10, on one row desktop, wraps mobile]:
  17K users · $100K → $1.5K · 500K records · $1.2M raised · 68K leads
```

The stat strip uses large Bricolage numbers with a tiny mono label underneath, no card styling. Pulls visitor into the page.

```tsx
<div className="mt-12 flex flex-wrap gap-x-10 gap-y-6">
  {[
    { num: '17K', label: 'users live on Aphra' },
    { num: '$100K → $1.5K', label: 'LLM bill cut at KCNL' },
    { num: '500K', label: 'records handled by Capwell agent' },
    { num: '$1.2M', label: 'raised after Tula launch' },
    { num: '68K', label: 'leads automated at FCS' },
  ].map(s => (
    <div key={s.label}>
      <div className="text-[28px] font-sans font-medium" style={{ color: '#1D2020' }}>
        {s.num}
      </div>
      <div className="mt-1 text-[12px]" style={{ color: '#5A5C5C' }}>
        {s.label}
      </div>
    </div>
  ))}
</div>
```

No mono on stat labels. No underscores.

### 4.2 WorkFilters

**Surface:** cream (continues from hero).

**Layout:** Horizontal row of filter pills. Sticky on scroll is **optional** (v2 if needed, v1 skip).

**Filters:**

```
All (8)   AI Product (2)   AI Agents (1)   Voice AI (1)   Automation (1)   Full-Stack (2)   LLM Cost (1)
```

Pills: 36px tall, `px-4`, radius full, 13px font.

- **Inactive:** bg `#FFFFFF`, border `1px solid #E7E6E4`, text `#1D2020`.
- **Active:** bg `#1D2020`, text `#F3F2F1`, no border.
- **Hover inactive:** bg `#F3F2F1` border `#1D2020`.

**Implementation:** client component with `useState` for active filter. Filter the `WorkGrid` by `category` field. Animate card presence with Framer Motion `AnimatePresence` + `layout` prop. No URL state for v1 (add `?filter=voice-ai` query param later if useful).

```tsx
'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const filters = [
  { id: 'all',         label: 'All',           count: 8 },
  { id: 'ai-product',  label: 'AI Product',    count: 2 },
  { id: 'ai-agents',   label: 'AI Agents',     count: 1 },
  { id: 'voice-ai',    label: 'Voice AI',      count: 1 },
  { id: 'automation',  label: 'Automation',    count: 1 },
  { id: 'full-stack',  label: 'Full-Stack',    count: 2 },
  { id: 'llm-cost',    label: 'LLM Cost',      count: 1 },
] as const;
```

On mobile (<640px): horizontal scroll with subtle fade-edges (`mask-image`) and no scrollbar. Always show `All` first.

### 4.3 WorkGrid (bento)

**Surface:** cream (continues).

**Layout:** 4-column asymmetric bento on desktop. 2-col tablet. 1-col mobile.

**Desktop grid plan** (8 cards):

```
Row 1: [ aphra span-2   ][ capwell span-1 ][ kcnl span-1 ]  — all flagship
Row 2: [ tula span-1  ][ medmatch span-1  ][ fcs span-2 ]
Row 3: [ bestinform span-1 ][ sony span-3 ]                  — sony wide closes grid
```

Rationale:
- Aphra wide left (the hero story, "17K users live").
- Capwell + KCNL stacked right (strong but shorter hits).
- Tula + Medmatch + FCS in middle row, FCS wide (emotional pull, "68K leads").
- Bestinform small, Sony wide bottom (finishes with enterprise-scale credibility).

Row height: `auto-rows-[320px]` desktop. Wide cards (`span-2`) are 320px tall too (no taller). Sony `span-3` wraps to 2 rows on mobile.

```tsx
<div className="grid gap-4 md:grid-cols-4 md:auto-rows-[320px]">
  <CaseCard slug="aphra"      size="wide" />
  <CaseCard slug="capwell"    size="standard" />
  <CaseCard slug="kcnl"       size="standard" />
  <CaseCard slug="tula"       size="standard" />
  <CaseCard slug="medmatch"   size="standard" />
  <CaseCard slug="fcs"        size="wide" />
  <CaseCard slug="bestinform" size="standard" />
  <CaseCard slug="sony"       size="xwide" />
</div>
```

### 4.4 CaseCard component

Three sizes: `standard` (span-1), `wide` (span-2), `xwide` (span-3).

**Anatomy (all sizes):**

```
┌──────────────────────────────────────────┐
│                                          │
│   [Cover image, fills card, 60% of height]
│                                          │
│                                          │
├──────────────────────────────────────────┤
│   [Category eyebrow]      [Year]         │
│                                          │
│   Title of the case study,               │
│   one or two lines                       │
│                                          │
│   [Metric chip]  [Metric chip]           │
│                                          │
└──────────────────────────────────────────┘
```

**Standard card (span-1, 320px tall, ~280px wide on desktop):**

- Cover image 180px tall (56% of card). Object-cover. Radius 16px top only.
- Padding below image: `p-5`.
- Category eyebrow: IBM Plex Mono 11px tracking 0.08em lowercase `#8C8C8C`.
- Year (right-aligned in same row as eyebrow): same style.
- Title: Bricolage 18px weight 500 leading-[1.25] `#1D2020`, mt-3. Line-clamp 2.
- Metric chips row: mt-4, flex gap-2, max 2 chips visible.
- Whole card is a `<Link href="/work/{slug}">`.
- Hover: translate-y -4px, shadow `0 12px 32px rgba(0,0,0,0.08)`, 220ms ease-out.

**Wide card (span-2, 320px tall):**

- Cover image on left, 50% width, full height. Radius 16px left only.
- Content right half, padded `p-7`.
- Title goes larger: Bricolage 24px weight 500.
- Has room for short one-sentence outcome line after title, Bricolage 15px `#5A5C5C`.
- Metric chips row can show 3 chips.

**Xwide card (span-3, 320px tall, last row sony):**

- Cover image left 33% width, full height.
- Content 67%, padded `p-8`.
- Title Bricolage 28px.
- Outcome line visible, Bricolage 16px `#5A5C5C`, max 2 lines.
- Up to 3 metric chips.
- Right edge can include a "Read case study" text link (no `→` glyph, just underline on hover).

**Metric chip styling:**

```tsx
<span className="inline-flex items-center px-2.5 py-1 rounded-full"
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E7E6E4',
        fontSize: 12,
        color: '#1D2020',
      }}>
  <strong className="font-medium">17K</strong>
  <span className="ml-1" style={{ color: '#5A5C5C' }}>active users</span>
</span>
```

**Card background:**
- Use cover image as the visual. Card body below is `#FFFFFF`.
- Whole card: `rounded-2xl`, `overflow-hidden`, `border: 1px solid #E7E6E4`.
- Shadow rest: `0 1px 3px rgba(0,0,0,0.04)`.

### 4.5 Card data source

Extend `siteConfig.caseStudies` (or create `src/lib/case-studies-meta.ts` if it doesn't exist, matching context doc):

```ts
export type CaseStudy = {
  slug: string;
  title: string;              // long title from MDX front matter
  shortTitle: string;         // for card (line-clamp-2 safe)
  outcome: string;            // 1-sentence for wide cards
  cover: string;              // /covers/aphra-cover.webp
  year: string;               // '2024'
  category: 'ai-product' | 'ai-agents' | 'voice-ai' | 'automation' | 'full-stack' | 'llm-cost';
  metrics: { value: string; label: string }[];  // 2-3 items
  featuredOnHome: boolean;
  tier: 'flagship' | 'standard' | 'short';
};
```

**Example (`aphra`):**

```ts
{
  slug: 'aphra',
  title: 'Real-time AI video avatar serving 17,000+ users',
  shortTitle: 'AI video avatar, 17K users live.',
  outcome: 'Shipped from Figma to production in 9 weeks. Now serving 17,000 daily active users.',
  cover: '/covers/aphra-cover.webp',
  year: '2024',
  category: 'ai-product',
  metrics: [
    { value: '17K',  label: 'active users' },
    { value: '9wk',  label: 'to launch' },
    { value: '99.8%', label: 'uptime' },
  ],
  featuredOnHome: true,
  tier: 'flagship',
};
```

### 4.6 WorkNumbers (dark interstitial)

**Surface:** dark `#1D2020`, cream text.

**Layout:** Centered, max-width 960px. `py-[140px]`. Sits between grid and closing CTA. Acts as a "zoom out" moment: across the 8 studies, here's what it adds up to.

**Content:**

```
Eyebrow (IBM Plex Mono 12px tracking 0.08em lowercase, #A6A6A6):
  across all work

Headline (Bricolage 56px weight 500 tracking -0.02em, #F3F2F1):
  What 8 projects add up to.

[Stat grid, 4 cols desktop, 2 cols mobile, mt-16]:
  49       projects completed
  100%     Upwork job success
  $0       ad spend to get here
  14       countries clients served from

[Each stat:]
  Value: Bricolage 72px weight 500, #D8F9B8
  Label: Bricolage 15px leading 1.45, #C4C4C4, mt-2, max-width 180px
```

Lime numbers. English labels. No mono on the stat grid.

Only real, defensible numbers. If `14 countries` isn't accurate, replace with another claim. Never invent.

### 4.7 FinalCTA (variant)

Reuse home `FinalCTA` with `variant="work"` copy:

```
Headline: See one that matches your project? Let's scope it.
Subhead: 30-minute call. We push back if we're not the right fit.
CTA: Book a scoping call    (lime pill)
Secondary: Or email haseeb@codewithhaseeb.com   (text link, #D8F9B8)
```

---

## 5. Components

| Component | Path |
|---|---|
| `WorkHero` | `sections/work/WorkHero.tsx` |
| `WorkFilters` | `sections/work/WorkFilters.tsx` (client component) |
| `WorkGrid` | `sections/work/WorkGrid.tsx` (client, animates) |
| `CaseCard` | `sections/work/CaseCard.tsx` (takes `size` prop) |
| `WorkNumbers` | `sections/work/WorkNumbers.tsx` |

`FinalCTA` already exists (home). Add `variant` prop if not present.

---

## 6. SEO

### JSON-LD

Emit `CollectionPage` at top of `/work`:

```ts
const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Work — codewithhaseeb',
  url: 'https://codewithhaseeb.com/work',
  description: 'Eight production AI and full-stack engineering case studies.',
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: caseStudies.map((cs, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://codewithhaseeb.com/work/${cs.slug}`,
      name: cs.title,
    })),
  },
};
```

Per-study `Article` schema lives on `/work/[slug]` pages, not here.

### Internal links

- Home `FeaturedWork` "See all work" → `/work`
- Home `ServicesGrid` cards → `/services#service-{slug}` (not `/work`)
- `/services` proof chips → `/work/{slug}`
- Each `CaseCard` → `/work/{slug}`
- `/work/{slug}` pages → `/work` back link (breadcrumb)

---

## 7. Accessibility

- Card entire link uses `<Link>` wrapping, not nested anchors.
- Cover image has alt text (from `caseStudy.coverAlt` MDX front matter).
- Filter pills are `<button role="tab">` with `aria-selected`. The grid is `role="tabpanel"`.
- Focus ring on cards: `focus-visible:ring-2 ring-offset-2 ring-[#1D2020]`.
- Category eyebrow uses proper text (no icons replacing text).
- Reduced motion: disable card-enter staggers.

---

## 8. Motion

- **Card entry on load:** stagger 40ms, fade-up 16px, 280ms ease-out.
- **Card hover:** translateY -4px, shadow deepens, 220ms.
- **Filter change:** `AnimatePresence` with `layout` prop on grid. Cards that leave fade out + scale 0.96 (160ms). Cards that arrive fade in + scale from 0.96 (220ms). Grid re-flows with Framer `layout`.
- **WorkNumbers stat reveal:** single-time, one-direction counter animation **disabled by default** (too template-y). If added, only on intersection, 800ms, reduced-motion off.

No parallax. No scroll-jacking. No kinetic type.

---

## 9. Responsive

| Breakpoint | Behavior |
|---|---|
| `<640px` | Filters scroll horizontally. Grid is 1 col. All cards become `size="standard"` (override wide/xwide). Cover 200px tall. |
| `640-1023px` | 2-col grid. Wide cards become 2-col (full width). Xwide sony becomes 2-col. |
| `≥1024px` | 4-col bento as specified. |
| `≥1440px` | Container caps 1200px. |

---

## 10. Analytics events

| Event | Trigger | Params |
|---|---|---|
| `work_view` | page mount | none |
| `work_filter_change` | filter pill click | `{ filter_id }` |
| `work_card_click` | card click | `{ slug, position, filter }` |
| `work_numbers_view` | dark interstitial 50% visible | none |
| `work_cta_click` | FinalCTA click | `{ location }` |

---

## 11. Implementation order

1. Build `CaseCard` with all 3 sizes, render one per size to verify.
2. Build `WorkGrid` with static card list. Verify bento layout on desktop.
3. Extend meta to 8 studies. Fill real metrics.
4. Build `WorkFilters` with state. Verify category filtering works.
5. Wrap grid in Framer `AnimatePresence` + `layout`. Verify transitions.
6. Build `WorkHero` with stat strip.
7. Build `WorkNumbers` dark interstitial.
8. Wire `FinalCTA variant="work"`.
9. Emit JSON-LD.
10. Add OG route.
11. Wire analytics.
12. Screenshot 1440 + 390.

---

## 12. Acceptance checklist

- [ ] 8 case studies render in bento grid, matching tier hierarchy.
- [ ] Filters work and animate cards in/out cleanly.
- [ ] No em dashes, no `→`, no underscore_case anywhere.
- [ ] Card hovers don't feel template-generic (subtle lift, not big scale).
- [ ] WorkNumbers stats are real, not invented.
- [ ] All 8 `/work/[slug]` links resolve to MDX pages (even if some are short).
- [ ] JSON-LD validates.
- [ ] Lighthouse ≥90 performance.
- [ ] Mobile: filters scroll, grid stacks cleanly.

---

**End of 10-WORK-PAGE-SPEC.md**
