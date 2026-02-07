import { useId } from 'react';

type CheckboxProps = {
  labelText?: string;
} & Omit<React.ComponentProps<'input'>, 'type'>;

export function Checkbox({ labelText, className = '', ...props }: CheckboxProps) {
  const id = useId();
  return (
    <div className='flex items-center gap-2'>
      <input
        id={id}
        type='checkbox'
        className={`size-4 cursor-pointer accent-stone-500 disabled:cursor-not-allowed disabled:opacity-50 dark:accent-stone-700 ${className}`}
        {...props}
      />
      {labelText && (
        <label
          htmlFor={id}
          className='cursor-pointer text-sm font-medium text-stone-700 select-none dark:text-stone-300'
        >
          {labelText}
        </label>
      )}
    </div>
  );
}
