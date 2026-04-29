'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, motion } from 'framer-motion';

import { siteConfig } from '@/lib/siteConfig';

export function NumbersTicker() {
  return (
    <section className="py-32 md:py-40" style={{ backgroundColor: '#031F2A' }}>
      <div className="container-tight">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
          {siteConfig.stats.map((stat) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({
  value,
  prefix,
  suffix,
  label,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    const isFloat = !Number.isInteger(value);

    const fmt = (n: number) => {
      if (isFloat) return n.toFixed(1);
      if (n >= 500_000) return Math.round(n / 1_000).toString() + 'K';
      if (n >= 10_000) return Math.round(n / 1_000).toString() + 'K';
      return Math.round(n).toString();
    };

    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(fmt(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setDisplay(fmt(value));
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="text-center md:text-left"
    >
      <p
        className="font-display tabular-nums leading-none"
        style={{
          fontSize: 'clamp(56px, 6vw, 80px)',
          color: '#D8F9B8',
          letterSpacing: '-0.03em',
        }}
      >
        {prefix ?? ''}{display}{suffix ?? ''}
      </p>
      <p
        className="mt-3 text-sm leading-snug max-w-[200px] mx-auto md:mx-0"
        style={{ color: 'rgba(255,255,255,0.45)' }}
      >
        {label}
      </p>
    </motion.div>
  );
}
