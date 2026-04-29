# 08 / Live Site Audit (Playwright-tested)

I ran the dev server through Playwright MCP at `localhost:3000`, screenshotted every section at desktop 1440px, scanned console errors, and inspected the DOM. This is the fix-list based on what I actually saw, not what should theoretically be there.

Screenshots are saved at `.playwright-mcp/audit-*.png` if you want to reference them.

---

## Verdict

**The site looks good.** Real momentum since the last audit. Bento grid lands. Testimonials with the big Luke Blackamore quote lands. Numbers section on deep teal lands. Hero with the cs_01/02/03 trace panel lands. Icons are Tabler, chips are white-with-cream-border, correct.

Issues remaining are all surgical. No redesigns needed.

---

## Critical (breaks the page)

### 1. Three broken case study images in Featured Work
**Screenshot:** `audit-07-featured-work.png`

Console shows:
```
GET /_next/image?url=%2Fimages%2Fwork%2Faphra-cover.webp   400 Bad Request
GET /_next/image?url=%2Fimages%2Fwork%2Fcapwell-cover.webp 400 Bad Request
GET /_next/image?url=%2Fimages%2Fwork%2Fkcnl-cover.webp    400 Bad Request
```

`src/content/case-studies-meta.ts` lines 20, 30, 40 reference files at `/images/work/*.webp` that do not exist on disk. Next.js Image returns 400 for missing source. The cards render with a thin gray band and a tiny broken-image icon. It looks like a half-broken staging site.

**Fix (pick one):**

**Option A. Placeholder gradient blocks today, real covers later.**

Edit `src/components/shared/CaseStudyCard.tsx`. Replace the `<Image>` block (lines 22-28) with a conditional that shows a branded placeholder when `cover` starts with `/images/work/` and the file isn't there yet:

```tsx
{/* Cover */}
<div
  className="relative overflow-hidden"
  style={{
    aspectRatio: '16 / 10',
    background: `linear-gradient(135deg, #1D2020 0%, #2B2D2D 100%)`,
  }}
>
  {/* Client label as editorial treatment */}
  <div className="absolute inset-0 flex items-center justify-center p-8">
    <p
      className="font-mono text-[11px] tracking-[0.15em] uppercase"
      style={{ color: 'rgba(216, 249, 184, 0.7)' }}
    >
      cs_{String(caseStudy.order).padStart(2, '0')} / {caseStudy.clientLabel.toLowerCase()}
    </p>
  </div>
</div>
```

This becomes the Koto / Pentagram style editorial placeholder. Ships today. Feels intentional, not broken.

**Option B. Generate real covers via `ImageResponse`.**

Create `src/app/api/cover/[slug]/route.tsx`. Returns a 1600x1000 PNG per case study with the client name in Bricolage, key stat in lime, dark bg. Then change `cover` in `case-studies-meta.ts` to `/api/cover/aphra`, etc. Lasts longer than placeholders because each one is uniquely labeled.

**Recommendation:** Option A now. Option B later when you have bandwidth to design the template.

---

### 2. Hero on desktop feels top-light
**Screenshot:** `audit-02-hero.png`

Looking at the hero at 1440px: the trace panel on the right is fine, but the whole hero section's top padding is too small relative to the headline size. Headline starts at y=168 (just 120px under navbar) and the eyebrow `AI ENGINEERING · FOR FUNDED STARTUPS` is tiny and dark-on-dark with very low contrast.

**Fix:**

In `src/components/sections/Hero.tsx`, find the outer `<section>` and bump top padding:

Current:
```tsx
className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden"
```

Replace with:
```tsx
className="relative pt-40 pb-24 md:pt-56 md:pb-32 overflow-hidden"
```

Also find the eyebrow label element. Currently color is `#8C8C8C` on `#1D2020`, which is WCAG-failing (contrast under 3:1). Change to `#B8B8B8` or go lime `#D8F9B8` with lower opacity:

