import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/lib/siteConfig';

export function Testimonials() {
  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: '#F3F2F1' }}>
      <div className="container-tight">

        {/* Header */}
        <div className="mb-12 md:mb-16 max-w-3xl">
          <p className="text-label mb-4" style={{ color: '#8C8C8C' }}>
            What clients say
          </p>
          <h2 className="font-display text-display-md" style={{ color: '#1D2020' }}>
            Words from people who actually paid us.
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {siteConfig.testimonials.map((t, i) => (
            <article
              key={i}
              className="rounded-2xl p-8 flex flex-col"
              style={{
                backgroundColor: '#FFFFFF',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.04)',
              }}
            >
              <p className="text-lg leading-relaxed italic flex-1" style={{ color: '#1D2020' }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div
                className="mt-6 pt-6"
                style={{ borderTop: '1px solid #F0EFED' }}
              >
                <p className="text-sm font-medium" style={{ color: '#1D2020' }}>
                  {t.attribution}
                </p>
                <p className="text-xs mt-1" style={{ color: '#8C8C8C' }}>
                  {t.meta}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Upwork note */}
        <p className="mt-10 text-sm text-center" style={{ color: '#888888' }}>
          Based on a 100% Job Success rate across 49 completed projects on Upwork.{' '}
          <Link
            href={siteConfig.links.upwork}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 underline underline-offset-4 transition-colors hover:text-[#7C3AED]"
            style={{ color: '#888888' }}
          >
            See all reviews
            <ArrowUpRight
              size={13}
              className="opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
            />
          </Link>
        </p>
      </div>
    </section>
  );
}
