'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'Is $3,000 really the full price?',
    a: 'Yes. Flat, fixed, no surprise add-ons. You pay 50% at kickoff, 50% at delivery. If you hire us for the build within 30 days, the entire $3,000 is credited against your build invoice \u2014 so the audit ends up free.',
  },
  {
    q: 'Why only $3,000 when you\u2019d charge $11,000 worth of work?',
    a: 'Two reasons. First, it filters out tire-kickers \u2014 anyone paying $3K is serious. Second, about 60% of audits convert to full builds, so treating this as a paid first step beats doing it for free. You get the rigour; we get a qualified lead.',
  },
  {
    q: 'What if I don\u2019t hire you for the build?',
    a: 'You walk with the full audit package, the spike repo (yours to keep), and a fixed-price quote you can shop to any other agency. Several clients have used our audit doc to negotiate 30\u201350% off competitor quotes. That\u2019s fine. The audit paid for itself.',
  },
  {
    q: 'Can I see a sample audit deliverable?',
    a: 'Yes \u2014 we\u2019ll send a redacted sample from a past engagement during the kickoff call. Public samples aren\u2019t on the site because the real value is in client-specific details, and we don\u2019t publish those.',
  },
  {
    q: 'Who runs the audit?',
    a: 'Muhammad Haseeb leads every audit personally. A second senior engineer from the bench assists on the technical spike if the scope requires it. No juniors. No outsourcing. You meet whoever touches your code.',
  },
  {
    q: 'What if my idea is too vague to audit?',
    a: 'We\u2019ll tell you in the free 30-minute scoping call before you pay a dollar. About 1 in 4 scoping calls end with us saying \u201cnot yet, come back when X is clearer.\u201d That\u2019s a feature.',
  },
  {
    q: 'How is this different from a consulting call or a free discovery?',
    a: 'A consulting call gives you opinions. A discovery call gives you a sales pitch. This audit gives you running code, a written cost model, a risk register, and a locked fixed-price quote. One of these is actually useful.',
  },
  {
    q: 'What tech stacks do you cover?',
    a: 'Next.js, Python (FastAPI, Django), Node, Go on the app side. LangChain, LangGraph, CrewAI, raw OpenAI/Anthropic SDKs on the AI side. Deepgram, ElevenLabs, OpenAI Realtime for voice. AWS, GCP, Vercel, Fly, Modal for infra. If your stack is outside this, say so on the kickoff call \u2014 we\u2019ll be honest about fit.',
  },
];

export function AuditFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      className="py-[88px] md:py-[140px]"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <div className="container-tight max-w-[860px]">
        <p className="text-label mb-6" style={{ color: '#8C8C8C' }}>
          frequently asked
        </p>

        <h2
          className="font-body font-medium leading-[1.08] tracking-tight mb-10"
          style={{
            fontSize: 'clamp(36px, 5vw, 56px)',
            color: '#1D2020',
            letterSpacing: '-0.02em',
          }}
        >
          Eight things founders ask before they pay the $3K.
        </h2>

        <div style={{ borderTop: '1px solid #E6E6E6' }}>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} style={{ borderBottom: '1px solid #E6E6E6' }}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left transition-opacity hover:opacity-70"
                >
                  <span
                    className="font-body font-medium text-[18px] md:text-[20px] leading-[1.4]"
                    style={{ color: '#1D2020' }}
                  >
                    {faq.q}
                  </span>
                  <span
                    className="flex-shrink-0 flex items-center justify-center"
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 999,
                      backgroundColor: isOpen ? '#1D2020' : '#F3F2F1',
                      color: isOpen ? '#D8F9B8' : '#1D2020',
                    }}
                  >
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>
                {isOpen && (
                  <p
                    className="pb-8 pr-12 font-body text-[16px] leading-[1.6]"
                    style={{ color: '#5A5C5C' }}
                  >
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
