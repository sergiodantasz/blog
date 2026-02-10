import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PostForm } from '@/components/ui/admin/post-form';

import { withPostFormDefaults } from '@/lib/posts/defaults';
import { findByIdCached } from '@/lib/posts/queries/admin';

import { Post } from '@/models/post';

type PageProps = {
  params: Promise<{ id: Post['id'] }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await findByIdCached(id);
  if (!post) notFound();
  return {
    title: `Edit "${post.title}"`,
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const post = await findByIdCached(id);
  if (!post) notFound();
  const postDTO = withPostFormDefaults(post);
  return (
    <PostForm
      mode='update'
      postId={id}
      defaultValues={postDTO}
    />
  );
}
