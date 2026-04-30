'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { siteConfig } from '@/lib/siteConfig';
import { trackEvent } from '@/lib/analytics';

export function AuditFinalCTA() {
  return (
    <section className="py-32 md:py-40" style={{ backgroundColor: '#1D2020' }}>
      <div className="container-tight text-center">
        <p
          className="text-label mb-6"
          style={{ color: 'rgba(255,255,255,0.35)' }}
        >
          next step
        </p>

        <h2
          className="font-body font-medium leading-[1.05] tracking-tight mb-6"
          style={{
            color: '#F1F0EE',
            fontSize: 'clamp(44px, 5.5vw, 72px)',
            letterSpacing: '-0.03em',
          }}
        >
          Know in 14 days. Pay $3K. Credited if you build with us.
        </h2>

        <p
          className="mt-4 text-lg leading-relaxed max-w-[620px] mx-auto mb-10"
          style={{ color: 'rgba(255,255,255,0.55)' }}
        >
          A free 30-minute scoping call first. If we&apos;re a fit, we kick off
          the audit. If not, we refer you out. Taking two audits per month.
        </p>

        <Link
          href={siteConfig.links.calendly}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackEvent('audit_cta_click', { location: 'final_cta' })
          }
          className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-medium transition-all hover:brightness-95"
          style={{ backgroundColor: '#D8F9B8', color: '#1D2020' }}
        >
          Book your audit kickoff
          <ArrowUpRight
            size={16}
            className="opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
          />
        </Link>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2">
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Reply within one business day &middot; 2 audit slots per month &middot; Remote (UTC+5)
          </p>
          <span aria-hidden style={{ color: 'rgba(255,255,255,0.15)' }}>
            &middot;
          </span>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="text-sm transition-colors hover:underline"
            style={{ color: '#D8F9B8' }}
          >
            Email {siteConfig.contact.email}
          </a>
        </div>
      </div>
    </section>
  );
}
