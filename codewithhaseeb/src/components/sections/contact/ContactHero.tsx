export function ContactHero() {
  return (
    <section
      className="pt-[96px] pb-[32px] md:pt-[160px] md:pb-[48px]"
      style={{ backgroundColor: '#F3F2F1' }}
    >
      <div className="container-tight">
        <div style={{ maxWidth: 720 }}>
          <p
            className="text-label mb-6"
            style={{ color: '#8C8C8C' }}
          >
            contact
          </p>

          <h1
            className="font-body font-medium leading-[1.08] tracking-tight"
            style={{
              fontSize: 'clamp(42px, 6.5vw, 72px)',
              color: '#1D2020',
              letterSpacing: '-0.02em',
            }}
          >
            Four questions.
            <br />
            Sixty seconds.
          </h1>

          <p
            className="font-body text-[19px] leading-[1.55] mt-6"
            style={{ color: '#5A5C5C', maxWidth: 560 }}
          >
            If we're a fit, you'll get a scoping-call link within one business day.
            If we're not, we'll tell you who is.
          </p>
        </div>
      </div>
    </section>
  );
}
