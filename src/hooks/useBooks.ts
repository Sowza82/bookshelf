'use client'
import { initialBooks } from '@/data/initial-books'
import { Book } from '@/types/book'
import useLocalStorage from './useLocalStorage'

export function useBooks() {
  // Inicializa com livros do initialBooks se Local Storage estiver vazio
  const [books, setBooks] = useLocalStorage<Book[]>('books', initialBooks)

  const addBook = (book: Book) => {
    const newBook = { ...book, id: Date.now().toString() } // ID único
    setBooks(prev => [...prev, newBook])
  }

  const editBook = (id: string, updatedBook: Book) => {
    setBooks(prev =>
      prev.map(b => (b.id === id ? { ...b, ...updatedBook } : b))
    )
  }

  const getBook = (id: string) => books.find(b => b.id.toString() === id)

  const searchBooks = (query: string) => {
    const q = query.trim().toLowerCase()
    return books.filter(
      b =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q)
    )
  }

  return { books, addBook, editBook, getBook, searchBooks }
}
