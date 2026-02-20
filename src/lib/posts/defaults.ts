import type { Post, PostFormDTO } from '@/models/post';

const postFormDefaults: PostFormDTO = {
  title: '',
  content: '',
  isPublished: false,
};

export function withPostFormDefaults(post?: Partial<Post>): PostFormDTO {
  return {
    title: post?.title || postFormDefaults.title,
    content: post?.content || postFormDefaults.content,
    isPublished: post?.isPublished ?? postFormDefaults.isPublished,
  };
}
