'use client'

import { Book } from '@/types/book'
import { useEffect, useState, useCallback } from 'react'
import { toast } from 'sonner' // Assumindo que você usa sonner para notificações

// Definimos os tipos de dados esperados para criação e atualização
// NOTA: Estes tipos devem ser um subconjunto do seu Schema Zod (BookFormSchema)
interface BookFormData {
  id?: string
  title: string
  author: string
  // Usamos os nomes do formulário (que o Zod transforma para o backend)
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

  // Função que executa a busca de livros na API (GET)
  const fetchBooks = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams()
      if (searchQuery) params.set('q', searchQuery)
      if (genreFilter && genreFilter !== 'Todos os gêneros')
        params.set('genre', genreFilter)

      const res = await fetch(`/api/books?${params.toString()}`)

      if (!res.ok) {
          const errorData = await res.json()
          throw new Error(errorData.message || 'Falha ao carregar livros')
      }

      const data: Book[] = await res.json()
      setBooks(data)
    } catch (err: unknown) {
      console.error(err)
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Erro desconhecido ao buscar livros.';
      setError(errorMessage)
      setBooks([])
    } finally {
      setLoading(false)
    }
  }, [searchQuery, genreFilter]) // Dependências garantem que a função mude apenas quando necessário

  useEffect(() => {
    fetchBooks()
  }, [fetchBooks]) // Dispara a busca quando os filtros ou a função de busca mudam

  // ----------------------------------------------------
  // Operações de Mutação (POST, PUT, DELETE)
  // ----------------------------------------------------

  const addBook = async (data: BookFormData) => {
    try {
        const res = await fetch('/api/books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })

        if (!res.ok) {
            const errorData = await res.json()
            throw new Error(errorData.message || 'Falha ao criar livro na API.')
        }

        // 1. Recarrega a lista para obter o livro recém-criado com o ID
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
            method: 'PUT', // Usamos PUT/PATCH na API
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })

        if (!res.ok) {
            const errorData = await res.json()
            throw new Error(errorData.message || 'Falha ao atualizar livro na API.')
        }

        // 1. Atualiza o livro no estado local (para resposta imediata)
        const updatedBook: Book = await res.json()
        setBooks(prev => prev.map(b => b.id === id ? updatedBook : b));

        // 2. Opcional: Recarrega a lista em segundo plano para garantir consistência
        // fetchBooks();

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
        const res = await fetch(`/api/books/${id}`, {
            method: 'DELETE',
        })

        if (res.status !== 204) { // O DELETE retorna 204 (No Content) em sucesso
            const errorData = await res.json()
            throw new Error(errorData.message || 'Falha ao deletar livro na API.')
        }

        // Remove do estado local
        setBooks(prev => prev.filter(b => b.id !== id));
        toast.success('Livro removido com sucesso.')

    } catch (err: any) {
        toast.error(`Erro ao deletar livro: ${err.message}`)
        console.error('Delete Book Error:', err)
    }
  }

  return { books, loading, error, addBook, updateBook, deleteBook, refetch: fetchBooks }
}
