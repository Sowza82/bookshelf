// src/components/book/book-details.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Book } from '@/types/book';

type BookDetailsProps = {
  book: Book;
};

const BookDetails: React.FC<BookDetailsProps> = ({ book }) => {
  const imageUrl = book.cover || '/default-cover.png';

  return (
    <div className="flex flex-col lg:flex-row gap-8 bg-gray-800 p-8 rounded-lg shadow-lg">
      <div className="flex-shrink-0 w-full lg:w-1/3">
        <div className="relative w-full h-96">
          <Image
            src={imageUrl}
            alt={`Capa do livro ${book.title}`}
            fill
            className="object-cover rounded-lg shadow-md"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full lg:w-2/3">
        <h1 className="text-4xl font-bold text-white">{book.title}</h1>
        <p className="text-xl text-gray-400">por {book.author}</p>

        <div className="flex flex-wrap gap-2 text-sm text-gray-300">
          <span className="bg-blue-500 text-white px-2 py-1 rounded">
            Gênero: {book.genre}
          </span>
          <span className="bg-gray-600 text-white px-2 py-1 rounded">
            Ano: {book.year}
          </span>
          <span className="bg-purple-600 text-white px-2 py-1 rounded">
            Páginas: {book.pages}
          </span>
        </div>

        <div className="mt-4">
          <h2 className="text-2xl font-bold text-white mb-2">Sinopse</h2>
          <p className="text-gray-400">{book.synopsis}</p>
        </div>

        <div className="mt-auto flex gap-2">
          <Link href={`/livro/${book.id}/editar`}>
            <button className="p-2 bg-yellow-500 hover:bg-yellow-600 transition rounded-lg font-bold">
              Editar
            </button>
          </Link>
          <Link href="/biblioteca">
            <button className="p-2 bg-red-600 hover:bg-red-700 transition rounded-lg font-bold">
              Excluir (a ser implementado)
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;