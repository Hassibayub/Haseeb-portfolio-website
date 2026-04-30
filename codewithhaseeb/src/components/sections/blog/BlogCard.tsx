'use client';

import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import type { BlogPostMeta } from '@/lib/blog-config';

interface BlogCardProps {
  post: BlogPostMeta;
  position?: number;
  activeFilter?: string;
}

export function BlogCard({ post, position = 0, activeFilter = 'all' }: BlogCardProps) {
  const formattedDate = format(new Date(post.publishedAt), 'MMM d, yyyy').toLowerCase();

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-2xl overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2020] focus-visible:ring-offset-2"
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E7E6E4',
        minHeight: 380,
        transition: 'transform 220ms ease-out, box-shadow 220ms ease-out',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
      data-position={position}
      data-filter={activeFilter}
      data-slug={post.slug}
    >
      {/* Cover image area */}
      <div className="relative overflow-hidden" style={{ height: 200 }}>
        {post.cover ? (
          <Image
            src={post.cover}
            alt={post.coverAlt ?? post.title}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        ) : (
          <div
            className="h-full w-full flex items-end p-6"
            style={{
              background: 'linear-gradient(135deg, #F3F2F1 0%, #E7E6E4 100%)',
            }}
          >
            <span
              className="font-body font-medium leading-[1]"
              style={{
                fontSize: 48,
                color: '#1D2020',
                letterSpacing: '-0.02em',
              }}
            >
              {post.title.split(' ').slice(0, 3).join(' ')}.
            </span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-col p-5 md:p-6" style={{ minHeight: 200 }}>
        {/* Meta row */}
        <p
          className="font-mono text-[11px] tracking-[0.08em] lowercase"
          style={{ color: '#8C8C8C' }}
        >
          {post.category} · {post.readingTime} min · {formattedDate}
        </p>

        {/* Title */}
        <h3
          className="font-body font-medium leading-[1.25] mt-3 line-clamp-3"
          style={{ fontSize: 22, color: '#1D2020' }}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p
          className="font-body leading-[1.55] mt-3 line-clamp-3"
          style={{ fontSize: 15, color: '#5A5C5C' }}
        >
          {post.excerpt}
        </p>

        {/* Read link */}
        <p
          className="font-body font-medium mt-auto pt-5"
          style={{
            fontSize: 14,
            color: '#1D2020',
            textDecoration: 'none',
            transition: 'text-decoration 100ms',
          }}
        >
          <span className="group-hover:underline">Read note</span>
        </p>
      </div>
    </Link>
  );
}
