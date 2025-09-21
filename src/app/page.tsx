'use client'

import BookList from '@/components/book/book-list'
import { Coffee } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 bg-[var(--color-banner)]">
        <div className="flex items-center justify-center gap-4 mb-4">
          <Coffee className="w-8 h-8 text-[var(--color-primary)] animate-bounce" />
          <h1 className="text-5xl font-bold text-[var(--color-primary)]">
            Bookshelf
          </h1>
          <Coffee className="w-8 h-8 text-[var(--color-primary)] animate-bounce" />
        </div>
        <p className="text-lg sm:text-xl md:text-2xl text-[var(--color-banner-text)] max-w-2xl">
          Organize seus livros, acompanhe suas leituras e descubra novos favoritos.
        </p>
      </section>

      {/* Book Cards Section */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BookList />
      </main>
    </div>
  )
}
