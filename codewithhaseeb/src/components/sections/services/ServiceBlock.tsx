'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  IconRocket,
  IconRobot,
  IconMicrophone,
  IconBolt,
  IconChartDots3,
  IconCode,
} from '@tabler/icons-react';
import type { Icon as TablerIcon } from '@tabler/icons-react';

import { type ServiceDetail } from '@/lib/services-detail';
import { IncludedList } from '@/components/ui/included-list';
import { ProofChip } from '@/components/ui/proof-chip';
import { trackEvent } from '@/lib/analytics';

const iconMap: Record<string, TablerIcon> = {
  'ai-saas-mvp': IconRocket,
  'ai-agents': IconRobot,
  'voice-ai': IconMicrophone,
  'llm-cost-optimization': IconBolt,
  'ai-automation': IconChartDots3,
  'senior-fullstack': IconCode,
};

interface ServiceBlockProps {
  service: ServiceDetail;
  surface: 'light' | 'cream';
}

export function ServiceBlock({ service, surface }: ServiceBlockProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackEvent('services_block_view', { service_slug: service.slug });
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [service.slug]);

  const bg = surface === 'cream' ? '#F3F2F1' : '#FFFFFF';

  return (
    <section
      id={`service-${service.slug}`}
      ref={ref}
      className="py-[64px] md:py-[112px]"
      style={{ backgroundColor: bg }}
    >
      <div className="container-tight">
        <div className="grid lg:grid-cols-[5fr_1fr_6fr] gap-0 items-start">

          {/* Meta column */}
          <div className="lg:col-span-1">
            {/* Icon chip */}
            <div
              className="flex items-center justify-center mb-8"
              style={{
                width: 64,
                height: 64,
                border: '1px solid #E7E6E4',
                borderRadius: 16,
                backgroundColor: '#FFFFFF',
              }}
            >
              {(() => {
                const Icon = iconMap[service.slug] ?? IconRocket;
                return <Icon size={32} stroke={1.5} color="#1D2020" />;
              })()}
            </div>

            {/* Eyebrow */}
            <p className="font-mono text-[12px] tracking-[0.08em] lowercase mb-4" style={{ color: '#8C8C8C' }}>
              {service.eyebrow}
            </p>

            {/* Headline */}
            <h2
              className="font-body font-medium leading-[1.1] tracking-tight mb-4"
              style={{
                fontSize: 'clamp(32px, 4vw, 48px)',
                color: '#1D2020',
                letterSpacing: '-0.02em',
              }}
            >
              {service.headline}
            </h2>

            {/* Positioning line */}
            <p
              className="font-body text-[18px] max-w-[400px] mt-5"
              style={{ color: '#5A5C5C' }}
            >
              {service.positioningLine}
            </p>
          </div>

          {/* Gutter */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Body column */}
          <div className="lg:col-span-1">
            {/* What you get */}
            <h3
              className="text-label mb-4"
              style={{ color: '#8C8C8C' }}
            >
              what you get
            </h3>
            <IncludedList items={service.included} />

            {/* Typical engagement */}
            <div
              className="mt-8 inline-flex flex-col gap-1 px-5 py-4"
              style={{
                backgroundColor: '#F3F2F1',
                border: '1px solid #E7E6E4',
                borderRadius: 12,
              }}
            >
              <h3
                className="text-[11px] font-mono uppercase tracking-[0.12em]"
                style={{ color: '#8C8C8C' }}
              >
                Typical engagement
              </h3>
              <span
                className="text-[15px] font-sans mt-1"
                style={{ color: '#1D2020' }}
              >
                {service.typicalEngagement.priceRange} · {service.typicalEngagement.duration}
              </span>
            </div>

            {/* Proof chips */}
            <div className="mt-6 flex flex-wrap gap-2">
              {service.proofChips.map((chip) => (
                <ProofChip
                  key={chip.slug + chip.label + chip.metric}
                  slug={chip.slug}
                  label={chip.label}
                  metric={chip.metric}
                />
              ))}
            </div>

            {/* CTA pair */}
            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                href={`/contact?service=${service.slug}`}
                onClick={() =>
                  trackEvent('services_cta_click', {
                    service_slug: service.slug,
                    location: service.slug,
                  })
                }
                className="group inline-flex items-center gap-2 rounded-full px-6 py-3 font-body font-medium transition-all duration-200 hover:brightness-95"
                style={{
                  backgroundColor: '#D8F9B8',
                  color: '#1D2020',
                  height: 48,
                }}
              >
                Start scoping
              </Link>
              <Link
                href={`/work/${service.proofChips[0]?.slug}`}
                className="group inline-flex items-center gap-1 font-body text-[15px] transition-colors hover:underline"
                style={{ color: '#7C3AED' }}
              >
                See related work
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
