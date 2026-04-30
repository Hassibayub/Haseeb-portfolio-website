const timeline = [
  {
    day: 'Day 1',
    title: 'Kickoff call',
    body: '60-minute architecture interview. We walk your idea, your constraints, your users, your team, your risk budget.',
  },
  {
    day: 'Day 2 to 3',
    title: 'Stack + cost analysis',
    body: 'Model selection, hosting decisions, per-request cost math at 3 scales. First draft of the architecture doc.',
  },
  {
    day: 'Day 4 to 9',
    title: 'Build the technical spike',
    body: 'The riskiest component, built for real. Real data, real calls, real latency. In a repo you\u2019ll own on day 14.',
  },
  {
    day: 'Day 10 to 12',
    title: 'Build plan + risk register',
    body: 'Milestones, deliverables, dependencies, fixed-price quote. Top 10 failure modes with mitigations.',
  },
  {
    day: 'Day 13',
    title: 'Internal QA',
    body: 'Senior cross-review against our internal checklist. Nothing ships until it clears.',
  },
  {
    day: 'Day 14',
    title: 'Walkthrough + handover',
    body: '90-minute recorded session. We defend every decision. You own the repo, the docs, the cost model, the quote.',
  },
];

export function AuditTimeline() {
  return (
    <section
      className="py-[88px] md:py-[140px]"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <div className="container-tight max-w-[1100px]">
        <div className="max-w-[720px] mb-12 md:mb-16">
          <p className="text-label mb-6" style={{ color: '#8C8C8C' }}>
            how it works
          </p>
          <h2
            className="font-body font-medium leading-[1.08] tracking-tight"
            style={{
              fontSize: 'clamp(36px, 5vw, 56px)',
              color: '#1D2020',
              letterSpacing: '-0.02em',
            }}
          >
            Fourteen days. Six deliverables. One answer.
          </h2>
          <p
            className="mt-6 font-body text-[18px] leading-[1.55]"
            style={{ color: '#5A5C5C' }}
          >
            You&apos;ll have a working spike of the hardest part on day 9.
            Everything else is polish and paperwork.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {timeline.map((step, i) => (
            <div
              key={step.day}
              className="p-7"
              style={{
                border: '1px solid #E6E6E6',
                borderRadius: 12,
                backgroundColor: i % 2 === 0 ? '#F3F2F1' : '#FFFFFF',
              }}
            >
              <p
                className="font-mono text-[12px] tracking-[0.08em] lowercase mb-3"
                style={{ color: '#6D5EF3' }}
              >
                {step.day.toLowerCase()}
              </p>
              <h3
                className="font-body font-medium text-[22px] leading-[1.3] mb-3"
                style={{ color: '#1D2020' }}
              >
                {step.title}
              </h3>
              <p
                className="font-body text-[15px] leading-[1.55]"
                style={{ color: '#5A5C5C' }}
              >
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
