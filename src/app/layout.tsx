import type { Metadata } from 'next';

import { ThemeProvider } from 'next-themes';

import { Footer } from '@/components/ui/footer';
import { ThemeToggle } from '@/components/ui/theme-toggle';

import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Blog',
    template: '%s | Blog',
  },
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
      <body className='flex min-h-dvh flex-col justify-between gap-8 bg-stone-50 text-stone-950 sm:gap-16 dark:bg-stone-950 dark:text-stone-50'>
        <ThemeProvider disableTransitionOnChange>
          <ThemeToggle />
          <div className='mx-auto flex w-full max-w-3xl flex-1 px-4 pt-16 sm:px-8 sm:pt-32'>
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
