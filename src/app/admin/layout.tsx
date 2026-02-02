import type { Metadata } from 'next';

import { ADMIN_TITLE_METADATA } from '@/utils/metadata';

export const metadata: Metadata = {
  title: ADMIN_TITLE_METADATA,
};

type AdminLayoutProps = {
  readonly children: React.ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return children;
}
