import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { jwtVerify, SignJWT, type JWTPayload } from 'jose';

import {
  ADMIN_USERNAME,
  AUTH_COOKIE_NAME,
  AUTH_JWT_SECRET,
  AUTH_SESSION_EXPIRATION_SECONDS,
  AUTH_SESSION_EXPIRATION_STRING,
} from '@/config/env';

type SessionTokenPayload = {
  username: string;
  expiresAt: Date;
};

const ENCODED_SECRET_KEY = new TextEncoder().encode(AUTH_JWT_SECRET);

export async function createSessionToken(payload: SessionTokenPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime(AUTH_SESSION_EXPIRATION_STRING)
    .sign(ENCODED_SECRET_KEY);
}

export async function verifySessionToken(sessionToken: string): Promise<JWTPayload> {
  const { payload } = await jwtVerify(sessionToken, ENCODED_SECRET_KEY, {
    algorithms: ['HS256'],
  });
  return payload;
}

export async function getAuthSession(): Promise<JWTPayload | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!sessionToken) return null;
  try {
    return await verifySessionToken(sessionToken);
  } catch {
    return null;
  }
}

export async function verifyAuthSession(): Promise<boolean> {
  const payload = await getAuthSession();
  if (!payload) return false;
  return payload.username === ADMIN_USERNAME;
}

export async function requireAuthSession(): Promise<void> {
  const isAuthenticated = await verifyAuthSession();
  if (!isAuthenticated) redirect('/admin/login');
}

export async function createAuthSession(username: string): Promise<void> {
  const expiresAt = new Date(Date.now() + AUTH_SESSION_EXPIRATION_SECONDS * 1000);
  const sessionToken = await createSessionToken({ username, expiresAt });
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    expires: expiresAt,
  });
}

export async function deleteAuthSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
}
