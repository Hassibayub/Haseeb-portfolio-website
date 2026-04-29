# 07 / Implementation Playbook

This is the "go build it" doc for the next dev session. Every change has a file path, current state, target state, and drop-in code. Work top to bottom. Each task has an estimated time. Total: around 5 to 6 focused hours.

Prerequisites:
- You have read `06-STATUS-AND-SOUL-FIX.md`. The WHY lives there. This is the HOW.
- Working directory: `/Users/haseeb/Documents/Haseeb portfolio website/codewithhaseeb`
- Dev server: `bun dev`. Runs on `http://localhost:3000`.

---

## Task 0 / Setup (5 min)

Install one new dependency. Tabler icons replace the emoji in `ServicesGrid`.

```bash
bun add @tabler/icons-react
```

Verify it lands in `package.json` under dependencies.

No other installs needed. Everything else (shadcn, MagicUI, Framer Motion, Resend, etc.) is already installed.

---

## Task 1 / Text pass: kill em dashes and arrow characters (45 min)

### 1.1 Em dashes

Run this first to see what you are up against:

```bash
grep -rn "—" src/ --include="*.tsx" --include="*.ts" --include="*.css"
```

### 1.2 Replacements by file

Apply each of these exactly. Every change is one line.

**`src/app/page.tsx` (line 14)**

Current:
```ts
description:
  'We ship production AI systems — not demos that break. A 5-person senior engineering team building for YC-backed founders. Aphra (17K users). Capwell. Tula. Sony PlayStation.',
```

Replace with:
```ts
description:
  'We ship production AI systems. Not demos that break. A 5-person senior engineering team building for YC-backed founders. Aphra (17K users). Capwell. Tula. Sony PlayStation.',
```

**`src/lib/siteConfig.ts` (line 5)**

Current:
```ts
description:
  'We ship production AI — not demos. A 5-person senior engineering team building for funded startups and SMBs.',
```

Replace with:
```ts
description:
  'We ship production AI. Not demos. A 5-person senior engineering team building for funded startups and SMBs.',
```

**`src/lib/siteConfig.ts` (line 86)**

Current:
```ts
quote:
  'Muhammad is an absolute expert in his field. Humble, thoughtful, an absolute pleasure to work with. His suggestions are spot-on.',
```

Leave this one alone, the em dash is not there. (Verify with the grep above; if it shows, replace the em dash with a period.)

**`src/lib/siteConfig.ts` (line 167)**

Current:
```ts
body: "Slack, Loom, or email. Your call. We don't ghost. You always know what's being built.",
```

This one is already fixed. Skip.

**`src/components/sections/Hero.tsx` (line 36 and nearby)**

Open the file. Find any remaining em dashes in copy (not in code comments). The current headline should read:
```tsx
AI that runs in production. <span className="italic">Not demos that break under load.</span>
```

Keep the existing italic span. Just make sure the separator is a period, not an em dash.

**`src/components/sections/ForFoundersEnterprise.tsx`**

Look for:
```ts
body="...a senior team that can ship real code fast — not a cheap freelancer..."
body="...we build autonomous AI agents that handle it end-to-end — with audit trails..."
```

Replace each em dash with a period and capitalize the next word:
```ts
body="You've raised your round. Your AI product idea is validated. You need a senior team that can ship real code fast. Not a cheap freelancer who'll waste 3 months on a broken demo."

body="You have a manual process eating your team's time. Invoice processing, lead follow-up, data aggregation. We build autonomous AI agents that handle it end-to-end. Audit trails, cost controls, and compliance built in from day one."
```

**`src/components/sections/FinalCTA.tsx` (line 34)**

Current:
```tsx
right team — and if we're not, we'll tell you who is.
```

Replace with:
```tsx
right team. If we're not, we'll tell you who is.
```

**CSS comments (`src/app/globals.css`)**

Comments are fine but change for consistency:

```css
/* Colors — Light mode */           →    /* Colors / Light mode */
/* Colors — Dark surfaces */        →    /* Colors / Dark surfaces */
/* Typography scale — fluid */      →    /* Typography scale (fluid) */
```

