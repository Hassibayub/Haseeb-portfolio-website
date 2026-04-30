export type ServiceDetail = {
  slug: string;
  eyebrow: string;
  headline: string;
  positioningLine: string;
  body: [string, string];
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
    eyebrow: 'AI SAAS MVPS',
    headline: 'Figma to live product in 6 to 10 weeks.',
    positioningLine: 'For founders who have raised and need to ship, not demo.',
    body: [
      "You've closed your round. Your product is validated. What you need now is a team that actually ships to production. Not a contractor who burns three months on a demo that falls apart under load.",
      'We take founders from design mockups to a live AI product: backend, frontend, AI integrations, deployment, observability. One accountable technical lead. A five-person senior team. Working demo every Friday.',
    ],
    included: [
      'Architecture call and technical scoping document',
      'Full-stack build (Next.js, Python, Node)',
      'AI integration (LLM, agents, voice, RAG)',
      'Production deployment on AWS or GCP with CI/CD',
      'Observability, logs, error tracking',
      '30 days of bug-fix support post-launch',
    ],
    typicalEngagement: {
      priceRange: '$15,000 to $50,000 fixed',
      duration: '6 to 10 weeks',
    },
    proofChips: [
      { slug: 'aphra', label: 'aphra.me', metric: '17K users' },
      { slug: 'tula', label: 'tula', metric: '$1.2M raised' },
      { slug: 'kcnl', label: 'kcnl', metric: '10K companies' },
    ],
  },
  {
    slug: 'ai-agents',
    eyebrow: 'AI AGENTS',
    headline: 'Agents that run for hours, not demos that run for minutes.',
    positioningLine: 'LangChain, LangGraph, CrewAI. Production orchestration, not toy loops.',
    body: [
      'Most "AI agent" projects fail because they are demos dressed up as systems. Three prompts, a vector store, a screenshot for the pitch deck. Nothing that survives first contact with real data or real users.',
      'We build agents that run autonomously for hours, tolerate failure, and report back with receipts. Structured tool use. Retry and fallback logic. Observability. Clear stop conditions. The Capwell agent replaced a six-month manual research job with a three-week autonomous run.',
    ],
    included: [
      'Agent architecture (single or multi-agent) with explicit stop conditions',
      'Tool integration (search, DB, APIs, code execution)',
      'Structured output (JSON schema, guardrails)',
      'Observability (LangSmith, tracing, cost tracking)',
      'Failure modes and retry strategy, documented',
      'Integration into your existing product or pipeline',
    ],
    typicalEngagement: {
      priceRange: '$12,000 to $35,000 fixed',
      duration: '4 to 8 weeks',
    },
    proofChips: [
      { slug: 'capwell', label: 'capwell', metric: '6mo to 3wk' },
      { slug: 'kcnl', label: 'kcnl', metric: '10K companies crawled' },
    ],
  },
  {
    slug: 'voice-ai',
    eyebrow: 'VOICE AI',
    headline: 'Voice agents that close calls, not end them.',
    positioningLine: 'HIPAA-compliant. Sub-second latency. Sounds human enough to work.',
    body: [
      'Most voice bots fail because latency kills the illusion. A 2.5 second pause after the user speaks and they know. Once they know, they are done.',
      'We build real-time speech pipelines that hold sub-second turn latency end to end. STT, LLM, TTS, telephony. HIPAA-compliant deployments for healthcare. Observability on every call. We have shipped voice agents that qualify leads, book appointments, and handle tier-1 support without escalation.',
    ],
    included: [
      'Low-latency STT to LLM to TTS pipeline (Deepgram, ElevenLabs, OpenAI)',
      'Telephony integration (Twilio, Vonage) or web SDK',
      'HIPAA-ready deployment if required',
      'Conversation state, interruption handling, barge-in',
      'Call logs, transcripts, analytics',
      'QA harness and voice quality testing',
    ],
    typicalEngagement: {
      priceRange: '$10,000 to $30,000 fixed',
      duration: '4 to 8 weeks',
    },
    proofChips: [
      { slug: 'tula', label: 'tula', metric: '2.4K calls' },
      { slug: 'fcs', label: 'fcs', metric: '68K leads handled' },
    ],
  },
  {
    slug: 'llm-cost-optimization',
    eyebrow: 'LLM COST OPTIMIZATION',
    headline: 'We cut a $100K per month LLM bill to $1,500.',
    positioningLine: 'Hybrid stacks. Open-source models where they win. Audit trail for every token.',
    body: [
      'LLM bills balloon because teams default to the most expensive model for every task. A $0.06 per request call when a $0.0004 call would do. Multiply by a million requests per month and the bill runs the company.',
      'We audit your stack, build a hybrid pipeline (frontier model for hard tasks, open-source for the 80% that do not need it), and route traffic by task. One GDPR-compliant client went from $100K per month to $1.5K per month with full audit trail and improved latency.',
    ],
    included: [
      'Full stack audit and per-request cost breakdown',
      'Task classification and routing layer (hard vs. easy requests)',
      'Open-source model deployment (Llama, Qwen, or Mistral) on your infra',
      'Caching, prompt compression, and streaming optimization',
      'GDPR, SOC 2, or HIPAA compliance review if required',
      'Before and after cost dashboard',
    ],
    typicalEngagement: {
      priceRange: '$8,000 to $25,000 fixed',
      duration: '3 to 6 weeks',
    },
    proofChips: [
      { slug: 'kcnl', label: 'client_redacted', metric: '$100K to $1.5K' },
      { slug: 'kcnl', label: 'kcnl', metric: '70% latency cut' },
    ],
  },
  {
    slug: 'ai-automation',
    eyebrow: 'AI WORKFLOW AUTOMATION',
    headline: 'Pipelines that run your business while you sleep.',
    positioningLine: 'GoHighLevel, HubSpot, WhatsApp, CRM integrations. End-to-end, not Zapier-fragile.',
    body: [
      'Most automation breaks the first time a field changes upstream. Zapier chains fall over. Teams go back to doing the work by hand and pretend the automation still works.',
      'We build automation that is audited, versioned, monitored, and maintained. Lead enrichment, qualification, CRM writes, customer messaging, internal ops. FCS runs an autonomous pipeline handling 2,000+ users and 68,000 leads with no human in the loop.',
    ],
    included: [
      'Workflow design (swim-lane diagram, failure modes mapped)',
      'Integration layer (CRM, messaging, storage, internal APIs)',
      'AI components (classification, extraction, generation)',
      'Error handling, alerting, and retry logic',
      'Admin dashboard and audit logs',
      'Handoff doc and team training',
    ],
    typicalEngagement: {
      priceRange: '$10,000 to $30,000 fixed',
      duration: '4 to 8 weeks',
    },
    proofChips: [
      { slug: 'fcs', label: 'fcs', metric: '68K leads' },
      { slug: 'fcs', label: 'client_redacted', metric: '2K users automated' },
    ],
  },
  {
    slug: 'senior-fullstack',
    eyebrow: 'SENIOR FULL-STACK',
    headline: 'The senior team you hire when the AI part is not the whole job.',
    positioningLine: 'Next.js, Python, Node, Go. PlayStation-scale experience. The app around the AI, done right.',
    body: [
      'AI features do not ship by themselves. They live inside a product with auth, billing, dashboards, roles, notifications, and reliability SLAs. That product has to be built and maintained by people who have done it before.',
      "We've shipped web at PlayStation scale and SaaS products to 17,000 active users. When your AI work needs a senior team around it (or when you just need senior engineering without the AI label) we are a fit.",
    ],
    included: [
      'Product architecture and tech selection',
      'Next.js, Python, Node, or Go implementation',
      'Auth, billing, RBAC, multi-tenancy',
      'Admin, dashboards, analytics, webhooks',
      'CI/CD, infra, monitoring, on-call runbook',
      'Documentation and team handoff',
    ],
    typicalEngagement: {
      priceRange: '$15,000 to $50,000 fixed',
      duration: '6 to 12 weeks',
    },
    proofChips: [
      { slug: 'aphra', label: 'aphra', metric: '17K users' },
      { slug: 'sony-playstation', label: 'sony', metric: 'enterprise scale' },
      { slug: 'kcnl', label: 'kcnl', metric: '10K companies' },
    ],
  },
];
