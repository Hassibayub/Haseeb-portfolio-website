import { Feed } from 'feed';
import { getAllPosts } from '@/lib/blog';

export const revalidate = 3600;

export async function GET() {
  const posts = (await getAllPosts()).filter((p) => !p.draft);

  const feed = new Feed({
    title: 'codewithhaseeb — notes',
    description: 'Field notes on shipping production AI.',
    id: 'https://codewithhaseeb.com/blog',
    link: 'https://codewithhaseeb.com/blog',
    language: 'en',
    feedLinks: {
      rss2: 'https://codewithhaseeb.com/blog/rss.xml',
    },
    author: {
      name: 'Muhammad Haseeb',
      email: 'haseeb@codewithhaseeb.com',
      link: 'https://codewithhaseeb.com/about',
    },
    copyright: `© ${new Date().getFullYear()} codewithhaseeb`,
  });

  for (const post of posts) {
    feed.addItem({
      title: post.title,
      id: `https://codewithhaseeb.com/blog/${post.slug}`,
      link: `https://codewithhaseeb.com/blog/${post.slug}`,
      description: post.excerpt,
      date: new Date(post.publishedAt),
      category: [
        { name: post.category },
        ...post.tags.map((t) => ({ name: t })),
      ],
      author: [
        {
          name: 'Muhammad Haseeb',
          email: 'haseeb@codewithhaseeb.com',
          link: 'https://codewithhaseeb.com/about',
        },
      ],
    });
  }

  return new Response(feed.rss2(), {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
