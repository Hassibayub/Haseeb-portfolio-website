'use client';

import Link from 'next/link';
import { siteConfig } from '@/lib/siteConfig';
import { resumeData } from '@/lib/resume';
import { trackEvent } from '@/lib/analytics';

export function ResumeHeader() {
  return (
    <header
      id="resume-header"
      className="pt-[96px] pb-[32px] md:pt-[160px] md:pb-[40px]"
      style={{ backgroundColor: '#F3F2F1' }}
    >
      <div className="container-tight">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left — name + summary */}
          <div className="lg:col-span-8">
            <p
              className="font-mono text-[12px] tracking-[0.08em] lowercase mb-6"
              style={{ color: '#8C8C8C' }}
            >
              resume
            </p>

            <h1
              className="font-body font-medium leading-[1.06] tracking-tight"
              style={{
                fontSize: 'clamp(44px, 6vw, 72px)',
                letterSpacing: '-0.02em',
                color: '#1D2020',
              }}
            >
              Muhammad Haseeb
            </h1>

            <p
              className="font-body leading-[1.4] mt-4"
              style={{ fontSize: 22, color: '#5A5C5C' }}
            >
              Lead AI engineer. Independent since 2020.
              <br />
              Based in Islamabad, UTC+5.
            </p>

            <p
              className="font-body leading-[1.6] mt-8"
              style={{ fontSize: 18, color: '#1D2020', maxWidth: 640 }}
            >
              {resumeData.summary}
            </p>
          </div>

          {/* Right — meta + actions */}
          <div className="lg:col-span-4 mt-2 lg:mt-0">
            <div
              className="font-mono text-[12px] tracking-[0.05em] lowercase leading-[1.8]"
              style={{ color: '#8C8C8C' }}
            >
              <p>islamabad · pakistan</p>
              <p>utc +5</p>
              <p>remote since 2020</p>
              <p>49 projects completed</p>
              <p>100% upwork job success</p>
            </div>

            <div className="flex flex-col gap-3 mt-8" data-no-print>
              {/* Primary — Calendly */}
              <Link
                href={siteConfig.links.calendly}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('resume_calendly_click', { location: 'header' })}
                className="inline-flex items-center justify-center h-[48px] px-6 rounded-full font-body font-medium text-[14px] transition-all hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2020] focus-visible:ring-offset-2"
                style={{ backgroundColor: '#D8F9B8', color: '#1D2020', border: '1px solid #1D2020' }}
              >
                Book a 30-min call
              </Link>

              {/* Secondary — PDF */}
              <a
                href="/resume.pdf"
                download
                onClick={() => trackEvent('resume_pdf_download', { location: 'header' })}
                className="inline-flex items-center justify-center h-[48px] px-6 rounded-full font-body font-medium text-[14px] transition-all hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2020] focus-visible:ring-offset-2"
                style={{ backgroundColor: '#FFFFFF', color: '#1D2020', border: '1px solid #1D2020' }}
              >
                Download PDF
              </a>

              {/* Tertiary — Email */}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                onClick={() => trackEvent('resume_email_click', { location: 'header' })}
                className="font-body text-[14px] transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2020] focus-visible:ring-offset-2"
                style={{ color: '#1D2020' }}
              >
                Email {siteConfig.contact.email}
              </a>
            </div>

            <p
              className="font-mono text-[11px] tracking-[0.08em] lowercase mt-10"
              style={{ color: '#8C8C8C' }}
            >
              last updated {resumeData.lastUpdated}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
