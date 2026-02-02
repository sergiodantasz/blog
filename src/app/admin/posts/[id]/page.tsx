import { Metadata } from 'next';

import { findByIdCached } from '@/lib/posts/queries/admin';

import { Post } from '@/models/post';

type PageProps = {
  params: Promise<{ id: Post['id'] }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await findByIdCached(id);
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <div>Post {id}</div>;
}
