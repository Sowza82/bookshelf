<<<<<<< HEAD
// src/components/book/book-card.tsx
'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Book } from '@/types/book'
import Image from 'next/image'
import Link from 'next/link'

interface BookCardProps {
  book: Book
}

export default function BookCard({ book }: BookCardProps) {
  // Usa a propriedade `cover` do seu initialBooks.ts
  const imageUrl =
    book.cover ||
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPHez0OhX9UxEPHpfX6QsAg9yGoGa4FwQyVxLhrKc&usqp=CAE&s'

  return (
    <Link href={`/livro/${book.id}`} passHref>
      <Card className="h-full flex flex-col transition-shadow duration-300 ease-in-out hover:shadow-xl hover:border-primary/50 cursor-pointer">
        <CardHeader className="p-0 flex justify-center items-center overflow-hidden rounded-t-lg bg-gray-100 dark:bg-gray-800 h-80">
          <div className="relative w-full h-full">
            <Image
              src={imageUrl}
              alt={`Capa do livro ${book.title}`}
              fill
              style={{ objectFit: 'cover' }}
              className="transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              priority={false}
            />
          </div>
        </CardHeader>

        <CardContent className="p-4 flex flex-col flex-grow">
          <CardTitle className="text-lg font-semibold truncate hover:whitespace-normal hover:overflow-visible transition-all">
            {book.title}
          </CardTitle>
          <CardDescription className="mt-1 text-sm text-muted-foreground flex-grow">
            {book.author} ({book.publicationYear})
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  )
}
=======
// src/components/BookCard.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Importa o componente Image do Next.js
import { Book } from '@/lib/storage';

type BookCardProps = {
  book: Book;
  onDelete?: (id: string) => void;
};

const BookCard: React.FC<BookCardProps> = ({ book, onDelete }) => {
  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-md flex flex-col items-center text-center">
      <div className="w-32 h-48 relative mb-4">
        <Image
          src={book.cover || '/default-cover.png'}
          alt={`Capa do livro ${book.title}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover rounded"
        />
      </div>

      <h3 className="text-xl font-bold text-white mb-1">{book.title}</h3>
      <p className="text-gray-400 mb-2">{book.author}</p>
      
      <div className="flex gap-1 mb-2">
        <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">
          {book.genre}
        </span>
      </div>

      <div className="mt-auto flex gap-2">
        <Link href={`/book/${book.id}`} className="p-2 bg-indigo-600 hover:bg-indigo-700 transition rounded-lg text-sm">
          Visualizar
        </Link>
        {onDelete && (
          <button
            onClick={() => onDelete(book.id)}
            className="p-2 bg-red-600 hover:bg-red-700 transition rounded-lg text-sm"
          >
            Excluir
          </button>
        )}
      </div>
    </div>
  );
};

export default BookCard;
>>>>>>> 2309a29 (feat: implementa lógica de storage, hook de livros e BookCard)
