# 11. About Page Specification

**URL:** `/about`
**Status:** Spec. Implement as part of Task 7.
**Design language:** Finns-reference. Editorial, quiet. More image-driven than other pages. Surface alternation. No em dashes, no `→` glyphs, no underscore_case, no lucide-in-pastel-squares.

## Positioning decision

The user ships as **Haseeb + senior backup**, not "5-person agency." On `/about` we lead with Haseeb:

- One founder, named, photographed.
- "We" means Haseeb + a small senior bench.
- No team cards, no photos of strangers, no LinkedIn-style avatar grid.
- No made-up team structure or org chart.

This matches the Upwork reality (Haseeb is the named freelancer). It keeps the page honest. Clients can ask about the team on the call.

---

## 0. Purpose

`/about` answers three questions:

1. Who is actually going to do this work?
2. What's their story and can I trust their judgment?
3. How do they work and are they going to be annoying?

Success = visitor leaves feeling the operator is legitimate and thoughtful. Secondary = they book a call.

---

## 1. Content sources

| Source | What to use |
|---|---|
| `index.html` (old site) | Confirmed: Microsoft, Sony PlayStation history. Islamabad base. Email, phone, LinkedIn, WhatsApp details. Resume PDF exists. |
| `01-BUILD-SPEC.md` | Five principles (good, lightly edit). Existing About narrative (keep the frame, rewrite the voice). |
| `02-CASE-STUDIES.md` | Pull concrete proof numbers only (17K users, $100K→$1.5K, $1.2M raised). |

### What to drop from old site

- "Top 3% Talent" badge copy. Reads as Upwork-marketing.
- "Client-Centric Approach / Proven Results / Full-Stack Mastery" bullet list. Generic.
- Emoji bullets (🎖💼✅). Removed per project rules.
- "Download CV / Hire Me" dual button. Keep CV link but demote it.
- Signature image (`signature.webp`). Skippable, too personal-brand-LARP.

### What to add (not in old site)

- A real photo of Haseeb (already exists as `selfintro.webp`, but should probably be retaken clean and pro).
- A short "principles" section that feels like opinion, not marketing.
- A "how we work" section that explains the process in human terms.
- Quiet team mention without cards.

---

## 2. Page metadata

```ts
// src/app/about/page.tsx
export const metadata = {
  title: 'About. Muhammad Haseeb, lead engineer. | codewithhaseeb',
  description:
    'Senior AI engineer based in Islamabad. Ex-Sony PlayStation scale, now shipping AI products for funded founders. Working with a small senior bench.',
  openGraph: {
    title: 'About. Muhammad Haseeb.',
    description:
      'Senior AI engineer. Ex-Sony PlayStation. Based in Islamabad. Small senior bench.',
    images: ['/og/about.png'],
    type: 'profile',
  },
  alternates: { canonical: 'https://codewithhaseeb.com/about' },
};
```

OG route: `src/app/about/opengraph-image.tsx`.

---

## 3. Page shell

```tsx
<main>
  <AboutHero />          {/* cream, image-heavy */}
  <AboutStory />         {/* white, editorial */}
  <AboutPrinciples />    {/* DARK */}
  <AboutHowWeWork />     {/* cream */}
  <AboutBench />         {/* white, quiet team mention */}
  <AboutElsewhere />     {/* cream, links + CV + contact */}
  <FinalCTA variant="about" />  {/* DARK */}
</main>
```

Surface alternation: cream → white → dark → cream → white → cream → dark.

### Spacing

| Section | Desktop | Mobile |
|---|---|---|
| AboutHero | `pt-[160px] pb-[120px]` | `pt-[96px] pb-[72px]` |
| AboutStory | `py-[120px]` | `py-[72px]` |
| AboutPrinciples | `py-[140px]` | `py-[88px]` |
| AboutHowWeWork | `py-[112px]` | `py-[64px]` |
| AboutBench | `py-[96px]` | `py-[56px]` |
| AboutElsewhere | `py-[96px]` | `py-[56px]` |
| FinalCTA | `py-[160px]` | `py-[96px]` |

