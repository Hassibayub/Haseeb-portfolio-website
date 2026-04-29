import { cn } from '@/lib/utils';

// ── Section wrapper ────────────────────────────────────────────────────────

type Background = 'default' | 'subtle' | 'card' | 'dark';

interface SectionProps {
  children: React.ReactNode;
  bg?: Background;
  className?: string;
  id?: string;
}

const bgStyles: Record<Background, React.CSSProperties> = {
  default: { backgroundColor: '#F3F2F1' },
  subtle:  { backgroundColor: '#F7F7F7' },
  card:    { backgroundColor: '#FFFFFF' },
  dark:    { backgroundColor: '#2B2D2D', color: '#FFFFFF' },
};

export function Section({ children, bg = 'default', className, id }: SectionProps) {
  return (
    <section
      id={id}
      className={cn('section-padding', className)}
      style={bgStyles[bg]}
    >
      <div className="container-tight">{children}</div>
    </section>
  );
}

// ── Eyebrow label ──────────────────────────────────────────────────────────

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}

export function Eyebrow({ children, className, light = false }: EyebrowProps) {
  return (
    <p
      className={cn('text-label mb-4', className)}
      style={{ color: light ? 'rgba(255,255,255,0.5)' : '#8C8C8C' }}
    >
      {children}
    </p>
  );
}

// ── Section header (eyebrow + headline + optional subhead) ─────────────────

interface SectionHeaderProps {
  eyebrow?: string;
  headline: React.ReactNode;
  subhead?: React.ReactNode;
  className?: string;
  light?: boolean;
}

export function SectionHeader({
  eyebrow,
  headline,
  subhead,
  className,
  light = false,
}: SectionHeaderProps) {
  return (
    <div className={cn('mb-12 md:mb-16 max-w-3xl', className)}>
      {eyebrow && (
        <p
          className="text-label mb-4"
          style={{ color: light ? 'rgba(255,255,255,0.5)' : '#8C8C8C' }}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className="font-display text-display-md"
        style={{ color: light ? '#FFFFFF' : '#2B2D2D' }}
      >
        {headline}
      </h2>
      {subhead && (
        <p
          className="mt-5 text-lg leading-relaxed"
          style={{ color: light ? 'rgba(255,255,255,0.7)' : '#666666' }}
        >
          {subhead}
        </p>
      )}
    </div>
  );
}
