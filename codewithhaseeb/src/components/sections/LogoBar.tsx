import { siteConfig } from '@/lib/siteConfig';

export function LogoBar() {
  const logos = siteConfig.clientLogos;

  return (
    <section
      className="py-12 md:py-14 overflow-hidden"
      style={{
        backgroundColor: '#F3F2F1',
        borderTop: '1px solid #EBEBEA',
        borderBottom: '1px solid #EBEBEA',
      }}
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
      className="text-xl md:text-[22px] font-medium whitespace-nowrap"
      style={{ color: 'rgba(43,45,45,0.35)' }}
    >
      {name}
    </span>
  );
}
