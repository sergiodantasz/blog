import { Suspense } from 'react';

import { Header } from '@/components/ui/header';
import { PostList } from '@/components/ui/post-list';
import { Spinner } from '@/components/ui/spinner';

export default async function Page() {
  return (
    <div>
      <Header />
      <Suspense fallback={<Spinner />}>
        <PostList />
      </Suspense>
    </div>
  );
}
