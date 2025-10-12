import { notFound, redirect } from 'next/navigation'
import { Toaster } from 'sonner'

import { getBookById, updateBookFromForm } from '@/app/actions/book'
import { BookForm } from '@/components/book/book-form'
import { BOOK_UPDATE_SCHEMA } from '@/lib/validation'
import { BookFormValues } from '@/types/book'

interface Props {
  params: Promise<{ id: string }>
}

export default async function BookEditPage({ params }: Props) {
  const { id } = await params
  const book = await getBookById(id)
  if (!book) notFound()

  const handleUpdate = async (data: BookFormValues) => {
    'use server'
    const validatedData = BOOK_UPDATE_SCHEMA.parse(data)
    await updateBookFromForm(id, validatedData)
    redirect(`/livro/${id}`)
  }

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-extrabold border-b pb-4">
        Editar Livro: {book.title}
      </h1>
      <BookForm
        defaultValues={book}
        onSubmit={handleUpdate}
        isEditing={true}
        isDetail={false}
      />
      <Toaster richColors position="bottom-right" />
    </div>
  )
}
