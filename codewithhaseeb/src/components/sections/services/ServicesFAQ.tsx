'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

import { siteConfig } from '@/lib/siteConfig';
import { trackEvent } from '@/lib/analytics';

const faqs = [
  {
    question: 'What does "fixed price" actually cover?',
    answer:
      'Everything in the signed proposal. Scope changes get a written change order before work continues. You never see a revised invoice in your inbox.',
  },
  {
    question: "What's the smallest engagement you'll take?",
    answer:
      '$8,000. Below that, the overhead of scoping and senior engineering time does not work for either side. We will refer you to a contractor we trust.',
  },
  {
    question: 'Do you work with non-technical founders?',
    answer:
      'Yes. About half our clients are non-technical. Weekly demos are for you, not for us.',
  },
  {
    question: 'Who actually does the work?',
    answer:
      'A 5-person senior team. Muhammad Haseeb is the technical lead on every engagement. No juniors on billable code. No subcontractors you do not know about.',
  },
  {
    question: 'Where are you based?',
    answer:
      'Islamabad, UTC+5. We overlap 3-4 hours daily with US Eastern, 5+ hours with Europe. Weekly sync runs on your clock.',
  },
];

export function ServicesFAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggle = (i: number) => {
    trackEvent('services_faq_open', { question_index: i });
    setOpenIndex((prev) => (prev === i ? -1 : i));
  };

  return (
    <section
      className="py-[72px] md:py-[112px]"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <div className="container-tight">
        <div className="grid lg:grid-cols-[5fr_7fr] gap-12 lg:gap-16">

          {/* Left: heading */}
          <div>
            <p className="text-label mb-4" style={{ color: '#8C8C8C' }}>
              frequently asked
            </p>
            <h2
              className="font-body font-medium leading-[1.08] tracking-tight mb-5"
              style={{
                fontSize: 'clamp(32px, 4vw, 48px)',
                color: '#1D2020',
                letterSpacing: '-0.02em',
              }}
            >
              Five things founders ask before they sign.
            </h2>
            <p
              className="font-body text-[18px] leading-[1.5]"
              style={{ color: '#5A5C5C' }}
            >
              Not here? Email{' '}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="underline underline-offset-4 transition-colors hover:text-[#7C3AED]"
                style={{ color: '#5A5C5C' }}
              >
                {siteConfig.contact.email}
              </a>
              . A human replies within a business day.
            </p>
          </div>

          {/* Right: accordion */}
          <div>
            <div className="border-t">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="border-b border-[#E7E6E4]"
                >
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    className="w-full flex items-center justify-between py-5 text-left font-body font-medium text-[18px] md:text-[20px] tracking-tight transition-colors"
                    style={{ color: '#1D2020' }}
                    aria-expanded={openIndex === i}
                  >
                    {faq.question}
                    <ChevronDown
                      size={18}
                      className="shrink-0 ml-4 transition-transform duration-280"
                      style={{
                        color: '#5A5C5C',
                        transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0)',
                      }}
                    />
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-280"
                    style={{
                      maxHeight: openIndex === i ? '300px' : '0',
                      opacity: openIndex === i ? 1 : 0,
                    }}
                  >
                    <div className="pb-5 font-body text-[16px] leading-[1.65]">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
