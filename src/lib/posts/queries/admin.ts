import { notFound } from 'next/navigation';

import { reviveDates } from '@/lib/posts/transform';

import type { Post } from '@/models/post';

import { postRepository } from '@/repositories/post';

export async function findAll(): Promise<Post[]> {
  const posts = await postRepository.findAll();
  return posts.map(reviveDates);
}

export async function findById(id: Post['id']): Promise<Post> {
  const post = await postRepository.findById(id).catch(() => null);
  if (!post) notFound();
  return reviveDates(post);
}
