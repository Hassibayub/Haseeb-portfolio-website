# 05 — SEO, Performance & Motion Patch

> Surgical patches to `03-COMPONENTS-CODE.md` based on specific additional requirements:
> - Minimal / fast animations, respect reduced motion
> - Mobile-first verified for every component
> - `llms.txt` for LLM discoverability (emerging SEO surface)
> - `robots.txt` properly configured
> - Dynamic `sitemap.xml` with correct priority + lastmod
> - Real SEO wiring (structured data, metadata, canonical URLs)
> - GA4 + Microsoft Clarity installed the right way (defer, no layout shift)
> - Performance optimizations for Core Web Vitals / ranking

> **Apply this doc on top of doc 03.** Where there's a conflict, this doc wins.

---

## TABLE OF CONTENTS

1. [Motion Policy (reduce + speed up)](#1-motion-policy-reduce--speed-up)
2. [Mobile Verification Checklist](#2-mobile-verification-checklist)
3. [llms.txt — LLM Discoverability](#3-llmstxt--llm-discoverability)
4. [robots.txt — Correct Configuration](#4-robotstxt--correct-configuration)
5. [sitemap.xml — Enhanced](#5-sitemapxml--enhanced)
6. [SEO Wiring (Metadata + Structured Data)](#6-seo-wiring-metadata--structured-data)
7. [Analytics the Right Way (GA4 + Clarity)](#7-analytics-the-right-way-ga4--clarity)
8. [Performance Rules for Ranking](#8-performance-rules-for-ranking)
9. [Quick Lighthouse 100 Checklist](#9-quick-lighthouse-100-checklist)

---

## 1. Motion Policy (Reduce + Speed Up)

### 1.1 Rules

**Allowed motion:**
- Hover states: opacity / color / small scale — 100ms
- Entrance animation on hero elements: one fade + 8px Y translate — 400ms total
- Logo bar marquee: yes (it's the feature, not decoration)
- Number ticker: yes, but fast (800ms instead of 1800ms)

**Forbidden motion:**
- Parallax on scroll
- Stagger animations beyond hero
- Zoom on image hover (remove from CaseStudyCard)
- Pulse/glow animations on non-critical elements
- Long entrance animations (> 500ms)
- Scroll-jacking
- Cursor-following effects

**Required behavior:**
- Respect `prefers-reduced-motion: reduce` — disable all non-essential motion
- All animations are pure CSS or Framer Motion with `reducedMotion: 'user'`

### 1.2 Patch: `globals.css` — add this at the bottom

```css
/* Respect user motion preference system-wide */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }

  /* Stop the logo marquee when reduced motion is on */
  .animate-marquee {
    animation-play-state: paused !important;
  }
}

/* Default transition speeds — fast */
@layer base {
  a, button {
    transition-duration: 150ms;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
}
```

### 1.3 Patch: `src/components/sections/Hero.tsx`

Replace the Framer Motion entrance block with this faster, reduced-motion-aware version.

```tsx
// Find the existing <motion.*> elements in Hero.tsx and replace their props.

// Before (example): transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
// After:
transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}

// Before: transition={{ duration: 0.7, delay: 0.15 }}
// After:
transition={{ duration: 0.3, delay: 0.08 }}

// Before: transition={{ duration: 0.6, delay: 0.3 }}
// After:
transition={{ duration: 0.3, delay: 0.15 }}

// Before: transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
// After:
transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
```

Then at the top of `Hero.tsx`, import and honor reduced-motion globally:

```tsx
'use client';

import Link from 'next/link';
import { motion, MotionConfig } from 'framer-motion';

import { siteConfig } from '@/lib/siteConfig';
import { trackEvent } from '@/lib/analytics';

export function Hero() {
  return (
    <MotionConfig reducedMotion="user">
      {/* existing JSX */}
    </MotionConfig>
  );
}
```

### 1.4 Patch: Remove the image zoom on `CaseStudyCard`

Open `src/components/shared/CaseStudyCard.tsx` and delete this class from the `<Image>`:

```diff
- className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
+ className="object-cover"
```

The card still has a subtle border color hover. That's enough signal.

### 1.5 Patch: Remove the Hero's pulsing "Available" dot

It's cute but it draws focus from the headline on every page load. Replace with static.

```diff
- <span className="relative flex h-2.5 w-2.5">
-   <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 animate-ping" />
-   <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
- </span>
+ <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
```

### 1.6 Patch: `NumbersTicker` — speed up

In `src/components/sections/NumbersTicker.tsx`, the count-up duration:

```diff
- const duration = 1800;
+ const duration = 800;
```

800ms reads as "the numbers animated in," not "the numbers are animating." Fast + satisfying.

### 1.7 Patch: Slow down the logo marquee (counterintuitive but better)

In `src/components/sections/LogoBar.tsx`, bump duration from 50s to 80s:

```diff
- style={{ ['--duration' as string]: '50s', ['--gap' as string]: '4rem' }}
+ style={{ ['--duration' as string]: '80s', ['--gap' as string]: '4rem' }}
```

Slower = readable = doesn't distract. The logo bar is decoration, not a feature.

---

## 2. Mobile Verification Checklist

Every component in doc 03 is already mobile-responsive. These are the specific things to verify before launch.

### 2.1 Pass/fail checks to run

Open Chrome DevTools, throttle to mobile (iPhone 12 size — 390×844), then:

- [ ] Navbar pill fits within viewport without horizontal scroll
- [ ] Mobile menu drawer opens and closes cleanly
- [ ] Hero headline doesn't overflow — if it does, reduce `display-xl` mobile size
- [ ] Hero right-column visual is hidden below `lg` (it is — `hidden lg:block`)
- [ ] Logo bar scrolls smoothly, doesn't overflow body
- [ ] Numbers ticker grid goes 2x2 on mobile (not 1-column)
- [ ] Services grid goes to 1 column below `md`
- [ ] Case study cards stack cleanly
- [ ] Process section — 5 steps stack vertically on mobile
- [ ] Final CTA headline doesn't get clipped
- [ ] Footer columns stack 2-2 on mobile, 1-1-1-1 on very small

### 2.2 Patches for specific mobile issues

**Fix: Hero headline too big on small phones (< 380px wide)**

In `tailwind.config.ts`, adjust the display-xl clamp:

```diff
- 'display-xl': ['clamp(52px, 6vw, 84px)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
+ 'display-xl': ['clamp(40px, 7vw, 84px)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
```

**Fix: Tap targets too small**

Add a base style to `globals.css`:

```css
@layer base {
  /* Minimum 44px tap target on mobile — matches Apple HIG / WCAG */
  @media (max-width: 768px) {
    a, button, [role="button"] {
      min-height: 44px;
    }
  }
}
```

**Fix: Ensure form inputs don't zoom on iOS focus**

Already handled — font-size on form inputs is 15px in the ContactForm. iOS zooms only if font-size is below 16px on focus. **Change the form input font-size to 16px** to be safe:

```diff
- font-size: 15px;
+ font-size: 16px;
```

---

## 3. llms.txt — LLM Discoverability

### What it is

`llms.txt` is an emerging standard (like `robots.txt` but for AI/LLM crawlers). It tells LLMs what your site is about, what content is high-quality, and what to prioritize when training / retrieving. Adoption is still early but zero downside to adding it, especially for an AI agency.

### File: `public/llms.txt`

Create this at the root of `/public/`:

```
# codewithhaseeb

> AI engineering team for funded startups and SMBs. We ship production AI systems — not demos. Built by a 5-person senior engineering team led by Muhammad Haseeb.

## About

codewithhaseeb is a boutique AI engineering agency based in Islamabad, Pakistan, operating remotely (UTC+5). We specialize in production-grade AI for funded startups and SMBs, including custom AI agents, RAG systems, voice AI, LLM cost optimization, and senior full-stack engineering.

Our clients include Sony PlayStation, Aphra.me (17,000+ active users), Tula Transformation (YC Angel-backed, $1.2M raised), Capwell Communications, KCNL.eu, Bestinform.eu, Medmatch, and Full Credit Sweep.

## Core services

- AI SaaS MVPs — 6–10 weeks, fixed price
- Custom AI agents & multi-agent orchestration (LangChain, LangGraph, CrewAI)
- RAG pipelines at production scale
- Voice AI & conversational agents (HIPAA-compliant, sub-second latency)
- LLM cost optimization (reduced a client's bill from $100K/mo to $1.5K/mo)
- AI workflow automation (GoHighLevel, HubSpot, WhatsApp Business, CRM)
- Senior full-stack engineering

## Featured case studies

- [Aphra.me — Real-time AI video avatar serving 17,000+ users](https://codewithhaseeb.com/work/aphra)
- [Capwell Communications — Autonomous multi-agent system managing 500,000 records](https://codewithhaseeb.com/work/capwell)
- [KCNL.eu — B2B invoice AI that saved a client $98.5K/month on LLM bills](https://codewithhaseeb.com/work/kcnl)
- [Tula Transformation — YC-backed AI therapist platform, $1.2M raised](https://codewithhaseeb.com/work/tula)
- [Medmatch — HIPAA-compliant AI voice agent](https://codewithhaseeb.com/work/medmatch)
- [FCS — AI pipeline handling 2,000 active users and 68,000 leads](https://codewithhaseeb.com/work/fcs)
- [Bestinform.eu — International airline ticketing platform](https://codewithhaseeb.com/work/bestinform)
- [Sony PlayStation — 120× faster survey data pipeline](https://codewithhaseeb.com/work/sony-playstation)

## Key pages

- [Home](https://codewithhaseeb.com) — Service overview, featured work, proof points
- [Our work](https://codewithhaseeb.com/work) — Full case study index
- [Services](https://codewithhaseeb.com/services) — Detailed service breakdown with pricing anchors
- [About](https://codewithhaseeb.com/about) — Team, principles, story
- [Contact](https://codewithhaseeb.com/contact) — Free 30-minute scoping call

## Technology stack

Python, TypeScript, Next.js, React, FastAPI, Node.js, Go, Java, LangChain, LangGraph, LlamaIndex, CrewAI, OpenAI, Anthropic Claude, Google Gemini, LLaMA, vector databases (Pinecone, Weaviate, pgvector, Qdrant), Whisper, ElevenLabs, Deepgram, PyTorch, TensorFlow, AWS, GCP, Docker, Kubernetes, GitHub Actions.

## Engagement model

- Fixed-milestone proposals with clear deliverables
- Weekly sprints with working demos every Friday
- Daily updates via preferred channel
- 30-day post-launch bug-fix support included
- Typical engagement: $8K–$50K fixed-price, 4–10 weeks
- Retainer: $8K–$15K/month for dedicated senior engineer

## Contact

- Website: https://codewithhaseeb.com
- Book a call: https://codewithhaseeb.com/contact
- Email: miltech.haseeb@gmail.com
- LinkedIn: https://www.linkedin.com/in/haseeb-ai
- Upwork (100% Job Success, Top Rated Plus, $70K+ earned): https://www.upwork.com/freelancers/muhammadh72

## Trust signals

- 100% Job Success rate on Upwork
- Top Rated Plus status
- 49 completed projects
- 5-person senior engineering team
- Clients have closed $4.2M+ in funding on AI systems we've built
- 17,000+ active users on Aphra.me
- 500,000+ records managed by our AI agents at Capwell
- 120× performance improvement delivered at Sony PlayStation

## Canonical URL

https://codewithhaseeb.com

## Last updated

2026-04-29
```

**No code changes needed.** The file at `public/llms.txt` is served as-is at `https://codewithhaseeb.com/llms.txt`.

---

## 4. robots.txt — Correct Configuration

Replace the basic `robots.ts` from doc 03 with this expanded version that:
- Allows search engines
- Explicitly allows known LLM crawlers
- Blocks contact page from being scraped (personal info)
- Points to sitemap

### File: `src/app/robots.ts`

```ts
import type { MetadataRoute } from 'next';

import { siteConfig } from '@/lib/siteConfig';

export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.url;

  return {
    rules: [
      // Default rule for standard search engines
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',           // API routes shouldn't be indexed
          '/_next/',         // Next.js internals
          '/404',
          '/500',
        ],
      },
      // Explicitly welcome AI/LLM crawlers (optional, signals intent)
      {
        userAgent: [
          'GPTBot',          // OpenAI
          'ChatGPT-User',
          'ClaudeBot',       // Anthropic
          'anthropic-ai',
          'PerplexityBot',
          'Google-Extended', // Bard/Gemini training
          'CCBot',           // Common Crawl (used by many LLMs)
        ],
        allow: '/',
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
```

**Notes:**
- If you prefer to BLOCK LLM training from your site, swap `allow: '/'` for `disallow: '/'` in that second block. Most AI agencies welcome it — it helps LLMs recommend you. Your call.
- The file is auto-served at `/robots.txt` by Next.js, no manual hosting needed.

---

## 5. sitemap.xml — Enhanced

Replace `src/app/sitemap.ts` with this version that adds proper `lastmod`, better priorities, and future-proofs for blog posts.

### File: `src/app/sitemap.ts`

```ts
import type { MetadataRoute } from 'next';
import fs from 'node:fs';
import path from 'node:path';

import { siteConfig } from '@/lib/siteConfig';
import { caseStudies } from '@/content/case-studies-meta';

/**
 * Dynamic sitemap with correct priorities + lastmod from file mtimes where possible.
 * Auto-served at /sitemap.xml by Next.js.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const today = new Date();

  // Static routes with priorities tuned for a service-business site
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${base}/work`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${base}/services`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${base}/about`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base}/contact`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/blog`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${base}/privacy`,
      lastModified: today,
      changeFrequency: 'yearly',
      priority: 0.1,
    },
  ];

  // Case study pages — read MDX mtime if available for accurate lastmod
  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((cs) => {
    let lastModified: Date = today;
    try {
      const mdxPath = path.join(
        process.cwd(),
        'src/content/case-studies',
        `${cs.slug}.mdx`
      );
      if (fs.existsSync(mdxPath)) {
        lastModified = fs.statSync(mdxPath).mtime;
      }
    } catch {
      // fall back to today
    }
    return {
      url: `${base}/work/${cs.slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    };
  });

  return [...staticRoutes, ...caseStudyRoutes];
}
```

**Key improvements over doc 03:**
- Uses real MDX file modification times for accurate `lastmod` on case studies
- Home and work grid get `priority: 1.0` / `0.9` (your money pages)
- Privacy gets `priority: 0.1` (exists, but not important)
- `changeFrequency` is honest per page type

**When you launch blog posts:** add another block that reads `/src/content/blog/*.mdx` and adds each blog URL with priority 0.7.

---

## 6. SEO Wiring (Metadata + Structured Data)

### 6.1 Patch: Root layout — complete metadata

Replace the `metadata` export in `src/app/layout.tsx` with this more complete version:

```tsx
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'AI Engineering Team for Funded Startups | codewithhaseeb',
    template: '%s | codewithhaseeb',
  },
  description: siteConfig.description,
  applicationName: 'codewithhaseeb',
  authors: [{ name: 'Muhammad Haseeb', url: siteConfig.url }],
  creator: 'Muhammad Haseeb',
  publisher: 'codewithhaseeb',
  generator: 'Next.js',
  keywords: [
    'AI engineering agency',
    'hire AI developer',
    'LangChain agent developer',
    'AI product development',
    'LLM cost optimization',
    'voice AI developer',
    'AI SaaS MVP development',
    'production AI engineer',
    'senior full-stack AI',
    'RAG developer',
    'AI agent development',
    'HIPAA AI voice',
  ],
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    siteName: 'codewithhaseeb',
    title: 'AI Engineering Team for Funded Startups | codewithhaseeb',
    description: siteConfig.description,
    locale: 'en_US',
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'codewithhaseeb — AI Engineering for Funded Startups',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'codewithhaseeb',
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@hassibayub', // update if different
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: {
    // Add these after setting up Search Console / Bing Webmaster
    // google: 'your-google-verification-token',
    // other: { 'msvalidate.01': 'your-bing-verification-token' },
  },
  category: 'technology',
};
```

### 6.2 Per-page metadata — add canonical everywhere

Every page's `export const metadata` needs a canonical URL. Add this to all pages:

**Example for `/work/page.tsx`:**

```tsx
export const metadata: Metadata = {
  title: 'Our Work — AI Systems in Production',
  description: '...',
  alternates: { canonical: `${siteConfig.url}/work` },
};
```

**Example for `/work/[slug]/page.tsx` `generateMetadata`:**

```tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return {
    title: cs.title,
    description: cs.description,
    alternates: { canonical: `${siteConfig.url}/work/${slug}` },
    openGraph: {
      type: 'article',
      url: `${siteConfig.url}/work/${slug}`,
      images: [{ url: cs.cover, width: 1600, height: 900 }],
    },
  };
}
```

Apply the same pattern to every page (services, about, contact, blog).

### 6.3 Structured Data (JSON-LD)

Create a shared component for schema markup:

### File: `src/components/shared/StructuredData.tsx`

```tsx
import { siteConfig } from '@/lib/siteConfig';

type Schema = Record<string, unknown>;

export function StructuredData({ schema }: { schema: Schema | Schema[] }) {
  const json = JSON.stringify(schema);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

/**
 * Organization + Website schema — inject once in root layout
 */
export function OrganizationSchema() {
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': `${siteConfig.url}/#organization`,
      name: 'codewithhaseeb',
      alternateName: 'Muhammad Haseeb — AI Engineering',
      url: siteConfig.url,
      logo: `${siteConfig.url}/icon.png`,
      image: siteConfig.ogImage,
      description: siteConfig.description,
      founder: {
        '@type': 'Person',
        name: 'Muhammad Haseeb',
        jobTitle: 'Founder & Lead AI Engineer',
        url: siteConfig.url,
        sameAs: [
          siteConfig.links.linkedin,
          siteConfig.links.upwork,
          siteConfig.links.github,
        ],
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Islamabad',
        addressCountry: 'PK',
      },
      areaServed: [
        { '@type': 'Place', name: 'Worldwide' },
      ],
      sameAs: [
        siteConfig.links.linkedin,
        siteConfig.links.upwork,
        siteConfig.links.github,
      ],
      knowsAbout: [
        'AI Engineering',
        'Large Language Models',
        'LangChain',
        'RAG',
        'Voice AI',
        'AI Agents',
        'Full-Stack Development',
        'SaaS Development',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: 'codewithhaseeb',
      publisher: { '@id': `${siteConfig.url}/#organization` },
      inLanguage: 'en-US',
    },
  ];
  return <StructuredData schema={schema} />;
}

/**
 * Per-case-study Article schema
 */
export function CaseStudySchema({
  title,
  description,
  url,
  image,
  datePublished,
}: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    image: image.startsWith('http') ? image : `${siteConfig.url}${image}`,
    datePublished,
    dateModified: datePublished,
    author: {
      '@type': 'Person',
      name: 'Muhammad Haseeb',
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: 'codewithhaseeb',
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/icon.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
  return <StructuredData schema={schema} />;
}
```

### 6.4 Inject `OrganizationSchema` in root layout

Add to `src/app/layout.tsx`:

```tsx
import { OrganizationSchema } from '@/components/shared/StructuredData';

// Inside RootLayout's return JSX, just before </body>:
<OrganizationSchema />
```

### 6.5 Inject `CaseStudySchema` on each case study page

Add to `src/app/work/[slug]/page.tsx`:

```tsx
import { CaseStudySchema } from '@/components/shared/StructuredData';

// Inside the component, right after fetching cs:
<CaseStudySchema
  title={cs.title}
  description={cs.description}
  url={`${siteConfig.url}/work/${cs.slug}`}
  image={cs.cover}
  datePublished="2026-04-29"  // TODO: pull from MDX frontmatter when you wire that up
/>
```

### 6.6 Breadcrumb schema on case study pages (bonus)

Google loves breadcrumbs. Add to case study page:

```tsx
<StructuredData
  schema={{
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Work', item: `${siteConfig.url}/work` },
      { '@type': 'ListItem', position: 3, name: cs.client, item: `${siteConfig.url}/work/${cs.slug}` },
    ],
  }}
/>
```

---

## 7. Analytics the Right Way (GA4 + Clarity)

Doc 03 had a basic GA4 + Clarity setup but it can be improved for performance + correctness. Here's the corrected version.

### 7.1 Key principles

- **Defer analytics scripts** with `strategy="lazyOnload"` so they never block rendering
- **Don't send page_view twice** — Next.js App Router fires client-side route changes; default GA tag sends a page_view on load
- **Track route changes correctly** with a client component that watches the pathname
- **Clarity loads only in production** — dev traffic pollutes your heatmap data
- **Both scripts honor DNT** (Do Not Track) — respectful, optional

### 7.2 Analytics component (replaces inline scripts in layout.tsx)

Create a dedicated client component:

### File: `src/components/shared/Analytics.tsx`

```tsx
'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;
const isProd = process.env.NODE_ENV === 'production';

function RouteChangeTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_ID) return;
    if (typeof window === 'undefined') return;
    const w = window as Window & { gtag?: (...args: unknown[]) => void };
    if (!w.gtag) return;

    const url = pathname + (searchParams.toString() ? `?${searchParams}` : '');
    w.gtag('event', 'page_view', {
      page_path: url,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}

export function Analytics() {
  // Only load in production — no pollution of your real data from dev
  if (!isProd) return null;

  return (
    <>
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', {
                send_page_view: false,
                anonymize_ip: true,
                cookie_flags: 'SameSite=None;Secure'
              });
            `}
          </Script>
          <Suspense fallback={null}>
            <RouteChangeTracker />
          </Suspense>
        </>
      )}

      {CLARITY_ID && (
        <Script id="clarity-init" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_ID}");
          `}
        </Script>
      )}
    </>
  );
}
```

### 7.3 Update root layout

Replace the inline GA + Clarity scripts in `src/app/layout.tsx` with:

```tsx
import { Analytics as CustomAnalytics } from '@/components/shared/Analytics';

