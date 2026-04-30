import type { Metadata } from 'next';
import Script from 'next/script';

import {
  AuditHero,
  AuditStakes,
  AuditValueStack,
  AuditGuarantee,
  AuditTimeline,
  AuditWhoFor,
  AuditFAQ,
  AuditFinalCTA,
} from '@/components/sections/audit';

export const metadata: Metadata = {
  title: 'AI Production Readiness Audit. $3K. 14 days. | codewithhaseeb',
  description:
    'A senior-led 14-day audit that tells you if your AI idea will survive production. Architecture doc, cost model, working spike, locked fixed-price quote. $3,000 \u2014 credited if you hire us for the build.',
  openGraph: {
    title: 'AI Production Readiness Audit. $3K. 14 days.',
    description:
      'Know if your AI idea will survive production in 14 days. $3,000. Credited if you build with us.',
    type: 'website',
  },
  alternates: { canonical: 'https://codewithhaseeb.com/audit' },
};

const auditJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'AI Production Readiness Audit',
  provider: { '@type': 'Organization', name: 'codewithhaseeb' },
  description:
    'A 14-day senior-led audit of an AI product idea: architecture document, cost model at three scales, working technical spike of the riskiest component, risk register, and a locked fixed-price build quote.',
  areaServed: 'Worldwide',
  offers: {
    '@type': 'Offer',
    price: '3000',
    priceCurrency: 'USD',
    availability: 'https://schema.org/LimitedAvailability',
  },
  url: 'https://codewithhaseeb.com/audit',
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is $3,000 really the full price?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. 50% at kickoff, 50% at delivery. If you hire us for the build within 30 days, the entire $3,000 is credited to your build invoice.',
      },
    },
    {
      '@type': 'Question',
      name: 'What if I don\u2019t hire you for the build?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You keep the full audit package, the spike repo, and the fixed-price quote. You can take the quote to any other agency.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who runs the audit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Muhammad Haseeb leads every audit personally. A senior engineer from the bench assists on the technical spike when scope requires it. No juniors, no outsourcing.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does the audit take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '14 calendar days from kickoff. If it takes longer, the audit is free.',
      },
    },
  ],
};

export default function AuditPage() {
  return (
    <>
      <Script
        id="jsonld-audit"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(auditJsonLd) }}
      />
      <Script
        id="jsonld-audit-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <AuditHero />
      <AuditStakes />
      <AuditValueStack />
      <AuditGuarantee />
      <AuditTimeline />
      <AuditWhoFor />
      <AuditFAQ />
      <AuditFinalCTA />
    </>
  );
}
