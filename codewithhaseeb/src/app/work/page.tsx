import type { Metadata } from 'next';
import Script from 'next/script';

import { caseStudies } from '@/lib/case-studies-meta';
import { WorkHero } from '@/components/sections/work/WorkHero';
import { WorkPageClient } from './work-page-client';
import { WorkNumbers } from '@/components/sections/work/WorkNumbers';
import { FinalCTA } from '@/components/sections/FinalCTA';

export const metadata: Metadata = {
  title: "Work. Production AI systems we've shipped.",
  description:
    'Eight case studies. Real metrics. From a $100K LLM bill cut to $1,500, to an AI avatar serving 17,000 users.',
  openGraph: {
    title: 'Work. Production AI systems.',
    description: 'Eight case studies. Real metrics. No demos.',
    type: 'website',
  },
  alternates: { canonical: 'https://codewithhaseeb.com/work' },
};

const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Work — codewithhaseeb',
  url: 'https://codewithhaseeb.com/work',
  description: 'Eight production AI and full-stack engineering case studies.',
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: caseStudies.map((cs, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://codewithhaseeb.com/work/${cs.slug}`,
      name: cs.title,
    })),
  },
};

export default function WorkPage() {
  return (
    <>
      <Script
        id="jsonld-work"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionSchema),
        }}
      />

      <div style={{ backgroundColor: '#F3F2F1' }}>
        <WorkHero />
        <WorkPageClient />
      </div>

      <WorkNumbers />
      <FinalCTA variant="work" />
    </>
  );
}
