import type { Post } from '@/models/post';

export interface PostRepository {
  findAll(): Promise<Post[]>;
  findById(id: Post['id']): Promise<Post>;
  findAllPublished(): Promise<Post[]>;
  findPublishedBySlug(slug: Post['slug']): Promise<Post>;
  delete(id: Post['id']): Promise<void>;
  create(post: Post): Promise<void>;
  update(
    id: Post['id'],
    newData: Pick<Post, 'title' | 'content' | 'slug' | 'isPublished'>,
  ): Promise<void>;
}
