// src/components/book/book-list.tsx
'use client'

import { Button } from '@/components/ui/button'
import { useBook } from '@/hooks/useBooks'
import Link from 'next/link'
import BookCard from './book-card'

export default function BookList() {
  const { books } = useBook()

  if (books.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text)]">
          Sua biblioteca está vazia!
        </h2>
        <p className="mb-6 text-muted-foreground">
          Comece adicionando o seu primeiro livro.
        </p>
        <Link href="/livro/novo" passHref>
          <Button className="bg-primary hover:bg-primary/90 transition">
            Adicionar Novo Livro
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {/* Mapeia a lista de livros para renderizar os cards */}
      {books.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  )
}
