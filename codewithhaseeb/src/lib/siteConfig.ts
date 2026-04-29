export const siteConfig = {
  name: 'codewithhaseeb',
  url: 'https://codewithhaseeb.com',
  description:
    'We ship production AI. Not demos. A 5-person senior engineering team building for funded startups and SMBs.',

  ogImage: '/opengraph-image',

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
      featured: true,
      quote:
        "Muhammad is an extremely skilled developer. I brought him a project multiple developers said wasn't possible. He took it on, knocked it out of the park, and met our tight deadline with ease. We will be working with him on many more projects.",
      attribution: 'Luke Blackamore',
      role: 'Founder',
      meta: 'Upwork · Senior Full Stack',
    },
    {
      quote:
        "Muhammad is such a skilled developer. There was nothing he wasn't able to do with our project. Even with adversity, he overcame it with great communication and timely responses despite the time difference. Professional. 10/10.",
      attribution: 'Ahmad Rashid',
      role: 'Client',
      meta: 'Upwork · Full Stack build',
    },
    {
      quote:
        'Truly a genius. Would definitely work again.',
      attribution: 'Voice AI healthcare client',
      role: 'Client',
      meta: 'Jan 2026 · Real-time voice agent',
    },
    {
      quote:
        'Muhammad is an absolute expert in his field. Humble, thoughtful, an absolute pleasure to work with. His suggestions are spot-on.',
      attribution: 'AI Project Assistance client',
      role: 'Client',
      meta: 'Jul 2024 · AI advisory',
    },
    {
      quote:
        'Haseeb did an exceptional job and completed the task with quality. Awesome to work with, no fuss, professional, easy to communicate with. 10/10 recommend him.',
      attribution: 'Lim Jun Wei',
      role: 'Client',
      meta: 'Upwork · Data & AI',
    },
    {
      quote:
        "Muhammad quickly pulled a large amount of data for our team's needs. Extremely flexible and responsive as we requested additional scraping and analysis. We would definitely recommend his work.",
      attribution: 'Kate',
      role: 'Client',
      meta: 'Upwork · Data engineering',
    },
    {
      quote:
        'He did an excellent job on our WhatsApp Flow project and delivered results even better than what we originally had in mind.',
      attribution: 'FGC Perfume Kuwait',
      role: 'Client',
      meta: 'Feb 2026 · WhatsApp Business AI',
    },
    {
      quote:
        "Haseeb delivered good work on this data scraping project. His communication during the project was top-notch and his skills were strong. When I needed additional help to save my team time, he was forthcoming about cost and provided great solutions to save money. I will work with him again.",
      attribution: 'Kurt Uhlir',
      role: 'Client',
      meta: 'Upwork · Data engineering',
    },
    {
      quote:
        'Muhammad was awesome to work with. Very professional, easy to work with and to communicate with.',
      attribution: 'Zachary Jones',
      role: 'Client',
      meta: 'Upwork · Engineering',
    },
    {
      quote:
        'Muhammed did an excellent job and completed the assignment to a high quality and on time.',
      attribution: 'Vishal Patel',
      role: 'Client',
      meta: 'Upwork · Engineering',
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