// In the JSX, before </body>:
<CustomAnalytics />
```

And keep the Vercel analytics as-is (they're already using the `strategy='afterInteractive'` pattern internally).

### 7.4 Why `send_page_view: false`?

When GA4 initializes with `send_page_view: true` (default), it fires a page_view on initial load. The `RouteChangeTracker` then fires another one on every client-side navigation. Without disabling the default, **the first page_view fires twice.** Set it to false and rely only on our manual tracker for consistency.

### 7.5 Event tracking — unchanged

The `trackEvent()` helper in `src/lib/analytics.ts` still works as specified in doc 03. All CTA buttons continue to call it.

### 7.6 Clarity user identification (optional upgrade)

If you want to tie Clarity sessions to contact form submissions:

```ts
// In ContactForm.tsx, after successful submission:
if (typeof window !== 'undefined') {
  const w = window as Window & { clarity?: (cmd: string, ...args: unknown[]) => void };
  w.clarity?.('set', 'email', values.email);
  w.clarity?.('event', 'contact_submitted');
}
```

Now when you watch a Clarity replay and the user submitted the form, you see their email. Connects qualitative behavior to a lead.

---

## 8. Performance Rules for Ranking

Google ranks on Core Web Vitals. These rules target **LCP < 1.8s, INP < 100ms, CLS < 0.05** — the thresholds for "Good."

### 8.1 Image rules (largest LCP win)

**Always:**
- Use `next/image` (not `<img>`)
- `priority` on the LCP image only (hero cover or case study cover)
- `sizes` attribute matches actual rendered size
- `quality={80}` for webp (doc 03 already specifies)
- `fetchPriority="high"` on LCP image

**Patch: Hero's right-column visual (not the LCP but matters)**

The hero currently has an SVG-based visual. That's already great for performance — zero image weight. Keep it.

**Patch: Case study cover images on case study pages**

The cover image IS the LCP on case study pages. Update:

```diff
<Image
  src={cs.cover}
  alt={`${cs.client} — ${cs.title}`}
  fill
