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
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full transition-all hover:-translate-y-0.5"
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E7E6E4',
      }}
    >
      <span className="text-[13px] font-medium" style={{ color: '#1D2020' }}>
        {label}
      </span>
      <span className="text-[13px]" style={{ color: '#5A5C5C' }}>
        {metric}
      </span>
    </Link>
  );
}
