'use client';

import { Toaster as SonnerToaster } from 'sonner';

import { useTheme } from '@/hooks/use-theme';

export function Toaster() {
  const { resolvedTheme } = useTheme();
  return (
    <SonnerToaster
      theme={resolvedTheme}
      toastOptions={{ classNames: { toast: 'toast' }, duration: 6000 }}
      expand={true}
      visibleToasts={9}
    />
  );
}
