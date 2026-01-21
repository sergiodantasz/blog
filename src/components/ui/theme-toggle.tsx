'use client';

import { SunMoonIcon } from 'lucide-react';

import { useTheme } from '@/hooks/use-theme';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const toggleTheme = () => setTheme(isDark ? 'light' : 'dark');
  return (
    <button
      type='button'
      onClick={toggleTheme}
      aria-label='Toggle theme'
      title='Toggle theme'
      className='absolute top-4 right-4 flex size-10 cursor-pointer items-center justify-center rounded-full bg-stone-200 transition-all hover:bg-stone-300 dark:bg-stone-800 dark:hover:bg-stone-700'
    >
      <SunMoonIcon className='size-5' />
    </button>
  );
}
