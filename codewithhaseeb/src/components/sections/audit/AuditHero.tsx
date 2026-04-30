'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { siteConfig } from '@/lib/siteConfig';
import { trackEvent } from '@/lib/analytics';

export function AuditHero() {
  return (
    <section
      className="pt-[96px] pb-[72px] md:pt-[160px] md:pb-[120px] overflow-hidden"
      style={{ backgroundColor: '#F3F2F1' }}
    >
      <div className="container-tight">
        <div className="max-w-[960px]">
          <p
            className="font-mono text-[12px] tracking-[0.08em] lowercase mb-6"
            style={{ color: '#8C8C8C' }}
          >
            new / $3,000 · 14 days · credited if you build with us
          </p>

          <h1
            className="font-body font-medium leading-[1.05] tracking-tight mb-8"
            style={{
              fontSize: 'clamp(44px, 6.5vw, 84px)',
              color: '#1D2020',
              letterSpacing: '-0.025em',
            }}
          >
            We&apos;ll tell you in 14 days whether your AI idea will survive
            production &mdash; or save you from building the wrong thing for
            6 months.
          </h1>

          <p
            className="font-body text-[20px] leading-[1.5] max-w-[680px] mt-6 mb-10"
            style={{ color: '#5A5C5C' }}
          >
            A senior-led Production Readiness Audit. Architecture doc, cost
            model at 3 scales, a working technical spike of the riskiest
            component, and a locked fixed-price build plan.{' '}
            <span style={{ color: '#1D2020', fontWeight: 500 }}>
              $3,000. Delivered in 14 days. Credited in full if you hire us for
              the build.
            </span>
          </p>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link
              href={siteConfig.links.calendly}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent('audit_cta_click', { location: 'hero_primary' })
              }
              className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-body font-medium transition-all duration-200 hover:brightness-95"
              style={{
                backgroundColor: '#D8F9B8',
                color: '#1D2020',
                height: 48,
                border: '1px solid #1D2020',
              }}
            >
              Book your audit kickoff
              <ArrowUpRight
                size={16}
                className="opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
              />
            </Link>
            <a
              href="#value-stack"
              className="group inline-flex items-center gap-1 font-body text-[15px] transition-colors hover:underline"
              style={{ color: '#6D5EF3' }}
            >
              See what&apos;s included
            </a>
          </div>

          {/* Proof row */}
          <div
            className="mt-16 pt-10 grid grid-cols-2 md:grid-cols-4 gap-8"
            style={{ borderTop: '1px solid #E6E6E6' }}
          >
            <div>
              <p
                className="font-display"
                style={{ fontSize: 36, color: '#1D2020', lineHeight: 1 }}
              >
                17K+
              </p>
              <p className="mt-2 text-[13px]" style={{ color: '#8C8C8C' }}>
                users on Aphra MVP
              </p>
            </div>
            <div>
              <p
                className="font-display"
                style={{ fontSize: 36, color: '#1D2020', lineHeight: 1 }}
              >
                98.5%
              </p>
              <p className="mt-2 text-[13px]" style={{ color: '#8C8C8C' }}>
                LLM cost cut at KCNL
              </p>
            </div>
            <div>
              <p
                className="font-display"
                style={{ fontSize: 36, color: '#1D2020', lineHeight: 1 }}
              >
                $4.2M+
              </p>
              <p className="mt-2 text-[13px]" style={{ color: '#8C8C8C' }}>
                raised by clients
              </p>
            </div>
            <div>
              <p
                className="font-display"
                style={{ fontSize: 36, color: '#1D2020', lineHeight: 1 }}
              >
                100%
              </p>
              <p className="mt-2 text-[13px]" style={{ color: '#8C8C8C' }}>
                JSS · 49 Upwork projects
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
