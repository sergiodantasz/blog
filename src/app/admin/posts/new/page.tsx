import { Metadata } from 'next';

import { PostForm } from '@/components/ui/admin/post-form';

export const metadata: Metadata = {
  title: 'Create a new post',
};

export default function Page() {
  return <PostForm />;
}
