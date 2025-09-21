'use client'
import { useForm } from 'react-hook-form'
import { useBook } from '@/hooks/useBooks'
import { Book } from '@/types/book'
import { useState, useEffect } from 'react'

interface BookFormProps {
  bookToEdit?: Book
  onFinish?: () => void
}

export default function BookForm({ bookToEdit, onFinish }: BookFormProps) {
  const { addBook, editBook } = useBook()
  const [coverPreview, setCoverPreview] = useState(bookToEdit?.cover || '')

  const { register, handleSubmit, watch, reset } = useForm<Book>({
    defaultValues: bookToEdit || {},
  })

  const coverUrl = watch('cover')

  useEffect(() => {
    setCoverPreview(coverUrl || '')
  }, [coverUrl])

  const onSubmit = (data: Book) => {
    if (bookToEdit) editBook(bookToEdit.id!, data)
    else addBook(data)
    reset()
    setCoverPreview('')
    if (onFinish) onFinish()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-[var(--color-bg)] p-6 sm:p-8 rounded-xl shadow-lg max-w-lg mx-auto space-y-5"
    >
      <h2 className="text-2xl font-bold text-[var(--color-text)] text-center">
        {bookToEdit ? 'Editar Livro' : 'Adicionar Livro'}
      </h2>

      {coverPreview && (
        <div className="w-full h-64 mb-4 rounded overflow-hidden shadow-inner flex items-center justify-center">
          <img src={coverPreview} alt="Preview da capa" className="w-full h-full object-cover" />
        </div>
      )}

      <input {...register('title', { required: true })} placeholder="Título" className="w-full p-3 border rounded" />
      <input {...register('author', { required: true })} placeholder="Autor" className="w-full p-3 border rounded" />
      <input {...register('year', { valueAsNumber: true })} type="number" placeholder="Ano" className="w-full p-3 border rounded" />
      <input {...register('cover')} placeholder="URL da capa" className="w-full p-3 border rounded" />
      <select {...register('status')} className="w-full p-3 border rounded">
        <option value="lendo">Lendo</option>
        <option value="lido">Lido</option>
        <option value="quero-ler">Quero Ler</option>
      </select>

      <button type="submit" className="w-full bg-[var(--color-accent)] text-white p-3 rounded">
        {bookToEdit ? 'Salvar' : 'Adicionar'}
      </button>
    </form>
  )
}
