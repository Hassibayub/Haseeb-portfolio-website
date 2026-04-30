const items = [
  {
    label: 'Senior AI Architect Review',
    detail:
      'Up to 10 hours of Muhammad Haseeb\u2019s time. Stack selection, model choices, fallbacks, failure modes, why.',
    value: '$2,500',
    note: 'Staff-level AI engineer rate on Toptal: ~$250/hr',
  },
  {
    label: 'Working Technical Spike',
    detail:
      'A runnable proof-of-concept of the riskiest component. Not a demo. Real code, in a repo, that works.',
    value: '$4,000',
    note: 'A full week of senior engineering effort',
  },
  {
    label: 'Cost Model at 3 Scales',
    detail:
      'Per-request, per-user, per-month infra and LLM cost at 100, 10K, and 100K users. The math, not the hand-wave.',
    value: '$1,500',
    note: 'Most consultants charge 5 figures for this alone',
  },
  {
    label: 'Architecture Document',
    detail:
      '15 to 25 pages. System diagrams, data flow, observability, security, compliance. The doc your CTO will read.',
    value: '$1,000',
    note: 'Written to survive due diligence',
  },
  {
    label: 'Risk Register + Mitigations',
    detail:
      'Top 10 things that will kill the project, ranked, with mitigations. The questions your investors will ask.',
    value: '$1,500',
    note: 'What actually kills AI projects, documented',
  },
  {
    label: 'Locked Fixed-Price Build Quote',
    detail:
      'Milestone-by-milestone quote for the full build, locked for 30 days. No surprise invoices downstream.',
    value: '$500',
    note: '30-day price lock included',
  },
];

export function AuditValueStack() {
  const totalValue = 11000;
  return (
    <section
      id="value-stack"
      className="py-[88px] md:py-[140px]"
      style={{ backgroundColor: '#F3F2F1' }}
    >
      <div className="container-tight max-w-[1100px]">
        <div className="max-w-[720px] mb-12 md:mb-16">
          <p className="text-label mb-6" style={{ color: '#8C8C8C' }}>
            what you get
          </p>
          <h2
            className="font-body font-medium leading-[1.08] tracking-tight"
            style={{
              fontSize: 'clamp(36px, 5vw, 56px)',
              color: '#1D2020',
              letterSpacing: '-0.02em',
            }}
          >
            Six deliverables. Senior-led. In writing.
          </h2>
          <p
            className="mt-6 font-body text-[18px] leading-[1.55]"
            style={{ color: '#5A5C5C' }}
          >
            Everything a reasonable board, investor, or CTO would want to see
            before a build gets greenlit.
          </p>
        </div>

        <div
          className="overflow-hidden"
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E6E6E6',
            borderRadius: 16,
          }}
        >
          {items.map((item, i) => (
            <div
              key={item.label}
              className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 md:gap-10 px-6 md:px-10 py-7"
              style={{
                borderTop: i === 0 ? 'none' : '1px solid #F0F0F0',
              }}
            >
              <div>
                <p
                  className="font-mono text-[11px] tracking-[0.08em] lowercase mb-2"
                  style={{ color: '#8C8C8C' }}
                >
                  item_{String(i + 1).padStart(2, '0')}
                </p>
                <h3
                  className="font-body font-medium text-[20px] leading-[1.3] mb-2"
                  style={{ color: '#1D2020' }}
                >
                  {item.label}
                </h3>
                <p
                  className="font-body text-[15px] leading-[1.55]"
                  style={{ color: '#5A5C5C' }}
                >
                  {item.detail}
                </p>
                <p className="mt-2 text-[12px]" style={{ color: '#8C8C8C' }}>
                  {item.note}
                </p>
              </div>
              <div className="md:text-right md:self-start">
                <p
                  className="font-display"
                  style={{ fontSize: 32, color: '#1D2020', lineHeight: 1 }}
                >
                  {item.value}
                </p>
                <p
                  className="mt-1 font-mono text-[11px] lowercase"
                  style={{ color: '#8C8C8C' }}
                >
                  standalone value
                </p>
              </div>
            </div>
          ))}

          <div
            className="px-6 md:px-10 py-8 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 md:gap-10"
            style={{
              borderTop: '1px solid #1D2020',
              backgroundColor: '#1D2020',
              color: '#F3F2F1',
            }}
          >
            <div>
              <p
                className="font-mono text-[11px] tracking-[0.08em] lowercase mb-2"
                style={{ color: '#A6A6A6' }}
              >
                total value
              </p>
              <p
                className="font-body font-medium text-[22px]"
                style={{ color: '#F3F2F1' }}
              >
                ${totalValue.toLocaleString()} of senior AI consulting
              </p>
              <p
                className="mt-2 font-body text-[15px]"
                style={{ color: '#C4C4C4' }}
              >
                Your price: <span style={{ color: '#D8F9B8', fontWeight: 500 }}>$3,000</span>.
                Delivered in 14 days. Credited in full if you hire us for the
                build.
              </p>
            </div>
            <div className="md:text-right">
              <p
                className="font-display"
                style={{ fontSize: 48, color: '#D8F9B8', lineHeight: 1 }}
              >
                3.7&times;
              </p>
              <p
                className="mt-1 font-mono text-[11px] lowercase"
                style={{ color: '#A6A6A6' }}
              >
                value to price
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
