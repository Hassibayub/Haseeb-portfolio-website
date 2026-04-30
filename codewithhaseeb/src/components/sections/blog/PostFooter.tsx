'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { BlogPost } from '@/lib/blog';
import { trackEvent } from '@/lib/analytics';

interface PostFooterProps {
  post: BlogPost;
}

export function PostFooter({ post }: PostFooterProps) {
  const [copied, setCopied] = useState(false);

  const postUrl = `https://codewithhaseeb.com/blog/${post.slug}`;
  const encodedUrl = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent(post.title);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
      trackEvent('blog_post_copy_link', { slug: post.slug });
    } catch {
      // fallback: select
    }
  };

  const handleShareX = () => {
    trackEvent('blog_post_share_x', { slug: post.slug });
    window.open(
      `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleShareLinkedIn = () => {
    trackEvent('blog_post_share_linkedin', { slug: post.slug });
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const githubEditUrl = `https://github.com/hassibayub/codewithhaseeb/edit/main/src/content/blog/${post.slug}.mdx`;

  return (
    <footer
      className="py-[48px] md:py-[64px]"
      style={{ backgroundColor: '#F3F2F1' }}
    >
      <div className="container-tight">
        <div
          className="mx-auto mt-24 pt-10"
          style={{
            maxWidth: 680,
            borderTop: '1px solid #E7E6E4',
          }}
        >
          {/* Author card */}
          <div className="flex gap-5">
            <div
              className="relative rounded-full overflow-hidden shrink-0"
              style={{ width: 80, height: 80 }}
            >
              <Image
                src="/about/haseeb.webp"
                alt="Muhammad Haseeb"
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
            <div>
              <p
                className="font-body font-medium"
                style={{ fontSize: 16, color: '#1D2020' }}
              >
                Muhammad Haseeb
              </p>
              <p
                className="font-body mt-0.5"
                style={{ fontSize: 14, color: '#5A5C5C' }}
              >
                Lead engineer
              </p>
              <p
                className="font-body mt-3 leading-[1.55]"
                style={{ fontSize: 15, color: '#5A5C5C', maxWidth: 460 }}
              >
                I build AI systems that survive production. LLM cost, agents,
                voice pipelines, and the gap between demos and deployed.
              </p>
              <Link
                href="/about"
                className="inline-block font-body font-medium mt-3 underline transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2020] focus-visible:ring-offset-2"
                style={{ fontSize: 14, color: '#1D2020' }}
              >
                Read more on /about
              </Link>
            </div>
          </div>

          {/* Share row */}
          <div
            className="flex flex-wrap items-center gap-4 mt-10"
            aria-label="Share this post"
          >
            <button
              type="button"
              onClick={handleShareX}
              className="font-body font-medium underline transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2020] focus-visible:ring-offset-2"
              style={{ fontSize: 14, color: '#1D2020' }}
            >
              Share on X
            </button>
            <span aria-hidden style={{ color: '#C4C4C4' }}>·</span>
            <button
              type="button"
              onClick={handleShareLinkedIn}
              className="font-body font-medium underline transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2020] focus-visible:ring-offset-2"
              style={{ fontSize: 14, color: '#1D2020' }}
            >
              Share on LinkedIn
            </button>
            <span aria-hidden style={{ color: '#C4C4C4' }}>·</span>
            <div aria-live="polite">
              <button
                type="button"
                onClick={handleCopyLink}
                aria-label="Copy link to this post"
                className="font-body font-medium underline transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2020] focus-visible:ring-offset-2"
                style={{ fontSize: 14, color: '#1D2020' }}
              >
                {copied ? 'Copied' : 'Copy link'}
              </button>
            </div>
          </div>

          {/* Edit on GitHub */}
          <p
            className="font-body mt-10"
            style={{ fontSize: 13, color: '#8C8C8C' }}
          >
            Spotted a typo?{' '}
            <a
              href={githubEditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition-opacity hover:opacity-70"
              style={{ color: '#8C8C8C' }}
            >
              Edit this post on GitHub
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
