export function Footer() {
  return (
    <footer className='mx-auto w-fit text-sm text-stone-600 dark:text-stone-400'>
      <p>
        Developed by Sérgio · <span className='font-medium'>For study purposes only</span> ·{' '}
        <a
          className='underline underline-offset-4 transition-all hover:text-stone-300'
          href='http://github.com/sergiodantasz/blog'
          target='_blank'
          rel='noopener noreferrer'
        >
          Available on GitHub
        </a>
      </p>
    </footer>
  );
}
