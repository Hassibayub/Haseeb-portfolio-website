'use client';

import Link from 'next/link';

import { siteConfig } from '@/lib/siteConfig';
import { trackEvent } from '@/lib/analytics';
import { ProofArtifact } from '@/components/ui/proof-artifact';

export function ServicesHero() {
  return (
    <section
      className="pt-[96px] pb-[72px] md:pt-[160px] md:pb-[120px] overflow-hidden"
      style={{ backgroundColor: '#F3F2F1' }}
    >
      <div className="container-tight">
        {/* Single column, left-aligned, max-width 960px */}
        <div className="max-w-[960px]">
          <p
            className="text-label mb-6"
            style={{ color: '#8C8C8C' }}
          >
            services
          </p>

          <h1
            className="font-body font-medium leading-[1.08] tracking-tight mb-6"
            style={{
              fontSize: 'clamp(48px, 7vw, 88px)',
              color: '#1D2020',
              letterSpacing: '-0.02em',
            }}
          >
            Six offers. No filler. Fixed price.
          </h1>

          <p
            className="font-body text-[20px] leading-[1.5] max-w-[640px] mt-6 mb-10"
            style={{ color: '#5A5C5C' }}
          >
            We price by outcome, not by hour. Scope is locked before we start.
            No surprise invoices.
          </p>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link
              href={siteConfig.links.calendly}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('services_cta_click', { location: 'hero_primary' })}
              className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-body font-medium transition-all duration-200 hover:brightness-95"
              style={{
                backgroundColor: '#D8F9B8',
                color: '#1D2020',
                height: 48,
              }}
            >
              Book a scoping call
            </Link>
            <a
              href="#pricing-philosophy"
              className="group inline-flex items-center gap-1 font-body text-[15px] transition-colors hover:underline"
              style={{ color: '#6D5EF3' }}
            >
              See pricing
            </a>
          </div>

          {/* Proof artifact */}
          <ProofArtifact />
        </div>
      </div>
    </section>
  );
}
