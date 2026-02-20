import type { Metadata } from 'next';
import { forbidden } from 'next/navigation';

import { LoginForm } from '@/components/ui/admin/login-form';

import { AUTH_ENABLED } from '@/config/env';

export const metadata: Metadata = {
  title: 'Login',
};

export default function Page() {
  if (!AUTH_ENABLED) forbidden();
  return <LoginForm />;
}
