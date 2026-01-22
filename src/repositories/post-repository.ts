import type { Post } from '@/models/post';

import { DrizzlePostRepository } from '@/repositories/drizzle-post-repository';

export interface PostRepository {
  findAll(): Promise<Post[]>;
  findById(id: Post['id']): Promise<Post>;
  findAllPublished(): Promise<Post[]>;
  findPublishedBySlug(slug: Post['slug']): Promise<Post>;
}

export const postRepository: PostRepository = new DrizzlePostRepository();
