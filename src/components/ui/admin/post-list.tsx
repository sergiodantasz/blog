import Link from 'next/link';

import { ExternalLinkIcon, PencilIcon, Trash2Icon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';

import { findAll } from '@/lib/posts/queries/admin';
import { sortPostsByDate } from '@/lib/posts/transform';

import { formatDayMonthYear } from '@/utils/date';

export async function PostList() {
  const posts = await findAll();
  const sortedPosts = sortPostsByDate(posts, 'desc');
  if (posts.length === 0) {
    return (
      <div className='flex items-center justify-center rounded-lg border border-stone-200 bg-stone-100/50 p-4 sm:p-8 dark:border-stone-800 dark:bg-stone-900/50'>
        <p className='text-center text-stone-600 dark:text-stone-400'>No posts created yet.</p>
      </div>
    );
  }
  return (
    <div className='w-full overflow-x-auto rounded-lg border border-stone-200 dark:border-stone-800'>
      <table className='text-left'>
        <thead className='border-b border-stone-200 text-xs text-stone-600 uppercase dark:border-stone-800 dark:text-stone-400'>
          <tr>
            <th
              scope='col'
              className='px-2 py-3'
            >
              Name
            </th>
            <th
              scope='col'
              className='px-2 py-3'
            >
              Created
            </th>
            <th
              scope='col'
              className='px-2 py-3'
            >
              Status
            </th>
            <th
              scope='col'
              className='px-2 py-3'
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className='divide-y divide-stone-200 dark:divide-stone-800 [&_td]:align-top'>
          {sortedPosts.map((post) => (
            <tr
              key={post.id}
              className='transition-all hover:bg-stone-100 dark:hover:bg-stone-900'
            >
              <td className='w-full px-2 py-3 font-semibold'>
                {post.isPublished ?
                  <Link
                    href={`/posts/${post.slug}`}
                    className='group relative block'
                  >
                    <span className='transition-opacity group-hover:opacity-0'>{post.title}</span>
                    <ExternalLinkIcon
                      size={16}
                      className='absolute inset-0 m-auto opacity-0 transition-opacity group-hover:opacity-100'
                    />
                  </Link>
                : <span>{post.title}</span>}
              </td>
              <td className='px-2 text-sm text-stone-600 dark:text-stone-400'>
                <div className='flex h-12 items-center'>{formatDayMonthYear(post.createdAt)}</div>
              </td>
              <td className='px-2'>
                <div className='flex h-12 items-center'>
                  <Badge color={post.isPublished ? 'green' : 'red'}>
                    {post.isPublished ? 'Published' : 'Not published'}
                  </Badge>
                </div>
              </td>
              <td className='px-2'>
                <div className='flex h-12 items-center gap-1'>
                  <Link
                    className='flex items-center justify-center rounded-md bg-red-200 p-1 transition-all hover:bg-red-300 dark:bg-red-950 dark:hover:bg-red-900'
                    href={`/admin/posts/${post.id}/delete`}
                    scroll={false}
                  >
                    <Trash2Icon
                      size={20}
                      className='text-red-600 dark:text-red-500'
                    />
                  </Link>
                  <Link
                    className='flex items-center justify-center rounded-md bg-yellow-200 p-1 transition-all hover:bg-yellow-300 dark:bg-yellow-950 dark:hover:bg-yellow-900'
                    href={`/admin/posts/${post.id}/edit`}
                    scroll={false}
                  >
                    <PencilIcon
                      size={20}
                      className='text-yellow-600 dark:text-yellow-500'
                    />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
