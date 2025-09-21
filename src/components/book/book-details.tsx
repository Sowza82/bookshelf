import { Book } from '@/types/book'
import BookRating from './book-rating'

interface BookDetailsProps {
  book: Book
}

export default function BookDetails({ book }: BookDetailsProps) {
  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-[var(--color-bg)] p-6 rounded-xl shadow-lg mt-6 px-4 sm:px-6 lg:px-8 transition-shadow hover:shadow-xl">
      {/* Capa */}
      {book.cover ? (
        <img
          src={book.cover}
          alt={book.title}
          onError={(e) => (e.currentTarget.src = '/placeholder-book.png')}
          className="w-full h-72 sm:h-80 md:h-96 object-cover rounded-lg shadow-md mb-6"
        />
      ) : (
        <div className="w-full h-72 sm:h-80 md:h-96 bg-gray-100 dark:bg-gray-800 rounded-lg mb-6 flex items-center justify-center text-gray-400 font-medium">
          Sem capa
        </div>
      )}

      {/* Título e autor */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-[var(--color-text)] mb-2 line-clamp-2">
        {book.title}
      </h1>
      <p className="text-gray-500 dark:text-[var(--color-muted)] text-base sm:text-lg mb-1">
        {book.author}
      </p>
      <p className="text-gray-400 dark:text-[var(--color-muted)] text-sm sm:text-base mb-4">
        Ano: {book.year}
      </p>

      {/* Avaliação */}
      <div className="mb-4">
        <BookRating rating={book.rating || 0} />
      </div>

      {/* Status */}
      <p className="mt-2 text-gray-700 dark:text-[var(--color-text)] text-base sm:text-lg">
        Status: <span className="font-semibold capitalize">{book.status}</span>
      </p>
    </div>
  )
}
