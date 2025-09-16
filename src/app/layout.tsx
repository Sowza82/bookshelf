// src/app/layout.tsx
import { ReactNode } from 'react'
import '../styles/globals.css'

export const metadata = {
  title: 'BookShelf',
  description: 'Biblioteca pessoal da equipe MisturaDev',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        {/* Header global pode ser importado aqui futuramente */}
        {children}
      </body>
    </html>
  )
}
