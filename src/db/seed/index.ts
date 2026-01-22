import { faker } from '@faker-js/faker';
import generateSlug from 'slug';

import { db } from '@/db';
import { posts } from '@/db/schema';

function createRandomPost() {
  const title = faker.lorem.sentence({ min: 4, max: 8 });
  const createdAt = faker.date.past({ years: 3 });
  return {
    id: faker.string.uuid(),
    title,
    slug: generateSlug(title),
    excerpt: faker.lorem.paragraph({ min: 5, max: 10 }),
    content: faker.lorem.paragraphs({ min: 5, max: 10 }),
    isPublished: faker.datatype.boolean({ probability: 0.7 }),
    createdAt,
    updatedAt: faker.date.between({ from: createdAt, to: new Date() }),
    author: faker.person.fullName(),
  };
}

async function seed() {
  console.log('🌱 Seeding database...');
  const numberOfPosts = 10;
  const postsToInsert = faker.helpers.multiple(createRandomPost, { count: numberOfPosts });
  try {
    await db.insert(posts).values(postsToInsert);
    console.log(`✅ Successfully seeded ${numberOfPosts} posts.`);
  } catch (error) {
    console.error('❌ Error seeding database.');
    throw error;
  }
}

seed()
  .then(() => {
    console.log('🎉 Seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Seeding failed:', error);
    process.exit(1);
  });
