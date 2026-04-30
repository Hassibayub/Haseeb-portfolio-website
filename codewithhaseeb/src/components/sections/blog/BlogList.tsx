'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { BlogPost, BlogCategory } from '@/lib/blog';
import { BlogCard } from './BlogCard';
import { BlogFilters } from './BlogFilters';
import { BlogEmpty } from './BlogEmpty';
import { blogCategories } from '@/lib/blog';
import { trackEvent } from '@/lib/analytics';

interface BlogListProps {
  posts: BlogPost[];
}

export function BlogList({ posts }: BlogListProps) {
  const [activeFilter, setActiveFilter] = useState<BlogCategory | 'all'>('all');

  // Build counts
  const counts = blogCategories.reduce<Record<string, number>>(
    (acc, cat) => {
      if (cat.id === 'all') {
        acc[cat.id] = posts.length;
      } else {
        acc[cat.id] = posts.filter((p) => p.category === cat.id).length;
      }
      return acc;
    },
    {} as Record<string, number>
  );

  const filtered =
    activeFilter === 'all' ? posts : posts.filter((p) => p.category === activeFilter);

  const handleFilterChange = (cat: BlogCategory | 'all') => {
    setActiveFilter(cat);
    trackEvent('blog_filter_change', { category: cat });
  };

  return (
    <>
      <BlogFilters
        active={activeFilter}
        onChange={handleFilterChange}
        counts={counts as Record<BlogCategory | 'all', number>}
      />

      <section
        className="pb-[72px] md:pb-[128px]"
        style={{ backgroundColor: '#F3F2F1' }}
      >
        <div className="container-tight">
          {filtered.length === 0 ? (
            <BlogEmpty
              variant="filter-empty"
              onReset={() => setActiveFilter('all')}
            />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 md:gap-8">
              <AnimatePresence mode="popLayout">
                {filtered.map((post, i) => (
                  <motion.div
                    key={post.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{
                      duration: 0.22,
                      delay: i * 0.03,
                      ease: 'easeOut',
                    }}
                  >
                    <BlogCard
                      post={post}
                      position={i}
                      activeFilter={activeFilter}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
