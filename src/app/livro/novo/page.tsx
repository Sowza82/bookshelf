// src/app/livro/novo/page.tsx
'use client'

import BookForm from '@/components/book/book-form'

export default function NewBookPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="sticky top-0 bg-background z-10 shadow-sm py-6 border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-primary">
            Adicionar Novo Livro
          </h1>
        </div>
      </header>

      <main className="flex-grow flex items-start justify-center px-4 sm:px-6 lg:px-8 py-10">
        <div className="w-full max-w-3xl bg-card p-6 sm:p-8 rounded-xl shadow-lg">
          {/* O formulário é carregado sem o prop 'bookToEdit', então ele entra em modo de Cadastro */}
          <BookForm />
        </div>
      </main>
    </div>
  )
}
