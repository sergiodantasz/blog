import { db } from '@/db';

import type { Post } from '@/models/post';

import type { PostRepository } from '@/repositories/post-repository';

export class DrizzlePostRepository implements PostRepository {
  async findAll(): Promise<Post[]> {
    const posts = await db.query.posts.findMany();
    return posts;
  }

  async findById(id: Post['id']): Promise<Post> {
    const post = await db.query.posts.findFirst({
      where: (table, { eq }) => eq(table.id, id),
    });
    if (!post) {
      throw new Error(`Post with id "${id}" not found.`);
    }
    return post;
  }

  async findAllPublished(): Promise<Post[]> {
    const posts = await db.query.posts.findMany({
      where: (table, { eq }) => eq(table.isPublished, true),
    });
    return posts;
  }

  async findPublishedBySlug(slug: Post['slug']): Promise<Post> {
    const post = await db.query.posts.findFirst({
      where: (table, { eq, and }) => and(eq(table.slug, slug), eq(table.isPublished, true)),
    });
    if (!post) {
      throw new Error(`Post with slug "${slug}" not found.`);
    }
    return post;
  }
}
