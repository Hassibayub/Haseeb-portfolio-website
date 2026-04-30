export function PricingPhilosophy() {
  return (
    <section
      id="pricing-philosophy"
      className="py-[88px] md:py-[140px]"
      style={{ backgroundColor: '#1D2020' }}
    >
      <div className="container-tight text-center max-w-[720px]">
        <p className="text-label mb-6" style={{ color: '#A6A6A6' }}>
          note on pricing
        </p>

        <h2
          className="font-body font-medium leading-[1.08] tracking-tight mb-8"
          style={{
            fontSize: 'clamp(36px, 5vw, 56px)',
            color: '#F3F2F1',
            letterSpacing: '-0.02em',
          }}
        >
          We don&apos;t do hourly for fixed-scope work.
        </h2>

        <div className="space-y-5">
          <p
            className="font-body text-[20px] leading-[1.5]"
            style={{ color: '#C4C4C4' }}
          >
            You know the cost, the deliverables, and the timeline before you send
            a dollar. Milestones are written, invoiced, and paid on delivery.
            Scope creep is a planning failure, not a billing event.
          </p>
          <p
            className="font-body text-[20px] leading-[1.5]"
            style={{ color: '#C4C4C4' }}
          >
            If you need ongoing work, retainers run $8,000 to $15,000 per month
            for a dedicated senior engineer embedded in your team.
          </p>
        </div>

        {/* Stat row */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { value: '93%', label: 'Projects delivered at fixed price' },
            { value: '0', label: 'Scope disputes in 2024' },
            { value: '0', label: 'Projects that ran over on time' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="px-6 py-5"
              style={{ border: '1px solid #3A3A3A', borderRadius: 12 }}
            >
              <div
                className="text-[40px] font-sans"
                style={{ color: '#D8F9B8' }}
              >
                {stat.value}
              </div>
              <div
                className="mt-2 text-[14px] leading-[1.45]"
                style={{ color: '#A6A6A6' }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
