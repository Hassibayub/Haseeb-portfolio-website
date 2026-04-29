# 06 / Fix the Soul

For humans. Not AI. Read top to bottom. Short. Visual. Opinionated.

---

## Part 1 / Status check

### Done (roughly 35%)
- Next 16, React 19, Tailwind 4, bun, TS scaffolded.
- Env wired: GA4, Clarity, Resend, Calendly.
- `layout.tsx`, `page.tsx`, `globals.css`.
- 9 homepage sections built: Hero, LogoBar, NumbersTicker, ServicesGrid, FeaturedWork, ForFoundersEnterprise, Testimonials, Process, FinalCTA.
- Navbar, Footer, Section.
- 14 UI primitives (shadcn + MagicUI).
- `CaseStudyCard`, `siteConfig`, `analytics`, `utils`, `case-studies-meta.ts`.

### Broken right now
1. `/api/contact/` folder exists with no `route.ts`. Contact form 404s.
2. `page.tsx` references `/og/home.png`. File does not exist.
3. `public/` only has the 5 default Next SVGs. No logos. No favicons. No covers.
4. `Hero.tsx` has a dead `useRef` import.
5. Every section uses the same cream background. Nine identical bands stacked. This is why it feels flat.

### Missing
Routes: `/work`, `/work/[slug]`, `/contact` page, optional `/about`.
Content: 0 of 8 MDX case studies.
SEO: `sitemap.ts`, `robots.ts`, `not-found.tsx`, `public/llms.txt`, JSON-LD.
Assets: logos, favicons, OG images, case study covers.

Specs for all of it live in `02-CASE-STUDIES.md`, `03-COMPONENTS-CODE.md`, `04A-ASSETS-NEEDED.md`, `05-SEO-PERFORMANCE-PATCH.md`. Follow those.

**Do not ship more pages before the soul fix in Part 2.** No point ship­ping 8 case studies onto a dull shell.

---

## Part 2 / Three AI tells to kill first

### Tell 1. Em dashes
Found 28 in the codebase. The single biggest giveaway.

Banned: `—` (U+2014) and `–` (U+2013).

Use instead:
- Period. Two short sentences.
- Colon `:` when introducing a list.
- Parentheses `( )` for an aside.
- A line break for dramatic pause.

Examples (current / better):

| Current | Better |
|---|---|
| `AI that runs in production — not demos that break under load.` | `AI that runs in production. Not demos.` |
| `Six things we do well — and the rest we politely decline.` | `Six things we do well. We pass on the rest.` |
| `a senior team that ships real code fast — not a cheap freelancer` | `A senior team that ships real code. Not a cheap freelancer.` |
| `Colors — Light mode` (CSS comment) | `Colors / Light mode` |

Global search `—` across `src/`. Delete every one. Read each replacement out loud. If it breaks, rewrite into two sentences.

### Tell 2. Arrow characters in button copy
Found 9 instances of `→` glued to button and link text. Junior-dev-on-Friday energy.

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
Every ServicesGrid card has a lucide icon (`Rocket`, `Bot`, `Mic`) in a `bg-[#F3EEFF]` rounded square. Every SaaS site since 2022 does this. Reads as template. Part 3 has the fix.

---

## Part 3 / Images. Where they go. What they are.

The site has zero real images. That is the reason it feels like a spec document. No amount of animation or copy fixes this. **Real images, real restraint.**

No stock photography. No AI-generated-looking slop. No "abstract brain network" illustrations. Real things from real work.

### Hero
Kill the three-boxes-with-dashed-lines diagram. It reads as a PowerPoint slide.

Pick one of three. Commit once. Ship.

**A. Tilted product screenshot.**
Screenshot of Aphra's dashboard or Capwell's CRM, cropped to a browser chrome, rotated about 8 degrees, soft shadow. One floating metric chip pinned on top ("17,234 active users · live"). This is what Linear, Vercel, Resend do. It works because it is *your actual software.*

**B. Black and white team photograph.**
High contrast, one light source, plain wall, tight crop on 2 or 3 faces lit by laptop glow. Shot on a phone in 20 minutes. This is what consultancies and studios do when their work is not photographable.

**C. 6 second muted product video.**
Loop of an agent trace running. MP4 under 1MB. `<video autoplay muted loop playsinline>`. Linear and Arc do this. Most modern, hardest to copy.

Do not: ship the diagram, ship an "AI brain" illustration, ship an Unsplash hero.

### LogoBar
8 real SVG logos. Uniform height 32px. Grayscale with 55% opacity by default. Full color and opacity 1 on hover. Slow marquee, 45s cycle.

No "Trusted by" label above. The row of logos is self explanatory.

Sources: download from each client's website footer. If no SVG available, ask the client for a PNG.

### NumbersTicker
No images. Bricolage numbers at 72 to 96px on a dark surface carries the section.

Optional texture: 4% opacity white grid lines on `#1D2020`. That is it.

