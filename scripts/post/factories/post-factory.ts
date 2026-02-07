import { faker } from '@faker-js/faker';
import generateSlug from 'slug';

import type { InsertPost } from '@/db/schema';

export function createRandomPost(): InsertPost {
  const title = faker.lorem.sentence({ min: 4, max: 8 });
  const createdAt = faker.date.past({ years: 5 });
  return {
    id: faker.string.uuid(),
    title,
    slug: generateSlug(title),
    excerpt: faker.lorem.paragraph({ min: 5, max: 10 }),
    content: faker.lorem.paragraphs({ min: 5, max: 10 }),
    isPublished: faker.datatype.boolean({ probability: 0.7 }),
    createdAt,
    author: faker.person.fullName(),
  };
}

export function createRandomPosts(count: number): InsertPost[] {
  return Array.from({ length: count }, () => createRandomPost());
}
