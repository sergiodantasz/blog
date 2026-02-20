import type { Metadata } from 'next';

import { ErrorBase } from '@/components/ui/error-base';

export const metadata: Metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  return (
    <ErrorBase
      statusCode={404}
      description='This page could not be found.'
    />
  );
}
