import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { PostHeader } from '@/components/sections/blog/PostHeader';
import { PostCover } from '@/components/sections/blog/PostCover';
import { PostBody } from '@/components/sections/blog/PostBody';
import { PostFooter } from '@/components/sections/blog/PostFooter';
import { PostRelated } from '@/components/sections/blog/PostRelated';
import { PostTOC } from '@/components/sections/blog/PostTOC';
import { PostProgress } from '@/components/sections/blog/PostProgress';
import { FinalCTA } from '@/components/sections/FinalCTA';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: 'Muhammad Haseeb', url: 'https://codewithhaseeb.com/about' }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: ['Muhammad Haseeb'],
      images: [`/blog/${post.slug}/opengraph-image`],
    },
    alternates: { canonical: `https://codewithhaseeb.com/blog/${post.slug}` },
  };
}

/** Extract h2/h3 headings from MDX content for the TOC */
function extractHeadings(content: string) {
  const lines = content.split('\n');
  const headings: { id: string; text: string; level: 2 | 3 }[] = [];

  for (const line of lines) {
    const h2 = line.match(/^## (.+)/);
    const h3 = line.match(/^### (.+)/);

    if (h2) {
      const text = h2[1].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      headings.push({ id, text, level: 2 });
    } else if (h3) {
      const text = h3[1].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      headings.push({ id, text, level: 3 });
    }
  }

  return headings;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  // Get next post in same category (or most recent overall)
  const allPosts = await getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
  const sameCatNext = allPosts
    .slice(currentIndex + 1)
    .find((p) => p.category === post.category);
  const nextPostFull = sameCatNext ?? allPosts[currentIndex + 1] ?? null;

  // Strip content (server-only field) before passing to client-capable components
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { content, ...postMeta } = post;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const nextPost = nextPostFull
    ? (({ content: _c, ...rest }) => rest)(nextPostFull)
    : null;

  const headings = extractHeadings(content);

  const postSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url: `https://codewithhaseeb.com/blog/${post.slug}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      '@type': 'Person',
      name: 'Muhammad Haseeb',
      url: 'https://codewithhaseeb.com/about',
      sameAs: [
        'https://www.linkedin.com/in/haseeb-ai',
        'https://github.com/hassibayub',
      ],
    },
    publisher: {
      '@type': 'Organization',
      name: 'codewithhaseeb',
      url: 'https://codewithhaseeb.com',
    },
    image: post.cover
      ? `https://codewithhaseeb.com${post.cover}`
      : `https://codewithhaseeb.com/blog/${post.slug}/opengraph-image`,
    wordCount: post.wordCount,
    timeRequired: `PT${post.readingTime}M`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postSchema) }}
      />

      <PostProgress slug={slug} />

      <article>
        <PostHeader post={postMeta} />
        <PostCover post={postMeta} />

        {/* Reading layout with optional TOC gutter at xl+ */}
        <div className="relative">
          {headings.length > 0 && (
            <div
              className="hidden xl:block absolute"
              style={{
                right: 'calc((100vw - 1280px) / 2 + 48px)',
                top: 0,
              }}
            >
              <PostTOC headings={headings} slug={slug} />
            </div>
          )}
          <PostBody content={post.content} />
        </div>

        <PostFooter post={postMeta} />
        <PostRelated post={postMeta} nextPost={nextPost} />
      </article>

      <FinalCTA variant="blog-post" />
    </>
  );
}