```tsx
<p className="text-label mb-6" style={{ color: 'rgba(216, 249, 184, 0.7)' }}>
  AI ENGINEERING · FOR FUNDED STARTUPS
</p>
```

---

## High priority (obvious to a picky eye)

### 3. Font warning: `geist-latin.woff2` 404
Console:
```
GET /__nextjs_font/geist-latin.woff2  404 Not Found
```

Next 16 is trying to load a Geist font that isn't configured. This is a default Next.js template leftover. Nothing currently uses Geist, but the request happens on every page load and shows up in Lighthouse.

**Fix:** find and remove any reference to Geist. Check:
- `src/app/layout.tsx` imports
- `src/app/globals.css` any `--font-geist-*` or `font-family: Geist`
- Old default `next/font/google` import that wasn't deleted

If you can't find the source, it might be an injected default from `create-next-app`. Try:
```bash
grep -rn "geist\|Geist" src/ next.config.ts 2>/dev/null
```

If nothing matches, the reference is likely in a `layout.tsx` `className` with a default `GeistSans.variable` that's not actually imported. Remove it.

---

### 4. Eyebrow labels are uppercase in too many places
Audit screenshots show every section eyebrow is ALL CAPS:
- `WHAT WE BUILD`
- `FEATURED WORK`
- `HOW WE WORK WITH YOU`
- `WHAT CLIENTS SAY`
- `HOW WE WORK`
- `AI ENGINEERING · FOR FUNDED STARTUPS`

Earlier doc called out that uppercase eyebrows feel dated. Finns uses **lowercase IBM Plex Mono with wide tracking** for these. Much more modern.

**Fix in `src/app/globals.css`:**

```css
.text-label {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: none;          /* was uppercase */
  font-family: var(--font-ibm-mono, ui-monospace, monospace);
  color: #8C8C8C;
}
```

Then update the copy in each section to lowercase with slashes or bullets where helpful:

| Old | New |
|---|---|
| `WHAT WE BUILD` | `what we build` |
| `FEATURED WORK` | `featured work` |
| `HOW WE WORK WITH YOU` | `how we work with you` |
| `WHAT CLIENTS SAY` | `what clients say` |
| `HOW WE WORK` | `how we work` |
| `AI ENGINEERING · FOR FUNDED STARTUPS` | `ai engineering / for funded startups` |

Keep the mono font, keep the tight tracking, drop the uppercase.

---

### 5. Process section step numbers are nearly invisible
**Screenshot:** `audit-09-process.png`

Current code (Process.tsx line 34):
```tsx
style={{ fontSize: '64px', color: '#1D2020', opacity: 0.08, letterSpacing: '-0.04em' }}
```

`opacity: 0.08` means the numbers render at ~8% visibility. They're ghosted out almost completely. You wanted them to BE the visual per the earlier doc.

**Fix:** make them the visual.

```tsx
style={{
  fontSize: '72px',
  color: '#D8F9B8',            // lime, signature
  letterSpacing: '-0.04em',
  lineHeight: 1,
}}
```

Keep opacity at 1. If it feels too loud, try `color: '#1D2020'` (solid dark) instead. Just not 8%.

Also: the cards are currently on cream `#F7F6F4`. That reads "subtle section break". Since the Process section's outer bg is white, try removing card backgrounds entirely and let the numbers + text float:

```tsx
<li
  key={step.number}
  className="flex flex-col"
>
  <p
    className="font-display leading-none mb-5"
    style={{ fontSize: '72px', color: '#D8F9B8', letterSpacing: '-0.04em' }}
  >
    {step.number}
  </p>
  <p className="text-label mb-2" style={{ color: '#1D2020' }}>
    {step.title}
  </p>
  <p className="text-sm leading-relaxed" style={{ color: '#666666' }}>
    {step.body}
  </p>
</li>
```

Much more editorial. No card. Just number + title + body.

