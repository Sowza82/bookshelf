// src/hooks/useBooks.ts
'use client'

import { Book } from '@/types/book'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

export interface BookFormData {
  id?: string
  title: string
  author: string
  year: number
  status: string // lendo, lido, quero-ler
  rating: number
  genre: string
  description?: string
  coverImageUrl?: string
}

export function useBooks(searchQuery: string, genreFilter: string) {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchBooks = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams()
      if (searchQuery) params.set('q', searchQuery)
      if (genreFilter && genreFilter !== 'Todos os gêneros') params.set('genre', genreFilter)

      const res = await fetch(`/api/books?${params.toString()}`)
      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Falha ao carregar livros.')
      }

      const data: Book[] = await res.json()
      setBooks(data)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido ao buscar livros.'
      setError(message)
      setBooks([])
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [searchQuery, genreFilter])

  useEffect(() => {
    fetchBooks()
  }, [fetchBooks])

  // ─── MUTATIONS ───────────────────────────────
  const addBook = async (data: BookFormData) => {
    try {
      const res = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Falha ao criar livro.')
      }

      await fetchBooks()
      toast.success(`Livro "${data.title}" criado com sucesso!`)
    } catch (err: any) {
      toast.error(`Erro ao adicionar livro: ${err.message}`)
      console.error('Add Book Error:', err)
    }
  }

  const updateBook = async (id: string, data: BookFormData) => {
    try {
      const res = await fetch(`/api/books/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Falha ao atualizar livro.')
      }

      const updatedBook: Book = await res.json()
      setBooks(prev => prev.map(b => (b.id === id ? updatedBook : b)))
      toast.success(`Livro "${updatedBook.title}" atualizado!`)
      return updatedBook
    } catch (err: any) {
      toast.error(`Erro ao atualizar livro: ${err.message}`)
      console.error('Update Book Error:', err)
      return null
    }
  }

  const deleteBook = async (id: string) => {
    try {
      const res = await fetch(`/api/books/${id}`, { method: 'DELETE' })
      if (res.status !== 204) {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Falha ao deletar livro.')
      }

      setBooks(prev => prev.filter(b => b.id !== id))
      toast.success('Livro removido com sucesso.')
    } catch (err: any) {
      toast.error(`Erro ao deletar livro: ${err.message}`)
      console.error('Delete Book Error:', err)
    }
  }

  return { books, loading, error, addBook, updateBook, deleteBook, refetch: fetchBooks }
}
