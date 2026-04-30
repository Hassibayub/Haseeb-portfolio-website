export type ResumeWorkEntry = {
  slug: string;
  client: string;
  clientMono: string;
  category: string;
  dates: string;
  role: string;
  outcome: string;
  body: string;
  chips: { label: string }[];
  stack: string[];
  caseStudyUrl: string;
};

export type ResumeTimelineEntry = {
  dates: string;
  role: string;
  body: string;
};

export type ResumeSkillsBlock = {
  category: string;
  groups: { label: string; items: string[] }[];
};

export type ResumeData = {
  lastUpdated: string;
  summary: string;
  glance: { value: string; label: string; href: string }[];
  work: ResumeWorkEntry[];
  timeline: ResumeTimelineEntry[];
  skills: ResumeSkillsBlock[];
  education: { degree: string; school: string; location: string; dates: string };
  testimonialIds: string[];
};

export const resumeData: ResumeData = {
  lastUpdated: 'feb 2026',

  summary:
    'I build production AI systems for funded founders and operators. I have shipped an AI avatar that serves 17,000 daily users, an agent orchestrator that handled 500,000 records for a consultancy, and a cost rewrite that cut an enterprise LLM bill from $100,000 a month to $1,500. I work with a small bench of senior engineers when scope needs more than one pair of hands.',

  glance: [
    {
      value: '17,000+',
      label: 'Daily users on Aphra.me',
      href: '/work/aphra',
    },
    {
      value: '$98.5K/month',
      label: 'Cut from an enterprise LLM bill at KCNL',
      href: '/work/kcnl',
    },
    {
      value: '500,000',
      label: 'Records handled by the Capwell agent',
      href: '/work/capwell',
    },
    {
      value: '$1.2M',
      label: 'Raised by Tula after the AI therapist shipped',
      href: '/work/tula',
    },
  ],

  work: [
    {
      slug: 'aphra',
      client: 'Aphra.me',
      clientMono: 'aphra.me',
      category: 'ai product',
      dates: '2024 to 2025',
      role: 'lead engineer',
      outcome: 'Real-time AI video avatar serving 17,000+ daily users.',
      body: 'Built the entire AI backend, agent layer, and sub-second voice pipeline. Shipped in 9 weeks from Figma to production. Next.js and Python on GCP. 99.8% uptime across the first 6 months of public use.',
      chips: [
        { label: '17K+ users' },
        { label: '<1s latency' },
        { label: '9 weeks to launch' },
      ],
      stack: ['Next.js', 'Python', 'LangChain', 'Deepgram', 'ElevenLabs', 'GCP', 'WebRTC'],
      caseStudyUrl: '/work/aphra',
    },
    {
      slug: 'kcnl',
      client: 'KCNL.eu',
      clientMono: 'kcnl.eu',
      category: 'llm cost optimization',
      dates: '2024',
      role: 'lead engineer',
      outcome: 'Cut an enterprise LLM bill from $100,000 a month to $1,500.',
      body: 'Rewrote a single-vendor routing layer into a task-classifier that sent simple extraction to open-source models (Llama 3.1 on their infra) and reserved frontier calls for edge cases. GDPR-compliant, with full per-request audit trail. Same accuracy, 70% lower latency.',
      chips: [
        { label: '98% cost cut' },
        { label: '10K companies' },
        { label: '100K invoices/month' },
      ],
      stack: ['Python', 'Llama 3.1', 'vLLM', 'PostgreSQL', 'AWS'],
      caseStudyUrl: '/work/kcnl',
    },
    {
      slug: 'capwell',
      client: 'Capwell Communications',
      clientMono: 'capwell communications',
      category: 'ai agents',
      dates: '2024',
      role: 'lead engineer',
      outcome: 'Multi-agent orchestrator that handled 500,000 records autonomously.',
      body: 'Replaced a 6-month manual process with a LangGraph-based system that ran to completion in 3 weeks. Explicit stop conditions, retries, and human-in-the-loop for ambiguous cases. No unsupervised loops, no token blowup.',
      chips: [
        { label: '500K records' },
        { label: '6 months to 3 weeks' },
        { label: 'LangGraph' },
      ],
      stack: ['Python', 'LangGraph', 'LangChain', 'PostgreSQL', 'Redis', 'AWS'],
      caseStudyUrl: '/work/capwell',
    },
    {
      slug: 'tula',
      client: 'Tula Transformation',
      clientMono: 'tula',
      category: 'ai product',
      dates: '2024',
      role: 'lead engineer',
      outcome: 'AI therapist platform. Client raised $1.2M after launch.',
      body: 'Full conversation engine plus real-time voice. FastAPI backend on Gemini, HIPAA-adjacent handling, 2,400 calls processed in the first launch month. YC Angel-backed.',
      chips: [
        { label: '$1.2M raised' },
        { label: '2.4K calls/mo' },
        { label: 'YC Angel-backed' },
      ],
      stack: ['FastAPI', 'Gemini', 'Deepgram', 'ElevenLabs', 'Twilio', 'GCP'],
      caseStudyUrl: '/work/tula',
    },
    {
      slug: 'fcs',
      client: 'Full Credit Sweep',
      clientMono: 'full credit sweep',
      category: 'ai automation',
      dates: '2024 to 2025',
      role: 'lead engineer',
      outcome: 'End-to-end AI automation handling 2,000 active users and 68,000 leads.',
      body: 'AI tooling embedded inside GoHighLevel. Calls, messages, documents, and a unified dashboard. The pipeline runs unattended. No Zapier-fragile workflow tax.',
      chips: [
        { label: '68K leads' },
        { label: '2K active users' },
        { label: 'GoHighLevel' },
      ],
      stack: ['Python', 'Node.js', 'GoHighLevel API', 'Twilio', 'Postgres'],
      caseStudyUrl: '/work/fcs',
    },
    {
      slug: 'medmatch',
      client: 'Medmatch',
      clientMono: 'medmatch',
      category: 'voice ai',
      dates: '2025',
      role: 'lead engineer',
      outcome: 'HIPAA-compliant AI voice agent that sounds human enough to close.',
      body: 'Autonomous outbound calls with sub-second latency and a full audit trail. Reduced manual call volume by ~90% for the pilot cohort.',
      chips: [
        { label: '90% call reduction' },
        { label: 'Sub-second latency' },
        { label: 'HIPAA' },
      ],
      stack: ['Python', 'Deepgram', 'ElevenLabs', 'Twilio', 'AWS'],
      caseStudyUrl: '/work/medmatch',
    },
  ],

  timeline: [
    {
      dates: '2024 to present',
      role: 'Independent AI engineering lead',
      body: 'Shipping production AI for funded startups and SMBs. 49 projects to date. 100% Upwork Job Success. See /work for the public case studies.',
    },
    {
      dates: '2023 to 2024',
      role: 'Independent full-stack AI engineer',
      body: 'Scaled into AI product work. Aphra, Tula, KCNL, FCS, Capwell. Started pulling in a bench of senior engineers for larger scopes.',
    },
    {
      dates: '2022',
      role: 'Data engineering at Sony PlayStation (freelance)',
      body: 'Rewrote a survey data ETL pipeline that ran for hours into one that ran in 30 seconds. 120x speedup on ~400,000 rows. Java on GCP, with GitHub Actions and Jenkins for deploys.',
    },
    {
      dates: '2020 to 2022',
      role: 'Freelance engineering, general',
      body: 'Early remote work. Full-stack web, early ML integrations, data scraping, Java backends. Ramped up to AI work in 2023.',
    },
    {
      dates: '2019 to 2020',
      role: 'MicroKosm, Assistant Data Scientist',
      body: 'First job. Python, Docker, Kubernetes. Forecasting dashboards for clients in the US, UAE, and Germany. Learned what production means by breaking it a few times.',
    },
    {
      dates: '2016 to 2020',
      role: 'The Superior University, Lahore',
      body: 'Bachelor of Engineering, Avionics.',
    },
  ],

  skills: [
    {
      category: 'AI and ML',
      groups: [
        {
          label: 'primary',
          items: ['Python', 'LangChain', 'LangGraph', 'PyTorch', 'Hugging Face Transformers'],
        },
        {
          label: 'models (frontier)',
          items: ['GPT-4 class', 'Claude', 'Gemini'],
        },
        {
          label: 'models (open-source, deployed)',
          items: ['Llama 3.1', 'Qwen', 'Mistral', 'vLLM'],
        },
        {
          label: 'voice',
          items: ['Deepgram', 'ElevenLabs', 'Whisper', 'Twilio', 'Vonage'],
        },
        {
          label: 'retrieval and search',
          items: ['Pinecone', 'Weaviate', 'pgvector', 'Elasticsearch'],
        },
      ],
    },
    {
      category: 'Web and backend',
      groups: [
        {
          label: 'frontend',
          items: ['Next.js', 'React', 'TypeScript', 'Tailwind'],
        },
        {
          label: 'backend',
          items: ['Python (FastAPI, Flask)', 'Node.js', 'Go', 'Spring Boot (Java)'],
        },
        {
          label: 'databases',
          items: ['PostgreSQL', 'MongoDB', 'Redis', 'Kafka'],
        },
      ],
    },
    {
      category: 'Infra and ops',
      groups: [
        {
          label: 'cloud',
          items: ['AWS', 'GCP', 'Vercel'],
        },
        {
          label: 'containers and orchestration',
          items: ['Docker', 'Kubernetes'],
        },
        {
          label: 'ci/cd',
          items: ['GitHub Actions', 'Jenkins', 'Vercel deploys'],
        },
        {
          label: 'observability',
          items: ['OpenTelemetry', 'Sentry', 'Grafana'],
        },
      ],
    },
  ],

  education: {
    degree: 'Bachelor of Engineering, Avionics.',
    school: 'The Superior University',
    location: 'Lahore',
    dates: '2016 to 2020',
  },

  testimonialIds: ['luke-blackamore', 'voice-ai-healthcare'],
};
