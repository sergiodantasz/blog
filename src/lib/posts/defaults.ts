import { Post, PostFormDTO } from '@/models/post';

const postFormDefaults: PostFormDTO = {
  title: '',
  excerpt: '',
  content: '',
  isPublished: false,
};

export function withPostFormDefaults(post?: Partial<Post>): PostFormDTO {
  return {
    title: post?.title || postFormDefaults.title,
    excerpt: post?.excerpt || postFormDefaults.excerpt,
    content: post?.content || postFormDefaults.content,
    isPublished: post?.isPublished ?? postFormDefaults.isPublished,
  };
}
