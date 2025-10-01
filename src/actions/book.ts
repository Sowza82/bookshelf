// src/actions/book.ts
'use server'

import { prisma } from '@/lib/prisma' // 🔑 Assumindo que você configurou o Prisma aqui
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// ⚠️ Se o seu tipo Book ainda estiver no useBooks.ts, mova-o para src/types/book.ts
// E adapte as funções para usar o tipo de dados retornado pelo Prisma.

// ----------------------------------------------------------------------
// 1. READ: Buscar Livros (Usado no Dashboard e Biblioteca)
// ----------------------------------------------------------------------
// Implementando a busca com filtros, necessária para a refatoração da Biblioteca
export async function getBooks(params?: { q?: string; genre?: string }) {
  const { q, genre } = params || {}

  const where = {
    // 🔍 Filtro de busca por título ou autor
    ...(q && {
      OR: [
        { title: { contains: q, mode: 'insensitive' } },
        { author: { contains: q, mode: 'insensitive' } },
      ],
    }),
    // 🧬 Filtro por gênero
    ...(genre && genre !== 'Todos os gêneros' && { genre }),
  }

  // Se você precisa dos IDs, certifique-se que o modelo Prisma.Book tem 'id'
  const books = await prisma.book.findMany({
    where,
    orderBy: {
      title: 'asc',
    },
  })

  return books
}

// ----------------------------------------------------------------------
// 2. READ: Buscar Livro por ID (Usado em EditBookPage e DetailPage)
// ----------------------------------------------------------------------
export async function getBookById(id: string) {
  const book = await prisma.book.findUnique({
    where: { id },
  })
  // Retorna o livro ou null
  return book
}


// ----------------------------------------------------------------------
// 3. CREATE: Adicionar Novo Livro (Usado no formulário)
// ----------------------------------------------------------------------
// ⚠️ ADAPTE 'newBookData' para o tipo correto de input do seu formulário
export async function createBook(newBookData: any) {
  try {
    const book = await prisma.book.create({ data: newBookData })

    // Invalida o cache das páginas de listagem
    revalidatePath('/') // Dashboard
    revalidatePath('/biblioteca') // Biblioteca

    // Redireciona o usuário (Parte 2/3 Requisito)
    return { success: true, bookId: book.id }

  } catch (error) {
    console.error('Erro ao criar livro:', error)
    // Retorna uma mensagem de erro para o Client Component
    return { success: false, error: 'Falha ao salvar o livro. Tente novamente.' }
  }
}

// ----------------------------------------------------------------------
// 4. UPDATE: Atualizar Livro Existente (Usado no formulário de edição)
// ----------------------------------------------------------------------
export async function updateBook(bookData: any) {
  const { id, ...data } = bookData // Separa o ID do resto dos dados

  try {
    await prisma.book.update({
      where: { id },
      data,
    })

    revalidatePath('/')
    revalidatePath('/biblioteca')

    return { success: true }
  } catch (error) {
    console.error('Erro ao atualizar livro:', error)
    return { success: false, error: 'Falha ao atualizar o livro. Tente novamente.' }
  }
}

// ----------------------------------------------------------------------
// 5. DELETE: Remover Livro (Usado no BookCard/Modal de Confirmação)
// ----------------------------------------------------------------------
export async function deleteBook(id: string) {
  try {
    await prisma.book.delete({
      where: { id },
    })

    // Revalida o cache de ambas as páginas
    revalidatePath('/')
    revalidatePath('/biblioteca')

    return { success: true }
  } catch (error) {
    console.error('Erro ao deletar livro:', error)
    return { success: false, error: 'Falha ao deletar o livro. Tente novamente.' }
  }
}
