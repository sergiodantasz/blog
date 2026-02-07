'use client';

import { useEffect } from 'react';

import { ErrorBase } from '@/components/ui/error-base';

import { formatTitle } from '@/utils/metadata';

export default function Error() {
  useEffect(() => {
    document.title = formatTitle('Internal server error');
  }, []);
  return (
    <ErrorBase
      statusCode={500}
      description='A server-side error occurred.'
    />
  );
}
