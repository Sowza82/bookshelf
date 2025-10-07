'use client'

import { Book } from '@/types/book'
import Image from 'next/image'

interface BookCoverProps {
  book: Book
  width?: number
  height?: number
}

export function BookCover({ book, width = 150, height = 220 }: BookCoverProps) {
  const hasCover = book.coverUrl && book.coverUrl.trim() !== ''

  if (!hasCover) {
    // fallback: bloco estilizado com o nome do livro
    const title = book.title || 'MisturaDev'
    const colors = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#3B82F6']
    const color = colors[book.title.length % colors.length] // cor pseudo-aleatória

    return (
      <div
        style={{ width, height, backgroundColor: color }}
        className="flex items-center justify-center rounded-xl text-white font-bold text-center p-2"
      >
        {title
          .split(' ')
          .map(w => w[0])
          .join('')}{' '}
        {/* iniciais do título */}
      </div>
    )
  }

  return (
    <Image
      src={book.coverUrl!}
      alt={`Capa do livro ${book.title}`}
      width={width}
      height={height}
      className="rounded-xl shadow-md object-cover"
      onError={e => {
        ;(e.target as HTMLImageElement).style.display = 'none'
      }}
    />
  )
}
