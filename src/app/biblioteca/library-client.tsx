'use client'

import { BookType } from '@/app/actions/book'
import BookSearch from '@/components/book/book-search'
import MyCard from '@/components/ui/custom/my-card'
import { mapBookToMyCardProps, MyCardPropsBook } from '@/lib/book-mapping'
import { AVAILABLE_GENRES } from '@/lib/constants'
import { useMemo, useState, useTransition } from 'react'
import { toast } from 'sonner'

interface LibraryClientProps {
  initialBooks: BookType[]
  onDelete: (id: string) => Promise<{ success: boolean }>
}

export default function LibraryClient({
  initialBooks,
  onDelete,
}: LibraryClientProps) {
  const [books, setBooks] = useState<BookType[]>(initialBooks)
  const [searchQuery, setSearchQuery] = useState('')
  const [genreFilter, setGenreFilter] = useState('Todos os gêneros')
  const [isPending, startTransition] = useTransition()

  const GENRES_WITH_ALL = ['Todos os gêneros', ...AVAILABLE_GENRES]

  // Deleção de livro
  const handleDeleteBook = async (bookId: string) => {
    if (!confirm('Tem certeza que deseja deletar este livro?')) return
    startTransition(async () => {
      try {
        const result = await onDelete(bookId)
        if (result.success) {
          setBooks(prev => prev.filter(b => b.id !== bookId))
          toast.success('Livro deletado!')
        }
      } catch (err: any) {
        toast.error('Erro ao deletar livro', { description: err.message })
      }
    })
  }

  // Filtra e mapeia os livros para os cards
  const filteredBooks = useMemo(() => {
    return books
      .filter(b =>
        searchQuery
          ? b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            b.author.toLowerCase().includes(searchQuery.toLowerCase())
          : true
      )
      .filter(b =>
        genreFilter === 'Todos os gêneros' ? true : b.genre === genreFilter
      )
  }, [books, searchQuery, genreFilter])

  const bookCardProps: MyCardPropsBook[] = useMemo(() => {
    return filteredBooks.map(mapBookToMyCardProps)
  }, [filteredBooks])

  return (
    <>
      {/* Cabeçalho de busca e filtro */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Minha Biblioteca
        </h1>
        <a href="/novo" className="btn-primary">
          Adicionar Livro
        </a>
      </div>

      {/* Componente de busca */}
      <BookSearch
        onSearch={(query, genre) => {
          setSearchQuery(query)
          setGenreFilter(genre)
        }}
        genres={GENRES_WITH_ALL}
        initialQuery={searchQuery}
        initialGenre={genreFilter}
      />

      {/* Lista de livros */}
      {bookCardProps.length === 0 ? (
        <div className="text-center text-muted-foreground py-10">
          Nenhum livro encontrado com os filtros atuais.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
          {bookCardProps.map(book => (
            <MyCard
              key={book.id}
              book={book}
              onDeleteSuccess={handleDeleteBook}
            />
          ))}
        </div>
      )}
    </>
  )
}
