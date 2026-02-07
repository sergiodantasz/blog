import type { ReactNode } from 'react';

type BadgeColor = 'green' | 'red';

type BadgeProps = {
  color: BadgeColor;
  children: ReactNode;
};

const colorClasses: Record<BadgeColor, string> = {
  green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  red: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

export function Badge({ color, children }: BadgeProps) {
  return (
    <span
      className={`rounded-full px-2 py-1 text-xs font-medium whitespace-nowrap ${colorClasses[color]}`}
    >
      {children}
    </span>
  );
}
