# 06 / Fix the Soul

For humans. Not AI. Read top to bottom. Short. Visual. Opinionated.

---

## Part 1 / Status check (re-verified)

### Good news since last pass
- Surface alternation is **done on most sections**. Hero is dark `#1D2020`. NumbersTicker is deep teal `#031F2A`. FeaturedWork is white. ForFoundersEnterprise is dark. FinalCTA is dark. ServicesGrid is cream `#F3F2F1`.
- Hero diagram replaced with a real product-trace panel.
- Lime is already wired into FinalCTA button.
- Font swap to Bricolage Grotesque landed.

### Still broken
1. `/api/contact/` folder exists with no `route.ts`. Form still 404s.
2. `page.tsx` references `/og/home.png`. File does not exist.
3. `public/` only has the 5 default Next SVGs. No client logos yet.
4. `Hero.tsx` has a dead `useRef` import (line 3).
5. **Process** (`py-16 md:py-24`) and **Testimonials** (`py-16 md:py-24`) are the two remaining sections with old cramped spacing.
6. **LogoBar uses `py-12 md:py-14`**, which the user correctly called out as feeling off. See Part 5.

### Still missing
- Routes: `/work`, `/work/[slug]`, `/contact` page, optional `/about`.
- 0 of 8 MDX case studies.
- SEO: `sitemap.ts`, `robots.ts`, `not-found.tsx`, `llms.txt`, JSON-LD.
- Assets: logos, favicons, OG images, case study covers.

Specs in `02-CASE-STUDIES.md`, `03-COMPONENTS-CODE.md`, `04A-ASSETS-NEEDED.md`, `05-SEO-PERFORMANCE-PATCH.md`.

Do not ship missing pages before the fixes in Parts 2 through 5 land.

---

## Part 2 / Three AI tells to kill first

### Tell 1. Em dashes
28 found in the codebase. The single biggest giveaway.

Banned: `—` (U+2014) and `–` (U+2013).

Use instead:
- Period. Two short sentences.
- Colon `:` when introducing a list.
- Parentheses `( )` for an aside.
- A line break for dramatic pause.

Examples:

| Current | Better |
|---|---|
| `AI that runs in production — not demos that break under load.` | `AI that runs in production. Not demos.` |
| `Six things we do well — and the rest we politely decline.` | `Six things we do well. We pass on the rest.` |
| `a senior team that ships real code fast — not a cheap freelancer` | `A senior team that ships real code. Not a cheap freelancer.` |
| `Colors — Light mode` (CSS comment) | `Colors / Light mode` |

Global search `—` across `src/`. Delete every one. Read each replacement out loud. If it breaks, rewrite into two sentences.

### Tell 2. Arrow characters in button copy
9 instances of `→` glued to button and link text. Junior-dev-on-Friday energy.

Banned in text: `→`, `->`, `»`, `>`.

Use instead, ranked best to worst:
1. **Nothing.** `Book a call` is a button. The button shape is the arrow. Stop helping the reader.
2. **An SVG icon on hover only.** Lucide `ArrowUpRight`, rendered as a React component, opacity 0 by default, fades and slides in on `group-hover`.
3. **Underline that grows from left** on hover for text links.

```tsx
<Link href="/contact" className="group inline-flex items-center gap-2">
  Book a call
  <ArrowUpRight
    size={16}
    className="opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
  />
</Link>
```

Do this once, reuse everywhere.

### Tell 3. Lucide icons in pastel squares
Every ServicesGrid card has a lucide icon (`Rocket`, `Bot`, `Mic`) in a `bg-[#F3EEFF]` rounded square. Every SaaS site since 2022 does this. Reads as template. Part 4 has the fix.

---

## Part 3 / Things to steal from finns.framer.website

The user specifically called out four things. Doc them all with the real Framer class references + the exact CSS values so the AI knows what to build.

### A. The pill container / header group (`framer-1hs84gn-container`)

**What it is in Finns:** the little grouped element that holds multiple pills or logos in one horizontal row, with tight spacing and a fixed height. Finns uses it for the logo bar and for the `● Available` status group in the hero.

