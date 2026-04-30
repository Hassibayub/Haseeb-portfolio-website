export type CaseStudy = {
  slug: string;
  title: string;
  shortTitle: string;
  outcome: string;
  cover: string;
  coverAlt: string;
  year: string;
  category: 'ai-product' | 'ai-agents' | 'voice-ai' | 'automation' | 'full-stack' | 'llm-cost';
  metrics: { value: string; label: string }[];
  featuredOnHome: boolean;
  tier: 'flagship' | 'standard' | 'short';
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'aphra',
    title: 'Real-time AI video avatar serving 17,000+ users',
    shortTitle: 'AI video avatar, 17K users live.',
    outcome: 'Shipped from Figma to production in 9 weeks. Now serving 17,000 daily active users.',
    cover: '/images/work/aphra-cover.webp',
    coverAlt: 'Aphra.me AI video avatar interface showing real-time conversation',
    year: '2024',
    category: 'ai-product',
    metrics: [
      { value: '17K', label: 'active users' },
      { value: '9wk', label: 'to launch' },
      { value: '99.8%', label: 'uptime' },
    ],
    featuredOnHome: true,
    tier: 'flagship',
  },
  {
    slug: 'capwell',
    title: 'Autonomous multi-agent system managing 500,000 records',
    shortTitle: 'Multi-agent system, 500K records.',
    outcome: 'Replaced a 6-month manual research job with a 3-week autonomous agent run.',
    cover: '/images/work/capwell-cover.webp',
    coverAlt: 'Capwell autonomous AI agent dashboard with multi-agent orchestration',
    year: '2024',
    category: 'ai-agents',
    metrics: [
      { value: '500K', label: 'records handled' },
      { value: '6mo to 3wk', label: 'time saved' },
      { value: 'LangGraph', label: 'orchestration' },
    ],
    featuredOnHome: true,
    tier: 'flagship',
  },
  {
    slug: 'kcnl',
    title: 'Cut LLM bill from $100K/month to $1.5K/month',
    shortTitle: 'LLM bill cut 98%, $100K to $1.5K.',
    outcome: 'Hybrid open-source pipeline replaced frontier-only stack. Full audit trail, GDPR compliant.',
    cover: '/images/work/kcnl-cover.webp',
    coverAlt: 'KCNL.eu B2B invoice AI processing pipeline dashboard',
    year: '2024',
    category: 'llm-cost',
    metrics: [
      { value: '$100K to $1.5K', label: 'monthly LLM cost' },
      { value: '70%', label: 'latency reduced' },
      { value: '100K', label: 'invoices per month' },
    ],
    featuredOnHome: true,
    tier: 'flagship',
  },
  {
    slug: 'tula',
    title: 'The AI therapist platform that raised $1.2M',
    shortTitle: 'AI therapy platform, $1.2M raised.',
    outcome: 'YC Angel-backed. Full AI conversation engine and real-time voice pipeline shipped from scratch.',
    cover: '/images/work/tula-cover.webp',
    coverAlt: 'Tula Transformation AI therapy platform interface',
    year: '2024',
    category: 'ai-product',
    metrics: [
      { value: '$1.2M', label: 'raised' },
      { value: '2.4K', label: 'calls handled' },
      { value: 'YC Angel', label: 'backed' },
    ],
    featuredOnHome: false,
    tier: 'standard',
  },
  {
    slug: 'medmatch',
    title: 'HIPAA-compliant AI voice agent that sounds human',
    shortTitle: 'HIPAA voice agent, sub-second latency.',
    outcome: 'Autonomous outbound calls with full audit trail. Healthcare-compliant from day one.',
    cover: '/images/work/medmatch-cover.webp',
    coverAlt: 'Medmatch HIPAA-compliant AI voice agent call interface',
    year: '2024',
    category: 'voice-ai',
    metrics: [
      { value: '90%', label: 'reduction in manual calls' },
      { value: '<1s', label: 'turn latency' },
      { value: 'HIPAA', label: 'compliant' },
    ],
    featuredOnHome: false,
    tier: 'standard',
  },
  {
    slug: 'fcs',
    title: 'AI pipeline handling 2,000 users and 68,000 leads',
    shortTitle: 'AI automation, 68K leads pipeline.',
    outcome: 'End-to-end AI tooling inside GoHighLevel. No human in the loop for qualification, calls, and documents.',
    cover: '/images/work/fcs-cover.webp',
    coverAlt: 'Full Credit Sweep AI lead automation pipeline dashboard',
    year: '2024',
    category: 'automation',
    metrics: [
      { value: '68K', label: 'leads automated' },
      { value: '2K', label: 'active users' },
      { value: 'GHL', label: 'platform' },
    ],
    featuredOnHome: false,
    tier: 'standard',
  },
  {
    slug: 'bestinform',
    title: 'International airline ticketing platform',
    shortTitle: 'Airline ticketing, GDS integrations.',
    outcome: 'Java backend, Angular frontend, end-to-end CI/CD on VPS. Complex GDS and payment gateway integrations.',
    cover: '/images/work/bestinform-cover.webp',
    coverAlt: 'Bestinform.eu airline ticketing platform booking interface',
    year: '2023',
    category: 'full-stack',
    metrics: [
      { value: 'GDS', label: 'integrations' },
      { value: 'Java', label: 'backend' },
      { value: 'CI/CD', label: 'automated' },
    ],
    featuredOnHome: false,
    tier: 'short',
  },
  {
    slug: 'sony-playstation',
    title: '120x faster survey data pipeline at Sony PlayStation scale',
    shortTitle: 'Sony PlayStation, 120x pipeline speedup.',
    outcome: 'Rewrote core survey compilation from Python to Java. Days became one hour at 5M+ records.',
    cover: '/images/work/sony-cover.webp',
    coverAlt: 'Sony PlayStation internal survey data pipeline processing interface',
    year: '2023',
    category: 'full-stack',
    metrics: [
      { value: '120x', label: 'faster' },
      { value: '5M+', label: 'records' },
      { value: '1hr', label: 'was days' },
    ],
    featuredOnHome: false,
    tier: 'short',
  },
];

export const getCaseStudy = (slug: string): CaseStudy | undefined =>
  caseStudies.find((c) => c.slug === slug);

export const getFeaturedCaseStudies = (slugs: string[]): CaseStudy[] =>
  slugs
    .map((s) => caseStudies.find((c) => c.slug === s))
    .filter((c): c is CaseStudy => !!c);

export const getCaseStudiesByCategory = (
  category: CaseStudy['category'] | 'all'
): CaseStudy[] => {
  if (category === 'all') return caseStudies;
  return caseStudies.filter((c) => c.category === category);
};

export const categories = [
  { id: 'all' as const, label: 'All', count: caseStudies.length },
  { id: 'ai-product' as const, label: 'AI Product', count: caseStudies.filter((c) => c.category === 'ai-product').length },
  { id: 'ai-agents' as const, label: 'AI Agents', count: caseStudies.filter((c) => c.category === 'ai-agents').length },
  { id: 'voice-ai' as const, label: 'Voice AI', count: caseStudies.filter((c) => c.category === 'voice-ai').length },
  { id: 'automation' as const, label: 'Automation', count: caseStudies.filter((c) => c.category === 'automation').length },
  { id: 'full-stack' as const, label: 'Full-Stack', count: caseStudies.filter((c) => c.category === 'full-stack').length },
  { id: 'llm-cost' as const, label: 'LLM Cost', count: caseStudies.filter((c) => c.category === 'llm-cost').length },
];
