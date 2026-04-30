'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { siteConfig } from '@/lib/siteConfig';
import { trackEvent } from '@/lib/analytics';

interface FinalCTAProps {
  variant?: 'home' | 'services' | 'work' | 'about' | 'blog' | 'blog-post';
}

export function FinalCTA({ variant = 'home' }: FinalCTAProps) {
  const isServices = variant === 'services';
  const isWork = variant === 'work';
  const isAbout = variant === 'about';
  const isBlog = variant === 'blog';
  const isBlogPost = variant === 'blog-post';

  const eyebrow = isServices
    ? 'ready to scope?'
    : isWork
      ? 'see a match?'
      : isAbout
        ? 'let\'s talk'
        : isBlog
          ? 'build'
          : isBlogPost
            ? 'next step'
            : 'Ready to build?';

  const headline = isServices
    ? "Scope your project in a 30-minute call."
    : isWork
      ? "See one that matches your project? Let's scope it."
      : isAbout
        ? "Let's see if we're a fit."
        : isBlog
          ? "Reading's nice. Shipping's better."
          : isBlogPost
            ? "Thinking about a project like this?"
            : "Let's see if we're a fit.";

  const subhead = isServices
    ? "We push back if the scope is wrong. That's a feature."
    : isWork
      ? "30-minute call. We push back if we're not the right fit."
      : isAbout
        ? "30 minutes. Free. We're direct about what we can and can't do."
        : isBlog
          ? "If any of this maps to something you're building, the scoping call is free."
          : isBlogPost
            ? "30 minutes. Free. We'll tell you if we're a fit and, if not, who is."
            : "30 minutes, free, zero pressure. We'll tell you honestly if we're the right team. If we're not, we'll tell you who is.";

  const ctaLabel = 'Book a scoping call';

  const location = isServices
    ? 'services_final_cta'
    : isWork
      ? 'work_final_cta'
      : isAbout
        ? 'about_final_cta'
        : isBlog
          ? 'blog_final_cta'
          : isBlogPost
            ? 'blog_post_final_cta'
            : 'final_cta';

  return (
    <section className="py-32 md:py-40" style={{ backgroundColor: '#1D2020' }}>
      <div className="container-tight text-center">
        <p
          className="text-label mb-6"
          style={{ color: 'rgba(255,255,255,0.35)' }}
        >
          {eyebrow}
        </p>

        <h2
          className={
            isServices || isWork || isAbout
              ? 'font-body font-medium leading-[1.05] tracking-tight mb-6'
              : 'font-display leading-[1.05] tracking-tight mb-6'
          }
          style={{
            color: '#F1F0EE',
            fontSize: 'clamp(48px, 5vw, 72px)',
            letterSpacing: '-0.03em',
          }}
        >
          {headline}
        </h2>

        <p
          className="mt-4 text-lg leading-relaxed max-w-xl mx-auto mb-10"
          style={{ color: 'rgba(255,255,255,0.5)' }}
        >
          {subhead}
        </p>

        <Link
          href={siteConfig.links.calendly}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackEvent('book_call_click', { location })
          }
          className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-medium transition-all hover:brightness-95"
          style={{ backgroundColor: '#D8F9B8', color: '#1D2020' }}
        >
          {ctaLabel}
          <ArrowUpRight
            size={16}
            className="opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
          />
        </Link>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2">
          <p
            className="text-sm"
            style={{ color: 'rgba(255,255,255,0.25)' }}
          >
            Reply within one business day · Taking one new project this month · Remote (UTC+5)
          </p>
          {(isServices || isWork || isAbout) && (
            <>
              <span
                aria-hidden
                style={{ color: 'rgba(255,255,255,0.15)' }}
              >
                ·
              </span>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-sm transition-colors hover:underline"
                style={{ color: '#D8F9B8' }}
              >
                Email {siteConfig.contact.email}
              </a>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
