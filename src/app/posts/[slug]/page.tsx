import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { SafeMarkdown } from '@/components/layout/safe-markdown';

import { findPublishedBySlugCached } from '@/lib/posts/queries/public';

import { Post } from '@/models/post';

import { formatMonthDayYear } from '@/utils/date';

export const dynamic = 'force-static';

type PageProps = {
  params: Promise<{ slug: Post['slug'] }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await findPublishedBySlugCached(slug);
  if (!post) notFound();
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = await findPublishedBySlugCached(slug);
  if (!post) notFound();
  return (
    <div className='flex min-w-0 flex-col gap-4 sm:gap-8'>
      <div>
        <h1 className='text-lg font-bold'>{post.title}</h1>
        <span className='text-sm text-stone-600 dark:text-stone-400'>
          {formatMonthDayYear(post.createdAt)}
        </span>
      </div>
      <hr className='border-stone-200 dark:border-stone-800' />
      <SafeMarkdown markdown={post.content} />
    </div>
  );
}
