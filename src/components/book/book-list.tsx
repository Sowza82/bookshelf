'use client'

import { useState, useEffect } from 'react'
import BookCard from './book-card'
import BookSearch from './book-search'
import { useBook } from '@/hooks/useBooks'
import { Book } from '@/types/book'

interface BookListProps {
  className?: string
}

export default function BookList({ className }: BookListProps) {
  const { books, searchBooks } = useBook()
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books)

  useEffect(() => {
    setFilteredBooks(books)
  }, [books])

  const handleSearch = (query: string) => setFilteredBooks(searchBooks(query))

  if (books.length === 0)
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 mt-6 text-lg">
        Nenhum livro cadastrado.
      </p>
    )

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Barra de pesquisa */}
      <BookSearch onSearch={handleSearch} />

      {/* Grid de livros */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 ${className}`}
      >
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  )
}
