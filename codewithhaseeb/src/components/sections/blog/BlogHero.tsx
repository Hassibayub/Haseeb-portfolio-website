export function BlogHero() {
  return (
    <section
      className="pt-[96px] pb-[40px] md:pt-[160px] md:pb-[56px]"
      style={{ backgroundColor: '#F3F2F1' }}
    >
      <div className="container-tight">
        <div style={{ maxWidth: 760 }}>
          <p
            className="font-mono text-[12px] tracking-[0.08em] lowercase mb-6"
            style={{ color: '#8C8C8C' }}
          >
            notes
          </p>
          <h1
            className="font-body font-medium leading-[1.08] tracking-tight"
            style={{
              fontSize: 'clamp(48px, 6.5vw, 72px)',
              letterSpacing: '-0.02em',
              color: '#1D2020',
            }}
          >
            Field notes on shipping
            <br />
            production AI.
          </h1>
          <p
            className="font-body leading-[1.55] mt-6"
            style={{ fontSize: 20, color: '#5A5C5C', maxWidth: 560 }}
          >
            Mostly about agents, cost, and the gap between demos and systems that
            survive real users. Written when we have something worth writing.
          </p>
        </div>
      </div>
    </section>
  );
}
