'use client';

import { useRef, useEffect, useState } from 'react';
import { useScroll, useSpring, motion } from 'framer-motion';
import { trackEvent } from '@/lib/analytics';

interface PostProgressProps {
  slug: string;
}

export function PostProgress({ slug }: PostProgressProps) {
  const articleRef = useRef<HTMLElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Read media query once on mount
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    articleRef.current = document.querySelector('article');
  }, []);

  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.3,
    stiffness: 120,
    damping: 20,
  });

  // Track read milestones
  useEffect(() => {
    const milestones = [
      { pct: 0.25, event: 'blog_post_read_25' },
      { pct: 0.5, event: 'blog_post_read_50' },
      { pct: 0.9, event: 'blog_post_read_90' },
    ];
    const fired = new Set<number>();

    const unsubscribe = scrollYProgress.on('change', (v) => {
      milestones.forEach(({ pct, event }) => {
        if (!fired.has(pct) && v >= pct) {
          fired.add(pct);
          trackEvent(event, { slug });
        }
      });
    });

    return unsubscribe;
  }, [scrollYProgress, slug]);

  if (reducedMotion) {
    // Static bar at 0 width — present but not animating
    return (
      <div
        role="progressbar"
        aria-valuenow={0}
        aria-valuemin={0}
        aria-valuemax={100}
        className="fixed top-0 left-0 right-0 z-50 h-[2px]"
        style={{ backgroundColor: 'transparent' }}
      />
    );
  }

  return (
    <motion.div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 z-50 h-[2px] origin-left"
      style={{
        right: 0,
        backgroundColor: '#D8F9B8',
        scaleX: smoothProgress,
        transformOrigin: 'left',
      }}
    />
  );
}
