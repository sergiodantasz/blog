import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const SQLITE_PATH_REGEX = /^(?:[A-Za-z]:[\\/]|[\\/]|\.{1,2}[\\/])?[\w\s().\-\\/]+\.sqlite$/;

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().regex(SQLITE_PATH_REGEX, 'Must be a valid .sqlite path'),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
  emptyStringAsUndefined: true,
});

export const DATABASE_URL: string = env.DATABASE_URL;