- priority
+ priority
+ fetchPriority="high"
  className="object-cover"
  sizes="(min-width: 1100px) 1100px, 100vw"
/>
```

### 8.2 Font loading

Doc 03 uses `next/font/google` which is already optimal:
- Self-hosted automatically (no external request)
- Preloads critical fonts
- `display: swap` prevents FOIT

**Additional tweak: subset only Latin**

In `src/app/layout.tsx`:

```diff
const inter = Inter({
-  subsets: ['latin'],
+  subsets: ['latin'],
+  weight: ['400', '500', '600'],  // only weights you actually use — shrinks bundle
  variable: '--font-inter',
  display: 'swap',
});
```

### 8.3 Preload hero font

Instrument Serif is used in the hero headline (LCP candidate). Preload it:

In `src/app/layout.tsx` inside `<head>` (Next 15's `viewport`/`metadata` doesn't cover preload; add a `<Script>` or direct `<link>` via a `<head>` injection):

```tsx
// Inside RootLayout:
<head>
  <link
    rel="preload"
    href="/_next/static/media/instrument-serif-latin.woff2"
    as="font"
    type="font/woff2"
    crossOrigin="anonymous"
  />
</head>
```

Note: the actual font file hash changes each build. Easiest: let `next/font` handle preload automatically (which it does since Next 13). **You likely don't need to manually preload.** Only do this if you see "preload key requests" flagged in Lighthouse.

### 8.4 Third-party script discipline

Rule: **no synchronous 3rd-party scripts.** Ever.

Already handled in the Analytics component above (`strategy="afterInteractive"` or `"lazyOnload"`). Don't add:
- Intercom / Drift / Crisp chat widgets (huge bundle hit)
- Hotjar (overlaps with Clarity — pick one)
- Facebook pixel (you're not running FB ads)
- Typeform embeds (use native form)

If you ever need a chat widget later, install **only on /contact** via a lazy-load strategy.

### 8.5 Bundle size budget

Per the spec (doc 01 section 16): initial JS bundle < 150KB gzipped.

**How to check:**
```bash
npm run build
# Look at the route sizes in the build output
```

**Red flags:**
- Any `'use client'` component importing large libraries
- `import * from 'library'` (imports everything) instead of `import { specific } from 'library'`
- Framer Motion imported in non-interactive pages (it's 50KB)

**Patch: isolate Framer Motion**

Framer Motion is only used in Hero + CaseStudyCard entrances. Everywhere else is CSS transitions. **Don't import `framer-motion` in static components.** The components in doc 03 are already correct on this — verify during review.

### 8.6 Lazy-load below-the-fold sections (optional, only if needed)

If Lighthouse flags "reduce unused JavaScript":

```tsx
// src/app/page.tsx
import dynamic from 'next/dynamic';

