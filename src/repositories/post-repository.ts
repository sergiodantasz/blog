import { readFile } from 'fs/promises';
import { resolve } from 'path';

import { Post } from '@/models/post';

export interface PostRepository {
  findAll(): Promise<Post[]>;
  findById(id: Post['id']): Promise<Post>;
}

const ROOT_DIR = process.cwd();
const JSON_POSTS_FILE_PATH = resolve(ROOT_DIR, 'src', 'db', 'seed', 'posts.json');

export class JsonPostRepository implements PostRepository {
  private async loadPostsFromJsonFile(): Promise<Post[]> {
    const jsonContent = await readFile(JSON_POSTS_FILE_PATH, { encoding: 'utf-8' });
    const parsedJson = JSON.parse(jsonContent) as Record<'posts', Array<Post>>;
    return parsedJson.posts;
  }

  async findAll(): Promise<Post[]> {
    return this.loadPostsFromJsonFile();
  }

  async findById(id: Post['id']) {
    const posts = await this.findAll();
    const post = posts.find((p) => p.id === id);
    if (!post) {
      throw new Error(`Post with id "${id}" not found.`);
    }
    return post;
  }
}

export const postRepository: PostRepository = new JsonPostRepository();
