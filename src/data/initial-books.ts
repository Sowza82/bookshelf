// src/data/initial-books.ts
import { Book } from '@/types/book'

const initialBooks: Book[] = [
  {
    id: '1',
    title: '1984',
    author: 'George Orwell',
    year: 1949,
    cover: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
    status: 'lido'
  },
  {
    id: '2',
    title: 'O Hobbit',
    author: 'J.R.R. Tolkien',
    year: 1937,
    cover: 'https://covers.openlibrary.org/b/id/6979861-L.jpg',
    status: 'quero-ler'
  },
  {
    id: '3',
    title: 'Dom Casmurro',
    author: 'Machado de Assis',
    year: 1899,
    cover: 'https://covers.openlibrary.org/b/id/8231851-L.jpg',
    status: 'lendo'
  },
  {
    id: '4',
    title: 'O Pequeno Príncipe',
    author: 'Antoine de Saint-Exupéry',
    year: 1943,
    cover: 'https://covers.openlibrary.org/b/id/8225266-L.jpg',
    status: 'lido'
  },
  {
    id: '5',
    title: 'Harry Potter e a Pedra Filosofal',
    author: 'J.K. Rowling',
    year: 1997,
    cover: 'https://covers.openlibrary.org/b/id/7984916-L.jpg',
    status: 'quero-ler'
  },
  {
    id: '6',
    title: 'O Alquimista',
    author: 'Paulo Coelho',
    year: 1988,
    cover: 'https://covers.openlibrary.org/b/id/8271993-L.jpg',
    status: 'lendo'
  }
]

export default initialBooks
