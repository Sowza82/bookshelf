// src/types/book.ts

export type APIReadingStatus = 'UNREAD' | 'READING' | 'FINISHED'
export type BookFormClientStatus = "lendo" | "lido" | "quero-ler"

// Tipo principal do Livro (Prisma/API)
export type Book = {
  id: string
  title: string
  author: string
  coverUrl: string | null
  publicationYear: number | null
  readingStatus: APIReadingStatus
  rating: number | null
  genre: string | null
  totalPages: number | null
  currentPage: number | null
  synopsis: string | null
  notes: string | null
  createdAt?: Date
  updatedAt?: Date
}

// Tipo dos Valores do Formulário (O que o usuário envia)
// Crucial para o RHF (React Hook Form)
export type BookFormValues = {
  title: string
  author: string
  year: number
  rating: number
  genre: string
  status: BookFormClientStatus
  description: string | undefined
  coverImageUrl: string | undefined
  totalPages: number | undefined
  currentPage: number | undefined
}
