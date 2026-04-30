'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { siteConfig } from '@/lib/siteConfig';
import { trackEvent } from '@/lib/analytics';
import { TracePanel } from '@/components/ui/trace-panel';

export function ServicesHero() {
  return (
    <section
      className="pt-[96px] pb-[72px] md:pt-[160px] md:pb-[120px] overflow-hidden"
      style={{ backgroundColor: '#F3F2F1' }}
    >
      <div className="container-tight">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center">

          {/* Left: text */}
          <div>
            <p
              className="text-label mb-6"
              style={{ color: '#8C8C8C' }}
            >
              services / v3.2
            </p>

            <h1
              className="font-body font-medium leading-[1.08] tracking-tight mb-6"
              style={{
                fontSize: 'clamp(40px, 7vw, 88px)',
                color: '#1D2020',
                letterSpacing: '-0.02em',
              }}
            >
              Six offers. No filler. Fixed price.
            </h1>

            <p
              className="font-body text-[20px] leading-[1.5] max-w-[640px] mb-10"
              style={{ color: '#5A5C5C' }}
            >
              We price by outcome, not by hour. Scope is locked before we start.
              No surprise invoices. No scope creep dressed up as &ldquo;discovery.&rdquo;
            </p>

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
                style={{ color: '#7C3AED' }}
              >
                See pricing philosophy
              </a>
            </div>
          </div>

          {/* Right: trace panel */}
          <div className="relative hidden lg:block">
            <TracePanel
              variant="stats"
              headerLabel="services.codewithhaseeb.com"
              rows={[
                { label: 'engagement_types', value: '6' },
                { label: 'min_price', value: '$8,000' },
                { label: 'max_price', value: '$50,000' },
                { label: 'avg_duration', value: '6.5 weeks' },
                { label: 'clients_2024', value: '14' },
                { label: 'job_success', value: '100%' },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
