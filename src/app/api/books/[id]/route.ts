// src/app/api/books/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { getBookById, updateBook, deleteBook } from '@/app/actions/book'
import { BOOK_UPDATE_SCHEMA } from '@/lib/validation'
import { ZodError } from 'zod'

// ======================================================================
// GET /api/books/[id]: Buscar livro por ID
// ======================================================================
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const bookId = params.id
        const book = await getBookById(bookId)

        if (!book) {
            return NextResponse.json({ message: 'Livro não encontrado.' }, { status: 404 })
        }

        return NextResponse.json(book, { status: 200 })
    } catch (err) {
        console.error('Erro ao buscar livro por ID:', err)
        return NextResponse.json({ message: 'Falha ao buscar livro.' }, { status: 500 })
    }
}

// ======================================================================
// PUT /api/books/[id]: Atualizar livro por ID
// ======================================================================
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const bookId = params.id
        const body = await request.json()

        // Validação Zod
        const parsedBody = BOOK_UPDATE_SCHEMA.parse(body)

        // Chama a Server Action (que retorna o objeto atualizado ou null/undefined em caso de falha)
        const updatedBook = await updateBook(bookId, parsedBody)

        // Verificação de sucesso
        if (!updatedBook) {
            // Isso pode ocorrer se o ID não for encontrado (embora o Prisma update lide com isso)
            return NextResponse.json({ message: 'Livro não encontrado para atualização.' }, { status: 404 })
        }

        return NextResponse.json(updatedBook, { status: 200 })
    } catch (err) {
        if (err instanceof ZodError) {
            // Retorna erros de validação
            return NextResponse.json(
                { message: err.errors.map(e => e.message).join(', ') },
                { status: 400 }
            )
        }

        console.error('Erro ao atualizar livro:', err)
        return NextResponse.json({ message: 'Falha ao atualizar o livro.' }, { status: 500 })
    }
}

// ======================================================================
// DELETE /api/books/[id]: Remover livro por ID
// ======================================================================
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const bookId = params.id;

    try {

        await deleteBook(bookId)

        // Se a execução chegar aqui sem erro, o livro foi deletado.
        return new Response(null, { status: 204 }) // 204 No Content é o padrão para DELETE bem-sucedido.

    } catch (err) {
        console.error('Erro ao deletar livro:', err);

        return NextResponse.json({ message: 'Falha ao deletar livro.' }, { status: 500 })
    }
}