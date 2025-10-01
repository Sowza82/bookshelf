// src/app/api/books/[id]/route.ts
import { getBookById, updateBook, deleteBook } from '@/actions/book' // Reutiliza Server Actions
import { NextResponse } from 'next/server'

interface Context {
  params: {
    id: string // O ID dinâmico da URL
  }
}

// GET /api/books/[id]: Buscar um livro por ID
export async function GET(request: Request, context: Context) {
  try {
    const book = await getBookById(context.params.id)

    if (!book) {
      return NextResponse.json({ message: 'Livro não encontrado' }, { status: 404 })
    }

    return NextResponse.json(book, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Falha ao buscar livro.' }, { status: 500 })
  }
}

// PUT /api/books/[id]: Atualizar um livro
export async function PUT(request: Request, context: Context) {
  try {
    const body = await request.json()
    const result = await updateBook({ id: context.params.id, ...body })

    if (!result.success) {
      return NextResponse.json({ message: result.error }, { status: 400 })
    }

    return NextResponse.json({ message: 'Livro atualizado com sucesso' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Falha ao atualizar livro.' }, { status: 400 })
  }
}

// DELETE /api/books/[id]: Remover um livro
export async function DELETE(request: Request, context: Context) {
  try {
    const result = await deleteBook(context.params.id)

    if (!result.success) {
      return NextResponse.json({ message: result.error }, { status: 404 })
    }

    return new Response(null, { status: 204 }) // 204 No Content para deleção bem-sucedida
  } catch (error) {
    return NextResponse.json({ message: 'Falha ao deletar livro.' }, { status: 500 })
  }
}