---

### 6. Logo bar looks thin and monotone
**Screenshot:** `audit-06-testimonials.png` (the top section shows the logo marquee)

Current logos are all JetBrains Mono / mono text at 35% opacity. They're all the same size, same color, same weight. Feels like placeholder text, not a client row.

**Fix #1 — mix sizes.** Real client logos come in different widths; your wordmark fake should too. Update LogoBar to vary text size:

```tsx
const logoMeta: Record<string, { size: string; weight: string }> = {
  'Sony PlayStation':     { size: 'text-[20px]', weight: 'font-semibold' },
  'Aphra.me':             { size: 'text-[22px]', weight: 'font-medium' },
  'Tula Transformation':  { size: 'text-[18px]', weight: 'font-medium' },
  'Capwell Comm':         { size: 'text-[19px]', weight: 'font-medium' },
  'KCNL.eu':              { size: 'text-[20px]', weight: 'font-semibold' },
  'Bestinform.eu':        { size: 'text-[18px]', weight: 'font-medium' },
  'Medmatch':             { size: 'text-[22px]', weight: 'font-semibold' },
  'FCS':                  { size: 'text-[24px]', weight: 'font-bold' },
  'RGR Learning':         { size: 'text-[17px]', weight: 'font-medium' },
  'eXelerete':            { size: 'text-[19px]', weight: 'font-medium' },
};
```

Apply in `<LogoItem>`. Each wordmark has its own weight and size, like it would if they were real logos.

**Fix #2 — hover state.** Right now no hover. Add:

```tsx
<span
  className={`${meta.size} ${meta.weight} whitespace-nowrap transition-colors duration-200 hover:text-[#1D2020]`}
  style={{ color: 'rgba(43,45,45,0.40)' }}
>
  {name}
</span>
```

Default 40% opacity dark, on hover full black.

---

### 7. Services bento: icon sits on top with no relationship to the title
**Screenshot:** `audit-08-services-bento.png`

Bento layout is working. Icons are correct Tabler chips. Text placement is fine. BUT: there's a big empty gap between the icon (top-left) and the title (bottom of card). On wide cards especially, it feels like two unrelated things.

The issue is `justify-between` pushes them apart on 280px-tall cards. Needs a visual connector.

**Fix:** Move the icon adjacent to the title, in a row, with more content density. Here's the updated ServiceCard:

```tsx
function ServiceCard({ service, variant }) {
  const Icon = iconMap[service.slug] ?? IconBrain;
  return (
    <article
      className={`
        group relative flex flex-col overflow-hidden
        rounded-3xl p-7
        transition-all duration-200 hover:-translate-y-0.5
        ${variant === 'wide' ? 'md:col-span-2' : 'md:col-span-1'}
      `}
      style={{
        backgroundColor: '#FFFFFF',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.04)',
      }}
    >
      {/* Icon */}
      <div
        className="flex items-center justify-center mb-auto"
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

      {/* Text block, anchored to bottom */}
      <div className="mt-10">
        <h3
          className="font-sans font-medium text-[20px] mb-2 leading-snug"
          style={{ color: '#1D2020' }}
        >
          {service.title}
        </h3>
        <p className="text-[14px] leading-relaxed" style={{ color: '#5A5C5C' }}>
          {service.description}
        </p>
      </div>
    </article>
  );
}
```

Key change: `mb-auto` on the icon pushes it to top, `mt-10` on the text block gives predictable 40px spacing, no `justify-between`. Looks intentional.

Also: **wide cards need more content.** A 2x-width card showing the same text as a 1x card feels wasteful. Add a subtle flourish on wide cards only. For the `variant === 'wide'` path, include a small mono metadata line:

```tsx
{variant === 'wide' && (
  <p className="text-[11px] font-mono mt-4" style={{ color: '#9A9C9C' }}>
    {service.slug === 'ai-saas-mvp' && 'NextJS · Python · LangChain'}
    {service.slug === 'ai-automation' && 'GoHighLevel · HubSpot · WhatsApp'}
  </p>
)}
```

Tech stack line under the description, mono, small. Makes wide cards feel more substantial.

---

### 8. NumbersTicker stat labels wrap awkwardly on desktop
**Screenshot:** `audit-09-process.png` (shows the stat section at 1440px)

"Raised by clients on our AI builds" wraps to two lines. "Faster data at Sony PlayStation" wraps to two lines. "Records managed at Capwell" wraps. Looks messy in a row that should feel confident and chunky.

**Fix in `siteConfig.ts`:** tighten labels so they fit on one line at normal desktop widths.

| Current | New |
|---|---|
| `Active users on Aphra.me` | `Users on Aphra.me` |
| `Raised by clients on our AI builds` | `Raised by our clients` |
| `Faster data at Sony PlayStation` | `Faster at Sony` |
| `Records managed at Capwell` | `Records at Capwell` |

Shorter. Same meaning. Reads like a data point, not a sentence.

---

## Medium (polish)

### 9. Navbar "Book a call" wraps to two lines
**Visible in every screenshot with the nav.** Currently renders as:
```
Book
a call
```

It's wrapping because the pill doesn't have enough horizontal space for the 2-word CTA at its current font-size plus padding.

**Fix in `src/components/layout/Navbar.tsx`:**

Find the desktop CTA link. Change `px-5 py-2` to `px-5 py-2.5` and add `whitespace-nowrap`:

```tsx
<Link
  ...
  className="group ml-2 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all whitespace-nowrap"
  style={{ backgroundColor: '#D8F9B8', color: '#1D2020' }}
