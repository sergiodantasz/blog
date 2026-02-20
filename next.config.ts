import type { NextConfig } from 'next';

import '@/config/env';

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
  },
};

export default nextConfig;
