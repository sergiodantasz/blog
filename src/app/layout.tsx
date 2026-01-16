import type { Metadata } from 'next';

import { Container } from '@/components/layout/container';

import './globals.css';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'A simple blog application built with Next.js.',
};

type RootLayoutProps = {
  readonly children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en'>
      <body className='min-h-dvh bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-50'>
        <Container>{children}</Container>
      </body>
    </html>
  );
}
