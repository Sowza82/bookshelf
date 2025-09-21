'use client'

import { useBook } from '@/hooks/useBooks'
import { Book } from '@/types/book'
import { useForm } from 'react-hook-form'

interface BookFormProps {
  bookToEdit?: Book
}

export default function BookForm({ bookToEdit }: BookFormProps) {
  const { addBook, editBook } = useBook()

  const { register, handleSubmit, reset } = useForm<Book>({
    defaultValues: bookToEdit || {},
  })

  const onSubmit = (data: Book) => {
    if (bookToEdit && bookToEdit.id) {
      editBook(bookToEdit.id, data)
    } else {
      addBook(data)
    }
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        {...register('title', { required: true })}
        placeholder="Título"
        className="w-full p-2 border rounded"
      />
      <input
        {...register('author', { required: true })}
        placeholder="Autor"
        className="w-full p-2 border rounded"
      />
      <input
        {...register('year', { required: true, valueAsNumber: true })}
        type="number"
        placeholder="Ano"
        className="w-full p-2 border rounded"
      />
      <input
        {...register('cover')}
        placeholder="URL da capa"
        className="w-full p-2 border rounded"
      />
      <select
        {...register('status', { required: true })}
        className="w-full p-2 border rounded"
      >
        <option value="lendo">Lendo</option>
        <option value="lido">Lido</option>
        <option value="quero-ler">Quero Ler</option>
      </select>
      <button
        type="submit"
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        {bookToEdit ? 'Salvar Alterações' : 'Adicionar Livro'}
      </button>
    </form>
  )
}
