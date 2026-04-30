export function WorkHero() {
  return (
    <section
      className="pt-[120px] pb-[40px] md:pt-[192px] md:pb-[64px] overflow-hidden"
      style={{ backgroundColor: '#F3F2F1' }}
    >
      <div className="container-tight">
        <p
          className="text-label mb-6"
          style={{ color: '#8C8C8C' }}
        >
          work
        </p>

        <h1
          className="font-body font-medium leading-[1.08] tracking-tight mb-6"
          style={{
            fontSize: 'clamp(48px, 7vw, 88px)',
            color: '#1D2020',
            letterSpacing: '-0.02em',
          }}
        >
          Eight systems. Real metrics.
          <br />
          No demos.
        </h1>

        <p
          className="font-body text-[20px] leading-[1.5] max-w-[640px] mt-6"
          style={{ color: '#5A5C5C' }}
        >
          Everything here is in production or was shipped as part of a paid
          engagement. We picked outcomes over screenshots.
        </p>

        {/* Stat strip */}
        <div className="mt-12 flex flex-wrap gap-x-10 gap-y-6">
          {[
            { num: '17K', label: 'active users at Aphra' },
            { num: '$100K to $1.5K', label: 'monthly LLM cost at KCNL' },
            { num: '500K', label: 'records processed for Capwell' },
            { num: '$1.2M', label: 'raised by Tula' },
            { num: '68K', label: 'leads automated for FCS' },
          ].map((s) => (
            <div key={s.label}>
              <div
                className="text-[28px] font-sans font-medium"
                style={{ color: '#1D2020' }}
              >
                {s.num}
              </div>
              <div
                className="mt-1 text-[12px]"
                style={{ color: '#5A5C5C' }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
