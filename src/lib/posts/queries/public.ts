import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';

import { reviveDates } from '@/lib/posts/transform';

import { Post } from '@/models/post';

import { postRepository } from '@/repositories/post';

export async function findAllPublishedCached() {
  const posts = await unstable_cache(
    async () => await postRepository.findAllPublished(),
    ['posts'],
    { tags: ['posts'] },
  )();
  return posts.map(reviveDates);
}

export async function findPublishedBySlugCached(slug: Post['slug']) {
  const post = await unstable_cache(
    async (slug: Post['slug']) => {
      const post = await postRepository.findPublishedBySlug(slug).catch(() => null);
      if (!post) notFound();
      return post;
    },
    ['posts'],
    { tags: ['posts', `posts:${slug}`] },
  )(slug);
  return reviveDates(post);
}
