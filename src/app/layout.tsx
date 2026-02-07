import type { Metadata } from 'next';

import { ThemeProvider } from 'next-themes';

import { Footer } from '@/components/ui/footer';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Toaster } from '@/components/ui/toaster';

import { TITLE_METADATA } from '@/utils/metadata';

import './globals.css';

export const metadata: Metadata = {
  title: TITLE_METADATA,
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
      <body className='bg-stone-50 text-stone-950 dark:bg-stone-950 dark:text-stone-50'>
        <ThemeProvider disableTransitionOnChange>
          <div className='flex min-h-dvh flex-col justify-between gap-8 sm:gap-16'>
            <ThemeToggle />
            <div className='mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 pt-16 sm:px-8 sm:pt-32'>
              {children}
            </div>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