**CSS (from the scraped HTML):**
```css
flex: none;
height: 32px;
position: relative;
width: 600px;
```

**Why ours feels off:** our LogoBar uses `py-12 md:py-14`, which creates a fat vertical section that dwarfs 32px logos. Finns keeps the logo row itself at 32px tall and lets the *surrounding section* breathe (120px top and bottom).

**Fix for our LogoBar:**
```tsx
<section
  className="pt-24 pb-20 md:pt-28 md:pb-24 overflow-hidden"
  style={{ backgroundColor: '#F3F2F1' }}
>
  <div className="container-tight">
    {/* inner row is tight */}
    <div className="h-8 flex items-center justify-center gap-10">
      {/* 32px tall logos */}
    </div>
  </div>
</section>
```

The rule: **outer section = generous (96 to 120px), inner row = tight (32px).** Our current version inverts this.

### B. Bento grid (from `framer-fo6qp1` + `framer-1hmasul`)

Finns uses a bento layout for the "What we offer" section. Extracted CSS:

```css
.framer-fo6qp1 {
  display: grid;
  gap: 16px;
  grid-auto-rows: min-content;
  grid-template-columns: repeat(3, minmax(50px, 1fr));
  grid-template-rows: repeat(2, min-content);
  max-width: 1280px;
}
/* Mobile */
@media (max-width: 810px) {
  .framer-fo6qp1 { grid-template-columns: repeat(2, minmax(50px, 1fr)); }
}
@media (max-width: 500px) {
  .framer-fo6qp1 { grid-template-columns: repeat(1, minmax(50px, 1fr)); }
}
```

**What makes it a bento and not a boring grid:**
- Uneven card sizes. Some cards span 2 columns, some span 1. One card spans 2 rows.
- 16px gap, not 24. Cards feel snug, not floating.
- Each card is 300px tall with 24px inner padding.
- `border-radius: 24px` on cards. Rounder than ours (currently 12 to 16px).

**Apply to ServicesGrid:**
Replace the 3-column uniform grid with a bento. 6 services. Layout:

```
┌──────────────┬──────┬──────┐
│  Featured    │      │      │
│  (2 cols)    │  2   │  3   │
│              │      │      │
├──────┬───────┴──────┼──────┤
│      │              │      │
│  4   │  5 (2 cols)  │  6   │
│      │              │      │
└──────┴──────────────┴──────┘
```

One hero card (spans 2 cols), one wide middle card (spans 2 cols), four regular. Mix sizes, not content.

```tsx
<div className="grid gap-4 md:grid-cols-4 md:auto-rows-[300px]">
  <div className="md:col-span-2">{/* featured service */}</div>
  <div className="md:col-span-1">{/* service 2 */}</div>
  <div className="md:col-span-1">{/* service 3 */}</div>
  <div className="md:col-span-1">{/* service 4 */}</div>
  <div className="md:col-span-2">{/* service 5, wide */}</div>
  <div className="md:col-span-1">{/* service 6 */}</div>
</div>
```

Gap 16px. Card radius 24px. Card padding 24px. Card background white on cream section. No border, soft shadow on hover only.

### C. The icon container (`framer-o5sai9`)

This is the good icon style the user pointed to. Exact CSS from the HTML:

```css
.framer-o5sai9 {
  width: 28px;
  height: 28px;
  border: 1px solid rgb(231, 230, 228);   /* cream-adjacent border */
  border-radius: 10px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* The icon SVG inside */
.framer-1bqt9gf-container { width: 18px; height: 18px; }
```

**What this means:** Finns does **not** use emoji. They do **not** use lucide in a pastel square. They use a **small white square with a 1px warm-cream border and a tiny 18px monoline icon inside**. The icon itself is clean, editorial, monoline (single-weight strokes), not the slightly chunky lucide style.

**How to get this look:**
1. **Tabler Icons** (`@tabler/icons-react`) or **Untitled UI icons** or **Lucide set to `strokeWidth={1.5}`**. Tabler is the closest match to Finns' style, free, 4000+ icons.
2. Wrap each icon in a 28px (small) or 40px (service card) container.
3. Border: `1px solid #E7E6E4`.
4. Radius: `10px` on small icons, `14px` on 40px icons.
5. Background: `#FFFFFF`.
6. Icon inside at 18px (small) or 24px (large), stroke 1.5.

