'use client'

import { BookType } from '@/app/actions/book'
import BookCard from '@/components/book/book-card'
import DatabaseWave from '@/components/dashboard/database-wave'
import StatsCards from '@/components/dashboard/stats-cards'
import GenreFilter from '@/components/library/genre-filter'
import { AVAILABLE_GENRES } from '@/lib/validation'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

interface DashboardClientProps {
  initialBooks: BookType[]
  onDelete: (id: string) => Promise<{ success: boolean }>
}

export default function DashboardClient({
  initialBooks,
  onDelete,
}: DashboardClientProps) {
  const [books, setBooks] = useState(initialBooks)
  const [filterStatus, setFilterStatus] = useState<
    'ALL' | 'READING' | 'FINISHED' | 'UNREAD'
  >('ALL')
  const [filterGenre, setFilterGenre] = useState<string>('Todos os gêneros')
  const [sortBy, setSortBy] = useState<'title' | 'author' | 'updatedAt'>(
    'updatedAt'
  )
  const [isPending, startTransition] = useTransition()

  const GENRES_WITH_ALL = ['Todos os gêneros', ...AVAILABLE_GENRES]

  // Handler de deleção
  const handleDeleteBook = async (id: string) => {
    if (!confirm('Deseja realmente deletar este livro?')) return
    startTransition(async () => {
      try {
        const result = await onDelete(id)
        if (result.success) {
          setBooks(prev => prev.filter(b => b.id !== id))
          toast.success('Livro deletado!')
        }
      } catch (err: any) {
        toast.error('Erro ao deletar livro', { description: err.message })
      }
    })
  }

  // Filtra e ordena
  const filteredBooks = books
    .filter(b =>
      filterStatus === 'ALL' ? true : b.readingStatus === filterStatus
    )
    .filter(b =>
      filterGenre === 'Todos os gêneros' ? true : b.genre === filterGenre
    )
    .sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title)
      if (sortBy === 'author') return a.author.localeCompare(b.author)
      if (sortBy === 'updatedAt')
        return b.updatedAt.getTime() - a.updatedAt.getTime()
      return 0
    })

  // Métricas
  const totalBooks = books.length
  const readBooks = books.filter(b => b.readingStatus === 'FINISHED').length
  const readingBooks = books.filter(b => b.readingStatus === 'READING').length
  const unreadBooks = books.filter(b => b.readingStatus === 'UNREAD').length
  const avgRating = books.length
    ? Math.round(books.reduce((a, b) => a + (b.rating || 0), 0) / books.length)
    : 0
  const progressData = books.length
    ? Math.round(
        (books.reduce((a, b) => a + b.currentPage, 0) /
          books.reduce((a, b) => a + b.totalPages, 0)) *
          100
      )
    : 0

  // Últimos livros atualizados
  const latestBooks = [...books]
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, 5)

  return (
    <>
      {/* Header e Filtros */}
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold">Dashboard Bookshelf</h1>
        <div className="flex gap-4 flex-wrap items-center">
          <span>Status:</span>
          <select
            className="border rounded px-2 py-1"
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value as any)}
          >
            <option value="ALL">Todos</option>
            <option value="READING">Lendo</option>
            <option value="FINISHED">Lido</option>
            <option value="UNREAD">Não lido</option>
          </select>

          <span>Gênero:</span>
          <GenreFilter
            initialGenre={filterGenre}
            onChange={setFilterGenre}
            genres={GENRES_WITH_ALL}
          />

          <span>Ordenar por:</span>
          <select
            className="border rounded px-2 py-1"
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
          >
            <option value="updatedAt">Última atualização</option>
            <option value="title">Título</option>
            <option value="author">Autor</option>
          </select>
        </div>
      </div>

      {/* Métricas */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCards
          totalBooks={totalBooks}
          readBooks={readBooks}
          readingBooks={readingBooks}
          unreadBooks={unreadBooks}
          avgRating={avgRating}
        />
      </section>

      {/* Progresso global */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Progresso da Leitura</h2>
        <DatabaseWave progress={progressData} />
      </section>

      {/* Últimos livros atualizados */}
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold mb-2">
          Últimos Livros Atualizados
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {latestBooks.map(book => (
            <BookCard key={book.id} book={book} onDelete={handleDeleteBook} />
          ))}
        </div>
      </section>
    </>
  )
}
