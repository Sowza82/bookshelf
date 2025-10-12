'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import { Eye, Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { BookCover } from './book-cover'
import BookRating from './book-rating'

interface BookCardProps {
  book: {
    id: string
    title: string
    author: string
    genre: string
    year?: number
    coverUrl?: string
    rating?: number
    readingStatus: 'UNREAD' | 'READING' | 'FINISHED'
    currentPage?: number
    totalPages?: number
  }
  onView?: (id: string) => void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  onStatusChange?: (
    id: string,
    status: 'UNREAD' | 'READING' | 'FINISHED'
  ) => void
}

export default function BookCard({
  book,
  onView,
  onEdit,
  onDelete,
  onStatusChange,
}: BookCardProps) {
  const [status, setStatus] = useState(book.readingStatus)

  const handleSwitchChange = () => {
    let nextStatus: 'UNREAD' | 'READING' | 'FINISHED'
    if (status === 'UNREAD') nextStatus = 'READING'
    else if (status === 'READING') nextStatus = 'FINISHED'
    else nextStatus = 'UNREAD'

    setStatus(nextStatus)
    onStatusChange?.(book.id, nextStatus)
  }

  return (
    <Card className="flex flex-col h-full shadow-md hover:shadow-xl transition-all border border-border/60 rounded-2xl overflow-hidden">
      {/* Capa */}
      <BookCover book={book} width={200} height={280} />

      {/* Cabeçalho */}
      <CardHeader className="p-4 pb-2">
        <p className="font-semibold line-clamp-2 text-sm">{book.title}</p>
        <p className="text-xs text-muted-foreground">{book.author}</p>
      </CardHeader>

      {/* Conteúdo */}
      <CardContent className="p-4 pt-2 flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <BookRating rating={book.rating || 0} size={14} />
          <Badge variant="outline" className="text-[10px] px-2 py-0.5">
            {book.genre}
          </Badge>
        </div>

        {book.totalPages && (
          <div className="space-y-1">
            <Progress
              value={
                book.currentPage && book.totalPages
                  ? (book.currentPage / book.totalPages) * 100
                  : 0
              }
              className="h-2"
            />
            <span className="text-[10px] text-muted-foreground">
              {book.currentPage ?? 0}/{book.totalPages} páginas
            </span>
          </div>
        )}

        <div className="flex items-center justify-between mt-2">
          <Switch
            checked={status === 'FINISHED'}
            onCheckedChange={handleSwitchChange}
          />
          <span
            className={`text-xs font-semibold ${
              status === 'FINISHED'
                ? 'text-green-600'
                : status === 'READING'
                ? 'text-yellow-600'
                : 'text-blue-600'
            }`}
          >
            {status === 'FINISHED'
              ? 'LIDO'
              : status === 'READING'
              ? 'LENDO'
              : 'A LER'}
          </span>
        </div>
      </CardContent>

      {/* Rodapé */}
      <CardFooter className="p-3 flex justify-between border-t">
        <Button variant="outline" size="sm" onClick={() => onView?.(book.id)}>
          <Eye className="w-3 h-3 mr-1" /> Ver
        </Button>
        <Button variant="outline" size="icon" onClick={() => onEdit?.(book.id)}>
          <Pencil className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onDelete?.(book.id)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
