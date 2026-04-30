'use client';

import Link from 'next/link';
import { siteConfig } from '@/lib/siteConfig';
import { trackEvent } from '@/lib/analytics';

const quotes = [
  {
    body: '"Muhammad is an extremely skilled developer. I brought him a project multiple developers said wasn\'t possible. He took it on, knocked it out of the park, and met our tight deadline with ease. We will be working with him on many more projects."',
    attribution: 'Luke Blackamore',
    role: 'Founder',
    meta: 'Upwork · Senior Full Stack',
  },
  {
    body: '"Truly a genius. Would definitely work again."',
    attribution: 'Voice AI healthcare client',
    role: '',
    meta: 'Jan 2026 · Real-time voice agent',
  },
];

export function ResumeTestimonials() {
  return (
    <section
      id="testimonials"
      className="py-[72px] md:py-[112px]"
      style={{ backgroundColor: '#1D2020' }}
      data-surface="dark"
    >
      <div className="container-tight">
        <div style={{ maxWidth: 920 }}>
          {/* Header */}
          <p
            className="font-mono text-[12px] tracking-[0.08em] lowercase"
            style={{ color: '#A6A6A6' }}
          >
            what clients say
          </p>

          <h2
            className="font-body font-medium leading-[1.1] tracking-tight mt-4"
            style={{ fontSize: 40, letterSpacing: '-0.01em', color: '#F3F2F1', maxWidth: 640 }}
          >
            Two lifts. The rest are on Upwork.
          </h2>

          {/* Quote grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mt-14">
            {quotes.map((q, i) => (
              <figure
                key={q.attribution}
                className={`${i === 1 ? 'md:border-l md:pl-10' : 'md:pr-10'} pb-10 md:pb-0`}
                style={{ borderColor: '#3A3A3A' }}
              >
                <blockquote
                  className="font-body leading-[1.55]"
                  style={{ fontSize: 20, color: '#F3F2F1', fontWeight: 400 }}
                >
                  {q.body}
                </blockquote>
                <figcaption className="mt-6">
                  <p
                    className="font-body font-medium"
                    style={{ fontSize: 14, color: '#D8F9B8' }}
                  >
                    {q.attribution}
                    {q.role && `, ${q.role}`}
                  </p>
                  <p
                    className="font-body mt-1"
                    style={{ fontSize: 13, color: '#A6A6A6' }}
                  >
                    {q.meta}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-14 text-center" data-no-print>
            <p
              className="font-body"
              style={{ fontSize: 15, color: '#C4C4C4' }}
            >
              Full list of 47 reviews on Upwork.
            </p>
            <a
              href={siteConfig.links.upwork}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('resume_upwork_click', { location: 'testimonials' })}
              className="inline-block font-mono text-[12px] tracking-[0.05em] mt-3 underline underline-offset-2 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8F9B8] focus-visible:ring-offset-2"
              style={{ color: '#D8F9B8' }}
            >
              Visit Upwork profile
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
