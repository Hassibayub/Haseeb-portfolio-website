import {
  IconBrain,
  IconRobot,
  IconMicrophone,
  IconBolt,
  IconChartDots3,
  IconCode,
} from '@tabler/icons-react';
import type { Icon as TablerIcon } from '@tabler/icons-react';

import { siteConfig } from '@/lib/siteConfig';

const iconMap: Record<string, TablerIcon> = {
  'ai-saas-mvp':           IconBrain,
  'ai-agents':             IconRobot,
  'voice-ai':              IconMicrophone,
  'llm-cost-optimization': IconBolt,
  'ai-automation':         IconChartDots3,
  'senior-fullstack':      IconCode,
};

export function ServicesGrid() {
  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: '#F3F2F1' }}>
      <div className="container-tight">

        {/* Header */}
        <div className="mb-14 md:mb-20 max-w-3xl">
          <p className="text-label mb-4" style={{ color: '#8C8C8C' }}>
            What we build
          </p>
          <h2 className="font-display text-display-md" style={{ color: '#1D2020' }}>
            Six things we do well. We pass on the rest.
          </h2>
          <p className="mt-5 text-lg leading-relaxed" style={{ color: '#666666' }}>
            We&apos;re specialists, not generalists. If it&apos;s not AI, automation, or senior
            engineering, we&apos;ll refer you to someone better suited.
          </p>
        </div>

        {/* Bento grid */}
        <BentoGrid />
      </div>
    </section>
  );
}

function BentoGrid() {
  const s = siteConfig.services;

  // Bento layout (desktop 4-col):
  // Row 1: [s0 span-2] [s1 span-1] [s2 span-1]
  // Row 2: [s3 span-1] [s4 span-2] [s5 span-1]
  return (
    <div className="grid gap-4 md:grid-cols-4 md:auto-rows-[280px]">
      <ServiceCard service={s[0]} variant="wide" />
      <ServiceCard service={s[1]} />
      <ServiceCard service={s[2]} />
      <ServiceCard service={s[3]} />
      <ServiceCard service={s[4]} variant="wide" />
      <ServiceCard service={s[5]} />
    </div>
  );
}

function ServiceCard({
  service,
  variant,
}: {
  service: (typeof siteConfig.services)[number];
  variant?: 'wide';
}) {
  const Icon = iconMap[service.slug] ?? IconBrain;

  return (
    <article
      className={[
        'group relative flex flex-col overflow-hidden',
        'rounded-3xl p-7',
        'transition-all duration-200 hover:-translate-y-0.5',
        variant === 'wide' ? 'md:col-span-2' : 'md:col-span-1',
      ].join(' ')}
      style={{
        backgroundColor: '#FFFFFF',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.04)',
      }}
    >
      {/* Icon chip — mb-auto pushes it to top */}
      <div
        className="flex items-center justify-center mb-auto"
        style={{
          width: 40,
          height: 40,
          border: '1px solid #E7E6E4',
          borderRadius: 14,
          backgroundColor: '#FFFFFF',
        }}
      >
        <Icon size={20} stroke={1.5} color="#1D2020" />
      </div>

      {/* Text block — anchored to bottom with predictable gap */}
      <div className="mt-10">
        <h3
          className="font-sans font-medium text-[20px] mb-2 leading-snug"
          style={{ color: '#1D2020' }}
        >
          {service.title}
        </h3>
        <p
          className="text-[14px] leading-relaxed"
          style={{ color: '#5A5C5C' }}
        >
          {service.description}
        </p>

        {/* Tech stack line on wide cards only */}
        {variant === 'wide' && (
          <p className="text-[11px] font-mono mt-4" style={{ color: '#9A9C9C' }}>
            {service.slug === 'ai-saas-mvp' && 'NextJS · Python · LangChain'}
            {service.slug === 'ai-automation' && 'GoHighLevel · HubSpot · WhatsApp'}
          </p>
        )}
      </div>
    </article>
  );
}
