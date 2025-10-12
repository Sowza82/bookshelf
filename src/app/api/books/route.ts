import { createBook, getBooks } from '@/app/actions/book'
import { BOOK_CREATE_SCHEMA } from '@/lib/validation'
import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const q = searchParams.get('q') ?? undefined
    const genre = searchParams.get('genre') ?? undefined

    const books = await getBooks({ q, genre })
    return NextResponse.json(books)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: 'Erro interno ao buscar livros' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = BOOK_CREATE_SCHEMA.parse(body)
    const newBook = await createBook(parsed)
    return NextResponse.json({ message: 'Livro criado', book: newBook }, { status: 201 })
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json({ message: Object.values(err.flatten().fieldErrors).flat().join(', ') }, { status: 400 })
    }
    return NextResponse.json({ message: 'Erro interno ao criar livro' }, { status: 500 })
  }
}
