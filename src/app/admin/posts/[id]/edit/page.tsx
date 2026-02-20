import type { Metadata } from 'next';

import { PostForm } from '@/components/ui/admin/post-form';

import { withPostFormDefaults } from '@/lib/posts/defaults';
import { findById } from '@/lib/posts/queries/admin';

import type { Post } from '@/models/post';

type PageProps = {
  params: Promise<{ id: Post['id'] }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await findById(id);
  return {
    title: `Edit "${post.title}"`,
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const post = await findById(id);
  const postDTO = withPostFormDefaults(post);
  return (
    <PostForm
      mode='update'
      postId={id}
      defaultValues={postDTO}
    />
  );
}
