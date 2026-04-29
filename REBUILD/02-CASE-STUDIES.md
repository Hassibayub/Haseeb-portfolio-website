# 02 — Case Studies (Full Copy)

> Long-form editorial case studies for every project featured on codewithhaseeb.com. Each is designed to be both a standalone MDX page at `/work/[slug]` and a sharable artifact (LinkedIn, proposals, email).
>
> **Voice:** first-person plural ("we"), confident but specific, no marketing fluff, metrics always concrete.
> **Length target:** 500–700 words per case study (Aphra, Capwell, KCNL, Tula, Medmatch, FCS). 300–400 for the two supplemental ones (Bestinform, Sony).
> **Format:** each case study includes frontmatter for MDX parsing, hero metadata, 4-column stat row, overview / challenge / solution / results / reflection / stack / quote (if available).

---

## Index

1. [Aphra.me](#1-aphrame) — AI video avatar serving 17,000+ users
2. [Capwell Comm](#2-capwell-comm) — Autonomous multi-agent system managing 500,000 records
3. [KCNL.eu](#3-kcnleu) — B2B invoice AI that saved a client $98.5K/month on LLM bills
4. [Tula Transformation](#4-tula-transformation) — YC Angel-backed AI therapist platform
5. [Medmatch](#5-medmatch) — HIPAA-compliant AI voice agent
6. [FCS / Full Credit Sweep](#6-fcs--full-credit-sweep) — AI agent pipeline for 68K leads
7. [Bestinform.eu](#7-bestinformeu) — International airline ticketing platform (shorter)
8. [Sony PlayStation](#8-sony-playstation) — 120× data pipeline speedup (shorter)

---

## 1. Aphra.me

**URL:** `/work/aphra`
**Slug:** `aphra`
**Live product:** https://aphra.me

### Frontmatter

```yaml
---
title: Real-time AI video avatar serving 17,000+ users
client: Aphra.me
industry: AI Consumer
year: "2024–2025"
stack: [NextJS, Python, WebSockets, GCP, Custom AI Agents]
outcome: "17K+ active users on a sub-second live AI video assistant"
cover: /images/work/aphra-cover.webp
featured: true
order: 1
---
```

### Hero

**Eyebrow:** APHRA.ME · AI PRODUCT

**Headline (Instrument Serif 64px):**
Real-time AI video avatar serving 17,000+ users.

**Subhead:**
We built the entire AI backend, agent system, and live voice pipeline for Aphra — a personalized AI assistant with a live talking-head avatar.

**Meta row:**
Year: 2024–2025 · Industry: AI Consumer · Role: AI backend + agent architecture · Live: aphra.me

### 4-column stat row

```
[17,000+]          [Sub-second]       [Daily]             [Python + NextJS]
Active users        End-to-end          AI agents running   Stack: WebSockets,
on the platform     latency             per user            GCP, custom TTS/STT
```

### Overview — The Client

Aphra.me is a next-generation AI personal assistant with something most chatbots don't have: a face. Users interact with a live AI video avatar that talks back in real time — not a text box, not an audio clip, but a full conversational video presence that can connect to Gmail, Notion, Calendar, and handle daily tasks on your behalf.

The product launched in alpha and grew to over 17,000 active users on the backend we architected. As the platform scaled, the team needed an AI engineering partner who could deliver production-grade real-time systems — not notebook demos.

### The Challenge

Building a live video AI assistant is harder than it sounds. To feel natural, the full pipeline has to run in under a second: user speaks → audio streams to the server → speech-to-text → LLM processes with context → response generated → text-to-speech → avatar lip-syncs and plays back. Any lag above 1–2 seconds and the illusion breaks.

On top of that, every user needs their own persistent agent context: what tools they've connected, what their scheduled tasks are, what they discussed in the last conversation. And thousands of users need all of this happening simultaneously, on stable infrastructure, with cost controls tight enough that the unit economics work.

The team needed someone who could own the entire AI and backend layer — agents, voice pipeline, WebSocket infrastructure, GCP deployment — and ship it to production.

### What We Built

We architected and built the complete AI backend for Aphra.me:

- **The live conversation pipeline.** Real-time streaming via WebSockets. User audio is transcribed on-the-fly, passed through the LLM with contextual memory, and returned as synthesized speech driving the avatar's lip-sync animation. Full round-trip latency stays under a second in good network conditions.
- **The agent system.** Each user has their own AI agent with persistent context — their connected tools (Gmail, Notion, Calendar), their task history, their preferences. Agents can execute actions on the user's behalf: drafting emails, scheduling meetings, fetching information, kicking off workflows.
- **The tool integrations.** OAuth-based connectors for the apps users live in. Each tool has a safe-execution boundary, error handling, and rate limits so an agent can never run away and make thousands of API calls by mistake.
- **The infrastructure.** GCP-based deployment with autoscaling, observability, and cost controls. We implemented per-user cost caps and per-session budget limits to keep LLM spend predictable as the product scaled.

### Results

| Metric | Outcome |
|---|---|
| Active users on platform | 17,000+ |
| Real-time latency | Sub-second end-to-end |
| Concurrent AI agents | Scaled to thousands |
| Platform reliability | Production-ready with monitoring + cost controls |

The system handles thousands of simultaneous live conversations, each with its own agent context, each requiring low-latency multi-modal AI orchestration. The backend architecture scaled through the 17K user milestone without needing a rewrite.

### Reflection

The hard part of building a live AI avatar isn't any single piece — speech-to-text exists, LLMs exist, voice synthesis exists, WebSockets exist. The hard part is orchestrating them under a one-second latency budget, at scale, reliably, with every user having their own stateful agent.

Aphra showed us that real-time AI UX is a different engineering discipline from "normal" LLM work. You need to think about streaming, buffering, interruption handling, tool execution safety, and cost control in ways that don't come up when you're just prompting ChatGPT in a Python script.

### Tech Stack

- **Backend:** Python, FastAPI, asyncio
- **Real-time:** WebSockets for low-latency bidirectional streams
- **AI:** Custom AI agents, tool-calling loops, contextual memory
- **Voice:** Real-time STT/TTS pipelines (integrated multiple providers)
- **Avatar:** Talking-head synthesis with lip-sync
- **Frontend:** NextJS (built by their frontend team; we integrated the backend)
- **Infra:** GCP (Cloud Run, Pub/Sub, Firestore), Docker, CI/CD
- **Integrations:** Gmail API, Notion API, Calendar API via OAuth

---

## 2. Capwell Comm

**URL:** `/work/capwell`
**Slug:** `capwell`
**Live product:** https://www.capwellcomm.com/

### Frontmatter

```yaml
---
title: Autonomous multi-agent system managing 500,000 records
client: Capwell Communications
industry: Business Intelligence
year: "2024"
stack: [Python, LangChain, Custom Agent Orchestration, Web Scraping, Anti-Bot]
outcome: "6-month manual job reduced to 3 weeks. 80% manual work eliminated."
cover: /images/work/capwell-cover.webp
featured: true
order: 2
---
```

### Hero

**Eyebrow:** CAPWELL COMMUNICATIONS · AUTONOMOUS AGENT

**Headline:**
500,000 awards, updated autonomously.
A six-month job, done in three weeks.

**Subhead:**
We replaced an outsourced ten-person manual research team with a LangChain-powered multi-agent system that browses the web, reads award listings, and keeps a half-million-record database current on its own.

**Meta row:**
Year: 2024 · Industry: Business Intelligence · Role: End-to-end AI agent system · Live: capwellcomm.com

### 4-column stat row

```
[500,000+]         [6 months → 3 weeks]   [80%]               [LangChain]
Records managed    Update cycle            Manual work          Multi-agent
by the AI system   compressed              eliminated           orchestration
```

### Overview — The Client

Capwell Communications is the industry leader in award intelligence. Their product is a proprietary database of over 500,000 awards — trade awards, creative awards, regional awards, industry awards — that their clients use to track, apply for, and win recognition. Keeping that database current is not optional. If the data goes stale, Capwell's product loses its value.

Their problem: the entire update process was manual. A full database refresh took six months and required an outsourced team of roughly ten people in the Philippines who would go website by website, re-reading award pages, transcribing deadline changes, logging new awards, and flagging retired ones. By the time a cycle finished, another cycle was already needed.

### The Challenge

Three specific difficulties, layered:

**Scale.** 500,000 records is far too many to update with any small team at any reasonable speed.

**Fragility of the web.** Award organizations constantly redesign their websites, change URL structures, add anti-bot protections, introduce CAPTCHAs, and rotate hosting. A simple scraper that works today breaks next month. And "the web" in this context is thousands of different sites, not a handful of standardized sources.

**Semantic difficulty.** Awards aren't just structured data. An award page might bury the deadline in a paragraph, list criteria in an image, or describe the prize in a footnote. Correctly parsing that into clean database fields is a reading-comprehension problem, not a string-matching problem — which is why the original team was made up of humans, not scripts.

### What We Built

We built an **autonomous multi-agent system**, not a scraper. The distinction matters.

At the base, there's an **orchestrator agent** — a LangChain-powered agent that doesn't do any scraping itself. Its job is to look at a target award, break the update task into subtasks, and dispatch specialized sub-agents to handle each one. The orchestrator can run these sub-agents in parallel for multi-hour autonomous sessions without human supervision.

The sub-agents specialize:

- **Crawling agents** that navigate award organization websites, handling redirects, authentication walls, and modern JavaScript-rendered pages
- **Anti-bot evasion layer** — IP rotation, fingerprint randomization, request pacing, and CAPTCHA handling so the system survives the real web
- **Reading agents** that parse award pages using LLMs, extracting deadlines, criteria, prize amounts, eligibility, and changes from previous cycles
- **Verification agents** that cross-reference findings against Capwell's existing records and flag mismatches for human review

The orchestrator coordinates all of them, tracks state across a multi-hour session, and knows when to escalate to a human reviewer versus when to commit changes autonomously.

### Results

| Metric | Before | After |
|---|---|---|
| Database update cycle | 6 months | 3 weeks |
| Manual labor required | 10-person outsourced team | ~20% of original (review only) |
| Records kept current | 500,000+ | 500,000+ (same, faster) |
| Data freshness | 6-month stale at worst | 3-week stale at worst |
| Architectural scalability | Manual only | Parallelizable, scales with infra |

The system freed Capwell's team to focus on higher-value work and dramatically improved the product's data freshness. The architecture is now the foundation on which they can expand — adding new award categories, new geographies, and new data sources without scaling their team linearly.

### Reflection

This project made a case that we still make to every client today: **most AI projects aren't really AI projects — they're orchestration projects with AI inside them.**

The LLM parts of the Capwell system are maybe 20% of the engineering. The other 80% is state management, error handling, retry logic, rate limiting, anti-bot evasion, cost control, and orchestration. If you skip any of those, the system breaks in week two.

The clients who understand this — that production AI is about the system around the model, not the model itself — get dramatically better results than the clients who believe a single prompt can fix their business.

### Tech Stack

- **Core language:** Python
- **Agent framework:** LangChain + custom orchestration layer
- **Web automation:** Anti-bot evasion, fingerprint rotation, CAPTCHA handling
- **LLMs:** Mix of OpenAI and open-source models depending on task
- **Database:** Client's existing award database (500K+ records)
- **Infrastructure:** Parallel processing, multi-hour autonomous runs

---

## 3. KCNL.eu

**URL:** `/work/kcnl`
**Slug:** `kcnl`
**Live product:** KCNL.eu (internal B2B, not public-facing)

### Frontmatter

```yaml
---
title: How we cut a client's LLM bill from $100K/month to $1.5K/month
client: KCNL.eu
industry: B2B SaaS
year: "2024"
stack: [Python, FastAPI, Open-source LLMs, Fine-tuning, GDPR Compliance]
outcome: "$98.5K/month saved. 10K companies. 100K+ invoices/month. GDPR compliant."
cover: /images/work/kcnl-cover.webp
featured: true
order: 3
---
```

### Hero

**Eyebrow:** KCNL.EU · LLM COST OPTIMIZATION

**Headline:**
$100,000 a month on LLM bills.
Down to $1,500. GDPR compliant.

**Subhead:**
KCNL is a B2B invoice-automation platform serving 10,000+ companies and processing over 100,000 invoices a month. We replaced their commercial LLM stack with a hybrid open-source + fine-tuned architecture, keeping accuracy while cutting spend by 98.5%.

**Meta row:**
Year: 2024 · Industry: B2B SaaS · Role: AI backend + cost optimization · Live: KCNL.eu

### 4-column stat row

```
[$98.5K/month]     [10,000+]         [100,000+]           [GDPR]
Saved on            Companies          Invoices processed    Compliant with
LLM infrastructure  served             monthly               full audit trail
```

### Overview — The Client

KCNL.eu (the "K" stands for Kringloop Centrum Nederland — a real Dutch enterprise operation) runs a B2B invoice automation SaaS used by 10,000+ companies across Europe. Their platform ingests invoices — PDF, image, scanned, structured, unstructured — extracts who sent what, cross-references against the client's ERP system, and flags discrepancies.

It's exactly the kind of product where AI earns its keep. But it's also the kind of product where LLM bills spiral fast.

### The Challenge

By the time we took over the backend, the LLM bill was over **$100,000 per month** and climbing. The architecture was straightforward — every invoice extraction sent the full document to a top-tier commercial LLM, parsed the response, and stored the result. Across 100,000+ invoices per month, with retries, multi-step extraction, and validation passes, the token usage was eye-watering.

Three constraints made the optimization difficult:

1. **Accuracy couldn't drop.** These are real business invoices. Getting supplier names or amounts wrong has legal and financial consequences.
2. **The system had to stay GDPR compliant.** Invoices contain personal and financial data. Sending them to third-party APIs without careful controls was a liability.
3. **Throughput had to keep up.** 100,000 invoices a month means ~3,300 a day. Latency budgets were tight.

### What We Built

We re-architected the AI layer from scratch around a **hybrid stack**:

**Fine-tuned open-source models** handle the bulk of extraction. For structured, routine invoices — which are the majority — a fine-tuned open-source LLM running on our own infrastructure performs as well as (sometimes better than) the commercial models, at a fraction of the cost.

**Specialized classical models** handle focused tasks like named-entity recognition, table extraction, and layout parsing. Not everything needs an LLM. OCR, bounding-box detection, and header matching are cheap and deterministic when you use the right tool.

**A commercial LLM is called only as a last resort** — when the cheaper models return low-confidence output, or when the invoice is genuinely unusual. The system has a cascading confidence pipeline, only escalating to expensive models when the cheaper ones can't handle the input.

**Full audit trail and GDPR controls** are built in. Every request is logged, every model version is tracked, data retention policies are enforced, and we built tooling for client-side deletion requests.

### Results

| Metric | Before | After |
|---|---|---|
| Monthly LLM cost | $100,000+ | ~$1,500 |
| Extraction accuracy | Baseline | Matched or exceeded baseline |
| Throughput | Existing volume | Scaled same volume + headroom |
| GDPR compliance | Partial | Full — with audit trail |
| Monthly savings | — | **~$98,500** |

Over the course of a year, that's **more than a million dollars** saved on infrastructure alone — enough to fund significant product investments elsewhere in the business.

### Reflection

The lesson we pull from KCNL shows up in almost every AI project we take on: **the default stack is almost never the optimal stack.** The default is "OpenAI for everything," because it's fast to prototype. But at scale, that default becomes financial damage.

The optimal stack is usually a portfolio: cheap models for 80% of traffic, medium models for 15%, expensive models for 5%. Classification and routing logic sit between them. The result is a system that's 10–100× cheaper than the naive version, with accuracy that's equal or better because each model is specialized for its task.

If you're running an AI product at volume and your OpenAI bill is north of $10K/month, there's almost certainly a similar optimization waiting for you.

### Tech Stack

- **Backend:** Python, FastAPI
- **LLMs (open source):** Fine-tuned models running on our infrastructure
- **LLMs (commercial):** Used sparingly as fallback for edge cases
- **Classical ML:** OCR, NER, layout parsing, table extraction
- **Orchestration:** Confidence-cascade routing logic
- **Compliance:** GDPR audit trail, data retention policies, deletion tooling
- **Infrastructure:** Containerized deployment, autoscaling

---

## 4. Tula Transformation

**URL:** `/work/tula`
**Slug:** `tula`
**Live product:** https://tulatransformation.com/

### Frontmatter

```yaml
---
title: The AI therapist platform that raised $1.2M USD
client: Tula Transformation
industry: HealthTech / Mental Health
year: "2024–2025"
stack: [FastAPI, Gemini LLM, Open-source Voice, ReactJS, WebSockets]
outcome: "YC Angel-backed. $1.2M raised. Production platform serving test users."
cover: /images/work/tula-cover.webp
featured: true
order: 4
---
```

### Hero

**Eyebrow:** TULA TRANSFORMATION · YC ANGEL-BACKED

**Headline:**
An AI therapist that raised $1.2M.

**Subhead:**
Tula is a conversational AI platform designed to reduce anxiety, improve relationships, and help users work through persistent thought patterns using evidence-based language techniques. We architected the backend, the AI conversation engine, and led the team that shipped it to production.

**Meta row:**
Year: 2024–2025 · Industry: HealthTech · Role: AI/backend lead + tech lead · Live: tulatransformation.com

### 4-column stat row

```
[$1.2M USD]        [YC Angel]         [Alpha users]        [FastAPI + Gemini]
Raised on our       Backed              Serving test         LLM + voice pipeline
work                                    cohort               + ReactJS frontend
```

### Overview — The Client

Tula Transformation is an AI therapist platform — a conversational AI designed to give anyone access to therapy-style support, regardless of cost, scheduling, or availability. It helps users work through relationship issues, reduce anxiety, and reframe harmful thought patterns using a clinically-informed model of language and conversation.

The company is backed by a Y Combinator angel investor and has raised **$1.2M USD** in seed capital on the strength of the alpha product we helped build.

### The Challenge

AI-based mental health tools are one of the hardest product categories to execute well. Three reasons:

1. **The conversation has to be genuinely useful**, not performative. Users come to the product with real emotional weight — relationship conflicts, anxiety spirals, persistent worry. If the AI generates generic platitudes or misreads the emotional register, users feel worse, not better. So the system had to go beyond basic LLM prompting into careful conversation modeling.
2. **Voice interaction changes everything.** Users wanted to speak, not type. Speaking forces real-time STT and TTS with tight latency budgets, which rules out the "just call OpenAI" approach for most of the pipeline.
3. **Privacy is non-negotiable.** Conversations contain the most sensitive data a person has. The platform had to handle that responsibly — in storage, in transmission, and in what gets sent to third-party APIs.

### What We Built

We architected and built the backend of Tula from the ground up:

- **The AI conversation engine.** Built on **Gemini LLM** with extensive prompt engineering and contextual memory. The model doesn't just respond to the latest message — it maintains a conversation history, tracks the user's emotional arc, and adapts its tone and approach over the course of a session.
- **A real-time voice pipeline.** Using open-source TTS and STT components rather than commercial APIs (both for cost and for privacy). Low-latency enough to feel like a natural conversation, not a voice-memo exchange.
- **WebSocket infrastructure** for streaming audio and responses in real time, the same architectural pattern we use for other live-conversation products.
- **Scalable multi-tenant architecture** for the alpha user cohort, built mobile-first.
- **Team leadership.** Beyond the code, this was the first project where our role included tech leadership for a team of other developers — reviewing PRs, setting architectural direction, and holding the quality bar for the frontend work as well as our own backend work.

### Results

| Metric | Outcome |
|---|---|
| Funding raised | $1.2M USD (YC Angel round) |
| Platform stage | Alpha, with test users |
| Conversation quality | Backed by language-pattern framework, not free-form prompting |
| Voice latency | Low enough for natural conversation |
| Team | Full-stack engineering team delivering under my technical leadership |

The investment alone validates the product's approach and the engineering that backs it. Tula is actively scaling and expanding the product from alpha to broader release.

### Reflection

Mental health is one of the areas where AI can genuinely change lives — access to something therapy-like, available at 3am, for anyone — and it's also the area where doing it badly can hurt people. The engineering standard has to be higher than the average "let's wrap ChatGPT" project.

What made Tula work wasn't a single breakthrough. It was:
- Picking the right model (Gemini, for its conversation quality and cost profile)
- Engineering the conversation around a specific linguistic framework, not generic chat
- Building voice right so the experience is conversational, not transactional
- Holding a high quality bar across the whole team, not just our backend

The $1.2M raise is a strong validation of the product, the thesis, and the technical execution.

### Tech Stack

- **Backend:** FastAPI, Python
- **LLM:** Google Gemini with custom prompt engineering + session memory
- **Voice:** Open-source STT/TTS stack (for cost + privacy)
- **Real-time:** WebSocket pipeline for audio streaming
- **Frontend:** ReactJS (team-built under our technical leadership)
- **Infra:** Cloud-native, scalable, mobile-first
- **Compliance:** Privacy controls for mental health data

---

## 5. Medmatch

**URL:** `/work/medmatch`
**Slug:** `medmatch`
**Live product:** Internal (healthcare client, not public-facing)

### Frontmatter

```yaml
---
title: HIPAA-compliant AI voice agent that sounds human
client: Medmatch
industry: HealthTech
year: "2024–2025"
stack: [Python, Voice AI, Real-time STT/TTS, HIPAA Compliance, Full Audit Trail]
outcome: "90% manual work reduction. Sub-second latency. Full audit trail for HIPAA."
cover: /images/work/medmatch-cover.webp
featured: true
order: 5
---
```

### Hero

**Eyebrow:** MEDMATCH · HIPAA-COMPLIANT VOICE AI

**Headline:**
An AI voice agent that sounds human enough to close calls.

**Subhead:**
Medmatch needed an outbound voice system that could autonomously handle healthcare-related call workflows — without sounding robotic, without breaking HIPAA, and without humans in the loop for most calls.

**Meta row:**
Year: 2024–2025 · Industry: HealthTech · Role: End-to-end voice AI system · Status: In production

### 4-column stat row

```
[90%]              [Sub-second]       [HIPAA]              [Real-time]
Manual work         Call latency        Compliant with full  STT/TTS
reduction                               audit trail          pipeline
```

### Overview — The Client

Medmatch operates in the healthcare space where outbound calls are a routine part of the business: confirming appointments, following up on patient events, gathering information from existing records, walking through care next-steps. Historically, these calls required human staff — expensive, slow, and hard to scale when volume spikes.

They needed an AI voice agent that could handle these calls autonomously, at quality indistinguishable from a human caller, and with the compliance controls healthcare demands.

### The Challenge

Voice AI in healthcare is unforgiving. Three constraints stack:

1. **The AI has to sound human.** Patients and providers can instantly tell when a robot is on the phone, and trust collapses. Latency, prosody, pause patterns, and the ability to interrupt gracefully all matter.
2. **HIPAA compliance is mandatory.** Every call touches protected health information. The system has to be auditable, encrypted, access-controlled, and — critically — never send PHI to third-party services that aren't business-associates.
3. **The agent needs to take actions, not just talk.** After the call, outcomes need to flow back into the source system: event created, record updated, task assigned, escalation triggered.

### What We Built

We built an end-to-end AI voice agent with four key capabilities:

- **Context-aware call scripts.** The agent doesn't follow a single rigid script. It receives context from the source system — patient info, call reason, event history — and adapts its approach accordingly. Each call type has its own script template, but the agent personalizes in real time based on what the called party says.
- **Sub-second latency voice pipeline.** Real-time STT and TTS, carefully tuned so the conversational cadence matches a human caller. The AI can interrupt naturally, handle interruptions from the other party, and recover gracefully from overlapping speech.
- **HIPAA-compliant infrastructure.** Encrypted at rest and in transit. Access-controlled. Third-party services are either business-associate-agreement (BAA) ready or handled in-house. Nothing containing PHI leaves the compliant boundary.
- **Full audit trail.** Every call is logged with: full transcript, decisions the agent made, actions it took after the call, and hooks into Medmatch's compliance review flow. If an auditor asks "what did your AI say to patient X on Tuesday," we can show them.
- **Outcome-driven action execution.** After a call ends, the agent writes the outcome back to Medmatch's system: creates events, updates records, summarizes the conversation, and flags anything that needs a human to review.

### Results

| Metric | Outcome |
|---|---|
| Manual call work reduction | ~90% |
| Voice latency | Sub-second, conversational feel |
| Compliance | Full HIPAA with audit trail |
| Call outcome accuracy | High; measured against human-reviewed gold standard |
| Scalability | Runs 24/7, handles volume spikes automatically |

The Medmatch team reclaimed ~90% of the time that was previously spent on routine outbound calls. Their human staff now focuses on the high-touch, high-judgment cases where AI would be the wrong tool.

### Reflection

Voice AI in 2024–2025 finally crossed a threshold where it's deployable in regulated industries. Three years ago you couldn't have built what we built for Medmatch — the latency, the compliance tooling, and the voice quality weren't all there simultaneously. Today they are, and healthcare operations teams that move first are getting an enormous operational lift.

What slows most projects in this space isn't the AI. It's the compliance plumbing. Business-associate agreements, audit trails, encryption, access control — these take months to get right, and they're invisible to the end user. Our view is that if you're going to deploy AI in healthcare, you plan the compliance layer first and the AI second.

### Tech Stack

- **Voice AI:** Real-time STT/TTS, low-latency pipeline
- **Backend:** Python
- **Compliance:** HIPAA-grade encryption, access controls, audit logging
- **Action layer:** Hooks into Medmatch's source system for post-call writeback
- **Escalation:** Human-in-the-loop for flagged cases

---

## 6. FCS / Full Credit Sweep

**URL:** `/work/fcs`
**Slug:** `fcs`
**Live product:** Internal / not public

### Frontmatter

```yaml
---
title: AI pipeline handling 2,000 active users and 68,000 leads
client: FCS (Full Credit Sweep)
industry: FinTech / Credit Services
year: "2024–2025"
stack: [GoHighLevel, Voice AI, AI Messaging, Dashboard, Python]
outcome: "Autonomous AI handling credit-repair lead pipeline end to end"
cover: /images/work/fcs-cover.webp
featured: true
order: 6
---
```

### Hero

**Eyebrow:** FCS · AUTONOMOUS LEAD PIPELINE

**Headline:**
AI that runs a 68,000-lead pipeline on its own.

**Subhead:**
FCS is a credit-improvement service with 2,000 active clients and 68,000 leads moving through their GoHighLevel pipeline. We built the AI tooling that runs the outbound calls, the messages, the document generation, and the client-facing dashboard — so the human team can focus on complex cases.

**Meta row:**
Year: 2024–2025 · Industry: FinTech · Role: End-to-end AI tooling inside GoHighLevel · Status: In production

### 4-column stat row

```
[2,000+]           [68,000]           [End-to-end]         [GoHighLevel]
Active users        Leads in the        AI handles calls,    Integrated natively
                    pipeline            SMS, email, docs     inside the CRM
```

### Overview — The Client

Full Credit Sweep is a credit-improvement company. Clients come in with damaged credit, FCS works through dispute processes, guidance, and documentation to help improve scores over time. The pipeline is large — 68,000 leads at any moment — and most of the work used to be manual: call the lead, qualify them, send documents, write follow-up messages, track progress.

### The Challenge

Credit services live in GoHighLevel — a CRM built for small-business marketing and sales automation. GoHighLevel is flexible but doesn't natively support the AI workflows FCS wanted: autonomous voice calls, AI-generated documents, AI-drafted messages, a client dashboard showing credit progress over time.

The challenge was building all of this **inside GoHighLevel's ecosystem** rather than parallel to it — so the FCS team didn't have to switch tools, and so the AI operated on the same data their human team used.

### What We Built

We built a suite of AI tools wired directly into FCS's GoHighLevel stack:

- **AI voice agent for inbound leads.** When a contact lands in the pipeline, the AI calls them almost immediately. It sounds human, runs a qualifying script, handles objections, and either books the deal, routes to a human, or returns the lead to the nurture flow.
- **AI message generation.** Drafts personalized SMS, email, and chat messages based on where a lead is in the pipeline. Escalates to a human when sentiment or complexity crosses a threshold.
- **AI document generation.** Credit improvement generates a lot of paperwork: dispute letters, authorization forms, progress summaries. The AI produces them, tailored to each lead's specific credit situation.
- **Client-side progress dashboard.** For each active client, a dashboard showing credit scores over time, disputes filed, outcomes, and upcoming actions. Clients can log in, see progress visually, and understand what FCS is doing for them.
- **Audit-ready call summaries.** Every AI call produces a summary, is logged against the lead record, and is viewable by the human team for review.

### Results

| Metric | Outcome |
|---|---|
| Active clients handled | 2,000+ |
| Leads in pipeline | 68,000 |
| AI coverage | Calls + messages + documents, end-to-end |
| Team time saved | Substantial — human team focuses on complex cases only |
| Platform | Native inside GoHighLevel, no separate tools |

FCS went from a high-touch manual pipeline to a mostly-autonomous pipeline that the human team supervises rather than runs. The AI handles the long tail; humans handle the high-value edge cases.

### Reflection

The interesting pattern in FCS is **meeting clients where they are.** Most AI consultants would've tried to migrate FCS off GoHighLevel onto a "proper" custom stack. We did the opposite — we built inside their existing tools, because those are the tools their team knows, uses every day, and trusts.

Building AI into a CRM you don't own takes more careful engineering than building a standalone app. You're working with API rate limits, webhook reliability, nested custom fields, and a UI you can't fully customize. But the ROI is enormous because there's no adoption cost for the client. The AI just shows up and starts doing the work.

### Tech Stack

- **Core platform:** GoHighLevel (CRM + marketing automation)
- **AI layer:** Python services integrated via GHL API and webhooks
- **Voice AI:** Real-time voice agent with human-like conversational style
- **Message generation:** LLM-drafted SMS, email, chat
- **Document generation:** Template + LLM personalization for credit letters
- **Dashboard:** Custom client-facing view surfaced inside FCS's portal
- **Audit trail:** Call + message + action logs against every lead record

---

## 7. Bestinform.eu (shorter case study)

**URL:** `/work/bestinform`
**Slug:** `bestinform`
**Live product:** https://bestinform.eu/

### Frontmatter

```yaml
---
title: International airline ticketing platform built on Java + Angular
client: Bestinform.eu
industry: Travel / Aviation
year: "2023–2024"
stack: [Java, Angular, GitHub Actions, VPS Automation, GDS Integrations]
outcome: "End-to-end ticketing platform with complex GDS + payment integrations"
cover: /images/work/bestinform-cover.webp
featured: true
order: 7
---
```

### Hero

**Eyebrow:** BESTINFORM.EU · FULL-STACK TICKETING PLATFORM

**Headline:**
An international airline ticketing platform that actually works under load.

**Subhead:**
We built the end-to-end platform — Java backend, Angular frontend, CI/CD automation on a VPS — with complex integrations to Global Distribution Systems (GDS) and payment gateways.

### 4-column stat row

```
[GDS Integrations]  [Payment Gateways]  [Full CI/CD]         [Production]
Multiple airline     Secure, compliant    GitHub Actions +     Serving real
ticketing systems    payment processing   VPS automation       bookings
```

### Overview

Bestinform.eu is a European airline ticketing platform that helps customers book international flights across carriers and routes. Behind the simple booking interface sits a non-trivial engineering problem: integrating with Global Distribution Systems (the multi-airline inventory backbones of the travel industry), handling secure payments, managing customer data, and doing it all with the reliability a booking system demands.

### What We Built

- **Full backend in Java**, scalable and built for real booking transactions
- **Angular frontend** that the user sees — dynamic, responsive, handles the complexity of multi-leg flights and fare rules
- **Integrations with multiple GDS systems** — each with its own API quirks, error states, and fare logic
- **Payment gateway integrations** — PCI-DSS considerations, 3DS flows, refund handling
- **End-to-end CI/CD pipeline** on a VPS using GitHub Actions. Deployments are automated, tested, and safe
- **Security hardening** at the infrastructure and application layers

### Reflection

Travel-tech is underrated as an engineering domain. From the outside it looks like "book a flight, done." From the inside it's one of the most complex integration projects in commercial software — because you're integrating with systems that were designed in the 1970s and haven't fundamentally changed. Getting it right requires patience, defensive programming, and a willingness to handle every edge case the airlines throw at you.

### Tech Stack

Java, Angular, GitHub Actions, VPS automation, GDS integrations, payment gateway integrations, secure auth, CI/CD.

---

## 8. Sony PlayStation (shorter case study)

**URL:** `/work/sony-playstation`
**Slug:** `sony-playstation`
**Live product:** Internal at Sony

### Frontmatter

```yaml
---
title: 120× faster survey data pipeline at Sony PlayStation scale
client: Sony PlayStation
industry: Gaming / Enterprise Data
year: "2023–2024"
stack: [Python, Java, ReactJS, CI/CD, ETL Pipeline Optimization]
outcome: "Survey compilation reduced from days to ~1 hour at 5M+ record scale"
cover: /images/work/sony-cover.webp
featured: true
order: 8
---
```

### Hero

**Eyebrow:** SONY PLAYSTATION · DATA PIPELINE OPTIMIZATION

**Headline:**
120× faster. 5 million surveys. Days became hours.

**Subhead:**
Sony PlayStation ran hundreds of thousands of internal surveys across their global teams. Their existing compilation pipeline worked — slowly. We rewrote the core, migrated performance-critical paths into faster languages, and turned a days-long job into a ~1-hour process.

### 4-column stat row

```
[120×]              [5,000,000+]       [Days → 1 hour]     [ReactJS + CI/CD]
Performance gain    Surveys compiled    Compilation time    End-to-end platform
```

### Overview

Sony PlayStation operates at a scale where even "small" internal tools have to handle millions of records. Their survey system — used for employee surveys, product surveys, UX research — compiled data from hundreds of thousands of individual surveys into aggregated reports. The pipeline worked reliably. It just took days to run.

### What We Built

- **Re-architected the core pipeline.** Moved slow Python logic into performance-critical paths written in Java and optimized code, with parallel processing where applicable.
- **Rewrote the database layer** for speed — query optimization, indexing strategies, batch processing.
- **Rebuilt the ETL pipeline** so aggregations happen in the right order, with retries, observability, and partial-recovery on failure.
- **Built a React-based dashboard** where the internal Sony team could see survey outcomes and drill into results.
- **Set up CI/CD** with GitHub Actions so the platform could be updated safely as internal needs changed.

### Results

| Metric | Before | After |
|---|---|---|
| Survey compilation time | Days | ~1 hour |
| Performance gain | Baseline | **120×** |
| Records at scale | 5,000,000+ | 5,000,000+ |
| Pipeline reliability | Working but slow | Fast, observable, recoverable |

### Reflection

Most "120×" performance numbers come from replacing obviously-bad code with obviously-good code. This one came from something subtler: recognizing that the original pipeline wasn't bad Python — it was *well-written* Python trying to do a job that Python isn't good at. The fix was to keep Python for the glue logic and move the hot paths into Java, where the same algorithm runs an order of magnitude faster. Picking the right tool for each layer, not trying to do everything in one language, is where big wins live.

### Tech Stack

Python (glue layer), Java (performance-critical paths), ReactJS (dashboard), CI/CD with GitHub Actions, optimized ETL pipeline, parallel processing.

---

## End of Case Studies

**Totals:**
- 6 flagship long-form case studies (Aphra, Capwell, KCNL, Tula, Medmatch, FCS)
- 2 shorter supplemental case studies (Bestinform, Sony PlayStation)
- Each has frontmatter ready for MDX ingestion
- Each is deep-linkable for sharing (LinkedIn, email, proposals)
- Each has a consistent structure: Hero → Stats → Overview → Challenge → What We Built → Results → Reflection → Tech Stack
- Voice is first-person plural ("we"), matches main site tone
- All clients named publicly (per your decision), specific metrics cited

**For each case study, you'll also need:**
- Cover image (16:9 ratio, 1600×900 recommended) — save to `/public/images/work/[slug]-cover.webp`
- (Optional) Screenshots of the product in use, diagrams, or product mockups inline
- Optionally, a client quote pulled from your Upwork reviews where applicable

If you want, I can draft suggested alt text for each case study's cover image, or write the JSON-LD structured data for each one to help with SEO.

— End —
