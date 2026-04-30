import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import { mdxComponents } from '@/components/blog/mdx-components';

interface PostBodyProps {
  content: string;
}

const prettyCodeOptions = {
  theme: 'github-light',
  keepBackground: false,
  defaultLang: 'plaintext',
};

export function PostBody({ content }: PostBodyProps) {
  return (
    <section
      className="pb-[64px] md:pb-[96px]"
      style={{ backgroundColor: '#F3F2F1' }}
    >
      <div className="container-tight">
        <div
          className="mx-auto blog-prose"
          style={{ maxWidth: 680 }}
        >
          <MDXRemote
            source={content}
            components={mdxComponents as Record<string, React.ComponentType>}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  rehypeSlug,
                  [rehypeAutolinkHeadings, { behavior: 'wrap' }],
                  [rehypePrettyCode, prettyCodeOptions],
                ],
              },
            }}
          />
        </div>
      </div>
    </section>
  );
}
