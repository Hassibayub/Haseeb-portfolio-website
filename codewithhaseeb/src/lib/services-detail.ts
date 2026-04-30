export type ServiceDetail = {
  slug: string;
  eyebrow: string;
  headline: string;
  positioningLine: string;
  included: string[];
  typicalEngagement: {
    priceRange: string;
    duration: string;
  };
  proofChips: {
    slug: string;
    label: string;
    metric: string;
  }[];
};

export const servicesDetail: ServiceDetail[] = [
  {
    slug: 'ai-saas-mvp',
    eyebrow: 'ai saas mvps',
    headline: 'Figma to live product in 6 to 10 weeks.',
    positioningLine: 'For founders who have raised and need to ship, not demo.',
    included: [
      'Architecture call and scoping document',
      'Full build: Next.js, Python, AI, deployment',
      'Weekly demo on Friday. You approve before we continue.',
      '30 days of post-launch bug support',
    ],
    typicalEngagement: {
      priceRange: '$15,000 to $50,000 fixed',
      duration: '6 to 10 weeks',
    },
    proofChips: [
      { slug: 'aphra', label: 'Aphra.me', metric: '17K users' },
      { slug: 'tula', label: 'Tula', metric: '$1.2M raised' },
      { slug: 'kcnl', label: 'KCNL', metric: '10K companies' },
    ],
  },
  {
    slug: 'ai-agents',
    eyebrow: 'ai agents',
    headline: 'Agents that run for hours, not demos that run for minutes.',
    positioningLine: 'LangChain, LangGraph, CrewAI. Production orchestration, not toy loops.',
    included: [
      'Agent architecture with explicit stop conditions',
      'Tool integration (search, DB, APIs, code execution)',
      'Observability, retries, failure modes documented',
      'Integration into your existing product or pipeline',
    ],
    typicalEngagement: {
      priceRange: '$12,000 to $35,000 fixed',
      duration: '4 to 8 weeks',
    },
    proofChips: [
      { slug: 'capwell', label: 'Capwell', metric: '6mo to 3wk' },
      { slug: 'kcnl', label: 'KCNL', metric: '10K companies' },
    ],
  },
  {
    slug: 'voice-ai',
    eyebrow: 'voice ai',
    headline: 'Voice agents that close calls, not end them.',
    positioningLine: 'HIPAA-compliant. Sub-second latency. Sounds human enough to work.',
    included: [
      'Low-latency STT to LLM to TTS pipeline (Deepgram, ElevenLabs, OpenAI)',
      'Telephony (Twilio, Vonage) or web SDK',
      'HIPAA-ready deployment if required',
      'Call logs, transcripts, QA harness',
    ],
    typicalEngagement: {
      priceRange: '$10,000 to $30,000 fixed',
      duration: '4 to 8 weeks',
    },
    proofChips: [
      { slug: 'tula', label: 'Tula', metric: '2.4K calls' },
      { slug: 'fcs', label: 'FCS', metric: '68K leads handled' },
    ],
  },
  {
    slug: 'llm-cost-optimization',
    eyebrow: 'llm cost optimization',
    headline: 'We cut a $100K per month LLM bill to $1,500.',
    positioningLine: 'Hybrid stacks. Open-source where it wins. Audit trail on every token.',
    included: [
      'Stack audit and per-request cost breakdown',
      'Task routing layer (frontier vs. open-source)',
      'Open-source deployment (Llama, Qwen, Mistral) on your infra',
      'Before-and-after cost dashboard',
    ],
    typicalEngagement: {
      priceRange: '$8,000 to $25,000 fixed',
      duration: '3 to 6 weeks',
    },
    proofChips: [
      { slug: 'kcnl-cost', label: 'KCNL', metric: '$100K to $1.5K/mo' },
      { slug: 'kcnl-latency', label: 'KCNL', metric: '70% latency cut' },
    ],
  },
  {
    slug: 'ai-automation',
    eyebrow: 'ai workflow automation',
    headline: 'Pipelines that run your business while you sleep.',
    positioningLine: 'GoHighLevel, HubSpot, WhatsApp, CRM integrations. End-to-end, not Zapier-fragile.',
    included: [
      'Workflow design with failure modes mapped',
      'Integration layer (CRM, messaging, storage, internal APIs)',
      'AI components (classification, extraction, generation)',
      'Admin dashboard, alerting, audit logs',
    ],
    typicalEngagement: {
      priceRange: '$10,000 to $30,000 fixed',
      duration: '4 to 8 weeks',
    },
    proofChips: [
      { slug: 'fcs', label: 'FCS', metric: '68K leads' },
      { slug: 'aphra', label: 'Aphra', metric: '2K users automated' },
    ],
  },
  {
    slug: 'senior-fullstack',
    eyebrow: 'senior full-stack',
    headline: 'When the AI part is not the whole job.',
    positioningLine: 'Next.js, Python, Node, Go. The app around the AI, done right.',
    included: [
      'Product architecture and tech selection',
      'Next.js, Python, Node, or Go implementation',
      'Auth, billing, RBAC, multi-tenancy, admin',
      'CI/CD, infra, monitoring, on-call runbook',
    ],
    typicalEngagement: {
      priceRange: '$15,000 to $50,000 fixed',
      duration: '6 to 12 weeks, or retainer',
    },
    proofChips: [
      { slug: 'aphra', label: 'Aphra', metric: '17K users' },
      { slug: 'sony-playstation', label: 'Sony', metric: 'enterprise scale' },
      { slug: 'kcnl', label: 'KCNL', metric: '10K companies' },
    ],
  },
];
