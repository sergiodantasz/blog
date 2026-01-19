import type { Metadata } from 'next';

import { ThemeProvider } from 'next-themes';

import { Container } from '@/components/layout/container';
import { Footer } from '@/components/ui/footer';
import { ThemeToggle } from '@/components/ui/theme-toggle';

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
    <html
      lang='en'
      suppressHydrationWarning
    >
      <body className='flex min-h-dvh flex-col bg-stone-50 text-stone-950 dark:bg-stone-950 dark:text-stone-50'>
        <ThemeProvider>
          <ThemeToggle />
          <div className='flex-1'>
            <Container>{children}</Container>
          </div>
          <Container>
            <Footer />
          </Container>
        </ThemeProvider>
      </body>
    </html>
  );
}