```tsx
function IconChip({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div
      className="w-10 h-10 flex items-center justify-center bg-white"
      style={{
        border: '1px solid #E7E6E4',
        borderRadius: '14px',
      }}
    >
      <Icon size={20} strokeWidth={1.5} style={{ color: '#1D2020' }} />
    </div>
  );
}
```

No pastel fill. No purple. Just white with a warm border. This is a small change with huge payoff.

**Emoji idea from last round is retracted.** User hated it. Going with Tabler icons + white chip.

### D. Spacing (the whole site feels cramped)

Real data from Finns' CSS:
- **Hero section padding:** `220px 40px 0` on desktop (yes, 220 on top).
- **Signature sections:** `160px 24px` or `120px 24px`.
- **Dense sections:** `80px 32px`.
- **Card inner padding:** `24px`.
- **Card gap within grids:** `16px`.
- **Container max-width:** `1280px`.

Ours uses `py-16 md:py-24` (64 to 96px) on most sections. That is half of what Finns uses.

**Revised spacing rule:**

| Section | New padding (top / bottom) | Why |
|---|---|---|
| Hero | `pt-40 pb-32 md:pt-48 md:pb-40` (160 to 192 / 128 to 160) | Hero needs air |
| LogoBar | `pt-24 pb-20 md:pt-28 md:pb-24` (96 to 112 / 80 to 96) | Signal band |
| Signature (NumbersTicker, ForFoundersEnterprise, FinalCTA) | `py-32 md:py-40` (128 to 160) | Already correct. Keep. |
| Standard (ServicesGrid, FeaturedWork, Process, Testimonials) | `py-24 md:py-32` (96 to 128) | Currently 64 to 96. **Bump up.** |

**Fix Process and Testimonials today:** change `py-16 md:py-24` to `py-24 md:py-32`.

**Fix LogoBar:** change `py-12 md:py-14` to `pt-24 pb-20 md:pt-28 md:pb-24`. Keep the inner row tight.

---

## Part 4 / Icons (the fix, final answer)

User's feedback: **emoji are annoying, lucide-in-pastel-squares are soulless, the Finns style (`o5sai9`) is the target.**

### The target style
White square. 1px warm cream border `#E7E6E4`. Radius `10px` to `14px`. One monoline icon inside, stroke weight 1.5, dark `#1D2020` color. No color fill. No pastel. No lime. Subtle.

### Implementation path (ranked)

**1. Tabler Icons (ship this week)**
- `bun add @tabler/icons-react`
- 4000+ icons, monoline, stroke-based, closest to Finns' style
- Use `stroke={1.5}` and `size={20}` for large cards, `size={14}` for small.
- Free, MIT licensed.

```tsx
import { IconBrain, IconMessageChatbot, IconMicrophone, IconChartBar, IconGitBranch, IconCode } from '@tabler/icons-react';
```

**2. Lucide with stroke tuning (alternative, no new dep)**
- Already installed. Set `strokeWidth={1.5}` globally.
- Slightly chunkier than Tabler, but passable.

**3. Untitled UI Icons (most premium, manual)**
- Download from untitledui.com/icons.
- Copy individual SVGs you need into `src/components/ui/icons/`.
- Best looking. Most work to set up.

**Pick #1 unless you have time for #3.**

### Commissioning custom (later)
When budget allows, commission 6 custom 2-tone icons matching the target style from a Dribbble illustrator. $200, 2 days. Defer until everything else ships.

---

## Part 5 / Where images go (real images, no stock)

Covered in detail before, kept tight here.

