'use server';

import { randomUUID } from 'crypto';

import { revalidateTag } from 'next/cache';

import slug from 'slug';

import { withPostFormDefaults } from '@/lib/posts/defaults';

import type { Post, PostFormDTO } from '@/models/post';

import { PostSchema } from '@/schemas/post';

import { postRepository } from '@/repositories/post';

import { generateRandomString } from '@/utils/string';
import { getZodErrorMessages } from '@/utils/zod';

export async function deletePost(id: Post['id']) {
  if (!id || typeof id !== 'string') {
    return { error: 'Invalid data.' };
  }
  let post: Post;
  try {
    post = await postRepository.findById(id);
  } catch {
    return { error: 'This post does not exist.' };
  }
  try {
    await postRepository.delete(id);
  } catch {
    return { error: 'Failed to delete this post.' };
  }
  revalidateTag('posts', 'max');
  revalidateTag(`posts:${post.slug}`, 'max');
}

export type PostActionState = {
  formState: PostFormDTO;
  errors: string[];
  success: boolean;
};

export async function createPost(
  prevState: PostActionState,
  formData: FormData,
): Promise<PostActionState> {
  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ['Invalid data.'],
      success: false,
    };
  }
  const formDataObj = Object.fromEntries(formData.entries());
  const zodParsedObj = PostSchema.safeParse(formDataObj);
  if (!zodParsedObj.success && zodParsedObj.error) {
    return {
      formState: withPostFormDefaults(formDataObj),
      errors: getZodErrorMessages(zodParsedObj.error),
      success: false,
    };
  }
  const formState: PostFormDTO = zodParsedObj.data;
  const newPost: Post = {
    ...formState,
    createdAt: new Date(),
    id: randomUUID(),
    slug: `${slug(zodParsedObj.data.title)}-${generateRandomString(3)}`,
  };
  try {
    await postRepository.create(newPost);
  } catch (e) {
    if (e instanceof Error) {
      return {
        formState,
        errors: [e.message],
        success: false,
      };
    }
    return {
      formState,
      errors: ['Unknown error.'],
      success: false,
    };
  }
  revalidateTag('posts', 'max');
  return {
    formState,
    errors: [],
    success: true,
  };
}

export async function updatePost(
  id: Post['id'],
  prevState: PostActionState,
  formData: FormData,
): Promise<PostActionState> {
  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ['Invalid data.'],
      success: false,
    };
  }
  const formDataObj = Object.fromEntries(formData.entries());
  const zodParsedObj = PostSchema.safeParse(formDataObj);
  if (!zodParsedObj.success && zodParsedObj.error) {
    return {
      formState: withPostFormDefaults(formDataObj),
      errors: getZodErrorMessages(zodParsedObj.error),
      success: false,
    };
  }
  const formState: PostFormDTO = zodParsedObj.data;
  let existingPost: Post;
  try {
    existingPost = await postRepository.findById(id);
  } catch {
    return {
      formState,
      errors: ['Post not found.'],
      success: false,
    };
  }
  const titleChanged = existingPost.title !== formState.title;
  const newSlug =
    titleChanged ? `${slug(formState.title)}-${generateRandomString(3)}` : existingPost.slug;
  const updateData = {
    ...formState,
    slug: newSlug,
  };
  try {
    await postRepository.update(id, updateData);
  } catch (e) {
    if (e instanceof Error) {
      return {
        formState,
        errors: [e.message],
        success: false,
      };
    }
    return {
      formState,
      errors: ['Unknown error.'],
      success: false,
    };
  }
  revalidateTag('posts', 'max');
  revalidateTag(`posts:${existingPost.slug}`, 'max');
  if (titleChanged) {
    revalidateTag(`posts:${newSlug}`, 'max');
  }
  return {
    formState,
    errors: [],
    success: true,
  };
}
