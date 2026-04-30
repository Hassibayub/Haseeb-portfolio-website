'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import { siteConfig } from '@/lib/siteConfig';
import { trackEvent } from '@/lib/analytics';
import { TracePanel } from '@/components/ui/trace-panel';

export function Hero() {
  return (
    <section
      className="relative pt-40 pb-24 md:pt-56 md:pb-32 overflow-hidden"
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
              style={{ color: 'rgba(216, 249, 184, 0.7)' }}
            >
              ai engineering / for funded startups
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
            <TracePanel
              variant="hero"
              headerLabel="cs_01 / aphra.me"
              primary={{ stat: '17K', label: 'users live' }}
              chips={[
                { header: 'cs_02 / capwell comm', label: '500K records, 3 weeks', stat: '3wk' },
                { header: 'cs_03 / kcnl.eu', label: '98.5% LLM cost cut', stat: '98.5%' },
              ]}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
