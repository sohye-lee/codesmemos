'use client';

import { NextUIProvider } from '@nextui-org/react';
import { SWRConfig } from 'swr';
import { SessionProvider } from 'next-auth/react';

interface Providers {
  children: React.ReactNode;
}
export default function Providers({ children }: Providers) {
  return (
    <SessionProvider>
      <SWRConfig
        value={{
          refreshInterval: 3000,
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <NextUIProvider>{children}</NextUIProvider>
      </SWRConfig>
    </SessionProvider>
  );
}
