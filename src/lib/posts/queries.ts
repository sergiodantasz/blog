import { notFound } from 'next/navigation';

import { cache } from 'react';

import { Post } from '@/models/post';

import { postRepository } from '@/repositories/json-post-repository';

export const findAllPublishedPostsCached = cache(
  async () => await postRepository.findAllPublished(),
);

export const findPostByIdCached = cache(
  async (id: Post['id']) => await postRepository.findById(id),
);

export const findPostBySlugCached = cache(async (slug: Post['slug']) => {
  const post = await postRepository.findPublishedBySlug(slug).catch(() => null);
  if (!post) notFound();
  return post;
});
