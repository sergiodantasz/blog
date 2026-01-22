import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { date } from '@/db/types';

export const posts = sqliteTable('users', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  excerpt: text('excerpt').notNull(),
  content: text('content').notNull(),
  isPublished: integer('is_published', { mode: 'boolean' }).notNull(),
  createdAt: date('created_at').notNull(),
  updatedAt: date('updated_at').notNull(),
  author: text('author').notNull(),
});

export type SelectPost = typeof posts.$inferSelect;
export type InsertPost = typeof posts.$inferInsert;