Container: `container-tight`.

---

## 4. Section specs

### 4.1 AboutHero (photo + short hook)

**Surface:** cream `#F3F2F1`.

**Layout (desktop ≥1024px):** 12-col grid. Photo left 5/12, content right 7/12.

**Photo column:**

- Aspect ratio 4:5, portrait. Image filename: `/about/haseeb.webp`.
- Size: ~480×600 rendered, 960×1200 source.
- `rounded-2xl`, `object-cover`, subtle shadow `0 16px 40px rgba(0,0,0,0.08)`.
- Treatment: straight color photo. No heavy filter. No green overlay. No CSS gimmicks. The photo IS the visual.
- **Required:** a real, recent, clean photo. Studio or near-window natural light. Plain background (cream or charcoal works). Professional dress but not stiff. If no good photo exists, commission one before launch. Do NOT use the old `selfintro.webp` if it doesn't hold up at 480px wide.

**Content column (right):**

```
Eyebrow (IBM Plex Mono 12px tracking 0.08em lowercase, #8C8C8C):
  about

Headline (Bricolage clamp(48px, 6.5vw, 72px) weight 500 tracking -0.02em, #1D2020):
  Muhammad Haseeb.
  Lead engineer.

Subhead (Bricolage 20px leading 1.5, #5A5C5C, max-width 520px, mt-6):
  I build production AI systems for funded founders and SMBs.
  Based in Islamabad. Remote since 2020. Working with a small senior
  bench when a project calls for it.

[Stat pill row mt-10, flex gap-6, mono-ish]:
  Islamabad · UTC+5 · Remote since 2020 · 49 projects · 100% JSS
```

Stat pill row: single line of facts, separated by `·` dots, Bricolage 14px `#1D2020`, opacity 0.75. No card. No badges. Just typography.

**Mobile (<1024px):** photo stacks on top of content, max-width 320px, centered. Then content left-aligned below.

### 4.2 AboutStory (editorial narrative)

**Surface:** white `#FFFFFF`.

**Layout:** Centered column, max-width 680px (reading width). Single-column, no image.

**Content:**

```
Eyebrow (mono 12px tracking 0.08em lowercase, #8C8C8C):
  the short version

Headline (Bricolage 40px weight 500, #1D2020, mb-10):
  How we got here.

Body paragraphs (Bricolage 19px leading 1.65, #1D2020, spacing between paragraphs: 1.5rem):

  I started engineering professionally in 2019. By 2022 I'd worked on survey
  data pipelines at Sony PlayStation scale, which taught me what "production"
  actually means: it's not the code, it's the discipline around the code.

  Since then I've been independent. I've helped a health-tech startup raise
  $1.2 million after shipping their AI therapist. I've watched an enterprise
  LLM bill go from $100,000 a month to $1,500 after we rewrote the routing
  layer. I've shipped an AI avatar that now serves 17,000 daily users.

  Every engagement since 2020 has been remote. Every one has closed with the
  client happy enough to rehire or refer. That's not a marketing claim, it's
  the Upwork record: 49 projects, 100% job success.

  I work with a small bench of senior engineers when the scope needs more
  than one pair of hands. Everyone I bring on is hand-picked and has shipped
  production systems in the last year. No juniors on billable code. No
  subcontractors the client can't reach directly.

  That's the whole pitch.
```

Five paragraphs, ~250 words. Short, direct, zero "passionate about AI" phrases. Voice is I, not we, because it's the story of Haseeb. "We" returns in principles and how-we-work sections.

### 4.3 AboutPrinciples (dark, opinionated)

**Surface:** dark `#1D2020`, cream text.

**Layout:** Left-aligned. Eyebrow + headline at top. Five principles listed below as large numbered entries.

