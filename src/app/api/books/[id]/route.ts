import { deleteBook, getBookById, updateBook } from "@/app/actions/book";
import { BOOK_UPDATE_SCHEMA } from "@/lib/validation";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

// ======================================================================
// GET /api/books/[id]
// ======================================================================
export async function GET(req: NextRequest, context: any) {
  const id = context.params?.id as string;

  try {
    const book = await getBookById(id);

    if (!book) {
      return NextResponse.json({ message: "Livro não encontrado." }, { status: 404 });
    }

    return NextResponse.json(book, { status: 200 });
  } catch (err) {
    console.error(`Erro ao buscar livro (ID: ${id}):`, err);
    return NextResponse.json({ message: "Falha ao buscar livro." }, { status: 500 });
  }
}

// ======================================================================
// PUT /api/books/[id]
// ======================================================================
export async function PUT(req: NextRequest, context: any) {
  const id = context.params?.id as string;

  try {
    const body = await req.json();
    const parsedBody = BOOK_UPDATE_SCHEMA.parse(body);

    const updatedBook = await updateBook(id, parsedBody);

    if (!updatedBook) {
      return NextResponse.json({ message: "Livro não encontrado para atualização." }, { status: 404 });
    }

    return NextResponse.json(updatedBook, { status: 200 });
  } catch (err) {
    if (err instanceof ZodError) {
      const messages = Object.values(err.flatten().fieldErrors).flat().join(", ");
      return NextResponse.json({ message: messages || err.message }, { status: 400 });
    }

    console.error(`Erro ao atualizar livro (ID: ${id}):`, err);
    return NextResponse.json({ message: "Falha ao atualizar o livro." }, { status: 500 });
  }
}

// ======================================================================
// DELETE /api/books/[id]
// ======================================================================
export async function DELETE(req: NextRequest, context: any) {
  const id = context.params?.id as string;

  try {
    await deleteBook(id);
    return new Response(null, { status: 204 });
  } catch (err) {
    console.error(`Erro ao deletar livro (ID: ${id}):`, err);
    return NextResponse.json({ message: "Falha ao deletar livro." }, { status: 500 });
  }
}
