import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/lib/siteConfig';

type Testimonial = (typeof siteConfig.testimonials)[number] & { featured?: boolean };

export function Testimonials() {
  const all = siteConfig.testimonials as Testimonial[];
  const featured = all.find((t) => t.featured) ?? all[0];
  const rest = all.filter((t) => t !== featured);

  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: '#F3F2F1' }}>
      <div className="container-tight">

        {/* Header */}
        <div className="mb-14 md:mb-20 max-w-3xl">
          <p className="text-label mb-4" style={{ color: '#8C8C8C' }}>
            What clients say
          </p>
          <h2 className="font-display text-display-md" style={{ color: '#1D2020' }}>
            Words from people who actually paid us.
          </h2>
        </div>

        {/* Featured quote */}
        <figure className="mb-12 md:mb-16">
          <blockquote
            className="font-display text-[28px] md:text-[36px] leading-[1.25] max-w-4xl"
            style={{ color: '#1D2020' }}
          >
            &ldquo;{featured.quote}&rdquo;
          </blockquote>
          <figcaption
            className="mt-6 flex items-center gap-3 text-sm"
            style={{ color: '#666666' }}
          >
            <span className="font-medium" style={{ color: '#1D2020' }}>
              {featured.attribution}
            </span>
            <span aria-hidden style={{ color: '#CCCCCC' }}>·</span>
            <span>{featured.meta}</span>
          </figcaption>
        </figure>

        {/* Secondary grid: 3 per row on desktop */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
          {rest.map((t, i) => (
            <article
              key={i}
              className="rounded-2xl p-6"
              style={{
                backgroundColor: '#FFFFFF',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 6px 20px rgba(0,0,0,0.03)',
              }}
            >
              <p
                className="text-[15px] leading-relaxed"
                style={{ color: '#2B2D2D' }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <div
                className="mt-5 pt-5"
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
        <p className="mt-12 text-sm text-center" style={{ color: '#888888' }}>
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
