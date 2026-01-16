import { Suspense } from 'react';

import { PostList } from '@/components/ui/post-list';
import { Spinner } from '@/components/ui/spinner';

export default async function Page() {
  return (
    <div>
      <h1>Home</h1>
      <Suspense fallback={<Spinner />}>
        <PostList />
      </Suspense>
    </div>
  );
}
