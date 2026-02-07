import type { Post } from '@/models/post';

export interface PostRepository {
  findAll(): Promise<Post[]>;
  findById(id: Post['id']): Promise<Post>;
  findAllPublished(): Promise<Post[]>;
  findPublishedBySlug(slug: Post['slug']): Promise<Post>;
  delete(id: Post['id']): Promise<void>;
}
