// src/components/ui/custom/my-card.tsx
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Book } from '@/types/book'
import Image from 'next/image'

interface MyCardProps {
  book: Book
  // A descrição será gerada aqui com base na prop book
}

const FALLBACK_COVER = '/placeholder-cover.png'

export default function MyCard({ book }: MyCardProps) {
  // Ajuste: A propriedade para a imagem na nossa interface é 'cover', não 'image'.
  // Ajuste: A nossa interface Book tem 'synopsis', não 'description'.
  const descriptionText = `Autor: ${book.author} • Publicado em ${book.year}`

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="relative aspect-[3/4] w-full">
        <Image
          src={book.cover || FALLBACK_COVER}
          alt={`Capa do livro ${book.title}`}
          layout="fill"
          objectFit="cover"
          priority={false}
          className="rounded-t-lg"
          onError={e => {
            ;(e.target as HTMLImageElement).src = FALLBACK_COVER
          }}
        />
      </div>
      <CardHeader className="p-3 pb-0">
        <CardTitle className="text-base truncate">{book.title}</CardTitle>
        <CardDescription className="text-xs line-clamp-2">
          {descriptionText}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
