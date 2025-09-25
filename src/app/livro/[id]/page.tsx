// src/app/page.tsx
'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useBooks } from '@/hooks/useBooks'
import { BookOpen } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { books } = useBooks()

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold flex items-center">
            <BookOpen className="w-6 h-6 mr-2 text-primary" />
            Dashboard
          </h1>
          <Link href="/biblioteca" passHref>
            <Button>Ver Biblioteca</Button>
          </Link>
        </header>

        {/* Cards resumidos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Total de Livros</CardTitle>
            </CardHeader>
            <CardContent>{books.length}</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Livros Lidos</CardTitle>
            </CardHeader>
            <CardContent>{books.filter(b => b.read).length}</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Livros Não Lidos</CardTitle>
            </CardHeader>
            <CardContent>{books.filter(b => !b.read).length}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
