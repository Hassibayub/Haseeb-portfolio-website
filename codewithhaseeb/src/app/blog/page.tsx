import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog';
import { BlogHero } from '@/components/sections/blog/BlogHero';
import { BlogList } from '@/components/sections/blog/BlogList';
import { BlogEmpty } from '@/components/sections/blog/BlogEmpty';
import { FinalCTA } from '@/components/sections/FinalCTA';

export const metadata: Metadata = {
  title: 'Blog. Notes on building production AI.',
  description:
    'Field notes on shipping AI systems: LLM cost, agent architecture, voice pipelines, and the gap between demos and production.',
  openGraph: {
    title: 'Blog. Notes on building production AI.',
    description:
      'Field notes on shipping AI systems. Cost. Agents. Voice. Production.',
    images: ['/og/blog.png'],
    type: 'website',
  },
  alternates: {
    canonical: 'https://codewithhaseeb.com/blog',
    types: { 'application/rss+xml': 'https://codewithhaseeb.com/blog/rss.xml' },
  },
};

export default async function BlogPage() {
  const allPosts = await getAllPosts();

  // Strip content (server-only) before passing to client BlogList
  const posts = allPosts.map(({ content: _c, ...meta }) => meta);

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'codewithhaseeb — notes',
    url: 'https://codewithhaseeb.com/blog',
    description: 'Field notes on shipping production AI.',
    author: {
      '@type': 'Person',
      name: 'Muhammad Haseeb',
      url: 'https://codewithhaseeb.com/about',
    },
    blogPost: allPosts.slice(0, 10).map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.excerpt,
      url: `https://codewithhaseeb.com/blog/${p.slug}`,
      datePublished: p.publishedAt,
      dateModified: p.updatedAt ?? p.publishedAt,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <main>
        <BlogHero />
        {posts.length === 0 ? (
          <section
            className="pb-[72px] md:pb-[128px]"
            style={{ backgroundColor: '#F3F2F1' }}
          >
            <div className="container-tight">
              <BlogEmpty variant="no-posts" />
            </div>
          </section>
        ) : (
          <BlogList posts={posts} />
        )}
        <FinalCTA variant="blog" />
      </main>
    </>
  );
}
