'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { trackEvent } from '@/lib/analytics';
import { siteConfig } from '@/lib/siteConfig';

export function AboutBench() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      trackEvent('about_bench_view', {});
    }
  }, [isInView]);

  return (
    <section
      ref={ref}
      className="py-[56px] md:py-[96px]"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <div className="container-tight">
        <div className="max-w-[720px] mx-auto">
          <p
            className="text-label mb-6"
            style={{ color: '#8C8C8C' }}
          >
            the bench
          </p>

          <h2
            className="font-body font-medium text-[30px] md:text-[36px] leading-[1.2] tracking-tight mb-6"
            style={{ color: '#1D2020' }}
          >
            When a project needs more hands.
          </h2>

          <div
            className="font-body text-[18px] leading-[1.65] space-y-5"
            style={{ color: '#1D2020', maxWidth: 640 }}
          >
            <p>
              I keep a small bench of senior engineers I've worked with for years.
              They come in when scope calls for two or three pairs of hands.
            </p>
            <p>
              Backend and infra, voice and speech, full-stack web, data engineering.
              Everyone has shipped production systems in the last 12 months. Everyone
              has worked with me on at least one project before. You'll meet whoever's
              on your engagement before they write a line of your code.
            </p>
            <p>
              I don't publish a team roster because it changes project to project and
              the roster isn't the point. The point is that if you hire us and the
              project grows, we don't go find strangers on Upwork. You're already
              covered.
            </p>
          </div>

          <div className="mt-10">
            <Link
              href={siteConfig.links.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-medium transition-all hover:brightness-95"
              style={{ backgroundColor: '#D8F9B8', color: '#1D2020' }}
              onClick={() => trackEvent('about_cta_click', {})}
            >
              Book a call to meet the team
              <ArrowUpRight
                size={15}
                className="opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
