import type { Post } from '@/models/post';

export interface PostRepository {
  findAll(): Promise<Post[]>;
  findAllPublished(): Promise<Post[]>;
  findById(id: Post['id']): Promise<Post>;
  findBySlug(slug: Post['slug']): Promise<Post>;
}
