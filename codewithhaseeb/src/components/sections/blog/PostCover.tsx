import Image from 'next/image';
import type { BlogPostMeta } from '@/lib/blog-config';

interface PostCoverProps {
  post: BlogPostMeta;
}

export function PostCover({ post }: PostCoverProps) {
  if (!post.cover) return null;

  return (
    <section
      className="pb-[40px] md:pb-[64px]"
      style={{ backgroundColor: '#F3F2F1' }}
    >
      <div className="container-tight">
        <div className="mx-auto" style={{ maxWidth: 960 }}>
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{ aspectRatio: '16/9' }}
          >
            <Image
              src={post.cover}
              alt={post.coverAlt ?? post.title}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 960px, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
