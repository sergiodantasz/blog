import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';

import { posts } from '@/db/schema';

import { DATABASE_URL } from '@/config/env';

const sqlite = new Database(DATABASE_URL);

export const db = drizzle(sqlite, {
  schema: { posts },
});
