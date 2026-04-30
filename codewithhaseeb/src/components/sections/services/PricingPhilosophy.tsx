import Link from 'next/link';
import { siteConfig } from '@/lib/siteConfig';

export function PricingPhilosophy() {
  return (
    <section
      id="pricing-philosophy"
      className="py-[88px] md:py-[140px]"
      style={{ backgroundColor: '#1D2020' }}
    >
      <div className="container-tight text-center max-w-[860px]">
        <p className="text-label mb-6" style={{ color: '#A6A6A6' }}>
          note on pricing
        </p>

        <h2
          className="font-body font-medium leading-[1.08] tracking-tight mb-8"
          style={{
            fontSize: 'clamp(36px, 5vw, 56px)',
            color: '#F3F2F1',
            letterSpacing: '-0.02em',
          }}
        >
          We don&apos;t do hourly for fixed-scope work.
        </h2>

        <div className="space-y-5">
          <p
            className="font-body text-[20px] leading-[1.5]"
            style={{ color: '#C4C4C4' }}
          >
            You know the cost, the deliverables, and the timeline before you send
            a dollar. Milestones are written, invoiced, and paid on delivery.
          </p>
          <p
            className="font-body text-[20px] leading-[1.5]"
            style={{ color: '#C4C4C4' }}
          >
            Scope creep is a planning failure, not a billing event. If scope genuinely
            changes, we write a change order. Everything stays on one page you can
            read in two minutes.
          </p>
          <p
            className="font-body text-[20px] leading-[1.5]"
            style={{ color: '#C4C4C4' }}
          >
            If you need ongoing AI engineering, we also offer retainer arrangements
            from $8,000 to $15,000 per month for a dedicated senior engineer
            embedded in your team.
          </p>
        </div>

        {/* Stat row */}
        <div className="mt-12 grid grid-cols-3 gap-4">
          {[
            { label: 'fixed_price_projects', value: '93%' },
            { label: 'scope_disputes_2024', value: '0' },
            { label: 'avg_overrun', value: '0 weeks' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center px-4 py-5"
              style={{
                border: '1px solid #3A3A3A',
                borderRadius: 12,
              }}
            >
              <span
                className="font-mono text-[14px] mb-1"
                style={{ color: '#D8F9B8' }}
              >
                {stat.value}
              </span>
              <span
                className="font-mono text-[11px] tracking-wider"
                style={{ color: '#8C8C8C' }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href={siteConfig.links.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full px-6 py-3 font-body font-medium transition-all duration-200 hover:brightness-95"
            style={{ backgroundColor: '#D8F9B8', color: '#1D2020' }}
          >
            Discuss your project
          </Link>
        </div>
      </div>
    </section>
  );
}
