import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';

import { reviveDates } from '@/lib/posts/transform';

import { Post } from '@/models/post';

import { postRepository } from '@/repositories/post';

export async function findAllCached() {
  const posts = await unstable_cache(async () => await postRepository.findAll(), ['posts'], {
    tags: ['posts'],
  })();
  return posts.map(reviveDates);
}

export async function findByIdCached(id: Post['id']) {
  const post = await unstable_cache(
    async (id: Post['id']) => {
      const post = await postRepository.findById(id).catch(() => null);
      if (!post) notFound();
      return post;
    },
    ['posts'],
    {
      tags: ['posts', `posts:${id}`],
    },
  )(id);
  return reviveDates(post);
}
