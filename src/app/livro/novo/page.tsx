'use client'

import { BookType, createBook } from '@/app/actions/book'
import BookForm from '@/components/book/book-form'
import { useRouter } from 'next/navigation'
import { toast, Toaster } from 'sonner'

export default function NewBookPage() {
  const router = useRouter()

  const handleSave = async (book: BookType) => {
    try {
      const createdBook = await createBook(book)
      toast.success(`Livro "${createdBook.title}" adicionado!`)
      router.push(`/livro/${createdBook.id}`)
    } catch (error) {
      console.error(error)
      toast.error('Erro ao adicionar livro.')
    }
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <>
      <BookForm onSave={handleSave} onCancel={handleCancel} />
      <Toaster richColors position="bottom-right" />
    </>
  )
}
