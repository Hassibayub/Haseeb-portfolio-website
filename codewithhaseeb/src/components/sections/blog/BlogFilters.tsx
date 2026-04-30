'use client';

import { type BlogCategory, blogCategories } from '@/lib/blog';
import { trackEvent } from '@/lib/analytics';

interface BlogFiltersProps {
  active: BlogCategory | 'all';
  onChange: (cat: BlogCategory | 'all') => void;
  counts: Record<BlogCategory | 'all', number>;
}

export function BlogFilters({ active, onChange, counts }: BlogFiltersProps) {
  return (
    <div
      className="py-4 md:py-6"
      style={{ backgroundColor: '#F3F2F1' }}
    >
      <div className="container-tight">
        <div
          role="tablist"
          aria-label="Filter posts by category"
          className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-x-visible sm:pb-0"
          style={{
            maskImage:
              'linear-gradient(to right, transparent, black 12px, black calc(100% - 12px), transparent)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent, black 12px, black calc(100% - 12px), transparent)',
          }}
        >
          {blogCategories.map((cat) => {
            const count = counts[cat.id] ?? 0;
            const isActive = active === cat.id;
            const isEmpty = cat.id !== 'all' && count === 0;

            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                disabled={isEmpty}
                onClick={() => {
                  if (!isEmpty) {
                    onChange(cat.id);
                    trackEvent('blog_filter_change', { category: cat.id });
                  }
                }}
                className="h-9 px-4 rounded-full text-[13px] font-medium whitespace-nowrap shrink-0 sm:shrink transition-all duration-160 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2020] focus-visible:ring-offset-2 disabled:cursor-default"
                style={{
                  ...(isActive
                    ? {
                        backgroundColor: '#1D2020',
                        color: '#F3F2F1',
                        border: '1px solid #1D2020',
                      }
                    : {
                        backgroundColor: '#FFFFFF',
                        color: '#1D2020',
                        border: '1px solid #E7E6E4',
                      }),
                  opacity: isEmpty ? 0.5 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!isActive && !isEmpty) {
                    (e.currentTarget as HTMLElement).style.backgroundColor = '#F3F2F1';
                    (e.currentTarget as HTMLElement).style.borderColor = '#1D2020';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive && !isEmpty) {
                    (e.currentTarget as HTMLElement).style.backgroundColor = '#FFFFFF';
                    (e.currentTarget as HTMLElement).style.borderColor = '#E7E6E4';
                  }
                }}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
