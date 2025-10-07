'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import Image from 'next/image' // Componente obrigatório do Next.js para otimização

// Definição de tipo corrigida para eliminar o erro 'any'
// @ts-expect-error Tipo ausente
type Book = {
  title: string
  author: string
  cover: string | null
  year: number | null
  id: string
  status: 'LIDO' | 'LENDO' | 'NAO_LIDO' | string
  imageUrl: string
  [key: string]: unknown
}

interface MyCardProps {
  book: Book | null | undefined
  onClick?: (book: Book) => void
}

const FALLBACK_COVER = '/placeholder-cover.png'

export default function MyCard({ book, onClick }: MyCardProps) {
  if (!book) return null

  const year = book.year ? book.year : 'Ano Desconhecido'
  const descriptionText = `Autor: ${book.author} • Publicado em ${year}`

  const imageSource = (book.cover || book.imageUrl || FALLBACK_COVER) as string;

  const handleClick = () => {
    if (onClick) {
      onClick(book)
    }
  }

  return (
    <Card
      className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.01] cursor-pointer"
      onClick={handleClick}
    >
      {/* Área da Imagem - CORRIGIDO: Usando Next/Image */}
      <div className="relative aspect-[3/4] w-full">
        <Image
          src={imageSource}
          alt={`Capa do livro ${book.title}`}
          width={200} // Obrigatório
          height={300} // Obrigatório
          className="w-full h-full object-cover rounded-t-lg transition-opacity duration-500 hover:opacity-90"
        />
      </div>

      <CardHeader className="p-3 pb-4 flex-grow">
        <CardTitle className="text-base truncate" title={book.title}>
          {book.title}
        </CardTitle>
        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
          {descriptionText}
        </p>
      </CardHeader>

      <CardContent className="p-3 pt-0 text-right">
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
            book.status === 'LIDO'
              ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
              : book.status === 'LENDO'
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
          }`}
        >
          {book.status?.replace('_', ' ') || 'Status'}
        </span>
      </CardContent>
    </Card>
  )
}
