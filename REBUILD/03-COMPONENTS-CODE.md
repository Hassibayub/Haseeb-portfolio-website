# 03 — Components Code (Ready-to-Paste TSX)

> Production-ready Next.js 15 + Tailwind 4 + shadcn/ui code for every core component of codewithhaseeb.com. Paste these files into the project structure from `01-BUILD-SPEC.md`, update data where flagged with `// TODO:`, and ship.
>
> **Prerequisites:** You have run the setup commands from section 3.2 of `01-BUILD-SPEC.md` (project scaffolded, shadcn + MagicUI installed).
> **Convention:** I use `@/components/...` path aliases throughout (matches the scaffolded config).
> **Tailwind:** Assumes Tailwind 4 with shadcn's default theme extended per section 2 of the spec.

---

## TABLE OF CONTENTS

1. [Tailwind + Global CSS Configuration](#1-tailwind--global-css-configuration)
2. [Site Config + Content Data](#2-site-config--content-data)
3. [Root Layout](#3-root-layout)
4. [Shared Utilities](#4-shared-utilities)
5. [Navbar (Floating Pill)](#5-navbar-floating-pill)
6. [Footer](#6-footer)
7. [Container + Section Primitives](#7-container--section-primitives)
8. [Hero Section](#8-hero-section)
9. [Logo Bar (Marquee)](#9-logo-bar-marquee)
10. [Numbers Ticker](#10-numbers-ticker)
11. [Services Grid](#11-services-grid)
12. [Featured Work](#12-featured-work)
13. [For Founders / Enterprise Split](#13-for-founders--enterprise-split)
14. [Testimonials](#14-testimonials)
15. [Process Section](#15-process-section)
16. [Final CTA Section](#16-final-cta-section)
17. [Home Page (assembling it all)](#17-home-page-assembling-it-all)
18. [Case Study Card](#18-case-study-card)
19. [Work Grid Page](#19-work-grid-page)
20. [Case Study Template](#20-case-study-template)
21. [Contact Form + API Route](#21-contact-form--api-route)
22. [Analytics Helper](#22-analytics-helper)
23. [Sitemap + Robots](#23-sitemap--robots)

---

## 1. Tailwind + Global CSS Configuration

### `tailwind.config.ts`

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/**/*.{ts,tsx,md,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        md: '2rem',
        lg: '3rem',
      },
      screens: {
        '2xl': '1280px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-instrument-serif)', 'Playfair Display', 'serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      colors: {
        background: {
          DEFAULT: '#F3F2F1',
          subtle: '#F7F7F7',
          card: '#FFFFFF',
        },
        foreground: {
          DEFAULT: '#2B2D2D',
          muted: '#666666',
          subtle: '#8C8C8C',
        },
        border: {
          DEFAULT: '#E6E6E6',
          subtle: '#F2F2F2',
        },
        accent: {
          DEFAULT: '#7C3AED',
          foreground: '#FFFFFF',
          subtle: '#F3EEFF',
          dark: '#6D28D9',
        },
        dark: {
          background: '#1A1A1B',
          subtle: '#242527',
          card: '#2B2D2D',
          foreground: '#FFFFFF',
          muted: '#B8B8B8',
          border: '#333333',
        },
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgb(0 0 0 / 0.03)',
        sm: '0 2px 4px -1px rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.04)',
        md: '0 4px 8px -2px rgb(0 0 0 / 0.06), 0 2px 4px -2px rgb(0 0 0 / 0.04)',
        lg: '0 12px 24px -8px rgb(0 0 0 / 0.08), 0 4px 8px -4px rgb(0 0 0 / 0.04)',
      },
      fontSize: {
        'display-xl': ['clamp(52px, 6vw, 84px)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(42px, 5vw, 64px)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(34px, 4vw, 48px)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(28px, 3vw, 36px)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      animation: {
        marquee: 'marquee var(--duration, 40s) linear infinite',
        'marquee-vertical': 'marquee-vertical var(--duration, 40s) linear infinite',
        'fade-in-up': 'fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap)))' },
        },
        'marquee-vertical': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(calc(-100% - var(--gap)))' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
```

### `src/app/globals.css`

```css
@import "tailwindcss";

@layer base {
  :root {
    color-scheme: light;
    --radius: 1rem;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-background text-foreground font-sans antialiased;
    font-feature-settings: 'ss01', 'cv01', 'cv02', 'cv03';
  }

  h1, h2, h3, h4 {
    @apply font-display font-normal tracking-tight;
  }

  ::selection {
    @apply bg-accent text-accent-foreground;
  }

  /* Smooth font rendering for serif display */
  .font-display {
    font-feature-settings: 'liga', 'kern';
  }
}

@layer utilities {
  .container-tight {
    @apply mx-auto w-full max-w-[1280px] px-6 md:px-8 lg:px-12;
  }
  .section-padding {
    @apply py-16 md:py-24;
  }
}
```

---

## 2. Site Config + Content Data

Single source of truth for all non-MDX content on the site.

### `src/lib/siteConfig.ts`

```ts
export const siteConfig = {
  name: 'codewithhaseeb',
  url: 'https://codewithhaseeb.com',
  description:
    "We ship production AI — not demos. A 5-person senior engineering team building for funded startups and SMBs.",

  ogImage: '/og/home.png',

  links: {
    linkedin: 'https://www.linkedin.com/in/haseeb-ai',
    upwork: 'https://www.upwork.com/freelancers/muhammadh72',
    github: 'https://github.com/hassibayub',
    email: 'miltech.haseeb@gmail.com',
    whatsapp: 'https://wa.me/923143543422',
    calendly:
      process.env.NEXT_PUBLIC_CALENDLY_URL ||
      'https://calendly.com/miltech-haseeb/30min',
  },

  contact: {
    email: 'miltech.haseeb@gmail.com',
    phone: '+92 314 3543 422',
    location: 'Islamabad, Pakistan (UTC+5)',
  },

  // Primary navigation
  nav: [
    { label: 'Work', href: '/work' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],

  // Logo bar: styled text when no SVG logo is available
  clientLogos: [
    'Sony PlayStation',
    'Aphra.me',
    'Tula Transformation',
    'Capwell Comm',
    'KCNL.eu',
    'Bestinform.eu',
    'Medmatch',
    'FCS',
    'RGR Learning',
    'eXelerete',
  ],

  // Homepage stats
  stats: [
    { value: 17000, suffix: '+', label: 'Active users on Aphra.me', highlight: '17,000+' },
    { value: 4.2, prefix: '$', suffix: 'M+', label: 'Raised by clients on our AI builds', highlight: '$4.2M+' },
    { value: 120, suffix: '×', label: 'Faster data at Sony PlayStation', highlight: '120×' },
    { value: 500000, suffix: '+', label: 'Records managed at Capwell', highlight: '500K+' },
  ],

  testimonials: [
    {
      quote: 'Truly a genius! Would definitely work again.',
      attribution: 'Voice AI healthcare client',
      meta: 'Jan 2026 · Real-time voice agent',
    },
    {
      quote:
        'Muhammad is an absolute expert in his field. Humble and thoughtful — an absolute pleasure to work with and his suggestions are spot-on!',
      attribution: 'AI Project Assistance client',
      meta: 'Jul 2024 · AI advisory',
    },
    {
      quote:
        "He did an excellent job on our WhatsApp Flow project and delivered results even better than what we originally had in mind.",
      attribution: 'FGC Perfume Kuwait',
      meta: 'Feb 2026 · WhatsApp Business AI',
    },
  ],

  // Services used on homepage
  services: [
    {
      slug: 'ai-saas-mvp',
      icon: 'Rocket',
      title: 'AI SaaS MVPs',
      description:
        "From Figma to live product in 6–10 weeks. We've shipped MVPs now serving 17,000+ users. Full-stack: backend, frontend, AI, deployment.",
    },
    {
      slug: 'ai-agents',
      icon: 'Bot',
      title: 'AI Agents & Multi-Agent Systems',
      description:
        'LangChain, LangGraph, CrewAI. Autonomous agents that run for hours. Our Capwell agent cut a 6-month manual job to 3 weeks.',
    },
    {
      slug: 'voice-ai',
      icon: 'Mic',
      title: 'Voice AI & Conversational Agents',
      description:
        'HIPAA-compliant, sub-second latency, sounds human enough to close calls. Real-time STT/TTS pipelines in production.',
    },
    {
      slug: 'llm-cost-optimization',
      icon: 'TrendingDown',
      title: 'LLM Cost Optimization',
      description:
        "Replaced a client's $100K/month LLM bill with a hybrid open-source stack running at $1.5K/month. GDPR compliant, full audit trail.",
    },
    {
      slug: 'ai-automation',
      icon: 'Workflow',
      title: 'AI Workflow Automation',
      description:
        'GoHighLevel, HubSpot, WhatsApp Business, CRM integrations. FCS runs an autonomous AI pipeline for 2,000+ users and 68,000 leads.',
    },
    {
      slug: 'senior-fullstack',
      icon: 'Code2',
      title: 'Senior Full-Stack Engineering',
      description:
        'NextJS, Python, Node, Go. When you need a senior team that can also ship the web app, not just the AI part. Sony PlayStation scale.',
    },
  ],

  // Featured case studies for home page (3 shown)
  featuredCaseStudies: ['aphra', 'capwell', 'kcnl'],

  // Process steps
  process: [
    {
      number: '01',
      title: 'FREE SCOPING CALL',
      body:
        '30 minutes. We push back if we think the scope is wrong. That\'s a feature, not a bug.',
    },
    {
      number: '02',
      title: 'FIXED-MILESTONE PROPOSAL',
      body:
        'Clear deliverables, realistic timelines, honest cost. Nothing ambiguous in writing.',
    },
    {
      number: '03',
      title: 'WEEKLY SPRINTS',
      body:
        "Working demo every Friday. You approve before we move on. You're never surprised.",
    },
    {
      number: '04',
      title: 'DAILY UPDATES',
      body:
        "Slack, Loom, or email — your call. We don't ghost. You always know what's being built.",
    },
    {
      number: '05',
      title: '30-DAY SUPPORT',
      body:
        'Post-launch bug-fix window included on every project. No extra invoice.',
    },
  ],
};

export type SiteConfig = typeof siteConfig;
```

### `src/content/case-studies-meta.ts`

Minimal summary of each case study for the card components. Full content lives in MDX (per document 02).

```ts
export type CaseStudySummary = {
  slug: string;
  client: string;
  clientLabel: string;
  title: string;
  description: string;
  stats: string[];
  cover: string;
  order: number;
};

export const caseStudies: CaseStudySummary[] = [
  {
    slug: 'aphra',
    client: 'Aphra.me',
    clientLabel: 'APHRA.ME',
    title: 'Real-time AI video avatar serving 17,000+ users',
    description:
      'Built the entire AI backend, agents, and live voice pipeline.',
    stats: ['17K+ users', '<1s latency', 'NextJS + Python'],
    cover: '/images/work/aphra-cover.webp',
    order: 1,
  },
  {
    slug: 'capwell',
    client: 'Capwell Communications',
    clientLabel: 'CAPWELL COMMUNICATIONS',
    title: 'Autonomous multi-agent system managing 500,000 records',
    description:
      'Replaced a 6-month manual process with an AI agent orchestrator.',
    stats: ['500K records', '6mo → 3wks', 'LangChain'],
    cover: '/images/work/capwell-cover.webp',
    order: 2,
  },
  {
    slug: 'kcnl',
    client: 'KCNL.eu',
    clientLabel: 'KCNL.EU',
    title: 'B2B invoice AI that saved a client $98.5K/month on LLM bills',
    description:
      'Hybrid open-source + fine-tuned models. GDPR compliant, audit trail.',
    stats: ['10K companies', '$100K → $1.5K/mo', '100K invoices/mo'],
    cover: '/images/work/kcnl-cover.webp',
    order: 3,
  },
  {
    slug: 'tula',
    client: 'Tula Transformation',
    clientLabel: 'TULA TRANSFORMATION',
    title: 'The AI therapist platform that raised $1.2M',
    description:
      'YC Angel-backed. Full AI conversation engine + real-time voice.',
    stats: ['$1.2M raised', 'YC Angel', 'FastAPI + Gemini'],
    cover: '/images/work/tula-cover.webp',
    order: 4,
  },
  {
    slug: 'medmatch',
    client: 'Medmatch',
    clientLabel: 'MEDMATCH',
    title: 'HIPAA-compliant AI voice agent that sounds human',
    description:
      'Autonomous outbound calls with full audit trail and compliance.',
    stats: ['90% reduction', 'Sub-second', 'HIPAA'],
    cover: '/images/work/medmatch-cover.webp',
    order: 5,
  },
  {
    slug: 'fcs',
    client: 'Full Credit Sweep',
    clientLabel: 'FCS',
    title: 'AI pipeline handling 2,000 active users and 68,000 leads',
    description:
      'End-to-end AI tooling inside GoHighLevel: calls, messages, documents, dashboard.',
    stats: ['68K leads', '2K active users', 'GoHighLevel'],
    cover: '/images/work/fcs-cover.webp',
    order: 6,
  },
  {
    slug: 'bestinform',
    client: 'Bestinform.eu',
    clientLabel: 'BESTINFORM.EU',
    title: 'International airline ticketing platform',
    description:
      'Java + Angular with GDS integrations, payment gateways, full CI/CD.',
    stats: ['GDS integrations', 'Java + Angular', 'Full CI/CD'],
    cover: '/images/work/bestinform-cover.webp',
    order: 7,
  },
  {
    slug: 'sony-playstation',
    client: 'Sony PlayStation',
    clientLabel: 'SONY PLAYSTATION',
    title: '120× faster survey data pipeline at scale',
    description:
      'Rewrote performance-critical paths. Days became ~1 hour at 5M+ records.',
    stats: ['120× faster', '5M+ records', 'Python + Java'],
    cover: '/images/work/sony-cover.webp',
    order: 8,
  },
];

export const getCaseStudy = (slug: string): CaseStudySummary | undefined =>
  caseStudies.find((c) => c.slug === slug);

export const getFeaturedCaseStudies = (slugs: string[]): CaseStudySummary[] =>
  slugs
    .map((s) => caseStudies.find((c) => c.slug === s))
    .filter((c): c is CaseStudySummary => !!c);
```

---

## 3. Root Layout

### `src/app/layout.tsx`

```tsx
import type { Metadata } from 'next';
import { Inter, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';

import { siteConfig } from '@/lib/siteConfig';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'AI Engineering Team for Funded Startups | codewithhaseeb',
    template: '%s | codewithhaseeb',
  },
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    title: 'AI Engineering Team for Funded Startups | codewithhaseeb',
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'codewithhaseeb',
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />

        <Analytics />
        <SpeedInsights />

        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', { send_page_view: true });
              `}
            </Script>
          </>
        )}

        {clarityId && (
          <Script id="clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${clarityId}");
            `}
          </Script>
        )}
      </body>
    </html>
  );
}
```

---

## 4. Shared Utilities

### `src/lib/utils.ts`

```ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K`;
  return value.toString();
}
```

### `src/lib/analytics.ts`

```ts
type TrackParams = Record<string, string | number | boolean | undefined>;

type WindowWithAnalytics = Window & {
  gtag?: (event: 'event', name: string, params?: TrackParams) => void;
  clarity?: (cmd: 'event', name: string) => void;
};

export function trackEvent(name: string, params?: TrackParams) {
  if (typeof window === 'undefined') return;
  const w = window as WindowWithAnalytics;
  try {
    w.gtag?.('event', name, params);
    w.clarity?.('event', name);
  } catch (err) {
    // Fail silently in prod
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Analytics error:', err);
    }
  }
}
```

---

## 5. Navbar (Floating Pill)

### `src/components/layout/Navbar.tsx`

```tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

import { siteConfig } from '@/lib/siteConfig';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div
        className={cn(
          'fixed left-1/2 top-4 z-50 -translate-x-1/2 transition-all duration-300',
          scrolled && 'top-3'
        )}
      >
        {/* Desktop pill */}
        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-1 rounded-full bg-[#2B2D2D] pl-6 pr-2 py-2 text-white shadow-lg"
        >
          <Link
            href="/"
            className="text-sm font-medium tracking-tight mr-4 hover:opacity-80 transition"
          >
            codewithhaseeb
          </Link>
          <ul className="flex items-center gap-1">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="px-3 py-2 text-sm text-white/90 hover:text-white transition rounded-full"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={siteConfig.links.calendly}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent('book_call_click', { location: 'navbar' })
            }
            className="ml-2 rounded-full bg-accent hover:bg-accent-dark text-accent-foreground px-5 py-2 text-sm font-medium transition"
          >
            Book a Call →
          </Link>
        </nav>

        {/* Mobile pill trigger */}
        <nav
          aria-label="Primary mobile"
          className="flex md:hidden items-center justify-between rounded-full bg-[#2B2D2D] px-5 py-2.5 text-white shadow-lg min-w-[92vw]"
        >
          <Link
            href="/"
            className="text-sm font-medium tracking-tight"
            onClick={() => setMobileOpen(false)}
          >
            codewithhaseeb
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="p-2 -mr-2"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-background backdrop-blur-sm pt-24 px-6">
          <ul className="flex flex-col gap-6">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-2xl font-display tracking-tight"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-4">
              <Link
                href={siteConfig.links.calendly}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  setMobileOpen(false);
                  trackEvent('book_call_click', { location: 'mobile_nav' });
                }}
                className="inline-flex rounded-full bg-accent text-accent-foreground px-6 py-3 font-medium"
              >
                Book a Call →
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
```

---

## 6. Footer

### `src/components/layout/Footer.tsx`

```tsx
import Link from 'next/link';
import { siteConfig } from '@/lib/siteConfig';
import { caseStudies } from '@/content/case-studies-meta';

export function Footer() {
  const featured = caseStudies.slice(0, 4);

  return (
    <footer className="bg-[#1A1A1B] text-white">
      <div className="container-tight py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="text-base font-medium tracking-tight"
            >
              codewithhaseeb
            </Link>
            <p className="mt-4 text-sm text-white/70 max-w-xs leading-relaxed">
              Production AI for funded startups and SMB operations.
            </p>
            <p className="mt-4 text-sm text-white/50">
              Remote · UTC+5<br />
              {siteConfig.contact.location}
            </p>
          </div>

          {/* Site */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.08em] text-white/50 mb-4">
              Site
            </h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li><Link href="/" className="hover:text-white transition">Home</Link></li>
              <li><Link href="/work" className="hover:text-white transition">Work</Link></li>
              <li><Link href="/services" className="hover:text-white transition">Services</Link></li>
              <li><Link href="/about" className="hover:text-white transition">About</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
              <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
            </ul>
          </div>

          {/* Featured Work */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.08em] text-white/50 mb-4">
              Featured Work
            </h4>
            <ul className="space-y-3 text-sm text-white/80">
              {featured.map((cs) => (
                <li key={cs.slug}>
                  <Link href={`/work/${cs.slug}`} className="hover:text-white transition">
                    {cs.client}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/work" className="hover:text-white transition underline underline-offset-4">
                  All case studies →
                </Link>
              </li>
            </ul>
          </div>

          {/* Elsewhere */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.08em] text-white/50 mb-4">
              Elsewhere
            </h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li>
                <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={siteConfig.links.upwork} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  Upwork (100% JSS)
                </a>
              </li>
              <li>
                <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  GitHub
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.links.email}`} className="hover:text-white transition">
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-12 border-white/10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
          <p>© {new Date().getFullYear()} codewithhaseeb. All rights reserved.</p>
          <Link href="/privacy" className="hover:text-white/80 transition">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
```

---

## 7. Container + Section Primitives

### `src/components/layout/Section.tsx`

```tsx
import { cn } from '@/lib/utils';

type Background = 'default' | 'subtle' | 'card' | 'dark';

const bgMap: Record<Background, string> = {
  default: 'bg-background',
  subtle: 'bg-background-subtle',
  card: 'bg-background-card',
  dark: 'bg-[#1A1A1B] text-white',
};

type SectionProps = {
  children: React.ReactNode;
  background?: Background;
  className?: string;
  id?: string;
};

export function Section({
  children,
  background = 'default',
  className,
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'w-full section-padding',
        bgMap[background],
        className
      )}
    >
      <div className="container-tight">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  headline,
  subhead,
  className,
}: {
  eyebrow?: string;
  headline: React.ReactNode;
  subhead?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('mb-12 md:mb-16 max-w-3xl', className)}>
      {eyebrow && (
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-foreground-subtle mb-4">
          {eyebrow}
        </p>
      )}
      <h2 className="text-display-md font-display text-foreground">
        {headline}
      </h2>
      {subhead && (
        <p className="mt-5 text-lg text-foreground-muted leading-relaxed">
          {subhead}
        </p>
      )}
    </div>
  );
}
```

---

## 8. Hero Section

### `src/components/sections/Hero.tsx`

```tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

import { siteConfig } from '@/lib/siteConfig';
import { trackEvent } from '@/lib/analytics';

export function Hero() {
  return (
    <section className="relative bg-background pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="container-tight">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
          {/* Left: text */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs font-medium uppercase tracking-[0.12em] text-foreground-subtle mb-6"
            >
              AI Engineering · For Funded Startups
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-display-xl text-foreground"
            >
              AI that runs in production — not demos that break under load.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-6 text-lg text-foreground-muted max-w-[560px] leading-relaxed"
            >
              We build real AI systems for real users. A 5-person senior engineering team
              shipping production AI for funded startups and SMBs.
              <br className="hidden md:block" />
              <br className="hidden md:block" />
              <span className="block mt-3">
                17,000+ active users on Aphra. 500,000+ records managed at Capwell.
                YC-backed Tula, $1.2M raised.
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <Link
                href={siteConfig.links.calendly}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent('book_call_click', { location: 'hero_primary' })
                }
                className="inline-flex rounded-full bg-accent hover:bg-accent-dark text-accent-foreground px-7 py-3.5 font-medium transition"
              >
                Book a free 30-min call →
              </Link>
              <Link
                href="/work"
                className="inline-flex rounded-full border border-border bg-background-card hover:bg-background-subtle px-7 py-3.5 font-medium transition"
              >
                See our work
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 flex items-center gap-3 text-sm text-foreground-muted"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <span>Taking 1 new project this month · Reply within 24h</span>
            </motion.div>
          </div>

          {/* Right: AI schematic visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            <AIFlowVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/**
 * Static-ish AI schematic: three cards connected by animated lines.
 * Feel free to swap this for MagicUI's AnimatedBeam for motion.
 */
function AIFlowVisual() {
  return (
    <div className="relative aspect-square max-w-[500px] mx-auto">
      {/* Top card — Client input */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 rounded-xl bg-background-card border border-border shadow-md px-5 py-4 w-52">
        <p className="text-xs uppercase tracking-wider text-foreground-subtle mb-1.5">
          Input
        </p>
        <p className="text-sm font-medium">
          CRM · WhatsApp · Call
        </p>
      </div>

      {/* Middle card — Agent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-accent text-accent-foreground shadow-lg px-6 py-5 w-60">
        <p className="text-xs uppercase tracking-wider opacity-80 mb-1.5">
          Production AI
        </p>
        <p className="text-base font-medium">
          LangChain Agent
        </p>
        <p className="text-xs opacity-80 mt-2 leading-relaxed">
          Tools, memory, cost controls, audit trail.
        </p>
      </div>

      {/* Bottom card — Outcome */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-xl bg-background-card border border-border shadow-md px-5 py-4 w-52">
        <p className="text-xs uppercase tracking-wider text-foreground-subtle mb-1.5">
          Outcome
        </p>
        <p className="text-sm font-medium">
          Closed deal · Done task
        </p>
      </div>

      {/* Connecting lines (simple SVG) */}
      <svg
        aria-hidden
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 400"
        fill="none"
      >
        <path
          d="M 200 60 Q 200 150 200 190"
          stroke="#7C3AED"
          strokeWidth="1.5"
          strokeDasharray="4 6"
        />
        <path
          d="M 200 230 Q 200 290 200 340"
          stroke="#7C3AED"
          strokeWidth="1.5"
          strokeDasharray="4 6"
        />
      </svg>
    </div>
  );
}
```

---

## 9. Logo Bar (Marquee)

### `src/components/sections/LogoBar.tsx`

```tsx
import { siteConfig } from '@/lib/siteConfig';

export function LogoBar() {
  const logos = siteConfig.clientLogos;

  return (
    <section className="bg-background-subtle py-12 md:py-14 overflow-hidden border-y border-border-subtle">
      <div className="container-tight">
        <p className="text-center text-xs font-medium uppercase tracking-[0.12em] text-foreground-subtle mb-8">
          Trusted by teams at
        </p>
      </div>

      <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="flex shrink-0 animate-marquee items-center gap-16 pr-16" style={{ ['--duration' as string]: '50s', ['--gap' as string]: '4rem' }}>
          {logos.map((name) => (
            <LogoItem key={name} name={name} />
          ))}
        </div>
        {/* Duplicate for seamless loop */}
        <div className="flex shrink-0 animate-marquee items-center gap-16 pr-16" aria-hidden style={{ ['--duration' as string]: '50s', ['--gap' as string]: '4rem' }}>
          {logos.map((name) => (
            <LogoItem key={`dup-${name}`} name={name} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LogoItem({ name }: { name: string }) {
  return (
    <span className="text-xl md:text-[22px] font-medium text-foreground-muted/70 whitespace-nowrap">
      {name}
    </span>
  );
}
```

---

## 10. Numbers Ticker

### `src/components/sections/NumbersTicker.tsx`

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, motion } from 'framer-motion';

import { siteConfig } from '@/lib/siteConfig';

export function NumbersTicker() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container-tight">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-4">
          {siteConfig.stats.map((stat) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              label={stat.label}
              highlight={stat.highlight}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({
  value,
  prefix,
  suffix,
  label,
  highlight,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  highlight: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    const isFloat = !Number.isInteger(value);
    const fmt = (n: number) => {
      if (isFloat) return n.toFixed(1);
      if (n >= 1_000_000) return Math.round(n / 1_000_000).toString();
      if (n >= 1_000) return Math.round(n / 1_000).toString() + 'K';
      return Math.round(n).toString();
    };

    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(fmt(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setDisplay(fmt(value));
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="text-center md:text-left"
    >
      <p className="font-display text-display-md text-accent tabular-nums">
        {highlight.includes('M') || highlight.includes('K') || highlight.includes('×')
          ? highlight
          : `${prefix ?? ''}${display}${suffix ?? ''}`}
      </p>
      <p className="mt-2 text-sm text-foreground-muted max-w-[220px] mx-auto md:mx-0 leading-snug">
        {label}
      </p>
    </motion.div>
  );
}
```

> Note: The StatItem above uses a simple count-up. If you've installed MagicUI's `NumberTicker`, swap the inner animation for the library component — cleaner API. Left inline here so this file has zero external dependencies beyond Framer Motion.

---

## 11. Services Grid

### `src/components/sections/ServicesGrid.tsx`

```tsx
'use client';

import {
  Rocket,
  Bot,
  Mic,
  TrendingDown,
  Workflow,
  Code2,
  type LucideIcon,
} from 'lucide-react';

import { Section, SectionHeader } from '@/components/layout/Section';
import { siteConfig } from '@/lib/siteConfig';

const iconMap: Record<string, LucideIcon> = {
  Rocket,
  Bot,
  Mic,
  TrendingDown,
  Workflow,
  Code2,
};

export function ServicesGrid() {
  return (
    <Section background="subtle">
      <SectionHeader
        eyebrow="What we build"
        headline={<>Six things we do well — and the rest we politely decline.</>}
        subhead={
          <>
            We&apos;re specialists, not generalists. If it&apos;s not AI, automation, or senior
            engineering, we&apos;ll refer you to someone better suited.
          </>
        }
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {siteConfig.services.map((service) => {
          const Icon = iconMap[service.icon] ?? Rocket;
          return (
            <div
              key={service.slug}
              className="group relative overflow-hidden rounded-xl border border-border bg-background-card p-8 transition hover:border-accent/30 hover:shadow-md"
            >
              {/* Subtle purple glow on hover */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/[0.04] group-hover:to-accent/[0.08] transition" />

              <div className="flex items-center justify-center h-10 w-10 rounded-md bg-accent-subtle text-accent mb-5">
                <Icon size={20} strokeWidth={1.75} />
              </div>
              <h3 className="font-sans font-medium text-xl text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-foreground-muted leading-relaxed">
                {service.description}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
```

---

## 12. Featured Work

### `src/components/sections/FeaturedWork.tsx`

```tsx
import Link from 'next/link';

import { Section, SectionHeader } from '@/components/layout/Section';
import { CaseStudyCard } from '@/components/shared/CaseStudyCard';
import { siteConfig } from '@/lib/siteConfig';
import { getFeaturedCaseStudies } from '@/content/case-studies-meta';

export function FeaturedWork() {
  const featured = getFeaturedCaseStudies(siteConfig.featuredCaseStudies);

  return (
    <Section background="default">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-foreground-subtle mb-4">
            Featured work
          </p>
          <h2 className="font-display text-display-md text-foreground">
            Built for real users at real scale.
          </h2>
          <p className="mt-5 text-lg text-foreground-muted leading-relaxed">
            A few of the AI systems we&apos;ve shipped that are running in production today.
          </p>
        </div>

        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition"
        >
          View all case studies →
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featured.map((cs) => (
          <CaseStudyCard key={cs.slug} caseStudy={cs} />
        ))}
      </div>
    </Section>
  );
}
```

---

## 13. For Founders / Enterprise Split

### `src/components/sections/ForFoundersEnterprise.tsx`

```tsx
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Section } from '@/components/layout/Section';

export function ForFoundersEnterprise() {
  return (
    <Section background="subtle">
      <div className="max-w-3xl mb-12 md:mb-16">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-foreground-subtle mb-4">
          How we work with you
        </p>
        <h2 className="font-display text-display-md text-foreground">
          Different buyers, different paths.
          <br />
          Same bar for what ships.
        </h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card
          label="FOR FUNDED STARTUPS"
          title="Your MVP, in production, in 6 weeks."
          body={
            <>
              You&apos;ve raised your round. Your AI product idea is validated. You need a
              senior team that can ship real code fast — not a cheap freelancer who&apos;ll
              waste 3 months on a broken demo.
            </>
          }
          bullets={[
            'Week 1: Scoping, architecture, tech decisions',
            'Week 2–5: Sprints with a working demo every Friday',
            'Week 6: Launch-ready, deployed, monitored',
            '30 days of bug-fix support included',
          ]}
          price="Typical engagement: $15K–$50K fixed-price, 6–10 weeks"
          ctaLabel="See a founder case study →"
          ctaHref="/work/aphra"
        />
        <Card
          label="FOR SMB OPERATIONS"
          title="Replace weeks of manual work with AI that runs itself."
          body={
            <>
              You have a manual process eating your team&apos;s time. Invoice processing,
              lead follow-up, data aggregation. We build autonomous AI agents that
              handle it end-to-end — with audit trails, cost controls, and compliance
              built in from day one.
            </>
          }
          bullets={[
            'Audit your existing workflow in week 1',
            'Build the agent in weeks 2–4',
            'Shadow-mode rollout in week 5 (runs alongside a human to verify)',
            'Full cutover in week 6, ongoing support',
          ]}
          price="Typical engagement: $8K–$25K fixed-price, 4–6 weeks"
          ctaLabel="See an SMB case study →"
          ctaHref="/work/capwell"
        />
      </div>
    </Section>
  );
}

function Card({
  label,
  title,
  body,
  bullets,
  price,
  ctaLabel,
  ctaHref,
}: {
  label: string;
  title: string;
  body: React.ReactNode;
  bullets: string[];
  price: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <article className="rounded-xl bg-background-card border border-border p-8 md:p-10 flex flex-col">
      <p className="text-xs font-medium uppercase tracking-[0.12em] text-accent mb-4">
        {label}
      </p>
      <h3 className="font-display text-display-sm text-foreground mb-4">
        {title}
      </h3>
      <p className="text-base text-foreground-muted leading-relaxed mb-6">
        {body}
      </p>

      <ul className="space-y-2 mb-6 text-sm text-foreground-muted">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="text-accent mt-0.5">→</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <p className="text-sm text-foreground-subtle italic mb-8">{price}</p>

      <Link
        href={ctaHref}
        className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition"
      >
        {ctaLabel}
      </Link>
    </article>
  );
}
```

---

## 14. Testimonials

### `src/components/sections/Testimonials.tsx`

```tsx
import Link from 'next/link';

import { Section, SectionHeader } from '@/components/layout/Section';
import { siteConfig } from '@/lib/siteConfig';

export function Testimonials() {
  return (
    <Section background="default">
      <SectionHeader
        eyebrow="What clients say"
        headline={<>Words from people who actually paid us.</>}
      />

      <div className="grid md:grid-cols-3 gap-6">
        {siteConfig.testimonials.map((t, i) => (
          <article
            key={i}
            className="rounded-xl bg-background-card border border-border p-8"
          >
            <p className="text-lg leading-relaxed text-foreground italic">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="mt-6 pt-6 border-t border-border-subtle">
              <p className="text-sm font-medium text-foreground">
                {t.attribution}
              </p>
              <p className="text-xs text-foreground-subtle mt-1">
                {t.meta}
              </p>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-10 text-sm text-foreground-muted text-center">
        Based on a 100% Job Success rate across 49 completed projects on Upwork.{' '}
        <Link
          href={siteConfig.links.upwork}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:text-accent"
        >
          See all reviews →
        </Link>
      </p>
    </Section>
  );
}
```

---

## 15. Process Section

### `src/components/sections/Process.tsx`

```tsx
import { Section, SectionHeader } from '@/components/layout/Section';
import { siteConfig } from '@/lib/siteConfig';

export function Process() {
  return (
    <Section background="subtle">
      <SectionHeader
        eyebrow="How we work"
        headline={<>A process that respects your time and budget.</>}
        subhead="No scope-creep games. No surprise invoices. No ghosting."
      />

      <ol className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
        {siteConfig.process.map((step, i) => (
          <li
            key={step.number}
            className="relative rounded-xl bg-background-card border border-border p-6 lg:p-5"
          >
            <p className="font-display text-5xl text-accent mb-3 leading-none">
              {step.number}
            </p>
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-foreground mb-2">
              {step.title}
            </p>
            <p className="text-sm text-foreground-muted leading-relaxed">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
```

---

## 16. Final CTA Section

### `src/components/sections/FinalCTA.tsx`

```tsx
'use client';

import Link from 'next/link';

import { siteConfig } from '@/lib/siteConfig';
import { trackEvent } from '@/lib/analytics';

export function FinalCTA() {
  return (
    <section className="bg-[#2B2D2D] text-white py-28 md:py-36">
      <div className="container-tight text-center">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-accent mb-6">
          Ready to build?
        </p>
        <h2 className="font-display text-display-lg md:text-[72px] leading-[1.05] tracking-tight mb-6">
          Let&apos;s see if we&apos;re a fit.
        </h2>
        <p className="mt-4 text-lg text-white/70 max-w-xl mx-auto leading-relaxed mb-10">
          30 minutes, free, zero pressure. We&apos;ll tell you honestly if we&apos;re the
          right team — and if we&apos;re not, we&apos;ll tell you who is.
        </p>

        <Link
          href={siteConfig.links.calendly}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('book_call_click', { location: 'final_cta' })}
          className="inline-flex rounded-full bg-accent hover:bg-accent-dark text-accent-foreground px-8 py-4 text-base font-medium transition"
        >
          Book a free scoping call →
        </Link>

        <p className="mt-8 text-sm text-white/50">
          Reply within 24h · Taking 1 new project this month · Remote (UTC+5)
        </p>
      </div>
    </section>
  );
}
```

---

## 17. Home Page (assembling it all)

### `src/app/page.tsx`

```tsx
import { Hero } from '@/components/sections/Hero';
import { LogoBar } from '@/components/sections/LogoBar';
import { NumbersTicker } from '@/components/sections/NumbersTicker';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { FeaturedWork } from '@/components/sections/FeaturedWork';
import { ForFoundersEnterprise } from '@/components/sections/ForFoundersEnterprise';
import { Testimonials } from '@/components/sections/Testimonials';
import { Process } from '@/components/sections/Process';
import { FinalCTA } from '@/components/sections/FinalCTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoBar />
      <NumbersTicker />
      <ServicesGrid />
      <FeaturedWork />
      <ForFoundersEnterprise />
      <Testimonials />
      <Process />
      <FinalCTA />
    </>
  );
}
```

---

## 18. Case Study Card

### `src/components/shared/CaseStudyCard.tsx`

```tsx
import Link from 'next/link';
import Image from 'next/image';

import type { CaseStudySummary } from '@/content/case-studies-meta';

export function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudySummary }) {
  return (
    <Link
      href={`/work/${caseStudy.slug}`}
      className="group relative overflow-hidden rounded-xl bg-background-card border border-border hover:border-accent/30 transition"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-background-subtle">
        <Image
          src={caseStudy.cover}
          alt={`${caseStudy.client} — ${caseStudy.title}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
        />
      </div>
      <div className="p-6 md:p-7">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-foreground-subtle mb-3">
          {caseStudy.clientLabel}
        </p>
        <h3 className="font-display text-[22px] md:text-2xl leading-snug text-foreground mb-2">
          {caseStudy.title}
        </h3>
        <p className="text-sm text-foreground-muted leading-relaxed mb-5">
          {caseStudy.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {caseStudy.stats.map((stat) => (
            <span
              key={stat}
              className="inline-flex items-center rounded-full bg-background-subtle border border-border-subtle px-3 py-1 text-xs text-foreground-muted"
            >
              {stat}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
```

---

## 19. Work Grid Page

### `src/app/work/page.tsx`

```tsx
import type { Metadata } from 'next';

import { Section } from '@/components/layout/Section';
import { CaseStudyCard } from '@/components/shared/CaseStudyCard';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { caseStudies } from '@/content/case-studies-meta';

export const metadata: Metadata = {
  title: 'Our Work — AI Systems in Production',
  description:
    "Case studies from AI systems we've shipped: Aphra (17K users), Capwell (500K records), KCNL ($98.5K/mo saved), Tula ($1.2M raised), and more.",
};

export default function WorkPage() {
  return (
    <>
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container-tight max-w-4xl">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-foreground-subtle mb-6">
            Our work
          </p>
          <h1 className="font-display text-display-lg text-foreground">
            Every system on this page runs in production today.
          </h1>
          <p className="mt-6 text-lg text-foreground-muted leading-relaxed">
            No concept demos. No marketing mockups. Real clients, real users, real money.
          </p>
        </div>
      </section>

      <Section background="default">
        <div className="grid md:grid-cols-2 gap-6">
          {caseStudies.map((cs) => (
            <CaseStudyCard key={cs.slug} caseStudy={cs} />
          ))}
        </div>
      </Section>

      <FinalCTA />
    </>
  );
}
```

---

## 20. Case Study Template

For each slug in `src/content/case-studies-meta.ts`, create `src/app/work/[slug]/page.tsx`. Since your copy is in `02-CASE-STUDIES.md`, the simplest approach for v1 is a static page per slug that imports from an MDX file in `/content/case-studies/[slug].mdx`.

### `src/app/work/[slug]/page.tsx`

```tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';

import { Section } from '@/components/layout/Section';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { getCaseStudy, caseStudies } from '@/content/case-studies-meta';

// Pre-render all case study pages
export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return {
    title: cs.title,
    description: cs.description,
    openGraph: {
      images: [cs.cover],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  // Dynamically import the matching MDX file
  let MDXContent: React.ComponentType | null = null;
  try {
    const mod = await import(`@/content/case-studies/${slug}.mdx`);
    MDXContent = mod.default;
  } catch {
    // No MDX file yet — fall back to minimal content
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="container-tight max-w-4xl">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-foreground-subtle mb-6">
            {cs.clientLabel} · Case Study
          </p>
          <h1 className="font-display text-display-lg text-foreground">
            {cs.title}
          </h1>
          <p className="mt-6 text-lg text-foreground-muted leading-relaxed max-w-2xl">
            {cs.description}
          </p>
        </div>
      </section>

      {/* Cover image */}
      <section className="pb-12 md:pb-16">
        <div className="container-tight max-w-[1100px]">
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-background-subtle border border-border">
            <Image
              src={cs.cover}
              alt={`${cs.client} — ${cs.title}`}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1100px) 1100px, 100vw"
            />
          </div>
        </div>
      </section>

      {/* Stat row */}
      <Section background="subtle">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {cs.stats.map((stat) => (
            <div
              key={stat}
              className="rounded-xl bg-background-card border border-border p-6 text-center"
            >
              <p className="font-display text-2xl md:text-3xl text-accent">
                {stat}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* MDX body */}
      {MDXContent && (
        <Section background="default">
          <article className="prose prose-lg max-w-3xl mx-auto
                              prose-headings:font-display
                              prose-headings:font-normal
                              prose-h2:text-display-sm
                              prose-p:text-foreground-muted
                              prose-a:text-accent">
            <MDXContent />
          </article>
        </Section>
      )}

      <FinalCTA />
    </>
  );
}
```

**MDX setup notes:**

1. Install MDX for Next.js if you haven't:
   ```bash
   npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx
   ```

2. Update `next.config.ts`:
   ```ts
   import type { NextConfig } from 'next';
   import createMDX from '@next/mdx';

   const withMDX = createMDX({
     extension: /\.mdx?$/,
   });

   const nextConfig: NextConfig = {
     pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
     experimental: { mdxRs: true },
   };

   export default withMDX(nextConfig);
   ```

3. Put each case study's body in `/src/content/case-studies/[slug].mdx`, copying from `02-CASE-STUDIES.md`.

---

## 21. Contact Form + API Route

### `src/app/contact/page.tsx`

```tsx
import type { Metadata } from 'next';

import { Section } from '@/components/layout/Section';
import { ContactForm } from '@/components/shared/ContactForm';
import { siteConfig } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Book a Call',
  description:
    "Free 30-minute scoping call. Tell us what you're building, we'll tell you honestly if we're the right team.",
};

export default function ContactPage() {
  const calendlyUrl = siteConfig.links.calendly;

  return (
    <>
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="container-tight max-w-4xl">
          <h1 className="font-display text-display-lg text-foreground">
            30 minutes, free, zero pressure.
          </h1>
          <p className="mt-6 text-lg text-foreground-muted leading-relaxed max-w-2xl">
            Tell us what you&apos;re building. We&apos;ll tell you honestly if we&apos;re a fit —
            and if we&apos;re not, we&apos;ll tell you who is.
          </p>
        </div>
      </section>

      <Section background="subtle">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Calendly */}
          <div className="rounded-xl bg-background-card border border-border overflow-hidden min-h-[700px]">
            <iframe
              src={`${calendlyUrl}?hide_event_type_details=1&hide_gdpr_banner=1`}
              title="Book a call"
              className="w-full h-[700px] border-0"
            />
          </div>

          {/* Form */}
          <div className="rounded-xl bg-background-card border border-border p-8 md:p-10">
            <h2 className="font-display text-display-sm mb-2 text-foreground">
              Or send a message
            </h2>
            <p className="text-sm text-foreground-muted mb-6">
              We reply within 24 hours.
            </p>
            <ContactForm />

            <hr className="my-8 border-border-subtle" />

            <div className="space-y-2 text-sm text-foreground-muted">
              <p>
                Prefer email?{' '}
                <a
                  className="text-accent underline underline-offset-4"
                  href={`mailto:${siteConfig.contact.email}`}
                >
                  {siteConfig.contact.email}
                </a>
              </p>
              <p>
                Prefer LinkedIn?{' '}
                <a
                  className="text-accent underline underline-offset-4"
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  /in/haseeb-ai
                </a>
              </p>
              <p>
                Prefer WhatsApp?{' '}
                <a
                  className="text-accent underline underline-offset-4"
                  href={siteConfig.links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {siteConfig.contact.phone}
                </a>
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
```

### `src/components/shared/ContactForm.tsx`

```tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { trackEvent } from '@/lib/analytics';

const schema = z.object({
  name: z.string().min(2, 'Your name, please.'),
  email: z.string().email('That doesn\'t look like a valid email.'),
  company: z.string().optional(),
  message: z.string().min(20, 'Tell us at least a sentence or two.'),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      reset();
      trackEvent('contact_form_submit', { success: true });
    } catch (err) {
      setStatus('error');
      trackEvent('contact_form_submit', { success: false });
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-md bg-emerald-50 border border-emerald-200 p-6">
        <p className="font-medium text-emerald-900">Thanks — we got it.</p>
        <p className="text-sm text-emerald-800 mt-1">
          You&apos;ll hear from us within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Field label="Your name" error={errors.name?.message}>
        <input
          {...register('name')}
          autoComplete="name"
          className="input-base"
          placeholder="Muhammad Haseeb"
        />
      </Field>
      <Field label="Email" error={errors.email?.message}>
        <input
          {...register('email')}
          type="email"
          autoComplete="email"
          className="input-base"
          placeholder="you@company.com"
        />
      </Field>
      <Field label="Company (optional)" error={errors.company?.message}>
        <input
          {...register('company')}
          autoComplete="organization"
          className="input-base"
          placeholder="Stealth mode AI startup"
        />
      </Field>
      <Field label="What are you building?" error={errors.message?.message}>
        <textarea
          {...register('message')}
          rows={5}
          className="input-base resize-none"
          placeholder="We're raising a seed round for an AI therapy app. Need a senior team to ship the MVP in 8 weeks."
        />
      </Field>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex rounded-full bg-accent hover:bg-accent-dark disabled:opacity-60 text-accent-foreground px-6 py-3 font-medium transition"
      >
        {status === 'sending' ? 'Sending…' : 'Send message →'}
      </button>

      {status === 'error' && (
        <p className="text-sm text-red-600">
          Something went wrong. Try email instead: {process.env.NEXT_PUBLIC_CONTACT_FALLBACK}
        </p>
      )}

      <style jsx>{`
        :global(.input-base) {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          background: #fff;
          border: 1px solid #e6e6e6;
          font-size: 15px;
          color: #2b2d2d;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        :global(.input-base:focus) {
          outline: none;
          border-color: #7c3aed;
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-foreground mb-1.5">
        {label}
      </span>
      {children}
      {error && (
        <span className="block text-xs text-red-600 mt-1.5">{error}</span>
      )}
    </label>
  );
}
```

### `src/app/api/contact/route.ts`

```ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const { name, email, company, message } = parsed.data;

    await resend.emails.send({
      from: process.env.CONTACT_FORM_FROM_EMAIL ?? 'contact@codewithhaseeb.com',
      to: [process.env.CONTACT_FORM_TO_EMAIL ?? 'miltech.haseeb@gmail.com'],
      replyTo: email,
      subject: `New inquiry from ${name}${company ? ` (${company})` : ''}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        company ? `Company: ${company}` : '',
        '',
        '--- Message ---',
        message,
      ]
        .filter(Boolean)
        .join('\n'),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
```

---

## 22. Analytics Helper

Already included in Section 4 — `src/lib/analytics.ts`. Use it on every CTA:

```tsx
<Link
  href={...}
  onClick={() => trackEvent('book_call_click', { location: 'services_section' })}
>
```

Events to fire (per the spec):

| Event name | Where |
|---|---|
| `book_call_click` | Any "Book a Call" CTA — pass `location` param |
| `contact_form_submit` | Contact form — pass `success: true/false` |
| `whatsapp_click` | WhatsApp links |
| `email_click` | Email links |
| `case_study_view` | Handled via page_view on `/work/[slug]` |
| `case_study_outbound` | Outbound client-site links inside case studies |
| `upwork_profile_click` | Upwork link in footer |
| `linkedin_profile_click` | LinkedIn link |

---

## 23. Sitemap + Robots

### `src/app/sitemap.ts`

```ts
import type { MetadataRoute } from 'next';

import { siteConfig } from '@/lib/siteConfig';
import { caseStudies } from '@/content/case-studies-meta';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const today = new Date();

  const staticRoutes = [
    '',
    '/work',
    '/services',
    '/about',
    '/contact',
    '/blog',
    '/privacy',
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: today,
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1.0 : 0.8,
  }));

  const caseStudyRoutes = caseStudies.map((cs) => ({
    url: `${base}/work/${cs.slug}`,
    lastModified: today,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...caseStudyRoutes];
}
```

### `src/app/robots.ts`

```ts
import type { MetadataRoute } from 'next';

import { siteConfig } from '@/lib/siteConfig';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
```

### `src/app/not-found.tsx`

```tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center pt-32 pb-20">
      <div className="container-tight text-center">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-foreground-subtle mb-6">
          404
        </p>
        <h1 className="font-display text-display-lg mb-4">
          Page doesn&apos;t exist.
        </h1>
        <p className="text-foreground-muted max-w-md mx-auto mb-8">
          Maybe we moved it, maybe it never existed. Either way, here&apos;s the way home.
        </p>
        <Link
          href="/"
          className="inline-flex rounded-full bg-accent hover:bg-accent-dark text-accent-foreground px-6 py-3 font-medium transition"
        >
          Back home →
        </Link>
      </div>
    </section>
  );
}
```

---

## Final Notes

### Pages You Still Need to Scaffold

The following pages aren't included here as full TSX because they're mostly content + the primitives above (Section, SectionHeader). Use the copy from `01-BUILD-SPEC.md` + the primitives to build them:

- **`/services`** — wrap each service in a `<Section>` with `<SectionHeader>`
- **`/about`** — hero + story prose + principles (dark section) + final CTA
- **`/blog`** — hero + "coming soon" state + scaffolded subscribe form
- **`/privacy`** — standard boilerplate privacy policy (use any template you trust)

### TODOs for Haseeb

- [ ] Add real cover images to `/public/images/work/` (see asset checklist — ask me for doc 04)
- [ ] Set up Calendly account → update `NEXT_PUBLIC_CALENDLY_URL`
- [ ] Sign up for Resend → set `RESEND_API_KEY` in env
- [ ] Sign up for Microsoft Clarity → set `NEXT_PUBLIC_CLARITY_ID` in env
- [ ] Verify email sender domain in Resend (so forms deliver reliably)
- [ ] Replace the 3 testimonials in `siteConfig` with the most recent ones you want to lead with
- [ ] Copy each case study body from `02-CASE-STUDIES.md` into a corresponding `src/content/case-studies/[slug].mdx` file
- [ ] Generate OG images (next feature) — can use Next.js `opengraph-image.tsx` with a simple design

### Shipping Order (matches the 7-day sprint from spec)

```
Day 1: Layout + Navbar + Footer + globals
Day 2: Hero + LogoBar + NumbersTicker
Day 3: ServicesGrid + FeaturedWork + ForFoundersEnterprise
Day 4: Testimonials + Process + FinalCTA + /work grid
Day 5: Case study pages + MDX pipeline
Day 6: /services + /about + /contact + /blog scaffold
Day 7: SEO, analytics, launch prep
```

— End of code document —
