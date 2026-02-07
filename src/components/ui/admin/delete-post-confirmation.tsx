'use client';

import { AlertTriangleIcon } from 'lucide-react';

import { DeletePostActions } from '@/components/ui/admin/delete-post-actions';
import { Dialog } from '@/components/ui/dialog';

import type { Post } from '@/models/post';

type DeletePostConfirmationProps = { post: Post };

export function DeletePostConfirmation({ post }: DeletePostConfirmationProps) {
  return (
    <Dialog
      variant='destructive'
      header={{
        title: "You're about to delete a post.",
        icon: AlertTriangleIcon,
      }}
      content={<p>Are you sure you want to delete this post? This action cannot be undone.</p>}
      actions={<DeletePostActions post={post} />}
    />
  );
}
