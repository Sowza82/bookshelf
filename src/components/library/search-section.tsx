'use client'

import { BookType, deleteBook, getBooks } from '@/app/actions/book'
import { AVAILABLE_GENRES } from '@/lib/constants'
import { useCallback, useEffect, useState, useTransition } from 'react'
import BookCard from '../book/book-card'
import LoadingSpinner from '../loading/loading-spinner'
import { Card } from '../ui/card'
import { Separator } from '../ui/separator'
import GenreFilter from './genre-filter'
import SearchInput from './search-input'

// Placeholder para toast
export const toast = {
  success: (msg: string) => alert(`✅ ${msg}`),
  error: (msg: string) => alert(`❌ ${msg}`),
}

type Book = BookType
const GENRES_WITH_ALL = ['Todos os gêneros', ...AVAILABLE_GENRES]

const fetcher = async (query: string, genre: string): Promise<Book[]> => {
  return getBooks(query, genre)
}

export default function SearchSection() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [genreFilter, setGenreFilter] = useState(GENRES_WITH_ALL[0])
  const [isDeleting, startDeleteTransition] = useTransition()

  const fetchBooks = useCallback(async () => {
    setLoading(true)
    try {
      const genreParam = genreFilter === 'Todos os gêneros' ? '' : genreFilter
      const data = await fetcher(searchQuery, genreParam)
      setBooks(data)
    } catch (error) {
      console.error('Erro ao carregar livros:', error)
      toast.error('Não foi possível carregar os livros.')
      setBooks([])
    } finally {
      setLoading(false)
    }
  }, [searchQuery, genreFilter])

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchBooks()
    }, 300)
    return () => clearTimeout(handler)
  }, [fetchBooks])

  const handleDeleteBook = (id: string) => {
    if (
      !confirm(
        'Tem certeza que deseja deletar este livro? Esta ação é irreversível.'
      )
    )
      return

    startDeleteTransition(async () => {
      try {
        await deleteBook(id)
        setBooks(prev => prev.filter(book => book.id !== id))
        toast.success('Livro removido com sucesso!')
      } catch (error: any) {
        console.error('Erro ao deletar livro:', error)
        toast.error('Erro ao deletar livro.', {
          description: error.message || 'Tente novamente.',
        })
      }
    })
  }

  if (loading) return <LoadingSpinner message="Carregando biblioteca..." />

  return (
    <div className="space-y-6">
      <Card className="p-4 shadow-sm bg-background transition-colors duration-300">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex-grow w-full sm:w-auto">
            <SearchInput initialQuery={searchQuery} onChange={setSearchQuery} />
          </div>
          <div className="w-full sm:w-64">
            <GenreFilter
              initialGenre={genreFilter}
              onChange={setGenreFilter}
              genres={GENRES_WITH_ALL}
            />
          </div>
        </div>
      </Card>

      <Separator />

      <p className="text-sm text-muted-foreground">
        {books.length} livro(s) encontrado(s).
        {(searchQuery || genreFilter !== GENRES_WITH_ALL[0]) && (
          <button
            onClick={() => {
              setSearchQuery('')
              setGenreFilter(GENRES_WITH_ALL[0])
            }}
            className="text-primary hover:underline ml-2"
          >
            (Limpar filtros)
          </button>
        )}
      </p>

      {books.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {books.map(book => (
            <BookCard
              key={book.id}
              book={book}
              onDelete={handleDeleteBook}
              isDeleting={isDeleting}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-muted/50 rounded-lg">
          <p className="text-lg font-medium text-muted-foreground">
            Nenhum livro corresponde aos critérios.
          </p>
        </div>
      )}
    </div>
  )
}
