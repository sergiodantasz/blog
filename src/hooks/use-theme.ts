'use client';

import { useTheme as useNextTheme } from 'next-themes';

import type { Theme } from '@/types/theme';

export function useTheme() {
  const { theme, setTheme, resolvedTheme } = useNextTheme();
  return {
    theme: theme as Theme | undefined,
    resolvedTheme: resolvedTheme as Theme,
    setTheme: (theme: Theme) => setTheme(theme),
  };
}
