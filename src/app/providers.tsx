"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { SWRConfig } from "swr";
import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";

interface Providers {
  children: React.ReactNode;
}
export default function Providers({ children }: Providers) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <SessionProvider>
      <SWRConfig
        value={{
          refreshInterval: 3000,
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <NextUIProvider>
          <NextThemeProvider attribute="class" defaultTheme="light">
            {children}
          </NextThemeProvider>
        </NextUIProvider>
      </SWRConfig>
    </SessionProvider>
  );
}
