import { db } from '@/db/client';
import { posts, type InsertPost } from '@/db/schema';

import { createRandomPosts } from '../factories/post-factory';

export async function seedPosts(numberOfPosts: number): Promise<void> {
  if (numberOfPosts <= 0) {
    throw new Error('Number of posts must be greater than 0.');
  }
  console.log(`🌱 Seeding database with ${numberOfPosts} post(s)...`);
  const postsToInsert: InsertPost[] = createRandomPosts(numberOfPosts);
  try {
    await db.insert(posts).values(postsToInsert);
    console.log(`✅ Successfully seeded ${numberOfPosts} post(s).`);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}
