'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/lib/siteConfig';
import { trackEvent } from '@/lib/analytics';

export function FinalCTA() {
  return (
    <section className="py-32 md:py-40" style={{ backgroundColor: '#1D2020' }}>
      <div className="container-tight text-center">
        <p
          className="text-label mb-6"
          style={{ color: 'rgba(255,255,255,0.35)' }}
        >
          Ready to build?
        </p>

        <h2
          className="font-display leading-[1.05] tracking-tight mb-6"
          style={{
            color: '#F1F0EE',
            fontSize: 'clamp(48px, 5vw, 72px)',
            letterSpacing: '-0.03em',
          }}
        >
          Let&apos;s see if we&apos;re a fit.
        </h2>

        <p
          className="mt-4 text-lg leading-relaxed max-w-xl mx-auto mb-10"
          style={{ color: 'rgba(255,255,255,0.5)' }}
        >
          30 minutes, free, zero pressure. We&apos;ll tell you honestly if we&apos;re the
          right team. If we&apos;re not, we&apos;ll tell you who is.
        </p>

        <Link
          href={siteConfig.links.calendly}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('book_call_click', { location: 'final_cta' })}
          className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-medium transition-all hover:brightness-95"
          style={{ backgroundColor: '#D8F9B8', color: '#1D2020' }}
        >
          Book a free scoping call
          <ArrowUpRight
            size={16}
            className="opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
          />
        </Link>

        <p
          className="mt-8 text-sm"
          style={{ color: 'rgba(255,255,255,0.25)' }}
        >
          Reply within 24h · Taking 1 new project this month · Remote (UTC+5)
        </p>
      </div>
    </section>
  );
}
