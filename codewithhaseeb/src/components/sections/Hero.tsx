'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import { siteConfig } from '@/lib/siteConfig';
import { trackEvent } from '@/lib/analytics';

export function Hero() {
  return (
    <section
      className="relative pt-32 pb-40 md:pt-40 md:pb-48 overflow-hidden"
      style={{ backgroundColor: '#1D2020' }}
    >
      <div className="container-tight">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">

          {/* Left: text */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-label mb-6"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              AI Engineering · For Funded Startups
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-display-xl"
              style={{ color: '#F1F0EE' }}
            >
              AI that runs in production.
              <br />
              <span className="italic">Not demos.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-6 text-lg leading-relaxed max-w-[560px]"
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              We build real AI systems for real users. A 5-person senior engineering
              team shipping production AI for funded startups and SMBs.
              <span className="block mt-3" style={{ color: 'rgba(255,255,255,0.45)' }}>
                17,000+ active users on Aphra. 500,000+ records managed at Capwell.
                YC-backed Tula, $1.2M raised.
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <Link
                href={siteConfig.links.calendly}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('book_call_click', { location: 'hero_primary' })}
                className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-medium transition-colors hover:brightness-95"
                style={{ backgroundColor: '#D8F9B8', color: '#1D2020' }}
              >
                Book a free 30-min call
                <ArrowUpRight
                  size={16}
                  className="opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
                />
              </Link>
              <Link
                href="/work"
                className="group inline-flex items-center gap-2 rounded-full border px-7 py-3.5 font-medium transition-colors hover:bg-white/5"
                style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.75)' }}
              >
                See our work
                <ArrowUpRight
                  size={15}
                  className="opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
                />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 flex items-center gap-3 text-sm"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full animate-ping" style={{ backgroundColor: '#0099FF', opacity: 0.6 }} />
                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: '#0099FF' }} />
              </span>
              <span>Taking 1 new project this month · Reply within 24h</span>
            </motion.div>
          </div>

          {/* Right: editorial placeholder visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative w-full max-w-[460px] mx-auto space-y-4">

      {/* Primary card */}
      <div
        className="rounded-2xl p-8 border"
        style={{
          backgroundColor: '#242727',
          borderColor: 'rgba(255,255,255,0.07)',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.04) inset',
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <p
            className="font-mono text-xs tracking-wider"
            style={{ color: 'rgba(255,255,255,0.3)' }}
          >
            cs_01 / aphra.me
          </p>
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full animate-ping" style={{ backgroundColor: '#0099FF', opacity: 0.5 }} />
            <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: '#0099FF' }} />
          </span>
        </div>

        <p
          className="font-display leading-none mb-2"
          style={{ fontSize: '80px', color: '#F1F0EE', letterSpacing: '-0.04em' }}
        >
          17,234
        </p>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
          active users · live
        </p>
      </div>

      {/* Secondary chip */}
      <div
        className="rounded-xl px-6 py-4 border flex items-center justify-between"
        style={{
          backgroundColor: '#1D2020',
          borderColor: 'rgba(255,255,255,0.06)',
        }}
      >
        <div>
          <p className="font-mono text-xs tracking-wider mb-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
            cs_02 / capwell comm
          </p>
          <p className="text-base font-medium" style={{ color: '#F1F0EE' }}>
            500,000 records managed
          </p>
        </div>
        <p
          className="font-display text-3xl"
          style={{ color: '#D8F9B8', letterSpacing: '-0.03em' }}
        >
          3wk
        </p>
      </div>

      {/* Third chip */}
      <div
        className="rounded-xl px-6 py-4 border flex items-center justify-between"
        style={{
          backgroundColor: '#1D2020',
          borderColor: 'rgba(255,255,255,0.06)',
        }}
      >
        <div>
          <p className="font-mono text-xs tracking-wider mb-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
            cs_03 / kcnl.eu
          </p>
          <p className="text-base font-medium" style={{ color: '#F1F0EE' }}>
            LLM cost cut
          </p>
        </div>
        <p
          className="font-display text-3xl"
          style={{ color: '#D8F9B8', letterSpacing: '-0.03em' }}
        >
          98.5%
        </p>
      </div>

    </div>
  );
}
