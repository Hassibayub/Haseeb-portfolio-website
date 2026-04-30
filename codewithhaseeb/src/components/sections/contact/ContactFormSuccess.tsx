'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { IconCheck } from '@tabler/icons-react';
import { siteConfig } from '@/lib/siteConfig';
import { trackEvent } from '@/lib/analytics';

interface ContactFormSuccessProps {
  firstName: string;
}

export function ContactFormSuccess({ firstName }: ContactFormSuccessProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="animate-in fade-in duration-300"
      style={{ maxWidth: 640 }}
    >
      {/* Check circle */}
      <div
        className="flex items-center justify-center rounded-full mb-8"
        style={{
          width: 80,
          height: 80,
          backgroundColor: '#D8F9B8',
        }}
      >
        <IconCheck size={40} style={{ color: '#1D2020' }} />
      </div>

      {/* Headline */}
      <h2
        className="font-body font-medium leading-[1.1] tracking-tight"
        style={{
          fontSize: 'clamp(32px, 4.5vw, 40px)',
          color: '#1D2020',
        }}
      >
        Got it. Thanks, {firstName}.
      </h2>

      {/* Body */}
      <p
        className="font-body text-[18px] leading-[1.55] mt-6"
        style={{ color: '#1D2020', maxWidth: 520 }}
      >
        I'll reply from haseeb@codewithhaseeb.com within one business day.
        If it's urgent or you'd rather just book a slot now, here are the
        direct options.
      </p>

      {/* CTAs */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4 items-start">
        <Link
          href={siteConfig.links.calendly}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-medium transition-all hover:brightness-95"
          style={{ backgroundColor: '#D8F9B8', color: '#1D2020' }}
          onClick={() => trackEvent('contact_alternative_click', { channel: 'calendly_success' })}
        >
          Book a 30-min call
          <ArrowUpRight
            size={15}
            className="opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
          />
        </Link>

        <a
          href="mailto:haseeb@codewithhaseeb.com"
          className="inline-flex items-center font-body text-[15px] font-medium underline underline-offset-4 decoration-1 transition-opacity hover:opacity-70 self-center"
          style={{ color: '#1D2020' }}
          onClick={() => trackEvent('contact_alternative_click', { channel: 'email_success' })}
        >
          Email haseeb@codewithhaseeb.com
        </a>
      </div>
    </div>
  );
}
