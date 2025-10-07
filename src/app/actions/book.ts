"use server";

import { prisma } from "@/lib/prisma";
import { Book } from "@prisma/client"; // Adicionando o tipo do Prisma para clareza

// ======================================================================
// 1. CRIAÇÃO (Via FormData)
// ======================================================================
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

// ======================================================================
// 2. BUSCA
// ======================================================================

// Tipagem para os filtros de busca
interface BookFilters {
  q?: string;
  genre?: string;
}

// Buscar livros com filtros opcionais
export async function getBooks(filters?: BookFilters) {
  const { q, genre } = filters || {};

  return await prisma.book.findMany({
    where: {
      AND: [
        // Filtro por termo (título ou autor)
        q
          ? {
              OR: [
                { title: { contains: q, mode: "insensitive" } },
                { author: { contains: q, mode: "insensitive" } },
              ],
            }
          : {},
        // Filtro por gênero (se não for "Todos os gêneros")
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

// ======================================================================
// 3. ATUALIZAÇÃO (Duas Funções)
// ======================================================================

// 3.1. Função Auxiliar para a Rota de API (PUT)
// Esta função recebe um objeto de dados limpo, ideal após a validação Zod
export async function updateBook(id: string, data: Partial<Book>) {
  // O uso de Partial<Book> permite que a API envie APENAS os campos que mudaram
  // e aceita o objeto de dados já processado pelo Zod.
  try {
    const updatedBook = await prisma.book.update({
      where: { id },
      data: data,
    });
    return updatedBook;
  } catch (error) {
    // Retorna null se não encontrar o ID ou ocorrer outro erro do Prisma
    console.error("Erro no Prisma ao atualizar:", error);
    return null;
  }
}

// 3.2. Função para Formulário (Form Action)
// Esta função recebe FormData e faz a conversão/parsing
export async function updateBookFromForm(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const readingStatus = formData.get("readingStatus") as string;
  const currentPage = Number(formData.get("currentPage"));
  const totalPages = Number(formData.get("totalPages"));

  const data = { title, author, readingStatus, currentPage, totalPages };

  // Reutiliza a função principal de update
  return updateBook(id, data);
}

// ======================================================================
// 4. DELEÇÃO
// ======================================================================
export async function deleteBook(id: string) {
  // Não precisa do try/catch aqui, pois a rota de API já faz isso
  return await prisma.book.delete({ where: { id } });
}
