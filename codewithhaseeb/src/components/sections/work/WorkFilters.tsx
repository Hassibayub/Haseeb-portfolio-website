'use client';

import type { CaseStudy } from '@/lib/case-studies-meta';

interface WorkFiltersProps {
  active: CaseStudy['category'] | 'all';
  onChange: (category: CaseStudy['category'] | 'all') => void;
  counts: { id: CaseStudy['category'] | 'all'; label: string; count: number }[];
}

export function WorkFilters({ active, onChange, counts }: WorkFiltersProps) {
  return (
    <div
      className="py-4 md:py-6"
      style={{ backgroundColor: '#F3F2F1' }}
    >
      <div className="container-tight">
        {/* Single filter bar — flex-wrap on desktop, overflow-x-auto on mobile */}
        <div
          role="tablist"
          aria-label="Filter case studies by category"
          className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-x-visible sm:pb-0"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 12px, black calc(100% - 12px), transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 12px, black calc(100% - 12px), transparent)',
          }}
        >
          {counts.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => onChange(f.id)}
              role="tab"
              aria-selected={active === f.id}
              className="h-9 px-4 rounded-full text-[13px] font-medium whitespace-nowrap shrink-0 sm:shrink transition-all duration-160 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2020] focus-visible:ring-offset-2"
              style={
                active === f.id
                  ? {
                      backgroundColor: '#1D2020',
                      color: '#F3F2F1',
                      border: '1px solid #1D2020',
                    }
                  : {
                      backgroundColor: '#FFFFFF',
                      color: '#1D2020',
                      border: '1px solid #E7E6E4',
                    }
              }
              onMouseEnter={(e) => {
                if (active !== f.id) {
                  (e.currentTarget as HTMLElement).style.backgroundColor = '#F3F2F1';
                  (e.currentTarget as HTMLElement).style.borderColor = '#1D2020';
                }
              }}
              onMouseLeave={(e) => {
                if (active !== f.id) {
                  (e.currentTarget as HTMLElement).style.backgroundColor = '#FFFFFF';
                  (e.currentTarget as HTMLElement).style.borderColor = '#E7E6E4';
                }
              }}
            >
              {f.label} ({f.count})
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

