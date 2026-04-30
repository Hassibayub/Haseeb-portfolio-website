import 'server-only';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { BlogCategory } from './blog-config';
export type { BlogCategory } from './blog-config';

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  category: BlogCategory;
  tags: string[];
  cover?: string;
  coverAlt?: string;
  relatedWork?: string[];
  draft: boolean;
  content: string;
  wordCount: number;
};

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

function parseFrontmatter(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);

  // Compute word count from content
  const wordCount = content
    .replace(/```[\s\S]*?```/g, '') // remove code blocks
    .replace(/<[^>]+>/g, '') // remove JSX/HTML tags
    .split(/\s+/)
    .filter(Boolean).length;

  return {
    slug,
    title: data.title ?? '',
    excerpt: data.excerpt ?? '',
    publishedAt: data.publishedAt ?? '',
    updatedAt: data.updatedAt,
    readingTime: data.readingTime ?? Math.ceil(wordCount / 200),
    category: (data.category ?? 'engineering') as BlogCategory,
    tags: data.tags ?? [],
    cover: data.cover || undefined,
    coverAlt: data.coverAlt || undefined,
    relatedWork: data.relatedWork,
    draft: data.draft === true,
    content,
    wordCount,
  };
}

function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

export async function getAllPosts(opts?: { includeDrafts?: boolean }): Promise<BlogPost[]> {
  const slugs = getAllSlugs();
  const posts = slugs
    .map((slug) => parseFrontmatter(slug))
    .filter((p): p is BlogPost => p !== null)
    .filter((p) => opts?.includeDrafts || !p.draft)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  return posts;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return parseFrontmatter(slug);
}

export async function getPostsByCategory(
  cat: BlogCategory,
  opts?: { includeDrafts?: boolean }
): Promise<BlogPost[]> {
  const posts = await getAllPosts(opts);
  return posts.filter((p) => p.category === cat);
}

// Re-export for server-side convenience
export { blogCategories } from './blog-config';
