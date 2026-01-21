import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';

import { posts } from '@/db/schema';

const sqlite = new Database('db.sqlite');

export const db = drizzle(sqlite, {
  schema: { posts },
  logger: true,
});
