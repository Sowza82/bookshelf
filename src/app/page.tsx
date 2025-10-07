import { BookType, getAllBooks } from '@/app/actions/book'
import DatabaseWave from '@/components/dashboard/database-wave'
import StatsCards from '@/components/dashboard/stats-cards'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen } from 'lucide-react'

export default async function DashboardPage() {
  // Busca todos os livros direto do banco (Server Component)
  const books: BookType[] = await getAllBooks()

  // Calcula progresso de leitura
  const progressData = books.length
    ? Math.round(
        (books.reduce((acc, b) => acc + b.currentPage, 0) /
          books.reduce((acc, b) => acc + b.totalPages, 0)) *
          100
      )
    : 0

  return (
    <div className="p-6 md:p-10 space-y-8 min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] transition-colors duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center space-y-4 md:space-y-0">
        <h1 className="text-3xl font-bold">Dashboard Bookshelf</h1>
      </div>

      {/* Estatísticas */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Estatísticas</h2>
        <StatsCards books={books} />
      </section>

      {/* Gráfico de progresso */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Progresso da Leitura</h2>
        <DatabaseWave progress={progressData} />
      </section>

      {/* Status de atualização */}
      <Card className="p-3 shadow-sm bg-[var(--color-card)] text-[var(--color-card-foreground)] transition-colors duration-300">
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>Dados do Servidor (Última Busca):</span>
          <span className="font-medium">
            {new Date().toLocaleTimeString('pt-BR')} (Prisma)
          </span>
        </div>
      </Card>

      {/* Caixa de boas-vindas */}
      <Card className="border-l-4 border-primary bg-primary/5 p-6 shadow-sm transition-colors duration-300">
        <CardHeader className="p-0 pb-2">
          <div className="flex items-center space-x-3">
            <BookOpen className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl font-bold text-primary">
              Bem-vindo(a) ao BookShelf
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0 text-[var(--color-foreground)]">
          Use o menu acima para navegar. Você pode começar adicionando um livro
          ou explorando sua biblioteca atual.
        </CardContent>
      </Card>
    </div>
  )
}
