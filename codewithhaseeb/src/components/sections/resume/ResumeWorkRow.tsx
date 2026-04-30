'use client';

import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';
import type { ResumeWorkEntry } from '@/lib/resume';

interface ResumeWorkRowProps {
  entry: ResumeWorkEntry;
  isLast: boolean;
}

export function ResumeWorkRow({ entry, isLast }: ResumeWorkRowProps) {
  return (
    <div
      className={`pt-12 ${isLast ? '' : 'pb-12 border-b'}`}
      style={{ borderColor: '#E7E6E4' }}
      data-resume-work-row
    >
      {/* Meta row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
        <p
          className="font-mono text-[12px] tracking-[0.08em] lowercase"
          style={{ color: '#8C8C8C' }}
        >
          {entry.clientMono} · {entry.category}
        </p>
        <p
          className="font-mono text-[12px] tracking-[0.08em] lowercase"
          style={{ color: '#8C8C8C' }}
        >
          {entry.dates} · {entry.role}
        </p>
      </div>

      {/* Outcome */}
      <h3
        className="font-body font-medium leading-[1.3] mt-4"
        style={{ fontSize: 22, color: '#1D2020' }}
      >
        {entry.outcome}
      </h3>

      {/* Body */}
      <p
        className="font-body leading-[1.65] mt-4"
        style={{ fontSize: 16, color: '#1D2020', maxWidth: 720 }}
      >
        {entry.body}
      </p>

      {/* Metric chips */}
      <div className="flex flex-wrap gap-2 mt-6">
        {entry.chips.map((chip) => (
          <span
            key={chip.label}
            className="inline-flex items-center font-body"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E7E6E4',
              borderRadius: 6,
              padding: '4px 10px',
              fontSize: 12,
              color: '#1D2020',
            }}
          >
            {chip.label}
          </span>
        ))}
      </div>

      {/* Stack */}
      <p
        className="font-mono text-[12px] tracking-[0.03em] mt-5"
        style={{ color: '#5A5C5C' }}
      >
        {entry.stack.slice(0, 8).join(' · ')}
        {entry.stack.length > 8 && ' · and more'}
      </p>

      {/* Case study link */}
      <Link
        href={entry.caseStudyUrl}
        onClick={() => trackEvent('resume_work_click', { slug: entry.slug })}
        className="inline-block font-body font-medium mt-6 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2020] focus-visible:ring-offset-2"
        style={{
          fontSize: 14,
          color: '#1D2020',
          textDecoration: 'underline',
          textDecorationColor: '#D8F9B8',
          textDecorationThickness: 2,
          textUnderlineOffset: 4,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.textDecorationThickness = '3px';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.textDecorationThickness = '2px';
        }}
      >
        Read the case study
      </Link>
    </div>
  );
}
