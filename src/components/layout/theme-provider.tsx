"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"   // <-- ESSENCIAL! vai adicionar "dark" no <html>
      defaultTheme="system"
      enableSystem={true}
      storageKey="bookshelf-theme"
    >
      {children}
    </NextThemesProvider>
  );
}




