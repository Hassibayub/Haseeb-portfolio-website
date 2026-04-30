'use client';

import { motion, AnimatePresence } from 'framer-motion';

import type { CaseStudy } from '@/lib/case-studies-meta';
import { CaseCard } from './CaseCard';

// Bento layout order matching the spec
const bentoOrder: { slug: string; size: 'standard' | 'wide' | 'xwide' }[] = [
  { slug: 'aphra', size: 'wide' },
  { slug: 'capwell', size: 'standard' },
  { slug: 'kcnl', size: 'standard' },
  { slug: 'tula', size: 'standard' },
  { slug: 'medmatch', size: 'standard' },
  { slug: 'fcs', size: 'wide' },
  { slug: 'bestinform', size: 'standard' },
  { slug: 'sony-playstation', size: 'xwide' },
];

interface WorkGridProps {
  caseStudies: CaseStudy[];
}

export function WorkGrid({ caseStudies }: WorkGridProps) {
  const slugSet = new Set(caseStudies.map((c) => c.slug));
  const filtered = bentoOrder.filter((b) => slugSet.has(b.slug));

  const slugToStudy = new Map(caseStudies.map((c) => [c.slug, c]));

  const spanClass = (size: 'standard' | 'wide' | 'xwide') =>
    size === 'wide' ? 'md:col-span-2' : size === 'xwide' ? 'md:col-span-3' : 'md:col-span-1';

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-4 md:auto-rows-[320px] gap-4"
      style={{ backgroundColor: '#F3F2F1' }}
    >
      <AnimatePresence mode="popLayout">
        {filtered.map((b, i) => {
          const cs = slugToStudy.get(b.slug);
          if (!cs) return null;
          return (
            <motion.div
              key={b.slug}
              layout
              className={spanClass(b.size)}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{
                duration: 0.22,
                ease: [0.4, 0, 0.2, 1],
                delay: i * 0.04,
              }}
            >
              <CaseCard caseStudy={cs} size={b.size} position={i} />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