| Section | Image |
|---|---|
| Hero | Pick ONE: tilted Aphra/Capwell product screenshot, OR B&W team photo, OR 6s muted product video loop. Kill the diagram. |
| LogoBar | 8 real SVG client logos. 32px tall. Grayscale default, color on hover. |
| NumbersTicker | No images. Bricolage numbers carry it. |
| ServicesGrid | Tabler icons in white chip (Part 4). Not emoji. Not lucide-in-pastel. |
| FeaturedWork | One 16:9 cover per case study. Screenshots where possible. Logo-on-color-block where not. Unified color grade across the set. |
| ForFoundersEnterprise | One photograph per half, heavy color grade. |
| Testimonials | Real LinkedIn headshots, 64px circle, color. Or company logo if no photo permission. Never initials in a circle. |
| Process | No images. Numbers `01 / 02 / 03 / 04` in Bricolage 96px lime are the visual. Optional tiny PR or Loom screenshot in step 2. |
| FinalCTA | No image. Empty space is the design. |
| Footer | No image. Monospaced sitemap. |

Do not: Unsplash heroes, AI-generated brain illustrations, 3D abstract shapes, initials in colored circles.

---

## Part 6 / Expand testimonials (from old `/Users/haseeb/Documents/Haseeb portfolio website/index.html`)

Current site has 3 testimonials. Old site had 7 named reviews with real attribution. Add these 7 to `siteConfig.testimonials`. They are real, verifiable, and come from named clients.

Drop this into `src/lib/siteConfig.ts` `testimonials: [...]`:

```ts
{
  body: "Muhammad is an extremely skilled developer. I brought him a project that multiple developers said wasn't possible. He took it on, knocked it out of the park, and met our tight deadline with ease. We will be working with him on many more projects.",
  attribution: 'Luke Blackamore',
  meta: 'Upwork · Senior Full Stack project',
},
{
  body: "Muhammad is such a skilled developer. There was nothing he wasn't able to do with our project. Even with adversity, he overcame it with great communication and timely responses despite the time difference. Professional. 10/10.",
  attribution: 'Ahmad Rashid',
  meta: 'Upwork · Full Stack build',
},
{
  body: "Haseeb did an exceptional job and completed the task with quality. Awesome to work with, no fuss, professional, easy to communicate with. 10/10 recommend him.",
  attribution: 'Lim Jun Wei',
  meta: 'Upwork · Data & AI project',
},
{
  body: "Muhammad quickly pulled a large amount of data for our team's needs. Extremely flexible and responsive as we requested additional data scraping and analysis. We would definitely recommend his work to others.",
  attribution: 'Kate',
  meta: 'Upwork · Data engineering',
},
{
  body: "Haseeb delivered good work on this data scraping project. His communication during the project was top-notch and his skills were strong. When I needed additional help to save my team time, he was forthcoming about cost and provided great solutions to save money. I will work with him again.",
  attribution: 'Kurt Uhlir',
  meta: 'Upwork · Data engineering',
},
{
  body: "Muhammad was awesome to work with. Very professional, easy to work with and to communicate with.",
  attribution: 'Zachary Jones',
  meta: 'Upwork · Engineering',
},
{
  body: "Muhammed did an excellent job and completed the assignment to a high quality and on time.",
  attribution: 'Vishal Patel',
  meta: 'Upwork · Engineering',
},
```

That brings total testimonials to **10**, named, verifiable. This is a huge trust boost and it was already sitting in the old site.

**Display rule:** carousel or 2-column masonry with 5 each side. Do NOT show all 10 at once in a 10-card grid, that looks desperate. One big featured quote at 32 to 40px, the rest smaller in a secondary row or behind a "See more" toggle.

---

## Part 7 / Polish pass (kept, unchanged substance)

### Typography
- Body copy: 18px on desktop. Not 16px.
- Max line length: 60ch.
- Kill `font-bold` in body. Use italic.
- Headlines: `letter-spacing: -0.03em`. Already set.
- Mono labels: IBM Plex Mono, 12px, lowercase tracking (not uppercase).

### Borders and shadows
- Cream sections: no borders on cards. Soft shadow only. `shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_8px_24px_rgba(0,0,0,0.04)]`.
- Dark sections: 1px inside border `rgba(255,255,255,0.06)`. No shadow.
- Hover: translate Y by -2px, shadow deepens. Never `scale(1.02)`.

