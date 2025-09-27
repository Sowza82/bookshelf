// src/app/layout.tsx
import Footer from "@/components/layout/footer";
import { ReactNode } from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <ThemeProvider>
          <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}




