'use client'
import BookList from '@/components/book/book-list'
import Link from 'next/link'

export default function BibliotecaPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      {/* Header principal */}
      <header className="sticky top-0 bg-[var(--color-bg)] z-10 shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-bold text-[var(--color-primary)]">Biblioteca</h1>
          <Link href="/livro/novo" className="bg-[var(--color-accent)] text-white px-4 py-2 rounded shadow hover:bg-[var(--color-secondary)] transition">
            Adicionar Livro
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12">
        <BookList />
      </main>
    </div>
  )
}
