import type { Metadata } from 'next';

import { Suspense } from 'react';

import { Header } from '@/components/ui/admin/header';
import { PostList } from '@/components/ui/admin/post-list';
import { Spinner } from '@/components/ui/spinner';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Posts',
};

export default function Page() {
  return (
    <div className='w-full min-w-0 space-y-8 sm:space-y-16'>
      <Header />
      <Suspense fallback={<Spinner />}>
        <PostList />
      </Suspense>
    </div>
  );
}