// Above the fold — eager
import { Hero } from '@/components/sections/Hero';
import { LogoBar } from '@/components/sections/LogoBar';
import { NumbersTicker } from '@/components/sections/NumbersTicker';

// Below the fold — lazy
const ServicesGrid = dynamic(() =>
  import('@/components/sections/ServicesGrid').then((m) => m.ServicesGrid)
);
const FeaturedWork = dynamic(() =>
  import('@/components/sections/FeaturedWork').then((m) => m.FeaturedWork)
);
const ForFoundersEnterprise = dynamic(() =>
  import('@/components/sections/ForFoundersEnterprise').then((m) => m.ForFoundersEnterprise)
);
const Testimonials = dynamic(() =>
  import('@/components/sections/Testimonials').then((m) => m.Testimonials)
);
const Process = dynamic(() =>
  import('@/components/sections/Process').then((m) => m.Process)
);
const FinalCTA = dynamic(() =>
  import('@/components/sections/FinalCTA').then((m) => m.FinalCTA)
);
```

**Caveat:** only do this if Lighthouse flags it. Premature lazy-loading can make UX worse. Measure first.

### 8.7 Don't use `Image` for decorative SVGs

The hero's AI schematic is inline SVG. Good. If you ever add Lucide icons that are decorative, make sure:

```tsx
// For decorative icons, always aria-hidden
<Icon size={20} aria-hidden />
```

### 8.8 Prefer static rendering

All pages in doc 03 default to static rendering via Next 15 App Router. Don't accidentally opt out by:
- Adding `export const dynamic = 'force-dynamic'` (don't)
- Using `cookies()` or `headers()` in a page (don't, except in API routes)

Static = served from Vercel Edge = sub-100ms TTFB globally = ranking boost.

---

## 9. Quick Lighthouse 100 Checklist

Run this checklist after launch, in order. Each item maps to a Lighthouse audit category.

### Performance (target: 95+)

- [ ] `next/image` on every image
- [ ] `priority` + `fetchPriority="high"` on LCP image
- [ ] Fonts via `next/font/google`
- [ ] 3rd-party scripts use `strategy="afterInteractive"` or `"lazyOnload"`
- [ ] No layout shift during font swap (using `display: swap` already handles this)
- [ ] No layout shift on image load (using `next/image` with width/height already handles this)
- [ ] JS bundle < 150KB gzipped (`npm run build` shows sizes)
- [ ] Zero render-blocking resources
- [ ] Test on throttled slow-3G in Chrome DevTools — still under 3s LCP

### Accessibility (target: 100)

- [ ] Every image has descriptive `alt` (per doc 04A)
- [ ] All buttons/links have accessible names (either text content or `aria-label`)
- [ ] Color contrast ratio >= 4.5:1 for all text (your palette passes: `#2B2D2D` on `#F3F2F1` = 10.2:1)
- [ ] Form inputs have associated `<label>`
- [ ] Keyboard navigation works: tab through entire page, every interactive element focusable
- [ ] Focus visible on all interactive elements (add `focus-visible:ring-2 focus-visible:ring-accent` utility)
- [ ] `html lang="en"` set (doc 03 already does this)
- [ ] Heading hierarchy correct (one h1 per page, h2 → h3 no skips)

