// src/app/page.tsx
'use client'

import StatsCards from '@/components/dashboard/stats-cards'
// O Testimonial não é mais necessário, mas o mantemos na importação por segurança,
// caso você o utilize em outro lugar, mas a linha não será gerada abaixo.
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useBooks } from '@/hooks/useBooks'
import { BookOpen } from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  const { books } = useBooks()

  return (
    <div className="p-6 md:p-10 space-y-8">
      {/* 1. Título e Botões de Ação (Responsivo Corrigido) */}
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center space-y-4 md:space-y-0">
        <h1 className="text-3xl font-bold text-[var(--color-text)]">
          Dashboard Bookshelf
        </h1>
        <div className="flex space-x-3">
          <Link href="/biblioteca">
            <Button variant="outline">Ver Biblioteca</Button>
          </Link>
          <Link href="/livro/novo">
            <Button>+ Adicionar Livro</Button>
          </Link>
        </div>
      </div>

      {/* 2. Estatísticas */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--color-text)]">
          Estatísticas
        </h2>
        <StatsCards books={books} />
      </section>

      {/* 3. Status de Atualização (Abaixo das Estatísticas e Full-Width) */}
      <Card className="p-3 shadow-sm">
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>Atualizado em:</span>
          <span className="font-medium">
            {new Date().toLocaleDateString('pt-BR')}
          </span>
        </div>
      </Card>

      {/* 4. A seção Depoimentos foi REMOVIDA. */}

      {/* 5. Caixa de Boas-Vindas (FINAL DA PÁGINA, antes do Footer) */}
      <Card className="border-l-4 border-primary bg-primary/5 p-6 shadow-sm">
        <CardHeader className="p-0 pb-2">
          <div className="flex items-center space-x-3">
            <BookOpen className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl font-bold text-primary">
              Bem-vindo(a) ao BookShelf
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0 text-gray-700">
          Use o menu acima para navegar. Você pode começar adicionando um livro
          ou explorando sua biblioteca atual.
        </CardContent>
      </Card>
    </div>
  )
}
