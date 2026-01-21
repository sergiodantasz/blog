import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  return (
    <div className='m-auto h-fit border border-dashed border-stone-300 text-center dark:border-stone-700'>
      <div className='border-b border-dashed border-b-stone-300 p-4 text-4xl font-bold dark:border-b-stone-700'>
        404
      </div>
      <p className='p-4'>This page could not be found.</p>
    </div>
  );
}
