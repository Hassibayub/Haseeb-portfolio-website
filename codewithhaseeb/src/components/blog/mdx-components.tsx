import Image from 'next/image';
import Link from 'next/link';
import { getCaseStudy } from '@/lib/case-studies-meta';

/* ─── Callout ─────────────────────────────────────────────────────── */

interface CalloutProps {
  type?: 'note' | 'warning' | 'insight';
  title?: string;
  children: React.ReactNode;
}

export function Callout({ type = 'note', title, children }: CalloutProps) {
  return (
    <div
      className="my-10 p-6 rounded-xl"
      style={{
        backgroundColor: '#FFFFFF',
        border: type === 'insight' ? '1px solid #E7E6E4' : '1px solid #E7E6E4',
        borderLeft: type === 'insight' ? '4px solid #D8F9B8' : '1px solid #E7E6E4',
      }}
    >
      {title && (
        <p
          className="font-body font-medium mb-2"
          style={{ fontSize: 15, color: '#1D2020' }}
        >
          {title}
        </p>
      )}
      <div className="font-body" style={{ fontSize: 16, color: '#3A3C3C', lineHeight: 1.6 }}>
        {children}
      </div>
    </div>
  );
}

/* ─── StatFigure ──────────────────────────────────────────────────── */

interface StatFigureProps {
  value: string;
  label: string;
}

export function StatFigure({ value, label }: StatFigureProps) {
  return (
    <div className="my-10 py-8 text-center">
      <div
        className="font-body font-medium leading-[1]"
        style={{
          fontSize: 'clamp(48px, 6vw, 72px)',
          letterSpacing: '-0.03em',
          color: '#1D2020',
        }}
      >
        {value}
      </div>
      <p
        className="font-body mt-3"
        style={{ fontSize: 15, color: '#8C8C8C', letterSpacing: '0.02em' }}
      >
        {label}
      </p>
    </div>
  );
}

/* ─── CaseStudyInline ─────────────────────────────────────────────── */

interface CaseStudyInlineProps {
  slug: string;
}

export function CaseStudyInline({ slug }: CaseStudyInlineProps) {
  const cs = getCaseStudy(slug);
  if (!cs) return null;

  const firstMetric = cs.metrics[0];

  return (
    <Link
      href={`/work/${slug}`}
      className="my-8 flex items-center gap-4 p-5 rounded-xl group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2020] focus-visible:ring-offset-2 transition-all hover:border-[#1D2020]"
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E7E6E4',
        display: 'flex',
      }}
    >
      <div className="grow min-w-0">
        <p
          className="font-mono text-[11px] tracking-[0.08em] lowercase"
          style={{ color: '#8C8C8C' }}
        >
          case study
        </p>
        <p
          className="font-body font-medium mt-1 line-clamp-1"
          style={{ fontSize: 15, color: '#1D2020' }}
        >
          {cs.title}
        </p>
      </div>
      {firstMetric && (
        <div className="shrink-0 text-right">
          <p
            className="font-body font-medium"
            style={{ fontSize: 18, color: '#1D2020' }}
          >
            {firstMetric.value}
          </p>
          <p
            className="font-body"
            style={{ fontSize: 12, color: '#8C8C8C' }}
          >
            {firstMetric.label}
          </p>
        </div>
      )}
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="shrink-0 opacity-40 group-hover:opacity-100 transition-opacity"
        aria-hidden
      >
        <path d="M3 8H13M8 3L13 8L8 13" stroke="#1D2020" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}

/* ─── Figure ──────────────────────────────────────────────────────── */

interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
}

export function Figure({ src, alt, caption, credit }: FigureProps) {
  return (
    <figure className="my-10">
      <div className="relative rounded-xl overflow-hidden">
        <Image
          src={src}
          alt={alt}
          width={680}
          height={440}
          className="w-full h-auto"
          sizes="(min-width: 768px) 680px, 100vw"
        />
      </div>
      {(caption || credit) && (
        <figcaption
          className="font-body italic mt-2"
          style={{ fontSize: 13, color: '#8C8C8C' }}
        >
          {caption}
          {credit && caption && ' '}
          {credit && <span>Credit: {credit}</span>}
        </figcaption>
      )}
    </figure>
  );
}

/* ─── Quote ───────────────────────────────────────────────────────── */

interface QuoteProps {
  attribution: string;
  children: React.ReactNode;
}

export function Quote({ attribution, children }: QuoteProps) {
  return (
    <figure className="my-10">
      <blockquote
        className="font-body italic leading-[1.5]"
        style={{
          fontSize: 22,
          color: '#1D2020',
          borderLeft: '4px solid #D8F9B8',
          paddingLeft: 24,
          margin: 0,
        }}
      >
        {children}
      </blockquote>
      {attribution && (
        <figcaption
          className="font-body mt-4"
          style={{ fontSize: 14, color: '#8C8C8C', paddingLeft: 28 }}
        >
          {attribution}
        </figcaption>
      )}
    </figure>
  );
}

/* ─── Aside ───────────────────────────────────────────────────────── */

interface AsideProps {
  children: React.ReactNode;
}

export function Aside({ children }: AsideProps) {
  return (
    <aside
      className="font-body italic my-8 pl-6"
      style={{
        fontSize: 16,
        color: '#5A5C5C',
        lineHeight: 1.6,
        borderLeft: '2px solid #E7E6E4',
      }}
    >
      {children}
    </aside>
  );
}

/* ─── Component map for MDX ────────────────────────────────────────── */

export const mdxComponents = {
  Callout,
  StatFigure,
  CaseStudyInline,
  Figure,
  Quote,
  Aside,
};
