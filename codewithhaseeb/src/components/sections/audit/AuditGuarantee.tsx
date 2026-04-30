const guarantees = [
  {
    number: '01',
    title: '14-day delivery guarantee',
    body: 'If you don\u2019t have the full package in 14 calendar days from kickoff, the audit is free. You keep everything we\u2019ve produced.',
  },
  {
    number: '02',
    title: 'Spike-works guarantee',
    body: 'The technical spike will run end-to-end against your real data and constraints \u2014 or we keep working on it at our cost until it does.',
  },
  {
    number: '03',
    title: 'Credit-back guarantee',
    body: 'If you hire us for the full build within 30 days of the audit, the full $3,000 is credited to your engagement. The audit becomes free.',
  },
];

export function AuditGuarantee() {
  return (
    <section
      className="py-[88px] md:py-[140px]"
      style={{ backgroundColor: '#1D2020' }}
    >
      <div className="container-tight max-w-[960px]">
        <p className="text-label mb-6" style={{ color: '#A6A6A6' }}>
          the triple guarantee
        </p>

        <h2
          className="font-body font-medium leading-[1.08] tracking-tight mb-10"
          style={{
            fontSize: 'clamp(36px, 5vw, 56px)',
            color: '#F3F2F1',
            letterSpacing: '-0.02em',
          }}
        >
          You shouldn&apos;t carry the risk. We should.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guarantees.map((g) => (
            <div
              key={g.number}
              className="p-7"
              style={{
                border: '1px solid #3A3A3A',
                borderRadius: 12,
                backgroundColor: '#242527',
              }}
            >
              <p
                className="font-mono text-[12px] tracking-[0.08em] mb-4"
                style={{ color: '#D8F9B8' }}
              >
                {g.number}
              </p>
              <h3
                className="font-body font-medium text-[20px] leading-[1.3] mb-3"
                style={{ color: '#F3F2F1' }}
              >
                {g.title}
              </h3>
              <p
                className="font-body text-[15px] leading-[1.55]"
                style={{ color: '#C4C4C4' }}
              >
                {g.body}
              </p>
            </div>
          ))}
        </div>

        <p
          className="mt-12 font-body text-[18px] leading-[1.55] max-w-[640px]"
          style={{ color: '#C4C4C4' }}
        >
          Translation: if we&apos;re the right team, the audit costs you
          nothing. If we&apos;re not, you walk away with $11,000 of senior AI
          consulting and a fixed-price quote you can take to any other agency.
          The only bad outcome for you is the one that doesn&apos;t exist.
        </p>
      </div>
    </section>
  );
}
