'use client';

import Link from 'next/link';
import { resumeData } from '@/lib/resume';
import { trackEvent } from '@/lib/analytics';

export function ResumeAtAGlance() {
  return (
    <section
      id="at-a-glance"
      className="pb-[40px] md:pb-[56px]"
      style={{ backgroundColor: '#F3F2F1' }}
    >
      <div className="container-tight">
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10"
          style={{ borderTop: '1px solid #E7E6E4', paddingTop: 40 }}
        >
          {resumeData.glance.map((stat) => (
            <Link
              key={stat.href}
              href={stat.href}
              onClick={() =>
                trackEvent('resume_glance_click', { slug: stat.href.replace('/work/', '') })
              }
              className="group block min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2020] focus-visible:ring-offset-2"
              style={{ transition: 'transform 200ms ease-out' }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.transform = 'translateY(0)')
              }
              aria-label={`${stat.value} — ${stat.label}`}
            >
              <div
                className="font-body font-medium leading-[1.1] truncate"
                style={{ fontSize: 'clamp(24px, 2.8vw, 40px)', letterSpacing: '-0.02em', color: '#1D2020' }}
              >
                {stat.value}
              </div>
              <p
                className="font-body leading-[1.4] mt-2"
                style={{ fontSize: 14, color: '#5A5C5C' }}
              >
                {stat.label}
              </p>
              <p
                className="font-mono text-[11px] mt-1 underline underline-offset-2 group-hover:opacity-80 transition-opacity"
                style={{ color: '#6D5EF3' }}
              >
                {stat.href}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
