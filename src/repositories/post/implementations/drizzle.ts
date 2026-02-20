import { eq } from 'drizzle-orm';

import { db } from '@/db/client';
import { posts } from '@/db/schema';

import type { Post } from '@/models/post';

import type { PostRepository } from '@/repositories/post/repository';

export class DrizzlePostRepository implements PostRepository {
  async findAll(): Promise<Post[]> {
    return db.query.posts.findMany();
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
    return db.query.posts.findMany({
      where: (table, { eq }) => eq(table.isPublished, true),
    });
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

  async delete(id: Post['id']): Promise<void> {
    await this.findById(id);
    await db.delete(posts).where(eq(posts.id, id));
  }

  async create(post: Post): Promise<void> {
    const postExists = await db.query.posts.findFirst({
      where: (table, { or, eq }) => or(eq(table.id, post.id), eq(table.slug, post.slug)),
      columns: { id: true },
    });
    if (postExists) {
      throw new Error(`Post with id "${post.id}" or slug "${post.slug}" already exists.`);
    }
    await db.insert(posts).values(post);
  }

  async update(
    id: Post['id'],
    newData: Pick<Post, 'title' | 'content' | 'slug' | 'isPublished'>,
  ): Promise<void> {
    await this.findById(id);
    await db.update(posts).set(newData).where(eq(posts.id, id));
  }
}
