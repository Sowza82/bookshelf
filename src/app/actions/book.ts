"use server";

import { prisma } from "@/lib/prisma";
import { z, ZodError } from "zod";
// Importamos a interface Book correta do front-end
import { Book } from "@/types/book";

// ======================================================================
// DEFINIÇÕES ZOD
// ======================================================================

// 🚨 Define a união de literais de string que o 'readingStatus' deve aceitar
const READING_STATUS = z.union([
  z.literal("UNREAD"),
  z.literal("READING"),
  z.literal("FINISHED"),
]);

const CREATE_BOOK_SCHEMA = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  author: z.string().min(1, "Autor é obrigatório"),
  totalPages: z.preprocess(
    (val) => Number(val),
    z.number().int().positive("Total de páginas inválido")
  ),
  genre: z.string().optional().default("Não informado"),
});

const UPDATE_BOOK_SCHEMA = z.object({
  title: z.string().min(1).optional(),
  author: z.string().min(1).optional(),
  // Aplica a restrição de tipo ao campo 'readingStatus'
  readingStatus: READING_STATUS.optional(),
  currentPage: z.preprocess(
      (val) => (val === '' ? undefined : Number(val)),
      z.number().int().nonnegative("Página atual inválida").optional()
    ),
  totalPages: z.preprocess(
      (val) => (val === '' ? undefined : Number(val)),
      z.number().int().positive("Total de páginas inválido").optional()
    ),
  genre: z.string().optional(),
});

// ======================================================================
// CRIAÇÃO
// ======================================================================
export async function createBook(formData: FormData) {
  try {
    const data = CREATE_BOOK_SCHEMA.parse({
      title: formData.get("title"),
      author: formData.get("author"),
      totalPages: formData.get("totalPages"),
      genre: formData.get("genre"),
    });

    return await prisma.book.create({ data });
  } catch (err) {
    if (err instanceof ZodError) {
      const messages = Object.values(err.flatten().fieldErrors).flat().join(", ");
      throw new Error(messages || err.message);
    }
    throw err;
  }
}

// ======================================================================
// BUSCA
// ======================================================================
interface BookFilters {
  q?: string;
  genre?: string;
}

// Tipado para retornar a interface Book[] correta
export async function getBooks(filters?: BookFilters): Promise<Book[]> {
  const filtersArray: any[] = [];

  if (filters?.q) {
    filtersArray.push({
      OR: [
        { title: { contains: filters.q, mode: "insensitive" } },
        { author: { contains: filters.q, mode: "insensitive" } },
      ],
    });
  }

  if (filters?.genre && filters.genre !== "Todos os gêneros") {
    filtersArray.push({ genre: { equals: filters.genre } });
  }

  const books = await prisma.book.findMany({
    where: filtersArray.length > 0 ? { AND: filtersArray } : {},
    orderBy: { title: "asc" },
  });

  // Assegura que o tipo de retorno do Prisma é compatível com Book[]
  return books as Book[];
}

// Função que retorna todos os livros (Dashboard)
export async function getAllBooks(): Promise<Book[]> {
  const books = await prisma.book.findMany({ orderBy: { title: "asc" } });
  return books as Book[];
}

// Busca por ID
export async function getBookById(id: string): Promise<Book | null> {
  const book = await prisma.book.findUnique({ where: { id } });
  return book as Book | null;
}

// ======================================================================
// ATUALIZAÇÃO
// ======================================================================
// O tipo Partial<Book> agora está seguro, pois o Zod foi corrigido
export async function updateBook(id: string, data: Partial<Book>) {
  try {
    return await prisma.book.update({ where: { id }, data });
  } catch (err) {
    console.error("Erro ao atualizar livro:", err);
    return null;
  }
}

export async function updateBookFromForm(id: string, formData: FormData) {
  try {
    const parsedData = UPDATE_BOOK_SCHEMA.parse({
      title: formData.get("title"),
      author: formData.get("author"),
      readingStatus: formData.get("readingStatus"),
      currentPage: formData.get("currentPage"),
      totalPages: formData.get("totalPages"),
      genre: formData.get("genre"),
    });

    // parsedData agora tem o 'readingStatus' tipado corretamente, resolvendo o erro
    return updateBook(id, parsedData);
  } catch (err) {
    if (err instanceof ZodError) {
      const messages = Object.values(err.flatten().fieldErrors).flat().join(", ");
      throw new Error(messages || err.message);
    }
    throw err;
  }
}

// ======================================================================
// DELEÇÃO
// ======================================================================
export async function deleteBook(id: string) {
  try {
    return await prisma.book.delete({ where: { id } });
  } catch (err) {
    console.error("Erro ao deletar livro:", err);
    return null;
  }
}