**Content:**

```
Eyebrow (IBM Plex Mono 12px tracking 0.08em lowercase, #A6A6A6):
  how we work

Headline (Bricolage 56px weight 500 tracking -0.02em, #F3F2F1, max-width 720px):
  Five things we won't compromise on.

[5 principles, each a 2-column block. 80px padding between principles.]

  [01 large, Bricolage 72px weight 400, #D8F9B8, col-3 of 12]
    
  [Content right, col-4 to col-11]
    Title: Bricolage 28px weight 500, #F3F2F1
    Body:  Bricolage 17px leading 1.65, #C4C4C4, max-width 560px, mt-3
```

**The five principles (edited from spec):**

1. **Ship in production or don't ship at all**
   Demos don't count. If it doesn't survive real load and real users, it's not done. Every case study on this site is a live system, not a screenshot.

2. **Fixed scope. Fixed price. Fixed timeline.**
   We commit to outcomes in writing before you pay. Scope changes get a written change order and both sides sign. You never see a revised invoice in your inbox.

3. **Honest scoping, even when it loses us the deal**
   If your problem doesn't need AI, we'll tell you. If another team is a better fit, we'll say that too. About 1 in 4 scoping calls end with us recommending someone else. That's a feature.

4. **Push back on bad ideas**
   The worst AI projects aren't technical failures. They're scoping failures. We'd rather argue for 30 minutes than build the wrong thing for 8 weeks.

5. **One accountable lead**
   You don't get shuffled between junior devs. I'm the technical lead on every engagement. When a project needs more hands, you meet the senior engineer doing the work. No outsourcing behind the scenes.

Number styling: large lime numerals set left. Principles read like a manifesto, not a bulleted list. No em dashes anywhere.

### 4.4 AboutHowWeWork (process, human language)

**Surface:** cream `#F3F2F1`.

**Layout:** Left-aligned column. Simple numbered list with slightly more narrative than the home `Process` section.

**Content:**

```
Eyebrow: the process

Headline (Bricolage 40px weight 500, #1D2020, max-width 560px):
  What actually happens when you hire us.

Subhead (Bricolage 18px leading 1.6, #5A5C5C, max-width 560px, mt-4):
  This is the playbook for a typical engagement. Nothing surprising.
  That's the point.

[5 steps. Each 12-col grid: number col-1, content col-2 to col-10, padding py-8 with 1px border-b #E7E6E4]
```

**5 steps:**

1. **Free 30-minute scoping call.**
   We ask about outcomes, not features. We push back on scope we think is wrong. Half the time the brief shifts during the call. That's fine.

2. **Written proposal within 3 business days.**
   Milestones, prices, deliverables, timeline. One page. No ambiguity. You either sign or tell us what needs to change.

3. **Weekly sprints with a Friday demo.**
   We build against the milestones. Every Friday you see working software, not slides. You approve before we move on.

4. **Daily async updates.**
   Slack, Loom, or email. Your call. You always know what's being built and what's blocked. If something's off, you hear it that day.

5. **30 days of post-launch support.**
   Bug fixes are on us for 30 days after we ship. After that, retainer or ad-hoc. Either way, you're not stranded.

Step number styling: `01` through `05`, Bricolage 32px weight 400, `#D8F9B8` on cream (visible but not shouting).

### 4.5 AboutBench (quiet team mention, no cards)

**Surface:** white `#FFFFFF`.

**Layout:** Centered, max-width 720px. No photos, no cards.

**Content:**

