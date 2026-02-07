import { notFound } from 'next/navigation';

import { reviveDates } from '@/lib/posts/transform';

import { Post } from '@/models/post';

import { postRepository } from '@/repositories/post';

export async function findAllCached() {
  const posts = await postRepository.findAll();
  return posts.map(reviveDates);
}

export async function findByIdCached(id: Post['id']) {
  const post = await postRepository.findById(id).catch(() => null);
  if (!post) notFound();
  return reviveDates(post);
}
