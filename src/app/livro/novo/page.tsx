'use client'

import BookForm from '@/components/book/book-form'
import { useRouter } from 'next/navigation'

export default function NovoLivroPage() {
  const router = useRouter()

  const handleSubmitAndRedirect = () => {
    // Após adicionar livro, navegar para a Biblioteca
    router.push('/biblioteca')
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] flex flex-col">
      <header className="sticky top-0 bg-[var(--color-bg)] z-10 shadow-md py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-[var(--color-primary)]">
            Adicionar Livro
          </h1>
        </div>
      </header>

      <main className="flex-grow flex items-start justify-center px-4 sm:px-6 lg:px-8 py-10">
        <BookForm onSuccess={handleSubmitAndRedirect} />
      </main>
    </div>
  )
}
