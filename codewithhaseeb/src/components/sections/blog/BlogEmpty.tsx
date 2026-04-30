import Link from 'next/link';

interface BlogEmptyProps {
  variant: 'filter-empty' | 'no-posts';
  onReset?: () => void;
}

export function BlogEmpty({ variant, onReset }: BlogEmptyProps) {
  if (variant === 'no-posts') {
    return (
      <div
        className="text-center mx-auto py-[96px]"
        style={{ maxWidth: 520 }}
      >
        <h2
          className="font-body font-medium"
          style={{ fontSize: 28, color: '#1D2020' }}
        >
          Writing the first few pieces.
        </h2>
        <p
          className="font-body leading-[1.55] mt-4"
          style={{ fontSize: 17, color: '#5A5C5C', maxWidth: 460 }}
        >
          If you want to know when the first one lands, email{' '}
          <a
            href="mailto:haseeb@codewithhaseeb.com?subject=notify: blog"
            className="underline transition-opacity hover:opacity-70"
            style={{ color: '#1D2020' }}
          >
            haseeb@codewithhaseeb.com
          </a>{' '}
          with &quot;notify: blog&quot; as the subject. No list. No CRM.
          I&apos;ll email you once.
        </p>
        <Link
          href="/work"
          className="inline-block font-body font-medium mt-6 underline transition-opacity hover:opacity-70"
          style={{ fontSize: 15, color: '#1D2020' }}
        >
          In the meantime, the case studies have the receipts.
        </Link>
      </div>
    );
  }

  return (
    <div
      className="text-center mx-auto py-[96px]"
      style={{ maxWidth: 520 }}
    >
      <h2
        className="font-body font-medium"
        style={{ fontSize: 24, color: '#1D2020' }}
      >
        Nothing in this category yet.
      </h2>
      <p
        className="font-body leading-[1.5] mt-3"
        style={{ fontSize: 16, color: '#5A5C5C', maxWidth: 420 }}
      >
        We only post when we&apos;ve shipped something worth writing about.
        Try a different filter, or check back.
      </p>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="inline-block font-body font-medium mt-4 underline transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2020] focus-visible:ring-offset-2"
          style={{ fontSize: 15, color: '#1D2020' }}
        >
          See all notes
        </button>
      )}
    </div>
  );
}
