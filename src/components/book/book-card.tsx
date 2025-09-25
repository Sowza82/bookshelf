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
