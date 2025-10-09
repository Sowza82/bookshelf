// lib/storage.ts

// Define a estrutura de um livro, conforme os requisitos do projeto.
export type Book = {
  id: string;
  title: string;
  author: string;
  cover?: string; // Capa é opcional, caso não exista.
  pages: number;
  readPages: number;
  status: 'reading' | 'read' | 'unread';
  rating: number; // 1 a 5
  genre: string;
  year: number;
  synopsis?: string;
};

// src/data/initial-books.ts
import { Book } from '@/types/book';

export const initialBooks: Book[] = [
  {
    id: '1',
    title: 'O Poder do Hábito',
    author: 'Charles Duhigg',
    cover: '/covers/o-poder-do-habito.png', // Caminho corrigido
    pages: 408,
    readPages: 150,
    status: 'reading',
    rating: 4,
    genre: 'Autoajuda',
    year: 2012,
    synopsis: 'Uma visão fascinante sobre a ciência por trás de como os hábitos se formam e como podemos mudá-los.'
  },
  {
    id: '2',
    title: 'A Revolução dos Bichos',
    author: 'George Orwell',
    cover: '/covers/revolucao-bichos.png', // Caminho corrigido
    pages: 152,
    readPages: 152,
    status: 'read',
    rating: 5,
    genre: 'Ficção Política',
    year: 1945,
    synopsis: 'Uma alegoria sobre a corrupção do ideal revolucionário, narrada através de animais em uma fazenda.'
  },
  {
    id: '3',
    title: 'Duna',
    author: 'Frank Herbert',
    cover: '/covers/duna.png', // Caminho corrigido
    pages: 688,
    readPages: 0,
    status: 'unread',
    rating: 0,
    genre: 'Ficção Científica',
    year: 1965,
    synopsis: 'Uma saga épica de ficção científica que explora política, religião e o meio ambiente em um planeta desértico.'
  },
  {
    id: '4',
    title: '1984',
    author: 'George Orwell',
    cover: '/covers/1984.png', // Caminho corrigido
    pages: 328,
    readPages: 0,
    status: 'unread',
    rating: 0,
    genre: 'Ficção',
    year: 1949,
    synopsis: 'Um clássico distópico sobre vigilância totalitária, censura e manipulação da verdade.'
  },
  {
    id: '5',
    title: 'O Hobbit',
    author: 'J.R.R. Tolkien',
    cover: '/covers/o-hobbit.png', // Caminho corrigido
    pages: 310,
    readPages: 0,
    status: 'unread',
    rating: 0,
    genre: 'Fantasia',
    year: 1937,
    synopsis: 'A aventura de Bilbo Bolseiro para recuperar um tesouro de um dragão, um prelúdio para O Senhor dos Anéis.'
  },
  {
    id: '6',
    title: 'Mindshift',
    author: 'Barbara Oakley',
    cover: '/covers/mindshift.png', // Caminho corrigido
    pages: 300,
    readPages: 0,
    status: 'unread',
    rating: 0,
    genre: 'Autoajuda',
    year: 2017,
    synopsis: 'Mindshift é um guia para explorar carreiras e mudar de vida, utilizando o poder do aprendizado e da neurociência.'
  }
];
// ... código posterior ...

const STORAGE_KEY = 'bookshelf-books';

// Carrega os livros do localStorage. Se não houver, carrega os dados iniciais.
export const getBooks = (): Book[] => {
  if (typeof window !== 'undefined') {
    const storedBooks = localStorage.getItem(STORAGE_KEY);
    if (storedBooks) {
      return JSON.parse(storedBooks);
    }
    // Se não houver dados, salva os iniciais e retorna
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialBooks));
    return initialBooks;
  }
  return initialBooks; // Retorna os dados iniciais em ambiente de servidor
};

// Salva a lista completa de livros no localStorage.
export const saveBooks = (books: Book[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  }
};

// Adiciona um novo livro.
export const addBook = (book: Omit<Book, 'id'>): void => {
  const books = getBooks();
  const newBook = { ...book, id: Date.now().toString() };
  books.push(newBook);
  saveBooks(books);
};

// Busca um livro pelo ID.
export const getBookById = (id: string): Book | undefined => {
  const books = getBooks();
  return books.find(book => book.id === id);
};

// Atualiza um livro existente.
export const updateBook = (updatedBook: Book): void => {
  const books = getBooks();
  const bookIndex = books.findIndex(book => book.id === updatedBook.id);
  if (bookIndex !== -1) {
    books[bookIndex] = updatedBook;
    saveBooks(books);
  }
};

// Exclui um livro pelo ID.
export const deleteBook = (id: string): void => {
  const books = getBooks();
  const filteredBooks = books.filter(book => book.id !== id);
  saveBooks(filteredBooks);
};