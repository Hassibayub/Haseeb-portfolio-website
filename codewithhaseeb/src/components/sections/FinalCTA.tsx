'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { siteConfig } from '@/lib/siteConfig';
import { trackEvent } from '@/lib/analytics';

interface FinalCTAProps {
  variant?: 'home' | 'services';
}

export function FinalCTA({ variant = 'home' }: FinalCTAProps) {
  const isServices = variant === 'services';

  return (
    <section className="py-32 md:py-40" style={{ backgroundColor: '#1D2020' }}>
      <div className="container-tight text-center">
        <p
          className="text-label mb-6"
          style={{ color: 'rgba(255,255,255,0.35)' }}
        >
          {isServices ? 'ready to scope?' : 'Ready to build?'}
        </p>

        <h2
          className={
            isServices
              ? 'font-body font-medium leading-[1.05] tracking-tight mb-6'
              : 'font-display leading-[1.05] tracking-tight mb-6'
          }
          style={{
            color: '#F1F0EE',
            fontSize: 'clamp(48px, 5vw, 72px)',
            letterSpacing: '-0.03em',
          }}
        >
          {isServices
            ? "Scope your project in a 30-minute call."
            : "Let's see if we're a fit."}
        </h2>

        <p
          className="mt-4 text-lg leading-relaxed max-w-xl mx-auto mb-10"
          style={{ color: 'rgba(255,255,255,0.5)' }}
        >
          {isServices
            ? "We push back if the scope is wrong. That's a feature."
            : "30 minutes, free, zero pressure. We'll tell you honestly if we're the right team. If we're not, we'll tell you who is."}
        </p>

        <Link
          href={siteConfig.links.calendly}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackEvent('book_call_click', {
              location: isServices ? 'services_final_cta' : 'final_cta',
            })
          }
          className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-medium transition-all hover:brightness-95"
          style={{ backgroundColor: '#D8F9B8', color: '#1D2020' }}
        >
          {isServices ? 'Book a scoping call' : 'Book a free scoping call'}
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
            Reply within 24h · Taking 1 new project this month · Remote (UTC+5)
          </p>
          {isServices && (
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
                {siteConfig.contact.email}
              </a>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
