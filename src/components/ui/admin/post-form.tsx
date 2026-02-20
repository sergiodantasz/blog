'use client';

import { useRouter } from 'next/navigation';

import { useActionState, useEffect } from 'react';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { MarkdownEditor } from '@/components/ui/markdown-editor';

import { withPostFormDefaults } from '@/lib/posts/defaults';

import type { Post, PostFormDTO } from '@/models/post';

import { createPost, updatePost } from '@/actions/post';

type PostFormProps =
  | { mode: 'create' }
  | { mode: 'update'; defaultValues: PostFormDTO; postId: Post['id'] };

export function PostForm(props: PostFormProps) {
  const isEditing = props.mode === 'update';
  const router = useRouter();
  const initialState = {
    formState: isEditing ? props.defaultValues : withPostFormDefaults(),
    errors: [],
    success: false,
  };
  const serverAction = isEditing ? updatePost.bind(null, props.postId) : createPost;
  const [state, action, isPending] = useActionState(serverAction, initialState);
  useEffect(() => {
    toast.dismiss();
    state.errors.forEach((error) => toast.error(error));
  }, [state.errors]);
  useEffect(() => {
    if (state.success) {
      toast.success(isEditing ? 'The post has been updated.' : 'The post has been created.');
      router.push('/admin/posts');
    }
  }, [state.success, router, isEditing]);
  const { formState } = state;
  const isDisabled = isPending || state.success;
  return (
    <form
      action={action}
      className='flex flex-col gap-4'
    >
      <Input
        type='text'
        labelText='Title'
        name='title'
        placeholder='Type the title...'
        defaultValue={formState.title}
        disabled={isDisabled}
      />
      <Checkbox
        labelText='Published?'
        name='isPublished'
        defaultChecked={formState.isPublished}
        disabled={isDisabled}
      />
      <MarkdownEditor
        name='content'
        defaultValue={formState.content}
        disabled={isDisabled}
      />
      <Button disabled={isDisabled}>{isEditing ? 'Update' : 'Create'}</Button>
    </form>
  );
}
