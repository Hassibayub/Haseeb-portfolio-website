'use client';

import { useState } from 'react';

import { getCaseStudiesByCategory, categories, type CaseStudy } from '@/lib/case-studies-meta';
import { trackEvent } from '@/lib/analytics';
import { WorkFilters } from '@/components/sections/work/WorkFilters';
import { WorkGrid } from '@/components/sections/work/WorkGrid';

export function WorkPageClient() {
  const [activeFilter, setActiveFilter] = useState<CaseStudy['category'] | 'all'>('all');

  const filtered = getCaseStudiesByCategory(activeFilter);

  const handleFilterChange = (category: CaseStudy['category'] | 'all') => {
    trackEvent('work_filter_change', { filter_id: category });
    setActiveFilter(category);
  };

  return (
    <>
      <WorkFilters
        active={activeFilter}
        onChange={handleFilterChange}
        counts={categories}
      />
      <div className="pb-[72px] md:pb-[128px]" style={{ backgroundColor: '#F3F2F1' }}>
        <div className="container-tight">
          <WorkGrid caseStudies={filtered} />
        </div>
      </div>
    </>
  );
}