### Color discipline (one job per color)
| Color | Hex | Job |
|---|---|---|
| Lime | `#D8F9B8` | Primary CTA on dark. Signature highlights. |
| Purple | `#7C3AED` | Text link hover underline. Nothing else. |
| Ink | `#1D2020` | Headlines on light. |
| Off-white | `#F1F0EE` | Headlines on dark. |
| Cyan | `#0099FF` | Inline code, live indicator dots. |

### Corners (mixed, not uniform)
- Buttons: `rounded-full`
- Bento cards: `rounded-3xl` (24px, match Finns)
- Regular cards: `rounded-2xl` (16px)
- Icon chips: `rounded-[10px]` or `rounded-[14px]`
- Tags and chips: `rounded-md` (6px)
- Input fields: `rounded-lg` (10px)

### Micro-interactions (one per page, not per component)
Pick 2 or 3 signature moments:
- Navbar on scroll: wordmark shrinks to monogram.
- Case study card hover: cover image scales 1.02, metric chip slides in.
- NumbersTicker: numbers tick up on enter viewport.

Nothing else hovers.

### Surface alternation (mostly done, keep)
| Section | Surface |
|---|---|
| Hero | Dark `#1D2020` ✅ |
| LogoBar | Cream `#F3F2F1` ✅ |
| NumbersTicker | Deep teal `#031F2A` ✅ |
| ServicesGrid | Cream `#F3F2F1` ✅ |
| FeaturedWork | White `#FFFFFF` ✅ |
| ForFoundersEnterprise | Dark `#1D2020` ✅ (split with `#031F2A` optional) |
| Testimonials | Cream `#F3F2F1` ✅ |
| Process | White `#FFFFFF` ✅ |
| FinalCTA | Dark `#1D2020` ✅ |

---

## Part 8 / Ship order (practical)

Do these. In this order. Then stop and look.

1. **Text pass.** Grep `—` and `→`. Delete all in copy. Rewrite. 1 hour.
2. **Spacing fix.** LogoBar to `pt-24 pb-20 md:pt-28 md:pb-24`. Process and Testimonials to `py-24 md:py-32`. 15 min.
3. **Icon swap.** `bun add @tabler/icons-react`, replace the 6 lucide-in-pastel-squares with Tabler-in-white-chips per Part 4. 1 hour.
4. **Bento grid.** Rebuild ServicesGrid layout per Part 3B. Mix 1- and 2-col cards. 1 to 2 hours.
5. **Testimonials expansion.** Paste 7 new reviews from Part 6 into `siteConfig.ts`. Rework Testimonials.tsx to display one featured + a grid of the rest. 45 min.
6. **Real logos.** Download 8 client SVGs into `public/logos/`. Wire LogoBar. 45 min.
7. **Hero visual decision.** Still pending. Pick A, B, or C from Part 5.
8. **Color cleanup.** Strip purple except text link hover. 30 min.
9. **Then** move to Part 1's missing pieces: `/api/contact/route.ts`, `/contact` page, `/work`, `/work/[slug]`, MDX case studies, sitemap, robots, 404, llms.txt, JSON-LD, OG images, favicons.

Target: steps 1 to 8 in one focused afternoon. Step 9 in the next session.

---

## Part 9 / References

- [linear.app](https://linear.app). Product screenshots. Dark hero. Restrained motion.
- [vercel.com](https://vercel.com). Surface alternation. Real code as images.
- [resend.com](https://resend.com). Restraint. One signature color.
- [framer.com/new](https://framer.com/new). Bold type. Real product video.
- [railway.com](https://railway.com). Dark, editorial, one pop.
- [mother.design](https://mother.design). Agency site. Photo forward.
- [koto.studio](https://koto.studio). Case study treatment.
- [finns.framer.website](https://finns.framer.website). The reference. Specifically: their bento grid, their icon chips, their section padding.

None of them use em dashes in button copy. None ship `→` as a text character. All of them have real images.

---

## One sentence

The site does not need more text, more animations, or more features. It needs real images, real restraint, real spacing, and to stop writing like a language model.
