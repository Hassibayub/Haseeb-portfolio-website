'use client';

import Link from 'next/link';
import { siteConfig } from '@/lib/siteConfig';
import { trackEvent } from '@/lib/analytics';

const contactCards = [
  {
    id: 'call',
    title: 'Book a call',
    body: '30 minutes, free, zero pressure.',
    cta: 'Visit Calendly',
    href: () => siteConfig.links.calendly,
    external: true,
    download: false,
    event: () => trackEvent('resume_calendly_click', { location: 'contact' }),
  },
  {
    id: 'email',
    title: 'Email',
    body: siteConfig.contact.email,
    cta: 'Send email',
    href: () => `mailto:${siteConfig.contact.email}`,
    external: false,
    download: false,
    event: () => trackEvent('resume_email_click', { location: 'contact' }),
  },
  {
    id: 'whatsapp',
    title: 'Message',
    body: `${siteConfig.contact.phone}\nWhatsApp preferred`,
    cta: 'Open chat',
    href: () => `https://wa.me/923143543422?text=Hi%20Haseeb%2C`,
    external: true,
    download: false,
    event: () => trackEvent('resume_whatsapp_click', {}),
  },
];

const secondaryLinks = [
  {
    label: 'linkedin',
    href: siteConfig.links.linkedin,
    external: true,
    event: () => trackEvent('resume_linkedin_click', {}),
  },
  {
    label: 'upwork',
    href: siteConfig.links.upwork,
    external: true,
    event: () => trackEvent('resume_upwork_click', { location: 'contact' }),
  },
  {
    label: 'github',
    href: siteConfig.links.github,
    external: true,
    event: () => trackEvent('resume_github_click', {}),
  },
  {
    label: 'download pdf',
    href: '/resume.pdf',
    external: false,
    download: true,
    event: () => trackEvent('resume_pdf_download', { location: 'contact' }),
  },
];

export function ResumeContact() {
  return (
    <section
      id="contact"
      className="py-[64px] md:py-[96px]"
      style={{ backgroundColor: '#F3F2F1' }}
    >
      <div className="container-tight">
        <div style={{ maxWidth: 720 }}>
          <p
            className="font-mono text-[12px] tracking-[0.08em] lowercase"
            style={{ color: '#8C8C8C' }}
          >
            get in touch
          </p>

          <h2
            className="font-body font-medium mt-4"
            style={{ fontSize: 36, color: '#1D2020' }}
          >
            Three ways to reach me.
          </h2>

          {/* 3 contact cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {contactCards.map((card) => (
              <a
                key={card.id}
                href={card.href()}
                target={card.external ? '_blank' : undefined}
                rel={card.external ? 'noopener noreferrer' : undefined}
                onClick={card.event}
                className="group flex flex-col justify-between rounded-2xl p-6 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2020] focus-visible:ring-offset-2"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E7E6E4',
                  minHeight: 160,
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
                  <p
                    className="font-body font-medium"
                    style={{ fontSize: 16, color: '#1D2020' }}
                  >
                    {card.title}
                  </p>
                  <p
                    className="font-body mt-2 leading-[1.5] whitespace-pre-line"
                    style={{ fontSize: 14, color: '#5A5C5C' }}
                  >
                    {card.body}
                  </p>
                </div>
                <p
                  className="font-mono text-[12px] tracking-wide mt-5 underline underline-offset-2 group-hover:opacity-70 transition-opacity"
                  style={{ color: '#6D5EF3' }}
                >
                  {card.cta}
                </p>
              </a>
            ))}
          </div>

          {/* Secondary row */}
          <div
            className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-10 font-mono text-[12px] tracking-[0.05em] lowercase"
            style={{ color: '#8C8C8C' }}
          >
            {secondaryLinks.map((link, i) => (
              <span key={link.label} className="flex items-center gap-4">
                {i > 0 && <span aria-hidden style={{ color: '#C4C4C4' }}>·</span>}
                <a
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  download={'download' in link && link.download ? '' : undefined}
                  onClick={link.event}
                  className="transition-colors hover:text-[#1D2020] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2020] focus-visible:ring-offset-1"
                >
                  {link.label}
                </a>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
