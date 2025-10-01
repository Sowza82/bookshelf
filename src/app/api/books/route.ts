// src/app/api/books/route.ts
import { getBooks, createBook } from '@/actions/book' // Reutiliza Server Actions
import { NextResponse } from 'next/server'

// GET /api/books: Listar todos os livros (ou com filtros)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const q = searchParams.get('q')
    const genre = searchParams.get('genre')

    // Chama a Server Action (que usa o Prisma) para buscar dados
    const books = await getBooks({ q: q ?? undefined, genre: genre ?? undefined })

    return NextResponse.json(books, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Falha ao buscar livros.' }, { status: 500 })
  }
}

// POST /api/books: Criar um novo livro
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = await createBook(body)

    if (!result.success) {
        return NextResponse.json({ message: result.error }, { status: 400 })
    }

    return NextResponse.json({ message: 'Livro criado com sucesso', bookId: result.bookId }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: 'Falha ao criar livro. Dados inválidos.' }, { status: 400 })
  }
}
