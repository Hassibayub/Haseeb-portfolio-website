import { siteConfig } from '@/lib/siteConfig';

const logoMeta: Record<string, { size: string; weight: string }> = {
  'Sony PlayStation':    { size: 'text-[20px]', weight: 'font-semibold' },
  'Aphra.me':            { size: 'text-[22px]', weight: 'font-medium' },
  'Tula Transformation': { size: 'text-[18px]', weight: 'font-medium' },
  'Capwell Comm':        { size: 'text-[19px]', weight: 'font-medium' },
  'KCNL.eu':             { size: 'text-[20px]', weight: 'font-semibold' },
  'Bestinform.eu':       { size: 'text-[18px]', weight: 'font-medium' },
  'Medmatch':            { size: 'text-[22px]', weight: 'font-semibold' },
  'FCS':                 { size: 'text-[24px]', weight: 'font-bold' },
  'RGR Learning':        { size: 'text-[17px]', weight: 'font-medium' },
  'eXelerete':           { size: 'text-[19px]', weight: 'font-medium' },
};

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
  const meta = logoMeta[name] ?? { size: 'text-[18px]', weight: 'font-medium' };
  return (
    <span
      className={`logo-item ${meta.size} ${meta.weight} whitespace-nowrap tracking-tight transition-colors duration-200 hover:text-[#1D2020]`}
      style={{
        fontFamily: 'var(--font-ibm)',
        color: 'rgba(43,45,45,0.40)',
      }}
    >
      {name}
    </span>
  );
}
