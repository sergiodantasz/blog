import { Metadata } from 'next';

import { Suspense } from 'react';

import { Header } from '@/components/ui/header';
import { PostList } from '@/components/ui/post-list';
import { Spinner } from '@/components/ui/spinner';

export const metadata: Metadata = {
  title: 'Posts',
};

export default async function Page() {
  return (
    <div className='w-full space-y-8 sm:space-y-16'>
      <Header />
      <Suspense fallback={<Spinner />}>
        <PostList />
      </Suspense>
    </div>
  );
}
