import type { Metadata } from 'next';
import { ResumeHeader } from '@/components/sections/resume/ResumeHeader';
import { ResumeAtAGlance } from '@/components/sections/resume/ResumeAtAGlance';
import { ResumeSelectedWork } from '@/components/sections/resume/ResumeSelectedWork';
import { ResumeTimeline } from '@/components/sections/resume/ResumeTimeline';
import { ResumeSkills } from '@/components/sections/resume/ResumeSkills';
import { ResumeEducation } from '@/components/sections/resume/ResumeEducation';
import { ResumeTestimonials } from '@/components/sections/resume/ResumeTestimonials';
import { ResumeContact } from '@/components/sections/resume/ResumeContact';

export const metadata: Metadata = {
  title: 'Resume. Muhammad Haseeb, lead AI engineer. | codewithhaseeb',
  description:
    'Independent AI engineer since 2020. Shipped Aphra (17K users), Capwell (500K records), KCNL ($100K to $1,500/mo). Islamabad, UTC+5.',
  openGraph: {
    title: 'Resume. Muhammad Haseeb.',
    description: 'Independent AI engineer since 2020. 49 projects, 100% Upwork JSS.',
    type: 'profile',
    images: ['/resume/opengraph-image'],
  },
  alternates: { canonical: 'https://codewithhaseeb.com/resume' },
  robots: { index: true, follow: true },
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Muhammad Haseeb',
  jobTitle: 'Lead AI Engineer',
  url: 'https://codewithhaseeb.com/resume',
  image: 'https://codewithhaseeb.com/about/haseeb.webp',
  email: 'mailto:haseeb@codewithhaseeb.com',
  telephone: '+923143543422',
  sameAs: [
    'https://www.linkedin.com/in/haseeb-ai',
    'https://www.upwork.com/freelancers/muhammadh72',
    'https://github.com/hassibayub',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Islamabad',
    addressCountry: 'PK',
  },
  worksFor: {
    '@type': 'Organization',
    name: 'codewithhaseeb',
    url: 'https://codewithhaseeb.com',
  },
  hasOccupation: {
    '@type': 'Occupation',
    name: 'AI Engineer',
    occupationLocation: { '@type': 'City', name: 'Islamabad' },
    skills: 'Python, TypeScript, LangChain, LangGraph, voice AI, LLM cost optimization',
  },
  knowsAbout: [
    'AI engineering',
    'LangChain',
    'LangGraph',
    'LLM cost optimization',
    'voice AI',
    'multi-agent systems',
    'production AI',
    'Next.js',
    'Python',
  ],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'The Superior University',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lahore',
      addressCountry: 'PK',
    },
  },
};

export default function ResumePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <main>
        <ResumeHeader />
        <ResumeAtAGlance />
        <ResumeSelectedWork />
        <ResumeTimeline />
        <ResumeSkills />
        <ResumeEducation />
        <ResumeTestimonials />
        <ResumeContact />
      </main>
    </>
  );
}