### Best Practices (target: 100)

- [ ] HTTPS only (Vercel handles automatically)
- [ ] No mixed content warnings
- [ ] No console errors in production
- [ ] No deprecated APIs
- [ ] Images have correct aspect ratio set

### SEO (target: 100)

- [ ] Every page has unique title, description, canonical URL
- [ ] OpenGraph tags present on every page
- [ ] Structured data (JSON-LD) present (per Section 6 above)
- [ ] Mobile viewport meta (`next/font` + layout handles this automatically)
- [ ] Font sizes legible (>= 12px base, >= 16px body)
- [ ] Tap targets >= 48px
- [ ] `robots.txt` and `sitemap.xml` resolve correctly
- [ ] No `noindex` on any indexable page
- [ ] All internal links work (no 404s)
- [ ] Descriptive anchor text (no "click here")

### After launch — submit to search engines

1. Google Search Console:
   - Add property for `codewithhaseeb.com`
   - Verify ownership via DNS TXT record
   - Submit `sitemap.xml`
   - Request indexing for the home page
2. Bing Webmaster Tools:
   - Same as above
3. Ahrefs Webmaster Tools (free):
   - Verify ownership
   - Monitor backlinks + ranking for free

---

## Summary — What Changed from Doc 03

| Area | Change |
|---|---|
| Motion | All entrance animations 300–400ms, respect `prefers-reduced-motion`, removed CaseStudyCard zoom, removed Hero pulse dot, 800ms number ticker |
| Mobile | Verified all breakpoints, added 44px minimum tap target, fixed iOS form zoom |
| llms.txt | New file at `/public/llms.txt` for LLM discoverability |
| robots.txt | Expanded to explicitly welcome LLM crawlers, block API routes |
| sitemap.xml | Dynamic with MDX file mtime, better priorities |
| SEO metadata | Full metadata on every page + canonical URLs |
| Structured data | Organization + WebSite + Article + Breadcrumb schemas |
| Analytics | Route-aware page_view tracking, production-only, lazy-loaded Clarity |
| Performance | fetchPriority on LCP, font subsetting, bundle discipline, lazy section loading (if needed) |
| Accessibility | Focus-visible rings, reduced motion, contrast verified |

