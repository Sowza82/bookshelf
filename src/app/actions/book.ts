'use server'

import { prisma } from '@/lib/prisma'
import { BOOK_CREATE_SCHEMA, BOOK_UPDATE_SCHEMA } from '@/lib/validation'
import { Book } from '@/types/book'
import { z } from 'zod'

type BookCreateInput = z.infer<typeof BOOK_CREATE_SCHEMA>
type BookUpdateInput = z.infer<typeof BOOK_UPDATE_SCHEMA>

export async function createBook(data: BookCreateInput): Promise<Book> {
  const parsed = BOOK_CREATE_SCHEMA.parse(data)
  return prisma.book.create({
    data: parsed,
    select: {
      id: true,
      title: true,
      author: true,
      coverUrl: true,
      rating: true,
      genre: true,
      readingStatus: true,
      totalPages: true,
      currentPage: true,
      publicationYear: true,
      synopsis: true,
      createdAt: true,
      updatedAt: true,
    },
  }) as Promise<Book>
}

export async function getBooks(filters?: { q?: string; genre?: string }): Promise<Book[]> {
  const where: any = {}
  if (filters?.q) {
    where.OR = [
      { title: { contains: filters.q, mode: 'insensitive' } },
      { author: { contains: filters.q, mode: 'insensitive' } },
    ]
  }
  if (filters?.genre && filters.genre !== 'Todos os gêneros') {
    where.genre = { equals: filters.genre }
  }

  return prisma.book.findMany({
    where,
    orderBy: { updatedAt: 'desc' },
    select: {
      id: true,
      title: true,
      author: true,
      coverUrl: true,
      rating: true,
      genre: true,
      readingStatus: true,
      updatedAt: true,
    },
  }) as Promise<Book[]>
}

export async function getBookById(id: string): Promise<Book | null> {
  return prisma.book.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      author: true,
      coverUrl: true,
      rating: true,
      genre: true,
      readingStatus: true,
      totalPages: true,
      currentPage: true,
      publicationYear: true,
      synopsis: true,
    },
  }) as Promise<Book | null>
}

export async function updateBookFromForm(id: string, data: BookUpdateInput): Promise<Book> {
  const parsed = BOOK_UPDATE_SCHEMA.parse(data)
  return prisma.book.update({
    where: { id },
    data: parsed,
    select: {
      id: true,
      title: true,
      author: true,
      coverUrl: true,
      rating: true,
      genre: true,
      readingStatus: true,
      totalPages: true,
      currentPage: true,
      publicationYear: true,
      synopsis: true,
      updatedAt: true,
    },
  }) as Promise<Book>
}

export async function deleteBook(id: string): Promise<{ success: boolean }> {
  try {
    await prisma.book.delete({ where: { id } })
    return { success: true }
  } catch {
    return { success: false }
  }
}

// Dashboard summary (limitando campos para performance)
export async function getDashboardBooks(): Promise<Book[]> {
  return prisma.book.findMany({
    orderBy: { updatedAt: 'desc' },
    select: {
      id: true,
      title: true,
      author: true,
      coverUrl: true,
      readingStatus: true,
      updatedAt: true,
    },
    take: 50, // limite de resultados
  }) as Promise<Book[]>
}
