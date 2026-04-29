export const siteConfig = {
  name: 'codewithhaseeb',
  url: 'https://codewithhaseeb.com',
  description:
    'We ship production AI. Not demos. A 5-person senior engineering team building for funded startups and SMBs.',

  ogImage: '/og/home.png',

  links: {
    linkedin: 'https://www.linkedin.com/in/haseeb-ai',
    upwork: 'https://www.upwork.com/freelancers/muhammadh72',
    github: 'https://github.com/hassibayub',
    email: 'miltech.haseeb@gmail.com',
    whatsapp: 'https://wa.me/923143543422',
    calendly:
      process.env.NEXT_PUBLIC_CALENDLY_URL ||
      'https://calendly.com/miltech-haseeb/30min',
  },

  contact: {
    email: 'miltech.haseeb@gmail.com',
    phone: '+92 314 3543 422',
    location: 'Islamabad, Pakistan (UTC+5)',
  },

  // Primary navigation
  nav: [
    { label: 'Work', href: '/work' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],

  // Logo bar: styled text when no SVG logo is available
  clientLogos: [
    'Sony PlayStation',
    'Aphra.me',
    'Tula Transformation',
    'Capwell Comm',
    'KCNL.eu',
    'Bestinform.eu',
    'Medmatch',
    'FCS',
    'RGR Learning',
    'eXelerete',
  ],

  // Homepage stats
  stats: [
    {
      value: 17000,
      suffix: '+',
      label: 'Active users on Aphra.me',
      highlight: '17,000+',
    },
    {
      value: 4.2,
      prefix: '$',
      suffix: 'M+',
      label: 'Raised by clients on our AI builds',
      highlight: '$4.2M+',
    },
    {
      value: 120,
      suffix: '×',
      label: 'Faster data at Sony PlayStation',
      highlight: '120×',
    },
    {
      value: 500000,
      suffix: '+',
      label: 'Records managed at Capwell',
      highlight: '500K+',
    },
  ],

  testimonials: [
    {
      quote: 'Truly a genius! Would definitely work again.',
      attribution: 'Voice AI healthcare client',
      meta: 'Jan 2026 · Real-time voice agent',
    },
    {
      quote:
        'Muhammad is an absolute expert in his field. Humble, thoughtful, an absolute pleasure to work with. His suggestions are spot-on.',
      attribution: 'AI Project Assistance client',
      meta: 'Jul 2024 · AI advisory',
    },
    {
      quote:
        'He did an excellent job on our WhatsApp Flow project and delivered results even better than what we originally had in mind.',
      attribution: 'FGC Perfume Kuwait',
      meta: 'Feb 2026 · WhatsApp Business AI',
    },
  ],

  // Services used on homepage
  services: [
    {
      slug: 'ai-saas-mvp',
      icon: 'Rocket',
      title: 'AI SaaS MVPs',
      description:
        "From Figma to live product in 6 to 10 weeks. We've shipped MVPs now serving 17,000+ users. Full-stack: backend, frontend, AI, deployment.",
    },
    {
      slug: 'ai-agents',
      icon: 'Bot',
      title: 'AI Agents & Multi-Agent Systems',
      description:
        'LangChain, LangGraph, CrewAI. Autonomous agents that run for hours. Our Capwell agent cut a 6-month manual job to 3 weeks.',
    },
    {
      slug: 'voice-ai',
      icon: 'Mic',
      title: 'Voice AI & Conversational Agents',
      description:
        'HIPAA-compliant, sub-second latency, sounds human enough to close calls. Real-time STT/TTS pipelines in production.',
    },
    {
      slug: 'llm-cost-optimization',
      icon: 'TrendingDown',
      title: 'LLM Cost Optimization',
      description:
        "Replaced a client's $100K/month LLM bill with a hybrid open-source stack running at $1.5K/month. GDPR compliant, full audit trail.",
    },
    {
      slug: 'ai-automation',
      icon: 'Workflow',
      title: 'AI Workflow Automation',
      description:
        'GoHighLevel, HubSpot, WhatsApp Business, CRM integrations. FCS runs an autonomous AI pipeline for 2,000+ users and 68,000 leads.',
    },
    {
      slug: 'senior-fullstack',
      icon: 'Code2',
      title: 'Senior Full-Stack Engineering',
      description:
        'NextJS, Python, Node, Go. When you need a senior team that can also ship the web app, not just the AI part. Sony PlayStation scale.',
    },
  ],

  // Featured case studies for home page (3 shown)
  featuredCaseStudies: ['aphra', 'capwell', 'kcnl'],

  // Process steps
  process: [
    {
      number: '01',
      title: 'FREE SCOPING CALL',
      body: "30 minutes. We push back if we think the scope is wrong. That's a feature, not a bug.",
    },
    {
      number: '02',
      title: 'FIXED-MILESTONE PROPOSAL',
      body: 'Clear deliverables, realistic timelines, honest cost. Nothing ambiguous in writing.',
    },
    {
      number: '03',
      title: 'WEEKLY SPRINTS',
      body: "Working demo every Friday. You approve before we move on. You're never surprised.",
    },
    {
      number: '04',
      title: 'DAILY UPDATES',
      body: "Slack, Loom, or email. Your call. We don't ghost. You always know what's being built.",
    },
    {
      number: '05',
      title: '30-DAY SUPPORT',
      body: 'Post-launch bug-fix window included on every project. No extra invoice.',
    },
  ],
};

export type SiteConfig = typeof siteConfig;
