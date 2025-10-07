'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch' // IMPORTADO: Seu componente Switch
import { Eye, Pencil, Star, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

// Definição de tipo básica, assumindo que isRead foi adicionado em '@/types/book'
interface Book {
  id: string
  title: string
  author: string
  genre: string
  rating: number
  year: string
  coverUrl?: string
  isRead: boolean // NOVO: Status de leitura
}

interface BookCardProps {
  book: Book
  onView?: (bookId: string) => void
  onEdit?: (bookId: string) => void
  onDelete?: (bookId: string) => void
  onStatusChange?: (bookId: string, newStatus: boolean) => void // NOVO: Para o Switch
}

// NOTE: Use um caminho real para sua imagem fallback.
const DYNAMIC_FALLBACK_COVER = '/1000103587.jpg'
const MAX_RATING = 5

export default function BookCard({
  book,
  onView,
  onEdit,
  onDelete,
  onStatusChange,
}: BookCardProps) {
  // Use um estado local para a capa por causa do onError
  const [imgSrc, setImgSrc] = useState(book.coverUrl || DYNAMIC_FALLBACK_COVER)

  // Gerencia o estado do switch localmente para feedback rápido
  const [isReadLocal, setIsReadLocal] = useState(book.isRead || false)

  // Função para renderizar estrelas
  const renderStars = (currentRating: number) => {
    const filledStars = Math.round(currentRating)
    const stars = []
    for (let i = 1; i <= MAX_RATING; i++) {
      stars.push(
        <Star
          key={i}
          // Responsividade do tamanho das estrelas: h-3 em mobile, h-4 em telas maiores (md:)
          className={`h-3 w-3 md:h-4 md:w-4 ${
            i <= filledStars
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-gray-300 dark:text-gray-600'
          }`}
        />
      )
    }
    return stars
  }

  // Handler para o switch
  const handleSwitchChange = (checked: boolean) => {
    // 1. Atualiza o estado local temporariamente (para feedback instantâneo)
    setIsReadLocal(checked)
    // 2. Chama a função que fará a chamada de API no componente pai (BookList)
    onStatusChange?.(book.id, checked)
  }

  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-default">
      {/* 1. Capa do Livro */}
      <div className="relative aspect-[3/4] w-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center">
        <Image
          src={imgSrc}
          alt={book.title}
          fill
          className="object-contain rounded-t-lg p-2"
          onError={() => setImgSrc(DYNAMIC_FALLBACK_COVER)}
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
          priority
        />
      </div>

      <CardHeader className="p-3 pb-2 flex-grow">
        {/* Título e Autor: */}
        <p
          className="text-sm sm:text-base font-semibold line-clamp-2"
          title={book.title}
        >
          {book.title}
        </p>
        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">
          {book.author}
        </p>

        {/* Status de Leitura (UTILIZA O SWITCH) */}
        <div className="flex justify-between items-center text-xs mt-2 border-t pt-2">
          {/* Rating e Ano */}
          <div className="flex flex-col space-y-1">
            <div className="flex items-center space-x-1">
              <span className="font-medium text-gray-700 dark:text-gray-300 text-xs sm:text-sm">
                {book.rating.toFixed(1)}
              </span>
              <div className="flex items-center">
                {renderStars(book.rating)}
              </div>
            </div>
            <span className="text-right text-gray-500 dark:text-gray-400 text-xs">
              {book.year}
            </span>
          </div>

          {/* Switch de Status */}
          <div className="flex flex-col items-end space-y-1">
            <Switch
              checked={isReadLocal}
              onCheckedChange={handleSwitchChange}
            />
            <span
              className={`text-xs font-semibold ${
                isReadLocal
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-primary'
              }`}
            >
              {isReadLocal ? 'LIDO' : 'A LER'}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-3 pt-0 text-xs">
        {/* Gênero */}
        <span className="inline-block bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium text-xs">
          {book.genre}
        </span>
      </CardContent>

      {/* Footer com Botões Responsivos */}
      <CardFooter className="p-3 flex justify-between space-x-2 border-t mt-auto">
        {/* 1. Botão Ver (Texto completo em mobile, mas o ícone é mais importante) */}
        <Button
          variant="outline"
          size="sm"
          className="flex-grow text-primary border-primary hover:bg-primary/5 h-8 sm:h-9"
          onClick={() => onView && onView(book.id)}
        >
          <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
          <span className="hidden sm:inline">Ver Detalhes</span>
        </Button>

        {/* 2. Botão Editar: Ícone compacto, H-8 em mobile */}
        <Button
          variant="outline"
          size="icon"
          className="text-amber-500 border-amber-500 hover:bg-amber-500/5 h-8 w-8 sm:h-9 sm:w-9 p-0"
          onClick={() => onEdit && onEdit(book.id)}
        >
          <Pencil className="w-4 h-4" />
        </Button>

        {/* 3. Botão Deletar: Ícone compacto, H-8 em mobile */}
        <Button
          variant="outline"
          size="icon"
          className="text-red-500 border-red-500 hover:bg-red-500/5 h-8 w-8 sm:h-9 sm:w-9 p-0"
          onClick={() => onDelete && onDelete(book.id)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