```
Eyebrow: the bench

Headline (Bricolage 36px weight 500, #1D2020):
  When a project needs more hands.

Body (Bricolage 18px leading 1.65, #1D2020, max-width 640px, mt-6):
  I keep a small bench of senior engineers I've worked with for years.
  They come in when scope calls for two or three pairs of hands.

  Backend and infra, voice and speech, full-stack web, data engineering.
  Everyone has shipped production systems in the last 12 months. Everyone
  has worked with me on at least one project before. You'll meet whoever's
  on your engagement before they write a line of your code.

  I don't publish a team roster because it changes project to project and
  the roster isn't the point. The point is that if you hire us and the
  project grows, we don't go find strangers on Upwork. You're already
  covered.

[CTA row mt-10]:
  Primary lime pill: "Book a call to meet the team"
```

This block does three jobs:

1. Addresses the "are you alone?" objection without lying.
2. Explains why there are no team photos (an honesty signal, not a limitation).
3. Frames the bench as an asset, not a liability.

### 4.6 AboutElsewhere (links, CV, contact)

**Surface:** cream `#F3F2F1`.

**Layout:** Horizontal row on desktop. Stacks on mobile.

**Content:**

```
Eyebrow: find me elsewhere

Headline (Bricolage 32px weight 500, #1D2020, max-width 520px, mb-10):
  If you want to verify anything, verify away.

[Row of link cards. 4 items, grid-cols-2 md:grid-cols-4 gap-4]:

  ┌──────────────────┐   ┌──────────────────┐   ┌──────────────────┐   ┌──────────────────┐
  │ Upwork           │   │ LinkedIn         │   │ GitHub           │   │ Resume PDF       │
  │                  │   │                  │   │                  │   │                  │
  │ 49 projects.     │   │ Professional     │   │ Public work.     │   │ Full history.    │
  │ 100% JSS.        │   │ history.         │   │                  │   │ 2 pages.         │
  │                  │   │                  │   │                  │   │                  │
  │ Visit →          │   │ Visit →          │   │ Visit →          │   │ Download →       │
  └──────────────────┘   └──────────────────┘   └──────────────────┘   └──────────────────┘
```

**Card styling:**

- `bg-white`, `border: 1px solid #E7E6E4`, `rounded-2xl`, `p-6`, min-height 180px.
- Title: Bricolage 18px weight 500 `#1D2020`.
- Body: 14px `#5A5C5C` leading-1.55, mt-3.
- Link row at bottom: mono 12px tracking-wide lowercase, `#6D5EF3`.
- "Visit" and "Download" are text, not arrow glyphs. Hover underline.
- Hover: translate-y -2px, shadow `0 8px 24px rgba(0,0,0,0.05)`, 200ms.

**Links:**

- Upwork: `https://www.upwork.com/freelancers/muhammadh72`
- LinkedIn: `https://www.linkedin.com/in/haseeb-ai`
- GitHub: `https://github.com/hassibayub`
- Resume: `/Haseeb Resume — Full-Stack AI Engineer.pdf` (already in repo root, move to `/public/resume.pdf` with clean filename)

### 4.7 FinalCTA (variant)

Reuse home `FinalCTA` with `variant="about"` copy:

```
Headline: Let's see if we're a fit.
Subhead: 30 minutes. Free. We're direct about what we can and can't do.
CTA: Book a scoping call    (lime pill)
Secondary: Or email haseeb@codewithhaseeb.com   (text link, #D8F9B8)
```

---

## 5. Components

| Component | Path |
|---|---|
| `AboutHero` | `sections/about/AboutHero.tsx` |
| `AboutStory` | `sections/about/AboutStory.tsx` |
| `AboutPrinciples` | `sections/about/AboutPrinciples.tsx` |
| `AboutHowWeWork` | `sections/about/AboutHowWeWork.tsx` |
| `AboutBench` | `sections/about/AboutBench.tsx` |
| `AboutElsewhere` | `sections/about/AboutElsewhere.tsx` |
| `LinkCard` | `ui/link-card.tsx` (reusable, could be used on blog later too) |

---

## 6. SEO

### JSON-LD

Emit a `Person` schema:

