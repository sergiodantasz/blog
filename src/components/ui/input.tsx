import { useId } from 'react';

type InputProps = {
  labelText?: string;
} & React.ComponentProps<'input'>;

export function Input({ labelText, className = '', readOnly, ...props }: InputProps) {
  const id = useId();
  const readOnlyStyles =
    readOnly ?
      'cursor-default bg-stone-200 text-stone-500 dark:bg-stone-800 dark:text-stone-400'
    : 'bg-stone-100 focus:border-stone-500 dark:bg-stone-900';
  return (
    <div className='flex flex-col gap-2'>
      {labelText && (
        <label
          htmlFor={id}
          className='text-sm font-medium text-stone-700 dark:text-stone-300'
        >
          {labelText}
        </label>
      )}
      <input
        id={id}
        readOnly={readOnly}
        className={`rounded-md border border-stone-300 p-2 text-sm text-stone-900 transition-colors outline-none placeholder:text-sm placeholder:text-stone-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-stone-700 dark:text-stone-50 dark:placeholder:text-stone-500 ${readOnlyStyles} ${className}`}
        {...props}
      />
    </div>
  );
}
