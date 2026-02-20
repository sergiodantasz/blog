import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const SQLITE_PATH_REGEX = /^(?:[A-Za-z]:[\\/]|[\\/]|\.{1,2}[\\/])?[\w\s().\-\\/]+\.sqlite$/;
const BASE64_REGEX = /^[A-Za-z0-9+/]*={0,2}$/;
const DURATION_STRING_REGEX = /^\d+[smhd]$/;

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().regex(SQLITE_PATH_REGEX, 'Must be a valid .sqlite path'),
    AUTH_JWT_SECRET: z.string().min(16, 'Must be at least 16 characters'),
    AUTH_SESSION_EXPIRATION_SECONDS: z.coerce.number().int().positive(),
    AUTH_SESSION_EXPIRATION_STRING: z
      .string()
      .regex(DURATION_STRING_REGEX, 'Must be a duration string (e.g. "1d", "12h", "30m")'),
    AUTH_COOKIE_NAME: z.string().min(1),
    ADMIN_USERNAME: z.string().min(1),
    ADMIN_PASSWORD: z.string().regex(BASE64_REGEX, 'Must be a valid base64-encoded string'),
    AUTH_ENABLED: z.enum(['true', 'false']).transform((val) => val === 'true'),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    AUTH_JWT_SECRET: process.env.AUTH_JWT_SECRET,
    AUTH_SESSION_EXPIRATION_SECONDS: process.env.AUTH_SESSION_EXPIRATION_SECONDS,
    AUTH_SESSION_EXPIRATION_STRING: process.env.AUTH_SESSION_EXPIRATION_STRING,
    AUTH_COOKIE_NAME: process.env.AUTH_COOKIE_NAME,
    ADMIN_USERNAME: process.env.ADMIN_USERNAME,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    AUTH_ENABLED: process.env.AUTH_ENABLED,
  },
  emptyStringAsUndefined: true,
});

export const DATABASE_URL: string = env.DATABASE_URL;
export const AUTH_JWT_SECRET: string = env.AUTH_JWT_SECRET;
export const AUTH_SESSION_EXPIRATION_SECONDS: number = env.AUTH_SESSION_EXPIRATION_SECONDS;
export const AUTH_SESSION_EXPIRATION_STRING: string = env.AUTH_SESSION_EXPIRATION_STRING;
export const AUTH_COOKIE_NAME: string = env.AUTH_COOKIE_NAME;
export const ADMIN_USERNAME: string = env.ADMIN_USERNAME;
export const ADMIN_PASSWORD: string = env.ADMIN_PASSWORD;
export const AUTH_ENABLED: boolean = env.AUTH_ENABLED;
