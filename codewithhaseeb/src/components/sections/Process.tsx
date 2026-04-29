import { siteConfig } from '@/lib/siteConfig';

export function Process() {
  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container-tight">

        {/* Header */}
        <div className="mb-12 md:mb-16 max-w-3xl">
          <p className="text-label mb-4" style={{ color: '#8C8C8C' }}>
            How we work
          </p>
          <h2 className="font-display text-display-md" style={{ color: '#1D2020' }}>
            A process that respects your time and budget.
          </h2>
          <p className="mt-5 text-lg leading-relaxed" style={{ color: '#666666' }}>
            No scope-creep games. No surprise invoices. No ghosting.
          </p>
        </div>

        {/* Steps */}
        <ol className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10">
          {siteConfig.process.map((step) => (
            <li
              key={step.number}
              className="flex flex-col"
            >
              <p
                className="font-display leading-none mb-5"
                style={{ fontSize: '72px', color: '#D8F9B8', letterSpacing: '-0.04em', lineHeight: 1 }}
              >
                {step.number}
              </p>
              <p
                className="text-label mb-2"
                style={{ color: '#1D2020' }}
              >
                {step.title}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: '#666666' }}>
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
