// src/hooks/useBooks.ts
'use client';

import { useState, useEffect } from 'react';
import {
  Book,
  getBooks,
  saveBooks,
} from '@/lib/storage';

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const storedBooks = getBooks();
    setBooks(storedBooks);
  }, []);

  const addBook = (book: Omit<Book, 'id'>) => {
    const newBook = { ...book, id: Date.now().toString() };
    const updatedBooks = [...books, newBook];
    setBooks(updatedBooks);
    saveBooks(updatedBooks);
  };

  const updateBook = (updatedBook: Book) => {
    const updatedBooks = books.map((book) =>
      book.id === updatedBook.id ? updatedBook : book
    );
    setBooks(updatedBooks);
    saveBooks(updatedBooks);
  };

  const deleteBook = (id: string) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
    saveBooks(updatedBooks);
  };

  return { books, addBook, updateBook, deleteBook };
}