export type CaseStudySection = {
  heading: string;
  body: string; // plain text paragraphs separated by \n\n
  bullets?: string[]; // optional bullet list
  table?: { headers: string[]; rows: string[][] }; // optional results table
};

export type CaseStudyContent = {
  slug: string;
  eyebrow: string;
  headline: string;
  subhead: string;
  metaRow: string;
  stats: { value: string; label: string }[];
  sections: CaseStudySection[];
  stack: string[];
  liveUrl?: string;
};

export const caseStudyContent: Record<string, CaseStudyContent> = {
  aphra: {
    slug: 'aphra',
    eyebrow: 'APHRA.ME · AI PRODUCT',
    headline: 'Real-time AI video avatar serving 17,000+ users.',
    subhead:
      'We built the entire AI backend, agent system, and live voice pipeline for Aphra — a personalized AI assistant with a live talking-head avatar.',
    metaRow: 'Year: 2024–2025 · Industry: AI Consumer · Role: AI backend + agent architecture · Live: aphra.me',
    liveUrl: 'https://aphra.me',
    stats: [
      { value: '17,000+', label: 'Active users on the platform' },
      { value: 'Sub-second', label: 'End-to-end latency' },
      { value: 'Daily', label: 'AI agents running per user' },
      { value: 'Python + NextJS', label: 'Stack: WebSockets, GCP, custom TTS/STT' },
    ],
    sections: [
      {
        heading: 'The Client',
        body: `Aphra.me is a next-generation AI personal assistant with something most chatbots don't have: a face. Users interact with a live AI video avatar that talks back in real time — not a text box, not an audio clip, but a full conversational video presence that can connect to Gmail, Notion, Calendar, and handle daily tasks on your behalf.\n\nThe product launched in alpha and grew to over 17,000 active users on the backend we architected. As the platform scaled, the team needed an AI engineering partner who could deliver production-grade real-time systems — not notebook demos.`,
      },
      {
        heading: 'The Challenge',
        body: `Building a live video AI assistant is harder than it sounds. To feel natural, the full pipeline has to run in under a second: user speaks → audio streams to the server → speech-to-text → LLM processes with context → response generated → text-to-speech → avatar lip-syncs and plays back. Any lag above 1–2 seconds and the illusion breaks.\n\nOn top of that, every user needs their own persistent agent context: what tools they've connected, what their scheduled tasks are, what they discussed in the last conversation. And thousands of users need all of this happening simultaneously, on stable infrastructure, with cost controls tight enough that the unit economics work.`,
      },
      {
        heading: 'What We Built',
        body: 'We architected and built the complete AI backend for Aphra.me:',
        bullets: [
          'The live conversation pipeline. Real-time streaming via WebSockets. User audio is transcribed on-the-fly, passed through the LLM with contextual memory, and returned as synthesized speech driving the avatar\'s lip-sync animation. Full round-trip latency stays under a second in good network conditions.',
          'The agent system. Each user has their own AI agent with persistent context — their connected tools (Gmail, Notion, Calendar), their task history, their preferences. Agents can execute actions on the user\'s behalf: drafting emails, scheduling meetings, fetching information, kicking off workflows.',
          'The tool integrations. OAuth-based connectors for the apps users live in. Each tool has a safe-execution boundary, error handling, and rate limits so an agent can never run away and make thousands of API calls by mistake.',
          'The infrastructure. GCP-based deployment with autoscaling, observability, and cost controls. We implemented per-user cost caps and per-session budget limits to keep LLM spend predictable as the product scaled.',
        ],
      },
      {
        heading: 'Results',
        body: 'The system handles thousands of simultaneous live conversations, each with its own agent context, each requiring low-latency multi-modal AI orchestration. The backend architecture scaled through the 17K user milestone without needing a rewrite.',
        table: {
          headers: ['Metric', 'Outcome'],
          rows: [
            ['Active users on platform', '17,000+'],
            ['Real-time latency', 'Sub-second end-to-end'],
            ['Concurrent AI agents', 'Scaled to thousands'],
            ['Platform reliability', 'Production-ready with monitoring + cost controls'],
          ],
        },
      },
      {
        heading: 'Reflection',
        body: "The hard part of building a live AI avatar isn't any single piece — speech-to-text exists, LLMs exist, voice synthesis exists, WebSockets exist. The hard part is orchestrating them under a one-second latency budget, at scale, reliably, with every user having their own stateful agent.\n\nAphra showed us that real-time AI UX is a different engineering discipline from \"normal\" LLM work. You need to think about streaming, buffering, interruption handling, tool execution safety, and cost control in ways that don't come up when you're just prompting ChatGPT in a Python script.",
      },
    ],
    stack: [
      'Python, FastAPI, asyncio',
      'WebSockets for low-latency bidirectional streams',
      'Custom AI agents, tool-calling loops, contextual memory',
      'Real-time STT/TTS pipelines',
      'Talking-head synthesis with lip-sync',
      'GCP (Cloud Run, Pub/Sub, Firestore), Docker, CI/CD',
      'Gmail API, Notion API, Calendar API via OAuth',
    ],
  },

  capwell: {
    slug: 'capwell',
    eyebrow: 'CAPWELL COMMUNICATIONS · AUTONOMOUS AGENT',
    headline: '500,000 awards, updated autonomously.\nA six-month job, done in three weeks.',
    subhead:
      'We replaced an outsourced ten-person manual research team with a LangChain-powered multi-agent system that browses the web, reads award listings, and keeps a half-million-record database current on its own.',
    metaRow: 'Year: 2024 · Industry: Business Intelligence · Role: End-to-end AI agent system · Live: capwellcomm.com',
    liveUrl: 'https://www.capwellcomm.com',
    stats: [
      { value: '500,000+', label: 'Records managed by the AI system' },
      { value: '6mo → 3wk', label: 'Update cycle compressed' },
      { value: '80%', label: 'Manual work eliminated' },
      { value: 'LangChain', label: 'Multi-agent orchestration' },
    ],
    sections: [
      {
        heading: 'The Client',
        body: `Capwell Communications is the industry leader in award intelligence. Their product is a proprietary database of over 500,000 awards — trade awards, creative awards, regional awards, industry awards — that their clients use to track, apply for, and win recognition. Keeping that database current is not optional. If the data goes stale, Capwell's product loses its value.\n\nTheir problem: the entire update process was manual. A full database refresh took six months and required an outsourced team of roughly ten people who would go website by website, re-reading award pages, transcribing deadline changes, logging new awards, and flagging retired ones. By the time a cycle finished, another cycle was already needed.`,
      },
      {
        heading: 'The Challenge',
        body: 'Three specific difficulties, layered:',
        bullets: [
          'Scale. 500,000 records is far too many to update with any small team at any reasonable speed.',
          'Fragility of the web. Award organizations constantly redesign their websites, change URL structures, add anti-bot protections, introduce CAPTCHAs, and rotate hosting. A simple scraper that works today breaks next month.',
          'Semantic difficulty. Awards aren\'t just structured data. An award page might bury the deadline in a paragraph, list criteria in an image, or describe the prize in a footnote. Correctly parsing that into clean database fields is a reading-comprehension problem, not a string-matching problem.',
        ],
      },
      {
        heading: 'What We Built',
        body: 'We built an autonomous multi-agent system, not a scraper. The distinction matters.\n\nAt the base, there\'s an orchestrator agent — a LangChain-powered agent that doesn\'t do any scraping itself. Its job is to look at a target award, break the update task into subtasks, and dispatch specialized sub-agents to handle each one. The orchestrator can run these sub-agents in parallel for multi-hour autonomous sessions without human supervision.',
        bullets: [
          'Crawling agents that navigate award organization websites, handling redirects, authentication walls, and modern JavaScript-rendered pages',
          'Anti-bot evasion layer — IP rotation, fingerprint randomization, request pacing, and CAPTCHA handling so the system survives the real web',
          'Reading agents that parse award pages using LLMs, extracting deadlines, criteria, prize amounts, eligibility, and changes from previous cycles',
          'Verification agents that cross-reference findings against Capwell\'s existing records and flag mismatches for human review',
        ],
      },
      {
        heading: 'Results',
        body: "The system freed Capwell's team to focus on higher-value work and dramatically improved the product's data freshness. The architecture is now the foundation on which they can expand — adding new award categories, new geographies, and new data sources without scaling their team linearly.",
        table: {
          headers: ['Metric', 'Before', 'After'],
          rows: [
            ['Database update cycle', '6 months', '3 weeks'],
            ['Manual labor required', '10-person outsourced team', '~20% of original (review only)'],
            ['Records kept current', '500,000+', '500,000+ (same, faster)'],
            ['Data freshness', '6-month stale at worst', '3-week stale at worst'],
          ],
        },
      },
      {
        heading: 'Reflection',
        body: 'This project made a case that we still make to every client today: most AI projects aren\'t really AI projects — they\'re orchestration projects with AI inside them.\n\nThe LLM parts of the Capwell system are maybe 20% of the engineering. The other 80% is state management, error handling, retry logic, rate limiting, anti-bot evasion, cost control, and orchestration. If you skip any of those, the system breaks in week two.',
      },
    ],
    stack: [
      'Python',
      'LangChain + custom orchestration layer',
      'Anti-bot evasion, fingerprint rotation, CAPTCHA handling',
      'Mix of OpenAI and open-source LLMs',
      'Parallel processing, multi-hour autonomous runs',
    ],
  },

  kcnl: {
    slug: 'kcnl',
    eyebrow: 'KCNL.EU · LLM COST OPTIMIZATION',
    headline: '$100,000 a month on LLM bills.\nDown to $1,500. GDPR compliant.',
    subhead:
      'KCNL is a B2B invoice-automation platform serving 10,000+ companies and processing over 100,000 invoices a month. We replaced their commercial LLM stack with a hybrid open-source + fine-tuned architecture, keeping accuracy while cutting spend by 98.5%.',
    metaRow: 'Year: 2024 · Industry: B2B SaaS · Role: AI backend + cost optimization · Live: KCNL.eu',
    stats: [
      { value: '$98.5K/mo', label: 'Saved on LLM infrastructure' },
      { value: '10,000+', label: 'Companies served' },
      { value: '100,000+', label: 'Invoices processed monthly' },
      { value: 'GDPR', label: 'Compliant with full audit trail' },
    ],
    sections: [
      {
        heading: 'The Client',
        body: 'KCNL.eu runs a B2B invoice automation SaaS used by 10,000+ companies across Europe. Their platform ingests invoices — PDF, image, scanned, structured, unstructured — extracts who sent what, cross-references against the client\'s ERP system, and flags discrepancies.\n\nIt\'s exactly the kind of product where AI earns its keep. But it\'s also the kind of product where LLM bills spiral fast.',
      },
      {
        heading: 'The Challenge',
        body: 'By the time we took over the backend, the LLM bill was over $100,000 per month and climbing. The architecture was straightforward — every invoice extraction sent the full document to a top-tier commercial LLM, parsed the response, and stored the result.\n\nThree constraints made the optimization difficult:',
        bullets: [
          'Accuracy couldn\'t drop. These are real business invoices. Getting supplier names or amounts wrong has legal and financial consequences.',
          'The system had to stay GDPR compliant. Invoices contain personal and financial data. Sending them to third-party APIs without careful controls was a liability.',
          'Throughput had to keep up. 100,000 invoices a month means ~3,300 a day. Latency budgets were tight.',
        ],
      },
      {
        heading: 'What We Built',
        body: 'We re-architected the AI layer from scratch around a hybrid stack:\n\nFine-tuned open-source models handle the bulk of extraction. For structured, routine invoices — which are the majority — a fine-tuned open-source LLM running on our own infrastructure performs as well as (sometimes better than) the commercial models, at a fraction of the cost.\n\nSpecialized classical models handle focused tasks like named-entity recognition, table extraction, and layout parsing. Not everything needs an LLM. OCR, bounding-box detection, and header matching are cheap and deterministic when you use the right tool.\n\nA commercial LLM is called only as a last resort — when the cheaper models return low-confidence output, or when the invoice is genuinely unusual. The system has a cascading confidence pipeline, only escalating to expensive models when the cheaper ones can\'t handle the input.',
      },
      {
        heading: 'Results',
        body: 'Over the course of a year, that\'s more than a million dollars saved on infrastructure alone — enough to fund significant product investments elsewhere in the business.',
        table: {
          headers: ['Metric', 'Before', 'After'],
          rows: [
            ['Monthly LLM cost', '$100,000+', '~$1,500'],
            ['Extraction accuracy', 'Baseline', 'Matched or exceeded baseline'],
            ['Throughput', 'Existing volume', 'Scaled same volume + headroom'],
            ['GDPR compliance', 'Partial', 'Full — with audit trail'],
            ['Monthly savings', '—', '~$98,500'],
          ],
        },
      },
      {
        heading: 'Reflection',
        body: "The lesson we pull from KCNL shows up in almost every AI project we take on: the default stack is almost never the optimal stack. The default is \"OpenAI for everything,\" because it's fast to prototype. But at scale, that default becomes financial damage.\n\nThe optimal stack is usually a portfolio: cheap models for 80% of traffic, medium models for 15%, expensive models for 5%. Classification and routing logic sit between them. The result is a system that's 10–100x cheaper than the naive version, with accuracy that's equal or better because each model is specialized for its task.",
      },
    ],
    stack: [
      'Python, FastAPI',
      'Fine-tuned open-source LLMs running on own infrastructure',
      'OpenAI (sparingly, as fallback for edge cases)',
      'OCR, NER, layout parsing, table extraction',
      'Confidence-cascade routing logic',
      'GDPR audit trail, data retention policies, deletion tooling',
      'Containerized deployment, autoscaling',
    ],
  },

  tula: {
    slug: 'tula',
    eyebrow: 'TULA TRANSFORMATION · YC ANGEL-BACKED',
    headline: 'An AI therapist that raised $1.2M.',
    subhead:
      'Tula is a conversational AI platform designed to reduce anxiety, improve relationships, and help users work through persistent thought patterns using evidence-based language techniques. We architected the backend, the AI conversation engine, and led the team that shipped it to production.',
    metaRow: 'Year: 2024–2025 · Industry: HealthTech · Role: AI/backend lead + tech lead · Live: tulatransformation.com',
    liveUrl: 'https://tulatransformation.com',
    stats: [
      { value: '$1.2M', label: 'Raised on our work' },
      { value: 'YC Angel', label: 'Backed' },
      { value: 'Alpha users', label: 'Serving test cohort' },
      { value: 'FastAPI + Gemini', label: 'LLM + voice pipeline + ReactJS frontend' },
    ],
    sections: [
      {
        heading: 'The Client',
        body: 'Tula Transformation is an AI therapist platform — a conversational AI designed to give anyone access to therapy-style support, regardless of cost, scheduling, or availability. The company is backed by a Y Combinator angel investor and has raised $1.2M USD in seed capital on the strength of the alpha product we helped build.',
      },
      {
        heading: 'The Challenge',
        body: 'AI-based mental health tools are one of the hardest product categories to execute well:',
        bullets: [
          'The conversation has to be genuinely useful, not performative. Users come to the product with real emotional weight. If the AI generates generic platitudes or misreads the emotional register, users feel worse, not better.',
          'Voice interaction changes everything. Users wanted to speak, not type. Speaking forces real-time STT and TTS with tight latency budgets, which rules out the simple "call OpenAI" approach for most of the pipeline.',
          'Privacy is non-negotiable. Conversations contain the most sensitive data a person has. The platform had to handle that responsibly — in storage, in transmission, and in what gets sent to third-party APIs.',
        ],
      },
      {
        heading: 'What We Built',
        body: 'We architected and built the backend of Tula from the ground up:',
        bullets: [
          'The AI conversation engine. Built on Gemini LLM with extensive prompt engineering and contextual memory. The model maintains a conversation history, tracks the user\'s emotional arc, and adapts its tone and approach over the course of a session.',
          'A real-time voice pipeline. Using open-source TTS and STT components rather than commercial APIs — both for cost and for privacy. Low-latency enough to feel like a natural conversation.',
          'WebSocket infrastructure for streaming audio and responses in real time.',
          'Scalable multi-tenant architecture for the alpha user cohort, built mobile-first.',
          'Team leadership. This was the first project where our role included tech leadership for a team of other developers — reviewing PRs, setting architectural direction, and holding the quality bar.',
        ],
      },
      {
        heading: 'Results',
        body: 'The investment alone validates the product\'s approach and the engineering that backs it. Tula is actively scaling and expanding the product from alpha to broader release.',
        table: {
          headers: ['Metric', 'Outcome'],
          rows: [
            ['Funding raised', '$1.2M USD (YC Angel round)'],
            ['Platform stage', 'Alpha, with test users'],
            ['Conversation quality', 'Backed by language-pattern framework'],
            ['Voice latency', 'Low enough for natural conversation'],
          ],
        },
      },
      {
        heading: 'Reflection',
        body: "Mental health is one of the areas where AI can genuinely change lives — access to something therapy-like, available at 3am, for anyone — and it's also the area where doing it badly can hurt people. The engineering standard has to be higher than the average \"let's wrap ChatGPT\" project.\n\nThe $1.2M raise is a strong validation of the product, the thesis, and the technical execution.",
      },
    ],
    stack: [
      'FastAPI, Python',
      'Google Gemini with custom prompt engineering + session memory',
      'Open-source STT/TTS stack (for cost + privacy)',
      'WebSocket pipeline for audio streaming',
      'ReactJS (team-built under our technical leadership)',
      'Cloud-native, scalable, mobile-first',
      'Privacy controls for mental health data',
    ],
  },

  medmatch: {
    slug: 'medmatch',
    eyebrow: 'MEDMATCH · HIPAA-COMPLIANT VOICE AI',
    headline: 'An AI voice agent that sounds human enough to close calls.',
    subhead:
      'Medmatch needed an outbound voice system that could autonomously handle healthcare-related call workflows — without sounding robotic, without breaking HIPAA, and without humans in the loop for most calls.',
    metaRow: 'Year: 2024–2025 · Industry: HealthTech · Role: End-to-end voice AI system · Status: In production',
    stats: [
      { value: '90%', label: 'Manual work reduction' },
      { value: 'Sub-second', label: 'Call latency' },
      { value: 'HIPAA', label: 'Compliant with full audit trail' },
      { value: 'Real-time', label: 'STT/TTS pipeline' },
    ],
    sections: [
      {
        heading: 'The Client',
        body: 'Medmatch operates in the healthcare space where outbound calls are a routine part of the business: confirming appointments, following up on patient events, gathering information from existing records, walking through care next-steps. Historically, these calls required human staff — expensive, slow, and hard to scale when volume spikes.',
      },
      {
        heading: 'The Challenge',
        body: 'Voice AI in healthcare is unforgiving. Three constraints stack:',
        bullets: [
          'The AI has to sound human. Patients and providers can instantly tell when a robot is on the phone, and trust collapses. Latency, prosody, pause patterns, and the ability to interrupt gracefully all matter.',
          'HIPAA compliance is mandatory. Every call touches protected health information. The system has to be auditable, encrypted, access-controlled, and never send PHI to third-party services that aren\'t business-associates.',
          'The agent needs to take actions, not just talk. After the call, outcomes need to flow back into the source system: event created, record updated, task assigned, escalation triggered.',
        ],
      },
      {
        heading: 'What We Built',
        body: 'We built an end-to-end AI voice agent with four key capabilities:',
        bullets: [
          'Context-aware call scripts. The agent doesn\'t follow a single rigid script. It receives context from the source system — patient info, call reason, event history — and adapts its approach accordingly.',
          'Sub-second latency voice pipeline. Real-time STT and TTS, carefully tuned so the conversational cadence matches a human caller. The AI can interrupt naturally, handle interruptions from the other party, and recover gracefully.',
          'HIPAA-compliant infrastructure. Encrypted at rest and in transit. Access-controlled. Third-party services are either BAA-ready or handled in-house. Nothing containing PHI leaves the compliant boundary.',
          'Full audit trail. Every call is logged with: full transcript, decisions the agent made, actions it took after the call, and hooks into Medmatch\'s compliance review flow.',
          'Outcome-driven action execution. After a call ends, the agent writes the outcome back to Medmatch\'s system: creates events, updates records, summarizes the conversation, and flags anything that needs human review.',
        ],
      },
      {
        heading: 'Results',
        body: "The Medmatch team reclaimed ~90% of the time that was previously spent on routine outbound calls. Their human staff now focuses on the high-touch, high-judgment cases where AI would be the wrong tool.",
        table: {
          headers: ['Metric', 'Outcome'],
          rows: [
            ['Manual call work reduction', '~90%'],
            ['Voice latency', 'Sub-second, conversational feel'],
            ['Compliance', 'Full HIPAA with audit trail'],
            ['Scalability', 'Runs 24/7, handles volume spikes automatically'],
          ],
        },
      },
      {
        heading: 'Reflection',
        body: "Voice AI in 2024–2025 finally crossed a threshold where it's deployable in regulated industries. Three years ago you couldn't have built what we built for Medmatch — the latency, the compliance tooling, and the voice quality weren't all there simultaneously.\n\nWhat slows most projects in this space isn't the AI. It's the compliance plumbing. Our view is that if you're going to deploy AI in healthcare, you plan the compliance layer first and the AI second.",
      },
    ],
    stack: [
      'Real-time STT/TTS, low-latency pipeline',
      'Python',
      'HIPAA-grade encryption, access controls, audit logging',
      'Hooks into Medmatch\'s source system for post-call writeback',
      'Human-in-the-loop for flagged cases',
    ],
  },

  fcs: {
    slug: 'fcs',
    eyebrow: 'FCS · AUTONOMOUS LEAD PIPELINE',
    headline: 'AI that runs a 68,000-lead pipeline on its own.',
    subhead:
      'FCS is a credit-improvement service with 2,000 active clients and 68,000 leads moving through their GoHighLevel pipeline. We built the AI tooling that runs the outbound calls, the messages, the document generation, and the client-facing dashboard.',
    metaRow: 'Year: 2024–2025 · Industry: FinTech · Role: End-to-end AI tooling inside GoHighLevel · Status: In production',
    stats: [
      { value: '2,000+', label: 'Active users' },
      { value: '68,000', label: 'Leads in the pipeline' },
      { value: 'End-to-end', label: 'AI handles calls, SMS, email, docs' },
      { value: 'GoHighLevel', label: 'Integrated natively inside the CRM' },
    ],
    sections: [
      {
        heading: 'The Client',
        body: "Full Credit Sweep is a credit-improvement company. Clients come in with damaged credit, FCS works through dispute processes, guidance, and documentation to help improve scores over time. The pipeline is large — 68,000 leads at any moment — and most of the work used to be manual: call the lead, qualify them, send documents, write follow-up messages, track progress.",
      },
      {
        heading: 'The Challenge',
        body: "Credit services live in GoHighLevel — a CRM built for small-business marketing and sales automation. GoHighLevel is flexible but doesn't natively support the AI workflows FCS wanted: autonomous voice calls, AI-generated documents, AI-drafted messages, a client dashboard showing credit progress over time.\n\nThe challenge was building all of this inside GoHighLevel's ecosystem rather than parallel to it — so the FCS team didn't have to switch tools, and so the AI operated on the same data their human team used.",
      },
      {
        heading: 'What We Built',
        body: 'We built a suite of AI tools wired directly into FCS\'s GoHighLevel stack:',
        bullets: [
          'AI voice agent for inbound leads. When a contact lands in the pipeline, the AI calls them almost immediately. It sounds human, runs a qualifying script, handles objections, and either books the deal, routes to a human, or returns the lead to the nurture flow.',
          'AI message generation. Drafts personalized SMS, email, and chat messages based on where a lead is in the pipeline. Escalates to a human when sentiment or complexity crosses a threshold.',
          'AI document generation. Credit improvement generates a lot of paperwork: dispute letters, authorization forms, progress summaries. The AI produces them, tailored to each lead\'s specific credit situation.',
          "Client-side progress dashboard. For each active client, a dashboard showing credit scores over time, disputes filed, outcomes, and upcoming actions.",
          'Audit-ready call summaries. Every AI call produces a summary, is logged against the lead record, and is viewable by the human team for review.',
        ],
      },
      {
        heading: 'Results',
        body: 'FCS went from a high-touch manual pipeline to a mostly-autonomous pipeline that the human team supervises rather than runs. The AI handles the long tail; humans handle the high-value edge cases.',
        table: {
          headers: ['Metric', 'Outcome'],
          rows: [
            ['Active clients handled', '2,000+'],
            ['Leads in pipeline', '68,000'],
            ['AI coverage', 'Calls + messages + documents, end-to-end'],
            ['Platform', 'Native inside GoHighLevel, no separate tools'],
          ],
        },
      },
      {
        heading: 'Reflection',
        body: 'The interesting pattern in FCS is meeting clients where they are. Most AI consultants would\'ve tried to migrate FCS off GoHighLevel onto a "proper" custom stack. We did the opposite — we built inside their existing tools, because those are the tools their team knows, uses every day, and trusts.\n\nBuilding AI into a CRM you don\'t own takes more careful engineering than building a standalone app. You\'re working with API rate limits, webhook reliability, nested custom fields, and a UI you can\'t fully customize. But the ROI is enormous because there\'s no adoption cost for the client.',
      },
    ],
    stack: [
      'GoHighLevel (CRM + marketing automation)',
      'Python services integrated via GHL API and webhooks',
      'Real-time voice agent with human-like conversational style',
      'LLM-drafted SMS, email, chat',
      'Template + LLM personalization for credit letters',
      'Custom client-facing dashboard inside FCS\'s portal',
      'Call + message + action logs against every lead record',
    ],
  },

  bestinform: {
    slug: 'bestinform',
    eyebrow: 'BESTINFORM.EU · FULL-STACK TICKETING PLATFORM',
    headline: 'An international airline ticketing platform that actually works under load.',
    subhead:
      'We built the end-to-end platform — Java backend, Angular frontend, CI/CD automation on a VPS — with complex integrations to Global Distribution Systems (GDS) and payment gateways.',
    metaRow: 'Year: 2023–2024 · Industry: Travel / Aviation · Role: Full-stack engineering · Live: bestinform.eu',
    liveUrl: 'https://bestinform.eu',
    stats: [
      { value: 'GDS', label: 'Multiple airline ticketing system integrations' },
      { value: 'Secure', label: 'PCI-compliant payment processing' },
      { value: 'Full CI/CD', label: 'GitHub Actions + VPS automation' },
      { value: 'Production', label: 'Serving real bookings' },
    ],
    sections: [
      {
        heading: 'Overview',
        body: "Bestinform.eu is a European airline ticketing platform that helps customers book international flights across carriers and routes. Behind the simple booking interface sits a non-trivial engineering problem: integrating with Global Distribution Systems (the multi-airline inventory backbones of the travel industry), handling secure payments, managing customer data, and doing it all with the reliability a booking system demands.",
      },
      {
        heading: 'What We Built',
        body: '',
        bullets: [
          'Full backend in Java, scalable and built for real booking transactions',
          'Angular frontend that the user sees — dynamic, responsive, handles the complexity of multi-leg flights and fare rules',
          'Integrations with multiple GDS systems — each with its own API quirks, error states, and fare logic',
          'Payment gateway integrations — PCI-DSS considerations, 3DS flows, refund handling',
          'End-to-end CI/CD pipeline on a VPS using GitHub Actions. Deployments are automated, tested, and safe',
          'Security hardening at the infrastructure and application layers',
        ],
      },
      {
        heading: 'Reflection',
        body: "Travel-tech is underrated as an engineering domain. From the outside it looks like \"book a flight, done.\" From the inside it's one of the most complex integration projects in commercial software — because you're integrating with systems that were designed in the 1970s and haven't fundamentally changed. Getting it right requires patience, defensive programming, and a willingness to handle every edge case the airlines throw at you.",
      },
    ],
    stack: [
      'Java (backend)',
      'Angular (frontend)',
      'GitHub Actions (CI/CD)',
      'VPS automation',
      'GDS integrations',
      'Payment gateway integrations',
      'Secure auth, infrastructure hardening',
    ],
  },

  'sony-playstation': {
    slug: 'sony-playstation',
    eyebrow: 'SONY PLAYSTATION · DATA PIPELINE OPTIMIZATION',
    headline: '120x faster. 5 million surveys. Days became hours.',
    subhead:
      'Sony PlayStation ran hundreds of thousands of internal surveys across their global teams. Their existing compilation pipeline worked — slowly. We rewrote the core, migrated performance-critical paths into faster languages, and turned a days-long job into a ~1-hour process.',
    metaRow: 'Year: 2023–2024 · Industry: Gaming / Enterprise Data · Role: Backend + pipeline optimization · Status: Internal at Sony',
    stats: [
      { value: '120x', label: 'Performance gain' },
      { value: '5,000,000+', label: 'Surveys compiled' },
      { value: 'Days → 1hr', label: 'Compilation time' },
      { value: 'ReactJS + CI/CD', label: 'End-to-end platform' },
    ],
    sections: [
      {
        heading: 'Overview',
        body: "Sony PlayStation operates at a scale where even \"small\" internal tools have to handle millions of records. Their survey system — used for employee surveys, product surveys, UX research — compiled data from hundreds of thousands of individual surveys into aggregated reports. The pipeline worked reliably. It just took days to run.",
      },
      {
        heading: 'What We Built',
        body: '',
        bullets: [
          'Re-architected the core pipeline. Moved slow Python logic into performance-critical paths written in Java and optimized code, with parallel processing where applicable.',
          'Rewrote the database layer for speed — query optimization, indexing strategies, batch processing.',
          'Rebuilt the ETL pipeline so aggregations happen in the right order, with retries, observability, and partial-recovery on failure.',
          'Built a React-based dashboard where the internal Sony team could see survey outcomes and drill into results.',
          'Set up CI/CD with GitHub Actions so the platform could be updated safely as internal needs changed.',
        ],
      },
      {
        heading: 'Results',
        body: '',
        table: {
          headers: ['Metric', 'Before', 'After'],
          rows: [
            ['Survey compilation time', 'Days', '~1 hour'],
            ['Performance gain', 'Baseline', '120x'],
            ['Records at scale', '5,000,000+', '5,000,000+'],
            ['Pipeline reliability', 'Working but slow', 'Fast, observable, recoverable'],
          ],
        },
      },
      {
        heading: 'Reflection',
        body: 'Most "120x" performance numbers come from replacing obviously-bad code with obviously-good code. This one came from something subtler: recognizing that the original pipeline wasn\'t bad Python — it was well-written Python trying to do a job that Python isn\'t good at. The fix was to keep Python for the glue logic and move the hot paths into Java, where the same algorithm runs an order of magnitude faster.',
      },
    ],
    stack: [
      'Python (glue layer)',
      'Java (performance-critical paths)',
      'ReactJS (dashboard)',
      'CI/CD with GitHub Actions',
      'Optimized ETL pipeline, parallel processing',
    ],
  },
};
