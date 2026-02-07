'use client';

import { useEffect } from 'react';

import { LucideIcon } from 'lucide-react';

type DialogVariant = 'warning' | 'info' | 'destructive';

type DialogProps = {
  header: {
    title: string;
    icon: LucideIcon;
  };
  content: React.ReactNode;
  actions: React.ReactNode;
  variant?: DialogVariant;
};

const variantStyles: Record<DialogVariant, string> = {
  warning: 'text-amber-600 dark:text-amber-400',
  destructive: 'text-red-600 dark:text-red-400',
  info: 'text-blue-600 dark:text-blue-400',
};

export function Dialog({ header, content, actions, variant = 'warning' }: DialogProps) {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, []);
  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs'
      role='dialog'
      aria-modal='true'
      aria-labelledby='dialog-title'
    >
      <div className='mx-auto max-w-lg'>
        <div className='flex flex-col gap-4 rounded-xl border border-stone-200 bg-stone-100 p-4 shadow-sm dark:border-stone-800 dark:bg-stone-900'>
          <div className={`flex items-center gap-2 ${variantStyles[variant]}`}>
            <header.icon
              size={24}
              className='shrink-0'
              aria-hidden='true'
            />
            <h1
              id='dialog-title'
              className='text-lg font-bold'
            >
              {header.title}
            </h1>
          </div>
          <div className='text-stone-600 dark:text-stone-400'>{content}</div>
          <div
            className='flex flex-wrap gap-2'
            role='group'
            aria-label='Dialog actions'
          >
            {actions}
          </div>
        </div>
      </div>
    </div>
  );
}
