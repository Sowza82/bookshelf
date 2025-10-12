import { notFound } from 'next/navigation'
import { Toaster } from 'sonner'

import { BookCover } from '@/components/book/book-cover'
import { BookForm } from '@/components/book/book-form'
import BookRating from '@/components/book/book-rating'

import { getBookById } from '@/app/actions/book'
import { BookFormValues } from '@/types/book'

interface Props {
  params: Promise<{ id: string }>
}

export default async function BookDetailsPage({ params }: Props) {
  const { id } = await params
  const book = await getBookById(id)

  if (!book) notFound()

  const handleDetailSubmit = async (data: BookFormValues) => {
    'use server'
    console.log('Modo detalhes: submissão ignorada')
  }

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto space-y-6">
      <BookForm
        defaultValues={book}
        onSubmit={handleDetailSubmit}
        isEditing={false}
        isDetail={true}
      />

      {book.coverUrl && (
        <div className="flex justify-center mt-4">
          <BookCover book={book} />
        </div>
      )}

      <div className="mt-4">
        <BookRating rating={book.rating || 0} />
      </div>

      <Toaster richColors position="bottom-right" />
    </div>
  )
}
