import Link from 'next/link';

import type { CaseStudySummary } from '@/content/case-studies-meta';

export function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudySummary }) {
  return (
    <Link
      href={`/work/${caseStudy.slug}`}
      className="group relative overflow-hidden rounded-2xl border flex flex-col transition-all duration-300 hover:-translate-y-0.5"
      style={{
        backgroundColor: '#FFFFFF',
        borderColor: '#ECEAE8',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)',
      }}
    >
      {/* Cover — editorial gradient placeholder until real screenshots are available */}
      <div
        className="relative overflow-hidden"
        style={{
          aspectRatio: '16 / 10',
          background: 'linear-gradient(135deg, #1D2020 0%, #2B2D2D 100%)',
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <p
            className="font-mono text-[11px] tracking-[0.15em] uppercase"
            style={{ color: 'rgba(216, 249, 184, 0.7)' }}
          >
            cs_{String(caseStudy.order).padStart(2, '0')} / {caseStudy.clientLabel.toLowerCase()}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-7 flex flex-col flex-1">
        <p className="text-label mb-3" style={{ color: '#8C8C8C' }}>
          {caseStudy.clientLabel}
        </p>
        <h3
          className="font-display text-[22px] leading-snug mb-2"
          style={{ color: '#1D2020' }}
        >
          {caseStudy.title}
        </h3>
        <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: '#666666' }}>
          {caseStudy.description}
        </p>

        {/* Stat pills */}
        <div className="flex flex-wrap gap-2">
          {caseStudy.stats.map((stat) => (
            <span
              key={stat}
              className="inline-flex items-center rounded-md border px-3 py-1 text-xs font-mono"
              style={{ backgroundColor: '#F7F6F4', borderColor: '#ECEAE8', color: '#666666' }}
            >
              {stat}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
