'use server';

import { randomUUID } from 'crypto';

import { requireAuthSession } from '@/lib/auth/session';

import type { Post } from '@/models/post';

import { postRepository } from '@/repositories/post';

import {
  errorState,
  generatePostSlug,
  getErrorMessage,
  parsePostFormData,
  revalidatePostCache,
  successState,
} from '@/actions/post/helpers';
import type { DeletePostResult, PostActionState } from '@/actions/post/types';

export async function deletePost(id: Post['id']): Promise<DeletePostResult> {
  await requireAuthSession();

  if (!id || typeof id !== 'string') {
    return { error: 'Invalid data.', success: false };
  }

  let post: Post;
  try {
    post = await postRepository.findById(id);
  } catch {
    return { error: 'This post does not exist.', success: false };
  }

  try {
    await postRepository.delete(id);
  } catch {
    return { error: 'Failed to delete this post.', success: false };
  }

  revalidatePostCache(post.slug);
  return { success: true };
}

export async function createPost(
  prevState: PostActionState,
  formData: FormData,
): Promise<PostActionState> {
  await requireAuthSession();

  const parsed = parsePostFormData(formData, prevState.formState);
  if (!parsed.success) return parsed;

  const { formState } = parsed;

  const newPost: Post = {
    ...formState,
    id: randomUUID(),
    slug: generatePostSlug(formState.title),
    createdAt: new Date(),
  };

  try {
    await postRepository.create(newPost);
  } catch (error) {
    return errorState(formState, [getErrorMessage(error)]);
  }

  revalidatePostCache();
  return successState(formState);
}

export async function updatePost(
  id: Post['id'],
  prevState: PostActionState,
  formData: FormData,
): Promise<PostActionState> {
  await requireAuthSession();

  const parsed = parsePostFormData(formData, prevState.formState);
  if (!parsed.success) return parsed;

  const { formState } = parsed;

  let existingPost: Post;
  try {
    existingPost = await postRepository.findById(id);
  } catch {
    return errorState(formState, ['Post not found.']);
  }

  const titleChanged = existingPost.title !== formState.title;
  const newSlug = titleChanged ? generatePostSlug(formState.title) : existingPost.slug;

  try {
    await postRepository.update(id, { ...formState, slug: newSlug });
  } catch (error) {
    return errorState(formState, [getErrorMessage(error)]);
  }

  const slugsToRevalidate = [existingPost.slug];
  if (titleChanged) slugsToRevalidate.push(newSlug);
  revalidatePostCache(...slugsToRevalidate);

  return successState(formState);
}
