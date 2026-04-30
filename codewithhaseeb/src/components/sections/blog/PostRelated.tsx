import Link from 'next/link';
import type { BlogPostMeta } from '@/lib/blog-config';
import { BlogCard } from './BlogCard';
import { CaseStudyInline } from '@/components/blog/mdx-components';

interface PostRelatedProps {
  post: BlogPostMeta;
  nextPost: BlogPostMeta | null;
}

export function PostRelated({ post, nextPost }: PostRelatedProps) {
  const hasRelatedWork =
    post.relatedWork && post.relatedWork.length > 0;

  if (!hasRelatedWork && !nextPost) return null;

  return (
    <section
      className="py-[64px] md:py-[96px]"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <div className="container-tight">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {/* Left — related work */}
          {hasRelatedWork && (
            <div>
              <p
                className="font-mono text-[11px] tracking-[0.08em] lowercase"
                style={{ color: '#8C8C8C' }}
              >
                related work
              </p>
              <h2
                className="font-body font-medium mt-3 mb-6"
                style={{ fontSize: 20, color: '#1D2020' }}
              >
                Case studies referenced in this note.
              </h2>
              <div className="flex flex-col gap-3">
                {post.relatedWork!.slice(0, 2).map((slug) => (
                  <CaseStudyInline key={slug} slug={slug} />
                ))}
              </div>
            </div>
          )}

          {/* Right — next note */}
          {nextPost && (
            <div>
              <p
                className="font-mono text-[11px] tracking-[0.08em] lowercase"
                style={{ color: '#8C8C8C' }}
              >
                keep reading
              </p>
              <h2
                className="font-body font-medium mt-3 mb-6"
                style={{ fontSize: 20, color: '#1D2020' }}
              >
                Next note.
              </h2>
              <div style={{ transform: 'scale(0.9)', transformOrigin: 'top left' }}>
                <BlogCard post={nextPost} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
