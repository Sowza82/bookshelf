'use client'

import { useEffect, useState, useTransition } from 'react'
import { BookType, getAllBooks, updateBookProgress, deleteBook } from '@/app/actions/book'
import StatsCards from '@/components/dashboard/stats-cards'
import DatabaseWave from '@/components/dashboard/database-wave'
import BookProgressCard from '@/components/dashboard/book-progress-card'
import LoadingSpinner from '@/components/loading/loading-spinner'
import { toast } from 'sonner'

export default function DashboardPage() {
  const [books, setBooks] = useState<BookType[] | null>(null)
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'READING' | 'FINISHED' | 'UNREAD'>('ALL')
  const [isPending, startTransition] = useTransition()

  // Busca inicial dos livros
  const fetchBooks = async () => {
    try {
      const data = await getAllBooks()
      setBooks(data)
    } catch (err) {
      console.error(err)
      toast.error('Erro ao carregar livros.')
    }
  }

  useEffect(() => {
    startTransition(() => fetchBooks())
  }, [])

  if (!books) return <LoadingSpinner message="Carregando Dashboard..." />

  // Filtra livros por status
  const filteredBooks = filterStatus === 'ALL' ? books : books.filter(b => b.readingStatus === filterStatus)

  // Métricas
  const totalBooks = books.length
  const readBooks = books.filter(b => b.readingStatus === 'FINISHED').length
  const readingBooks = books.filter(b => b.readingStatus === 'READING').length
  const unreadBooks = books.filter(b => b.readingStatus === 'UNREAD').length
  const avgRating = books.length ? Math.round(books.reduce((a, b) => a + (b.rating || 0), 0) / books.length) : 0
  const progressData = books.length
    ? Math.round(books.reduce((a, b) => a + b.currentPage, 0) / books.reduce((a, b) => a + b.totalPages, 0) * 100)
    : 0

  // Atualiza progresso em tempo real
  const handleUpdateProgress = async (id: string, currentPage: number, rating?: number) => {
    startTransition(async () => {
      try {
        const updated = await updateBookProgress(id, { currentPage, rating })
        setBooks(prev => prev!.map(b => (b.id === id ? { ...b, ...updated } : b)))
      } catch (err: any) {
        console.error(err)
        toast.error('Erro ao atualizar progresso', { description: err.message })
      }
    })
  }

  // Deletar livro
  const handleDeleteBook = async (id: string) => {
    if (!confirm('Deseja realmente deletar este livro?')) return
    startTransition(async () => {
      try {
        await deleteBook(id)
        setBooks(prev => prev!.filter(b => b.id !== id))
        toast.success('Livro deletado!')
      } catch (err: any) {
        console.error(err)
        toast.error('Erro ao deletar livro', { description: err.message })
      }
    })
  }

  return (
    <div className="p-6 md:p-10 space-y-8 min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] transition-colors duration-300">

      {/* Métricas */}
      <StatsCards
        totalBooks={totalBooks}
        readBooks={readBooks}
        readingBooks={readingBooks}
        unreadBooks={unreadBooks}
        avgRating={avgRating}
      />

      {/* Progresso Global */}
      <DatabaseWave progress={progressData} />

      {/* Filtros rápidos */}
      <div className="flex gap-4 items-center mt-4">
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
      </div>

      {/* Grid de BookProgressCard */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-4">
        {filteredBooks.map(book => {
          const progress = Math.round((book.currentPage / (book.totalPages || 1)) * 100)
          return (
            <BookProgressCard
              key={book.id}
              title={book.title}
              author={book.author}
              progress={progress}
            />
          )
        })}
      </section>
    </div>
  )
}
