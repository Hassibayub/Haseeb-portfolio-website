import { IconArrowRight } from '@tabler/icons-react';

export function ProofArtifact() {
  return (
    <div
      className="mt-20 p-8 md:p-12 lg:p-14"
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E7E6E4',
        borderRadius: 24,
      }}
    >
      {/* Transformation line */}
      <div className="flex items-center flex-wrap gap-3">
        <span
          className="font-body font-medium leading-[1.1]"
          style={{
            fontSize: 'clamp(44px, 7vw, 72px)',
            color: '#1D2020',
            opacity: 0.6,
            letterSpacing: '-0.02em',
          }}
        >
          $100,000
        </span>

        <IconArrowRight
          size={32}
          stroke={1.5}
          className="mx-3 md:mx-6 shrink-0"
          style={{ color: '#1D2020' }}
        />

        <span
          className="font-body font-medium leading-[1.1]"
          style={{
            fontSize: 'clamp(44px, 7vw, 72px)',
            color: '#1D2020',
            letterSpacing: '-0.02em',
          }}
        >
          $1,500
        </span>
      </div>

      {/* Explanation */}
      <p
        className="font-body text-[18px] leading-[1.55] mt-6 max-w-[520px]"
        style={{ color: '#5A5C5C' }}
      >
        Monthly LLM bill, cut 98% without changing the product.
        GDPR compliant. Full audit trail. Delivered in 4 weeks.
      </p>

      {/* Divider */}
      <div
        className="mt-10"
        style={{
          width: 120,
          height: 1,
          backgroundColor: '#E7E6E4',
        }}
      />

      {/* Secondary proof row */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {[
          { value: '17,000', label: 'aphra.me mvp' },
          { value: '$1.2M raised', label: 'tula therapy' },
          { value: '68,000', label: 'fcs automation' },
        ].map((stat) => (
          <div key={stat.label}>
            <div
              className="font-body font-medium leading-[1.1]"
              style={{
                fontSize: 'clamp(24px, 3vw, 32px)',
                color: '#1D2020',
                letterSpacing: '-0.02em',
              }}
            >
              {stat.value}
            </div>
            <p
              className="mt-2 text-label"
              style={{ color: '#8C8C8C' }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
