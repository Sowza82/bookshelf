// src/types/book.ts
<<<<<<< HEAD
export interface Book {
  id: string;
  title: string;
  author: string;
  coverImageUrl?: string;
  publicationYear: number;
  genre: string;
  read: boolean;
  rating: number;
}
=======
export type Book = {
  id: string;
  title: string;
  author: string;
  cover?: string;
  pages: number;
  readPages: number;
  status: 'reading' | 'read' | 'unread';
  rating: number; // 1 a 5
  genre: string;
  year: number;
  synopsis?: string;
};
>>>>>>> 2309a29 (feat: implementa lógica de storage, hook de livros e BookCard)