### ServicesGrid (the lucide square fix)
One visual per card. Ranked options:

1. **Custom 2 tone illustrations.** 48x48, dark outline, one lime fill. Hire a Dribbble illustrator, $200 for 6 icons, 2 day turnaround. This is the move that makes the site feel bespoke. Everything else here reads as default.
2. **Isometric or editorial icons.** Iconduck or Streamline. Free, more personality than lucide.
3. **Emoji.** Single 40px emoji per card (`🧠 🎙️ ⚡ 🔧 📊 🤖`). Reads as confident and human. Stripe homepage uses emoji. On Windows render via twemoji to stay consistent.

Do not use lucide in a pastel square.

### FeaturedWork
One editorial cover image per case study. 16:9. All covers processed through the same filter pass so they read as a set: slight darken (brightness 0.95), subtle vignette, 16px radius.

| Client | Cover image |
|---|---|
| Aphra | Mobile app screenshot, real chat thread |
| Capwell | CRM dashboard, PII blurred |
| KCNL | Product photograph or dashboard snapshot |
| Tula | YC Demo Day slide or clean app screenshot |
| Medmatch / FCS / Bestinform | Dashboard screenshot each |
| Sony PlayStation | Logo on black card with subtle sheen. Do not fake permission on product screenshots |

When a screenshot is not available yet: a flat color block with the client's logo centered, oversized, cropped at the edges, plus a monospaced ID tag in the corner like `CS_04 / FCS`. This is legit editorial treatment (see Koto, Mother, Pentagram). Not a cop-out.

### ForFoundersEnterprise (split screen)
One photograph per half. Heavy color grade so both sides read as one system.

Founders side: photo of a founder at a whiteboard, or an early-stage workspace.
Enterprise side: conference room or industrial environment that matches your actual enterprise clients.

If you cannot source real photos: left side, blurred code on a monitor. Right side, architectural close-up of a building corner, high contrast. Unsplash is acceptable here **only** if both sides get the same color grade.

### Testimonials
Real headshot per quote. LinkedIn headshot size, 64px circle, color. If you do not have photo permission, use the client's company logo instead.

Do not use initials in a colored circle. That is the Gmail fallback and it is the laziest signal possible.

### Process
No images. The numbers are the visual. Bricolage at 96px, lime, left aligned. `01`, `02`, `03`, `04`.

Optional: one small screenshot inside the Build step showing a real PR or Loom thumbnail. Makes the process feel real.

### FinalCTA
No image. Dark surface. Big headline. One lime button. Empty space is the design. Resist the urge to fill it.

### Footer
No image. Monospaced sitemap. Small mono line at the bottom: `Built in Karachi. Code with Haseeb. 2026.`

---

## Part 4 / Icons are soulless. Fix them.

Lucide is a great library. It is also the most overused library on startup sites in 2026. Using default lucide in a pastel square is the visual equivalent of "Hi, I built this in a weekend from a template."

Three paths, in order of how much soul it adds:

### Path 1. Commission custom (recommended)
Brief a Dribbble illustrator. $200. Reference: Stripe product icons, Linear method icons, Raycast icons.

Deliverables:
- 6 icons for ServicesGrid (LLM app builds, AI agents, Voice AI, Cost and eval, Automations, Senior engineering).
- Same 2 tone system: dark line work on transparent, one lime fill mark per icon.
- SVG, 48x48 viewbox, optimized.
- 2 day turnaround.

### Path 2 (editorial icon pack)
Buy or download a cohesive set. Not the first result on Flaticon.

