'use client';

type ErrorBaseProps = {
  statusCode: 404 | 500;
  description: string;
};

export default function ErrorBase({ statusCode, description }: ErrorBaseProps) {
  return (
    <div className='m-auto h-fit border border-dashed border-stone-300 text-center dark:border-stone-700'>
      <div className='border-b border-dashed border-b-stone-300 p-4 text-4xl font-bold dark:border-b-stone-700'>
        {statusCode}
      </div>
      <p className='p-4'>{description}</p>
    </div>
  );
}
