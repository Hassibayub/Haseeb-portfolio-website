import type { Metadata } from 'next';
import Script from 'next/script';

import { AboutHero } from '@/components/sections/about/AboutHero';
import { AboutStory } from '@/components/sections/about/AboutStory';
import { AboutPrinciples } from '@/components/sections/about/AboutPrinciples';
import { AboutHowWeWork } from '@/components/sections/about/AboutHowWeWork';
import { AboutBench } from '@/components/sections/about/AboutBench';
import { AboutElsewhere } from '@/components/sections/about/AboutElsewhere';
import { FinalCTA } from '@/components/sections/FinalCTA';

export const metadata: Metadata = {
  title: 'About. Muhammad Haseeb, lead engineer.',
  description:
    'Senior AI engineer based in Islamabad. Ex-Sony PlayStation scale, now shipping AI products for funded founders. Working with a small senior bench.',
  openGraph: {
    title: 'About. Muhammad Haseeb.',
    description:
      'Senior AI engineer. Ex-Sony PlayStation. Based in Islamabad. Small senior bench.',
    type: 'profile',
  },
  alternates: { canonical: 'https://codewithhaseeb.com/about' },
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Muhammad Haseeb',
  jobTitle: 'Lead AI Engineer',
  url: 'https://codewithhaseeb.com/about',
  image: 'https://codewithhaseeb.com/about/haseeb.webp',
  sameAs: [
    'https://www.linkedin.com/in/haseeb-ai',
    'https://www.upwork.com/freelancers/muhammadh72',
    'https://github.com/hassibayub',
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'codewithhaseeb',
    url: 'https://codewithhaseeb.com',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Islamabad',
    addressCountry: 'PK',
  },
};

export default function AboutPage() {
  return (
    <>
      <Script
        id="jsonld-about"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <AboutHero />
      <AboutStory />
      <AboutPrinciples />
      <AboutHowWeWork />
      <AboutBench />
      <AboutElsewhere />
      <FinalCTA variant="about" />
    </>
  );
}
