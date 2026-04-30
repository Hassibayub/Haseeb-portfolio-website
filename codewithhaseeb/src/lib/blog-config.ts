// Client-safe blog constants — no fs/path imports
export type BlogCategory = 'engineering' | 'opinion' | 'field-notes';

// Serializable post shape safe to pass to client components as props
export type BlogPostMeta = {
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
  wordCount: number;
};

export const blogCategories: { id: BlogCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'opinion', label: 'Opinion' },
  { id: 'field-notes', label: 'Field notes' },
];
