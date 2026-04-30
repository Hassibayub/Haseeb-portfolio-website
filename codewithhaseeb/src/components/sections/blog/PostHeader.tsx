import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import type { BlogPostMeta } from '@/lib/blog-config';

interface PostHeaderProps {
  post: BlogPostMeta;
}

const categoryLabel: Record<string, string> = {
  engineering: 'Engineering',
  opinion: 'Opinion',
  'field-notes': 'Field notes',
};

export function PostHeader({ post }: PostHeaderProps) {
  const formattedDate = format(new Date(post.publishedAt), 'MMM d, yyyy').toLowerCase();
  const catLabel = categoryLabel[post.category] ?? post.category;

  return (
    <header
      className="pt-[96px] pb-[32px] md:pt-[160px] md:pb-[48px]"
      style={{ backgroundColor: '#F3F2F1' }}
    >
      <div className="container-tight">
        <div className="mx-auto" style={{ maxWidth: 760 }}>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="font-body" style={{ fontSize: 14 }}>
            <Link
              href="/blog"
              className="transition-opacity hover:opacity-70"
              style={{ color: '#6D5EF3' }}
            >
              Blog
            </Link>
            <span className="mx-2" style={{ color: '#6D5EF3', opacity: 0.5 }}>/</span>
            <Link
              href={`/blog?category=${post.category}`}
              className="transition-opacity hover:opacity-70"
              style={{ color: '#6D5EF3' }}
            >
              {catLabel}
            </Link>
          </nav>

          {/* Eyebrow */}
          <p
            className="font-mono text-[12px] tracking-[0.08em] lowercase mt-10"
            style={{ color: '#8C8C8C' }}
          >
            published {formattedDate} · {post.readingTime} min read
          </p>

          {/* Headline */}
          <h1
            className="font-body font-medium leading-[1.08] tracking-tight mt-6"
            style={{
              fontSize: 'clamp(40px, 5.5vw, 64px)',
              letterSpacing: '-0.02em',
              color: '#1D2020',
            }}
          >
            {post.title}.
          </h1>

          {/* Excerpt */}
          <p
            className="font-body leading-[1.5] mt-8"
            style={{ fontSize: 22, color: '#5A5C5C', maxWidth: 640 }}
          >
            {post.excerpt}
          </p>

          {/* Author row */}
          <div className="flex items-center gap-3 mt-10">
            <div
              className="relative rounded-full overflow-hidden shrink-0"
              style={{ width: 40, height: 40 }}
            >
              <Image
                src="/about/haseeb.webp"
                alt="Muhammad Haseeb"
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            <span className="font-body" style={{ fontSize: 14, color: '#1D2020' }}>
              Muhammad Haseeb
            </span>
            <span aria-hidden style={{ color: '#C4C4C4' }}>·</span>
            <span className="font-body" style={{ fontSize: 14, color: '#5A5C5C' }}>
              Lead engineer
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