Good sources:
- [iconduck.com](https://iconduck.com) (free, curated)
- [streamlinehq.com](https://streamlinehq.com) (paid, massive, high quality)
- [untitled-ui.com/icons](https://untitled-ui.com/icons) (free, Figma first)
- [tabler-icons.io](https://tabler-icons.io) (free, looks less "default" than lucide)

Pick one pack. Use one weight. Use one style. No mixing.

### Path 3. Emoji (ship today)
40px emoji per card. Keep them consistent-feeling (all rendered, no flag-style emoji mixed with object-style).

Render with twemoji for cross-platform consistency:

```tsx
import { Twemoji } from 'react-emoji-render';
// or inline SVG from jdecked/twemoji
```

Stripe homepage uses emoji. Notion uses emoji. It reads as confident and human.

**None of these live in a pastel rounded square.** Let the icon breathe on the card surface.

---

## Part 5 / Polish pass

The 20 small things that separate agency work from template work.

### Spacing
Stop using `py-16 md:py-24` on everything.

- Hero: `pt-32 pb-40` (bottom air matters)
- Signature sections (NumbersTicker, ForFoundersEnterprise, FinalCTA): `py-32 md:py-40`
- Dense sections (ServicesGrid, FeaturedWork): `py-20 md:py-28`

Asymmetry reads as intentional. Uniformity reads as cheap.

### Typography
- Body copy: 18px on desktop. Not 16px. Confident.
- Max line length: 60ch. Current paragraphs stretch past 720px and feel thin.
- Kill `font-bold` in body paragraphs. Use italic. Bricolage italic is the good stuff.
- Headlines: `letter-spacing: -0.03em` on display text. Already set, keep it.
- Mono labels (eyebrows, small caps): IBM Plex Mono, 12px, tracking wider, lowercase (not uppercase, uppercase is tired).

### Borders and shadows
- Cream sections: no borders on cards. Shadow only. `shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_8px_24px_rgba(0,0,0,0.04)]`.
- Dark sections: 1px inside border `rgba(255,255,255,0.06)`. No shadow (shadows on dark look muddy).
- Hover: translate Y by -2px, shadow deepens. Never `scale(1.02)`. Scaling on hover is 2019 energy.

### Color discipline
Every color needs one job. Right now purple has five.

| Color | Hex | One job |
|---|---|---|
| Lime | `#D8F9B8` | Primary CTA on dark surfaces. Signature highlight. |
| Purple | `#7C3AED` | Text link hover underline. Nothing else. |
| Ink | `#1D2020` | Headlines on light surfaces. |
| Off white | `#F1F0EE` | Headlines on dark surfaces. |
| Cyan | `#0099FF` | Inline code, live indicator dots. |

If you catch yourself using a color for a second job, rebuild the palette.

### Corners (mixed, not uniform)
- Buttons: `rounded-full`
- Cards: `rounded-2xl` (16px)
- Images: `rounded-2xl` on cream, `rounded-xl` on dark
- Tags and chips: `rounded-md` (6px)
- Input fields: `rounded-lg` (10px)

Consistent system. Not one radius for everything.

### Micro-interactions (one per page, not per component)
Right now every card hovers, every button hovers, every link hovers. That is why it feels busy without feeling alive.

Pick two or three signature interactions and commit:
- Navbar: on scroll, logo shrinks from wordmark to monogram.
- Case study card hover: cover image scales 1.02, a metric chip slides in from the corner.
- NumbersTicker: numbers tick up on enter viewport (already planned).

Everything else: no hover treatment.

### Surface alternation (the single biggest lift)
Stop stacking cream on cream. Alternate:

| Section | Surface |
|---|---|
| Hero | Dark `#1D2020` |
| LogoBar | Cream `#F3F2F1` |
| NumbersTicker | Deep teal `#031F2A` |
| ServicesGrid | Cream `#F3F2F1` |
| FeaturedWork | White `#FFFFFF` |
| ForFoundersEnterprise | Dark split (founders `#1D2020`, enterprise `#031F2A`) |
| Testimonials | Cream `#F3F2F1` |
| Process | White `#FFFFFF` |
| FinalCTA | Dark `#1D2020` |

Never two cream sections in a row. Never two dark sections in a row.

---

## Part 6 / Ship order (practical, not aspirational)

Do these six. In this order. Then stop and look.

1. **Text pass.** Grep `—`. Grep `→`. Delete all of them. Rewrite. 1 hour.
2. **Surface alternation.** Apply the table in Part 5 to each section's outer `style={{ backgroundColor }}`. 1 hour.
3. **Real logos.** Download 8 client logos into `public/logos/`. Wire LogoBar to render real SVGs. 45 min.
4. **Hero visual decision.** Pick A, B, or C from Part 3. Commit. Build once. 2 to 4 hours depending on option.
5. **Icon fix.** Emoji today (30 min) or commission custom for the week ($200, 2 day wait).
6. **Color cleanup.** Strip purple everywhere except text link hover. Add lime as primary CTA color on dark. 1 afternoon.

Then look at the site. Decide what hurts next.

After soul pass, circle back to Part 1's missing pieces: `/api/contact/route.ts`, `/contact`, `/work`, `/work/[slug]`, 8 MDX case studies, `sitemap.ts`, `robots.ts`, `not-found.tsx`, `llms.txt`, JSON-LD, OG images, favicons.

---

## Part 7 / References. Go look.

30 minutes. Do not copy layouts. Notice surface contrast, photo treatment, whitespace, restraint.

- [linear.app](https://linear.app). Product screenshots. Dark hero. Restrained motion.
- [vercel.com](https://vercel.com). Surface alternation. Real code as images.
- [resend.com](https://resend.com). Restraint. One signature color.
- [framer.com/new](https://framer.com/new). Bold type. Real product video.
- [railway.com](https://railway.com). Dark, editorial, one pop.
- [mother.design](https://mother.design). Agency site. Photo forward. Confident.
- [koto.studio](https://koto.studio). Case study treatment.
- [workof.studio](https://workof.studio). Typography. Whitespace.
- [finns.framer.website](https://finns.framer.website). The reference you liked. Look at how often they use dark sections.

None of them use em dashes in button copy. None ship `→` as a text character. All of them have real images.

---

## One sentence

The site does not need more text, more animations, or more features. It needs real images, real restraint, and to stop writing like a language model.
