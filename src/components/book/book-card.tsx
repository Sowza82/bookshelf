// src/components/book/book-card.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Book } from '@/types/book';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

type BookCardProps = {
  book: Book;
  onDelete?: (id: string) => void;
};

const BookCard: React.FC<BookCardProps> = ({ book, onDelete }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center text-center">
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
        <Link href={`/livro/${book.id}`} className="p-2 bg-indigo-600 hover:bg-indigo-700 transition rounded-lg text-sm">
          Visualizar
        </Link>
        {onDelete && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="p-2 bg-red-600 hover:bg-red-700 transition rounded-lg text-sm">Excluir</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                <AlertDialogDescription>
                  Essa ação não pode ser desfeita. Você irá remover o livro "{book.title}" da sua biblioteca.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(book.id)}>Continuar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  );
};

export default BookCard;