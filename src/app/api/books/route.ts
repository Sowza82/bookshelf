import { createBook, getBooks } from "@/app/actions/book";
import { NextResponse } from "next/server";

// GET /api/books → listar livros com filtros
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") ?? undefined;
    const genre = searchParams.get("genre") ?? undefined;

    const books = await getBooks({ q, genre });

    return NextResponse.json(books, { status: 200 });
  } catch (err) {
    console.error("Erro ao buscar livros:", err);
    return NextResponse.json({ message: "Falha ao buscar livros." }, { status: 500 });
  }
}

// POST /api/books → criar novo livro
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newBook = await createBook(body);

    return NextResponse.json(
      { message: "Livro criado com sucesso", book: newBook },
      { status: 201 }
    );
  } catch (err) {
    console.error("Erro ao criar livro:", err);
    return NextResponse.json(
      { message: "Falha ao criar livro. Dados inválidos." },
      { status: 400 }
    );
  }
}
