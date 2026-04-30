export function AuditStakes() {
  return (
    <section
      className="py-[88px] md:py-[140px]"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <div className="container-tight max-w-[960px]">
        <p className="text-label mb-6" style={{ color: '#8C8C8C' }}>
          the stakes
        </p>

        <h2
          className="font-body font-medium leading-[1.08] tracking-tight mb-10"
          style={{
            fontSize: 'clamp(36px, 5vw, 56px)',
            color: '#1D2020',
            letterSpacing: '-0.02em',
          }}
        >
          Most AI projects don&apos;t fail on code. They fail on scope.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div
            className="p-7"
            style={{ border: '1px solid #E6E6E6', borderRadius: 12 }}
          >
            <p
              className="font-display"
              style={{ fontSize: 48, color: '#1D2020', lineHeight: 1 }}
            >
              80%
            </p>
            <p
              className="mt-4 text-[15px] leading-[1.5]"
              style={{ color: '#5A5C5C' }}
            >
              of enterprise AI pilots never reach production.
            </p>
            <p className="mt-3 text-[12px]" style={{ color: '#8C8C8C' }}>
              Gartner, 2024
            </p>
          </div>
          <div
            className="p-7"
            style={{ border: '1px solid #E6E6E6', borderRadius: 12 }}
          >
            <p
              className="font-display"
              style={{ fontSize: 48, color: '#1D2020', lineHeight: 1 }}
            >
              $200K
            </p>
            <p
              className="mt-4 text-[15px] leading-[1.5]"
              style={{ color: '#5A5C5C' }}
            >
              average burn on a failed pilot before the plug gets pulled.
            </p>
            <p className="mt-3 text-[12px]" style={{ color: '#8C8C8C' }}>
              Industry benchmarks
            </p>
          </div>
          <div
            className="p-7"
            style={{ border: '1px solid #E6E6E6', borderRadius: 12 }}
          >
            <p
              className="font-display"
              style={{ fontSize: 48, color: '#1D2020', lineHeight: 1 }}
            >
              #1
            </p>
            <p
              className="mt-4 text-[15px] leading-[1.5]"
              style={{ color: '#5A5C5C' }}
            >
              killer: the team didn&apos;t validate the riskiest assumption
              first. That&apos;s the hole this audit plugs.
            </p>
            <p className="mt-3 text-[12px]" style={{ color: '#8C8C8C' }}>
              Observed across 49 engagements
            </p>
          </div>
        </div>

        <p
          className="font-body text-[18px] leading-[1.55] max-w-[720px]"
          style={{ color: '#5A5C5C' }}
        >
          Every failed AI project I&apos;ve cleaned up looked fine on paper.
          The Figma was clean. The pitch deck said the right words. The team
          skipped the one uncomfortable question: <em>what is the hardest
          technical assumption here, and does it actually hold?</em> Two weeks,
          a real spike, and a written plan is all it takes to know before you
          commit $80K to building the wrong thing.
        </p>
      </div>
    </section>
  );
}
