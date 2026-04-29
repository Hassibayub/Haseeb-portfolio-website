export type CaseStudySummary = {
  slug: string;
  client: string;
  clientLabel: string;
  title: string;
  description: string;
  stats: string[];
  cover: string;
  order: number;
};

export const caseStudies: CaseStudySummary[] = [
  {
    slug: 'aphra',
    client: 'Aphra.me',
    clientLabel: 'APHRA.ME',
    title: 'Real-time AI video avatar serving 17,000+ users',
    description: 'Built the entire AI backend, agents, and live voice pipeline.',
    stats: ['17K+ users', '<1s latency', 'NextJS + Python'],
    cover: '/images/work/aphra-cover.webp',
    order: 1,
  },
  {
    slug: 'capwell',
    client: 'Capwell Communications',
    clientLabel: 'CAPWELL COMMUNICATIONS',
    title: 'Autonomous multi-agent system managing 500,000 records',
    description: 'Replaced a 6-month manual process with an AI agent orchestrator.',
    stats: ['500K records', '6mo to 3wks', 'LangChain'],
    cover: '/images/work/capwell-cover.webp',
    order: 2,
  },
  {
    slug: 'kcnl',
    client: 'KCNL.eu',
    clientLabel: 'KCNL.EU',
    title: 'B2B invoice AI that saved a client $98.5K/month on LLM bills',
    description: 'Hybrid open-source + fine-tuned models. GDPR compliant, audit trail.',
    stats: ['10K companies', '$100K to $1.5K/mo', '100K invoices/mo'],
    cover: '/images/work/kcnl-cover.webp',
    order: 3,
  },
  {
    slug: 'tula',
    client: 'Tula Transformation',
    clientLabel: 'TULA TRANSFORMATION',
    title: 'The AI therapist platform that raised $1.2M',
    description: 'YC Angel-backed. Full AI conversation engine + real-time voice.',
    stats: ['$1.2M raised', 'YC Angel', 'FastAPI + Gemini'],
    cover: '/images/work/tula-cover.webp',
    order: 4,
  },
  {
    slug: 'medmatch',
    client: 'Medmatch',
    clientLabel: 'MEDMATCH',
    title: 'HIPAA-compliant AI voice agent that sounds human',
    description: 'Autonomous outbound calls with full audit trail and compliance.',
    stats: ['90% reduction', 'Sub-second', 'HIPAA'],
    cover: '/images/work/medmatch-cover.webp',
    order: 5,
  },
  {
    slug: 'fcs',
    client: 'Full Credit Sweep',
    clientLabel: 'FCS',
    title: 'AI pipeline handling 2,000 active users and 68,000 leads',
    description:
      'End-to-end AI tooling inside GoHighLevel: calls, messages, documents, dashboard.',
    stats: ['68K leads', '2K active users', 'GoHighLevel'],
    cover: '/images/work/fcs-cover.webp',
    order: 6,
  },
  {
    slug: 'bestinform',
    client: 'Bestinform.eu',
    clientLabel: 'BESTINFORM.EU',
    title: 'International airline ticketing platform',
    description: 'Java + Angular with GDS integrations, payment gateways, full CI/CD.',
    stats: ['GDS integrations', 'Java + Angular', 'Full CI/CD'],
    cover: '/images/work/bestinform-cover.webp',
    order: 7,
  },
  {
    slug: 'sony-playstation',
    client: 'Sony PlayStation',
    clientLabel: 'SONY PLAYSTATION',
    title: '120× faster survey data pipeline at scale',
    description: 'Rewrote performance-critical paths. Days became ~1 hour at 5M+ records.',
    stats: ['120× faster', '5M+ records', 'Python + Java'],
    cover: '/images/work/sony-cover.webp',
    order: 8,
  },
];

export const getCaseStudy = (slug: string): CaseStudySummary | undefined =>
  caseStudies.find((c) => c.slug === slug);

export const getFeaturedCaseStudies = (slugs: string[]): CaseStudySummary[] =>
  slugs
    .map((s) => caseStudies.find((c) => c.slug === s))
    .filter((c): c is CaseStudySummary => !!c);