### 1.3 Arrow characters (`→`, `->`, `»`)

Run:

```bash
grep -rn "→\|->" src/ --include="*.tsx" --include="*.ts" | grep -v "node_modules"
```

Expected hits (confirmed by last audit):

**`src/components/sections/Hero.tsx` (line 69)**

Current:
```tsx
Book a free 30-min call →
```

Replace with the icon-on-hover pattern. Add the import at top:

```tsx
import { ArrowUpRight } from 'lucide-react';
```

Then rewrite the CTA:

```tsx
<Link
  href={siteConfig.links.calendly}
  target="_blank"
  rel="noopener noreferrer"
  onClick={() => trackEvent('book_call_click', { location: 'hero_primary' })}
  className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-medium transition-all"
  style={{ backgroundColor: '#D8F9B8', color: '#1D2020' }}
>
  Book a free 30-min call
  <ArrowUpRight
    size={16}
    className="opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
  />
</Link>
```

**`src/components/sections/FinalCTA.tsx` (line 45)**

Current:
```tsx
Book a free scoping call →
```

Replace with the same `ArrowUpRight` pattern as above.

**`src/components/sections/FeaturedWork.tsx` (line 32)**

Current:
```tsx
View all case studies →
```

Replace with:

```tsx
<Link
  href="/work"
  className="group inline-flex items-center gap-2 text-sm font-medium"
  style={{ color: '#1D2020' }}
>
  View all case studies
  <ArrowUpRight
    size={15}
    className="opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
  />
</Link>
```

**`src/components/sections/ForFoundersEnterprise.tsx` (line 32, 46)**

Current:
```tsx
ctaLabel="See a founder case study →"
ctaLabel="See an SMB case study →"
```

Remove the arrow from the string:
```tsx
ctaLabel="See a founder case study"
ctaLabel="See an SMB case study"
```

Then inside the component that renders `ctaLabel` as a button/link, add the `ArrowUpRight` icon on hover (same pattern).

**`src/components/sections/ForFoundersEnterprise.tsx` (line 90)**

Current:
```tsx
<span style={{ color: '#7C3AED' }} className="mt-0.5 flex-shrink-0">→</span>
```

This is a bullet arrow in a list. Replace with a lime square bullet:

```tsx
<span
  className="mt-2 flex-shrink-0 w-1.5 h-1.5"
  style={{ backgroundColor: '#D8F9B8', borderRadius: '2px' }}
  aria-hidden
/>
```

**`src/components/layout/Navbar.tsx` (line 77 and 130)**

Current:
```tsx
Book a Call →
```

Replace with icon pattern. Also cascade the color change to lime per Task 4:

```tsx
<Link
  href={siteConfig.links.calendly}
  target="_blank"
  rel="noopener noreferrer"
  className="group ml-2 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all"
  style={{ backgroundColor: '#D8F9B8', color: '#1D2020' }}
>
  Book a call
  <ArrowUpRight
    size={14}
    className="opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
  />
</Link>
```

**`src/components/layout/Footer.tsx` (line 61)**

Current:
```tsx
All case studies →
```

Same `ArrowUpRight` pattern, smaller size (13 or 14).

### 1.4 Verify

Re-run both greps. The only hits remaining should be inside CSS keyframe selectors or code comments that are not user-facing.

```bash
grep -rn "—" src/
grep -rn "→" src/
```

Time estimate: 45 min.

---

## Task 2 / Spacing fixes (20 min)

Three files need spacing bumps to match Finns' generosity.

### 2.1 LogoBar (`src/components/sections/LogoBar.tsx` line 8)

Current:
```tsx
className="py-12 md:py-14 overflow-hidden"
```

Replace with:
```tsx
className="pt-24 pb-20 md:pt-28 md:pb-24 overflow-hidden"
```

Rationale: outer section needs to breathe. The inner marquee row is already 32px-equivalent tight. Finns' rule is outer generous, inner tight.

