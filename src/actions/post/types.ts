import type { PostFormDTO } from '@/models/post';

export type PostActionState = {
  formState: PostFormDTO;
  errors: string[];
  success: boolean;
};

export type DeletePostResult = { success: true } | { success: false; error: string };
