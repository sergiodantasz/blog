import { defineConfig } from 'drizzle-kit';

import { DATABASE_URL } from '@/config/env';

export default defineConfig({
  out: './src/db/migrations',
  schema: './src/db/schema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: DATABASE_URL,
  },
});