Also remove the top and bottom borders. They feel heavy with the new spacing. Change:

```tsx
style={{
  backgroundColor: '#F3F2F1',
  borderTop: '1px solid #EBEBEA',
  borderBottom: '1px solid #EBEBEA',
}}
```

to:

```tsx
style={{ backgroundColor: '#F3F2F1' }}
```

### 2.2 Process (`src/components/sections/Process.tsx` line 5)

Current:
```tsx
<section className="py-16 md:py-24" style={{ backgroundColor: '#FFFFFF' }}>
```

Replace with:
```tsx
<section className="py-24 md:py-32" style={{ backgroundColor: '#FFFFFF' }}>
```

### 2.3 Testimonials (`src/components/sections/Testimonials.tsx` line 7)

Current:
```tsx
<section className="py-16 md:py-24" style={{ backgroundColor: '#F3F2F1' }}>
```

Replace with:
```tsx
<section className="py-24 md:py-32" style={{ backgroundColor: '#F3F2F1' }}>
```

### 2.4 Verify

Spin up `bun dev`. Scroll the homepage. Each section should feel distinct and breathe. No two sections should feel cramped against each other.

Time estimate: 20 min.

---

## Task 3 / Icon swap: emoji to Tabler chips (45 min)

Replace the emoji-with-plain-background in `ServicesGrid` with Finns-style white chip + 1px cream border + Tabler monoline icon.

### 3.1 Rewrite `src/components/sections/ServicesGrid.tsx`

Full file replacement. Current 60 lines. New version below.

```tsx
import {
  IconBrain,
  IconRobot,
  IconMicrophone,
  IconBolt,
  IconChartDots3,
  IconCode,
  type Icon as TablerIcon,
} from '@tabler/icons-react';

import { siteConfig } from '@/lib/siteConfig';

const iconMap: Record<string, TablerIcon> = {
  'ai-saas-mvp':           IconBrain,
  'ai-agents':             IconRobot,
  'voice-ai':              IconMicrophone,
  'llm-cost-optimization': IconBolt,
  'ai-automation':         IconChartDots3,
  'senior-fullstack':      IconCode,
};

export function ServicesGrid() {
  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: '#F3F2F1' }}>
      <div className="container-tight">

        {/* Header */}
        <div className="mb-14 md:mb-20 max-w-3xl">
          <p className="text-label mb-4" style={{ color: '#8C8C8C' }}>
            What we build
          </p>
          <h2 className="font-display text-display-md" style={{ color: '#1D2020' }}>
            Six things we do well. We pass on the rest.
          </h2>
          <p className="mt-5 text-lg leading-relaxed" style={{ color: '#666666' }}>
            We&apos;re specialists, not generalists. If it&apos;s not AI, automation, or senior
            engineering, we&apos;ll refer you to someone better suited.
          </p>
        </div>

        {/* Bento grid */}
        <BentoGrid />
      </div>
    </section>
  );
}

function BentoGrid() {
  const s = siteConfig.services;

  // Bento layout map (desktop):
  // Row 1: [s0 span-2] [s1 span-1] [s2 span-1]
  // Row 2: [s3 span-1] [s4 span-2] [s5 span-1]
  return (
    <div className="grid gap-4 md:grid-cols-4 md:auto-rows-[280px]">
      <ServiceCard service={s[0]} variant="wide" />
      <ServiceCard service={s[1]} />
      <ServiceCard service={s[2]} />
      <ServiceCard service={s[3]} />
      <ServiceCard service={s[4]} variant="wide" />
      <ServiceCard service={s[5]} />
    </div>
  );
}

function ServiceCard({
  service,
  variant,
}: {
  service: (typeof siteConfig.services)[number];
  variant?: 'wide';
}) {
  const Icon = iconMap[service.slug] ?? IconBrain;

  return (
    <article
      className={`
        group relative flex flex-col justify-between overflow-hidden
        rounded-3xl p-6 md:p-7
        transition-all duration-200
        hover:-translate-y-0.5
        ${variant === 'wide' ? 'md:col-span-2' : 'md:col-span-1'}
      `}
      style={{
        backgroundColor: '#FFFFFF',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.04)',
      }}
    >
      {/* Icon chip */}
      <div
        className="flex items-center justify-center"
        style={{
          width: 40,
          height: 40,
          border: '1px solid #E7E6E4',
          borderRadius: 14,
          backgroundColor: '#FFFFFF',
        }}
      >
        <Icon size={20} stroke={1.5} color="#1D2020" />
      </div>

      {/* Text */}
      <div className="mt-6">
        <h3
          className="font-sans font-medium text-[19px] mb-2 leading-snug"
          style={{ color: '#1D2020' }}
        >
          {service.title}
        </h3>
        <p
          className="text-[14px] leading-relaxed"
          style={{ color: '#666666' }}
        >
          {service.description}
        </p>
      </div>
    </article>
  );
}
```

