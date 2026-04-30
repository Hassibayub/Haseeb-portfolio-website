'use client';

import { useEffect, useRef, useState } from 'react';
import { trackEvent } from '@/lib/analytics';

interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

interface PostTOCProps {
  headings: Heading[];
  slug: string;
}

export function PostTOC({ headings, slug }: PostTOCProps) {
  const [activeId, setActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const elements = headings.map((h) => document.getElementById(h.id)).filter(Boolean);
    if (elements.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the first heading that's intersecting
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      {
        rootMargin: '-80px 0px -70% 0px',
        threshold: 0,
      }
    );

    elements.forEach((el) => observerRef.current!.observe(el!));

    return () => observerRef.current?.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="hidden xl:block sticky top-32 pl-8"
      style={{ width: 200, flexShrink: 0 }}
    >
      <p
        className="font-mono text-[10px] tracking-[0.1em] uppercase mb-4"
        style={{ color: '#8C8C8C' }}
      >
        Contents
      </p>
      <ul className="space-y-1">
        {headings.map((h) => {
          const isActive = activeId === h.id;
          return (
            <li key={h.id} className={h.level === 3 ? 'ml-4' : ''}>
              <a
                href={`#${h.id}`}
                aria-current={isActive ? 'location' : undefined}
                onClick={() =>
                  trackEvent('blog_post_toc_click', { slug, heading_id: h.id })
                }
                className="block font-mono text-[12px] tracking-[0.05em] lowercase leading-snug py-1 pl-3 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2020] focus-visible:ring-offset-2"
                style={{
                  color: isActive ? '#1D2020' : '#5A5C5C',
                  fontWeight: isActive ? 500 : 400,
                  borderLeft: `2px solid ${isActive ? '#D8F9B8' : 'transparent'}`,
                  marginLeft: -2,
                }}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
