import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { CaseStudyCard } from '@/components/shared/CaseStudyCard';
import { siteConfig } from '@/lib/siteConfig';
import { getFeaturedCaseStudies } from '@/content/case-studies-meta';

export function FeaturedWork() {
  const featured = getFeaturedCaseStudies(siteConfig.featuredCaseStudies);

  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container-tight">

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-3xl">
            <p className="text-label mb-4" style={{ color: '#8C8C8C' }}>
              Featured work
            </p>
            <h2 className="font-display text-display-md" style={{ color: '#1D2020' }}>
              Built for real users at real scale.
            </h2>
            <p className="mt-5 text-lg leading-relaxed" style={{ color: '#666666' }}>
              A few of the AI systems we&apos;ve shipped that are running in production today.
            </p>
          </div>

          <Link
            href="/work"
            className="group inline-flex items-center gap-1.5 text-sm font-medium transition-colors whitespace-nowrap"
            style={{ color: '#1D2020' }}
          >
            View all case studies
            <ArrowUpRight
              size={15}
              className="opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
            />
          </Link>
        </div>

        {/* Card grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((cs) => (
            <CaseStudyCard key={cs.slug} caseStudy={cs} />
          ))}
        </div>
      </div>
    </section>
  );
}
