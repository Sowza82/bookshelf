'use client'

import { Book } from '@/types/book'
import { Book as BookIcon } from 'lucide-react' // Ícone do Lucide
import Image from 'next/image'

interface BookCoverProps {
  book: Pick<Book, 'title' | 'coverUrl'>
  width?: number
  height?: number
}

export function BookCover({ book, width = 250, height = 350 }: BookCoverProps) {
  const hasCover = book.coverUrl && book.coverUrl.trim() !== ''

  if (!hasCover) {
    return (
      <div
        style={{
          width,
          height,
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-background)',
        }}
        className="flex flex-col items-center justify-center rounded-xl p-4 text-center"
      >
        <BookIcon className="w-12 h-12 mb-2" />
        <span className="font-bold text-lg">Bookshelf</span>
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
