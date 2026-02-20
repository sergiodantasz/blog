import { unstable_cache } from 'next/cache';

import { reviveDates } from '@/lib/posts/transform';

import type { Post } from '@/models/post';

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
      return await postRepository.findPublishedBySlug(slug).catch(() => null);
    },
    ['posts', 'by-slug', slug],
    { tags: [`posts:${slug}`] },
  )(slug);
  if (!post) return null;
  return reviveDates(post);
}
