import { Suspense } from 'react';

import { Header } from '@/components/ui/header';
import { PostList } from '@/components/ui/post-list';
import { Spinner } from '@/components/ui/spinner';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export default async function Page() {
  return (
    <div>
      <ThemeToggle />
      <Header />
      <Suspense fallback={<Spinner />}>
        <PostList />
      </Suspense>
    </div>
  );
}
