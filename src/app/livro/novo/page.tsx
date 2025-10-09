// src/app/livro/novo/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useBooks } from '@/hooks/useBooks';

export default function AddBookPage() {
  const router = useRouter();
  const { addBook } = useBooks();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && author) {
      addBook({
        title,
        author,
        pages: 0,
        readPages: 0,
        status: 'unread',
        rating: 0,
        genre: 'Ficção',
        year: new Date().getFullYear(),
      });
      router.push('/biblioteca');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="w-full max-w-xl p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Adicionar Novo Livro</h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="title" className="block text-gray-400 mb-1">Título:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="author" className="block text-gray-400 mb-1">Autor:</label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
          
          <div className="flex gap-2 justify-end mt-4">
            <Link href="/biblioteca" className="p-2 bg-gray-600 hover:bg-gray-700 transition rounded-lg font-bold">
              Cancelar
            </Link>
            <button type="submit" className="p-2 bg-emerald-600 hover:bg-emerald-700 transition rounded-lg font-bold">
              Salvar Livro
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}