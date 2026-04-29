# 04A — Assets Needed (Image + File Checklist)

> Every visual asset the site needs, organized by where it lives, with exact dimensions, file names, sourcing guidance, and ready-to-paste AI-generation prompts for anything you need to create from scratch.
>
> **Target total assets:** ~30 files
> **Estimated time to execute:** 1 full day if you batch the work, 2–3 days spread out
> **Required before launch:** items marked 🚨 (otherwise launch still technically works but looks incomplete)

---

## QUICK INDEX

1. [Case Study Cover Images (8 files)](#1-case-study-cover-images) 🚨
2. [Open Graph Images (per-page)](#2-open-graph-images)
3. [Team + About Page Assets](#3-team--about-page-assets)
4. [Hero Visual Elements](#4-hero-visual-elements)
5. [Client Logos (optional upgrade)](#5-client-logos-optional-upgrade)
6. [Favicons + PWA Icons](#6-favicons--pwa-icons) 🚨
7. [Fonts](#7-fonts)
8. [Blog Preview Images (future)](#8-blog-preview-images-future)
9. [Quick Generation Recipes](#9-quick-generation-recipes)

---

## 1. Case Study Cover Images

**Required before launch.** These are the single most visible asset on the site. Every card on `/work`, every featured preview on home, and every case study hero uses these.

### Specs

| Property | Value |
|---|---|
| Dimensions | **1600 × 900 px** (16:9 aspect) |
| Format | `.webp` (compressed), quality 80 |
| Max file size | 150 KB each |
| Color space | sRGB |
| Naming | `/public/images/work/[slug]-cover.webp` |

### Files needed

| File name | Case study | Concept direction |
|---|---|---|
| `aphra-cover.webp` | Aphra.me | A stylized representation of a talking-head AI avatar. Could be a cropped app screenshot, an abstract portrait with AI-interface elements, or a device mockup showing the avatar in action. |
| `capwell-cover.webp` | Capwell Comm | A visualization of agents at work. Think: a dark minimal dashboard with a graph of "agents active," a data-stream aesthetic, or a network diagram of bots collaborating. |
| `kcnl-cover.webp` | KCNL.eu | A stylized invoice flowing into a structured data output, or a simple cost-reduction chart with the $100K → $1.5K moment highlighted. Visual wants to communicate "enterprise SaaS, money saved." |
| `tula-cover.webp` | Tula Transformation | Soft, warm imagery of a conversational AI feel. Could be a blurred device showing chat UI, or an abstract calming visual (gradient mesh, soft light). Mental health brands use softness deliberately. |
| `medmatch-cover.webp` | Medmatch | Healthcare + voice. A stylized waveform over a subtle medical motif (not literal medical imagery — avoid stethoscopes, pill bottles). Minimal, clean, trustworthy. |
| `fcs-cover.webp` | FCS | A pipeline/flow visualization. Lead coming in → AI tools → closed outcome. Could be a minimal Sankey-style diagram or a stylized CRM dashboard. |
| `bestinform-cover.webp` | Bestinform.eu | Travel/aviation aesthetic. A stylized flight path over a map, or a minimalist airline ticketing interface. Keep it clean, not touristy. |
| `sony-cover.webp` | Sony PlayStation | Gaming / data aesthetic. Be careful about using any Sony trademarks directly. Better: an abstract representation of the 120× speedup — a chart, a tachometer-style dial, or a simple "before / after" data viz. |

### How to generate them

**Option A: Product screenshots (if you have access)**
For Aphra, Tula, KCNL — you or the client may already have product screenshots. Crop to 16:9, clean up any private data, export at 1600×900.

**Option B: Design in Figma (30 min each)**
Simple hero cards: colored background + a single visual element + a small client-name label. Ship fast over "perfect."

Starter Figma recipe for any case study:
1. Frame 1600×900
2. Background: warm neutral (`#F3F2F1`) or subtle gradient
3. One centered focal element (icon, mockup, abstract visual)
4. Client name in small sans-serif in the corner
5. Subtle accent color touch (`#7C3AED`)
6. Export as WebP 80%

**Option C: AI-generated (fastest, see prompts below)**
Use Midjourney, DALL-E, Ideogram, or Flux to generate. Paste the prompts from Section 9 of this document.

**Option D: Unsplash/Pexels (last resort)**
Search terms like "abstract technology gradient," "data visualization," "minimal interface." Avoid stock images that scream "stock" — they kill premium feel.

### Alt text for each cover (accessibility + SEO)

Use these exactly in the `alt` prop of `<Image>`:

```
aphra-cover.webp:
  "Aphra.me — real-time AI video avatar platform serving 17,000 users"

capwell-cover.webp:
  "Capwell Comm — autonomous multi-agent system managing 500,000 records"

kcnl-cover.webp:
  "KCNL.eu — B2B invoice AI that reduced LLM costs from $100K to $1.5K per month"

tula-cover.webp:
  "Tula Transformation — YC Angel-backed AI therapist platform"

medmatch-cover.webp:
  "Medmatch — HIPAA-compliant AI voice agent for healthcare"

fcs-cover.webp:
  "Full Credit Sweep — AI pipeline handling 2,000 active users and 68,000 leads"

bestinform-cover.webp:
  "Bestinform.eu — international airline ticketing platform"

sony-cover.webp:
  "Sony PlayStation — 120× faster survey data pipeline at 5 million record scale"
```

---

## 2. Open Graph Images

These are the thumbnails when your pages are shared on LinkedIn, Twitter, Slack, iMessage. Each page needs one.

### Specs

| Property | Value |
|---|---|
| Dimensions | **1200 × 630 px** |
| Format | `.png` (better for text) |
| Max size | 300 KB |
| Naming | `/public/og/[page].png` |

### Two approaches

**Approach 1: Next.js dynamic OG generation (recommended, zero manual work)**

Create `src/app/opengraph-image.tsx` — Next.js will auto-generate OG images from JSX at build time:

```tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'codewithhaseeb — AI Engineering for Funded Startups';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          background: '#F3F2F1',
          padding: '80px',
          fontFamily: 'serif',
        }}
      >
        <div style={{ fontSize: 28, color: '#8C8C8C', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          codewithhaseeb
        </div>
        <div
          style={{
            fontSize: 84,
            color: '#2B2D2D',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            maxWidth: 1040,
          }}
        >
          AI that runs in production — not demos that break under load.
        </div>
        <div style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
          <div style={{ fontSize: 20, color: '#666' }}>
            Sony PlayStation · Aphra · Tula · Capwell · KCNL
          </div>
          <div
            style={{
              marginLeft: 'auto',
              fontSize: 20,
              color: '#7C3AED',
              fontWeight: 500,
            }}
          >
            codewithhaseeb.com →
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
```

Do the same for each page by adding `opengraph-image.tsx` in the matching route folder. Next.js renders once at build, caches forever.

**Approach 2: Static PNGs**

If dynamic generation is overkill, design 6 static PNGs in Figma (home, work, services, about, contact, blog) and drop them in `/public/og/`.

### Files needed (if going static)

- `/og/home.png` 🚨
- `/og/work.png`
- `/og/services.png`
- `/og/about.png`
- `/og/contact.png`
- Per case study: `/og/work-[slug].png` (8 files) — or reuse the cover image

**Recommendation:** use Approach 1 (dynamic OG). Zero ongoing maintenance.

---

## 3. Team + About Page Assets

### Haseeb's professional headshot 🚨

Already exists on your Upwork profile. Grab the same one and optimize.

| Property | Value |
|---|---|
| Dimensions | **800 × 800 px** (1:1 square) |
| Format | `.webp` quality 85 |
| Naming | `/public/images/team/haseeb.webp` |
| Alt text | "Muhammad Haseeb, Founder and Lead Engineer at codewithhaseeb" |

**If your current headshot is low-quality:** spend 30 min re-taking one.
- Clean, solid background (warm off-white to match site)
- Natural lighting from window, not overhead
- Neutral expression, looking slightly off-camera is more editorial than straight-on
- Iphone Portrait mode is fine if no DSLR available

### Team member photos (optional for v1)

If you want to include your 4 other team members:
- Same specs as above
- `/public/images/team/[first-name].webp`

**Recommendation for v1:** skip team photos. Keep the About page to just you + a "team of 5" mention. Add photos later as the brand matures.

### Background visual for About page (optional)

One warm abstract texture/gradient as an atmospheric background for the hero section.

Prompt for AI generation: see Section 9.

---

## 4. Hero Visual Elements

The hero visual on the home page is coded as a React component (3 cards + SVG beams) in `03-COMPONENTS-CODE.md` Section 8. **No external image needed.** It's all rendered in-browser.

### If you want to upgrade it later

Options:
- **MagicUI AnimatedBeam** — replace the static SVG with animated particles flowing between nodes
- **Custom Lottie animation** — a designer can create a looping Lottie file showing the agent-to-output flow
- **Video loop** — a 5-second looping MP4 showing the system in action (100-300KB target)

All optional. The static version in the code ships as-is.

---

## 5. Client Logos (Optional Upgrade)

Currently the LogoBar uses **styled text** (`Sony PlayStation · Aphra.me · ...`). This works and looks editorial. You don't need SVG logos to launch.

**If you want to upgrade:**

### Specs (per logo)

| Property | Value |
|---|---|
| Format | `.svg` (preferred) or `.webp` (fallback) |
| Height | 28px at 1x display (so export at 56px for 2x, or use SVG) |
| Color | Monochrome, desaturated, same gray tone (`#666666`) |
| Naming | `/public/logos/[client-slug].svg` |

### Logos to source

| Client | How to obtain |
|---|---|
| Sony PlayStation | **Do not use the Sony/PlayStation logo publicly.** Trademark issues. Use text "Sony PlayStation" only. |
| Aphra.me | Check aphra.me site → right click → save SVG. Or ask the client. |
| Tula Transformation | Check tulatransformation.com → save SVG. |
| Capwell Comm | Check capwellcomm.com. |
| KCNL.eu | May be hard to find; use text. |
| Bestinform.eu | Check bestinform.eu. |
| Medmatch | Text only unless client gives you a logo. |
| FCS | Text only. |
| RGR Learning | Check reallygreatreading.com. |
| eXelerete / AloAi | Check aloai.io. |

**My recommendation:** stick with styled text. Looks more consistent and avoids any trademark/quality issues with sourced logos.

---

## 6. Favicons + PWA Icons

**Required before launch.** Browser tabs, bookmarks, iOS home screen, Android launcher — all need these.

### Files needed

| File | Dimensions | Purpose |
|---|---|---|
| `/public/favicon.ico` | 32×32 (multi-res .ico file) | Browser tab |
| `/public/icon.png` | 512×512 | Generic app icon |
| `/public/apple-icon.png` | 180×180 | iOS Safari / home screen |
| `/public/opengraph-image.png` | 1200×630 | Default OG fallback |

### The easy way

Use the free **[favicon.io](https://favicon.io)** generator.

1. Upload a square image of your logo (or a letter mark — "C" or "H" in a colored square)
2. Click generate
3. Download the zip
4. Drop the files directly in `/public/`

Next.js 15 will auto-detect `favicon.ico`, `icon.png`, `apple-icon.png` in the `/src/app/` or `/public/` folder and wire them up automatically. Zero config.

### Logo mark suggestion

If you don't have a logo, create a simple monogram:

**Figma recipe:**
1. 512×512 frame, background `#7C3AED` (your accent purple)
2. Center a large "C" in Instrument Serif, color `#FFFFFF`, size ~320px
3. Alternative: use the two letters "ch" (lowercase), same styling
4. Export as PNG @ 1x, 2x, and 512×512

Or, if you prefer more abstract:
- A simple geometric shape (square, circle, triangle) in accent purple on warm neutral

---

## 7. Fonts

**Already handled in code.** Next.js loads Inter, Instrument Serif, and JetBrains Mono via `next/font/google` at build time. No action needed.

**No file uploads required** — fonts self-host via Next.js.

---

## 8. Blog Preview Images (future)

Not needed for launch. When you start writing blog posts, each post needs a cover image.

### Specs (future)

| Property | Value |
|---|---|
| Dimensions | 1600 × 900 px |
| Format | `.webp` quality 80 |
| Naming | `/public/images/blog/[slug]-cover.webp` |

Suggested blog post covers — batch-generate 5 with the AI prompts in section 9 when you're ready.

---

## 9. Quick Generation Recipes

### Recipe A: Case study cover images in Midjourney

For each case study, use this base prompt and adjust the concept per project:

**Universal style suffix (append to all):**
```
, warm neutral background tone #F3F2F1, deep purple accent #7C3AED, minimal editorial design, soft lighting, 16:9 aspect ratio, no text, clean composition --ar 16:9 --v 6
```

**Per-case study prompts:**

```
Aphra:
   abstract representation of an AI talking-head avatar, soft portrait silhouette
   with subtle interface elements around it, minimalist, futuristic but warm
   [+ style suffix]

Capwell:
   abstract network of connected nodes and flowing data streams, dark editorial 
   aesthetic, subtle glow on connection points, data visualization style
   [+ style suffix]

KCNL:
   minimal financial dashboard with a subtle downward arrow indicating cost 
   reduction, clean data visualization, enterprise SaaS aesthetic
   [+ style suffix]

Tula:
   soft flowing gradient mesh in calm pastels with warm undertones, 
   abstract and serene, suggestion of conversation without being literal
   [+ style suffix]

Medmatch:
   abstract waveform over a minimal geometric healthcare motif, 
   clean medical aesthetic without literal medical imagery, trustworthy
   [+ style suffix]

FCS:
   minimal pipeline/flow diagram with subtle geometric shapes representing 
   leads moving through stages, clean financial services aesthetic
   [+ style suffix]

Bestinform:
   minimal flight path trajectory over an abstract world map, 
   editorial travel aesthetic, subtle geographic lines
   [+ style suffix]

Sony:
   abstract tachometer or speed-dial visualization, suggesting dramatic 
   performance improvement, gaming but restrained aesthetic
   [+ style suffix]
```

### Recipe B: Using Flux / Replicate / Ideogram

Similar prompts work on other models. Key style anchors to always include:
- "Warm neutral background"
- "Minimal editorial design"
- "Subtle deep purple accent color"
- "No text, no watermarks"
- "16:9 aspect ratio"

### Recipe C: Figma quick-mock (fastest, no AI)

If AI generation isn't working and you want to ship, use this Figma template:

1. New frame, 1600×900
2. Fill: `#F3F2F1` (warm neutral bg)
3. Add a small rectangle in top-left, 120×24, fill `#7C3AED`
4. Add the client name in Instrument Serif 64px inside the rectangle area, color `#2B2D2D`
5. Add one central visual element — could be:
   - A simple geometric shape (circle, pill, square) in a complementary color
   - A single icon enlarged to 300px (from Lucide or Heroicons)
   - A cropped screenshot in a 3D-tilted device mockup (use Figma plugins like "Mockuuups")
6. Add 1-2 small decorative lines or dots in accent purple
7. Export 1x as WebP 80%

You can ship 8 covers in 90 minutes this way.

### Recipe D: One-shot with DALL-E in ChatGPT

If you have ChatGPT Plus, paste this into a new conversation:

```
I need 8 case study cover images for an AI engineering agency website. 
Each must be 1600×900, minimalist editorial style, warm neutral background 
(#F3F2F1), with subtle deep purple accents (#7C3AED). No text in the images.
Style should feel like something Vercel, Linear, or Framer would use — 
restrained, tasteful, tech-forward but warm.

Generate these concepts one at a time:

1. Aphra: Abstract representation of an AI avatar / talking head
2. Capwell: Network of connected AI agents working in parallel
3. KCNL: Cost reduction visualization (subtle chart)
4. Tula: Soft calming gradient suggesting AI conversation
5. Medmatch: Healthcare voice AI waveform
6. FCS: Lead pipeline / flow diagram
7. Bestinform: Flight path over abstract map
8. Sony: Performance / speed dial visualization

Start with #1.
```

---

## 10. File Structure After Completing This Checklist

After you execute this doc, your `/public/` folder should look like:

```
/public
├── favicon.ico
├── icon.png
├── apple-icon.png
│
├── /images
│   ├── /work
│   │   ├── aphra-cover.webp
│   │   ├── capwell-cover.webp
│   │   ├── kcnl-cover.webp
│   │   ├── tula-cover.webp
│   │   ├── medmatch-cover.webp
│   │   ├── fcs-cover.webp
│   │   ├── bestinform-cover.webp
│   │   └── sony-cover.webp
│   │
│   ├── /team
│   │   └── haseeb.webp
│   │
│   └── /blog  (empty for now)
│
└── /og  (only if using static OG images, otherwise Next generates dynamically)
    ├── home.png
    ├── work.png
    └── ...
```

---

## Priority Order (if time-constrained)

If you only have 2 hours, do this and nothing else:

1. **Favicon package** (5 min via favicon.io)
2. **Your headshot optimized** for About page (10 min)
3. **8 case study covers** — use Recipe D (ChatGPT DALL-E) or Recipe C (Figma template) — 90 min
4. **Dynamic OG image** via Next.js `opengraph-image.tsx` (15 min — code already in this doc)

That's the minimum viable asset set. Everything else is enhancement.

— End of assets checklist —
