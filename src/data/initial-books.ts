// src/data/initialBooks.ts
import type { Book } from '../types/book';



export const initialBooks: Book[] = [
  {
    id: '1', // Aspas simples
    title: 'O Senhor dos Anéis', // Aspas simples
    author: 'J.R.R. Tolkien',
    coverImageUrl: '/covers/lotr.png',
    publicationYear: 1954,
    genre: 'Fantasia',
    read: true,
    rating: 5,
  },
  {
    id: '2',
    title: 'A Metamorfose',
    author: 'Franz Kafka',
    coverImageUrl: '/covers/metamorfose.png',
    publicationYear: 1915,
    genre: 'Ficção',
    read: false,
    rating: 4,
  },
  {
    id: '3',
    title: 'Dom Casmurro',
    author: 'Machado de Assis',
    coverImageUrl: '/covers/dom-casmurro.png',
    publicationYear: 1899,
    genre: 'Clássico',
    read: true,
    rating: 4,
  },
  {
    id: '4',
    title: 'A Culpa é das Estrelas',
    author: 'John Green',
    coverImageUrl: '/covers/culpa-das-estrelas.png',
    publicationYear: 2012,
    genre: 'Romance',
    read: false,
    rating: 3,
  },
  {
    id: '5',
    title: 'Sapiens: Uma Breve História da Humanidade',
    author: 'Yuval Noah Harari',
    coverImageUrl: '/covers/sapiens.png',
    publicationYear: 2011,
    genre: 'Não-Ficção',
    read: true,
    rating: 5,
  },
  {
    id: '6',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    coverImageUrl: '/covers/clean-code.png',
    publicationYear: 2008,
    genre: 'Tecnologia',
    read: true,
    rating: 5,
  },
  {
    id: '7',
    title: 'O Gene: Uma História Íntima',
    author: 'Siddhartha Mukherjee',
    coverImageUrl: '/covers/o-gene.png',
    publicationYear: 2016,
    genre: 'Ciência',
    read: true,
    rating: 5,
  },
  {
    id: '8',
    title: 'Inteligência Artificial: Guia Prático',
    author: 'Pedro Domingos',
    coverImageUrl: '/covers/ia-guia-pratico.png',
    publicationYear: 2020,
    genre: 'Tecnologia',
    read: false,
    rating: 4,
  },
];
