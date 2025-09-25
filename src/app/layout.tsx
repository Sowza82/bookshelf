import Footer from '@/components/layout/footer'
import { ReactNode } from 'react'
import './globals.css'

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <body className="bg-[var(--color-bg)] text-[var(--color-text)] min-h-screen flex flex-col">
        <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
