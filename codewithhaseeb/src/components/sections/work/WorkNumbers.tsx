'use client';

import { useEffect, useRef, useState } from 'react';

import { trackEvent } from '@/lib/analytics';

const stats = [
  { value: '49', label: 'Projects completed' },
  { value: '100%', label: 'Upwork job success' },
  { value: '$0', label: 'Ad spend to get here' },
  { value: '14', label: 'Countries served from' },
];

export function WorkNumbers() {
  const ref = useRef<HTMLDivElement>(null);
  const [hasViewed, setHasViewed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasViewed) {
          trackEvent('work_numbers_view', {});
          setHasViewed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasViewed]);

  return (
    <section
      ref={ref}
      className="py-[88px] md:py-[140px]"
      style={{ backgroundColor: '#1D2020' }}
    >
      <div className="container-tight text-center max-w-[960px]">
        <p
          className="text-label mb-6"
          style={{ color: '#A6A6A6' }}
        >
          five years in
        </p>

        <h2
          className="font-body font-medium leading-[1.08] tracking-tight mb-16"
          style={{
            fontSize: 'clamp(36px, 5vw, 56px)',
            color: '#F3F2F1',
            letterSpacing: '-0.02em',
          }}
        >
          Since 2020. No ad spend. 49 projects.
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 sm:gap-10 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              {/* Value */}
              <div
                className="font-body font-medium leading-[1.1]"
                style={{
                  fontSize: 'clamp(32px, 4vw, 52px)',
                  color: '#D8F9B8',
                  letterSpacing: '-0.02em',
                }}
              >
                {stat.value}
              </div>

              {/* Label */}
              <p
                className="mt-2 font-body text-[15px] leading-[1.45]"
                style={{ color: '#C4C4C4' }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
