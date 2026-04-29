import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export function ForFoundersEnterprise() {
  return (
    <section className="py-32 md:py-40" style={{ backgroundColor: '#1D2020' }}>
      <div className="container-tight">

        {/* Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="text-label mb-4" style={{ color: 'rgba(255,255,255,0.35)' }}>
            How we work with you
          </p>
          <h2 className="font-display text-display-md" style={{ color: '#F1F0EE' }}>
            Different buyers, different paths.
            <br />
            Same bar for what ships.
          </h2>
        </div>

        {/* Two cards */}
        <div className="grid lg:grid-cols-2 gap-5">
          <BuyerCard
            label="FOR FUNDED STARTUPS"
            title="Your MVP, in production, in 6 weeks."
            body="You've raised your round. Your AI product idea is validated. You need a senior team that ships real code. Not a cheap freelancer who'll waste 3 months on a broken demo."
            bullets={[
              'Week 1: Scoping, architecture, tech decisions',
              'Weeks 2 to 5: Sprints with a working demo every Friday',
              'Week 6: Launch-ready, deployed, monitored',
              '30 days of bug-fix support included',
            ]}
            price="Typical engagement: $15K to $50K fixed-price, 6 to 10 weeks"
            ctaLabel="See a founder case study"
            ctaHref="/work/aphra"
          />
          <BuyerCard
            label="FOR SMB OPERATIONS"
            title="Replace weeks of manual work with AI that runs itself."
            body="You have a manual process eating your team's time. Invoice processing, lead follow-up, data aggregation. We build autonomous AI agents that handle it end-to-end: audit trails, cost controls, and compliance built in from day one."
            bullets={[
              'Audit your existing workflow in week 1',
              'Build the agent in weeks 2 to 4',
              'Shadow-mode rollout in week 5 (runs alongside human to verify)',
              'Full cutover in week 6, ongoing support',
            ]}
            price="Typical engagement: $8K to $25K fixed-price, 4 to 6 weeks"
            ctaLabel="See an SMB case study"
            ctaHref="/work/capwell"
          />
        </div>
      </div>
    </section>
  );
}

function BuyerCard({
  label,
  title,
  body,
  bullets,
  price,
  ctaLabel,
  ctaHref,
}: {
  label: string;
  title: string;
  body: string;
  bullets: string[];
  price: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <article
      className="rounded-2xl p-8 md:p-10 flex flex-col border"
      style={{
        backgroundColor: '#242727',
        borderColor: 'rgba(255,255,255,0.06)',
      }}
    >
      <p className="text-label mb-4" style={{ color: 'rgba(216,249,184,0.7)' }}>
        {label}
      </p>
      <h3 className="font-display text-display-sm mb-4" style={{ color: '#F1F0EE' }}>
        {title}
      </h3>
      <p className="text-base leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}>
        {body}
      </p>

      <ul className="space-y-2 mb-6 text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
        {bullets.map((b) => (
          <li key={b} className="flex gap-2.5">
            <span className="mt-0.5 flex-shrink-0 text-[10px]" style={{ color: '#D8F9B8' }}>◆</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <p className="text-sm italic mb-8" style={{ color: 'rgba(255,255,255,0.25)' }}>
        {price}
      </p>

      <Link
        href={ctaHref}
        className="group mt-auto inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
        style={{ color: 'rgba(255,255,255,0.6)' }}
      >
        {ctaLabel}
        <ArrowUpRight
          size={15}
          className="opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
        />
      </Link>
    </article>
  );
}
