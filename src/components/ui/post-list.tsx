import { groupPostsByYear, sortGroupedPostsByYear } from '@/lib/posts';

import { postRepository } from '@/repositories/post-repository';

import { formatDayMonth } from '@/utils/date';

export async function PostList() {
  const posts = await postRepository.findAll();
  const groupedPosts = groupPostsByYear(posts);
  const sortedPosts = sortGroupedPostsByYear(groupedPosts);
  return (
    <div className='[&>div:last-child>div:last-child>div:last-child]:border-b [&>div:last-child>div:last-child>div:last-child]:border-b-stone-200 [&>div:last-child>div:last-child>div:last-child]:dark:border-b-stone-800'>
      {sortedPosts.map(({ year, posts }) => (
        <div
          className='grid grid-cols-[auto_1fr] gap-x-28 border-t border-t-stone-200 dark:border-t-stone-800'
          key={year}
        >
          <div className='flex h-12 items-center justify-center text-sm text-stone-600 dark:text-stone-400'>
            {year}
          </div>
          <div className='flex flex-col divide-y divide-stone-200 dark:divide-stone-800'>
            {posts.map((post) => {
              const date = formatDayMonth(post.createdAt);
              return (
                <div
                  className='grid grid-cols-[1fr_auto] gap-8'
                  key={post.id}
                >
                  <span className='py-3 font-medium'>{post.title}</span>
                  <time
                    className='flex h-12 items-center justify-center text-sm text-stone-600 dark:text-stone-400'
                    dateTime={date}
                  >
                    {date}
                  </time>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