>
```

If it still wraps, reduce nav items or shorten to "Call" (less good) or make the nav container wider. Most likely `whitespace-nowrap` alone fixes it.

---

### 10. "N" bubble floating bottom-left
Every screenshot shows a dark circle with `N` in the bottom-left corner. It's probably `next-themes` theme picker or Vercel deploy indicator. Neither should ship.

**Check:**
```bash
grep -rn "next-themes\|ThemeProvider\|ThemeToggle" src/
```

If it's `next-themes` with a dev-mode indicator, remove it. Dark mode isn't part of the design system (per the spec, only a light surface + dark surfaces on specific sections, no user toggle). Remove the provider unless you need it for component-level variants.

If it's the Vercel "N" toolbar indicator (`@vercel/toolbar` or similar), that's fine in dev but hide in production:

```tsx
{process.env.NODE_ENV !== 'production' && <Toolbar />}
```

Or just remove entirely.

---

### 11. Testimonials secondary grid: empty space at bottom of cards

In the audit-08-services-bento.png testimonial row, cards are tall because of the taller Luke quote forcing alignment. Shorter quotes like "Truly a genius. Would definitely work again." leave huge blank space below the body text before the attribution line.

**Fix in `Testimonials.tsx`:** change card display from `flex flex-col` with `flex-1` on body to natural height. Cards should size to their content.

Replace:
```tsx
<article
  className="rounded-2xl p-6 flex flex-col"
  ...
>
  <p className="text-[15px] leading-relaxed flex-1" ...>
    "{t.quote}"
  </p>
  <div className="mt-5 pt-5" ...>
```

With:
```tsx
<article
  className="rounded-2xl p-6"
  ...
>
  <p className="text-[15px] leading-relaxed" ...>
    "{t.quote}"
  </p>
  <div className="mt-5 pt-5" ...>
