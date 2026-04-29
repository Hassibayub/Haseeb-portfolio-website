import { siteConfig } from '@/lib/siteConfig';

const emojiMap: Record<string, string> = {
  'ai-saas-mvp':          '🧠',
  'ai-agents':            '🤖',
  'voice-ai':             '🎙️',
  'llm-cost-optimization':'⚡',
  'ai-automation':        '📊',
  'senior-fullstack':     '🔧',
};

export function ServicesGrid() {
  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: '#F3F2F1' }}>
      <div className="container-tight">

        {/* Header */}
        <div className="mb-12 md:mb-16 max-w-3xl">
          <p className="text-label mb-4" style={{ color: '#8C8C8C' }}>
            What we build
          </p>
          <h2 className="font-display text-display-md" style={{ color: '#1D2020' }}>
            Six things we do well. We pass on the rest.
          </h2>
          <p className="mt-5 text-lg leading-relaxed" style={{ color: '#666666' }}>
            We&apos;re specialists, not generalists. If it&apos;s not AI, automation, or senior
            engineering, we&apos;ll refer you to someone better suited.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {siteConfig.services.map((service) => (
            <div
              key={service.slug}
              className="rounded-2xl p-8 flex flex-col transition-all duration-200"
              style={{
                backgroundColor: '#FFFFFF',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.04)',
              }}
            >
              <span className="text-4xl mb-5 leading-none select-none" role="img" aria-hidden="true">
                {emojiMap[service.slug] ?? '🧠'}
              </span>
              <h3
                className="font-sans font-medium text-[18px] mb-2"
                style={{ color: '#1D2020' }}
              >
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#666666' }}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
