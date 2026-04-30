'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

export function AboutHero() {
  useEffect(() => {
    trackEvent('about_view', {});
  }, []);

  return (
    <section
      className="pt-[120px] pb-[72px] md:pt-[160px] md:pb-[120px] overflow-hidden"
      style={{ backgroundColor: '#F3F2F1' }}
    >
      <div className="container-tight">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Photo column */}
          <motion.div
            className="lg:col-span-5 flex justify-center lg:justify-start"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <div
              className="relative overflow-hidden rounded-2xl"
              style={{
                width: '100%',
                maxWidth: 380,
                aspectRatio: '4/5',
                boxShadow: '0 16px 40px rgba(0,0,0,0.08)',
              }}
            >
              <Image
                src="/about/haseeb.webp"
                alt="Muhammad Haseeb, lead engineer at codewithhaseeb, photographed in Islamabad."
                fill
                sizes="(max-width: 1024px) 320px, 480px"
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Content column */}
          <div className="lg:col-span-7 lg:pt-4">
            <p
              className="text-label mb-6"
              style={{ color: '#8C8C8C' }}
            >
              about
            </p>

            <h1
              className="font-body font-medium leading-[1.08] tracking-tight mb-6"
              style={{
                fontSize: 'clamp(42px, 6.5vw, 72px)',
                color: '#1D2020',
                letterSpacing: '-0.02em',
              }}
            >
              Muhammad Haseeb.
              <br />
              Lead engineer.
            </h1>

            <p
              className="font-body text-[19px] leading-[1.55] mb-10"
              style={{ color: '#5A5C5C', maxWidth: 520 }}
            >
              I build production AI systems for funded founders and SMBs.
              Based in Islamabad. Remote since 2020. Working with a small senior
              bench when a project calls for it.
            </p>

            {/* Stat pill row */}
            <p
              className="font-body text-[14px] leading-[1.6]"
              style={{ color: 'rgba(29,32,32,0.7)' }}
            >
              Islamabad · UTC+5 · Remote since 2020 · 49 projects · 100% JSS
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
