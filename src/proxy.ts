import { NextRequest, NextResponse } from 'next/server';

import { verifySessionToken } from '@/lib/auth/session';

import { AUTH_COOKIE_NAME } from '@/config/env';

const LOGIN_PATH = '/admin/login';

export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === LOGIN_PATH) {
    return NextResponse.next();
  }
  const loginUrl = new URL(LOGIN_PATH, request.url);
  const sessionToken = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (!sessionToken) {
    return NextResponse.redirect(loginUrl);
  }
  try {
    await verifySessionToken(sessionToken);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: '/admin/:path*',
};
