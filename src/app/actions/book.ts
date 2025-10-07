"use server";

import { prisma } from "@/lib/prisma";

// Criar um livro
export async function createBook(formData: FormData) {
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const totalPages = Number(formData.get("totalPages"));
  const genre = (formData.get("genre") as string) || "Não informado";

  const newBook = await prisma.book.create({
    data: { title, author, totalPages, genre },
  });

  return newBook;
}

// Buscar livros com filtros opcionais
export async function getBooks(filters?: { q?: string; genre?: string }) {
  const { q, genre } = filters || {};

  return await prisma.book.findMany({
    where: {
      AND: [
        q
          ? {
              OR: [
                { title: { contains: q, mode: "insensitive" } },
                { author: { contains: q, mode: "insensitive" } },
              ],
            }
          : {},
        genre && genre !== "Todos os gêneros"
          ? { genre: { equals: genre } }
          : {},
      ],
    },
    orderBy: { title: "asc" },
  });
}

// Buscar todos os livros sem filtro
export async function getAllBooks() {
  return await prisma.book.findMany({
    orderBy: { title: "asc" },
  });
}

// Buscar livro por ID
export async function getBookById(id: string) {
  return await prisma.book.findUnique({ where: { id } });
}

// Atualizar livro
export async function updateBook(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const readingStatus = formData.get("readingStatus") as string;
  const currentPage = Number(formData.get("currentPage"));
  const totalPages = Number(formData.get("totalPages"));

  return await prisma.book.update({
    where: { id },
    data: { title, author, readingStatus, currentPage, totalPages },
  });
}

// Deletar livro
export async function deleteBook(id: string) {
  return await prisma.book.delete({ where: { id } });
}
