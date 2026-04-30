'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

const faqs = [
  {
    question: 'How quickly can you start?',
    answer:
      'Usually 1 to 3 weeks out. We take one new project per month to keep quality high. If it\'s urgent, say so in the form and we\'ll tell you honestly.',
  },
  {
    question: 'Do you work with clients outside US hours?',
    answer:
      'Yes. We\'re UTC+5 (Islamabad). We overlap 3 to 4 hours daily with US East Coast and 5+ hours with Europe. Weekly sync happens on your clock.',
  },
  {
    question: 'What\'s your minimum project size?',
    answer:
      '$5,000 for one-off builds. $8,000 for anything that needs multiple engineers. Below that we\'ll refer you to a contractor we trust.',
  },
  {
    question: 'Do you sign NDAs?',
    answer:
      "Yes, standard practice. We'll sign yours or use ours. No charge for review on standard NDAs.",
  },
  {
    question: 'How do you price?',
    answer:
      'Fixed-price for fixed-scope work (most engagements). Retainer for ongoing work, $8,000 to $15,000 per month per dedicated senior. Hourly only for advisory or small tasks.',
  },
  {
    question: 'What happens after I submit the form?',
    answer:
      "You get a reply within one business day from Haseeb. If it's a fit, we send a Calendly link for a scoping call. If not, we usually recommend another team.",
  },
];

export function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggle = (i: number) => {
    trackEvent('contact_faq_open', { question_index: i });
    setOpenIndex((prev) => (prev === i ? -1 : i));
  };

  return (
    <section
      className="py-[72px] md:py-[120px]"
      style={{ backgroundColor: '#F3F2F1' }}
    >
      <div className="container-tight">
        <div className="grid lg:grid-cols-[5fr_7fr] gap-12 lg:gap-16">

          {/* Left: heading */}
          <div>
            <p
              className="text-label mb-4"
              style={{ color: '#8C8C8C' }}
            >
              before you book
            </p>
            <h2
              className="font-body font-medium leading-[1.1] tracking-tight mb-5"
              style={{
                fontSize: 'clamp(28px, 3.5vw, 40px)',
                color: '#1D2020',
                letterSpacing: '-0.02em',
              }}
            >
              A few things to know.
            </h2>
            <p
              className="font-body text-[18px] leading-[1.5]"
              style={{ color: '#5A5C5C', maxWidth: 360 }}
            >
              If you have a question that's not here, email{' '}
              <a
                href="mailto:haseeb@codewithhaseeb.com"
                className="underline underline-offset-4 transition-opacity hover:opacity-70"
                style={{ color: '#5A5C5C' }}
              >
                haseeb@codewithhaseeb.com
              </a>
              . I reply within one business day.
            </p>
          </div>

          {/* Right: accordion */}
          <div>
            <div className="border-t" style={{ borderColor: '#E7E6E4' }}>
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="border-b"
                  style={{ borderColor: '#E7E6E4' }}
                >
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    aria-expanded={openIndex === i}
                    className="w-full flex items-center justify-between py-5 text-left font-body font-medium text-[17px] md:text-[19px] tracking-tight transition-colors"
                    style={{ color: '#1D2020' }}
                  >
                    {faq.question}
                    <ChevronDown
                      size={18}
                      className="shrink-0 ml-4 transition-transform"
                      style={{
                        color: '#5A5C5C',
                        transform:
                          openIndex === i ? 'rotate(180deg)' : 'rotate(0)',
                        transitionDuration: '280ms',
                      }}
                    />
                  </button>
                  <div
                    className="overflow-hidden"
                    style={{
                      maxHeight: openIndex === i ? 400 : 0,
                      opacity: openIndex === i ? 1 : 0,
                      transition: 'max-height 280ms cubic-bezier(0.4,0,0.2,1), opacity 200ms ease',
                    }}
                  >
                    <p
                      className="pb-5 font-body text-[16px] leading-[1.65]"
                      style={{ color: '#3A3C3C' }}
                    >
                      {faq.answer}
                    </p>
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
