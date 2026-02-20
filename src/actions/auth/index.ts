'use server';

import { redirect } from 'next/navigation';

import { verifyPassword } from '@/lib/auth/password';
import { createAuthSession, deleteAuthSession } from '@/lib/auth/session';

import type { LoginActionState } from '@/actions/auth/types';

import { ADMIN_PASSWORD, ADMIN_USERNAME, AUTH_ENABLED } from '@/config/env';

export async function login(
  prevState: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  if (!AUTH_ENABLED) {
    return {
      username: '',
      errors: ['Authentication is not allowed.'],
      success: false,
    };
  }
  if (!(formData instanceof FormData)) {
    return {
      username: '',
      errors: ['Invalid data.'],
      success: false,
    };
  }
  const username = formData.get('username')?.toString().trim() || '';
  const password = formData.get('password')?.toString() || '';
  if (!username || !password) {
    return {
      username,
      errors: ['Enter the username and password.'],
      success: false,
    };
  }
  const isUsernameValid = username === ADMIN_USERNAME;
  const isPasswordValid = await verifyPassword(password, ADMIN_PASSWORD);
  if (!isUsernameValid || !isPasswordValid) {
    return {
      username,
      errors: ['The username or password is incorrect.'],
      success: false,
    };
  }
  await createAuthSession(username);
  redirect('/admin/posts');
}

export async function logout() {
  await deleteAuthSession();
  redirect('/');
}
