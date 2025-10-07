'use client'

import BookForm from '@/components/book/book-form'
import { Book } from '@/types/book'
import { useRouter } from 'next/navigation'
import { toast, Toaster } from 'sonner'

export default function NewBookPage() {
  const router = useRouter()

  const handleSave = (book: Book) => {
    toast.success(`Livro "${book.title}" adicionado!`)
    router.push(`/books/${book.id}`)
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <BookForm onSave={handleSave} onCancel={handleCancel}>
      <Toaster richColors position="bottom-right" />
    </BookForm>
  )
}
