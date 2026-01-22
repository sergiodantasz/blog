import { DrizzlePostRepository } from '@/repositories/post/implementations/drizzle';
import type { PostRepository } from '@/repositories/post/repository';

export const postRepository: PostRepository = new DrizzlePostRepository();
