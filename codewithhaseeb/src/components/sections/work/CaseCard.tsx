import Link from 'next/link';

import type { CaseStudy } from '@/lib/case-studies-meta';

const gradientMap: Record<string, string> = {
  aphra: 'linear-gradient(135deg, #1D2020 0%, #2B2D2D 50%, #3A3C3C 100%)',
  capwell: 'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)',
  kcnl: 'linear-gradient(135deg, #1D2020 0%, #3D2D2D 50%, #4A3C3C 100%)',
  tula: 'linear-gradient(135deg, #1A2020 0%, #2D3D2D 50%, #3C4A3C 100%)',
  medmatch: 'linear-gradient(135deg, #201D20 0%, #3C2D3C 50%, #4A3C4A 100%)',
  fcs: 'linear-gradient(135deg, #1D2020 0%, #2B3D3D 50%, #3C4A4A 100%)',
  bestinform: 'linear-gradient(135deg, #1D2020 0%, #3D3D2D 50%, #4A4A3C 100%)',
  'sony-playstation': 'linear-gradient(135deg, #0A0A20 0%, #1D2020 50%, #2D2D40 100%)',
};

type CaseCardSize = 'standard' | 'wide' | 'xwide';

interface CaseCardProps {
  caseStudy: CaseStudy;
  size: CaseCardSize;
  position?: number;
}

export function CaseCard({ caseStudy: cs, size, position = 0 }: CaseCardProps) {
  const gradient = gradientMap[cs.slug] ?? 'linear-gradient(135deg, #1D2020 0%, #2B2D2D 100%)';

  return (
    <Link
      href={`/work/${cs.slug}`}
      className="group relative overflow-hidden rounded-2xl border flex flex-col transition-all duration-220 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1D2020]"
      style={{
        backgroundColor: '#FFFFFF',
        borderColor: '#E7E6E4',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        height: '100%',
        minHeight: 320,
      }}
      onClick={() => {
        // Analytics handled at parent level
      }}
      aria-label={`Case study: ${cs.title}`}
    >
      {size === 'standard' ? (
        <>
          {/* Cover image area */}
          <div
            className="relative overflow-hidden w-full"
            style={{ height: 180, background: gradient }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
              <p
                className="font-body font-medium text-[18px] tracking-tight"
                style={{ color: 'rgba(243, 242, 241, 0.9)' }}
              >
                {cs.shortTitle.split(',')[0].split('.')[0]}
              </p>
              <p
                className="font-mono text-[11px] tracking-[0.12em] uppercase"
                style={{ color: 'rgba(216, 249, 184, 0.5)' }}
              >
                {cs.year}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col flex-1">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[11px] tracking-[0.08em] lowercase" style={{ color: '#8C8C8C' }}>
                {cs.category.replace('-', ' ')}
              </span>
              <span className="font-mono text-[11px] tracking-[0.08em]" style={{ color: '#8C8C8C' }}>
                {cs.year}
              </span>
            </div>

            <h3
              className="font-body font-medium text-[18px] leading-[1.25] mb-3 line-clamp-2"
              style={{ color: '#1D2020' }}
            >
              {cs.shortTitle}
            </h3>

            <div className="mt-auto flex flex-wrap gap-2">
              {cs.metrics.slice(0, 2).map((m) => (
                <span
                  key={m.label}
                  className="inline-flex items-center px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor: '#F7F6F4',
                    border: '1px solid #E7E6E4',
                    fontSize: 12,
                    color: '#1D2020',
                  }}
                >
                  <strong className="font-medium">{m.value}</strong>
                  <span className="ml-1" style={{ color: '#5A5C5C' }}>
                    {m.label}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Wide / xwide: side-by-side layout */
        <>
          {/* Cover image area */}
          <div
            className="absolute top-0 left-0 overflow-hidden"
            style={{
              width: size === 'xwide' ? '33%' : '50%',
              height: '100%',
              background: gradient,
            }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-4 text-center">
              <p
                className="font-body font-medium text-[15px] tracking-tight leading-[1.2]"
                style={{ color: 'rgba(243, 242, 241, 0.9)' }}
              >
                {cs.slug === 'sony-playstation' ? 'Sony PlayStation' : cs.slug.charAt(0).toUpperCase() + cs.slug.slice(1)}
              </p>
              <p
                className="font-mono text-[10px] tracking-[0.12em] uppercase"
                style={{ color: 'rgba(216, 249, 184, 0.5)' }}
              >
                {cs.year}
              </p>
            </div>
          </div>

          {/* Content */}
          <div
            className="relative flex flex-col justify-center"
            style={{
              marginLeft: size === 'xwide' ? '33%' : '50%',
              padding: size === 'xwide' ? 32 : 28,
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[11px] tracking-[0.08em] lowercase" style={{ color: '#8C8C8C' }}>
                {cs.category.replace('-', ' ')}
              </span>
              <span className="font-mono text-[11px] tracking-[0.08em]" style={{ color: '#8C8C8C' }}>
                {cs.year}
              </span>
            </div>

            <h3
              className="font-body font-medium leading-[1.25] mb-3"
              style={{
                fontSize: size === 'xwide' ? 28 : 24,
                color: '#1D2020',
              }}
            >
              {cs.title}
            </h3>

            <p
              className="font-body leading-[1.5] mb-4 line-clamp-2"
              style={{
                fontSize: size === 'xwide' ? 16 : 15,
                color: '#5A5C5C',
                maxWidth: size === 'xwide' ? 520 : 400,
              }}
            >
              {cs.outcome}
            </p>

            <div className="flex flex-wrap gap-2">
              {cs.metrics.slice(0, 3).map((m) => (
                <span
                  key={m.label}
                  className="inline-flex items-center px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor: '#F7F6F4',
                    border: '1px solid #E7E6E4',
                    fontSize: 12,
                    color: '#1D2020',
                  }}
                >
                  <strong className="font-medium">{m.value}</strong>
                  <span className="ml-1" style={{ color: '#5A5C5C' }}>
                    {m.label}
                  </span>
                </span>
              ))}
            </div>

            {size === 'xwide' && (
              <span
                className="mt-5 inline-flex items-center gap-1.5 font-body text-[13px] font-medium opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
                style={{ color: '#1D2020' }}
                aria-hidden="true"
              >
                View case study
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
              </span>
            )}
          </div>
        </>
      )}
    </Link>
  );
}
