import { Metadata } from 'next';

import { findPostBySlugCached } from '@/lib/posts/queries';

import { Post } from '@/models/post';

type PageProps = {
  params: Promise<{ slug: Post['slug'] }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await findPostBySlugCached(slug);
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = await findPostBySlugCached(slug);
  return <h1>{post.title}</h1>;
}
