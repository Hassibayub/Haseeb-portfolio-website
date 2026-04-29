import { siteConfig } from '@/lib/siteConfig';

export function LogoBar() {
  const logos = siteConfig.clientLogos;

  return (
    <section
      className="pt-24 pb-20 md:pt-28 md:pb-24 overflow-hidden"
      style={{ backgroundColor: '#F3F2F1' }}
    >
      {/* Fade mask on edges */}
      <div
        className="relative flex overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        }}
      >
        <div
          className="flex shrink-0 items-center gap-16 pr-16"
          style={{
            animation: 'marquee 45s linear infinite',
            ['--duration' as string]: '45s',
            ['--gap' as string]: '4rem',
          }}
        >
          {logos.map((name) => (
            <LogoItem key={name} name={name} />
          ))}
        </div>
        <div
          aria-hidden
          className="flex shrink-0 items-center gap-16 pr-16"
          style={{
            animation: 'marquee 45s linear infinite',
            ['--duration' as string]: '45s',
            ['--gap' as string]: '4rem',
          }}
        >
          {logos.map((name) => (
            <LogoItem key={`dup-${name}`} name={name} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LogoItem({ name }: { name: string }) {
  return (
    <span
      className="logo-item text-lg font-medium whitespace-nowrap tracking-tight transition-all duration-200"
      style={{
        fontFamily: 'var(--font-ibm)',
        color: '#1D2020',
        opacity: 0.40,
      }}
    >
      {name}
    </span>
  );
}
