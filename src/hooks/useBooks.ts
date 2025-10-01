// src/hooks/useBooks.ts
'use client'

// 1. CORREÇÃO DE IMPORTAÇÃO:
// Deve importar 'initialBooks' do arquivo 'initialBooks.ts' (que você deve ter renomeado)
import { initialBooks } from '@/data/initial-books'
import { Book } from '@/types/book'
import { useEffect } from 'react'
import useLocalStorage from './useLocalStorage'

// Chave de versão para migração de dados
const DATA_VERSION_KEY = 'bookshelf_data_version'
const CURRENT_APP_VERSION = '1.1'

export function useBooks() {
  // 2. CORREÇÃO DE VARIÁVEL:
  // Usa 'initialBooks' como valor padrão no useLocalStorage
  const [books, setBooks] = useLocalStorage<Book[]>('bookshelf-collection', initialBooks)

  // 3. Migração de versão (força reset se houver mudança de versão)
  useEffect(() => {
    if (typeof window === 'undefined') return

    const savedVersion = localStorage.getItem(DATA_VERSION_KEY)

    if (savedVersion !== CURRENT_APP_VERSION) {
      console.warn(`[MIGRATION] Versão antiga (${savedVersion || 'N/A'}) detectada. Forçando reset de dados para V${CURRENT_APP_VERSION}.`)
      // 4. CORREÇÃO DE VARIÁVEL:
      setBooks(initialBooks)
      localStorage.setItem(DATA_VERSION_KEY, CURRENT_APP_VERSION)
    }
  }, [setBooks])

  // Função para adicionar um livro
  const addBook = (book: Book) => {
    const newBook = { ...book, id: Date.now().toString() }
    setBooks(prev => [...prev, newBook])
  }

  // Função para atualizar um livro existente
  const updateBook = (updatedBook: Book) => {
    setBooks(prev =>
      prev.map(b => (b.id === updatedBook.id ? updatedBook : b))
    )
  }

  // Função para remover um livro pelo ID
  const deleteBook = (id: string) => {
    setBooks(prev => prev.filter(b => b.id !== id))
  }

  // Função para obter um livro pelo ID
  const getBook = (id: string) => books.find(b => b.id.toString() === id)

  // Função para resetar manualmente os livros
  const resetBooks = () => setBooks(initialBooks)

  return {
    books,
    addBook,
    updateBook,
    deleteBook,
    getBook,
    resetBooks,
  }
}
