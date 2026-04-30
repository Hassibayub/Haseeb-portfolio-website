'use client';

import { ArrowUpRight } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { siteConfig } from '@/lib/siteConfig';

const links = [
  {
    id: 'upwork' as const,
    title: 'Upwork',
    body: '49 projects. 100% job success score. Every review public.',
    cta: 'Visit profile',
    href: siteConfig.links.upwork,
    external: true,
  },
  {
    id: 'linkedin' as const,
    title: 'LinkedIn',
    body: 'Professional history, endorsements, and recommendations.',
    cta: 'Visit profile',
    href: siteConfig.links.linkedin,
    external: true,
  },
  {
    id: 'github' as const,
    title: 'GitHub',
    body: 'Public repos, contributions, and open work.',
    cta: 'Visit profile',
    href: siteConfig.links.github,
    external: true,
  },
  {
    id: 'resume' as const,
    title: 'Resume PDF',
    body: 'Full engineering history. Two pages.',
    cta: 'Download',
    href: '/resume.pdf',
    external: false,
    download: true,
  },
];

export function AboutElsewhere() {
  return (
    <section
      className="py-[56px] md:py-[96px]"
      style={{ backgroundColor: '#F3F2F1' }}
    >
      <div className="container-tight">
        <p
          className="text-label mb-6"
          style={{ color: '#8C8C8C' }}
        >
          find me elsewhere
        </p>

        <h2
          className="font-body font-medium text-[26px] md:text-[32px] leading-[1.2] tracking-tight mb-10"
          style={{ color: '#1D2020', maxWidth: 520 }}
        >
          If you want to verify anything, verify away.
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              download={link.download ? '' : undefined}
              onClick={() => {
                if (link.id === 'resume') {
                  trackEvent('about_resume_download', {});
                } else {
                  trackEvent('about_link_click', { target: link.id });
                }
              }}
              className="group flex flex-col justify-between rounded-2xl p-6 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2020] focus-visible:ring-offset-2"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E7E6E4',
                minHeight: 180,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.05)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = '';
                (e.currentTarget as HTMLElement).style.boxShadow = '';
              }}
            >
              <div>
                <h3
                  className="font-body font-medium text-[18px] leading-[1.25]"
                  style={{ color: '#1D2020' }}
                >
                  {link.title}
                </h3>
                <p
                  className="mt-3 font-body text-[14px] leading-[1.55]"
                  style={{ color: '#5A5C5C' }}
                >
                  {link.body}
                </p>
              </div>

              <div className="mt-5 flex items-center gap-1.5">
                <span
                  className="font-mono text-[12px] tracking-wide transition-all group-hover:underline underline-offset-2"
                  style={{ color: '#6D5EF3' }}
                >
                  {link.cta}
                </span>
                <ArrowUpRight
                  size={11}
                  className="opacity-0 -translate-x-0.5 transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0"
                  style={{ color: '#6D5EF3' }}
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
