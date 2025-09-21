'use client'
import { Book } from '@/types/book'
import useLocalStorage from './useLocalStorage'

export function useBook() {
  const [books, setBooks] = useLocalStorage<Book[]>('books', [])

  const addBook = (book: Book) => {
    const newBook = { ...book, id: Date.now().toString() }
    setBooks(prev => [...prev, newBook])
  }

  const editBook = (id: string, updatedBook: Book) => {
    setBooks(prev =>
      prev.map(b => (b.id === id ? { ...b, ...updatedBook } : b))
    )
  }

  const getBook = (id: string) => books.find(b => b.id === id)

  const searchBooks = (query: string) => {
    const q = query.trim().toLowerCase()
    return books.filter(
      b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
    )
  }

  return { books, addBook, editBook, getBook, searchBooks }
}
