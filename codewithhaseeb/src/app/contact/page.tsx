import type { Metadata } from 'next';
import Script from 'next/script';
import { Suspense } from 'react';

import { ContactHero } from '@/components/sections/contact/ContactHero';
import { ContactForm } from '@/components/sections/contact/ContactForm';
import { ContactAlternatives } from '@/components/sections/contact/ContactAlternatives';
import { ContactFAQ } from '@/components/sections/contact/ContactFAQ';

export const metadata: Metadata = {
  title: "Contact. Tell us what you're building.",
  description:
    "Four questions. 60 seconds. If we're a fit, we'll send you a scoping-call link within a business day. If we're not, we'll tell you who is.",
  openGraph: {
    title: 'Contact codewithhaseeb.',
    description: "Tell us what you're building. We'll reply within a business day.",
    type: 'website',
  },
  alternates: { canonical: 'https://codewithhaseeb.com/contact' },
  robots: { index: true, follow: true },
};

const faqs = [
  {
    question: 'How quickly can you start?',
    answer:
      "Usually 1 to 3 weeks out. We take one new project per month to keep quality high. If it's urgent, say so in the form and we'll tell you honestly.",
  },
  {
    question: 'Do you work with clients outside US hours?',
    answer:
      "Yes. We're UTC+5 (Islamabad). We overlap 3 to 4 hours daily with US East Coast and 5+ hours with Europe. Weekly sync happens on your clock.",
  },
  {
    question: "What's your minimum project size?",
    answer:
      "$5,000 for one-off builds. $8,000 for anything that needs multiple engineers. Below that we'll refer you to a contractor we trust.",
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

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  url: 'https://codewithhaseeb.com/contact',
  name: 'Contact — codewithhaseeb',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'haseeb@codewithhaseeb.com',
    },
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: '+92 314 3543 422',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
};

export default function ContactPage() {
  return (
    <>
      <Script
        id="jsonld-contact"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <Script
        id="jsonld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div style={{ backgroundColor: '#F3F2F1' }}>
        <ContactHero />
        <Suspense fallback={null}>
          <ContactForm />
        </Suspense>
      </div>
      <ContactAlternatives />
      <ContactFAQ />
    </>
  );
}
