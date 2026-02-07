type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'ghost' | 'outline';

type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
} & React.ComponentProps<'button'>;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-stone-900 text-stone-50 hover:bg-stone-800 dark:bg-stone-50 dark:text-stone-900 dark:hover:bg-stone-200',
  secondary:
    'bg-stone-200 text-stone-950 hover:bg-stone-300 dark:bg-stone-800 dark:text-stone-50 dark:hover:bg-stone-700',
  destructive: 'bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700',
  ghost: 'text-stone-900 hover:bg-stone-100 dark:text-stone-50 dark:hover:bg-stone-800',
  outline:
    'border border-stone-300 text-stone-900 hover:bg-stone-100 dark:border-stone-700 dark:text-stone-50 dark:hover:bg-stone-800',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  disabled,
  ref,
  ...props
}: ButtonProps) {
  return (
    <button
      ref={ref}
      className={`cursor-pointer rounded-lg font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
