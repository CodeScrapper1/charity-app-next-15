"use client";
import * as React from "react";

import { NextUIProvider } from "@nextui-org/system";
import { ThemeProviderProps } from "next-themes/dist/types";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export interface ProviderProps {
  children: React.ReactNode;
  themeProps?: any;
}
export function NextUiProvider({ children, themeProps }: ProviderProps) {
  const router = useRouter();
  return (
    <SessionProvider>
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
      </NextUIProvider>
    </SessionProvider>
  );
}
