// src/app/livro/[id]/page.tsx
import { getBookById, getBooks } from '@/lib/storage';
import BookDetails from '@/components/book/book-details';
import Link from 'next/link';

// (Opcional) Esta função gera as páginas de forma estática durante o build
export async function generateStaticParams() {
  const books = getBooks();
  return books.map(book => ({
    id: book.id,
  }));
}

export default function BookPage({ params }: { params: { id: string } }) {
  const book = getBookById(params.id);

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
        <h1 className="text-3xl font-bold mb-4">Livro não encontrado</h1>
        <Link href="/biblioteca" className="p-2 bg-indigo-600 hover:bg-indigo-700 transition rounded-lg font-bold">
          Voltar para a Biblioteca
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <BookDetails book={book} />
    </div>
  );
}