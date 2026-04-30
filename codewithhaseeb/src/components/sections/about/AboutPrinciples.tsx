'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { trackEvent } from '@/lib/analytics';

const principles = [
  {
    number: '01',
    title: 'Ship in production or don\'t ship at all',
    body: "Demos don't count. If it doesn't survive real load and real users, it's not done. Every case study on this site is a live system, not a screenshot.",
  },
  {
    number: '02',
    title: 'Fixed scope. Fixed price. Fixed timeline.',
    body: 'We commit to outcomes in writing before you pay. Scope changes get a written change order and both sides sign. You never see a revised invoice in your inbox.',
  },
  {
    number: '03',
    title: 'Honest scoping, even when it loses us the deal',
    body: "If your problem doesn't need AI, we'll tell you. If another team is a better fit, we'll say that too. About 1 in 4 scoping calls end with us recommending someone else. That's a feature.",
  },
  {
    number: '04',
    title: 'Push back on bad ideas',
    body: "The worst AI projects aren't technical failures. They're scoping failures. We'd rather argue for 30 minutes than build the wrong thing for 8 weeks.",
  },
  {
    number: '05',
    title: 'One accountable lead',
    body: "You don't get shuffled between junior devs. I'm the technical lead on every engagement. When a project needs more hands, you meet the senior engineer doing the work. No outsourcing behind the scenes.",
  },
];

function PrincipleRow({ principle, index }: { principle: (typeof principles)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div
      ref={ref}
      className="py-[64px] md:py-[80px] border-b"
      style={{ borderColor: 'rgba(255,255,255,0.08)' }}
    >
      <div className="grid grid-cols-12 gap-6 md:gap-10 items-start">
        {/* Number */}
        <motion.div
          className="col-span-12 sm:col-span-2"
          initial={{ opacity: 0.4 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0.4 }}
          transition={{ duration: 0.4, delay: index * 0.08 }}
          aria-hidden="true"
        >
          <span
            className="font-body font-normal leading-none select-none"
            style={{
              fontSize: 'clamp(52px, 6vw, 72px)',
              color: '#D8F9B8',
              letterSpacing: '-0.03em',
            }}
          >
            {principle.number}
          </span>
        </motion.div>

        {/* Content */}
        <motion.div
          className="col-span-12 sm:col-span-10 md:col-span-8"
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: index * 0.08 + 0.1 }}
        >
          <h3
            className="font-body font-medium text-[22px] md:text-[28px] leading-[1.25] mb-3"
            style={{ color: '#F3F2F1' }}
          >
            {principle.title}
          </h3>
          <p
            className="font-body text-[16px] md:text-[17px] leading-[1.65]"
            style={{ color: '#C4C4C4', maxWidth: 560 }}
          >
            {principle.body}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export function AboutPrinciples() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      trackEvent('about_principles_view', {});
    }
  }, [isInView]);

  return (
    <section
      ref={ref}
      className="py-[88px] md:py-[140px]"
      style={{ backgroundColor: '#1D2020' }}
    >
      <div className="container-tight">
        <p
          className="text-label mb-6"
          style={{ color: '#A6A6A6' }}
        >
          how we work
        </p>

        <h2
          className="font-body font-medium leading-[1.08] tracking-tight"
          style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            color: '#F3F2F1',
            letterSpacing: '-0.02em',
            maxWidth: 720,
          }}
        >
          Five things we won't compromise on.
        </h2>

        <div className="mt-8">
          {principles.map((p, i) => (
            <PrincipleRow key={p.number} principle={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
