'use client';

import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/lib/siteConfig';
import { trackEvent } from '@/lib/analytics';

const alternatives = [
  {
    id: 'calendly',
    title: 'Calendly',
    detail: 'Book a 30-minute scoping call.',
    cta: 'Book a call',
    href: siteConfig.links.calendly,
  },
  {
    id: 'email',
    title: 'Email',
    detail: 'haseeb@codewithhaseeb.com',
    cta: 'Send email',
    href: 'mailto:haseeb@codewithhaseeb.com?subject=Project%20enquiry',
  },
  {
    id: 'whatsapp',
    title: 'WhatsApp',
    detail: '+92 314 3543 422',
    cta: 'Open chat',
    href: 'https://wa.me/923143543422?text=Hi%20Haseeb%2C%20I%20wanted%20to%20talk%20about...',
  },
];

export function ContactAlternatives() {
  return (
    <section
      className="py-[56px] md:py-[96px]"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <div className="container-tight">
        <p
          className="text-label mb-6"
          style={{ color: '#8C8C8C' }}
        >
          or go direct
        </p>

        <h2
          className="font-body font-medium text-[26px] md:text-[32px] leading-[1.2] tracking-tight mb-10"
          style={{ color: '#1D2020', maxWidth: 560 }}
        >
          Already know what you want?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {alternatives.map((alt) => (
            <a
              key={alt.id}
              href={alt.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between rounded-2xl p-6 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2020] focus-visible:ring-offset-2"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E7E6E4',
                minHeight: 160,
              }}
              onClick={() =>
                trackEvent('contact_alternative_click', { channel: alt.id })
              }
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLElement).style.boxShadow =
                  '0 8px 24px rgba(0,0,0,0.05)';
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
                  {alt.title}
                </h3>
                <p
                  className="mt-3 font-body text-[14px] leading-[1.55]"
                  style={{ color: '#5A5C5C' }}
                >
                  {alt.detail}
                </p>
              </div>

              <div className="mt-5 flex items-center gap-1.5">
                <span
                  className="font-mono text-[12px] tracking-wide transition-all group-hover:underline underline-offset-2"
                  style={{ color: '#6D5EF3' }}
                >
                  {alt.cta}
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
