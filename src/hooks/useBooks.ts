<<<<<<< HEAD
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
=======
//Hook para manipular lista de livros (CRUD, filtros, etc)
// src/hooks/useBooks.ts
import { useState, useEffect } from 'react';
import {
  Book,
  getBooks,
  saveBooks,
} from '@/lib/storage';

// Custom hook para gerenciar a lista de livros
export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);

  // Carrega os livros do localStorage na primeira renderização
  useEffect(() => {
    const storedBooks = getBooks();
    setBooks(storedBooks);
  }, []);

  // Adiciona um novo livro
  const addBook = (book: Omit<Book, 'id'>) => {
    const newBook = { ...book, id: Date.now().toString() };
    const updatedBooks = [...books, newBook];
    setBooks(updatedBooks);
    saveBooks(updatedBooks); // Persiste os dados no localStorage
  };

  // Atualiza um livro existente
  const updateBook = (updatedBook: Book) => {
    const updatedBooks = books.map((book) =>
      book.id === updatedBook.id ? updatedBook : book
    );
    setBooks(updatedBooks);
    saveBooks(updatedBooks); // Persiste os dados no localStorage
  };

  // Exclui um livro
  const deleteBook = (id: string) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
    saveBooks(updatedBooks); // Persiste os dados no localStorage
  };

  return { books, addBook, updateBook, deleteBook };
}
>>>>>>> 2309a29 (feat: implementa lógica de storage, hook de livros e BookCard)
