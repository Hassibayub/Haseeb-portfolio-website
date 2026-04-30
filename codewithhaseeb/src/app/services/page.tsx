import type { Metadata } from 'next';
import Script from 'next/script';

import { siteConfig } from '@/lib/siteConfig';
import { servicesDetail } from '@/lib/services-detail';
import {
  ServicesHero,
  ServiceBlock,
  PricingPhilosophy,
  AlsoCapableOf,
  ServicesFAQ,
} from '@/components/sections/services';
import { FinalCTA } from '@/components/sections/FinalCTA';

export const metadata: Metadata = {
  title: 'Services. AI engineering built to ship.',
  description:
    'Six sharp offers: AI SaaS MVPs, AI agents, voice AI, LLM cost optimization, AI automation, and senior full-stack. Fixed-price, 4 to 10 week engagements.',
  openGraph: {
    title: 'Services. AI engineering built to ship.',
    description:
      'Six sharp offers. Fixed-price. 4 to 10 week engagements. Trusted by YC-backed founders.',
    type: 'website',
  },
  alternates: { canonical: 'https://codewithhaseeb.com/services' },
};

const servicesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'codewithhaseeb',
  url: 'https://codewithhaseeb.com/services',
  description:
    'AI engineering team building production AI systems. Six sharp offers: AI SaaS MVPs, AI agents, voice AI, LLM cost optimization, AI automation, and senior full-stack engineering.',
  areaServed: 'Worldwide',
  serviceType: [
    'AI SaaS MVP development',
    'AI agent development',
    'Voice AI development',
    'LLM cost optimization',
    'AI workflow automation',
    'Senior full-stack engineering',
  ],
  priceRange: '$8,000 to $50,000',
  provider: { '@type': 'Organization', name: 'codewithhaseeb' },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does "fixed price" actually cover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Everything scoped in the proposal. Scope is written down, signed, and invoiced against milestones. If the brief changes, we write a change order, price it, and both sides sign before anyone starts building.',
      },
    },
    {
      '@type': 'Question',
      name: "What's the smallest engagement you'll take?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: '$8,000. Below that, the overhead of scoping, contracting, and senior engineering time does not make sense for either side.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you work with non-technical founders?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. About half our clients are non-technical. We translate between engineering and product. Weekly demos are for you, not for us.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who actually does the work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A 5-person senior team. Muhammad Haseeb is the technical lead on every engagement. Team members are hand-picked per project. No juniors on billable code.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where are you based and what hours do you work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Remote-first. Islamabad (UTC+5). We overlap 3-4 hours daily with US Eastern and 5+ hours with Europe.',
      },
    },
  ],
};

// Surface per spec §3: light, cream, light | DARK break | light, cream, light
const surfaceOrder: ('light' | 'cream')[] = [
  'light',  // 0: ai-saas-mvp
  'cream',  // 1: ai-agents
  'light',  // 2: voice-ai
  'light',  // 3: llm-cost-optimization  (resumes after dark PricingPhilosophy)
  'cream',  // 4: ai-automation
  'light',  // 5: senior-fullstack
];

export default function ServicesPage() {
  return (
    <>
      <Script
        id="jsonld-services"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(servicesJsonLd),
        }}
      />
      <Script
        id="jsonld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <ServicesHero />

      {/* Services 0–2 */}
      {servicesDetail.slice(0, 3).map((service, i) => (
        <ServiceBlock
          key={service.slug}
          service={service}
          surface={surfaceOrder[i]}
        />
      ))}

      {/* Mid-page dark break — spec §3 */}
      <PricingPhilosophy />

      {/* Services 3–5 */}
      {servicesDetail.slice(3).map((service, i) => (
        <ServiceBlock
          key={service.slug}
          service={service}
          surface={surfaceOrder[i + 3]}
        />
      ))}

      <AlsoCapableOf />
      <ServicesFAQ />
      <FinalCTA variant="services" />
    </>
  );
}
