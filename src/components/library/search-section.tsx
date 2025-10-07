'use client'

import { useCallback, useEffect, useState } from 'react'
// Assumindo que você tem estes componentes de UI
import BookCard from '../book/BookCard'
import LoadingSpinner from '../loading/LoadingSpinner'
import { Card } from '../ui/card'
import GenreFilter from './GenreFilter'
import SearchInput from './SearchInput'

// Importando a Server Action e o tipo BookType
import { BookType, getBooks } from '@/app/actions/book'

// O tipo BookType é usado para definir o estado (BookType é o tipo Prisma.Book)
type Book = BookType

// 🚀 Fetcher Real que chama a Server Action
// Esta função é o que realmente comunica com o servidor via Server Action
const fetcher = async (query: string, genre: string): Promise<Book[]> => {
  // A chamada à Server Action é transparente para o Cliente Componente
  return getBooks(query, genre)
}

export default function SearchSection() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [genreFilter, setGenreFilter] = useState('Todos os gêneros')

  const fetchBooks = useCallback(async () => {
    setLoading(true)
    try {
      // 🚀 Chama o fetcher REAL (que agora usa getBooks com Prisma)
      const data = await fetcher(searchQuery, genreFilter)
      setBooks(data)
    } catch (error) {
      console.error('Erro ao carregar livros:', error)
      setBooks([])
    } finally {
      setLoading(false)
    }
  }, [searchQuery, genreFilter])

  useEffect(() => {
    // Adiciona um pequeno atraso (debounce) para otimizar o desempenho
    // e evitar chamadas desnecessárias à Server Action (getBooks)
    const handler = setTimeout(() => {
      fetchBooks()
    }, 300) // 300ms de debounce

    return () => clearTimeout(handler)
  }, [fetchBooks])

  if (loading) return <LoadingSpinner message="Carregando biblioteca..." />

  return (
    <div className="space-y-6">
      {/* Barra de Pesquisa e Filtros */}
      <Card className="p-4 shadow-sm bg-[var(--color-card)] transition-colors duration-300">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          {/* Campo de Busca */}
          <div className="flex-grow w-full sm:w-auto">
            <SearchInput initialQuery={searchQuery} onChange={setSearchQuery} />
          </div>

          {/* Filtro de Gênero */}
          <div className="w-full sm:w-64">
            <GenreFilter initialGenre={genreFilter} onChange={setGenreFilter} />
          </div>
        </div>
      </Card>

      {/* Contagem e Limpar Filtros */}
      <p className="text-sm text-muted-foreground">
        {books.length} livro(s) encontrado(s).
        {(searchQuery || genreFilter !== 'Todos os gêneros') && (
          <button
            onClick={() => {
              // Limpa os filtros e o useEffect dispara um novo fetch
              setSearchQuery('')
              setGenreFilter('Todos os gêneros')
            }}
            className="text-primary hover:underline ml-2"
          >
            (Limpar filtros)
          </button>
        )}
      </p>

      {/* Grid de livros */}
      {books.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {books.map(book => (
            <BookCard key={book.id} book={book} />
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