### 3.2 Verify

- Open `http://localhost:3000`. Scroll to "What we build".
- Icons are monoline, thin-stroke, sitting inside a white square with a hairline cream border. No lime fill, no purple fill, no emoji.
- Layout is asymmetric: big card, small, small. Small, big card, small.
- Mobile: collapses to 1 column. Fine.

### 3.3 Why these specific Tabler icons

- `IconBrain` for AI SaaS MVP.
- `IconRobot` for AI Agents.
- `IconMicrophone` for Voice AI.
- `IconBolt` for LLM Cost Optimization.
- `IconChartDots3` for AI Workflow Automation.
- `IconCode` for Senior Full-Stack.

If any feel off, swap to an alternative. Browse [tabler.io/icons](https://tabler.io/icons). Keep `stroke={1.5}` throughout.

Time estimate: 45 min.

---

## Task 4 / Testimonials expansion (1 hour)

Add the 7 named reviews from the old site, then rebuild the component layout to feature one hero quote + a secondary grid.

### 4.1 Update `src/lib/siteConfig.ts`

Replace the entire `testimonials: [...]` block (currently lines 78-96) with this expanded 10-entry version. Mark which is featured.

```ts
testimonials: [
  {
    featured: true,
    quote:
      "Muhammad is an extremely skilled developer. I brought him a project multiple developers said wasn't possible. He took it on, knocked it out of the park, and met our tight deadline with ease. We will be working with him on many more projects.",
    attribution: 'Luke Blackamore',
    role: 'Founder',
    meta: 'Upwork · Senior Full Stack',
  },
  {
    quote:
      "Muhammad is such a skilled developer. There was nothing he wasn't able to do with our project. Even with adversity, he overcame it with great communication and timely responses despite the time difference. Professional. 10/10.",
    attribution: 'Ahmad Rashid',
    role: 'Client',
    meta: 'Upwork · Full Stack build',
  },
  {
    quote:
      'Truly a genius. Would definitely work again.',
    attribution: 'Voice AI healthcare client',
    role: 'Client',
    meta: 'Jan 2026 · Real-time voice agent',
  },
  {
    quote:
      'Muhammad is an absolute expert in his field. Humble, thoughtful, an absolute pleasure to work with. His suggestions are spot-on.',
    attribution: 'AI Project Assistance client',
    role: 'Client',
    meta: 'Jul 2024 · AI advisory',
  },
  {
    quote:
      'Haseeb did an exceptional job and completed the task with quality. Awesome to work with, no fuss, professional, easy to communicate with. 10/10 recommend him.',
    attribution: 'Lim Jun Wei',
    role: 'Client',
    meta: 'Upwork · Data & AI',
  },
  {
    quote:
      "Muhammad quickly pulled a large amount of data for our team's needs. Extremely flexible and responsive as we requested additional scraping and analysis. We would definitely recommend his work.",
    attribution: 'Kate',
    role: 'Client',
    meta: 'Upwork · Data engineering',
  },
  {
    quote:
      'He did an excellent job on our WhatsApp Flow project and delivered results even better than what we originally had in mind.',
    attribution: 'FGC Perfume Kuwait',
    role: 'Client',
    meta: 'Feb 2026 · WhatsApp Business AI',
  },
  {
    quote:
      'Haseeb delivered good work on this data scraping project. His communication during the project was top-notch and his skills were strong. When I needed additional help to save my team time, he was forthcoming about cost and provided great solutions to save money. I will work with him again.',
    attribution: 'Kurt Uhlir',
    role: 'Client',
    meta: 'Upwork · Data engineering',
  },
  {
    quote:
      'Muhammad was awesome to work with. Very professional, easy to work with and to communicate with.',
    attribution: 'Zachary Jones',
    role: 'Client',
    meta: 'Upwork · Engineering',
  },
  {
    quote:
      'Muhammed did an excellent job and completed the assignment to a high quality and on time.',
    attribution: 'Vishal Patel',
    role: 'Client',
    meta: 'Upwork · Engineering',
  },
],
```

Note: `featured: true` on the first one. That controls display. The `role` field is new and optional.

### 4.2 Rebuild `src/components/sections/Testimonials.tsx`

Full file replacement:

```tsx
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/lib/siteConfig';

export function Testimonials() {
  const all = siteConfig.testimonials;
  const featured = all.find((t) => (t as any).featured) ?? all[0];
  const rest = all.filter((t) => t !== featured);

  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: '#F3F2F1' }}>
      <div className="container-tight">

        {/* Header */}
        <div className="mb-14 md:mb-20 max-w-3xl">
          <p className="text-label mb-4" style={{ color: '#8C8C8C' }}>
            What clients say
          </p>
          <h2 className="font-display text-display-md" style={{ color: '#1D2020' }}>
            Words from people who actually paid us.
          </h2>
        </div>

        {/* Featured quote */}
        <figure className="mb-12 md:mb-16">
          <blockquote
            className="font-display text-[28px] md:text-[36px] leading-[1.25] max-w-4xl"
            style={{ color: '#1D2020' }}
          >
            &ldquo;{featured.quote}&rdquo;
          </blockquote>
          <figcaption
            className="mt-6 flex items-center gap-3 text-sm"
            style={{ color: '#666666' }}
          >
            <span className="font-medium" style={{ color: '#1D2020' }}>
              {featured.attribution}
            </span>
            <span aria-hidden style={{ color: '#CCCCCC' }}>·</span>
            <span>{featured.meta}</span>
          </figcaption>
        </figure>

        {/* Secondary grid: 3 per row on desktop */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map((t, i) => (
            <article
              key={i}
              className="rounded-2xl p-6 flex flex-col"
              style={{
                backgroundColor: '#FFFFFF',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 6px 20px rgba(0,0,0,0.03)',
              }}
            >
              <p
                className="text-[15px] leading-relaxed flex-1"
                style={{ color: '#2B2D2D' }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <div
                className="mt-5 pt-5"
                style={{ borderTop: '1px solid #F0EFED' }}
              >
                <p className="text-sm font-medium" style={{ color: '#1D2020' }}>
                  {t.attribution}
                </p>
                <p className="text-xs mt-1" style={{ color: '#8C8C8C' }}>
                  {t.meta}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Upwork note */}
        <p className="mt-12 text-sm text-center" style={{ color: '#888888' }}>
          Based on a 100% Job Success rate across 49 completed projects on Upwork.{' '}
          <Link
            href={siteConfig.links.upwork}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 underline underline-offset-4 transition-colors hover:text-[#7C3AED]"
            style={{ color: '#888888' }}
          >
            See all reviews
            <ArrowUpRight
              size={13}
              className="opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
            />
          </Link>
        </p>
      </div>
    </section>
  );
}
```

### 4.3 Verify

- 1 featured quote (Luke Blackamore) at large display size.
- 9 remaining in a 3-column grid.
- Grid feels calm because the featured takes pressure off each individual card.
- Mobile: featured stays large, grid collapses to 1 column.

Time estimate: 1 hour.

---

## Task 5 / Color cleanup: demote purple (30 min)

Purple is currently doing 5 jobs. Reduce to 1 (text link hover only).

### 5.1 Audit

```bash
grep -rn "#7C3AED\|#6D28D9\|#F3EEFF" src/
```

Expected hits, with desired treatment per hit:

| Location | Current | Replace with |
|---|---|---|
| Hero primary CTA | `backgroundColor: '#7C3AED'` | `backgroundColor: '#D8F9B8'` and `color: '#1D2020'` |
| Hero primary CTA hover | `hover:bg-[#6D28D9]` | `hover:brightness-95` |
| FinalCTA button | `#7C3AED` | `#D8F9B8`, text `#1D2020` |
| Navbar "Book a Call" | `#7C3AED` | `#D8F9B8`, text `#1D2020` |
| Mobile menu CTA | `#7C3AED` | `#D8F9B8`, text `#1D2020` |
| ForFoundersEnterprise bullet (`→`) | `color: '#7C3AED'` | Already handled in Task 1.3; becomes a lime square |
| Selection color (globals.css) | `--color-accent: #7C3AED;` | Keep. Selection color can stay purple. |
| Link hover underline | `hover:text-[#7C3AED]` | Keep. This is purple's one remaining job. |
| `iconBg: '#F3EEFF'` (old pastel) | Any remaining | Remove. Should be gone after Task 3. |

### 5.2 Execute

Run the grep above. Walk each hit. Apply the table.

### 5.3 `globals.css` token updates

Open `src/app/globals.css`. Find the `@theme inline` block. Confirm these tokens exist or add them:

```css
/* Lime signature */
--color-lime:        #D8F9B8;
--color-lime-hover:  #C9F29B;
--color-lime-ink:    #1D2020;

/* Purple, demoted */
--color-accent:            #7C3AED;
--color-accent-foreground: #FFFFFF;
```

Remove:
```css
--color-accent-subtle:     #F3EEFF;   /* no longer used */
--color-accent-dark:       #6D28D9;   /* no longer used */
```

Time estimate: 30 min.

---

## Task 6 / Bug fixes from status audit (30 min)

### 6.1 Dead import in Hero (`src/components/sections/Hero.tsx` line 3)

Current:
```tsx
import { useRef } from 'react';
```

`useRef` is not used in the new Hero. Delete the entire line.

Also remove `AnimatedBeam` import if still present but unused.

### 6.2 Broken `/og/home.png` reference

Two paths:

**Option A (fast, recommended):** create a placeholder OG image.
- Size: 1200×630.
- Background: `#1D2020`.
- Centered: "codewithhaseeb" in Bricolage 72px off-white.
- Below: "AI that runs in production." in Inter 28px lime.
- Export as PNG. Save to `public/og/home.png`.
- Use any tool: Figma, Canva, even an online OG generator.

**Option B (temporary):** remove the reference until you build a real OG.

In `src/app/page.tsx`, comment out line 16-17:
```tsx
// openGraph: {
//   images: ['/og/home.png'],
// },
```

And in `src/lib/siteConfig.ts`, change:
```ts
ogImage: '/og/home.png',
```
to:
```ts
ogImage: '/og/default.png',   // TODO: create this
```

Pick Option A. A broken OG image means no preview when anyone shares the site.

### 6.3 Contact API route

Create `src/app/api/contact/route.ts`. Folder exists, file is missing.

```ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

const ContactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  company: z.string().max(100).optional().or(z.literal('')),
  budget: z.string().max(50).optional().or(z.literal('')),
  message: z.string().min(10).max(5000),
  // Honeypot field. If filled, it's a bot.
  _hp: z.string().max(0).optional().or(z.literal('')),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = ContactSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: 'Invalid input', issues: parsed.error.issues },
        { status: 400 }
      );
    }

    // Honeypot silent success
    if (parsed.data._hp) {
      return NextResponse.json({ ok: true });
    }

    const { name, email, company, budget, message } = parsed.data;

    await resend.emails.send({
      from: process.env.CONTACT_FORM_FROM_EMAIL!,
      to: process.env.CONTACT_FORM_TO_EMAIL!,
      replyTo: email,
      subject: `New lead from ${name}${company ? ` (${company})` : ''}`,
      text: [
        `From: ${name} <${email}>`,
        company && `Company: ${company}`,
        budget && `Budget: ${budget}`,
        '',
        message,
      ]
        .filter(Boolean)
        .join('\n'),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] error', err);
    return NextResponse.json(
      { ok: false, error: 'Server error' },
      { status: 500 }
    );
  }
}
```

Time estimate: 30 min.

---

## Task 7 / Missing pages (remaining session, 3 to 4 hours)

These are spec'd in detail in `02-CASE-STUDIES.md` and `03-COMPONENTS-CODE.md`. Work order below, code not repeated here. Follow those docs verbatim, just apply the soul-fix rules along the way (no em dashes, no arrow characters, use Tabler icons, apply lime CTAs, keep spacing generous).

### 7.1 `/contact` page (30 min)
Path: `src/app/contact/page.tsx`. Form posts to `/api/contact` from Task 6.3. Use `react-hook-form` + `zod` (both already installed). On success, show `sonner` toast.

### 7.2 `/work` index page (30 min)
Path: `src/app/work/page.tsx`. Lists all 8 case studies using `CaseStudyCard` in a 2-column grid.

### 7.3 `/work/[slug]` dynamic route (45 min)
Path: `src/app/work/[slug]/page.tsx`. Reads MDX from `src/content/case-studies/[slug].mdx`. Use `@next/mdx` (installed).

### 7.4 8 MDX case studies (1 hour if content is ready from doc 02)
Path: `src/content/case-studies/`. One file per case study: `aphra.mdx`, `capwell.mdx`, `kcnl.mdx`, `tula.mdx`, `medmatch.mdx`, `fcs.mdx`, `bestinform.mdx`, `sony-playstation.mdx`.

Copy content directly from `02-CASE-STUDIES.md`. Each has frontmatter + body ready.

### 7.5 SEO files (30 min)
- `src/app/sitemap.ts`. Spec in `05-SEO-PERFORMANCE-PATCH.md`.
- `src/app/robots.ts`. Same doc.
- `src/app/not-found.tsx`. Simple 404. Dark background, lime "back home" button.
- `public/llms.txt`. Spec in `05-SEO-PERFORMANCE-PATCH.md`. Full content already written there. Copy-paste.

### 7.6 JSON-LD (20 min)
Add to `src/app/layout.tsx` inside `<head>`. Organization + WebSite schemas. Individual article schemas on each `/work/[slug]` page. All content in doc `05`.

### 7.7 Assets (varies, can be done in parallel)
- Favicon set. Use [favicon.io](https://favicon.io). Source: the "CH" monogram in Bricolage on lime.
- Client logos. Download 8 SVGs into `public/logos/`.
- Case study covers. 16:9 PNG or JPG. One per case study in `public/case-studies/covers/`.

---

## Task 8 / Final verify + ship (30 min)

### 8.1 Build

```bash
bun run build
```

Fix type errors. Most likely culprits:
- Unused imports (ESLint will flag).
- `featured` property on testimonials. Type the `SiteConfig` properly or cast.

### 8.2 Lighthouse pass

Run Lighthouse on the production build:
```bash
bun run build && bun start
# open http://localhost:3000 in Chrome, run Lighthouse
```

Targets per `05-SEO-PERFORMANCE-PATCH.md`:
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

### 8.3 Deploy

```bash
# Assuming Vercel is wired:
vercel --prod
```

Or push to `main` if CI is connected.

### 8.4 Post-deploy smoke tests

- Hit `/` on prod. Hero dark, CTA lime.
- Click Book a call. Opens Calendly.
- Hit `/contact`. Submit test form. Check `miltech.haseeb@gmail.com` inbox.
- Hit `/work`. See 8 cards.
- Click one case study. Renders MDX.
- Hit `/sitemap.xml`, `/robots.txt`, `/llms.txt`. All return content.
- Share `/` in Slack or Twitter. OG image loads.
- GA4 realtime. Should see your own visit.

Time estimate: 30 min.

---

## Acceptance checklist (print this, tick as you go)

**Cleanup**
- [ ] Zero `—` in user-facing copy
- [ ] Zero `→` as text character; all CTAs use `ArrowUpRight` icon on hover
- [ ] `useRef` dead import removed from Hero
- [ ] No purple outside link-hover selector

**Design system**
- [ ] All sections use generous spacing (`py-24 md:py-32` minimum for standard sections)
- [ ] LogoBar uses `pt-24 pb-20 md:pt-28 md:pb-24` (outer generous, inner tight)
- [ ] ServicesGrid is bento layout, not uniform 3-col
- [ ] Icons are Tabler monoline, stroke 1.5, inside 40px white chip with cream border
- [ ] Primary CTAs are lime `#D8F9B8` with `#1D2020` text on dark surfaces
- [ ] Testimonials show 1 featured + 9 in secondary grid

**Plumbing**
- [ ] `/api/contact/route.ts` exists and sends via Resend
- [ ] `public/og/home.png` exists at 1200x630
- [ ] 8 client logo SVGs in `public/logos/`

**Pages**
- [ ] `/contact` page exists and works
- [ ] `/work` index lists 8 case studies
- [ ] `/work/[slug]` renders MDX
- [ ] `/sitemap.xml`, `/robots.txt`, `/llms.txt` serve content
- [ ] 404 page is branded, not default

**Build**
- [ ] `bun run build` passes with zero warnings
- [ ] Lighthouse: Perf 95+, A11y 100, SEO 100
- [ ] Real device test: iPhone, Android, desktop Chrome and Safari

---

## One-hour prioritized minimum

If the dev only has 1 hour before a demo:

1. Task 1 (text pass): 45 min. Biggest perception lift.
2. Task 2 (spacing fix): 20 min. Site stops feeling cramped.

That is enough to show the site to a client with dignity. Everything else can wait a day.

---

## Gotchas

- **Tabler icons** ship as React components, not strings. Import each one by name. Do not try to map from string like the old lucide code did; that pattern is brittle.
- **Featured testimonial type.** TypeScript will complain about the optional `featured` property. Either extend the `SiteConfig` type explicitly or `as (typeof siteConfig.testimonials)[number] & { featured?: boolean }`.
- **Resend from-email domain.** Must be verified in Resend dashboard. If not verified, emails silently fail. Use `onboarding@resend.dev` for local dev.
- **Calendly URL.** Comes from env var. If `NEXT_PUBLIC_CALENDLY_URL` is not set in production, falls back to the hardcoded URL in `siteConfig.ts`. Fine, but set it for staging environments.
- **MDX and Next 16.** `@next/mdx` is installed but requires `mdxRs: true` in `next.config.ts` for best performance. Verify or add.
- **OG image path.** `metadataBase` is set in layout. Image paths in metadata are relative to that base. Do not use full URLs in `openGraph.images`.

---

## When the dev gets stuck

- **Nothing renders after Tabler import:** check for typos in the icon name. Tabler names are `IconBrain`, not `IconBrainOutline` or `BrainIcon`.
- **Lime is too bright on dark background:** you are on the wrong color. Primary lime is `#D8F9B8`, not `#C9FF00` or similar yellow-green.
- **Bento feels lopsided on iPad width:** the `md:col-span-2` kicks in at 768px. Between 640px and 1024px it can feel odd. Consider a `lg:col-span-2` instead and let md stay 2-col uniform.
- **Em dash keeps sneaking back in from autocorrect:** disable smart punctuation in your editor. VS Code: set `"editor.autoClosingQuotes": "never"` and turn off any markdown smartquotes extensions.

---

## Stop conditions

Do not ship if:
- Any button still has `→` in its text.
- Hero headline still has an em dash.
- ServicesGrid still shows emoji.
- Process or Testimonials still use `py-16`.
- `public/og/home.png` is still missing.

Everything else is a follow-up issue, not a blocker.
