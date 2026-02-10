'use client';

import { useRouter } from 'next/navigation';

import { useState, useTransition } from 'react';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

import type { Post } from '@/models/post';

import { deletePost } from '@/actions/post';

type DeletePostActionsProps = { post: Post };

export function DeletePostActions({ post }: DeletePostActionsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isDeleted, setIsDeleted] = useState(false);
  const handleDelete = () => {
    startTransition(async () => {
      const result = await deletePost(post.id);
      setIsDeleted(true);
      router.back();
      toast.dismiss();
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success('The post has been deleted.');
      }
    });
  };
  const handleCancel = () => {
    router.back();
  };
  return (
    <>
      <Button
        variant='destructive'
        className='flex-1'
        onClick={handleDelete}
        disabled={isPending || isDeleted}
      >
        {isPending ?
          <>Deleting...</>
        : <>Delete</>}
      </Button>
      <Button
        variant='secondary'
        className='flex-1'
        onClick={handleCancel}
        disabled={isPending || isDeleted}
      >
        Cancel
      </Button>
    </>
  );
}
