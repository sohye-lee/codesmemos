'use client';

import { NextUIProvider } from '@nextui-org/react';
import { SWRConfig } from 'swr';

interface Providers {
  children: React.ReactNode;
}
export default function Providers({ children }: Providers) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <NextUIProvider>{children}</NextUIProvider>
    </SWRConfig>
  );
}
