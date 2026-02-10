import { eq } from 'drizzle-orm';

import { db } from '@/db/client';
import { posts } from '@/db/schema';

import type { Post } from '@/models/post';

import type { PostRepository } from '@/repositories/post/repository';

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

  async delete(id: Post['id']): Promise<void> {
    try {
      await this.findById(id);
    } catch (e) {
      throw e;
    }
    await db.delete(posts).where(eq(posts.id, id));
  }

  async create(post: Post): Promise<void> {
    const postExists = await db.query.posts.findFirst({
      where: (table, { or, eq }) => or(eq(table.id, post.id), eq(table.slug, post.slug)),
      columns: { id: true },
    });
    if (!!postExists) {
      throw new Error(`Post with id "${post.id}" or slug "${post.slug}" already exists.`);
    }
    await db.insert(posts).values(post);
  }

  async update(
    id: Post['id'],
    newData: Pick<Post, 'title' | 'content' | 'slug' | 'isPublished'>,
  ): Promise<void> {
    try {
      await this.findById(id);
    } catch (e) {
      throw e;
    }
    const postData = {
      title: newData.title,
      content: newData.content,
      slug: newData.slug,
      isPublished: newData.isPublished,
    };
    await db.update(posts).set(postData).where(eq(posts.id, id));
  }
}
