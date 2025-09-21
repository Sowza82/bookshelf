'use client'

import { Book } from '@/types/book'
import BookRating from './book-rating'

interface BookCardProps {
  book: Book
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <div className="bg-[var(--color-card-bg)] rounded-xl shadow-md overflow-hidden flex flex-col transition-shadow hover:shadow-xl min-h-[400px]">

      {/* Capa */}
      <div className="w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 p-4">
        {book.cover ? (
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-auto max-h-60 object-contain rounded"
          />
        ) : (
          <span className="text-gray-400 dark:text-gray-500 font-medium">Sem capa</span>
        )}
      </div>

      {/* Conteúdo */}
      <div className="p-4 flex flex-col flex-grow gap-2">
        <h2 className="text-lg sm:text-xl font-semibold text-[var(--color-text)] line-clamp-2">
          {book.title}
        </h2>
        <p className="text-sm sm:text-base text-gray-500 dark:text-[var(--color-muted)] line-clamp-1">
          {book.author}
        </p>
        <p className="text-xs sm:text-sm text-gray-400 dark:text-[var(--color-muted)]">
          Ano: {book.year}
        </p>

        {/* Avaliação */}
        <BookRating rating={book.rating || 0} />

        {/* Status */}
        <p className="mt-1 text-sm text-gray-700 dark:text-[var(--color-text)]">
          Status: <span className="font-semibold capitalize">{book.status}</span>
        </p>
      </div>
    </div>
  )
}
