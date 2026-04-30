import Link from 'next/link';

interface TraceRow {
  label: string;
  value: string;
}

interface TracePanelProps {
  variant: 'hero' | 'stats';
  headerLabel: string;
  primary?: {
    stat: string;
    label: string;
  };
  chips?: {
    header: string;
    label: string;
    stat: string;
  }[];
  rows?: TraceRow[];
}

export function TracePanel({
  variant,
  headerLabel,
  primary,
  chips,
  rows,
}: TracePanelProps) {
  if (variant === 'hero' && primary && chips) {
    return (
      <div className="relative w-full max-w-[460px] mx-auto space-y-4">
        {/* Primary card */}
        <div
          className="rounded-2xl p-8 border"
          style={{
            backgroundColor: '#242727',
            borderColor: 'rgba(255,255,255,0.07)',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.04) inset',
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <p
              className="font-mono text-xs tracking-wider"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              {headerLabel}
            </p>
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full rounded-full animate-ping"
                style={{ backgroundColor: '#0099FF', opacity: 0.5 }}
              />
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{ backgroundColor: '#0099FF' }}
              />
            </span>
          </div>

          <p
            className="font-display leading-none mb-2"
            style={{
              fontSize: '80px',
              color: '#F1F0EE',
              letterSpacing: '-0.04em',
            }}
          >
            {primary.stat}
          </p>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {primary.label}
          </p>
        </div>

        {/* Secondary chips */}
        {chips.map((chip, i) => (
          <div
            key={i}
            className="rounded-xl px-6 py-4 border flex items-center justify-between"
            style={{
              backgroundColor: '#1D2020',
              borderColor: 'rgba(255,255,255,0.06)',
            }}
          >
            <div>
              <p
                className="font-mono text-xs tracking-wider mb-1"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                {chip.header}
              </p>
              <p className="text-base font-medium" style={{ color: '#F1F0EE' }}>
                {chip.label}
              </p>
            </div>
            <p
              className="font-display text-3xl"
              style={{ color: '#D8F9B8', letterSpacing: '-0.03em' }}
            >
              {chip.stat}
            </p>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'stats' && rows) {
    return (
      <div className="relative w-full max-w-[420px] mx-auto">
        <div
          className="rounded-2xl p-8 border"
          style={{
            backgroundColor: '#242727',
            borderColor: 'rgba(255,255,255,0.07)',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.04) inset',
          }}
        >
          <div className="flex items-center justify-between mb-8">
            <p
              className="font-mono text-xs tracking-wider"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              {headerLabel}
            </p>
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full rounded-full animate-ping"
                style={{ backgroundColor: '#D8F9B8', opacity: 0.5 }}
              />
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{ backgroundColor: '#D8F9B8' }}
              />
            </span>
          </div>

          <div className="space-y-3">
            {rows.map((row) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between"
              >
                <span
                  className="font-mono text-xs tracking-wider"
                  style={{ color: 'rgba(255,255,255,0.35)' }}
                >
                  {row.label}
                </span>
                <span
                  className="font-mono text-sm"
                  style={{ color: '#D8F9B8' }}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
