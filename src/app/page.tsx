// src/app/page.tsx
'use client'

import StatsCards from '@/components/dashboard/stats-cards'
// O Testimonial não é mais necessário, mas mantemos por segurança.
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useBooks } from '@/hooks/useBooks'
import { BookOpen } from 'lucide-react'
import Link from 'next/link'
import ThemeToggle from '@/components/ui/theme-toggle'

export default function Dashboard() {
  const { books } = useBooks()

  return (
    <div className="p-6 md:p-10 space-y-8">
      {/* 1. Título e Botões */}
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
        {/* Título com cor forte (muda no dark) */}
        <h1 className="text-3xl font-bold text-[var(--color-strong)]">
          Dashboard Bookshelf
        </h1>

        <div className="flex items-center gap-3">
          <ThemeToggle />
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
        {/* Subtítulo com cor forte (muda no dark) */}
        <h2 className="text-2xl font-semibold text-[var(--color-strong)]">
          Estatísticas
        </h2>

        <StatsCards books={books} />
      </section>

      {/* 3. Status de Atualização */}
      <Card className="p-3 shadow-sm bg-[var(--color-card)] border border-[var(--color-border)]">
        <div className="flex justify-between items-center text-sm">
          {/* Rótulo permanece muted */}
          <span className="text-[var(--color-muted)]">Atualizado em:</span>

          {/* Data com cor forte (muda no dark) */}
          <span className="font-medium text-[var(--color-strong)]">
            {new Date().toLocaleDateString('pt-BR')}
          </span>
        </div>
      </Card>

      {/* 4. Caixa de Boas-Vindas */}
      <Card className="border-l-4 border-primary !bg-[var(--color-tertiary)] border border-[var(--color-border)] p-6 shadow-sm">
        <CardHeader className="p-0 pb-2">
          <div className="flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl font-bold text-[var(--color-text)]">
              Bem-vindo(a) ao BookShelf
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="p-0 text-[var(--color-text)]">
          Use o menu acima para navegar. Você pode começar adicionando um livro
          ou explorando sua biblioteca atual.
        </CardContent>
      </Card>
    </div>
  )
}

