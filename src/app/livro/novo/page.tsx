'use client'

import { BookForm } from '@/components/book/book-form'
import { BookFormValues } from '@/types/book'
import { redirect } from 'next/navigation'
import { Toaster } from 'sonner'

// Server Action importada
import { createBook } from '@/app/actions/book'
import { BOOK_CREATE_SCHEMA } from '@/lib/validation'

export default function NewBookPage() {
  const handleCreate = async (data: BookFormValues) => {
    try {
      // Valida localmente antes de enviar para a Server Action
      const validatedData = BOOK_CREATE_SCHEMA.parse(data)

      // Chama a Server Action
      const newBook = await createBook(validatedData)

      // Redireciona para a página de detalhes
      redirect(`/livro/${newBook.id}`)
    } catch (error: any) {
      console.error('[Novo Livro] Falha na criação:', error)
      // Pode usar toast ou alert para feedback
      alert('Falha ao criar o livro. Verifique os dados.')
    }
  }

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-extrabold tracking-tight border-b pb-4">
        Adicionar Novo Livro
      </h1>
      <BookForm onSubmit={handleCreate} isEditing={false} isDetail={false} />
      <Toaster richColors position="bottom-right" />
    </div>
  )
}
