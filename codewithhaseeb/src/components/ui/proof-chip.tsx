import Link from 'next/link';

interface ProofChipProps {
  slug: string;
  label: string;
  metric: string;
}

export function ProofChip({ slug, label, metric }: ProofChipProps) {
  return (
    <Link
      href={`/work/${slug}`}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-160 hover:scale-[1.02]"
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E7E6E4',
        boxShadow: '0 0 0 transparent',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          '0 4px 12px rgba(0,0,0,0.06)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 transparent';
      }}
    >
      <span className="text-[12px] font-mono" style={{ color: '#5A5C5C' }}>
        {label}
      </span>
      <span className="text-[12px]" style={{ color: '#1D2020' }}>
        {metric}
      </span>
    </Link>
  );
}
