import Link from 'next/link';

import { HouseIcon, NewspaperIcon, PlusIcon } from 'lucide-react';

export function Menu() {
  return (
    <nav className='mx-auto mb-8 flex w-fit items-center justify-center divide-x divide-dashed divide-stone-300 rounded-lg border border-dashed border-stone-300 text-center text-sm font-medium text-stone-700 sm:mb-16 dark:divide-stone-700 dark:border-stone-700 dark:text-stone-300'>
      <a
        className='flex items-center justify-center gap-1 self-stretch rounded-ss-[7px] rounded-es-[7px] px-4 py-2 transition-all hover:bg-stone-300 dark:hover:bg-stone-900'
        href='/'
        target='_blank'
      >
        <HouseIcon
          size={16}
          className='shrink-0'
        />
        <span>Home</span>
      </a>
      <Link
        className='flex items-center justify-center gap-1 self-stretch px-4 py-2 transition-all hover:bg-stone-300 dark:hover:bg-stone-900'
        href='/admin/posts'
      >
        <NewspaperIcon
          size={16}
          className='shrink-0'
        />
        <span>Posts</span>
      </Link>
      <Link
        className='flex items-center justify-center gap-1 self-stretch rounded-se-[7px] rounded-ee-[7px] px-4 py-2 transition-all hover:bg-stone-300 dark:hover:bg-stone-900'
        href='/admin/posts/new'
      >
        <PlusIcon
          size={16}
          className='shrink-0'
        />
        <span>New post</span>
      </Link>
    </nav>
  );
}