```ts
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Muhammad Haseeb',
  jobTitle: 'Lead AI Engineer',
  url: 'https://codewithhaseeb.com/about',
  image: 'https://codewithhaseeb.com/about/haseeb.webp',
  sameAs: [
    'https://www.linkedin.com/in/haseeb-ai',
    'https://www.upwork.com/freelancers/muhammadh72',
    'https://github.com/hassibayub',
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'codewithhaseeb',
    url: 'https://codewithhaseeb.com',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Islamabad',
    addressCountry: 'PK',
  },
};
```

### Canonical + OG

Standard. `metadata.alternates.canonical`. `opengraph-image.tsx` route.

---

## 7. Accessibility

- Photo has descriptive `alt`: "Muhammad Haseeb, lead engineer at codewithhaseeb, photographed in Islamabad."
- Heading hierarchy: page `<h1>` in hero, each section `<h2>`. Principles titles are `<h3>`.
- Principle numbers marked `aria-hidden` (decorative).
- LinkCards use `<a>`, not `<div onClick>`.
- Contrast: dark section 18px+ meets AA. Cream sections meet AAA.
- CV download link: `<a download>` with clear label, no ambiguity.

---

## 8. Motion

- **Hero photo entrance:** fade + scale 0.98→1, 400ms, once.
- **Story paragraphs:** fade-up 8px, stagger 120ms, once on intersection.
- **Principle numbers:** fade-in 400ms from 0.4 opacity to 1, staggered by 80ms.
- **LinkCard hover:** translateY -2px, 200ms.
- **No parallax.** No counters. No scroll-pinned sections.
- `prefers-reduced-motion` disables all transitions.

---

## 9. Responsive

| Breakpoint | Behavior |
|---|---|
| `<640px` | Photo stacks on top, max 280px wide, centered. Principles use 2-row layout (number on own line). LinkCards go to 1 col. |
| `640-1023px` | Photo + content 5/7 split. Principles 12-col works. LinkCards 2-col. |
| `≥1024px` | Full spec. |

---

## 10. Analytics events

| Event | Trigger | Params |
|---|---|---|
| `about_view` | page mount | none |
| `about_principles_view` | dark section 50% visible | none |
| `about_bench_view` | bench section 50% visible | none |
| `about_link_click` | LinkCard click | `{ target: 'upwork' \| 'linkedin' \| 'github' \| 'resume' }` |
| `about_cta_click` | FinalCTA click | none |
| `about_resume_download` | resume PDF clicked | none |

---

## 11. Required assets

| Asset | Path | Status |
|---|---|---|
| Haseeb portrait | `/public/about/haseeb.webp` | **Needs shoot.** Old `selfintro.webp` may work temporarily if it's clean. |
| Resume PDF | `/public/resume.pdf` | Exists in repo root as "Haseeb Resume — Full-Stack AI Engineer.pdf". Move + rename. |
| OG image | `src/app/about/opengraph-image.tsx` | Route generates. |

---

## 12. Acceptance checklist

- [ ] No team card grid. No invented team members.
- [ ] Haseeb photo loads cleanly at desktop and mobile.
- [ ] No em dashes in rendered DOM.
- [ ] No `→` glyphs in buttons or link copy. "Visit" is text, hover underline.
- [ ] Principles read like opinion, not bullet marketing. Zero "passionate about" phrases.
- [ ] Bench section honestly addresses "are you alone" without fake team cards.
- [ ] LinkCards all open in new tabs (rel noopener) except resume which downloads.
- [ ] JSON-LD `Person` schema validates.
- [ ] Lighthouse ≥90 performance (watch out for hero photo size; compress).
- [ ] Mobile hero photo not huge (max 320px wide).

---

## 13. Out of scope

- Team member detail pages.
- A "meet the team" carousel.
- Testimonials on `/about` (they live on home, don't duplicate).
- A full career timeline or resume rendering (use PDF link).
- Awards/press logos section (unless we have real ones).

**End of 11-ABOUT-PAGE-SPEC.md**
