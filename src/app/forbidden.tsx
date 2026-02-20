import type { Metadata } from 'next';

import { ErrorBase } from '@/components/ui/error-base';

export const metadata: Metadata = {
  title: 'Forbidden',
};

export default function Forbidden() {
  return (
    <ErrorBase
      statusCode={403}
      description='The system does not allow authentication.'
    />
  );
}
