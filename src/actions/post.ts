'use server';

import { revalidateTag } from 'next/cache';

import type { Post } from '@/models/post';

import { postRepository } from '@/repositories/post';

export async function deletePost(id: Post['id']) {
  if (!id || typeof id !== 'string') {
    return { error: 'Invalid data.' };
  }
  const post = await postRepository.findById(id).catch(() => null);
  if (!post) {
    return { error: 'This post does not exist.' };
  }
  await postRepository.delete(id);
  revalidateTag('posts', 'max');
}
