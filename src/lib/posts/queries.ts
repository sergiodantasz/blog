import { notFound } from 'next/navigation';

import { cache } from 'react';

import { Post } from '@/models/post';

import { postRepository } from '@/repositories/post';

export const findAllCached = cache(async () => await postRepository.findAll());

export const findByIdCached = cache(async (id: Post['id']) => {
  const post = await postRepository.findById(id);
  if (!post) notFound();
  return post;
});

export const findAllPublishedCached = cache(async () => await postRepository.findAllPublished());

export const findPublishedBySlugCached = cache(async (slug: Post['slug']) => {
  const post = await postRepository.findPublishedBySlug(slug).catch(() => null);
  if (!post) notFound();
  return post;
});