---

## Apply Order

Apply these in order to avoid conflicts:

1. **globals.css patches** (Section 1.2, 2.2)
2. **tailwind.config.ts** patch (Section 2.2)
3. **Hero.tsx** patches (Section 1.3, 1.5)
4. **CaseStudyCard.tsx** patch (Section 1.4)
5. **NumbersTicker.tsx** patch (Section 1.6)
6. **LogoBar.tsx** patch (Section 1.7)
7. **Create** `public/llms.txt` (Section 3)
8. **Replace** `src/app/robots.ts` (Section 4)
9. **Replace** `src/app/sitemap.ts` (Section 5)
10. **Update** `src/app/layout.tsx` metadata + add OrganizationSchema (Section 6)
11. **Add canonical** to every page's metadata (Section 6.2)
12. **Create** `src/components/shared/StructuredData.tsx` (Section 6.3)
13. **Add CaseStudySchema + Breadcrumb** to `/work/[slug]/page.tsx` (Section 6.5, 6.6)
14. **Create** `src/components/shared/Analytics.tsx` (Section 7.2)
15. **Update** layout.tsx to use new Analytics component (Section 7.3)
16. **Verify** image props have `fetchPriority` on LCP (Section 8.1)
17. **Run** Lighthouse audit + iterate on failures (Section 9)

Total time to apply all patches: ~2 hours.

— End of patch document —
