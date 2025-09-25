// src/types/book.ts
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
