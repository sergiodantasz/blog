import { readFile } from 'fs/promises';
import { resolve } from 'path';

import type { Post } from '@/models/post';

import type { PostRepository } from '@/repositories/post-repository';

const ROOT_DIR = process.cwd();
const JSON_POSTS_FILE_PATH = resolve(ROOT_DIR, 'src', 'db', 'seed', 'posts.json');

const WAITING_TIME_IN_MS = 0;

type JsonPost = Omit<Post, 'createdAt' | 'updatedAt'> & { createdAt: string; updatedAt: string };

export class JsonPostRepository implements PostRepository {
  private async loadPostsFromJsonFile(): Promise<Post[]> {
    const jsonContent = await readFile(JSON_POSTS_FILE_PATH, { encoding: 'utf-8' });
    const parsedPosts = JSON.parse(jsonContent) as Record<'posts', Array<JsonPost>>;
    const normalizedPosts = parsedPosts.posts.map((post) => ({
      ...post,
      createdAt: new Date(post.createdAt),
      updatedAt: new Date(post.updatedAt),
    }));
    return normalizedPosts;
  }

  private async simulateWaiting() {
    if (WAITING_TIME_IN_MS <= 0) return;
    await new Promise((resolve) => {
      setTimeout(resolve, WAITING_TIME_IN_MS);
    });
  }

  async findAll(): Promise<Post[]> {
    await this.simulateWaiting();
    const posts = await this.loadPostsFromJsonFile();
    return posts;
  }

  async findById(id: Post['id']): Promise<Post> {
    await this.simulateWaiting();
    const posts = await this.loadPostsFromJsonFile();
    const post = posts.find((p) => p.id === id);
    if (!post) {
      throw new Error(`Post with id "${id}" not found.`);
    }
    return post;
  }

  async findAllPublished(): Promise<Post[]> {
    await this.simulateWaiting();
    const posts = await this.loadPostsFromJsonFile();
    const publishedPosts = posts.filter((post) => post.isPublished);
    return publishedPosts;
  }

  async findPublishedBySlug(slug: Post['slug']): Promise<Post> {
    await this.simulateWaiting();
    const posts = await this.loadPostsFromJsonFile();
    const post = posts.find((p) => p.slug === slug);
    if (!post) {
      throw new Error(`Post with slug "${slug}" not found.`);
    }
    return post;
  }
}
