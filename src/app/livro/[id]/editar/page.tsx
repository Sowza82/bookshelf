'use client'

import BookForm from '@/components/book/book-form'
import { useBook } from '@/hooks/useBooks'

interface EditBookPageProps {
  params: { id: string }
}

export default function EditBookPage({ params }: EditBookPageProps) {
  const { books } = useBook()
  const bookToEdit = books.find(b => b.id === params.id)

  if (!bookToEdit)
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 mt-10 text-lg">
        Livro não encontrado
      </p>
    )

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] flex flex-col">
      <header className="sticky top-0 bg-[var(--color-bg)] z-10 shadow-md py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-[var(--color-primary)]">
            Editar Livro
          </h1>
        </div>
      </header>

      <main className="flex-grow flex items-start justify-center px-4 sm:px-6 lg:px-8 py-10">
        <div className="w-full max-w-3xl bg-white dark:bg-[var(--color-bg)] p-6 sm:p-8 rounded-xl shadow-md transition-shadow hover:shadow-xl">
          <BookForm bookToEdit={bookToEdit} />
        </div>
      </main>
    </div>
  )
}
