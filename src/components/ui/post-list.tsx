import Link from 'next/link';

import { findAllPublishedCached } from '@/lib/posts/queries/public';
import { groupPostsByYear, sortGroupedPostsByYear } from '@/lib/posts/transform';

import { formatDayMonth } from '@/utils/date';

export async function PostList() {
  const posts = await findAllPublishedCached();
  const groupedPosts = groupPostsByYear(posts);
  const sortedPosts = sortGroupedPostsByYear(groupedPosts);
  if (posts.length === 0) {
    return (
      <div className='flex items-center justify-center rounded-lg border border-stone-200 bg-stone-100/50 p-4 sm:p-8 dark:border-stone-800 dark:bg-stone-900/50'>
        <p className='text-center text-stone-600 dark:text-stone-400'>No posts available yet.</p>
      </div>
    );
  }
  return (
    <div className='[&>div:last-child>div:last-child>a:last-child]:border-b [&>div:last-child>div:last-child>a:last-child]:border-b-stone-200 [&>div:last-child>div:last-child>a:last-child]:dark:border-b-stone-800'>
      {sortedPosts.map(({ year, posts }) => (
        <div
          className='grid grid-cols-[auto_1fr] gap-16 border-t border-t-stone-200 sm:gap-32 dark:border-t-stone-800'
          key={year}
        >
          <div className='flex h-12 items-center justify-center text-sm text-stone-600 dark:text-stone-400'>
            {year}
          </div>
          <div className='flex flex-col divide-y divide-stone-200 dark:divide-stone-800'>
            {posts.map((post) => {
              const date = formatDayMonth(post.createdAt);
              return (
                <Link
                  href={`/posts/${post.slug}`}
                  className='grid grid-cols-[1fr_auto] gap-8 px-2 transition-all hover:bg-stone-100 dark:hover:bg-stone-900'
                  key={post.id}
                >
                  <span className='py-3 font-semibold'>{post.title}</span>
                  <time
                    className='flex h-12 items-center justify-center text-sm text-stone-600 dark:text-stone-400'
                    dateTime={date}
                  >
                    {date}
                  </time>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