```

Removed `flex flex-col` and `flex-1`. Cards become a masonry feel, short cards stay short. But grid is `md:grid-cols-2 lg:grid-cols-3` which uses implicit row heights (tallest wins). Switch to CSS columns for true masonry, or accept uniform heights. Simplest fix:

```tsx
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
```

`items-start` prevents stretching. Cards take their natural height, align to top of row. Empty space disappears.

---

## Low (nice-to-haves)

### 12. Mono font looks like the wrong mono
Hero's trace panel shows `cs_01 / aphra.me` in JetBrains Mono. Other places use the same. But Finns uses IBM Plex Mono which feels more editorial and less "code editor."

**Check:** `src/app/layout.tsx` imports `JetBrains_Mono`. Earlier plan said switch to IBM Plex Mono.

```tsx
import { IBM_Plex_Mono } from 'next/font/google';
const ibmMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
});
```

Then in `globals.css`:
```css
--font-mono: var(--font-mono), ui-monospace, monospace;
```

Makes labels, `cs_01` tags, stat pills all feel slightly warmer and more editorial.

### 13. Stats pills in hero trace panel are inconsistent
Look at `audit-09-process.png`. The three trace cards in the hero each format their stat differently:
- `17,234  active users · live` — comma separator, middle dot, lowercase
- `3wk` — shorthand, no space
- `98.5%` — decimal percent

Each is a different style for a "metric." Pick one format and use it across all three:

```
cs_01 / aphra.me            17K users live
cs_02 / capwell comm        500K records, 3 weeks
cs_03 / kcnl.eu             98.5% LLM cost cut
```

Consistent "number + one short qualifier" pattern. Currently the mix feels like three different designers worked on one card.

### 14. Footer only has the bottom line visible
The final screenshot `audit-09-process.png` shows the footer but it's tiny and pushed off. I didn't get a full footer view. Dev should scroll there manually and confirm it renders the sitemap, contact info, and the "Built in Karachi" line per spec.

---

## Not broken but worth noting

**Things that already look great:**
- Hero trace panel with `cs_01 / aphra.me` + live dot. Very premium.
- Surface alternation (dark / cream / teal / cream / white / dark / cream / white / dark). Correct.
- Testimonials featured quote at 36px is beautiful.
- "For Funded Startups / For SMB Operations" split section reads well.
- Bento grid asymmetry works.
- Tabler icons in white chips look editorial.
- Lime CTA on dark hero is the signature moment.

**Don't touch:**
- Hero headline italic "Not demos."
- Testimonials Upwork credibility line at bottom.
- Final CTA section composition.
- Color alternation sequence.

---

## Ship order for this fix session

Do in order. Do not skip #1.

1. **Fix the three broken case study images (#1).** Ships dignity. 30 min.
2. **Remove Geist font 404 (#3).** Clean console. 10 min.
3. **Fix Navbar CTA wrapping (#9).** Visible on every screenshot. 5 min.
4. **Fix hero top spacing and eyebrow contrast (#2).** Hero feels better instantly. 15 min.
5. **Lowercase eyebrows + mono font (#4).** Modernizes every section. 30 min.
6. **Rewrite Process cards (#5).** Lime numbers, no card background. 30 min.
7. **Services cards icon-to-text gap (#7).** Close the empty space. 20 min.
8. **LogoBar variety (#6).** Mixed sizes and weights. 20 min.
9. **Shorten NumbersTicker labels (#8).** One-line stats. 10 min.
10. **Remove floating N bubble (#10).** Investigate and delete. 15 min.
11. **Testimonials alignment (#11).** `items-start` on the grid. 5 min.
12. Remaining: IBM Plex Mono swap (#12), trace panel format consistency (#13), footer spot check (#14).

Total: about 3 hours of focused work. Every fix has a concrete file, line, and replacement code above.

---

## What I would run after the fix

Re-run Playwright after each batch of 3 fixes. Compare before/after screenshots in `.playwright-mcp/`. Specifically:

- After #1-3: check console is clean.
- After #4-6: take a new full page screenshot, compare to `audit-01-full.png`.
- After #7-9: verify at 1440px desktop AND 390px mobile (if Playwright viewport cooperates).

If anything in the before/after doesn't obviously look better, roll it back. Not every "fix" is an improvement.
