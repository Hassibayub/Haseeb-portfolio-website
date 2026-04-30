import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

import { getCaseStudy, caseStudies } from '@/lib/case-studies-meta';
import { caseStudyContent } from '@/lib/case-study-content';
import { FinalCTA } from '@/components/sections/FinalCTA';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return { title: 'Case Study Not Found' };
  const content = caseStudyContent[slug];
  return {
    title: cs.title,
    description: cs.outcome,
    openGraph: {
      title: cs.title,
      description: cs.outcome,
      type: 'article',
    },
    alternates: { canonical: `https://codewithhaseeb.com/work/${slug}` },
  };
}

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

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  const content = caseStudyContent[slug];

  if (!cs || !content) notFound();

  const gradient = gradientMap[slug] ?? 'linear-gradient(135deg, #1D2020 0%, #2B2D2D 100%)';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: cs.title,
    description: cs.outcome,
    url: `https://codewithhaseeb.com/work/${slug}`,
    author: { '@type': 'Organization', name: 'codewithhaseeb' },
    datePublished: cs.year,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section
        className="pt-[120px] pb-[80px] md:pt-[180px] md:pb-[120px]"
        style={{ background: gradient }}
      >
        <div className="container-tight max-w-[860px]">
          {/* Back link */}
          <Link
            href="/work"
            className="inline-flex items-center gap-2 mb-10 text-sm font-mono tracking-wide transition-opacity hover:opacity-70"
            style={{ color: 'rgba(216,249,184,0.6)' }}
          >
            <ArrowLeft size={14} />
            All case studies
          </Link>

          {/* Eyebrow */}
          <p
            className="font-mono text-[11px] tracking-[0.15em] uppercase mb-6"
            style={{ color: 'rgba(216,249,184,0.6)' }}
          >
            {content.eyebrow}
          </p>

          {/* Headline */}
          <h1
            className="font-body font-medium leading-[1.08] tracking-tight mb-6"
            style={{
              fontSize: 'clamp(36px, 5.5vw, 72px)',
              color: '#F3F2F1',
              letterSpacing: '-0.025em',
              whiteSpace: 'pre-line',
            }}
          >
            {content.headline}
          </h1>

          {/* Subhead */}
          <p
            className="font-body text-[18px] leading-[1.6] max-w-[640px] mb-8"
            style={{ color: 'rgba(243,242,241,0.7)' }}
          >
            {content.subhead}
          </p>

          {/* Meta row */}
          <p
            className="font-mono text-[12px] tracking-wide"
            style={{ color: 'rgba(216,249,184,0.45)' }}
          >
            {content.metaRow}
          </p>

          {/* Live link */}
          {content.liveUrl && (
            <a
              href={content.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-80"
              style={{ color: '#D8F9B8' }}
            >
              Visit live product
              <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </section>

      {/* Stat row */}
      <section
        className="py-12 md:py-16 border-b"
        style={{ backgroundColor: '#F3F2F1', borderColor: '#E7E6E4' }}
      >
        <div className="container-tight max-w-[860px]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {content.stats.map((stat) => (
              <div key={stat.label}>
                <div
                  className="font-body font-medium text-[24px] md:text-[28px] leading-[1.1] tracking-tight"
                  style={{ color: '#1D2020' }}
                >
                  {stat.value}
                </div>
                <p
                  className="mt-1.5 font-body text-[13px] leading-[1.4]"
                  style={{ color: '#5A5C5C' }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Article body */}
      <article
        className="py-16 md:py-24"
        style={{ backgroundColor: '#F3F2F1' }}
      >
        <div className="container-tight max-w-[720px]">
          {/* Metric chips */}
          <div className="flex flex-wrap gap-2 mb-12">
            {cs.metrics.map((m) => (
              <span
                key={m.label}
                className="inline-flex items-center px-3 py-1.5 rounded-full text-[13px]"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E7E6E4',
                  color: '#1D2020',
                }}
              >
                <strong className="font-medium">{m.value}</strong>
                <span className="ml-1.5" style={{ color: '#5A5C5C' }}>
                  {m.label}
                </span>
              </span>
            ))}
          </div>

          {/* Sections */}
          {content.sections.map((section) => (
            <section key={section.heading} className="mb-12">
              <h2
                className="font-body font-medium text-[22px] leading-[1.3] mb-4"
                style={{ color: '#1D2020' }}
              >
                {section.heading}
              </h2>

              {section.body && (
                <div>
                  {section.body.split('\n\n').map((para, i) => (
                    <p
                      key={i}
                      className="font-body text-[17px] leading-[1.65] mb-4"
                      style={{ color: '#3A3C3C' }}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              )}

              {section.bullets && (
                <ul className="mt-4 space-y-3">
                  {section.bullets.map((b, i) => (
                    <li
                      key={i}
                      className="flex gap-3 font-body text-[16px] leading-[1.6]"
                      style={{ color: '#3A3C3C' }}
                    >
                      <span
                        className="mt-[6px] shrink-0 w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: '#D8F9B8' }}
                        aria-hidden="true"
                      />
                      <span dangerouslySetInnerHTML={{ __html: b.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    </li>
                  ))}
                </ul>
              )}

              {section.table && (
                <div className="mt-6 overflow-x-auto rounded-xl border" style={{ borderColor: '#E7E6E4' }}>
                  <table className="w-full text-[14px] font-body">
                    <thead>
                      <tr style={{ backgroundColor: '#EEECEA' }}>
                        {section.table.headers.map((h) => (
                          <th
                            key={h}
                            className="px-4 py-3 text-left font-medium"
                            style={{ color: '#1D2020' }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row, ri) => (
                        <tr
                          key={ri}
                          style={{
                            backgroundColor: ri % 2 === 0 ? '#FFFFFF' : '#F9F8F6',
                            borderTop: '1px solid #E7E6E4',
                          }}
                        >
                          {row.map((cell, ci) => (
                            <td
                              key={ci}
                              className="px-4 py-3"
                              style={{ color: ci === 0 ? '#1D2020' : '#5A5C5C' }}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          ))}

          {/* Tech Stack */}
          <section className="mt-16 pt-10 border-t" style={{ borderColor: '#E7E6E4' }}>
            <h2
              className="font-mono text-[11px] tracking-[0.15em] uppercase mb-6"
              style={{ color: '#8C8C8C' }}
            >
              Tech Stack
            </h2>
            <ul className="space-y-2">
              {content.stack.map((item, i) => (
                <li
                  key={i}
                  className="font-body text-[15px] leading-[1.5]"
                  style={{ color: '#3A3C3C' }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Back + next navigation */}
          <div className="mt-16 pt-10 border-t flex items-center justify-between" style={{ borderColor: '#E7E6E4' }}>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
              style={{ color: '#1D2020' }}
            >
              <ArrowLeft size={14} />
              All case studies
            </Link>
            <a
              href="https://calendly.com/miltech-haseeb/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all hover:brightness-95"
              style={{ backgroundColor: '#D8F9B8', color: '#1D2020' }}
            >
              Scope a similar project
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </article>

      <FinalCTA variant="work" />
    </>
  );
}
