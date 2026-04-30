const goodFits = [
  'You\u2019re a funded founder (pre-seed to Series A) with an AI product idea that needs to be real code, not a demo.',
  'You\u2019re an SMB ops leader who\u2019s been quoted $80K+ by an agency and suspects they\u2019re overcharging or overscoping.',
  'You\u2019ve had at least one AI project fail or stall in the last 12 months, and you\u2019re not eager for a repeat.',
  'You have $15K+ earmarked for the actual build, and you want to de-risk it before writing that check.',
  'You can commit 2 hours of your team\u2019s time during the audit window for kickoff and walkthrough.',
];

const badFits = [
  'You want a logo, a pitch deck, or a Figma file. We don\u2019t do those, and we\u2019ll refer you to someone who does.',
  'You\u2019re pre-idea or in pure exploration. We don\u2019t do ideation workshops \u2014 we do production readiness.',
  'You want hourly engineers or a body shop. We don\u2019t sell hours, we sell outcomes.',
  'You already have an architecture you trust and just need hands. Skip the audit, go straight to a build engagement.',
  'You need something in under 14 days. We take two audits per month. We don\u2019t rush scoping.',
];

export function AuditWhoFor() {
  return (
    <section
      className="py-[88px] md:py-[140px]"
      style={{ backgroundColor: '#F3F2F1' }}
    >
      <div className="container-tight max-w-[1100px]">
        <div className="max-w-[720px] mb-12 md:mb-16">
          <p className="text-label mb-6" style={{ color: '#8C8C8C' }}>
            who it&apos;s for
          </p>
          <h2
            className="font-body font-medium leading-[1.08] tracking-tight"
            style={{
              fontSize: 'clamp(36px, 5vw, 56px)',
              color: '#1D2020',
              letterSpacing: '-0.02em',
            }}
          >
            We&apos;d rather tell you no now than waste your 14 days.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className="p-8"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E6E6E6',
              borderRadius: 16,
            }}
          >
            <p
              className="font-mono text-[11px] tracking-[0.08em] lowercase mb-4"
              style={{ color: '#6D5EF3' }}
            >
              good fit
            </p>
            <h3
              className="font-body font-medium text-[22px] leading-[1.3] mb-5"
              style={{ color: '#1D2020' }}
            >
              You should book this audit if&hellip;
            </h3>
            <ul className="space-y-4">
              {goodFits.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span
                    className="font-mono text-[14px] mt-0.5"
                    style={{ color: '#1D2020' }}
                  >
                    +
                  </span>
                  <span
                    className="font-body text-[15px] leading-[1.55]"
                    style={{ color: '#2B2D2D' }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="p-8"
            style={{
              backgroundColor: '#1D2020',
              borderRadius: 16,
            }}
          >
            <p
              className="font-mono text-[11px] tracking-[0.08em] lowercase mb-4"
              style={{ color: '#D8F9B8' }}
            >
              not a fit
            </p>
            <h3
              className="font-body font-medium text-[22px] leading-[1.3] mb-5"
              style={{ color: '#F3F2F1' }}
            >
              Don&apos;t book it if&hellip;
            </h3>
            <ul className="space-y-4">
              {badFits.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span
                    className="font-mono text-[14px] mt-0.5"
                    style={{ color: '#D8F9B8' }}
                  >
                    &minus;
                  </span>
                  <span
                    className="font-body text-[15px] leading-[1.55]"
                    style={{ color: '#C4C4C4' }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
