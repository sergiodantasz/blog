import { revalidateTag } from 'next/cache';

import slug from 'slug';

import { withPostFormDefaults } from '@/lib/posts/defaults';

import type { PostFormDTO } from '@/models/post';

import { PostSchema } from '@/schemas/post';

import type { PostActionState } from '@/actions/post/types';

import { generateRandomString } from '@/utils/string';
import { getZodErrorMessages } from '@/utils/zod';

export function generatePostSlug(title: string): string {
  return `${slug(title)}-${generateRandomString(3)}`;
}

export function revalidatePostCache(...slugs: string[]): void {
  revalidateTag('posts', 'max');
  for (const postSlug of slugs) {
    revalidateTag(`posts:${postSlug}`, 'max');
  }
}

export function successState(formState: PostFormDTO): PostActionState {
  return { formState, errors: [], success: true };
}

export function errorState(formState: PostFormDTO, errors: string[]): PostActionState {
  return { formState, errors, success: false };
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Unknown error.';
}

export function parsePostFormData(
  formData: FormData,
  fallbackFormState: PostFormDTO,
): PostActionState {
  if (!(formData instanceof FormData)) {
    return errorState(fallbackFormState, ['Invalid data.']);
  }

  const raw = Object.fromEntries(formData.entries());
  const result = PostSchema.safeParse(raw);

  if (!result.success) {
    return errorState(withPostFormDefaults(raw), getZodErrorMessages(result.error));
  }

  return successState(result.data);
}
